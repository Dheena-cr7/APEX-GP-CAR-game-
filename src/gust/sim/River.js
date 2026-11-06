// River model: a centreline built "turtle style" from course segments and
// sampled every metre. Pure JS (no three.js) so the simulation and the Node
// checks share it.
//
// Coordinates: x/z ground plane, y up. At sample i the river runs along
// T = (tx, tz); the left bank is along N = (tz, -tx). A point's lateral
// offset `t` is measured along N (positive = left), `s` is metres along the
// river from the start dock.

export const STEP = 1;

const smooth = (a) => (a <= 0 ? 0 : a >= 1 ? 1 : a * a * (3 - 2 * a));

export class River {
  /** @param {object} def course river definition ({ start, w, v, h, path }) */
  constructor(def) {
    const xs = [], zs = [], hd = [], ws = [], vs = [], hs = [], rough = [], fall = [];
    let x = def.start.x, z = def.start.z;
    let th = (def.start.heading * Math.PI) / 180;
    let w = def.w, v = def.v, h = def.h ?? 0, r = 0;
    const push = (fw = 0) => {
      xs.push(x); zs.push(z); hd.push(th); ws.push(w); vs.push(v); hs.push(h); rough.push(r); fall.push(fw);
    };
    push();
    for (const seg of def.path) {
      const n = Math.max(1, Math.round(seg.len / STEP));
      const k = ((seg.turn || 0) * Math.PI) / 180 / n;
      const w0 = w, v0 = v, h0 = h, r0 = r;
      const w1 = seg.w ?? w, v1 = seg.v ?? v, r1 = seg.rough ?? 0, drop = seg.drop || 0;
      for (let i = 1; i <= n; i++) {
        const f = i / n;
        // turn at the middle of each step so a whole segment turns exactly `turn`
        th += k * 0.5;
        x += Math.cos(th) * STEP;
        z += Math.sin(th) * STEP;
        th += k * 0.5;
        const e = smooth(f);
        w = w0 + (w1 - w0) * e;
        v = v0 + (v1 - v0) * e;
        r = r0 + (r1 - r0) * e;
        // falls: the water drops along a steep S-curve in the middle of the segment
        h = h0 - drop * smooth((f - 0.15) / 0.7);
        push(drop ? Math.sin(Math.PI * f) * Math.min(1, drop / 2) : 0);
      }
    }
    this.n = xs.length;
    this.length = (this.n - 1) * STEP;
    const N = this.n;
    this.x = Float32Array.from(xs);
    this.z = Float32Array.from(zs);
    this.tx = new Float32Array(N);
    this.tz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      this.tx[i] = Math.cos(hd[i]);
      this.tz[i] = Math.sin(hd[i]);
    }
    this.hw = Float32Array.from(ws, (q) => q * 0.5);
    this.v = Float32Array.from(vs);
    this.h = Float32Array.from(hs);
    this.rough = Float32Array.from(rough);
    this.fall = Float32Array.from(fall);
    // slope of the water surface (dh/ds), for falls whitewater and raft pitch
    this.slope = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.max(0, i - 1), b = Math.min(N - 1, i + 1);
      this.slope[i] = (this.h[b] - this.h[a]) / ((b - a) * STEP || 1);
    }
    // curvature (signed, 1/m) for scenery and camera
    this.curv = new Float32Array(N);
    for (let i = 1; i < N - 1; i++) {
      let d = hd[i + 1] - hd[i - 1];
      this.curv[i] = d / (2 * STEP);
    }
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (let i = 0; i < N; i++) {
      const m = this.hw[i] + 2;
      minX = Math.min(minX, this.x[i] - m); maxX = Math.max(maxX, this.x[i] + m);
      minZ = Math.min(minZ, this.z[i] - m); maxZ = Math.max(maxZ, this.z[i] + m);
    }
    this.bbox = { minX, maxX, minZ, maxZ };
    this.whirls = [];
    // coarse spatial hash of samples for global nearest-point queries
    this.cell = 12;
    this.grid = new Map();
    for (let i = 0; i < N; i++) {
      const key = this._key(Math.floor(this.x[i] / this.cell), Math.floor(this.z[i] / this.cell));
      let list = this.grid.get(key);
      if (!list) this.grid.set(key, (list = []));
      list.push(i);
    }
  }

  _key(cx, cz) {
    return cx * 73856 + cz;
  }

  clampIndex(i) {
    return i < 0 ? 0 : i >= this.n ? this.n - 1 : i;
  }

  /** Interpolated value of a per-sample array at distance s. */
  at(arr, s) {
    const f = s / STEP;
    if (f <= 0) return arr[0];
    if (f >= this.n - 1) return arr[this.n - 1];
    const i = Math.floor(f), u = f - i;
    return arr[i] + (arr[i + 1] - arr[i]) * u;
  }

  /** World point at (s, t metres). */
  point(s, t = 0, out = { x: 0, z: 0 }) {
    const f = Math.max(0, Math.min(this.n - 1, s / STEP));
    const i = Math.min(this.n - 2, Math.floor(f)), u = f - i;
    const x = this.x[i] + (this.x[i + 1] - this.x[i]) * u;
    const z = this.z[i] + (this.z[i + 1] - this.z[i]) * u;
    const tx = this.tx[i] + (this.tx[i + 1] - this.tx[i]) * u;
    const tz = this.tz[i] + (this.tz[i + 1] - this.tz[i]) * u;
    const l = Math.hypot(tx, tz) || 1;
    out.x = x + (tz / l) * t;
    out.z = z + (-tx / l) * t;
    out.tx = tx / l;
    out.tz = tz / l;
    return out;
  }

  /** World point at (s, u) where u is a fraction of the half width (-1..1). */
  pointU(s, u, out) {
    return this.point(s, u * this.at(this.hw, s), out);
  }

  /** Heading angle (radians, atan2(tz, tx)) at s. */
  heading(s) {
    const i = this.clampIndex(Math.round(s / STEP));
    return Math.atan2(this.tz[i], this.tx[i]);
  }

  /**
   * Nearest centreline position. `hint` = previous sample index (or -1 for a
   * global search). Returns { s, t, i } in `out`.
   */
  project(x, z, hint = -1, out = { s: 0, t: 0, i: 0 }) {
    let best = -1, bd = Infinity;
    if (hint >= 0) {
      const a = Math.max(0, hint - 24), b = Math.min(this.n - 1, hint + 24);
      for (let i = a; i <= b; i++) {
        const dx = x - this.x[i], dz = z - this.z[i];
        const d = dx * dx + dz * dz;
        if (d < bd) { bd = d; best = i; }
      }
      // fell off the window (teleport): fall back to a global search
      if (best === a && a > 0 || best === b && b < this.n - 1) best = -1;
    }
    if (best < 0) {
      bd = Infinity;
      const cx = Math.floor(x / this.cell), cz = Math.floor(z / this.cell);
      for (let r = 0; r < 12 && best < 0; r++) {
        for (let gx = cx - r; gx <= cx + r; gx++) {
          for (let gz = cz - r; gz <= cz + r; gz++) {
            if (Math.max(Math.abs(gx - cx), Math.abs(gz - cz)) !== r) continue;
            const list = this.grid.get(this._key(gx, gz));
            if (!list) continue;
            for (const i of list) {
              const dx = x - this.x[i], dz = z - this.z[i];
              const d = dx * dx + dz * dz;
              if (d < bd) { bd = d; best = i; }
            }
          }
        }
        // a hit in ring r may still be beaten by ring r+1: do one more ring
        if (best >= 0 && r < 11) {
          const rr = r + 1;
          for (let gx = cx - rr; gx <= cx + rr; gx++) {
            for (let gz = cz - rr; gz <= cz + rr; gz++) {
              if (Math.max(Math.abs(gx - cx), Math.abs(gz - cz)) !== rr) continue;
              const list = this.grid.get(this._key(gx, gz));
              if (!list) continue;
              for (const i of list) {
                const dx = x - this.x[i], dz = z - this.z[i];
                const d = dx * dx + dz * dz;
                if (d < bd) { bd = d; best = i; }
              }
            }
          }
        }
      }
      if (best < 0) {
        for (let i = 0; i < this.n; i++) {
          const dx = x - this.x[i], dz = z - this.z[i];
          const d = dx * dx + dz * dz;
          if (d < bd) { bd = d; best = i; }
        }
      }
    }
    // refine on the neighbouring segment
    const i = best;
    const dx = x - this.x[i], dz = z - this.z[i];
    let along = dx * this.tx[i] + dz * this.tz[i];
    along = Math.max(i > 0 ? -STEP : 0, Math.min(i < this.n - 1 ? STEP : 0, along));
    out.s = i * STEP + along;
    out.t = dx * this.tz[i] - dz * this.tx[i];
    out.i = i;
    return out;
  }

  /** Register a whirlpool { x, z, r, strength } that bends the current. */
  addWhirl(w) {
    this.whirls.push(w);
  }

  /**
   * Water velocity at a point (current + whirlpools + rapids turbulence).
   * `pr` is a projection result for the point. Returns into out {x, z}.
   */
  flow(x, z, pr, time, out = { x: 0, z: 0 }) {
    const i = this.clampIndex(Math.round(pr.s / STEP));
    const hw = this.hw[i];
    const q = Math.min(1, Math.abs(pr.t) / hw);
    const prof = Math.max(0.3, 1 - 0.55 * q * q);
    const sp = this.v[i] * prof;
    let fx = this.tx[i] * sp, fz = this.tz[i] * sp;
    const rg = this.rough[i];
    if (rg > 0) {
      // rapids: slow lateral sway plus quicker chop, deterministic in time
      const a = Math.sin(pr.s * 0.21 + time * 1.3) * Math.cos(pr.t * 0.37 - time * 0.9);
      const b = Math.sin(pr.s * 0.53 - time * 2.1 + pr.t * 0.2);
      const lat = rg * (0.9 * a + 0.4 * b);
      fx += this.tz[i] * lat;
      fz += -this.tx[i] * lat;
    }
    for (const w of this.whirls) {
      const dx = x - w.x, dz = z - w.z;
      const d2 = dx * dx + dz * dz;
      const R = w.r * 1.6;
      if (d2 > R * R) continue;
      const d = Math.sqrt(d2) + 0.001;
      const f = 1 - d / R;
      const k = w.strength * f;
      // swirl (counter-clockwise from above) plus a pull toward the eye
      fx += (-dz / d) * k * w.spin + (-dx / d) * k * 0.45;
      fz += (dx / d) * k * w.spin + (-dz / d) * k * 0.45;
    }
    out.x = fx;
    out.z = fz;
    return out;
  }
}
