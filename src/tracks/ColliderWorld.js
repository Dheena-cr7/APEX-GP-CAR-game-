// Broad phase: a spatial hash in TRACK space (s along the centreline × t
// lateral), cells ≈ 8 m. Static colliders are filed once at build; moving
// ones are re-filed when they move. A per-query stamp stops a collider that
// spans several cells from being tested twice.

import { WALL } from '../cars/Sizes.js';

const CELL = 8;
const T_OFFSET = 64; // t cells from -512 m .. +512 m
const T_CELLS = 128;

export class ColliderWorld {
  constructor(model) {
    this.model = model;
    this.nS = Math.max(1, Math.ceil(model.length / CELL));
    this.cells = new Map();
    this.all = [];
    this.stamp = 1;
    this.lastTested = []; // cell keys touched by the last query (debug view)
    this.debugCells = false;
    this._proj = { s: 0, t: 0, i: -1 };
  }

  _key(si, ti) {
    si = ((si % this.nS) + this.nS) % this.nS;
    return si * T_CELLS + (ti + T_OFFSET);
  }

  /** Compute the collider's track-space extents from its world pose. */
  locate(col) {
    const m = this.model;
    const p = m.project(col.x, col.z, col._hint ?? -1, this._proj);
    col._hint = p.i;
    col.s = p.s;
    col.t = p.t;
    const radius = col.shape === 'circle' ? col.r : Math.hypot(col.hx, col.hz);
    const k = m.kappa[p.i];
    const scale = Math.max(0.25, Math.abs(1 + k * p.t));
    col.sr = radius / scale + 0.5;
    col.tr = radius + 0.5;
  }

  add(col) {
    if (col.s === undefined) this.locate(col);
    col.stamp = 0;
    col.keys = [];
    this._file(col);
    this.all.push(col);
    return col;
  }

  _file(col) {
    const s0 = Math.floor((col.s - col.sr) / CELL);
    const s1 = Math.floor((col.s + col.sr) / CELL);
    const t0 = Math.max(-T_OFFSET, Math.floor((col.t - col.tr) / CELL));
    const t1 = Math.min(T_CELLS - T_OFFSET - 1, Math.floor((col.t + col.tr) / CELL));
    for (let si = s0; si <= s1; si++) {
      for (let ti = t0; ti <= t1; ti++) {
        const key = this._key(si, ti);
        let arr = this.cells.get(key);
        if (!arr) this.cells.set(key, (arr = []));
        arr.push(col);
        col.keys.push(key);
      }
    }
  }

  _unfile(col) {
    for (const key of col.keys) {
      const arr = this.cells.get(key);
      if (!arr) continue;
      const i = arr.indexOf(col);
      if (i >= 0) {
        arr[i] = arr[arr.length - 1];
        arr.pop();
      }
    }
    col.keys.length = 0;
  }

  /** Re-file a collider after it moved (moving obstacles, knocked cones). */
  move(col) {
    this._unfile(col);
    this.locate(col);
    this._file(col);
  }

  remove(col) {
    this._unfile(col);
    const i = this.all.indexOf(col);
    if (i >= 0) this.all.splice(i, 1);
  }

  /**
   * Call fn(col) for every collider in cells overlapping the track-space
   * rectangle around (s, t) with half extents (sr, tr).
   */
  query(s, t, sr, tr, fn) {
    const stamp = ++this.stamp;
    const s0 = Math.floor((s - sr) / CELL);
    const s1 = Math.floor((s + sr) / CELL);
    const t0 = Math.max(-T_OFFSET, Math.floor((t - tr) / CELL));
    const t1 = Math.min(T_CELLS - T_OFFSET - 1, Math.floor((t + tr) / CELL));
    if (this.debugCells) this.lastTested.length = 0;
    for (let si = s0; si <= s1; si++) {
      for (let ti = t0; ti <= t1; ti++) {
        const key = this._key(si, ti);
        if (this.debugCells) this.lastTested.push(key);
        const arr = this.cells.get(key);
        if (!arr) continue;
        for (let k = 0; k < arr.length; k++) {
          const col = arr[k];
          if (col.stamp === stamp) continue;
          col.stamp = stamp;
          if (col.disabled) continue;
          fn(col);
        }
      }
    }
  }

  /** Track-space query box for a body of radius r at (s, t) with curvature at sample i. */
  extentFor(i, t, r) {
    const k = this.model.kappa[i];
    const scale = Math.max(0.25, Math.abs(1 + k * t));
    return r / scale + CELL * 0.25;
  }

  /** Build barrier colliders along both walls (segment length adapts to curvature). */
  addWalls() {
    const m = this.model;
    const p = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    let count = 0;
    for (const side of [-1, 1]) {
      let s = 0;
      while (s < m.length) {
        const i = m.index(s);
        const wallT = m.width[i] / 2 + m.runoff;
        const k = Math.abs(m.kappa[i]);
        const rWall = k > 1e-5 ? Math.abs(1 + m.kappa[i] * side * wallT) / k : 1e5;
        const seg = Math.max(1.4, Math.min(WALL.segment, Math.sqrt(0.4 * rWall)));
        const mid = s + seg / 2;
        if (m.isGap(mid)) {
          s += seg;
          continue;
        }
        const t = side * (m.width[m.index(mid)] / 2 + m.runoff + WALL.thickness / 2);
        m.pointAt(mid, t, p);
        const col = {
          kind: 'wall',
          shape: 'box',
          x: p.x,
          z: p.z,
          h: Math.atan2(p.tx, p.tz),
          hx: WALL.thickness / 2,
          hz: seg / 2 + 0.35,
          height: WALL.height,
          side,
        };
        this.add(col);
        count++;
        s += seg;
      }
    }
    return count;
  }

  cellBounds(key) {
    const si = Math.floor(key / T_CELLS);
    const ti = (key % T_CELLS) - T_OFFSET;
    return { s0: si * CELL, s1: (si + 1) * CELL, t0: ti * CELL, t1: (ti + 1) * CELL };
  }
}

export const COLLIDER_CELL = CELL;
