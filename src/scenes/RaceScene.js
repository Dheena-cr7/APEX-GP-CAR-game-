import * as THREE from 'three';
import { buildTrackSteps } from '../tracks/TrackFactory.js';
import { CIRCUITS } from '../tracks/TrackData.js';
import { ColliderWorld } from '../tracks/ColliderWorld.js';
import { CheckpointSystem } from '../tracks/CheckpointSystem.js';
import { RacingLine } from '../tracks/RacingLine.js';
import { ObstacleSystem } from '../tracks/ObstacleSystem.js';
import { Vehicle } from '../cars/VehiclePhysics.js';
import { CarView } from '../cars/CarFactory.js';
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
import { isTouchDevice } from '../controls/InputManager.js';

const FULL_HALF_W = CAR.width / 2;
const FULL_HALF_L = CAR.length / 2;
const RESULTS_DELAY = 2.6;
const ZERO_INPUT = Object.freeze({ throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false });

/**
 * One race. Built incrementally through `load()` (a generator, so the
 * loading screen shows real progress), then driven by the game loop:
 * `step(dt)` at the fixed rate, `frame(alpha, dt)` once per render.
 */
export class RaceScene {
  constructor(game, config) {
    this.game = game;
    this.config = config;
    this.def = CIRCUITS[config.circuitId];
    this.scene = new THREE.Scene();
    this.rig = new CameraRig(config.camera || 'chase');
    this.camera = this.rig.camera;
    this.ready = false;
    this.paused = false;
    this.finishedTimer = 0;
    this.resultsSent = false;
    this.onFinished = null; // (results) => void
    this.racers = [];
    this.player = null;
    this.drift = new DriftSystem();
    this.contacts = []; // sparks / thuds collected during steps, consumed per frame
    this.debug = { maxPenetration: 0, lastPenetration: 0, cameraInside: false, steps: 0 };
    this.inputOverride = null; // test hook
    this.hudData = {
      speed: 0, gear: 1, rpm: 0, throttle: 0, boostMeter: 0, boosting: false, position: 0, lap: 0, lapTime: 0, lastLap: 0, bestLap: 0,
      delta: null, sectors: [null, null, null], target: null, driftActive: false, driftPoints: 0, driftMultiplier: 1, driftTotal: 0,
      inDriftZone: false, wrongWay: false, resetHold: 0, tokens: 0, tokensTotal: 0,
    };
    this._target = { label: '', value: '', hazard: false };
    this._ev = { type: null, index: -1, lap: 0, sector: 0 };
    this._box = { x: 0, z: 0, h: 0, hx: 0, hz: 0 };
    this._box2 = { x: 0, z: 0, h: 0, hx: 0, hz: 0 };
    this._hit = { nx: 0, nz: 0, depth: 0 };
    this._pt = { x: 0, y: 0, z: 0, tx: 0, tz: 1, i: 0 };
    this._pose = { x: 0, y: 0, z: 0, h: 0, speed: 0, slip: 0 };
    this._ground = { y: 0, pitch: 0, roll: 0, bump: 0 };
    this._dots = [];
    this.tokens = 0;
  }

  /** Generator: yields {progress, label}. */
  *load() {
    const q = this.game.quality.preset;
    const cfg = this.config;
    // 1. environment
    yield { progress: 0.02, label: 'Preparing circuit' };
    const theme = THEMES[this.def.theme];
    applyFog(this.scene, theme, q.drawDistance);
    this.sky = createSky(theme);
    this.scene.add(this.sky);
    this.lights = createLights(theme, { shadows: q.shadows, shadowSize: q.shadowSize, shadowExtent: 34 });
    this.scene.add(this.lights.group);

    // 2. track geometry (sub-steps)
    const it = buildTrackSteps(this.def, { quality: q });
    let r = it.next();
    while (!r.done) {
      yield { progress: 0.04 + r.value.progress * 0.56, label: r.value.label };
      r = it.next();
    }
    this.track = r.value;
    this.model = this.track.model;
    this.scene.add(this.track.group);
    this.rig.setTrack(this.model);

    // 3. colliders, checkpoints, racing line
    yield { progress: 0.64, label: 'Colliders' };
    this.world = new ColliderWorld(this.model);
    this.world.addWalls();
    this.checkpoints = new CheckpointSystem(this.model, this.def.sectors);
    this.line = new RacingLine(this.model, { aLat: 15.5, vMax: 82 });

    // 4. obstacles, pads, zones, tokens
    yield { progress: 0.72, label: 'Obstacles' };
    this.obstacles = new ObstacleSystem(this.track, this.world, this.def, {
      seed: this.def.seed + (cfg.levelIndex || 0) * 31,
      obstacles: cfg.obstacles !== false,
      moving: cfg.moving !== false,
      tokens: cfg.tokens !== false,
    });
    this.scene.add(this.obstacles.group);

    // 5. cars
    yield { progress: 0.82, label: 'Cars' };
    this._buildRacers();

    // 6. effects + HUD
    yield { progress: 0.92, label: 'Effects' };
    this.particles = new Particles(q.particles);
    this.scene.add(this.particles.group);
    this.skids = new SkidMarks(q.skidMarks);
    this.scene.add(this.skids.mesh);
    this._buildHUD();

    // personal-best reference for the live delta
    const key = `${this.def.id}:${cfg.mode}`;
    const save = this.game.save.data;
    this.refLap = save.bestLaps[key] || 0;
    this.refSplits = save.bestSplits[key] || null;
    this.manager = new RaceManager({ mode: cfg.mode, laps: cfg.laps, racers: this.racers.slice(), checkpoints: this.checkpoints, seed: this.def.seed + 7 });
    this.placeOnGrid();
    this.ready = true;
    yield { progress: 1, label: 'Ready' };
  }

  _buildRacers() {
    const cfg = this.config;
    const playerCar = getCar(cfg.carId);
    const opponents = cfg.opponents || 0;
    const rng = createRng(this.def.seed * 13 + opponents);
    const make = (carDef, liveryId, isPlayer, index, name) => {
      const vehicle = new Vehicle(carDef.stats, { assist: isPlayer ? cfg.assists || 'medium' : 'easy' });
      const view = new CarView(carDef, liveryId, { helmetIndex: index, castShadow: isPlayer || this.game.quality.preset.id !== 'low' });
      this.scene.add(view.root);
      const racer = {
        id: index,
        name,
        isPlayer,
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
        controls: { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false },
        padCooldown: 0,
        slip: 0,
        skidPts: [{ x: 0, y: 0, z: 0, on: false }, { x: 0, y: 0, z: 0, on: false }],
        coast: { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false },
        timedOut: false,
        surface: SURFACES.asphalt,
        lastImpactTime: -10,
      };
      return racer;
    };
    this.player = make(playerCar, cfg.liveryId || playerCar.defaultLivery, true, 0, 'You');
    this.racers.push(this.player);
    const pool = CARS.filter((c) => c.id !== playerCar.id);
    for (let k = 0; k < opponents; k++) {
      const carDef = pool[k % pool.length];
      const livery = LIVERIES[(k * 3 + 1) % LIVERIES.length].id;
      const racer = make(carDef, livery, false, k + 1, AI_NAMES[k % AI_NAMES.length]);
      racer.ai = new OpponentAI(racer, this.model, this.line, {
        difficulty: cfg.difficulty || 'medium',
        index: k,
        count: opponents,
        rng,
        obstacles: this.obstacles,
      });
      this.racers.push(racer);
    }
  }

  _buildHUD() {
    const cfg = this.config;
    const game = this.game;
    this.hud = new RaceHUD(game.uiRoot, {
      mode: cfg.mode,
      laps: cfg.laps,
      opponents: cfg.opponents || 0,
      units: cfg.units,
      touch: isTouchDevice(),
      bindings: game.input.bindings,
      onTouch: (key, v) => {
        const t = game.input.touch;
        if (key === 'left' || key === 'right' || key === 'throttle' || key === 'brake') t[key] = v ? 1 : 0;
        else t[key] = v;
      },
      onPause: () => game.requestPause(),
    });
    this.minimap = new MiniMap(this.model);
    this.hud.setMiniMap(this.minimap);
    this.hud.setMiniMapVisible(cfg.minimap !== false);
    this.hudData.tokensTotal = this.obstacles.tokenCount;
    for (const r of this.racers) this._dots.push({ x: 0, z: 0, player: r.isPlayer, leader: false });
    this.hud.setLights(0, false);
  }

  /** Put every racer on its grid slot (pole = 0). */
  placeOnGrid() {
    const cfg = this.config;
    const opp = cfg.opponents || 0;
    const playerSlot = opp === 0 ? 0 : Math.min(opp, cfg.difficulty === 'easy' ? 3 : cfg.difficulty === 'hard' ? opp : 4);
    let next = 0;
    for (const r of this.racers) {
      let k;
      if (r.isPlayer) k = playerSlot;
      else {
        if (next === playerSlot) next++;
        k = next++;
      }
      const gs = this.track.gridSlot(k);
      this._spawn(r, gs.s, gs.t);
      r.cp = this.checkpoints.createState(gs.s);
      r.timer.reset();
      if (r.isPlayer && this.refLap) r.timer.setReference(this.refLap, this.refSplits);
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
      if (r.ai) r.ai.reset();
      r.vehicle.events.driftStart = r.vehicle.events.driftEnd = r.vehicle.events.boost = 0;
    }
    this.rig.snap();
  }

  _spawn(r, s, t) {
    const m = this.model;
    m.pointAt(s, t, this._pt);
    const h = Math.atan2(this._pt.tx, this._pt.tz);
    r.vehicle.reset(this._pt.x, this._pt.z, h, m.heightAt(s, t));
    r.proj.i = -1;
    m.project(r.vehicle.x, r.vehicle.z, -1, r.proj);
    r.view.update(r.vehicle, 1, this._groundFor(r), 0);
  }

  begin() {
    this.manager.startCountdown();
    this.hud.setLights(0, true);
    this.game.audio.startRace();
  }

  restart() {
    // carry this session's personal best into the next attempt
    const t = this.player.timer;
    if (t.refLap && (!this.refLap || t.refLap < this.refLap)) {
      this.refLap = t.refLap;
      this.refSplits = t.refCp ? t.refCp.slice() : null;
    }
    this.manager.reset();
    this.placeOnGrid();
    this.drift.reset();
    this.obstacles.reset();
    this.particles.reset();
    this.skids.reset();
    this.contacts.length = 0;
    this.finishedTimer = 0;
    this.resultsSent = false;
    this.tokens = 0;
    this.debug.maxPenetration = 0;
    this.hud.toasts.clear();
    this.hud.hintTime = 6;
    this.game.input.releaseAll();
    this.begin();
  }

  // ------------------------------------------------------------------ step

  step(dt) {
    if (!this.ready || this.paused) return;
    const man = this.manager;
    man.step(dt);
    for (const e of man.events) this._raceEvent(e);
    man.events.length = 0;
    const drive = man.canDrive;
    const input = this.inputOverride || this.game.input.state;

    for (const r of this.racers) {
      const v = r.vehicle;
      v.savePrev();
      let controls = ZERO_INPUT;
      if (drive) {
        if (r.isPlayer) controls = r.finished ? this._autoCoast(r) : input;
        else controls = r.ai.drive(dt, this);
      } else if (!drive && r.isPlayer) {
        // revving on the grid
        v.updateDrivetrain(dt, input.throttle);
      }
      r.controls = controls;
      if (r.oilTime > 0) r.oilTime -= dt;
      const surf = r.oilTime > 0 ? SURFACES.oil : this.model.surfaceAt(r.proj.s, r.proj.t);
      r.surface = surf;
      if (drive || v.speed > 0.01) v.step(dt, controls, surf);
      this.model.project(v.x, v.z, r.proj.i, r.proj);
      this._collideWorld(r);
      if (r.padCooldown > 0) r.padCooldown -= dt;
      if (r.ghost > 0) r.ghost -= dt;
    }
    this._collideCars();
    for (const r of this.racers) {
      const v = r.vehicle;
      this.model.project(v.x, v.z, r.proj.i, r.proj);
      this._wallSafety(r);
      v.y = this.model.heightAt(r.proj.s, r.proj.t);
      if (drive) this._raceLogic(r, dt);
    }
    this._slipstream();
    this.obstacles.step(dt);
    if (drive) {
      const p = this.player;
      const onTrack = Math.abs(p.proj.t) <= this.model.halfWidthAt(p.proj.s) + KERB.width + 0.6;
      this.drift.update(dt, p.vehicle, { onTrack, inZone: this.obstacles.inDriftZone(p.proj.s) });
      if (this.manager.state === 'finished') this.finishedTimer += dt;
    }
    this._measurePenetration();
    this.debug.steps++;
  }

  _autoCoast(r) {
    // after the flag the player's car slows down on its own
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
    const scaleW = r.isPlayer ? CAR_HALF_W : FULL_HALF_W * 0.92;
    const scaleL = r.isPlayer ? CAR_HALF_L : FULL_HALF_L * 0.92;
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
      // pad: oriented box test on the car centre
      const s = Math.sin(col.h);
      const c = Math.cos(col.h);
      const lx = dx * c - dz * s;
      const lz = dx * s + dz * c;
      if (Math.abs(lx) <= col.hx + 0.6 && Math.abs(lz) <= col.hz && r.padCooldown <= 0) {
        r.padCooldown = 1.2;
        v.triggerBoost(PHYSICS.padBoostDuration, PHYSICS.padBoostAccel);
        if (r.isPlayer) {
          this.hud.toast('Boost', 'info');
          this.game.audio.play('boost');
          this.game.input.rumble(0.2, 0.5, 200);
        }
      }
    } else if (col.type === 'token') {
      if (r.isPlayer && !col.collected && dx * dx + dz * dz < (col.r + 1.2) * (col.r + 1.2)) {
        this.obstacles.collectToken(col);
        this.tokens++;
        v.triggerBoost(0.5, PHYSICS.boostAccel * 0.6);
        this.hud.toast(`Token ${this.tokens}/${this.obstacles.tokenCount}`, 'good');
        this.game.audio.play('token');
      }
    }
  }

  _hitCone(r, col) {
    if (col.knocked) return;
    const v = r.vehicle;
    this.obstacles.knockCone(col, v.vx, v.vz);
    v.setWorldVelocity(v.vx * 0.97, v.vz * 0.97);
    if (r.isPlayer) {
      this.game.audio.play('cone');
      const timed = this.config.mode === 'timeattack' || this.config.mode === 'timetrial';
      if (timed) {
        r.penalty += 0.5;
        this.hud.toast('Cone +0.5s', 'warn');
      } else this.hud.toast('Cone', 'warn');
    }
  }

  _impact(r, col, impact, hit, soft) {
    const v = r.vehicle;
    if (this.contacts.length < 24) {
      const fx = Math.sin(v.h);
      const fz = Math.cos(v.h);
      // contact point: car centre pushed toward the obstacle along -normal
      this.contacts.push({ x: v.x - hit.nx * 0.9 + fx * 0.3, y: v.y + 0.4, z: v.z - hit.nz * 0.9 + fz * 0.3, nx: hit.nx, nz: hit.nz, impact, soft, player: r.isPlayer });
    }
    if (r.isPlayer) {
      if (impact > 2.5) this.drift.breakCombo(soft ? 'tyres' : 'wall');
      if (v.drifting && impact > 2.5) v.endDrift(false);
      const now = this.manager.time;
      if (now - r.lastImpactTime > 0.18) {
        r.lastImpactTime = now;
        this.game.audio.play(soft ? 'thudSoft' : 'thud', Math.min(1, impact / 18));
        this.rig.addShake(Math.min(0.8, impact / 25));
        this.game.input.rumble(Math.min(1, impact / 15), Math.min(1, impact / 10), 160);
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
      if (ri.ghost > 0) continue;
      const vi = ri.vehicle;
      for (let j = i + 1; j < list.length; j++) {
        const rj = list[j];
        if (rj.ghost > 0) continue;
        const vj = rj.vehicle;
        const dx = vj.x - vi.x;
        const dz = vj.z - vi.z;
        if (dx * dx + dz * dz > 25) continue;
        a.x = vi.x;
        a.z = vi.z;
        a.h = vi.h;
        a.hx = ri.isPlayer ? CAR_HALF_W : FULL_HALF_W * 0.92;
        a.hz = ri.isPlayer ? CAR_HALF_L : FULL_HALF_L * 0.92;
        b.x = vj.x;
        b.z = vj.z;
        b.h = vj.h;
        b.hx = rj.isPlayer ? CAR_HALF_W : FULL_HALF_W * 0.92;
        b.hz = rj.isPlayer ? CAR_HALF_L : FULL_HALF_L * 0.92;
        if (!boxBox(a, b, hit)) continue;
        // equal masses: split the push, exchange the normal velocity
        const half = hit.depth / 2 + 0.001;
        vi.x += hit.nx * half;
        vi.z += hit.nz * half;
        vj.x -= hit.nx * half;
        vj.z -= hit.nz * half;
        const ivx = vi.vx;
        const ivz = vi.vz;
        const jvx = vj.vx;
        const jvz = vj.vz;
        const rel = (ivx - jvx) * hit.nx + (ivz - jvz) * hit.nz;
        if (rel < 0) {
          const imp = (-(1 + 0.2) * rel) / 2;
          vi.setWorldVelocity(ivx + imp * hit.nx, ivz + imp * hit.nz);
          vj.setWorldVelocity(jvx - imp * hit.nx, jvz - imp * hit.nz);
          vi.r *= 0.9;
          vj.r *= 0.9;
          if (ri.isPlayer || rj.isPlayer) {
            const impact = -rel;
            if (impact > 2.5) {
              this.drift.breakCombo('contact');
              if (this.contacts.length < 24) this.contacts.push({ x: (vi.x + vj.x) / 2, y: vi.y + 0.4, z: (vi.z + vj.z) / 2, nx: hit.nx, nz: hit.nz, impact, soft: false, player: true });
              const now = this.manager.time;
              const p = ri.isPlayer ? ri : rj;
              if (now - p.lastImpactTime > 0.2) {
                p.lastImpactTime = now;
                this.game.audio.play('thud', Math.min(1, impact / 15));
                this.rig.addShake(Math.min(0.6, impact / 25));
              }
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
    // remove the outward lateral velocity
    const nx = this._pt.tz * side; // inward normal = -right*side = (tz, -tx)*side
    const nz = -this._pt.tx * side;
    const vn = v.vx * nx + v.vz * nz;
    if (vn < 0) v.setWorldVelocity(v.vx - vn * nx, v.vz - vn * nz);
    r.proj.t = side * limit;
  }

  _slipstream() {
    const list = this.racers;
    for (const r of list) {
      r.vehicle.slipstream = 0;
      if (r.vehicle.u < 30) continue;
      for (const o of list) {
        if (o === r) continue;
        const ds = this.model.deltaS(r.proj.s, o.proj.s);
        if (ds > 4 && ds < 28 && Math.abs(o.proj.t - r.proj.t) < 2.4) {
          r.vehicle.slipstream = Math.max(r.vehicle.slipstream, 1 - (ds - 4) / 24);
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

    // wrong way
    const tx = m.tx[r.proj.i];
    const tz = m.tz[r.proj.i];
    const sp = v.speed;
    const along = sp > 0.1 ? (v.vx * tx + v.vz * tz) / sp : 0;
    const facing = Math.sin(v.h) * tx + Math.cos(v.h) * tz;
    if (sp > 4 && along < -0.5 && facing < -0.2) r.wrongTime += dt;
    else if (along > 0.2 || facing > 0.3) r.wrongTime = 0;
    const was = r.wrongWay;
    r.wrongWay = r.wrongTime > 1.0;
    if (r.isPlayer && r.wrongWay && !was) this.game.audio.play('warn');

    // track limits (centre beyond the kerb)
    const hw = m.halfWidthAt(r.proj.s);
    const off = Math.abs(r.proj.t) > hw + KERB.width + 0.4;
    if (off) {
      r.offTime += dt;
      r.onTime = 0;
      if (r.offTime > 1.6 && !r.offPenalised && r.isPlayer && !r.finished) {
        r.offPenalised = true;
        const timed = this.config.mode !== 'practice' && this.config.mode !== 'drift';
        if (timed) {
          r.penalty += 1;
          this.hud.toast('Track limits +1s', 'warn');
        } else this.hud.toast('Track limits', 'warn');
        this.game.audio.play('warn');
      }
    } else {
      r.onTime += dt;
      if (r.onTime > 0.5) {
        r.offTime = 0;
        r.offPenalised = false;
      }
    }

    // stuck → auto recovery after ~3 s
    const trying = r.isPlayer ? r.controls.throttle > 0.2 || r.controls.brake > 0.2 : true;
    if (sp < PHYSICS.stuckSpeed && !r.finished && (trying || off)) r.stuckTime += dt;
    else r.stuckTime = 0;
    const limit = r.isPlayer ? PHYSICS.stuckTime : 2.5;
    if (r.stuckTime > limit) {
      r.stuckTime = 0;
      this.recover(r);
      if (r.isPlayer) this.hud.toast('Recovered', 'info');
    }
  }

  /** Put a racer back on the road at its current distance, facing forward. */
  recover(r, back = 6) {
    const m = this.model;
    const s = m.wrapS(r.proj.s - back);
    const hw = m.halfWidthAt(s);
    let t = Math.max(-hw * 0.55, Math.min(hw * 0.55, r.proj.t));
    // keep clear of other cars
    for (const o of this.racers) {
      if (o === r) continue;
      if (Math.abs(m.deltaS(s, o.proj.s)) < 7 && Math.abs(o.proj.t - t) < 2.6) t = o.proj.t > 0 ? t - 3 : t + 3;
    }
    t = Math.max(-hw + 1.4, Math.min(hw - 1.4, t));
    const keepCp = r.cp;
    this._spawn(r, s, t);
    r.cp = keepCp;
    r.cp.lastS = r.proj.s;
    r.ghost = 1.2;
    r.wrongTime = 0;
    r.offTime = 0;
    r.skidPts[0].on = r.skidPts[1].on = false;
    if (r.isPlayer) {
      this.drift.breakCombo('reset');
      this.rig.snap();
    }
  }

  _checkpointEvent(r, ev) {
    const man = this.manager;
    const t = r.timer;
    if (ev.type === 'checkpoint' || ev.type === 'sector') t.checkpoint(ev.index, man.time);
    if (ev.type === 'sector') {
      const res = t.sector(ev.sector, man.time);
      if (r.isPlayer && res && res.state === 'best' && t.lapTimes.length > 0) this.hud.toast(`S${ev.sector + 1} best`, 'good');
    }
    if (ev.type === 'start') {
      if (this.config.mode === 'practice') t.start(man.time);
    }
    if (ev.type === 'lap') {
      const res = t.lap(man.time);
      const total = this.config.laps;
      if (r.isPlayer) {
        this.game.audio.play('lap');
        if (total > 0 && r.cp.laps >= total) {
          // finished
        } else if (res.best && t.lapTimes.length > 1) {
          this.hud.flash('Best lap', formatTime(res.time), 'good', 1.8);
        } else {
          this.hud.toast(`Lap ${res.lap} · ${formatTime(res.time)}`, res.best ? 'good' : 'neutral');
        }
        if (total > 0 && r.cp.laps === total - 1) this.hud.toast('Final lap', 'info');
      }
      if (total > 0 && r.cp.laps >= total) man.finish(r);
    }
  }

  _raceEvent(e) {
    if (e.type === 'light') {
      this.track.setStartLights(e.n);
      this.hud.setLights(e.n, true);
      this.game.audio.play('beep');
    } else if (e.type === 'go') {
      this.track.setStartLights(0);
      this.hud.setLights(0, false);
      this.hud.flash('Go', '', 'good', 1.0);
      this.game.audio.play('go');
      // standing start: lap 1 is timed from lights out
      for (const r of this.racers) if (this.config.mode !== 'practice') r.timer.start(0);
      this.game.onRaceGo();
    } else if (e.type === 'finish') {
      const pos = this.manager.rank().indexOf(this.player) + 1;
      const opp = this.config.opponents || 0;
      this.hud.flash('Finish', opp > 0 ? `P${pos} of ${opp + 1}` : formatTime(this.player.finishTime), pos <= 3 ? 'good' : '', RESULTS_DELAY);
      this.game.audio.play('finish');
    }
  }

  _measurePenetration() {
    // largest overlap between the player hitbox and any solid after resolution
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
    // road plane gradient seen from the car's own axes
    g.pitch = -Math.atan(slope * c - bank * s);
    g.roll = Math.atan(-slope * s - bank * c);
    g.bump = r.surface === SURFACES.kerb && v.speed > 4 ? Math.sin(v.wheelAngle * 3.1) * SURFACES.kerb.bump : 0;
    return g;
  }

  frame(alpha, dt) {
    if (!this.ready) return;
    const a = this.paused ? 1 : alpha;
    for (const r of this.racers) {
      const g = this._groundFor(r);
      // interpolate height too
      r.view.update(r.vehicle, a, g, this.paused ? 0 : dt);
    }
    // camera follows the interpolated player pose
    const pv = this.player.vehicle;
    const pose = this._pose;
    pose.x = pv.px + (pv.x - pv.px) * a;
    pose.z = pv.pz + (pv.z - pv.pz) * a;
    pose.y = pv.py + (pv.y - pv.py) * a;
    pose.h = pv.ph + (pv.h - pv.ph) * a;
    pose.speed = pv.speed;
    pose.slip = pv.u > 3 ? pv.slip : 0;
    if (!this.paused) this.rig.update(pose, dt);
    this.sky.position.copy(this.camera.position);
    followLight(this.lights.sun, pose.x, pose.y, pose.z);
    if (!this.paused) {
      this._fx(dt);
      this.obstacles.frame(dt);
      this._hud(dt);
      this._audio();
    }
    this.debug.cameraInside = this.cameraInsideGeometry();
    if (this.manager.state === 'finished' && this.finishedTimer > RESULTS_DELAY && !this.resultsSent) {
      this.resultsSent = true;
      if (this.onFinished) this.onFinished(this.buildResults());
    }
  }

  _fx(dt) {
    const parts = this.particles;
    // impact sparks / dust
    for (const c of this.contacts) {
      if (c.soft) parts.dust(c.x, c.y, c.z, c.nx * 2, c.nz * 2, 6);
      else parts.sparks(c.x, c.y, c.z, c.nx, c.nz, Math.min(24, 6 + c.impact));
    }
    this.contacts.length = 0;
    for (const r of this.racers) {
      const v = r.vehicle;
      const sh = Math.sin(v.h);
      const ch = Math.cos(v.h);
      // rear wheels in world space
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
          if (Math.random() < v.skid * 0.9) parts.smoke(wx, wy + 0.2, wz, v.vx * 0.15, v.vz * 0.15, v.skid);
        } else sp.on = false;
        const surf = r.surface;
        if ((surf === SURFACES.grass || surf === SURFACES.sand) && v.speed > 6 && Math.random() < 0.6) {
          parts.dust(wx, wy + 0.1, wz, -v.vx * 0.05, -v.vz * 0.05, 1, surf === SURFACES.sand);
        }
      }
      if (v.boostTime > 0 && Math.random() < 0.7) parts.flame(v.x - sh * 2.3, v.y + 0.45, v.z - ch * 2.3, -sh, -ch);
    }
    parts.update(dt, this.camera);
    this.skids.update();
  }

  _hud(dt) {
    const p = this.player;
    const v = p.vehicle;
    const d = this.hudData;
    const man = this.manager;
    man.rank();
    d.speed = v.speed;
    d.gear = v.gear;
    d.rpm = v.rpm;
    d.throttle = v.throttle;
    d.boostMeter = v.boostMeter;
    d.boosting = v.boostTime > 0;
    d.position = p.position;
    const total = this.config.laps;
    d.lap = Math.max(1, Math.min(total > 0 ? total : 999, p.cp.laps + 1));
    d.lapTime = p.timer.lapTime;
    d.lastLap = p.timer.lastLap;
    d.bestLap = p.timer.bestLap;
    d.delta = p.timer.delta;
    for (let i = 0; i < 3; i++) d.sectors[i] = p.timer.sectorState[i];
    d.driftActive = this.drift.active && v.drifting;
    d.driftPoints = this.drift.current;
    d.driftMultiplier = this.drift.multiplier;
    d.driftTotal = this.drift.total;
    d.inDriftZone = this.drift.inZone && v.drifting;
    d.wrongWay = p.wrongWay;
    d.resetHold = this.resetHold || 0;
    d.tokens = this.tokens;
    d.target = this._targetInfo();
    this.hud.update(d, dt);
    const ev = this.drift.consumeEvents();
    if (ev) {
      for (const e of ev) {
        if (e.type === 'bank' && e.points > 0) {
          this.hud.toast(`+${e.points} drift${e.multiplier > 1 ? ` ×${e.multiplier}` : ''}`, 'good');
          this.game.audio.play('bank');
        } else if (e.type === 'break' && e.points > 0) {
          this.hud.toast(`Combo lost −${e.points}`, 'hazard');
        } else if (e.type === 'combo' && e.multiplier >= 3) {
          this.hud.toast(`Combo ×${e.multiplier}`, 'good');
        }
      }
    }
    // mini-map dots
    let leader = null;
    for (const r of this.racers) if (r.position === 1) leader = r;
    for (let i = 0; i < this.racers.length; i++) {
      const r = this.racers[i];
      const dot = this._dots[i];
      dot.x = r.vehicle.x;
      dot.z = r.vehicle.z;
      dot.player = r.isPlayer;
      dot.leader = r === leader && !r.isPlayer && this.racers.length > 1;
    }
    if (this.config.minimap !== false) this.minimap.draw(this._dots);
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
      t.label = 'Target';
      const next = this.drift.total < tg.bronze ? tg.bronze : this.drift.total < tg.silver ? tg.silver : tg.gold;
      t.value = `${Math.round(this.drift.total)} / ${next}`;
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
    const v = this.player.vehicle;
    this.game.audio.updateCar(v, this.manager.state === 'countdown');
  }

  // ------------------------------------------------------------------ misc

  buildResults() {
    const p = this.player;
    const extra = {
      circuitId: this.def.id,
      circuitName: this.def.name,
      driftScore: Math.round(this.drift.banked + this.drift.current),
      bestCombo: this.drift.bestCombo,
      longestDrift: this.drift.longest,
      tokens: this.tokens,
      tokensTotal: this.obstacles.tokenCount,
      timedOut: !!p.timedOut,
      levelId: this.config.levelId || null,
      carId: p.carDef.id,
    };
    extra.bestSplits = p.timer.bestCp ? Array.from(p.timer.bestCp) : null;
    if (this.drift.current > 0) this.drift.bank();
    extra.driftScore = Math.round(this.drift.banked);
    return this.manager.buildResults(p, extra);
  }

  /** Player-requested reset (tap R). */
  resetPlayer() {
    if (!this.manager.canDrive) return;
    this.recover(this.player, 0);
  }

  setPaused(on) {
    this.paused = on;
  }

  /** Point-in-geometry test for the camera (verification gate). */
  cameraInsideGeometry() {
    const cam = this.camera.position;
    const m = this.model;
    const pr = m.project(cam.x, cam.z, this._camHint ?? -1, this._camProj || (this._camProj = { s: 0, t: 0, i: -1 }));
    this._camHint = pr.i;
    const wallT = m.wallOffset(pr.s);
    const ground = m.heightAt(pr.s, Math.max(-wallT, Math.min(wallT, pr.t)));
    if (cam.y < ground + 0.05) return 'ground';
    // inside a barrier (between its inner and outer face, below its top)
    const at = Math.abs(pr.t);
    if (at > wallT - 0.05 && at < wallT + 1.05 && cam.y < ground + 1.15) return 'wall';
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
      drift: { total: Math.round(this.drift.total), banked: Math.round(this.drift.banked), current: Math.round(this.drift.current), multiplier: this.drift.multiplier, active: this.drift.active },
      boostMeter: v.boostMeter,
      boostTime: v.boostTime,
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
    };
  }

  dispose() {
    this.ready = false;
    for (const r of this.racers) r.view.dispose();
    this.racers.length = 0;
    if (this.track) this.track.dispose();
    if (this.obstacles) this.obstacles.dispose();
    if (this.particles) this.particles.dispose();
    if (this.skids) this.skids.dispose();
    if (this.hud) this.hud.dispose();
    disposeObject(this.scene);
    this.scene.clear();
  }
}
