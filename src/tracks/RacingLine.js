// Racing line precomputed from curvature: a lateral offset per sample (out
// wide on entry, clip the apex, out wide on exit) and a speed profile from
// the line's curvature with braking / acceleration passes. Pure JS.

export class RacingLine {
  /**
   * model: TrackModel. opts.aLat: lateral grip (m/s²), aBrake / aAccel:
   * longitudinal limits, vMax: top speed, margin: metres kept from the edge.
   */
  constructor(model, { aLat = 15, aBrake = 16, aAccel = 7, vMax = 80, margin = 2.2 } = {}) {
    this.model = model;
    const n = model.n;
    this.offset = new Float32Array(n);
    this.speed = new Float32Array(n);
    this.curv = new Float32Array(n);
    // 1) minimum-curvature line by relaxation: repeatedly move each point
    //    toward the midpoint of its neighbours (projected on its lateral
    //    axis), clamped to the road. Gives wide entry, apex, wide exit.
    const off = this.offset;
    const lim = new Float32Array(n);
    for (let i = 0; i < n; i++) lim[i] = Math.max(0, model.width[i] / 2 - margin);
    const K = Math.max(2, Math.round(6 / model.ds));
    for (let it = 0; it < 220; it++) {
      for (let i = 0; i < n; i++) {
        const a = (i - K + n) % n;
        const b = (i + K) % n;
        const ax = model.px[a] - model.tz[a] * off[a];
        const az = model.pz[a] + model.tx[a] * off[a];
        const bx = model.px[b] - model.tz[b] * off[b];
        const bz = model.pz[b] + model.tx[b] * off[b];
        const mx = (ax + bx) / 2 - model.px[i];
        const mz = (az + bz) / 2 - model.pz[i];
        const t = mx * -model.tz[i] + mz * model.tx[i];
        const v = off[i] + (t - off[i]) * 0.6;
        off[i] = v > lim[i] ? lim[i] : v < -lim[i] ? -lim[i] : v;
      }
    }
    // light smoothing so the line has no kinks
    const tmp = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let acc = 0;
      for (let k = -4; k <= 4; k++) acc += off[(i + k + n) % n];
      tmp[i] = acc / 9;
    }
    for (let i = 0; i < n; i++) off[i] = Math.max(-lim[i], Math.min(lim[i], tmp[i]));
    // 2) curvature of the line itself (offset path), used for speeds
    const px = new Float32Array(n);
    const pz = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      px[i] = model.px[i] - model.tz[i] * this.offset[i];
      pz[i] = model.pz[i] + model.tx[i] * this.offset[i];
    }
    const S = 4;
    for (let i = 0; i < n; i++) {
      const i0 = (i - S + n) % n;
      const i2 = (i + S) % n;
      const ax = px[i] - px[i0];
      const az = pz[i] - pz[i0];
      const bx = px[i2] - px[i];
      const bz = pz[i2] - pz[i];
      const h0 = Math.atan2(ax, az);
      const h1 = Math.atan2(bx, bz);
      let d = h1 - h0;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      const len = Math.hypot(ax, az) + Math.hypot(bx, bz);
      this.curv[i] = Math.abs(d) / Math.max(0.5, len / 2);
    }
    // smooth curvature a little
    const c2 = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let acc = 0;
      for (let k = -3; k <= 3; k++) acc += this.curv[(i + k + n) % n];
      c2[i] = acc / 7;
    }
    // 3) speed profile: corner limit, then backward (braking) and forward
    //    (acceleration) passes, twice around the loop for wrap-around
    for (let i = 0; i < n; i++) this.speed[i] = Math.min(vMax, Math.sqrt(aLat / Math.max(1e-4, c2[i])));
    const ds = model.ds;
    for (let pass = 0; pass < 2; pass++) {
      for (let k = 2 * n - 1; k >= 0; k--) {
        const i = k % n;
        const j = (i + 1) % n;
        const lim = Math.sqrt(this.speed[j] * this.speed[j] + 2 * aBrake * ds);
        if (this.speed[i] > lim) this.speed[i] = lim;
      }
      for (let k = 0; k < 2 * n; k++) {
        const i = k % n;
        const j = (i + 1) % n;
        const lim = Math.sqrt(this.speed[i] * this.speed[i] + 2 * aAccel * ds);
        if (this.speed[j] > lim) this.speed[j] = lim;
      }
    }
  }

  offsetAt(s) {
    return this.offset[this.model.index(s)];
  }

  speedAt(s) {
    return this.speed[this.model.index(s)];
  }

  /** Minimum target speed in [s, s + ahead]. */
  minSpeedAhead(s, ahead) {
    const m = this.model;
    let v = Infinity;
    const steps = Math.max(1, Math.round(ahead / (m.ds * 4)));
    for (let k = 0; k <= steps; k++) {
      const sp = this.speed[m.index(s + (ahead * k) / steps)];
      if (sp < v) v = sp;
    }
    return v;
  }
}
