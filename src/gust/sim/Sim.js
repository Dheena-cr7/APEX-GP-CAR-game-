// The raft world: rigid-body raft on a flowing river, the crew who walk its
// deck and push it with gust blasts, kinematic hazards, pickups, checkpoints.
// Pure JS (no three.js) so it runs the same in the browser, on every online
// peer, and in the Node checks.
//
// Raft frame: local (lx, lz) -> world: x = cx + lx*cos(yaw) - lz*sin(yaw),
//                                       z = cz + lx*sin(yaw) + lz*cos(yaw).
// (three.js: mesh.rotation.y = -yaw.)  Local +x points downstream at the start.

import { River } from './River.js';
import { finishS } from './Courses.js';

export const RAFT_HALF = 2.0;
export const DECK_HALF = 1.68;
export const MAST_HALF = 0.5;
export const CREW_R = 0.3;
export const COUNTDOWN = 3.2;
export const RESPAWN_PENALTY = 3;

const G = 9.81;
// thrust per sailor shrinks with crew size so total pace stays similar
const THRUST = 900;
const CREW_K = [1.5, 1.5, 0.9, 0.68, 0.56];
const PUFF_J = 520;
const PUFF_COST = 0.34;
const PUFF_CD = 0.9;
const GAS_DRAIN = 0.25;
const GAS_REGEN = 0.45;
const GAS_DELAY = 0.3;
const WALK = 3.4;
const WALK_BLAST = 1.5;
const SWIM = 2.4;
const RESCUE_AFTER = 6;
const KNOCK_V = 3.0;
const HULL = [
  [1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1],
].map(([a, b]) => [a * RAFT_HALF, b * RAFT_HALF]);
const DRAG_PTS = [[1.6, 1.6], [1.6, -1.6], [-1.6, 1.6], [-1.6, -1.6], [0, 0]];

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const wrap = (a) => {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
};

// ---------------------------------------------------------------- hazards

class Hazard {
  constructor(def, river) {
    this.def = def;
    this.type = def.type;
    this.s = def.s;
    this.u = def.u || 0;
    this.river = river;
    this.circles = []; // local {ox, oz, r}
    this.reach = 0;
    this._p = { x: 0, z: 0 };
    const hw = river.at(river.hw, def.s);
    const base = river.point(def.s, this.u * hw);
    this.baseX = base.x;
    this.baseZ = base.z;
    this.tx = base.tx;
    this.tz = base.tz;
    this.heading = Math.atan2(base.tz, base.tx);
    this.hw = hw;
    if (def.type === 'rock' || def.type === 'floe') {
      this.circles.push({ ox: 0, oz: 0, r: def.r });
      this.reach = def.r + (def.as || 0);
    } else if (def.type === 'log') {
      const n = Math.max(3, Math.round(def.len / 0.8));
      const r = 0.42;
      for (let i = 0; i < n; i++) {
        const o = -def.len / 2 + r + ((def.len - 2 * r) * i) / (n - 1);
        this.circles.push({ ox: o, oz: 0, r });
      }
      this.reach = def.len / 2 + (def.amp || 0) * hw;
    } else if (def.type === 'spinner') {
      this.circles.push({ ox: 0, oz: 0, r: 0.65, pivot: true });
      const arms = def.arms || 2;
      const n = Math.max(3, Math.round(def.len / 0.85));
      for (let a = 0; a < arms; a++) {
        const ang = (a / arms) * Math.PI * 2;
        for (let i = 1; i <= n; i++) {
          const d = (def.len * i) / n;
          this.circles.push({ ox: Math.cos(ang) * d, oz: Math.sin(ang) * d, r: 0.42 });
        }
      }
      this.reach = def.len + 0.5;
    } else if (def.type === 'whirl') {
      this.reach = 0;
    }
  }

  /** World pose at time t: {x, z, a} (a = rotation angle of local axes). */
  pose(t, out = this._p) {
    const d = this.def;
    if (d.type === 'log') {
      const ph = (Math.PI * 2 * t) / d.period + (d.phase || 0);
      const off = Math.sin(ph) * d.amp * this.hw;
      out.x = this.baseX + this.tz * off;
      out.z = this.baseZ - this.tx * off;
      out.a = this.heading + ((d.angle || 90) * Math.PI) / 180 + Math.sin(ph * 0.5) * 0.12;
    } else if (d.type === 'floe') {
      const ph = (Math.PI * 2 * t) / d.period + (d.phase || 0);
      const along = Math.sin(ph) * (d.as || 0);
      const lat = Math.cos(ph) * (d.au || 0) * this.hw;
      out.x = this.baseX + this.tx * along + this.tz * lat;
      out.z = this.baseZ + this.tz * along - this.tx * lat;
      out.a = ph * 0.15;
    } else if (d.type === 'spinner') {
      out.x = this.baseX;
      out.z = this.baseZ;
      out.a = this.heading + d.omega * t + (d.phase || 0);
    } else {
      out.x = this.baseX;
      out.z = this.baseZ;
      out.a = 0;
    }
    return out;
  }

  /** Fill `out` with world circles {x, z, r, vx, vz} at time t (pooled objects). */
  worldCircles(t, out, pool = null) {
    const p = this.pose(t, this._pa || (this._pa = { x: 0, z: 0, a: 0 }));
    const eps = 1 / 60;
    const q = this.pose(t + eps, this._pb || (this._pb = { x: 0, z: 0, a: 0 }));
    const c = Math.cos(p.a), s = Math.sin(p.a);
    const c2 = Math.cos(q.a), s2 = Math.sin(q.a);
    for (const k of this.circles) {
      const x = p.x + k.ox * c - k.oz * s;
      const z = p.z + k.ox * s + k.oz * c;
      const x2 = q.x + k.ox * c2 - k.oz * s2;
      const z2 = q.z + k.ox * s2 + k.oz * c2;
      const o = pool ? pool.get() : {};
      o.x = x; o.z = z; o.r = k.r; o.vx = (x2 - x) / eps; o.vz = (z2 - z) / eps; o.h = this;
      out.push(o);
    }
  }
}

// ---------------------------------------------------------------- crew

function makeCrew(spec, i) {
  // starting spots: around the mast
  const spots = [[-1.2, 0], [1.1, 0.9], [1.1, -0.9], [-0.4, 1.25]];
  const [lx, lz] = spots[i % 4];
  return {
    slot: spec.slot ?? i,
    name: spec.name || 'Sailor',
    color: spec.color ?? i,
    hat: spec.hat ?? i,
    bot: !!spec.bot,
    local: spec.local !== false,
    mode: 'deck',
    lx, lz,
    wx: 0, wz: 0, wvx: 0, wvz: 0,
    vx: 0, vz: 0, // deck walking velocity (local)
    air: 0, vy: 0,
    face: 0,
    blast: 0,
    blasting: false,
    gas: 1,
    idle: 0,
    out: false,
    puffCd: 0,
    puffSeq: 0,
    puffSeen: 0,
    swimT: 0,
    hint: -1,
    walk: 0,
    speed: 0,
    input: { mx: 0, mz: 0, ax: 0, az: 0, aim: false, blast: false, puff: false },
  };
}

// ---------------------------------------------------------------- sim

export class Sim {
  /**
   * @param {object} course course definition (Courses.js)
   * @param {{ crew: object[], seed?: number }} opts
   */
  constructor(course, { crew = [{}], seed = 1 } = {}) {
    this.course = course;
    this.river = new River(course.river);
    this.rng = mulberry32(seed);
    this.hazards = course.hazards.map((d) => new Hazard(d, this.river));
    for (const h of this.hazards) {
      if (h.type === 'whirl') this.river.addWhirl({ x: h.baseX, z: h.baseZ, r: h.def.r, strength: h.def.strength, spin: h.def.spin || 1 });
    }
    this.shells = course.shells.map((p, i) => {
      const w = this.river.pointU(p.s, p.u, { x: 0, z: 0 });
      return { i, s: p.s, x: w.x, z: w.z, got: false };
    });
    this.checkpoints = course.checkpoints.slice().sort((a, b) => a - b);
    this.finishS = finishS(this.river);
    this.startS = 12;
    this.crew = crew.map((c, i) => makeCrew(c, i));
    this.events = [];
    this.clock = 0; // world time (hazards, water) since the sim was created
    this.raceTime = 0;
    this.phase = 'ready'; // ready | countdown | run | finished
    this.cd = 0;
    this.cpIndex = 0;
    this.finishTime = 0;
    this.respawns = 0;
    this.stuck = 0;
    this._circ = [];
    this._pr = { s: 0, t: 0, i: 0 };
    this._fl = { x: 0, z: 0 };
    this.raft = { x: 0, z: 0, yaw: 0, vx: 0, vz: 0, w: 0, y: 0, vy: 0, s: 0, t: 0, hint: -1, air: false, lastImpact: 0 };
    this._placeRaft(this.startS);
    this.setCrewCount(this.crew.length);
  }

  setCrewCount(n) {
    const c = Math.max(1, Math.min(4, n));
    this.mass = 320 + 45 * c;
    this.inertia = (this.mass * (16 + 16)) / 12;
    this.k = CREW_K[c];
    this.k1 = 0.32 * this.mass;
    this.k2 = 42;
  }

  addCrew(spec) {
    const c = makeCrew(spec, this.crew.length);
    this.crew.push(c);
    this.setCrewCount(this.crew.length);
    return c;
  }

  removeCrew(slot) {
    this.crew = this.crew.filter((c) => c.slot !== slot);
    this.setCrewCount(this.crew.length);
  }

  crewBySlot(slot) {
    return this.crew.find((c) => c.slot === slot);
  }

  _placeRaft(s) {
    const r = this.raft;
    const p = this.river.point(s, 0);
    r.x = p.x;
    r.z = p.z;
    r.yaw = Math.atan2(p.tz, p.tx);
    r.vx = r.vz = r.w = 0;
    r.y = this.river.at(this.river.h, s);
    r.vy = 0;
    r.air = false;
    r.hint = -1;
    const pr = this.river.project(r.x, r.z, -1, this._pr);
    r.s = pr.s;
    r.t = pr.t;
    r.hint = pr.i;
  }

  startCountdown() {
    if (this.phase !== 'ready') return;
    this.phase = 'countdown';
    this.cd = COUNTDOWN;
    this.events.push({ type: 'countdown' });
  }

  /** Back to the last checkpoint (+penalty). */
  respawn() {
    if (this.phase !== 'run') return;
    const s = this.cpIndex > 0 ? this.checkpoints[this.cpIndex - 1] + 2 : this.startS;
    this._placeRaft(s);
    for (const c of this.crew) {
      if (c.local && c.mode === 'swim') this._rescue(c, false);
    }
    this.raceTime += RESPAWN_PENALTY;
    this.respawns++;
    this.stuck = 0;
    this.events.push({ type: 'respawn' });
  }

  // ------------------------------------------------------------ coordinates

  toWorld(lx, lz, out = { x: 0, z: 0 }) {
    const r = this.raft, c = Math.cos(r.yaw), s = Math.sin(r.yaw);
    out.x = r.x + lx * c - lz * s;
    out.z = r.z + lx * s + lz * c;
    return out;
  }

  toLocal(x, z, out = { x: 0, z: 0 }) {
    const r = this.raft, c = Math.cos(r.yaw), s = Math.sin(r.yaw);
    const dx = x - r.x, dz = z - r.z;
    out.x = dx * c + dz * s;
    out.z = -dx * s + dz * c;
    return out;
  }

  /** World position of a crew member (deck or water). */
  crewWorld(c, out = { x: 0, z: 0 }) {
    if (c.mode === 'deck') return this.toWorld(c.lx, c.lz, out);
    out.x = c.wx;
    out.z = c.wz;
    return out;
  }

  // ------------------------------------------------------------ crew update

  _updateCrew(c, dt) {
    const inp = c.input;
    const r = this.raft;
    c.puffCd = Math.max(0, c.puffCd - dt);
    let mx = inp.mx, mz = inp.mz;
    const ml = Math.hypot(mx, mz);
    if (ml > 1) { mx /= ml; mz /= ml; }
    if (c.mode === 'deck') {
      // facing target: explicit aim, else the walking direction
      let target = null;
      if (inp.aim && (inp.ax || inp.az)) target = Math.atan2(inp.az, inp.ax);
      else if (ml > 0.2) target = Math.atan2(mz, mx);
      if (target !== null) {
        const d = wrap(target - c.face);
        const rate = 11 * dt;
        c.face += Math.max(-rate, Math.min(rate, d));
        c.face = wrap(c.face);
      }
      // gas
      const want = inp.blast && !c.out && c.gas > 0 && this.phase !== 'finished';
      c.blasting = want;
      if (want) {
        c.gas = Math.max(0, c.gas - GAS_DRAIN * dt);
        c.idle = 0;
        if (c.gas <= 0) {
          c.out = true;
          this.events.push({ type: 'empty', slot: c.slot });
        }
      } else {
        c.idle += dt;
        if (c.idle > GAS_DELAY) c.gas = Math.min(1, c.gas + GAS_REGEN * dt);
        if (c.out && c.gas >= 0.3) c.out = false;
      }
      c.blast += ((want ? 1 : 0) - c.blast) * Math.min(1, dt * (want ? 9 : 14));
      if (inp.puff && c.puffCd <= 0 && c.gas >= PUFF_COST && this.phase !== 'finished') {
        c.gas -= PUFF_COST;
        c.puffCd = PUFF_CD;
        c.puffSeq++;
        c.idle = 0;
      }
      inp.puff = false;
      // walking: input is in world directions, the deck is rotated by yaw
      const cs = Math.cos(r.yaw), sn = Math.sin(r.yaw);
      const lmx = mx * cs + mz * sn, lmz = -mx * sn + mz * cs;
      const top = c.blasting ? WALK_BLAST : WALK;
      const ax = lmx * top - c.vx, az = lmz * top - c.vz;
      const acc = Math.min(1, dt * 14);
      c.vx += ax * acc;
      c.vz += az * acc;
      c.lx += c.vx * dt;
      c.lz += c.vz * dt;
      this._clampDeck(c);
      c.speed = Math.hypot(c.vx, c.vz);
      c.walk += c.speed * dt * 3.2;
      if (c.air > 0 || c.vy !== 0) {
        c.vy -= G * dt;
        c.air += c.vy * dt;
        if (c.air <= 0) { c.air = 0; c.vy = 0; }
      }
    } else {
      this._updateSwimmer(c, dt, mx, mz);
    }
  }

  _clampDeck(c) {
    const lim = DECK_HALF;
    if (c.lx > lim) { c.lx = lim; c.vx = Math.min(0, c.vx); }
    if (c.lx < -lim) { c.lx = -lim; c.vx = Math.max(0, c.vx); }
    if (c.lz > lim) { c.lz = lim; c.vz = Math.min(0, c.vz); }
    if (c.lz < -lim) { c.lz = -lim; c.vz = Math.max(0, c.vz); }
    // the mast and its crate stand in the middle
    const m = MAST_HALF + CREW_R;
    if (Math.abs(c.lx) < m && Math.abs(c.lz) < m) {
      const px = m - Math.abs(c.lx), pz = m - Math.abs(c.lz);
      if (px < pz) c.lx = Math.sign(c.lx || 1) * m;
      else c.lz = Math.sign(c.lz || 1) * m;
    }
  }

  _separateCrew() {
    const list = this.crew;
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      if (a.mode !== 'deck') continue;
      for (let j = i + 1; j < list.length; j++) {
        const b = list[j];
        if (b.mode !== 'deck') continue;
        const dx = b.lx - a.lx, dz = b.lz - a.lz;
        const d = Math.hypot(dx, dz);
        const min = CREW_R * 2;
        if (d < min && d > 1e-5) {
          const p = (min - d) / 2;
          const nx = dx / d, nz = dz / d;
          // only move crew this peer owns; a remote one is corrected by its owner
          const wa = a.local ? 1 : 0, wb = b.local ? 1 : 0;
          const sum = wa + wb || 1;
          a.lx -= nx * p * 2 * (wa / sum);
          a.lz -= nz * p * 2 * (wa / sum);
          b.lx += nx * p * 2 * (wb / sum);
          b.lz += nz * p * 2 * (wb / sum);
          if (a.local) this._clampDeck(a);
          if (b.local) this._clampDeck(b);
        }
      }
    }
  }

  _updateSwimmer(c, dt, mx, mz) {
    c.swimT += dt;
    // flight after being flung, then splash into the water
    if (c.air > 0 || c.vy > 0) {
      c.vy -= G * dt;
      c.air += c.vy * dt;
      if (c.air <= 0) {
        c.air = 0;
        c.vy = 0;
        this.events.push({ type: 'splash', x: c.wx, z: c.wz, power: 1, slot: c.slot });
      }
    }
    const pr = this.river.project(c.wx, c.wz, c.hint, this._prw || (this._prw = { s: 0, t: 0, i: 0 }));
    c.hint = pr.i;
    const fl = this.river.flow(c.wx, c.wz, pr, this.clock, this._fl);
    const k = Math.min(1, dt * 1.2);
    c.wvx += (fl.x - c.wvx) * k;
    c.wvz += (fl.z - c.wvz) * k;
    if (c.air <= 0) {
      c.wvx += mx * 7 * dt;
      c.wvz += mz * 7 * dt;
      const rx = c.wvx - fl.x, rz = c.wvz - fl.z;
      const rl = Math.hypot(rx, rz);
      if (rl > SWIM) {
        c.wvx = fl.x + (rx / rl) * SWIM;
        c.wvz = fl.z + (rz / rl) * SWIM;
      }
    }
    c.wx += c.wvx * dt;
    c.wz += c.wvz * dt;
    if (mx || mz) c.face = Math.atan2(mz, mx);
    c.walk += dt * 6;
    // banks
    const hw = this.river.at(this.river.hw, pr.s) - 0.5;
    if (Math.abs(pr.t) > hw) {
      const i = pr.i;
      const push = Math.abs(pr.t) - hw;
      const sg = Math.sign(pr.t);
      c.wx -= this.river.tz[i] * push * sg;
      c.wz += this.river.tx[i] * push * sg;
    }
    // climb back aboard when touching the raft
    const l = this.toLocal(c.wx, c.wz);
    const reach = RAFT_HALF + 0.55;
    if (c.swimT > 0.6 && c.air <= 0 && Math.abs(l.x) < reach && Math.abs(l.z) < reach) {
      c.mode = 'deck';
      c.lx = Math.max(-DECK_HALF, Math.min(DECK_HALF, l.x));
      c.lz = Math.max(-DECK_HALF, Math.min(DECK_HALF, l.z));
      c.vx = c.vz = 0;
      c.air = 0.01;
      c.vy = 3.2;
      this._clampDeck(c);
      c.aboardAt = this.clock;
      this.events.push({ type: 'climb', slot: c.slot });
    } else if (c.swimT > RESCUE_AFTER) {
      this._rescue(c, true);
    }
  }

  _rescue(c, ev) {
    c.mode = 'deck';
    c.lx = -1.2;
    c.lz = 0;
    c.vx = c.vz = 0;
    c.air = 1.2;
    c.vy = 2;
    this._clampDeck(c);
    c.aboardAt = this.clock;
    if (ev) this.events.push({ type: 'rescue', slot: c.slot });
  }

  _knock(c, nx, nz, power) {
    if (c.mode !== 'deck' || !c.local) return;
    const edge = Math.max(Math.abs(c.lx), Math.abs(c.lz)) / DECK_HALF;
    // sailors who just climbed back get a moment of grace
    const grace = this.clock - (c.aboardAt || -9) < 2.5;
    const chance = grace ? 0 : Math.min(0.6, (power - KNOCK_V) / 4) * (0.25 + 0.75 * edge * edge);
    if (this.rng() >= chance) {
      // a stumble instead: a little hop
      if (c.air <= 0) { c.air = 0.01; c.vy = 1.6 + power * 0.25; }
      return;
    }
    const w = this.crewWorld(c);
    const r = this.raft;
    // fling outward from the raft centre, away from the hit
    let ox = w.x - r.x, oz = w.z - r.z;
    const ol = Math.hypot(ox, oz) || 1;
    ox /= ol; oz /= ol;
    const fx = ox * 0.6 + nx * 0.4, fz = oz * 0.6 + nz * 0.4;
    const fl = Math.hypot(fx, fz) || 1;
    c.mode = 'swim';
    c.wx = w.x + (fx / fl) * 0.8;
    c.wz = w.z + (fz / fl) * 0.8;
    c.wvx = r.vx + (fx / fl) * (2.5 + power * 0.4);
    c.wvz = r.vz + (fz / fl) * (2.5 + power * 0.4);
    c.air = 0.4;
    c.vy = 4 + power * 0.3;
    c.swimT = 0;
    c.hint = r.hint;
    c.blast = 0;
    c.blasting = false;
    this.events.push({ type: 'knock', slot: c.slot });
  }

  // ------------------------------------------------------------ step

  step(dt) {
    this.clock += dt;
    const r = this.raft;
    if (this.phase === 'countdown') {
      this.cd -= dt;
      if (this.cd <= 0) {
        this.phase = 'run';
        this.raceTime = 0;
        this.events.push({ type: 'go' });
      }
    } else if (this.phase === 'run') {
      this.raceTime += dt;
    }

    for (const c of this.crew) if (c.local) this._updateCrew(c, dt);
    this._separateCrew();

    const held = this.phase === 'ready' || this.phase === 'countdown';
    if (held) {
      // moored at the dock: gentle bob only
      r.vx = r.vz = r.w = 0;
      for (const c of this.crew) c.puffSeen = c.puffSeq;
    } else {
      this._forces(dt);
    }

    const pr = this.river.project(r.x, r.z, r.hint, this._pr);
    r.s = pr.s;
    r.t = pr.t;
    r.hint = pr.i;
    this._vertical(dt);
    if (!held) {
      this._collide();
      this._collide();
    }
    this._pickups();
    this._progress(dt);
  }

  _forces(dt) {
    const r = this.raft;
    const M = this.mass, I = this.inertia;
    let fx = 0, fz = 0, tq = 0;
    const cs = Math.cos(r.yaw), sn = Math.sin(r.yaw);
    // gust thrust from every sailor on deck, at the sailor's position
    for (const c of this.crew) {
      if (c.mode !== 'deck') continue;
      const rx = c.lx * cs - c.lz * sn, rz = c.lx * sn + c.lz * cs;
      if (c.blast > 0.01) {
        const f = THRUST * this.k * c.blast;
        const dx = Math.cos(c.face) * f, dz = Math.sin(c.face) * f;
        fx += dx;
        fz += dz;
        tq += rx * dz - rz * dx;
      }
      if (c.puffSeq !== c.puffSeen) {
        const n = c.puffSeq - c.puffSeen;
        c.puffSeen = c.puffSeq;
        if (n > 0 && n < 4) {
          const j = PUFF_J * this.k * n;
          const jx = Math.cos(c.face) * j, jz = Math.sin(c.face) * j;
          r.vx += jx / M;
          r.vz += jz / M;
          r.w += (rx * jz - rz * jx) / I;
          this.events.push({ type: 'puff', slot: c.slot });
        }
      }
    }
    // water drag at five points: current pushes, shear spins
    const n = DRAG_PTS.length;
    const prs = this._prs || (this._prs = { s: 0, t: 0, i: 0 });
    for (const [lx, lz] of DRAG_PTS) {
      const rx = lx * cs - lz * sn, rz = lx * sn + lz * cs;
      const px = r.x + rx, pz = r.z + rz;
      const pr = this.river.project(px, pz, r.hint, prs);
      const fl = this.river.flow(px, pz, pr, this.clock, this._fl);
      const vx = r.vx - r.w * rz - fl.x, vz = r.vz + r.w * rx - fl.z;
      const vl = Math.hypot(vx, vz);
      const k = (this.k1 + this.k2 * vl) / n;
      const dx = -vx * k, dz = -vz * k;
      fx += dx;
      fz += dz;
      tq += rx * dz - rz * dx;
    }
    // airborne over a fall: no water grip
    const grip = r.air ? 0.15 : 1;
    // waterfall slope pulls the raft downhill
    const slope = this.river.at(this.river.slope, r.s);
    if (slope < -0.02 && !r.air) {
      const i = r.hint;
      fx += this.river.tx[i] * M * G * -slope * 0.35;
      fz += this.river.tz[i] * M * G * -slope * 0.35;
    }
    // after the finish the crew drops anchor: strong extra drag
    if (this.phase === 'finished') {
      fx -= r.vx * M * 0.9;
      fz -= r.vz * M * 0.9;
      tq -= r.w * I * 0.9;
    }
    r.vx += ((fx * grip) / M) * dt;
    r.vz += ((fz * grip) / M) * dt;
    r.w += ((tq * grip) / I) * dt;
    r.w -= r.w * Math.min(1, 0.25 * dt);
    if (r.w > 3) r.w = 3;
    if (r.w < -3) r.w = -3;
    r.x += r.vx * dt;
    r.z += r.vz * dt;
    r.yaw = wrap(r.yaw + r.w * dt);
  }

  _vertical(dt) {
    const r = this.raft;
    const surf = this.river.at(this.river.h, r.s);
    if (r.y > surf + 0.04) {
      r.air = true;
      r.vy -= G * dt;
      r.y += r.vy * dt;
      if (r.y <= surf) {
        const hit = -r.vy;
        r.y = surf;
        r.vy = 0;
        r.air = false;
        if (hit > 2) {
          this.events.push({ type: 'land', x: r.x, z: r.z, power: hit });
          for (const c of this.crew) {
            if (c.local && c.mode === 'deck' && c.air <= 0) { c.air = 0.01; c.vy = 1 + hit * 0.35; }
          }
          // a hard landing can throw a sailor overboard
          if (hit > 5.5) for (const c of this.crew) this._knock(c, 0, 0, hit * 0.6);
        }
      }
    } else {
      // on the water: follow the surface (falls drop faster than this only
      // when the raft outruns gravity, which makes it fly off the lip)
      const prev = r.y;
      r.y = surf;
      const vy = (surf - prev) / dt;
      if (vy < r.vy - G * dt * 1.01) {
        // the surface fell away faster than gravity allows: airborne
        r.y = prev + (r.vy - G * dt) * dt;
        r.vy -= G * dt;
        r.air = true;
      } else {
        r.vy = vy;
        r.air = false;
      }
    }
  }

  _contact(px, pz, nx, nz, pen, ovx, ovz, e, power) {
    const r = this.raft;
    const M = this.mass, I = this.inertia;
    r.x += nx * pen;
    r.z += nz * pen;
    const rx = px - r.x, rz = pz - r.z;
    const vx = r.vx - r.w * rz - ovx, vz = r.vz + r.w * rx - ovz;
    const vn = vx * nx + vz * nz;
    if (vn >= 0) return 0;
    const rn = rx * nz - rz * nx;
    const j = (-(1 + e) * vn) / (1 / M + (rn * rn) / I);
    r.vx += (j * nx) / M;
    r.vz += (j * nz) / M;
    r.w += (rn * j) / I;
    // friction along the surface
    const tx = -nz, tz = nx;
    const vt = vx * tx + vz * tz;
    const rt = rx * tz - rz * tx;
    let jt = -vt / (1 / M + (rt * rt) / I);
    const maxF = 0.25 * j;
    jt = Math.max(-maxF, Math.min(maxF, jt));
    r.vx += (jt * tx) / M;
    r.vz += (jt * tz) / M;
    r.w += (rt * jt) / I;
    const hit = -vn;
    if (hit > 0.8 && this.clock - r.lastImpact > 0.18) {
      r.lastImpact = this.clock;
      this.events.push({ type: 'impact', x: px, z: pz, power: hit, kind: power });
      if (hit > KNOCK_V) for (const c of this.crew) this._knock(c, nx, nz, hit);
    }
    return hit;
  }

  _collide() {
    const r = this.raft;
    const cs = Math.cos(r.yaw), sn = Math.sin(r.yaw);
    const H = RAFT_HALF;
    // hazards
    const circ = this._circ;
    circ.length = 0;
    const pool = this._pool || (this._pool = { items: [], n: 0, get() { if (this.n >= this.items.length) this.items.push({}); return this.items[this.n++]; } });
    pool.n = 0;
    for (const h of this.hazards) {
      if (!h.circles.length) continue;
      if (Math.abs(h.s - r.s) > h.reach + 8) continue;
      h.worldCircles(this.clock, circ, pool);
    }
    for (const c of circ) {
      const dx = c.x - r.x, dz = c.z - r.z;
      if (dx * dx + dz * dz > (H * 1.5 + c.r) ** 2) continue;
      // circle centre in raft space
      const lx = dx * cs + dz * sn, lz = -dx * sn + dz * cs;
      const qx = Math.max(-H, Math.min(H, lx)), qz = Math.max(-H, Math.min(H, lz));
      let nlx = qx - lx, nlz = qz - lz;
      let d = Math.hypot(nlx, nlz);
      let pen;
      if (d < 1e-6) {
        // centre inside the hull: push out along the shallowest axis
        const px = H - Math.abs(lx), pz = H - Math.abs(lz);
        if (px < pz) { nlx = -Math.sign(lx || 1); nlz = 0; pen = px + c.r; }
        else { nlx = 0; nlz = -Math.sign(lz || 1); pen = pz + c.r; }
        d = 1;
      } else {
        if (d >= c.r) continue;
        pen = c.r - d;
        nlx /= d;
        nlz /= d;
      }
      // normal from the circle toward the raft, in world space
      const nx = -(nlx * cs - nlz * sn), nz = -(nlx * sn + nlz * cs);
      const wpx = r.x + qx * cs - qz * sn, wpz = r.z + qx * sn + qz * cs;
      const e = c.h.type === 'spinner' ? 0.4 : c.h.type === 'log' ? 0.3 : 0.35;
      this._contact(wpx, wpz, -nx, -nz, pen, c.vx, c.vz, e, c.h.type);
    }
    // river banks: hull points against the half width
    let worst = null, wd = 0;
    const prs = this._prs || (this._prs = { s: 0, t: 0, i: 0 });
    const w0 = this._worst || (this._worst = { px: 0, pz: 0, i: 0, sg: 0 });
    for (const [hx, hz] of HULL) {
      const px = r.x + hx * cs - hz * sn, pz = r.z + hx * sn + hz * cs;
      const pr = this.river.project(px, pz, r.hint, prs);
      const lim = this.river.at(this.river.hw, pr.s) - 0.15;
      const over = Math.abs(pr.t) - lim;
      if (over > wd) {
        wd = over;
        w0.px = px; w0.pz = pz; w0.i = pr.i; w0.sg = Math.sign(pr.t);
        worst = w0;
      }
    }
    if (worst) {
      const i = worst.i;
      // inward normal: toward the centreline
      const nx = -this.river.tz[i] * worst.sg, nz = this.river.tx[i] * worst.sg;
      this._contact(worst.px, worst.pz, nx, nz, wd, 0, 0, 0.2, 'bank');
    }
    // never let the start dock / end of the river leak
    if (r.s < 2) {
      const p = this.river.point(2, r.t);
      r.x = p.x;
      r.z = p.z;
      r.vx = Math.max(0, r.vx);
    }
  }

  _pickups() {
    const r = this.raft;
    const cs = Math.cos(r.yaw), sn = Math.sin(r.yaw);
    const reach = RAFT_HALF + 0.7;
    for (const sh of this.shells) {
      if (sh.got || Math.abs(sh.s - r.s) > 8) continue;
      const dx = sh.x - r.x, dz = sh.z - r.z;
      const lx = dx * cs + dz * sn, lz = -dx * sn + dz * cs;
      if (Math.abs(lx) < reach && Math.abs(lz) < reach) {
        sh.got = true;
        this.events.push({ type: 'shell', i: sh.i, x: sh.x, z: sh.z });
      }
    }
  }

  _progress(dt) {
    const r = this.raft;
    if (this.phase !== 'run') return;
    if (this.authority === false) {
      this.stuck = Math.hypot(r.vx, r.vz) < 0.35 ? this.stuck + dt : 0;
      return;
    }
    while (this.cpIndex < this.checkpoints.length && r.s >= this.checkpoints[this.cpIndex]) {
      this.cpIndex++;
      this.events.push({ type: 'checkpoint', index: this.cpIndex });
    }
    if (r.s >= this.finishS) {
      this.phase = 'finished';
      this.finishTime = this.raceTime;
      this.events.push({ type: 'finish', time: this.finishTime });
      return;
    }
    const sp = Math.hypot(r.vx, r.vz);
    this.stuck = sp < 0.35 ? this.stuck + dt : Math.max(0, this.stuck - dt * 2);
  }

  get shellCount() {
    let n = 0;
    for (const s of this.shells) if (s.got) n++;
    return n;
  }

  // ------------------------------------------------------------ network helpers

  raftState() {
    const r = this.raft;
    return [r.x, r.z, r.yaw, r.vx, r.vz, r.w, r.y, r.vy];
  }

  crewState(c) {
    const m = c.mode === 'deck';
    return [c.slot, m ? 0 : 1, m ? c.lx : c.wx, m ? c.lz : c.wz, c.face, c.blasting ? 1 : 0, c.gas, c.puffSeq, c.air, m ? 0 : c.wvx, m ? 0 : c.wvz];
  }

  applyCrewState(c, a) {
    c.mode = a[1] ? 'swim' : 'deck';
    if (c.mode === 'deck') {
      const dl = Math.hypot(a[2] - c.lx, a[3] - c.lz);
      c.speed = c.speed * 0.8 + Math.min(4, dl * 30) * 0.2;
      c.walk += dl * 3.2;
      c.lx = a[2];
      c.lz = a[3];
    } else {
      c.wx = a[2];
      c.wz = a[3];
      c.wvx = a[9] || 0;
      c.wvz = a[10] || 0;
      c.walk += 0.1;
    }
    c.face = a[4];
    c.blasting = !!a[5];
    c.blast += ((c.blasting ? 1 : 0) - c.blast) * 0.35;
    c.gas = a[6];
    c.puffSeq = a[7];
    c.air = a[8];
  }
}
