// Bot sailors. One shared "captain" plan per step (which lane to take, which
// way to push, how to stop the raft spinning); each bot then walks to its own
// deck spot and blasts. Bots only press the same inputs a player has.

import { DECK_HALF } from './Sim.js';

const LANES = [];
for (let u = -0.66; u <= 0.661; u += 0.06) LANES.push(Math.round(u * 100) / 100);

export class BotCaptain {
  constructor(sim) {
    this.sim = sim;
    this.lane = 0;
    this.planT = 0;
    this.dir = 0;
    this.need = 0;
    this.offset = 0;
    this._p = { x: 0, z: 0 };
    this.autoRespawn = false;
  }

  /** Hazards and shells ahead, in river space, computed once per plan. */
  _survey(s0, speed) {
    const sim = this.sim;
    const river = sim.river;
    const obs = [];
    const pr = { s: 0, t: 0, i: 0 };
    const circ = [];
    for (const h of sim.hazards) {
      const ds = h.s - s0;
      if (ds < -6 || ds > 40) continue;
      const hw = river.at(river.hw, h.s);
      if (h.type === 'whirl') {
        obs.push({ whirl: true, t: h.u * hw, r: h.def.r * 1.25 + 2.4, hw });
        continue;
      }
      const eta = Math.max(0, ds) / Math.max(1.5, speed);
      circ.length = 0;
      h.worldCircles(sim.clock + eta, circ);
      for (const c of circ) {
        river.project(c.x, c.z, Math.round(h.s), pr);
        if (Math.abs(pr.s - h.s) > 9) continue;
        obs.push({ t: pr.t, clear: c.r + 3.0, w: ds < 14 ? 3.2 : 1.8, hw });
      }
    }
    const shells = [];
    for (const sh of sim.shells) {
      if (sh.got) continue;
      const ds = sh.s - s0;
      if (ds < 2 || ds > 24) continue;
      river.project(sh.x, sh.z, Math.round(sh.s), pr);
      shells.push({ t: pr.t, hw: river.at(river.hw, sh.s) });
    }
    return { obs, shells };
  }

  /** Lane cost: hazards in the next stretch, banks, shells. */
  _laneCost(u, survey) {
    let cost = 0.6 * u * u + 1.1 * Math.abs(u - this.lane);
    for (const o of survey.obs) {
      const tLane = u * o.hw;
      if (o.whirl) {
        const d = Math.abs(tLane - o.t) - o.r;
        if (d < 0) cost += -d * 1.4;
        continue;
      }
      const lat = Math.abs(o.t - tLane);
      if (lat < o.clear) cost += (o.clear - lat) * o.w;
    }
    for (const sh of survey.shells) if (Math.abs(sh.t - u * sh.hw) < 1.6) cost -= 0.35;
    return cost;
  }

  update(dt) {
    const sim = this.sim;
    const bots = sim.crew.filter((c) => c.bot && c.local);
    if (!bots.length) return;
    const r = sim.raft;
    const river = sim.river;
    const speed = Math.hypot(r.vx, r.vz);
    this.planT -= dt;
    if (this.planT <= 0) {
      this.planT = 0.12;
      let best = this.lane, bc = Infinity;
      const survey = this._survey(r.s, speed);
      for (const u of LANES) {
        const c = this._laneCost(u, survey);
        if (c < bc) { bc = c; best = u; }
      }
      this.lane = best;
    }
    const look = 8 + speed * 1.3;
    const P = river.pointU(Math.min(river.length, r.s + look), this.lane, this._p);
    let dx = P.x - r.x, dz = P.z - r.z;
    const dl = Math.hypot(dx, dz) || 1;
    dx /= dl; dz /= dl;
    const vTarget = 7.2;
    let ax = (dx * vTarget - r.vx) * 1.6, az = (dz * vTarget - r.vz) * 1.6;
    // lateral correction toward the chosen lane right now
    const hw = river.at(river.hw, r.s);
    const latErr = this.lane * hw - r.t;
    const i = r.hint;
    ax += river.tz[i] * latErr * 0.5;
    az += -river.tx[i] * latErr * 0.5;
    this.need = Math.hypot(ax, az);
    this.dir = Math.atan2(az, ax);
    // spin damping: offset the push line so its torque opposes the spin
    const active = Math.max(1, bots.length);
    const F = 900 * sim.k * active;
    const wantTq = -r.w * sim.inertia * 2.2;
    this.offset = Math.max(-1.3, Math.min(1.3, -wantTq / F));

    const yaw = r.yaw;
    const dlx = Math.cos(this.dir - yaw), dlz = Math.sin(this.dir - yaw);
    bots.forEach((c, k) => {
      const inp = c.input;
      if (c.mode !== 'deck') {
        // swim back to the raft
        const ex = r.x - c.wx, ez = r.z - c.wz;
        const el = Math.hypot(ex, ez) || 1;
        inp.mx = ex / el;
        inp.mz = ez / el;
        inp.blast = false;
        inp.aim = false;
        return;
      }
      const spread = bots.length > 1 ? (k - (bots.length - 1) / 2) * 0.75 : 0;
      const o = this.offset + spread;
      // stand behind the centre (relative to the push), shifted sideways by o
      let tx = -dlx * 1.45 + -dlz * o;
      let tz = -dlz * 1.45 + dlx * o;
      tx = Math.max(-DECK_HALF, Math.min(DECK_HALF, tx));
      tz = Math.max(-DECK_HALF, Math.min(DECK_HALF, tz));
      const ex = tx - c.lx, ez = tz - c.lz;
      const el = Math.hypot(ex, ez);
      const cs = Math.cos(yaw), sn = Math.sin(yaw);
      if (el > 0.12) {
        const g = Math.min(1, el * 2.5);
        inp.mx = ((ex * cs - ez * sn) / el) * g;
        inp.mz = ((ex * sn + ez * cs) / el) * g;
      } else {
        inp.mx = inp.mz = 0;
      }
      inp.aim = true;
      inp.ax = Math.cos(this.dir);
      inp.az = Math.sin(this.dir);
      const faceErr = Math.abs(Math.atan2(Math.sin(this.dir - c.face), Math.cos(this.dir - c.face)));
      inp.blast = this.need > 0.35 && el < 1.0 && faceErr < 0.9 && (c.gas > 0.12 || c.blasting);
      inp.puff = this.need > 3 && c.gas > 0.7 && faceErr < 0.4;
    });
    if (this.autoRespawn && sim.stuck > 4.5) sim.respawn();
  }
}
