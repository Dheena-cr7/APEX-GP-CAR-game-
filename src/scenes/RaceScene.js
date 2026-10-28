import * as THREE from 'three';
import { buildTrackSteps } from '../tracks/TrackFactory.js';
import { CIRCUITS } from '../tracks/TrackData.js';
import { ColliderWorld } from '../tracks/ColliderWorld.js';
import { CheckpointSystem } from '../tracks/CheckpointSystem.js';
import { RacingLine } from '../tracks/RacingLine.js';
import { ObstacleSystem } from '../tracks/ObstacleSystem.js';
import { Vehicle } from '../cars/VehiclePhysics.js';
import { CarView, makeGhost } from '../cars/CarFactory.js';
import { CARS, getCar } from '../cars/CarData.js';
import { DriftSystem } from '../cars/DriftSystem.js';
import { SURFACES, PHYSICS } from '../cars/PhysicsConfig.js';
import { CAR, CAR_HALF_W, CAR_HALF_L, KERB } from '../cars/Sizes.js';
import { boxBox, boxCircle } from '../physics/Collision.js';
import { RaceManager } from '../race/RaceManager.js';
import { LapTimer, formatTime } from '../race/LapTimer.js';
import { OpponentAI, AI_NAMES } from '../ai/OpponentAI.js';
import { CameraRig } from '../camera/CameraRig.js';
import { Particles } from '../fx/Particles.js';
import { SkidMarks } from '../fx/SkidMarks.js';
import { RaceHUD } from '../ui/RaceHUD.js';
import { MiniMap } from '../ui/MiniMap.js';
import { createSky, createLights, applyFog, followLight, disposeObject } from './SceneKit.js';
import { LIVERIES, THEMES } from '../core/Palette.js';
import { createRng } from '../core/Random.js';
import { GhostRecorder, ghostPose, decodeGhost, encodeGhost } from '../race/Ghost.js';
import { isTouchDevice } from '../controls/InputManager.js';
import { h } from '../ui/dom.js';

const REMOTE_GONE = 3; // s without packets before a remote car is removed

const FULL_HALF_W = CAR.width / 2;
const FULL_HALF_L = CAR.length / 2;
const RESULTS_DELAY = 2.6;
const SPLIT_FINISH_GRACE = 45; // s after the first local driver finishes before the race closes
const ZERO_INPUT = Object.freeze({ throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false });

/** Screen rectangles (fractions, y from the top) for 1–6 split views. */
export function splitLayout(n) {
  if (n <= 1) return { views: [[0, 0, 1, 1]], spare: null };
  if (n === 2) return { views: [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]], spare: null };
  if (n <= 4) {
    const cells = [[0, 0, 0.5, 0.5], [0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]];
    return { views: cells.slice(0, n), spare: n === 3 ? cells[3] : null };
  }
  const t = 1 / 3;
  const cells = [[0, 0, t, 0.5], [t, 0, t, 0.5], [2 * t, 0, t, 0.5], [0, 0.5, t, 0.5], [t, 0.5, t, 0.5], [2 * t, 0.5, t, 0.5]];
  return { views: cells.slice(0, n), spare: n === 5 ? cells[5] : null };
}

/**
 * One race. Built incrementally through `load()` (a generator, so the
 * loading screen shows real progress), then driven by the game loop:
 * `step(dt)` at the fixed rate, `frame(alpha, dt)` once per render.
 *
 * Racers: local humans (1–6, split-screen, each with its own camera, HUD,
 * drift score and input device), remote humans (online, drawn from network
 * states) and AI. `this.player` / `this.rig` / `this.hud` / `this.drift`
 * alias the first local human.
 */
export class RaceScene {
  constructor(game, config) {
    this.game = game;
    this.config = config;
    this.def = CIRCUITS[config.circuitId];
    this.scene = new THREE.Scene();
    this.online = config.online || null;
    const humans = config.humans && config.humans.length ? config.humans : [{ name: 'You', carId: config.carId, liveryId: config.liveryId, device: 'all' }];
    this.humanDefs = humans.slice(0, 6);
    this.layout = splitLayout(this.humanDefs.length);
    this.humans = [];
    this.ready = false;
    this.paused = false;
    this.inputBlocked = false; // online "pause": menu open, race keeps running
    this.finishedTimer = 0;
    this.resultsSent = false;
    this.onFinished = null; // (results) => void
    this.racers = [];
    this.player = null;
    this.contacts = []; // sparks / thuds collected during steps, consumed per frame
    this.debug = { maxPenetration: 0, lastPenetration: 0, cameraInside: false, steps: 0 };
    this.inputOverride = null; // test hook (first local driver)
    this.timeScale = 1; // speedbreaker slow motion
    this.speedbreakAllowed = this.humanDefs.length === 1 && !this.online;
    this.waitingForGo = !!this.online;
    this.firstHumanFinish = -1;
    this._target = { label: '', value: '', hazard: false };
    this._ev = { type: null, index: -1, lap: 0, sector: 0 };
    this._box = { x: 0, z: 0, h: 0, hx: 0, hz: 0 };
    this._box2 = { x: 0, z: 0, h: 0, hx: 0, hz: 0 };
    this._hit = { nx: 0, nz: 0, depth: 0 };
    this._pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    this._pose = { x: 0, y: 0, z: 0, h: 0, speed: 0, slip: 0, boost: false };
    this._ground = { y: 0, pitch: 0, roll: 0, bump: 0 };
    this._dots = [];
    this.tokens = 0;
  }

  /** Cameras to render, with their screen rectangles. */
  get views() {
    return this.humans.map((hm) => ({ camera: hm.rig.camera, rect: hm.rect, human: hm }));
  }

  get camera() {
    return this.humans[0].rig.camera;
  }

  get rig() {
    return this.humans[0].rig;
  }

  get hud() {
    return this.humans[0].hud;
  }

  get drift() {
    return this.humans[0].drift;
  }

  /** Generator: yields {progress, label}. */
  *load() {
    const q = this.game.quality.preset;
    const cfg = this.config;
    const split = this.humanDefs.length > 1;
    yield { progress: 0.02, label: 'Preparing circuit' };
    const theme = THEMES[this.def.theme];
    applyFog(this.scene, theme, q.drawDistance);
    this.sky = createSky(theme);
    this.scene.add(this.sky);
    this.lights = createLights(theme, { shadows: q.shadows && !split, shadowSize: q.shadowSize, shadowExtent: 34 });
    this.scene.add(this.lights.group);

    const it = buildTrackSteps(this.def, { quality: q, propDensity: split ? 0.7 : 1 });
    let r = it.next();
    while (!r.done) {
      yield { progress: 0.04 + r.value.progress * 0.56, label: r.value.label };
      r = it.next();
    }
    this.track = r.value;
    this.model = this.track.model;
    this.scene.add(this.track.group);

    yield { progress: 0.64, label: 'Colliders' };
    this.world = new ColliderWorld(this.model);
    this.world.addWalls();
    this.checkpoints = new CheckpointSystem(this.model, this.def.sectors);
    this.line = new RacingLine(this.model, { aLat: 15.5, vMax: 82 });

    yield { progress: 0.72, label: 'Obstacles' };
    this.obstacles = new ObstacleSystem(this.track, this.world, this.def, {
      seed: this.def.seed + (cfg.levelIndex || 0) * 31,
      obstacles: cfg.obstacles !== false,
      moving: cfg.moving !== false,
      tokens: cfg.tokens !== false && !split && !this.online,
    });
    this.scene.add(this.obstacles.group);

    yield { progress: 0.82, label: 'Cars' };
    this._buildRacers();
    if (cfg.mode === 'timetrial' && !split && !this.online) this._buildGhost();

    yield { progress: 0.92, label: 'Effects' };
    this.particles = new Particles(split ? Math.round(q.particles * 0.6) : q.particles);
    this.scene.add(this.particles.group);
    this.skids = new SkidMarks(q.skidMarks);
    this.scene.add(this.skids.mesh);
    this._buildHUDs();

    const key = `${this.def.id}:${cfg.mode}`;
    const save = this.game.save.data;
    this.refLap = split || this.online ? 0 : save.bestLaps[key] || 0;
    this.refSplits = split || this.online ? null : save.bestSplits[key] || null;
    this.manager = new RaceManager({ mode: cfg.mode, laps: cfg.laps, racers: this.racers.slice(), checkpoints: this.checkpoints, seed: this.def.seed + 7, humans: this.humans.length });
    this.placeOnGrid();
    this.ready = true;
    yield { progress: 1, label: 'Ready' };
  }

  _makeRacer(carDef, liveryId, kind, index, name) {
    const cfg = this.config;
    const human = kind === 'human';
    const vehicle = new Vehicle(carDef.stats, { assist: human ? cfg.assists || 'medium' : 'easy', handling: human ? cfg.handling || 'arcade' : 'sim' });
    const view = new CarView(carDef, liveryId, { helmetIndex: index, castShadow: human || this.game.quality.preset.id !== 'low' });
    this.scene.add(view.root);
    const racer = {
      id: index,
      name,
      isHuman: human,
      isPlayer: human, // highlight in tables / maps
      isRemote: kind === 'remote',
      netId: null,
      human: null,
      carDef,
      vehicle,
      view,
      proj: { s: 0, t: 0, i: -1 },
      cp: null,
      timer: new LapTimer(this.checkpoints.count, 3),
      ai: null,
      finished: false,
      finishTime: 0,
      position: 0,
      progress: 0,
      penalty: 0,
      offTime: 0,
      onTime: 0,
      offPenalised: false,
      wrongTime: 0,
      wrongWay: false,
      stuckTime: 0,
      ghost: 0,
      oilTime: 0,
      controls: ZERO_INPUT,
      padCooldown: 0,
      skidPts: [{ x: 0, y: 0, z: 0, on: false }, { x: 0, y: 0, z: 0, on: false }],
      coast: { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false },
      timedOut: false,
      surface: SURFACES.asphalt,
      lastImpactTime: -10,
      recoveries: 0,
      net: null, // remote: { st, at, x, z, h }
    };
    if (kind === 'remote') racer.isPlayer = true;
    return racer;
  }

  _buildRacers() {
    const cfg = this.config;
    const on = this.online;
    const usedCars = new Set();
    // local humans
    this.humanDefs.forEach((hd, i) => {
      const car = getCar(hd.carId || cfg.carId);
      usedCars.add(car.id);
      const r = this._makeRacer(car, hd.liveryId || car.defaultLivery, 'human', i, hd.name || `P${i + 1}`);
      r.netId = on ? on.mySlot : null;
      r.human = this._makeHuman(r, hd, i);
      this.humans.push(r.human);
      this.racers.push(r);
    });
    this.player = this.racers[0];
    // remote humans (online)
    if (on) {
      for (const p of on.players) {
        if (p.slot === on.mySlot) continue;
        const car = getCar(p.carId);
        const r = this._makeRacer(car, p.livery || car.defaultLivery, 'remote', 10 + p.slot, p.name);
        r.netId = p.slot;
        r.slot = p.slot;
        this.racers.push(r);
      }
    }
    // AI: simulated here offline and on the online host; drawn from the
    // host's states on online clients
    const aiCount = on ? on.ai || 0 : cfg.opponents || 0;
    const rng = createRng(this.def.seed * 13 + aiCount);
    const pool = CARS.filter((c) => !usedCars.has(c.id));
    const cars = pool.length ? pool : CARS;
    for (let k = 0; k < aiCount; k++) {
      const carDef = cars[k % cars.length];
      const livery = LIVERIES[(k * 3 + 1) % LIVERIES.length].id;
      const remoteAi = on && !on.isHost;
      const racer = this._makeRacer(carDef, livery, remoteAi ? 'remote' : 'ai', 20 + k, AI_NAMES[k % AI_NAMES.length]);
      racer.isPlayer = false;
      racer.netId = `ai${k}`;
      if (!remoteAi) {
        racer.ai = new OpponentAI(racer, this.model, this.line, { difficulty: cfg.difficulty || 'medium', index: k, count: aiCount, rng, obstacles: this.obstacles });
      }
      this.racers.push(racer);
    }
  }

  _makeHuman(r, hd, index) {
    const cfg = this.config;
    const rig = new CameraRig(index === 0 ? cfg.camera || 'chase' : 'chase');
    rig.setTrack(this.model);
    const rect = this.layout.views[index];
    return {
      index,
      racer: r,
      device: hd.device || (this.humanDefs.length > 1 ? ['kbA', 'kbB', 'pad0', 'pad1', 'pad2', 'pad3'][index] : 'all'),
      rig,
      rect,
      drift: new DriftSystem(),
      hud: null,
      hudData: {
        speed: 0, gear: 1, rpm: 0, throttle: 0, boostMeter: 0, boosting: false, nitroActive: false, speedbreak: -1, slowmo: false, position: 0, lap: 0, lapTime: 0, lastLap: 0, bestLap: 0,
        delta: null, sectors: [null, null, null], target: null, driftActive: false, driftPoints: 0, driftMultiplier: 1, driftTotal: 0,
        inDriftZone: false, wrongWay: false, resetHold: 0, tokens: 0, tokensTotal: 0, waiting: false,
      },
      pose: { x: 0, y: 0, z: 0, h: 0, speed: 0, slip: 0, boost: false },
      nearCd: 0,
      sb: { meter: 0.35, active: false },
      lastDriftStart: 0,
      nitroWas: false,
    };
  }

  /** Time Trial ghost: best flying lap (saved or from this session). */
  _buildGhost() {
    this.ghostRec = new GhostRecorder();
    const saved = this.game.save.data.ghosts[this.def.id];
    this.ghostLap = saved ? decodeGhost(saved.lap) : null;
    this.ghostTime = this.ghostLap ? saved.time : 0;
    this.newGhost = null;
    const car = getCar(saved && saved.carId ? saved.carId : this.config.carId);
    this.ghostView = new CarView(car, saved && saved.livery ? saved.livery : car.defaultLivery, { castShadow: false });
    makeGhost(this.ghostView);
    this.ghostView.root.visible = false;
    this.scene.add(this.ghostView.root);
    this.ghostRecording = false;
    this._ghostPose = { x: 0, y: 0, z: 0, h: 0 };
  }

  _buildHUDs() {
    const cfg = this.config;
    const game = this.game;
    const n = this.humans.length;
    const total = this.racers.length;
    const touch = isTouchDevice() && n === 1;
    for (const hm of this.humans) {
      const r = hm.racer;
      hm.hud = new RaceHUD(game.uiRoot, {
        mode: cfg.mode,
        laps: cfg.laps,
        opponents: total - 1,
        units: cfg.units,
        touch,
        bindings: game.input.bindings,
        rect: n > 1 ? hm.rect : null,
        compact: n > 2,
        label: n > 1 ? (r.name === `P${hm.index + 1}` ? r.name : `P${hm.index + 1} · ${r.name}`) : null,
        device: hm.device,
        speedbreak: this.speedbreakAllowed,
        onTouch: (key, v) => {
          const t = game.input.touch;
          if (key === 'left' || key === 'right' || key === 'throttle' || key === 'brake') t[key] = v ? 1 : 0;
          else t[key] = v;
        },
        onPause: () => game.requestPause(),
      });
      hm.hudData.tokensTotal = this.obstacles.tokenCount;
      hm.hud.setLights(0, false);
    }
    // mini-map: in the single view, in both halves of a 2-way split, or in the spare cell
    this.minimap = new MiniMap(this.model, n > 2 ? 220 : 168);
    if (n <= 1) {
      this.humans[0].hud.setMiniMap(this.minimap);
      this.humans[0].hud.setMiniMapVisible(cfg.minimap !== false);
    } else if (n === 2) {
      this.humans[0].hud.setMiniMap(this.minimap);
      this.minimap2 = new MiniMap(this.model);
      this.humans[1].hud.setMiniMap(this.minimap2);
    } else if (this.layout.spare) {
      const [x, y, w, hh] = this.layout.spare;
      this.spareEl = h('div', { className: 'split-spare layer-passive', style: { left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${hh * 100}%` } }, [
        h('div', { className: 't-label-sm t-secondary', text: this.def.name }),
        this.minimap.canvas,
        (this.standingsEl = h('ol', { className: 'split-spare__list' })),
      ]);
      game.uiRoot.appendChild(this.spareEl);
    }
    for (const rr of this.racers) this._dots.push({ x: 0, z: 0, player: rr.isHuman || rr.isRemote, leader: false });
  }

  /** Put every racer on its grid slot (pole = 0). */
  placeOnGrid() {
    const cfg = this.config;
    const humansN = this.humans.length;
    let order;
    if (this.online) {
      // everyone computes the same grid: humans by slot, then AI
      const hum = this.racers.filter((r) => r.isHuman || (r.isRemote && typeof r.netId === 'number')).sort((a, b) => a.netId - b.netId);
      order = hum.concat(this.racers.filter((r) => !hum.includes(r)));
    } else if (humansN > 1) {
      // split-screen: AI ahead of the humans on the grid for a chase
      order = this.racers.filter((r) => !r.isHuman).concat(this.racers.filter((r) => r.isHuman));
    } else {
      const opp = cfg.opponents || 0;
      const playerSlot = opp === 0 ? 0 : Math.min(opp, cfg.difficulty === 'easy' ? 3 : cfg.difficulty === 'hard' ? opp : 4);
      const others = this.racers.filter((r) => !r.isHuman);
      order = others.slice(0, playerSlot).concat([this.player], others.slice(playerSlot));
    }
    order.forEach((r, k) => {
      const gs = this.track.gridSlot(k);
      this._spawn(r, gs.s, gs.t);
      r.cp = this.checkpoints.createState(gs.s);
      r.timer.reset();
      if (r === this.player && this.refLap) r.timer.setReference(this.refLap, this.refSplits);
      r.finished = false;
      r.finishTime = 0;
      r.penalty = 0;
      r.offTime = 0;
      r.offPenalised = false;
      r.wrongTime = 0;
      r.wrongWay = false;
      r.stuckTime = 0;
      r.ghost = 0;
      r.oilTime = 0;
      r.padCooldown = 0;
      r.skidPts[0].on = r.skidPts[1].on = false;
      r.timedOut = false;
      r.recoveries = 0;
      r.net = null;
      if (r.ai) r.ai.reset();
      r.vehicle.events.driftStart = r.vehicle.events.driftEnd = r.vehicle.events.boost = 0;
    });
    for (const hm of this.humans) {
      hm.rig.snap();
      hm.drift.reset();
      hm.sb.active = false;
      hm.sb.meter = 0.35;
      hm.nearCd = 0;
    }
    this.timeScale = 1;
  }

  _spawn(r, s, t) {
    const m = this.model;
    m.pointAt(s, t, this._pt);
    const hd = Math.atan2(this._pt.tx, this._pt.tz);
    r.vehicle.reset(this._pt.x, this._pt.z, hd, m.heightAt(s, t));
    r.proj.i = -1;
    m.project(r.vehicle.x, r.vehicle.z, -1, r.proj);
    r.view.update(r.vehicle, 1, this._groundFor(r), 0);
  }

  begin() {
    this.game.audio.startRace();
    if (this.waitingForGo) {
      for (const hm of this.humans) hm.hud.flash('Waiting', 'for the other drivers', 'info', 60);
      return;
    }
    this.manager.startCountdown();
    for (const hm of this.humans) hm.hud.setLights(0, true);
  }

  /** Online: the host says everyone has loaded. */
  go() {
    if (!this.waitingForGo) return;
    this.waitingForGo = false;
    for (const hm of this.humans) hm.hud.bigTimer = 0.01;
    this.manager.startCountdown();
    for (const hm of this.humans) hm.hud.setLights(0, true);
  }

  restart() {
    const t = this.player.timer;
    if (t.refLap && (!this.refLap || t.refLap < this.refLap)) {
      this.refLap = t.refLap;
      this.refSplits = t.refCp ? t.refCp.slice() : null;
    }
    this.manager.reset();
    this.placeOnGrid();
    this.obstacles.reset();
    this.particles.reset();
    this.skids.reset();
    this.contacts.length = 0;
    this.finishedTimer = 0;
    this.firstHumanFinish = -1;
    this.resultsSent = false;
    this.tokens = 0;
    this.debug.maxPenetration = 0;
    if (this.ghostRec) {
      this.ghostRecording = false;
      this.ghostView.root.visible = false;
    }
    for (const hm of this.humans) {
      hm.hud.toasts.clear();
      hm.hud.hintTime = 6;
    }
    this.game.input.releaseAll();
    this.begin();
  }

  // ------------------------------------------------------------------ step

  /** Speedbreaker: toggle slow motion (single player only). */
  toggleSpeedbreak() {
    if (!this.speedbreakAllowed || !this.manager.canDrive) return;
    const sb = this.humans[0].sb;
    if (sb.active) sb.active = false;
    else if (sb.meter > 0.15) {
      sb.active = true;
      this.game.audio.play('boost');
      this.hud.toast('Speedbreaker', 'info');
    }
  }

  step(dt) {
    if (!this.ready || this.paused) return;
    // speedbreaker: the whole race runs slower, the meter drains in real time
    const sb = this.humans[0].sb;
    if (this.speedbreakAllowed) {
      if (sb.active) {
        sb.meter = Math.max(0, sb.meter - PHYSICS.speedbreakDrain * dt);
        if (sb.meter <= 0) sb.active = false;
      }
      const target = sb.active ? PHYSICS.speedbreakScale : 1;
      this.timeScale += (target - this.timeScale) * Math.min(1, dt * 8);
      if (Math.abs(this.timeScale - target) < 0.002) this.timeScale = target;
    }
    const sdt = dt * this.timeScale;
    const man = this.manager;
    man.step(sdt);
    for (const e of man.events) this._raceEvent(e);
    man.events.length = 0;
    const drive = man.canDrive;
    this.obstacles.step(sdt, this.racers);

    for (const r of this.racers) {
      if (r.isRemote) {
        this._stepRemote(r, sdt);
        continue;
      }
      const v = r.vehicle;
      v.savePrev();
      v.speedbreak = r === this.player && sb.active;
      let controls = ZERO_INPUT;
      if (drive) {
        if (r.isHuman) controls = r.finished ? this._autoCoast(r) : this.inputBlocked ? ZERO_INPUT : this._humanInput(r);
        else controls = r.ai.drive(sdt, this);
      } else if (r.isHuman) {
        v.updateDrivetrain(sdt, this._humanInput(r).throttle);
      }
      r.controls = controls;
      if (r.oilTime > 0) r.oilTime -= sdt;
      const surf = r.oilTime > 0 ? SURFACES.oil : this.model.surfaceAt(r.proj.s, r.proj.t);
      r.surface = surf;
      if (drive || v.speed > 0.01) v.step(sdt, controls, surf);
      this.model.project(v.x, v.z, r.proj.i, r.proj);
      this._collideWorld(r);
      if (r.padCooldown > 0) r.padCooldown -= sdt;
      if (r.ghost > 0) r.ghost -= sdt;
    }
    this._collideCars();
    for (const r of this.racers) {
      if (r.isRemote) continue;
      const v = r.vehicle;
      this.model.project(v.x, v.z, r.proj.i, r.proj);
      this._wallSafety(r);
      v.y = this.model.heightAt(r.proj.s, r.proj.t);
      if (drive) this._raceLogic(r, sdt);
    }
    this._slipstream();
    if (drive) this._nearMisses(sdt);
    if (this.ghostRec && this.ghostRecording && drive) this.ghostRec.record(sdt, this.player.vehicle);
    if (drive) {
      for (const hm of this.humans) {
        const p = hm.racer;
        const onTrack = Math.abs(p.proj.t) <= this.model.halfWidthAt(p.proj.s) + KERB.width + 0.6;
        hm.drift.update(sdt, p.vehicle, { onTrack, inZone: this.obstacles.inDriftZone(p.proj.s) });
        // speedbreaker refills while drifting or flat out
        if (this.speedbreakAllowed && !hm.sb.active && (p.vehicle.drifting || p.vehicle.u > p.vehicle.params.vTop * 0.75)) {
          hm.sb.meter = Math.min(1, hm.sb.meter + PHYSICS.speedbreakFill * sdt);
        }
        if (hm.nearCd > 0) hm.nearCd -= sdt;
      }
      // split-screen: close the race a while after the first local finisher
      if (this.firstHumanFinish >= 0 && man.state === 'running' && man.time - this.firstHumanFinish > SPLIT_FINISH_GRACE) man.forceFinish();
      if (man.state === 'finished') this.finishedTimer += dt;
    }
    this._measurePenetration();
    this.debug.steps++;
  }

  _humanInput(r) {
    if (r === this.player && this.inputOverride) return this.inputOverride;
    return this.game.input.deviceState(r.human.device);
  }

  /** Remote car: follow the latest network state (extrapolated + smoothed). */
  _stepRemote(r, dt) {
    const v = r.vehicle;
    v.savePrev();
    const n = r.net;
    if (!n) return;
    const st = n.st;
    const rawAge = (performance.now() - n.at) / 1000;
    // a player who stopped sending (left / lost connection) vanishes instead of
    // standing on the track as a solid wreck; they reappear if packets resume
    r.gone = rawAge > REMOTE_GONE;
    const age = Math.min(0.3, rawAge);
    const sh = Math.sin(st[3]);
    const ch = Math.cos(st[3]);
    const vx = sh * st[4] + ch * st[5];
    const vz = ch * st[4] - sh * st[5];
    const tx = st[1] + vx * age;
    const tz = st[2] + vz * age;
    const th = st[3] + st[6] * age;
    const dx = tx - v.x;
    const dz = tz - v.z;
    if (dx * dx + dz * dz > 400) {
      v.x = v.px = tx;
      v.z = v.pz = tz;
      v.h = v.ph = th;
    } else {
      const k = Math.min(1, dt * 12);
      v.x += dx * k;
      v.z += dz * k;
      let dh = th - v.h;
      dh = Math.atan2(Math.sin(dh), Math.cos(dh));
      v.h += dh * k;
    }
    if (v.h - v.ph > Math.PI) v.ph += Math.PI * 2;
    else if (v.h - v.ph < -Math.PI) v.ph -= Math.PI * 2;
    v.u = st[4];
    v.v = st[5];
    v.r = st[6];
    v.steerAngle = -st[7] * 0.3;
    v.wheelAngle += (v.u / 0.34) * dt;
    v.drifting = !!(st[11] & 1);
    v.nitroActive = !!(st[11] & 2);
    v.braking = !!(st[11] & 4);
    v.slip = v.u > 0.5 ? Math.atan2(v.v, v.u) : 0;
    v.skid = v.drifting ? 0.6 : 0;
    this.model.project(v.x, v.z, r.proj.i, r.proj);
    v.y = this.model.heightAt(r.proj.s, r.proj.t);
    r.cp.laps = st[8];
    r.reportedS = st[9];
    if (st[10] > 0 && !r.finished) {
      r.finished = true;
      r.finishTime = st[10];
      this.manager.finishOrder.push(r);
    }
  }

  /** Online: my car (and the host's AI) as compact arrays for the network. */
  netStates(out) {
    out.length = 0;
    for (const r of this.racers) {
      if (r.isRemote) continue;
      if (!r.isHuman && !this.online.isHost) continue;
      const v = r.vehicle;
      out.push([
        r.netId,
        +v.x.toFixed(3), +v.z.toFixed(3), +v.h.toFixed(4), +v.u.toFixed(3), +v.v.toFixed(3), +v.r.toFixed(4), +(r.controls.steer || 0).toFixed(2),
        r.cp.laps, +r.proj.s.toFixed(2), r.finished ? +(r.finishTime).toFixed(3) : 0,
        (v.drifting ? 1 : 0) | (v.nitroActive ? 2 : 0) | (v.braking ? 4 : 0),
      ]);
    }
    return out;
  }

  /** Online: take the latest remote states from the session. */
  applyNet(remote) {
    for (const r of this.racers) {
      if (!r.isRemote) continue;
      const rec = remote.get(r.netId);
      if (!rec) continue;
      if (!r.net) {
        r.net = { st: rec.st, at: rec.at };
        const v = r.vehicle;
        v.x = v.px = rec.st[1];
        v.z = v.pz = rec.st[2];
        v.h = v.ph = rec.st[3];
      } else {
        r.net.st = rec.st;
        r.net.at = rec.at;
      }
    }
  }

  _autoCoast(r) {
    // after the flag the car slows down on its own
    const c = r.coast;
    c.throttle = 0;
    c.brake = r.vehicle.u > 18 ? 0.25 : 0;
    c.handbrake = false;
    c.boost = false;
    const target = this.line.offsetAt(r.proj.s + 20);
    const err = target - r.proj.t;
    const hErr = Math.atan2(Math.sin(this.model.heading(r.proj.s + 12) - r.vehicle.h), Math.cos(this.model.heading(r.proj.s + 12) - r.vehicle.h));
    c.steer = Math.max(-1, Math.min(1, -hErr * 2.2 + err * 0.08));
    return c;
  }

  _collideWorld(r) {
    const v = r.vehicle;
    const box = this._box;
    const hit = this._hit;
    const w = this.world;
    const scaleW = r.isHuman ? CAR_HALF_W : FULL_HALF_W * 0.92;
    const scaleL = r.isHuman ? CAR_HALF_L : FULL_HALF_L * 0.92;
    for (let pass = 0; pass < 3; pass++) {
      box.x = v.x;
      box.z = v.z;
      box.h = v.h;
      box.hx = scaleW;
      box.hz = scaleL;
      const ext = w.extentFor(r.proj.i, r.proj.t, 3);
      let any = false;
      w.query(r.proj.s, r.proj.t, ext, 4.5, (col) => {
        if (col.kind === 'area') {
          if (pass === 0) this._area(r, col);
          return;
        }
        let ok;
        if (col.shape === 'circle') ok = boxCircle(box, col.x, col.z, col.r, hit);
        else ok = boxBox(box, col, hit);
        if (!ok) return;
        any = true;
        if (col.kind === 'cone') {
          if (pass === 0) this._hitCone(r, col);
          return;
        }
        const soft = col.kind === 'soft';
        const impact = v.applyContact(hit.nx, hit.nz, hit.depth + 0.002, soft ? 0.45 : PHYSICS.wallRestitution, soft ? 0.05 : PHYSICS.wallFriction);
        box.x = v.x;
        box.z = v.z;
        if (impact > 0.5) this._impact(r, col, impact, hit, soft);
      });
      if (!any) break;
    }
  }

  _area(r, col) {
    const v = r.vehicle;
    const dx = v.x - col.x;
    const dz = v.z - col.z;
    if (col.type === 'oil') {
      if (dx * dx + dz * dz < col.r * col.r) r.oilTime = 0.35;
    } else if (col.type === 'boost') {
      const s = Math.sin(col.h);
      const c = Math.cos(col.h);
      const lx = dx * c - dz * s;
      const lz = dx * s + dz * c;
      if (Math.abs(lx) <= col.hx + 0.6 && Math.abs(lz) <= col.hz && r.padCooldown <= 0) {
        r.padCooldown = 1.2;
        v.triggerBoost(PHYSICS.padBoostDuration, PHYSICS.padBoostAccel);
        if (r.isHuman) {
          r.human.hud.toast('Boost', 'info');
          if (r === this.player) this.game.audio.play('boost');
          this.game.input.rumble(0.2, 0.5, 200, this._padSlot(r));
        }
      }
    } else if (col.type === 'token') {
      if (r.isHuman && !col.collected && dx * dx + dz * dz < (col.r + 1.2) * (col.r + 1.2)) {
        this.obstacles.collectToken(col);
        this.tokens++;
        v.addNitro(0.25);
        r.human.hud.toast(`Token ${this.tokens}/${this.obstacles.tokenCount} · +Nitro`, 'good');
        this.game.audio.play('token');
      }
    }
  }

  _padSlot(r) {
    const d = r.human ? r.human.device : 'all';
    return d && d.startsWith('pad') ? Number(d.slice(3)) : -1;
  }

  _hitCone(r, col) {
    if (col.knocked) return;
    const v = r.vehicle;
    this.obstacles.knockCone(col, v.vx, v.vz);
    v.setWorldVelocity(v.vx * 0.97, v.vz * 0.97);
    if (r.isHuman) {
      if (r === this.player) this.game.audio.play('cone');
      const timed = this.config.mode === 'timeattack' || this.config.mode === 'timetrial';
      if (timed) {
        r.penalty += 0.5;
        r.human.hud.toast('Cone +0.5s', 'warn');
      } else r.human.hud.toast('Cone', 'warn');
    }
  }

  _impact(r, col, impact, hit, soft) {
    const v = r.vehicle;
    if (this.contacts.length < 24) {
      const fx = Math.sin(v.h);
      const fz = Math.cos(v.h);
      this.contacts.push({ x: v.x - hit.nx * 0.9 + fx * 0.3, y: v.y + 0.4, z: v.z - hit.nz * 0.9 + fz * 0.3, nx: hit.nx, nz: hit.nz, impact, soft, player: r.isHuman });
    }
    if (r.isHuman) {
      if (impact > 2.5) r.human.drift.breakCombo(soft ? 'tyres' : 'wall');
      if (v.drifting && impact > 2.5) v.endDrift(false);
      const now = this.manager.time;
      if (now - r.lastImpactTime > 0.18) {
        r.lastImpactTime = now;
        if (r === this.player) this.game.audio.play(soft ? 'thudSoft' : 'thud', Math.min(1, impact / 18));
        r.human.rig.addShake(Math.min(0.8, impact / 25));
        this.game.input.rumble(Math.min(1, impact / 15), Math.min(1, impact / 10), 160, this._padSlot(r));
      }
    }
  }

  _collideCars() {
    const list = this.racers;
    const a = this._box;
    const b = this._box2;
    const hit = this._hit;
    for (let i = 0; i < list.length; i++) {
      const ri = list[i];
      if (ri.ghost > 0 || ri.gone) continue;
      const vi = ri.vehicle;
      for (let j = i + 1; j < list.length; j++) {
        const rj = list[j];
        if (rj.ghost > 0 || rj.gone) continue;
        if (ri.isRemote && rj.isRemote) continue;
        const vj = rj.vehicle;
        const dx = vj.x - vi.x;
        const dz = vj.z - vi.z;
        if (dx * dx + dz * dz > 25) continue;
        a.x = vi.x;
        a.z = vi.z;
        a.h = vi.h;
        a.hx = ri.isHuman ? CAR_HALF_W : FULL_HALF_W * 0.92;
        a.hz = ri.isHuman ? CAR_HALF_L : FULL_HALF_L * 0.92;
        b.x = vj.x;
        b.z = vj.z;
        b.h = vj.h;
        b.hx = rj.isHuman ? CAR_HALF_W : FULL_HALF_W * 0.92;
        b.hz = rj.isHuman ? CAR_HALF_L : FULL_HALF_L * 0.92;
        if (!boxBox(a, b, hit)) continue;
        // remote cars are moved by their owner: only the local car is pushed
        const wi = ri.isRemote ? 0 : rj.isRemote ? 1 : 0.5;
        const wj = 1 - wi;
        const push = hit.depth + 0.001;
        vi.x += hit.nx * push * wi;
        vi.z += hit.nz * push * wi;
        vj.x -= hit.nx * push * wj;
        vj.z -= hit.nz * push * wj;
        const ivx = vi.vx;
        const ivz = vi.vz;
        const jvx = vj.vx;
        const jvz = vj.vz;
        const rel = (ivx - jvx) * hit.nx + (ivz - jvz) * hit.nz;
        if (rel < 0) {
          const imp = -(1 + 0.2) * rel;
          if (!ri.isRemote) vi.setWorldVelocity(ivx + imp * wi * hit.nx, ivz + imp * wi * hit.nz);
          if (!rj.isRemote) vj.setWorldVelocity(jvx - imp * wj * hit.nx, jvz - imp * wj * hit.nz);
          if (!ri.isRemote) vi.r *= 0.9;
          if (!rj.isRemote) vj.r *= 0.9;
          const impact = -rel;
          for (const p of [ri, rj]) {
            if (!p.isHuman || impact <= 2.5) continue;
            p.human.drift.breakCombo('contact');
            if (this.contacts.length < 24) this.contacts.push({ x: (vi.x + vj.x) / 2, y: vi.y + 0.4, z: (vi.z + vj.z) / 2, nx: hit.nx, nz: hit.nz, impact, soft: false, player: true });
            const now = this.manager.time;
            if (now - p.lastImpactTime > 0.2) {
              p.lastImpactTime = now;
              if (p === this.player) this.game.audio.play('thud', Math.min(1, impact / 15));
              p.human.rig.addShake(Math.min(0.6, impact / 25));
            }
          }
        }
      }
    }
  }

  /** Last-resort constraint: no car may ever end a step beyond its barrier. */
  _wallSafety(r) {
    const m = this.model;
    const v = r.vehicle;
    const limit = m.wallOffset(r.proj.s) - FULL_HALF_W * 0.6;
    if (Math.abs(r.proj.t) <= limit) return;
    const side = Math.sign(r.proj.t);
    m.pointAt(r.proj.s, side * limit, this._pt);
    v.x = this._pt.x;
    v.z = this._pt.z;
    const nx = this._pt.tz * side;
    const nz = -this._pt.tx * side;
    const vn = v.vx * nx + v.vz * nz;
    if (vn < 0) v.setWorldVelocity(v.vx - vn * nx, v.vz - vn * nz);
    r.proj.t = side * limit;
  }

  _slipstream() {
    const list = this.racers;
    for (const r of list) {
      r.vehicle.slipstream = 0;
      if (r.isRemote || r.vehicle.u < 30) continue;
      for (const o of list) {
        if (o === r) continue;
        const ds = this.model.deltaS(r.proj.s, o.proj.s);
        if (ds > 4 && ds < 28 && Math.abs(o.proj.t - r.proj.t) < 2.4) {
          r.vehicle.slipstream = Math.max(r.vehicle.slipstream, 1 - (ds - 4) / 24);
        }
      }
    }
  }

  /** Passing another car close at speed: +nitro (NFS-style near miss). */
  _nearMisses() {
    for (const hm of this.humans) {
      if (hm.nearCd > 0) continue;
      const r = hm.racer;
      const v = r.vehicle;
      if (v.u < 25) continue;
      for (const o of this.racers) {
        if (o === r) continue;
        const ds = this.model.deltaS(r.proj.s, o.proj.s);
        const gap = Math.abs(o.proj.t - r.proj.t);
        const rel = v.u - o.vehicle.u;
        if (Math.abs(ds) < 2.2 && gap > 1.95 && gap < 3.1 && Math.abs(rel) > 6) {
          v.addNitro(PHYSICS.nitroNearMiss);
          if (this.speedbreakAllowed) hm.sb.meter = Math.min(1, hm.sb.meter + 0.06);
          hm.nearCd = 1.5;
          hm.hud.toast('Near miss · +Nitro', 'info');
          break;
        }
      }
    }
  }

  _raceLogic(r, dt) {
    const v = r.vehicle;
    const m = this.model;
    const man = this.manager;
    const ev = this.checkpoints.update(r.cp, r.proj.s, man.time, this._ev);
    if (ev.type) this._checkpointEvent(r, ev);
    r.timer.tick(man.time);

    const tx = m.tx[r.proj.i];
    const tz = m.tz[r.proj.i];
    const sp = v.speed;
    const along = sp > 0.1 ? (v.vx * tx + v.vz * tz) / sp : 0;
    const facing = Math.sin(v.h) * tx + Math.cos(v.h) * tz;
    if (sp > 4 && along < -0.5 && facing < -0.2) r.wrongTime += dt;
    else if (along > 0.2 || facing > 0.3) r.wrongTime = 0;
    const was = r.wrongWay;
    r.wrongWay = r.wrongTime > 1.0;
    if (r === this.player && r.wrongWay && !was) this.game.audio.play('warn');

    const hw = m.halfWidthAt(r.proj.s);
    const off = Math.abs(r.proj.t) > hw + KERB.width + 0.4;
    if (off) {
      r.offTime += dt;
      r.onTime = 0;
      if (r.offTime > 1.6 && !r.offPenalised && r.isHuman && !r.finished) {
        r.offPenalised = true;
        const timed = this.config.mode !== 'practice' && this.config.mode !== 'drift';
        if (timed) {
          r.penalty += 1;
          r.human.hud.toast('Track limits +1s', 'warn');
        } else r.human.hud.toast('Track limits', 'warn');
        if (r === this.player) this.game.audio.play('warn');
      }
    } else {
      r.onTime += dt;
      if (r.onTime > 0.5) {
        r.offTime = 0;
        r.offPenalised = false;
      }
    }

    const trying = r.isHuman ? r.controls.throttle > 0.2 || r.controls.brake > 0.2 : !r.ai.waiting;
    if (sp < PHYSICS.stuckSpeed && !r.finished && (trying || off)) r.stuckTime += dt;
    else r.stuckTime = 0;
    const limit = r.isHuman ? PHYSICS.stuckTime : 2.5;
    if (r.stuckTime > limit) {
      r.stuckTime = 0;
      this.recover(r);
      if (r.isHuman) r.human.hud.toast('Recovered', 'info');
    }
  }

  /** Put a racer back on the road at its current distance, facing forward. */
  recover(r, back = 6) {
    const m = this.model;
    const s = m.wrapS(r.proj.s - back);
    const hw = m.halfWidthAt(s);
    let t = Math.max(-hw * 0.55, Math.min(hw * 0.55, r.proj.t));
    for (const o of this.racers) {
      if (o === r) continue;
      if (Math.abs(m.deltaS(s, o.proj.s)) < 7 && Math.abs(o.proj.t - t) < 2.6) t = o.proj.t > 0 ? t - 3 : t + 3;
    }
    t = Math.max(-hw + 1.4, Math.min(hw - 1.4, t));
    const keepCp = r.cp;
    const nitro = r.vehicle.nitro;
    this._spawn(r, s, t);
    r.vehicle.nitro = nitro;
    r.cp = keepCp;
    r.cp.lastS = r.proj.s;
    r.ghost = 1.2;
    r.recoveries++;
    r.wrongTime = 0;
    r.offTime = 0;
    r.skidPts[0].on = r.skidPts[1].on = false;
    if (r.isHuman) {
      r.human.drift.breakCombo('reset');
      r.human.rig.snap();
    }
  }

  _checkpointEvent(r, ev) {
    const man = this.manager;
    const t = r.timer;
    if (ev.type === 'checkpoint' || ev.type === 'sector') t.checkpoint(ev.index, man.time);
    if (ev.type === 'sector') {
      const res = t.sector(ev.sector, man.time);
      if (r.isHuman && res && res.state === 'best' && t.lapTimes.length > 0) r.human.hud.toast(`S${ev.sector + 1} best`, 'good');
    }
    if (ev.type === 'start') {
      if (this.config.mode === 'practice') t.start(man.time);
    }
    if (ev.type === 'lap') {
      const res = t.lap(man.time);
      if (r === this.player && this.ghostRec) this._ghostLap(res);
      const total = this.config.laps;
      if (r.isHuman) {
        const hud = r.human.hud;
        if (r === this.player) this.game.audio.play('lap');
        if (total > 0 && r.cp.laps >= total) {
          // finished
        } else if (res.best && t.lapTimes.length > 1) {
          hud.flash('Best lap', formatTime(res.time), 'good', 1.8);
        } else {
          hud.toast(`Lap ${res.lap} · ${formatTime(res.time)}`, res.best ? 'good' : 'neutral');
        }
        if (total > 0 && r.cp.laps === total - 1) hud.toast('Final lap', 'info');
      }
      if (total > 0 && r.cp.laps >= total) {
        man.finish(r);
        if (r.isHuman) {
          if (this.firstHumanFinish < 0) this.firstHumanFinish = man.time;
          if (this.humans.length > 1 && !man.allHumansFinished) {
            const pos = man.rank().indexOf(r) + 1;
            r.human.hud.flash('Finish', `P${pos}`, pos <= 3 ? 'good' : '', 4);
          }
        }
      }
    }
  }

  _ghostLap(res) {
    if (this.ghostRecording) {
      const lap = this.ghostRec.toLap();
      if (lap && (!this.ghostTime || res.time < this.ghostTime)) {
        this.ghostLap = lap;
        this.ghostTime = res.time;
        this.newGhost = { lap, time: res.time };
        this.hud.toast('New ghost', 'info');
      }
    }
    this.ghostRec.begin();
    this.ghostRecording = true;
    this.ghostLapStart = this.manager.time;
  }

  _raceEvent(e) {
    if (e.type === 'light') {
      this.track.setStartLights(e.n);
      for (const hm of this.humans) hm.hud.setLights(e.n, true);
      this.game.audio.play('beep');
    } else if (e.type === 'go') {
      this.track.setStartLights(0);
      for (const hm of this.humans) {
        hm.hud.setLights(0, false);
        hm.hud.flash('Go', '', 'good', 1.0);
      }
      this.game.audio.play('go');
      for (const r of this.racers) if (this.config.mode !== 'practice') r.timer.start(0);
      this.game.onRaceGo();
    } else if (e.type === 'finish') {
      const ranked = this.manager.rank();
      const total = this.racers.length;
      for (const hm of this.humans) {
        const pos = ranked.indexOf(hm.racer) + 1;
        const sub = total > 1 ? `P${pos} of ${total}` : formatTime(hm.racer.finishTime);
        hm.hud.flash(hm.racer.finished ? 'Finish' : 'Race over', sub, pos <= 3 ? 'good' : '', RESULTS_DELAY);
      }
      this.game.audio.play('finish');
    }
  }

  _measurePenetration() {
    const r = this.player;
    const v = r.vehicle;
    const box = this._box;
    box.x = v.x;
    box.z = v.z;
    box.h = v.h;
    box.hx = CAR_HALF_W;
    box.hz = CAR_HALF_L;
    let worst = 0;
    const hit = this._hit;
    this.world.query(r.proj.s, r.proj.t, this.world.extentFor(r.proj.i, r.proj.t, 3), 4.5, (col) => {
      if (col.kind !== 'wall' && col.kind !== 'solid') return;
      const ok = col.shape === 'circle' ? boxCircle(box, col.x, col.z, col.r, hit) : boxBox(box, col, hit);
      if (ok && hit.depth > worst) worst = hit.depth;
    });
    this.debug.lastPenetration = worst;
    if (worst > this.debug.maxPenetration) this.debug.maxPenetration = worst;
  }

  // ------------------------------------------------------------------ frame

  _groundFor(r) {
    const m = this.model;
    const v = r.vehicle;
    const g = this._ground;
    const i = r.proj.i < 0 ? 0 : r.proj.i;
    const th = Math.atan2(m.tx[i], m.tz[i]);
    const d = v.h - th;
    const c = Math.cos(d);
    const s = Math.sin(d);
    const slope = m.slope[i];
    const bank = m.bank[i];
    g.y = m.heightAt(r.proj.s, r.proj.t);
    g.pitch = -Math.atan(slope * c - bank * s);
    g.roll = Math.atan(-slope * s - bank * c);
    g.bump = r.surface === SURFACES.kerb && v.speed > 4 ? Math.sin(v.wheelAngle * 3.1) * SURFACES.kerb.bump : 0;
    return g;
  }

  frame(alpha, dt) {
    if (!this.ready) return;
    const a = this.paused ? 1 : alpha;
    for (const r of this.racers) r.view.update(r.vehicle, r.isRemote ? 1 : a, this._groundFor(r), this.paused ? 0 : dt);
    for (const hm of this.humans) {
      const pv = hm.racer.vehicle;
      const pose = hm.pose;
      pose.x = pv.px + (pv.x - pv.px) * a;
      pose.z = pv.pz + (pv.z - pv.pz) * a;
      pose.y = pv.py + (pv.y - pv.py) * a;
      pose.h = pv.ph + (pv.h - pv.ph) * a;
      pose.speed = pv.speed;
      pose.slip = pv.u > 3 ? pv.slip : 0;
      pose.boost = pv.nitroActive || pv.boostTime > 0;
      if (!this.paused) hm.rig.update(pose, dt);
    }
    if (this.ghostView) this._placeGhost();
    const p0 = this.humans[0].pose;
    followLight(this.lights.sun, p0.x, p0.y, p0.z);
    if (!this.paused) {
      this._fx(dt);
      this.obstacles.frame(dt);
      this._hud(dt);
      this._audio();
    }
    this.prepareView(0);
    this.debug.cameraInside = this.cameraInsideGeometry();
    if (this.manager.state === 'finished' && this.finishedTimer > RESULTS_DELAY && !this.resultsSent) {
      this.resultsSent = true;
      if (this.onFinished) this.onFinished(this.buildResults());
    }
  }

  /**
   * Before rendering view k: sky follows that camera, and rivals whose body
   * reaches that camera are hidden (never film through a car).
   */
  prepareView(k) {
    const hm = this.humans[k];
    const cam = hm.rig.camera.position;
    this.sky.position.copy(cam);
    for (const r of this.racers) {
      if (r === hm.racer) {
        r.view.root.visible = true;
        continue;
      }
      const dx = r.vehicle.x - cam.x;
      const dz = r.vehicle.z - cam.z;
      const dy = r.vehicle.y + 0.5 - cam.y;
      r.view.root.visible = !r.gone && dx * dx + dz * dz + dy * dy > 2.6 * 2.6;
    }
  }

  _placeGhost() {
    const gv = this.ghostView;
    if (!this.ghostLap || !this.ghostRecording || this.player.finished) {
      gv.root.visible = false;
      return;
    }
    const gp = this._ghostPose;
    if (!ghostPose(this.ghostLap, this.manager.time - this.ghostLapStart, gp)) {
      gv.root.visible = false;
      return;
    }
    gv.root.visible = true;
    gv.root.position.set(gp.x, gp.y, gp.z);
    gv.root.rotation.set(0, gp.h, 0);
  }

  _fx(dt) {
    const parts = this.particles;
    for (const c of this.contacts) {
      if (c.soft) parts.dust(c.x, c.y, c.z, c.nx * 2, c.nz * 2, 6);
      else parts.sparks(c.x, c.y, c.z, c.nx, c.nz, Math.min(24, 6 + c.impact));
    }
    this.contacts.length = 0;
    const fdt = dt * this.timeScale;
    for (const r of this.racers) {
      const v = r.vehicle;
      const sh = Math.sin(v.h);
      const ch = Math.cos(v.h);
      for (let w = 0; w < 2; w++) {
        const side = w === 0 ? 0.7 : -0.7;
        const wx = v.x + ch * side - sh * 1.65;
        const wz = v.z - sh * side - ch * 1.65;
        const wy = v.y + 0.03;
        const sp = r.skidPts[w];
        if (v.skid > 0.22) {
          if (sp.on) this.skids.add(sp.x, sp.y, sp.z, wx, wy, wz, Math.min(1, v.skid));
          sp.on = true;
          sp.x = wx;
          sp.y = wy;
          sp.z = wz;
          if (Math.random() < v.skid * 0.9 * this.timeScale) parts.smoke(wx, wy + 0.2, wz, v.vx * 0.15, v.vz * 0.15, v.skid);
        } else sp.on = false;
        const surf = r.surface;
        if ((surf === SURFACES.grass || surf === SURFACES.sand) && v.speed > 6 && Math.random() < 0.6 * this.timeScale) {
          parts.dust(wx, wy + 0.1, wz, -v.vx * 0.05, -v.vz * 0.05, 1, surf === SURFACES.sand);
        }
      }
      if ((v.boostTime > 0 || v.nitroActive) && Math.random() < 0.85) {
        parts.flame(v.x - sh * 2.3, v.y + 0.45, v.z - ch * 2.3, -sh, -ch, v.nitroActive);
      }
    }
    parts.update(fdt, this.camera);
    this.skids.update();
  }

  _hud(dt) {
    const man = this.manager;
    man.rank();
    const total = this.config.laps;
    for (const hm of this.humans) {
      const p = hm.racer;
      const v = p.vehicle;
      const d = hm.hudData;
      d.speed = v.speed;
      d.gear = v.gear;
      d.rpm = v.rpm;
      d.throttle = v.throttle;
      d.boostMeter = v.nitro;
      d.boosting = v.boostTime > 0;
      d.nitroActive = v.nitroActive;
      d.speedbreak = this.speedbreakAllowed ? hm.sb.meter : -1;
      d.slowmo = this.timeScale < 0.98;
      d.position = p.position;
      d.lap = Math.max(1, Math.min(total > 0 ? total : 999, p.cp.laps + 1));
      d.lapTime = p.timer.lapTime;
      d.lastLap = p.timer.lastLap;
      d.bestLap = p.timer.bestLap;
      d.delta = p.timer.delta;
      for (let i = 0; i < 3; i++) d.sectors[i] = p.timer.sectorState[i];
      d.driftActive = hm.drift.active && v.drifting;
      d.driftPoints = hm.drift.current;
      d.driftMultiplier = hm.drift.multiplier;
      d.driftTotal = hm.drift.total;
      d.inDriftZone = hm.drift.inZone && v.drifting;
      d.wrongWay = p.wrongWay;
      d.resetHold = hm.index === 0 ? this.resetHold || 0 : 0;
      d.tokens = this.tokens;
      d.target = hm.index === 0 ? this._targetInfo() : null;
      hm.hud.update(d, dt);
      const ev = hm.drift.consumeEvents();
      if (ev) {
        for (const e of ev) {
          if (e.type === 'bank' && e.points > 0) {
            hm.hud.toast(`+${e.points} drift${e.multiplier > 1 ? ` ×${e.multiplier}` : ''}`, 'good');
            if (p === this.player) this.game.audio.play('bank');
          } else if (e.type === 'break' && e.points > 0) {
            hm.hud.toast(`Combo lost −${e.points}`, 'hazard');
          } else if (e.type === 'combo' && e.multiplier >= 3) {
            hm.hud.toast(`Combo ×${e.multiplier}`, 'good');
          }
        }
      }
    }
    let leader = null;
    for (const r of this.racers) if (r.position === 1) leader = r;
    for (let i = 0; i < this.racers.length; i++) {
      const r = this.racers[i];
      const dot = this._dots[i];
      dot.x = r.vehicle.x;
      dot.z = r.vehicle.z;
      dot.player = r.isHuman || r.isRemote;
      dot.leader = r === leader && this.racers.length > 1;
    }
    if (this.config.minimap !== false || this.humans.length > 1) {
      this.minimap.draw(this._dots);
      if (this.minimap2) this.minimap2.draw(this._dots);
    }
    if (this.standingsEl) this._drawStandings();
  }

  _drawStandings() {
    const list = this.manager.racers;
    const el = this.standingsEl;
    while (el.children.length < list.length) el.appendChild(h('li', {}));
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      const txt = `${r.name}${r.finished ? ' ✓' : ''}`;
      const li = el.children[i];
      if (li.__t !== txt) {
        li.__t = txt;
        li.textContent = txt;
      }
      li.className = r.isHuman ? 'is-human' : '';
    }
  }

  _targetInfo() {
    const tg = this.config.target;
    if (!tg) return null;
    const t = this._target;
    const p = this.player;
    if (tg.type === 'lap') {
      const limit = tg.timeLimit;
      if (limit) {
        const left = Math.max(0, limit - this.manager.time - p.penalty);
        t.label = 'Time left';
        t.value = formatTime(left, { decimals: 1 });
        t.hazard = left < 10 && this.manager.state === 'running';
        if (left <= 0 && this.manager.state === 'running' && !p.finished) this._timeUp();
      } else {
        t.label = 'Target lap';
        t.value = formatTime(tg.gold);
        t.hazard = false;
      }
      return t;
    }
    if (tg.type === 'drift') {
      const dr = this.drift;
      t.label = 'Target';
      const next = dr.total < tg.bronze ? tg.bronze : dr.total < tg.silver ? tg.silver : tg.gold;
      t.value = `${Math.round(dr.total)} / ${next}`;
      t.hazard = false;
      return t;
    }
    if (tg.type === 'position') {
      t.label = 'Goal';
      t.value = 'Top 3';
      t.hazard = false;
      return t;
    }
    return null;
  }

  _timeUp() {
    const p = this.player;
    p.timedOut = true;
    this.manager.finish(p);
    this.hud.flash('Time up', '', 'hazard', RESULTS_DELAY);
  }

  _audio() {
    const hm = this.humans[0];
    const v = hm.racer.vehicle;
    if (v.events.driftStart !== hm.lastDriftStart) {
      hm.lastDriftStart = v.events.driftStart;
      if (v.events.driftStart > 0) this.game.input.rumble(0.15, 0.35, 140, this._padSlot(hm.racer));
    }
    if (v.nitroActive && !hm.nitroWas) this.game.audio.play('boost');
    hm.nitroWas = v.nitroActive;
    this.game.audio.updateCar(v, this.manager.state === 'countdown', this.timeScale);
  }

  // ------------------------------------------------------------------ misc

  buildResults() {
    const p = this.player;
    const multi = this.humans.length > 1 || !!this.online;
    const extra = {
      circuitId: this.def.id,
      circuitName: this.def.name,
      driftScore: 0,
      bestCombo: this.drift.bestCombo,
      longestDrift: this.drift.longest,
      tokens: this.tokens,
      tokensTotal: this.obstacles.tokenCount,
      timedOut: !!p.timedOut,
      levelId: this.config.levelId || null,
      carId: p.carDef.id,
      multi,
      online: !!this.online,
    };
    extra.bestSplits = p.timer.bestCp ? Array.from(p.timer.bestCp) : null;
    if (this.newGhost) extra.ghost = { lap: encodeGhost(this.newGhost.lap), time: Math.round(this.newGhost.time * 1000) / 1000, carId: p.carDef.id, livery: p.view.liveryId };
    for (const hm of this.humans) if (hm.drift.current > 0) hm.drift.bank();
    extra.driftScore = Math.round(this.drift.banked);
    if (this.humans.length > 1) extra.driftScores = this.humans.map((hm) => ({ name: hm.racer.name, score: Math.round(hm.drift.banked) }));
    const res = this.manager.buildResults(p, extra);
    if (multi) {
      const best = res.rows.find((row) => row.isPlayer);
      res.winner = best ? best.name : null;
    }
    return res;
  }

  /** Player-requested reset (tap R) — first local driver, or a given one. */
  resetPlayer(r = this.player) {
    if (!this.manager.canDrive) return;
    this.recover(r, 0);
  }

  setPaused(on) {
    this.paused = on;
  }

  /** Point-in-geometry test for the first driver's camera (verification gate). */
  cameraInsideGeometry() {
    const cam = this.camera.position;
    const m = this.model;
    const pr = m.project(cam.x, cam.z, this._camHint ?? -1, this._camProj || (this._camProj = { s: 0, t: 0, i: -1 }));
    this._camHint = pr.i;
    const wallT = m.wallOffset(pr.s);
    const ground = m.heightAt(pr.s, Math.max(-wallT, Math.min(wallT, pr.t)));
    if (cam.y < ground + 0.05) return 'ground';
    const at = Math.abs(pr.t);
    if (!m.isGap(pr.s) && at > wallT - 0.05 && at < wallT + 1.05 && cam.y < ground + 1.15) return 'wall';
    let inside = null;
    const dbg = this.world.debugCells;
    this.world.debugCells = false;
    this.world.query(pr.s, pr.t, 6, 6, (col) => {
      if (inside || col.kind === 'area' || col.kind === 'wall') return;
      const top = (col.y || ground) + (col.height || 1);
      if (cam.y > top) return;
      if (col.shape === 'circle') {
        const dx = cam.x - col.x;
        const dz = cam.z - col.z;
        if (dx * dx + dz * dz < col.r * col.r) inside = col.kind;
      } else {
        const s = Math.sin(col.h);
        const c = Math.cos(col.h);
        const dx = cam.x - col.x;
        const dz = cam.z - col.z;
        if (Math.abs(dx * c - dz * s) < col.hx && Math.abs(dx * s + dz * c) < col.hz) inside = col.kind;
      }
    });
    this.world.debugCells = dbg;
    if (inside) return inside;
    if (this.track.propBoxes) {
      for (const b of this.track.propBoxes) {
        if (cam.y < b.minY || cam.y > b.maxY) continue;
        const dx = cam.x - b.x;
        const dz = cam.z - b.z;
        const c = Math.cos(b.rot);
        const sn = Math.sin(b.rot);
        const lx = dx * c - dz * sn;
        const lz = dx * sn + dz * c;
        if (lx > b.x0 && lx < b.x1 && lz > b.z0 && lz < b.z1) return 'prop';
      }
    }
    return false;
  }

  /** Snapshot for the debug hook / verification. */
  snapshot() {
    const p = this.player;
    const v = p.vehicle;
    const dr = this.drift;
    return {
      x: v.x,
      y: v.y,
      z: v.z,
      h: v.h,
      u: v.u,
      v: v.v,
      speed: v.speed,
      s: p.proj.s,
      t: p.proj.t,
      gear: v.gear,
      rpm: v.rpm,
      drifting: v.drifting,
      slip: v.slip,
      surface: p.surface.id,
      lap: p.cp.laps,
      next: p.cp.next,
      lapTimes: p.timer.lapTimes.slice(),
      bestLap: p.timer.bestLap,
      penalty: p.penalty,
      wrongWay: p.wrongWay,
      finished: p.finished,
      drift: { total: Math.round(dr.total), banked: Math.round(dr.banked), current: Math.round(dr.current), multiplier: dr.multiplier, active: dr.active },
      boostMeter: v.nitro,
      nitro: v.nitro,
      nitroActive: v.nitroActive,
      boostTime: v.boostTime,
      speedbreak: this.speedbreakAllowed ? this.humans[0].sb.meter : -1,
      timeScale: this.timeScale,
      position: p.position,
      camera: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z, fov: this.camera.fov, mode: this.rig.mode, inside: this.debug.cameraInside },
      penetration: this.debug.lastPenetration,
      maxPenetration: this.debug.maxPenetration,
      raceState: this.manager.state,
      raceTime: this.manager.time,
      length: this.model.length,
      halfWidth: this.model.halfWidthAt(p.proj.s),
      wallOffset: this.model.wallOffset(p.proj.s),
      conesKnocked: this.obstacles.conesKnocked,
      lastImpactAge: this.manager.time - p.lastImpactTime,
      tokens: this.tokens,
      humans: this.humans.length,
    };
  }

  dispose() {
    this.ready = false;
    for (const r of this.racers) r.view.dispose();
    this.racers.length = 0;
    if (this.ghostView) this.ghostView.dispose();
    if (this.track) this.track.dispose();
    if (this.obstacles) this.obstacles.dispose();
    if (this.particles) this.particles.dispose();
    if (this.skids) this.skids.dispose();
    for (const hm of this.humans) if (hm.hud) hm.hud.dispose();
    if (this.spareEl && this.spareEl.parentNode) this.spareEl.parentNode.removeChild(this.spareEl);
    disposeObject(this.scene);
    this.scene.clear();
  }
}
