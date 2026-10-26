// Drift scoring: points per second × angle × speed, a combo multiplier that
// grows while the drift continues (and across quick chained drifts), banked
// when the car straightens. A wall hit or leaving the track breaks the combo
// and loses the unbanked points.

export const DRIFT_SCORE = Object.freeze({
  minSpeed: 9,
  baseRate: 42, // points / s at 30° and 30 m/s
  zoneMultiplier: 2,
  comboStep: 1.4, // seconds of continuous drifting per +1 multiplier
  maxMultiplier: 8,
  chainGrace: 0.85, // seconds to start the next drift before banking
});

export class DriftSystem {
  constructor() {
    this.reset();
  }

  reset() {
    this.active = false;
    this.current = 0; // unbanked points
    this.multiplier = 1;
    this.chainTime = 0;
    this.grace = 0;
    this.banked = 0;
    this.bestCombo = 0;
    this.longest = 0; // longest single chain, seconds
    this.events = []; // {type:'bank'|'break'|'combo', points, multiplier}
    this.inZone = false;
  }

  /** Total including unbanked points (for the HUD). */
  get total() {
    return this.banked + this.current;
  }

  update(dt, vehicle, { onTrack = true, inZone = false } = {}) {
    this.inZone = inZone;
    const drifting = vehicle.drifting && vehicle.u > DRIFT_SCORE.minSpeed;
    if (drifting && !onTrack) {
      this.breakCombo('offtrack');
      return;
    }
    if (drifting) {
      this.active = true;
      this.grace = 0;
      this.chainTime += dt;
      const angle = Math.min(1.6, Math.abs(vehicle.slip) / 0.52);
      const speed = Math.min(2.2, vehicle.u / 30);
      const zone = inZone ? DRIFT_SCORE.zoneMultiplier : 1;
      const prevMult = this.multiplier;
      this.multiplier = Math.min(DRIFT_SCORE.maxMultiplier, 1 + Math.floor(this.chainTime / DRIFT_SCORE.comboStep));
      if (this.multiplier > prevMult) this.events.push({ type: 'combo', multiplier: this.multiplier });
      this.current += DRIFT_SCORE.baseRate * angle * speed * zone * this.multiplier * dt;
      if (this.chainTime > this.longest) this.longest = this.chainTime;
    } else if (this.active) {
      this.grace += dt;
      if (this.grace > DRIFT_SCORE.chainGrace) this.bank();
    }
  }

  bank() {
    if (this.current > 0) {
      const pts = Math.round(this.current);
      this.banked += pts;
      if (pts > this.bestCombo) this.bestCombo = pts;
      this.events.push({ type: 'bank', points: pts, multiplier: this.multiplier });
    }
    this.current = 0;
    this.multiplier = 1;
    this.chainTime = 0;
    this.grace = 0;
    this.active = false;
  }

  breakCombo(reason) {
    if (this.current > 0 || this.active) {
      this.events.push({ type: 'break', points: Math.round(this.current), reason });
    }
    this.current = 0;
    this.multiplier = 1;
    this.chainTime = 0;
    this.grace = 0;
    this.active = false;
  }

  consumeEvents() {
    if (!this.events.length) return null;
    const e = this.events;
    this.events = [];
    return e;
  }
}
