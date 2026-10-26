// AI driver: follows the precomputed racing line with look-ahead steering,
// brakes to the line's speed profile, spreads out on personal lane offsets,
// overtakes on straights, steers around hazards, and uses mild, bounded
// rubber-banding by difficulty. Drives "clean" (no scripted slides) — the
// most reliable choice; the anti-spin assist keeps it from ever spinning out.

export const AI_NAMES = Object.freeze(['K. Arden', 'M. Volkova', 'J. Okafor', 'L. Moreau', 'R. Tanaka', 'S. Lindqvist', 'D. Reyes']);

const SKILL = Object.freeze({
  easy: { pace: 0.84, corner: 0.86, gain: 2.0, band: [0.9, 1.06], mistake: 0.25 },
  medium: { pace: 0.93, corner: 0.93, gain: 2.3, band: [0.95, 1.04], mistake: 0.12 },
  hard: { pace: 0.995, corner: 0.99, gain: 2.5, band: [0.985, 1.025], mistake: 0.04 },
});

const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const clamp = (x, lo, hi) => (x < lo ? lo : x > hi ? hi : x);

export class OpponentAI {
  constructor(racer, model, line, { difficulty = 'medium', index = 0, count = 1, rng, obstacles }) {
    this.racer = racer;
    this.model = model;
    this.line = line;
    this.skill = SKILL[difficulty] || SKILL.medium;
    this.index = index;
    this.count = count;
    this.obstacles = obstacles;
    // personal traits (seeded): pace spread so the field strings out
    this.pace = this.skill.pace * (1 - index * 0.012) * (rng ? rng.range(0.985, 1.01) : 1);
    this.lane = ((index % 3) - 1) * 0.9 + (rng ? rng.range(-0.4, 0.4) : 0);
    this.controls = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false };
    this._pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    this._hz = { d: 0, t: 0, r: 0 };
    this.reset();
  }

  reset() {
    this.avoid = 0;
    this.avoidTarget = 0;
    this.passSide = 0;
    this.passTime = 0;
    this.band = 1;
    this.controls.throttle = this.controls.brake = this.controls.steer = 0;
  }

  drive(dt, race) {
    const r = this.racer;
    const v = r.vehicle;
    const m = this.model;
    const s = r.proj.s;
    const speed = Math.max(0, v.u);

    // --- rubber band (bounded by difficulty) ---
    const player = race.player;
    if (player && player !== r && !player.finished) {
      const gap = r.progress - player.progress; // + = ahead of the player
      const [lo, hi] = this.skill.band;
      let target = 1;
      if (gap > 60) target = lo + (1 - lo) * Math.max(0, 1 - (gap - 60) / 240);
      else if (gap < -60) target = 1 + (hi - 1) * Math.min(1, (-gap - 60) / 240);
      this.band += (target - this.band) * Math.min(1, dt * 0.5);
    } else this.band += (1 - this.band) * Math.min(1, dt * 0.5);

    // --- overtaking: car ahead in our lane → pick the side with more room ---
    let ahead = null;
    let aheadD = 22;
    for (const o of race.racers) {
      if (o === r) continue;
      const d = m.deltaS(s, o.proj.s);
      if (d > 0 && d < aheadD && Math.abs(o.proj.t - r.proj.t) < 2.4) {
        aheadD = d;
        ahead = o;
      }
    }
    if (ahead && ahead.vehicle.u < speed + 2) {
      if (this.passTime <= 0) {
        const hw = m.halfWidthAt(s);
        const roomL = ahead.proj.t + hw;
        const roomR = hw - ahead.proj.t;
        this.passSide = roomR > roomL ? 1 : -1;
        this.passTime = 2.2;
      }
    }
    if (this.passTime > 0) this.passTime -= dt;
    else this.passSide = 0;

    // --- hazard avoidance ---
    const hw = m.halfWidthAt(s);
    const look = 10 + speed * 0.5;
    const sT = s + look;
    let tTarget = this.line.offsetAt(sT) + this.lane;
    if (this.passSide !== 0 && ahead) tTarget = ahead.proj.t + this.passSide * 3.2;
    this.avoidTarget = 0;
    if (this.obstacles && this.obstacles.hazardAhead(s, tTarget, 30 + speed * 0.9, 1.3, this._hz)) {
      const h = this._hz;
      const left = h.t - (h.r + 1.9);
      const right = h.t + (h.r + 1.9);
      const pick = Math.abs(left - tTarget) < Math.abs(right - tTarget) ? left : right;
      const limited = clamp(pick, -hw + 1.6, hw - 1.6);
      // if clamping pushed us back into the hazard, take the other side
      this.avoidTarget = Math.abs(limited - h.t) < h.r + 1.2 ? clamp(pick === left ? right : left, -hw + 1.6, hw - 1.6) - tTarget : limited - tTarget;
    }
    this.avoid += (this.avoidTarget - this.avoid) * Math.min(1, dt * 3);
    tTarget = clamp(tTarget + this.avoid, -hw + 1.5, hw - 1.5);

    // --- steering: aim at the look-ahead point ---
    m.pointAt(sT, tTarget, this._pt);
    const desired = Math.atan2(this._pt.x - v.x, this._pt.z - v.z);
    const err = wrap(desired - v.h);
    const c = this.controls;
    c.steer = clamp(-err * this.skill.gain + v.r * 0.1, -1, 1);

    // --- speed: follow the line's profile (with look-ahead for braking) ---
    const brakeLook = speed * 0.55 + 8;
    let vTarget = this.line.minSpeedAhead(s, brakeLook) * this.skill.corner;
    vTarget = Math.min(vTarget, v.params.vTop * this.pace);
    vTarget *= this.band;
    // easier AIs lift a little mid-corner (bounded "mistakes", never spins)
    if (this.skill.mistake > 0 && Math.abs(m.kappa[r.proj.i]) > 1 / 60) vTarget *= 1 - this.skill.mistake * 0.15;
    const dv = vTarget - speed;
    if (dv > 0) {
      c.throttle = clamp(dv * 0.4 + 0.15, 0, 1);
      c.brake = 0;
    } else {
      c.throttle = dv > -1.5 ? 0.15 : 0;
      c.brake = dv < -1.5 ? clamp(-dv * 0.22, 0, 1) : 0;
    }
    // straighten out if sliding (clean driving)
    if (Math.abs(v.slip) > 0.2) c.throttle *= 0.4;
    c.handbrake = false;
    c.boost = v.boostMeter > 0.6;
    return c;
  }
}
