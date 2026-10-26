// Pure-JS track model (no three.js): centripetal Catmull-Rom centreline,
// resampled to ~1 m spacing, with width / height / bank profiles and fast
// projection between world (x, z) and track space (s along, t lateral).
//
// Conventions: heading angle θ with forward = (sin θ, cos θ); right vector
// = (-tz, tx); t > 0 is to the right of the direction of travel. Curvature
// κ = dθ/ds (> 0 turning left). A point at lateral offset t moves 1 + κt
// metres per metre of centreline.

import { SURFACES } from '../cars/PhysicsConfig.js';
import { KERB, WALL } from '../cars/Sizes.js';

const TAU = Math.PI * 2;

function catmullRomClosed(points, perSeg = 48) {
  const n = points.length;
  const out = [];
  const alpha = 0.5;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const d = (a, b) => Math.max(1e-4, Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]), alpha));
    const t0 = 0;
    const t1 = t0 + d(p0, p1);
    const t2 = t1 + d(p1, p2);
    const t3 = t2 + d(p2, p3);
    for (let k = 0; k < perSeg; k++) {
      const t = t1 + ((t2 - t1) * k) / perSeg;
      const pt = [0, 0];
      for (let c = 0; c < 2; c++) {
        const a1 = ((t1 - t) / (t1 - t0)) * p0[c] + ((t - t0) / (t1 - t0)) * p1[c];
        const a2 = ((t2 - t) / (t2 - t1)) * p1[c] + ((t - t1) / (t2 - t1)) * p2[c];
        const a3 = ((t3 - t) / (t3 - t2)) * p2[c] + ((t - t2) / (t3 - t2)) * p3[c];
        const b1 = ((t2 - t) / (t2 - t0)) * a1 + ((t - t0) / (t2 - t0)) * a2;
        const b2 = ((t3 - t) / (t3 - t1)) * a2 + ((t - t1) / (t3 - t1)) * a3;
        pt[c] = ((t2 - t) / (t2 - t1)) * b1 + ((t - t1) / (t2 - t1)) * b2;
      }
      out.push(pt);
    }
  }
  return out;
}

/** Piecewise profile over u in [0,1): [[u, value], ...], smoothstep blended, wraps. */
export function sampleProfile(profile, u, fallback) {
  if (profile === undefined || profile === null) return fallback;
  if (typeof profile === 'number') return profile;
  const n = profile.length;
  if (n === 0) return fallback;
  if (n === 1) return profile[0][1];
  u = ((u % 1) + 1) % 1;
  let i = n - 1;
  for (let k = 0; k < n; k++) {
    if (profile[k][0] > u) {
      i = k - 1;
      break;
    }
  }
  const a = profile[(i + n) % n];
  const b = profile[(i + 1) % n];
  let ua = a[0];
  let ub = b[0];
  if (i < 0) ua -= 1;
  if (ub <= ua) ub += 1;
  let f = (u - ua) / (ub - ua);
  if (f < 0) f += 1;
  f = Math.max(0, Math.min(1, f));
  f = f * f * (3 - 2 * f);
  return a[1] + (b[1] - a[1]) * f;
}

export class TrackModel {
  constructor(def) {
    this.def = def;
    const dense = catmullRomClosed(def.points);
    // cumulative arc length of the dense polyline
    const cum = [0];
    for (let i = 1; i <= dense.length; i++) {
      const a = dense[i - 1];
      const b = dense[i % dense.length];
      cum.push(cum[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]));
    }
    const length = cum[dense.length];
    const n = Math.max(64, Math.round(length / 1.0));
    this.n = n;
    this.length = length;
    this.ds = length / n;
    this.px = new Float32Array(n);
    this.pz = new Float32Array(n);
    this.py = new Float32Array(n);
    this.tx = new Float32Array(n);
    this.tz = new Float32Array(n);
    this.kappa = new Float32Array(n);
    this.width = new Float32Array(n);
    this.bank = new Float32Array(n); // tan(bank angle); + = right side higher
    this.slope = new Float32Array(n); // dy/ds
    this.kerbL = new Uint8Array(n);
    this.kerbR = new Uint8Array(n);
    this.sandL = new Uint8Array(n);
    this.sandR = new Uint8Array(n);
    let j = 0;
    for (let i = 0; i < n; i++) {
      const target = i * this.ds;
      while (cum[j + 1] < target) j++;
      const a = dense[j];
      const b = dense[(j + 1) % dense.length];
      const f = (target - cum[j]) / Math.max(1e-9, cum[j + 1] - cum[j]);
      this.px[i] = a[0] + (b[0] - a[0]) * f;
      this.pz[i] = a[1] + (b[1] - a[1]) * f;
    }
    // tangents (central difference)
    for (let i = 0; i < n; i++) {
      const a = (i - 1 + n) % n;
      const b = (i + 1) % n;
      const dx = this.px[b] - this.px[a];
      const dz = this.pz[b] - this.pz[a];
      const l = Math.hypot(dx, dz) || 1;
      this.tx[i] = dx / l;
      this.tz[i] = dz / l;
    }
    // curvature from heading change over ±3 samples, then smoothed
    const raw = new Float32Array(n);
    const W = 3;
    for (let i = 0; i < n; i++) {
      const a = (i - W + n) % n;
      const b = (i + W) % n;
      const ha = Math.atan2(this.tx[a], this.tz[a]);
      const hb = Math.atan2(this.tx[b], this.tz[b]);
      let d = hb - ha;
      while (d > Math.PI) d -= TAU;
      while (d < -Math.PI) d += TAU;
      raw[i] = d / (2 * W * this.ds);
    }
    const SW = 6;
    for (let i = 0; i < n; i++) {
      let acc = 0;
      for (let k = -SW; k <= SW; k++) acc += raw[(i + k + n) % n];
      this.kappa[i] = acc / (2 * SW + 1);
    }
    // profiles
    for (let i = 0; i < n; i++) {
      const u = i / n;
      this.width[i] = sampleProfile(def.width, u, 14);
      this.py[i] = sampleProfile(def.height, u, 0);
      this.bank[i] = Math.tan((sampleProfile(def.bank, u, 0) * Math.PI) / 180);
    }
    for (let i = 0; i < n; i++) {
      const a = (i - 2 + n) % n;
      const b = (i + 2) % n;
      this.slope[i] = (this.py[b] - this.py[a]) / (4 * this.ds);
    }
    this.runoff = def.runoff ?? 10;
    // barrier gaps (side-street junctions for crossing traffic)
    this.gaps = [];
    for (const mv of def.moving || []) {
      if (mv.type === 'truck') this.gaps.push({ s: mv.u * length, half: 7 });
    }
    this.halfWidthMax = 0;
    for (let i = 0; i < n; i++) this.halfWidthMax = Math.max(this.halfWidthMax, this.width[i] / 2);
    this._markKerbs();
    this._bounds();
  }

  _markKerbs() {
    const n = this.n;
    const thr = this.def.kerbCurvature ?? 1 / 160;
    const sandThr = this.def.sandCurvature ?? 1 / 110;
    const grow = Math.round(14 / this.ds);
    const kerbAny = new Uint8Array(n);
    for (let i = 0; i < n; i++) if (Math.abs(this.kappa[i]) > thr) kerbAny[i] = 1;
    // extend kerbs a little before / after each corner
    const ext = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      if (!kerbAny[i]) continue;
      for (let k = -grow; k <= grow; k++) ext[(i + k + n) % n] = 1;
    }
    for (let i = 0; i < n; i++) {
      if (!ext[i]) continue;
      this.kerbL[i] = 1;
      this.kerbR[i] = 1;
    }
    // gravel / sand traps on the outside of tighter corners
    for (let i = 0; i < n; i++) {
      const k = this.kappa[i];
      if (Math.abs(k) < sandThr) continue;
      for (let d = -grow; d <= grow * 2; d++) {
        const idx = (i + d + n) % n;
        if (k > 0) this.sandR[idx] = 1; // left turn: outside is the right
        else this.sandL[idx] = 1;
      }
    }
  }

  _bounds() {
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < this.n; i++) {
      minX = Math.min(minX, this.px[i]);
      maxX = Math.max(maxX, this.px[i]);
      minZ = Math.min(minZ, this.pz[i]);
      maxZ = Math.max(maxZ, this.pz[i]);
      minY = Math.min(minY, this.py[i]);
      maxY = Math.max(maxY, this.py[i]);
    }
    this.bounds = { minX, maxX, minZ, maxZ, minY, maxY };
  }

  /** True if the barrier is open at s (junction). */
  isGap(s) {
    for (const g of this.gaps) if (Math.abs(this.deltaS(g.s, s)) < g.half) return true;
    return false;
  }

  wrapS(s) {
    const L = this.length;
    s %= L;
    return s < 0 ? s + L : s;
  }

  /** Signed shortest distance from s1 to s2 along the loop. */
  deltaS(s1, s2) {
    let d = s2 - s1;
    const L = this.length;
    if (d > L / 2) d -= L;
    else if (d < -L / 2) d += L;
    return d;
  }

  index(s) {
    const i = Math.floor(this.wrapS(s) / this.ds);
    return i >= this.n ? this.n - 1 : i;
  }

  halfWidthAt(s) {
    return this.width[this.index(s)] / 2;
  }

  /** Distance from centreline to the inner face of the wall. */
  wallOffset(s) {
    return this.halfWidthAt(s) + this.runoff;
  }

  kerbAt(s, side) {
    const i = this.index(s);
    return side > 0 ? this.kerbR[i] === 1 : this.kerbL[i] === 1;
  }

  /**
   * World position at (s, t) written into `out` ({x, y, z, tx, tz, i}).
   * Interpolates between samples.
   */
  pointAt(s, t, out) {
    s = this.wrapS(s);
    const fi = s / this.ds;
    let i = Math.floor(fi);
    if (i >= this.n) i = this.n - 1;
    const f = fi - i;
    const j = (i + 1) % this.n;
    let tx = this.tx[i] + (this.tx[j] - this.tx[i]) * f;
    let tz = this.tz[i] + (this.tz[j] - this.tz[i]) * f;
    const l = Math.hypot(tx, tz) || 1;
    tx /= l;
    tz /= l;
    const cx = this.px[i] + (this.px[j] - this.px[i]) * f;
    const cz = this.pz[i] + (this.pz[j] - this.pz[i]) * f;
    const cy = this.py[i] + (this.py[j] - this.py[i]) * f;
    const bank = this.bank[i] + (this.bank[j] - this.bank[i]) * f;
    out.x = cx - tz * t;
    out.z = cz + tx * t;
    out.y = cy + bank * t;
    out.tx = tx;
    out.tz = tz;
    out.i = i;
    return out;
  }

  /** Road surface height at track coords. */
  heightAt(s, t) {
    s = this.wrapS(s);
    const fi = s / this.ds;
    let i = Math.floor(fi);
    if (i >= this.n) i = this.n - 1;
    const f = fi - i;
    const j = (i + 1) % this.n;
    const cy = this.py[i] + (this.py[j] - this.py[i]) * f;
    const bank = this.bank[i] + (this.bank[j] - this.bank[i]) * f;
    return cy + bank * t;
  }

  heading(s) {
    const i = this.index(s);
    return Math.atan2(this.tx[i], this.tz[i]);
  }

  /**
   * Project world (x, z) onto the centreline. `hint` is the previous sample
   * index (or -1 for a global search). Writes {s, t, i} into `out`.
   */
  project(x, z, hint, out) {
    const n = this.n;
    let best = 0;
    let bestD = Infinity;
    if (hint === undefined || hint < 0) {
      for (let i = 0; i < n; i++) {
        const dx = x - this.px[i];
        const dz = z - this.pz[i];
        const d = dx * dx + dz * dz;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
    } else {
      const R = 48;
      for (let k = -R; k <= R; k++) {
        const i = (hint + k + n) % n;
        const dx = x - this.px[i];
        const dz = z - this.pz[i];
        const d = dx * dx + dz * dz;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
    }
    // refine on the two adjacent segments
    let s = best * this.ds;
    let t = 0;
    let bestSeg = Infinity;
    for (let k = -1; k <= 0; k++) {
      const a = (best + k + n) % n;
      const b = (a + 1) % n;
      const ax = this.px[a];
      const az = this.pz[a];
      const sx = this.px[b] - ax;
      const sz = this.pz[b] - az;
      const len2 = sx * sx + sz * sz || 1;
      let f = ((x - ax) * sx + (z - az) * sz) / len2;
      f = f < 0 ? 0 : f > 1 ? 1 : f;
      const qx = ax + sx * f;
      const qz = az + sz * f;
      const d = (x - qx) * (x - qx) + (z - qz) * (z - qz);
      if (d < bestSeg) {
        bestSeg = d;
        s = (a + f) * this.ds;
        const len = Math.sqrt(len2);
        // right vector of the segment = (-sz, sx)/len
        t = ((x - qx) * -sz + (z - qz) * sx) / len;
      }
    }
    out.s = this.wrapS(s);
    out.t = t;
    out.i = best;
    return out;
  }

  /** Surface under a point in track space. */
  surfaceAt(s, t) {
    const i = this.index(s);
    const hw = this.width[i] / 2;
    const at = Math.abs(t);
    if (at <= hw) return SURFACES.asphalt;
    const right = t > 0;
    if (at <= hw + KERB.width && (right ? this.kerbR[i] : this.kerbL[i])) return SURFACES.kerb;
    if (right ? this.sandR[i] : this.sandL[i]) return SURFACES.sand;
    return SURFACES.grass;
  }

  /**
   * Geometry sanity: minimum centreline radius and the minimum distance
   * between parts of the track that are far apart along s (so separate
   * sections never overlap, including their walls).
   */
  validate() {
    const n = this.n;
    let minRadius = Infinity;
    let minRadiusS = 0;
    for (let i = 0; i < n; i++) {
      const r = 1 / Math.max(1e-6, Math.abs(this.kappa[i]));
      if (r < minRadius) {
        minRadius = r;
        minRadiusS = i * this.ds;
      }
    }
    // separation check on a coarse grid
    const step = 4;
    let minSep = Infinity;
    let sepAt = null;
    const reach = WALL.thickness * 2 + (this.halfWidthMax + this.runoff) * 2;
    for (let i = 0; i < n; i += step) {
      for (let j = 0; j < n; j += step) {
        const along = Math.abs(this.deltaS(i * this.ds, j * this.ds));
        if (along < reach * 2.2 + 40) continue;
        const d = Math.hypot(this.px[i] - this.px[j], this.pz[i] - this.pz[j]);
        if (d < minSep) {
          minSep = d;
          sepAt = [i * this.ds, j * this.ds];
        }
      }
    }
    const needSep = reach + 4;
    const wallT = this.halfWidthMax + this.runoff;
    return {
      length: this.length,
      minRadius,
      minRadiusS,
      minSep,
      sepAt,
      needSep,
      ok: minSep > needSep && minRadius > wallT + 4,
      wallT,
    };
  }
}
