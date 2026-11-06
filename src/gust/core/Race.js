// One race: Sim + World + bots + inputs + sound + (optionally) the network.
//
// Roles: 'solo' / 'local' (everything simulated here), 'host' (authoritative
// online sim), 'client' (predicts locally, blends toward host snapshots),
// 'attract' (title-screen demo run by bots).

import * as THREE from 'three';
import { Sim } from '../sim/Sim.js';
import { BotCaptain } from '../sim/Bot.js';
import { World } from '../render/World.js';
import { SNAP_HZ, INPUT_HZ } from '../net/Net.js';
import { THEMES } from '../render/Themes.js';

const PHASES = ['ready', 'countdown', 'run', 'finished'];
const wrap = (a) => {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
};

export function medalFor(course, time) {
  const m = course.medals;
  return time <= m.gold ? 'gold' : time <= m.silver ? 'silver' : time <= m.bronze ? 'bronze' : 'none';
}

export class Race {
  /**
   * @param {object} o
   * @param {object} o.course
   * @param {Array<{slot:number,name:string,color:number,hat:number,bot?:boolean,local?:boolean,scheme?:string}>} o.crew
   * @param {'solo'|'local'|'host'|'client'|'attract'} o.role
   */
  constructor(game, { course, crew, role, seed = 1, net = null }) {
    this.game = game;
    this.course = course;
    this.role = role;
    this.net = net;
    this.schemes = new Map();
    for (const c of crew) if (c.scheme) this.schemes.set(c.slot, c.scheme);
    this.sim = new Sim(course, { crew, seed });
    // online clients take checkpoints and the finish from the host
    this.sim.authority = role !== 'client';
    this.bots = new BotCaptain(this.sim);
    if (role === 'attract') this.bots.autoRespawn = true;
    this.world = new World(game.renderer, course, this.sim, game.quality);
    this.inputs = new Map();
    this.snapAcc = 0;
    this.inAcc = 0;
    this.history = [];
    this.finishedAt = 0;
    this.resultsShown = false;
    this.ended = false;
    this.paused = false;
    this.localSlot = crew.find((c) => c.local !== false && !c.bot)?.slot ?? -1;
    this._ray = new THREE.Raycaster();
    this._plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this._hit = new THREE.Vector3();
    this._ndc = new THREE.Vector2();
    this.knocks = 0;
    this.lastHostRespawns = -1;
    this.lastCount = -1;
    this.readyAt = 0;
  }

  *build() {
    yield* this.world.build();
    this.world.resize(this.game.width, this.game.height);
  }

  get theme() {
    return THEMES[this.course.theme];
  }

  /** Players present but not yet in the sim (online joins). */
  addCrew(spec) {
    // a joining player takes over a bot's seat if needed
    const bot = this.sim.crewBySlot(spec.slot);
    if (bot) this.sim.removeCrew(spec.slot);
    const c = this.sim.addCrew(spec);
    if (this.sim.phase === 'run' || this.sim.phase === 'finished') {
      c.mode = 'deck';
      c.air = 1;
      c.vy = 1;
    }
    this.world.syncCrew();
    return c;
  }

  removeCrew(slot) {
    this.sim.removeCrew(slot);
    this.world.syncCrew();
  }

  start() {
    if (this.role === 'solo' || this.role === 'local' || this.role === 'attract') this.sim.startCountdown();
  }

  // ------------------------------------------------------------ input

  _screenToWorld(mx, my) {
    const cam = this.world.camera;
    const c = this.world.cam;
    let fx = c.tx - cam.position.x, fz = c.tz - cam.position.z;
    const fl = Math.hypot(fx, fz) || 1;
    fx /= fl; fz /= fl;
    const rx = -fz, rz = fx;
    return { x: rx * mx + fx * my, z: rz * mx + fz * my };
  }

  _readInputs() {
    const inp = this.game.input;
    const sim = this.sim;
    for (const c of sim.crew) {
      if (c.bot || !c.local) continue;
      const scheme = this.schemes.get(c.slot) || 'solo';
      const r = inp.read(scheme);
      const w = this._screenToWorld(r.mx, r.my);
      const ci = c.input;
      ci.mx = w.x;
      ci.mz = w.z;
      ci.blast = r.blast && !this.paused;
      if (r.puff && !this.paused) ci.puff = true;
      ci.aim = false;
      if (r.aim && c.mode === 'deck') {
        if (r.aim.kind === 'stick') {
          const a = this._screenToWorld(r.aim.x, r.aim.y);
          ci.aim = true;
          ci.ax = a.x;
          ci.az = a.z;
        } else {
          const cam = this.world.camera;
          this._ndc.set((r.aim.x / this.game.width) * 2 - 1, -(r.aim.y / this.game.height) * 2 + 1);
          this._ray.setFromCamera(this._ndc, cam);
          this._plane.constant = -(sim.raft.y + 0.35);
          if (this._ray.ray.intersectPlane(this._plane, this._hit)) {
            const p = sim.crewWorld(c);
            const dx = this._hit.x - p.x, dz = this._hit.z - p.z;
            if (Math.hypot(dx, dz) > 0.35) {
              ci.aim = true;
              ci.ax = dx;
              ci.az = dz;
            }
          }
        }
      }
      if (r.respawn && !this.paused) this.requestRespawn();
      if (r.pause) this.game.togglePause();
    }
  }

  requestRespawn() {
    if (this.sim.phase !== 'run') return;
    if (this.role === 'client') this.net.sendRespawn();
    else this.sim.respawn();
  }

  // ------------------------------------------------------------ fixed step

  step(dt) {
    if (this.paused) return;
    this.world.capturePrev();
    if (this.role !== 'client') this.bots.update(dt);
    this.sim.step(dt);
    if (this.role === 'client') {
      const r = this.sim.raft;
      this.history.push([this.sim.clock, r.x, r.z, r.yaw, r.vx, r.vz, r.w]);
      if (this.history.length > 300) this.history.shift();
    }
  }

  // ------------------------------------------------------------ frame

  _remoteCrew() {
    if (!this.net) return;
    const now = performance.now();
    for (const c of this.sim.crew) {
      if (c.local) continue;
      const a = this.net.sampleCrew(c.slot, now);
      if (a) this.sim.applyCrewState(c, a);
    }
  }

  _netTraffic(dt) {
    const sim = this.sim;
    if (this.role === 'host') {
      this.snapAcc += dt;
      if (this.snapAcc >= 1 / SNAP_HZ) {
        this.snapAcc %= 1 / SNAP_HZ;
        this.net.sendSnap(sim);
      }
      // start once everyone has loaded (or after a timeout)
      if (sim.phase === 'ready' && this.readyAt && (this.net.allReady() || performance.now() - this.readyAt > 12000)) sim.startCountdown();
    } else if (this.role === 'client') {
      this.inAcc += dt;
      if (this.inAcc >= 1 / INPUT_HZ) {
        this.inAcc %= 1 / INPUT_HZ;
        const me = sim.crewBySlot(this.localSlot);
        if (me) this.net.sendCrew(sim.crewState(me));
      }
    }
  }

  /** Background tab (online): keep simulating and syncing, draw nothing. */
  frameHeadless(dt) {
    this._remoteCrew();
    this._netTraffic(dt);
    this.sim.events.length = 0;
    if (this.sim.phase === 'finished' && !this.finishedAt) this.finishedAt = performance.now();
    if (this.sim.phase === 'finished' && !this.resultsShown && performance.now() - this.finishedAt > 2600 && this.role === 'host') {
      this.resultsShown = true;
      this.game.finishRace(this, this.results());
    }
  }

  frame(alpha, dt) {
    const sim = this.sim;
    const game = this.game;
    if (this.role !== 'attract') this._readInputs();
    this._remoteCrew();
    this._netTraffic(dt);

    this._events();
    const s = game.save.settings;
    this.world.update(alpha, dt, {
      cameraMode: this.role === 'attract' ? 'follow' : sim.phase === 'finished' && performance.now() - this.finishedAt > 1500 ? 'orbit' : 'follow',
      localSlot: this.role === 'local' ? -1 : this.localSlot,
      showTags: this.role !== 'solo' && this.role !== 'attract' ? true : sim.crew.length > 1,
      helpers: s.helpers,
    });
    if (!s.shake) this.world.camShake = 0;
    this._audio();
    if (this.role !== 'attract') game.ui.updateHUD(this);
    // results a moment after the finish line
    if (sim.phase === 'finished' && !this.resultsShown && performance.now() - this.finishedAt > 2600) {
      this.resultsShown = true;
      if (this.role === 'attract') game.restartAttract();
      else if (this.role !== 'client') game.finishRace(this, this.results());
    }
    // countdown beeps
    if (sim.phase === 'countdown') {
      const n = Math.ceil(sim.cd);
      if (n !== this.lastCount && n <= 3 && n >= 1) {
        this.lastCount = n;
        if (this.role !== 'attract') {
          game.sound.play('count');
          game.ui.banner(String(n), 'count');
        }
      }
    }
  }

  results() {
    const sim = this.sim;
    return {
      course: this.course.id,
      time: sim.finishTime,
      shells: sim.shellCount,
      maxShells: sim.shells.length,
      medal: medalFor(this.course, sim.finishTime),
      respawns: sim.respawns,
      knocks: this.knocks,
      crew: sim.crew.map((c) => ({ slot: c.slot, name: c.name, color: c.color, bot: c.bot })),
    };
  }

  _events() {
    const sim = this.sim;
    const w = this.world;
    const snd = this.game.sound;
    const ui = this.game.ui;
    const attract = this.role === 'attract';
    for (const e of sim.events) {
      switch (e.type) {
        case 'go':
          if (!attract) {
            snd.play('go');
            ui.banner('GO!', 'go');
          }
          break;
        case 'puff':
          w.puffBurst(e.slot);
          if (!attract) snd.play('puff');
          break;
        case 'impact':
          w.impact(e.x, e.z, e.power, e.kind);
          if (!attract) snd.play('impact', { power: e.power, kind: e.kind });
          break;
        case 'land':
          w.splash(e.x, sim.raft.y, e.z, Math.min(3, e.power / 3));
          w.camShake = Math.min(1.5, w.camShake + e.power * 0.1);
          if (!attract) snd.play('land', { power: e.power / 3 });
          break;
        case 'splash':
          if (!attract) snd.play('splash', { power: 0.8 });
          break;
        case 'knock':
          this.knocks++;
          if (!attract) {
            snd.play('knock', { slot: e.slot });
            const c = sim.crewBySlot(e.slot);
            if (c && !c.bot) ui.toast(`${c.name} went overboard! Swim back to the raft.`, 'warn');
          }
          break;
        case 'climb':
        case 'rescue':
          if (!attract) snd.play('climb');
          break;
        case 'shell':
          w.sparkle(e.x, e.z);
          if (!attract) snd.play('shell');
          break;
        case 'checkpoint':
          if (!attract) {
            snd.play('checkpoint');
            ui.banner('CHECKPOINT', 'cp');
          }
          break;
        case 'respawn':
          w.snapCamera();
          w.prev = null;
          if (!attract) snd.play('respawn');
          break;
        case 'empty':
          if (!attract) {
            const c = sim.crewBySlot(e.slot);
            if (c && c.local && !c.bot) snd.play('empty');
          }
          break;
        case 'finish':
          this.finishedAt = performance.now();
          w.confetti();
          if (!attract) {
            snd.play('finish');
            ui.banner('FINISH!', 'finish');
          }
          break;
        default:
          break;
      }
    }
    sim.events.length = 0;
  }

  _audio() {
    const snd = this.game.sound;
    const sim = this.sim;
    const r = sim.raft;
    const river = sim.river;
    if (this.role === 'attract') {
      snd.setWater(0.6, river.at(river.rough, r.s) * 0.4, 0, 0.2);
      return;
    }
    // gust voices pan by screen position
    const cam = this.world.camera;
    const v = this._v3 || (this._v3 = new THREE.Vector3());
    for (const c of sim.crew) {
      let pan = 0;
      if (c.mode === 'deck') {
        const p = sim.crewWorld(c);
        v.set(p.x, r.y + 0.5, p.z).project(cam);
        pan = v.x;
      }
      snd.setGust(c.slot, c.mode === 'deck' && !this.paused ? c.blast : 0, pan, c.local ? 1 : 0.8);
    }
    // river ambience: calm water, rapids, falls nearby
    let roar = 0;
    for (const m of this.world.mistSpots) {
      const d = Math.abs(m.s - r.s);
      roar = Math.max(roar, Math.max(0, 1 - d / 70) * Math.min(1, m.drop));
    }
    const rough = river.at(river.rough, r.s);
    const speed = Math.hypot(r.vx, r.vz);
    snd.setWater(0.7 + Math.min(0.3, speed * 0.05), Math.min(1, rough * 1.1 + river.at(river.v, r.s) * 0.08), roar, 0.15 + speed * 0.05);
  }

  // ------------------------------------------------------------ client sync

  onSnap(m) {
    const sim = this.sim;
    const r = sim.raft;
    const lat = (this.net.rtt || 80) / 2000;
    // clock: keep ours close to the host's
    const target = m.c + lat;
    const diff = target - sim.clock;
    if (Math.abs(diff) > 0.6) sim.clock = target;
    else sim.clock += diff * 0.15;
    // phase
    const ph = PHASES[m.ph] || 'ready';
    if (ph !== sim.phase) {
      if (ph === 'countdown' && sim.phase === 'ready') {
        sim.startCountdown();
        sim.cd = m.cd;
      } else if (ph === 'run' && sim.phase !== 'run') {
        if (sim.phase !== 'finished') sim.events.push({ type: 'go' });
        sim.phase = 'run';
      } else if (ph === 'finished' && sim.phase !== 'finished') {
        sim.phase = 'finished';
        sim.finishTime = m.ft;
        sim.events.push({ type: 'finish', time: m.ft });
      } else if (ph === 'ready') {
        sim.phase = 'ready';
      }
    }
    if (sim.phase === 'countdown') sim.cd = m.cd - lat;
    if (sim.phase === 'run') sim.raceTime = m.rt + lat;
    if (sim.phase === 'finished') sim.finishTime = m.ft;
    // checkpoints, shells
    while (sim.cpIndex < m.cp) {
      sim.cpIndex++;
      sim.events.push({ type: 'checkpoint', index: sim.cpIndex });
    }
    sim.cpIndex = m.cp;
    for (const i of m.sh) {
      const s = sim.shells[i];
      if (s && !s.got) {
        s.got = true;
        sim.events.push({ type: 'shell', i, x: s.x, z: s.z });
      }
    }
    if (m.rs !== this.lastHostRespawns) {
      const first = this.lastHostRespawns < 0;
      this.lastHostRespawns = m.rs;
      sim.respawns = m.rs;
      if (!first) {
        for (const c of sim.crew) if (c.local && c.mode === 'swim') sim._rescue(c, false);
        sim.events.push({ type: 'respawn' });
      }
    }
    // raft: compare with where we were at the host's time and blend
    const hr = m.r;
    let h = null;
    for (let i = this.history.length - 1; i >= 0; i--) {
      if (this.history[i][0] <= m.c) {
        h = this.history[i];
        break;
      }
    }
    // no state that old (clock drift / bursty steps): the oldest we have is close
    const base = h || this.history[0] || [sim.clock, r.x, r.z, r.yaw, r.vx, r.vz, r.w];
    const ex = hr[0] - base[1], ez = hr[1] - base[2];
    const eyaw = wrap(hr[2] - base[3]);
    const err = Math.hypot(ex, ez);
    // prediction error stats (window.__gust.race.netStats with ?debug)
    const st = this.netStats || (this.netStats = { n: 0, sum: 0, max: 0, snaps: 0 });
    st.n++;
    st.sum += err;
    st.max = Math.max(st.max, err);
    if (err > 4 || Math.abs(eyaw) > 1.2) {
      st.snaps++;
      const ahead = Math.max(0, Math.min(0.4, sim.clock - m.c));
      r.x = hr[0] + hr[3] * ahead;
      r.z = hr[1] + hr[4] * ahead;
      r.yaw = wrap(hr[2] + hr[5] * ahead);
      r.vx = hr[3];
      r.vz = hr[4];
      r.w = hr[5];
      r.y = hr[6];
      r.vy = hr[7];
      r.hint = -1;
      this.history.length = 0;
      if (err > 8) this.world.snapCamera();
      return;
    }
    const k = 0.3, kv = 0.45;
    const dx = ex * k, dz = ez * k, dyaw = eyaw * k;
    const dvx = (hr[3] - base[4]) * kv, dvz = (hr[4] - base[5]) * kv, dw = (hr[5] - base[6]) * kv;
    r.x += dx; r.z += dz; r.yaw = wrap(r.yaw + dyaw);
    r.vx += dvx; r.vz += dvz; r.w += dw;
    for (const e of this.history) {
      e[1] += dx; e[2] += dz; e[3] += dyaw; e[4] += dvx; e[5] += dvz; e[6] += dw;
    }
  }

  dispose() {
    this.game.sound.stopGusts();
    this.world.dispose();
  }
}
