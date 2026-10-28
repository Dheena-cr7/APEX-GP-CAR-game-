import * as THREE from 'three';
import { Loop } from './Loop.js';
import { GameStore } from './GameState.js';
import { Quality } from './Quality.js';
import { SaveManager } from '../storage/SaveManager.js';
import { InputManager, isTouchDevice } from '../controls/InputManager.js';
import { AudioManager } from '../audio/AudioManager.js';
import { RaceScene } from '../scenes/RaceScene.js';
import { MenuScene } from '../scenes/MenuScene.js';
import { GarageScene } from '../scenes/GarageScene.js';
import { DebugView } from '../scenes/DebugView.js';
import { MenuUI } from '../ui/MenuUI.js';
import { showError, hideError } from '../ui/ErrorScreen.js';
import { h } from '../ui/dom.js';
import { CIRCUITS } from '../tracks/TrackData.js';
import { getCar } from '../cars/CarData.js';
import { NetSession } from '../net/NetSession.js';
import { applyResults, LEVELS, getLevel, levelRaceConfig, levelTarget } from '../race/Campaign.js';
import { starsFor } from '../race/Scoring.js';

/** Top-level game object: renderer, single loop, store, scenes and UI. */
export class Game {
  constructor({ canvas, uiRoot, params }) {
    this.canvas = canvas;
    this.uiRoot = uiRoot;
    this.params = params;
    this.debugMode = params.has('debug');
    this.renderMode = params.get('render') || 'always'; // 'always' | 'manual' (verify)
    this.save = new SaveManager(params.has('nostorage') ? null : undefined);
    this.save.load();
    const st = this.save.data.settings;
    this.store = new GameStore();
    this.quality = new Quality(params.get('quality') || st.quality, params.has('quality') ? false : st.adaptiveQuality);
    this.input = new InputManager(window);
    this.input.setBindings(st.bindings);
    this.audio = new AudioManager({ master: st.master, sfx: st.sfx, music: st.music, muted: st.muted });
    this.renderer = null;
    this.race = null;
    this.menuScene = null;
    this.garageScene = null;
    this.loader = null;
    this.loadProgress = 0;
    this.lastResults = null;
    this.contextLost = false;
    this.frameMs = 0;
    this.renderRequests = 0;
    this.debugOverlay = null;
    this.debugView = null;
    this.loop = new Loop({ step: (dt) => this.step(dt), frame: (a, dt, now) => this.frame(a, dt, now) });
    this._onResize = this._onResize.bind(this);
    this._onPhase = this._onPhase.bind(this);
  }

  init() {
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: this.quality.preset.antialias, powerPreference: 'high-performance', preserveDrawingBuffer: false });
    } catch (err) {
      this.fail('Graphics unavailable', 'APEX GP could not start WebGL on this device or browser.', err);
      return false;
    }
    const r = this.renderer;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.shadowMap.enabled = this.quality.preset.shadows;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.info.autoReset = false;
    this.canvas.addEventListener('webglcontextlost', (e) => this._contextLost(e), false);
    this.canvas.addEventListener('webglcontextrestored', () => this._contextRestored(), false);
    if (isTouchDevice()) document.body.classList.add('has-touch');

    this.ui = new MenuUI(this);
    this.store.subscribe(this._onPhase);
    window.addEventListener('resize', this._onResize);
    // adaptive quality: pixel ratio first, then the lower preset's shadows
    this.quality.onChange(() => {
      const shadows = this.quality.preset.shadows;
      this.renderer.shadowMap.enabled = shadows;
      if (this.race && this.race.lights) this.race.lights.sun.castShadow = shadows;
      this._onResize();
    });
    this._onResize();
    if (this.params.has('debugview')) this.debugView = new DebugView(this);
    if (this.debugMode) this._installHook();
    this.store.go('menu');
    this.loop.start();
    return true;
  }

  // ------------------------------------------------------------------ phases

  _onPhase(state, prev) {
    const phase = state.phase;
    const from = prev.phase;
    this.input.clearPresses();
    if (phase === 'menu' && this.net) this.closeNet();
    if (phase === 'menu' || phase === 'select') {
      this._leaveRace();
      this._ensureMenuScene();
      this.audio.startMusic();
    }
    if (phase === 'garage') {
      this._leaveRace();
      this._ensureGarageScene();
      this.audio.startMusic();
    }
    if (phase === 'loading') {
      this._leaveRace();
      this.audio.stopMusic();
      this.race = new RaceScene(this, state.raceConfig);
      this.renderer.shadowMap.enabled = this.quality.preset.shadows && this.race.humanDefs.length === 1;
      this._applyAspects();
      this.race.onFinished = (res) => this._onRaceFinished(res);
      this.loader = this.race.load();
      this.loadProgress = 0;
    }
    if (phase === 'countdown') {
      if (from === 'loading') {
        this._disposeBackdrops();
        this.race.begin();
        if (this.race.online && this.net) this.net.loaded();
      } else if (from === 'paused' && state.resumeTo === 'countdown') {
        this.race.setPaused(false);
        this.audio.setPaused(false);
      } else {
        // restart from racing / paused / results / countdown
        this.race.setPaused(false);
        this.audio.setPaused(false);
        this.race.restart();
      }
      this.loop.resetClock();
    }
    if (phase === 'racing' && from === 'paused') {
      this.race.setPaused(false);
      this.race.inputBlocked = false;
      this.audio.setPaused(false);
      this.loop.resetClock();
    }
    if (phase === 'paused') {
      if (this.race.online) {
        // online: other drivers keep racing, so the race never freezes; my car coasts
        this.race.inputBlocked = true;
      } else {
        this.race.setPaused(true);
        this.audio.setPaused(true);
      }
      this.input.releaseAll();
    }
    if (phase === 'results') {
      this.audio.setPaused(false);
      this.audio.stopRace();
    }
    if (this.race && this.race.humans) for (const hm of this.race.humans) if (hm.hud) hm.hud.el.classList.toggle('is-hidden', phase === 'paused' || phase === 'results');
    this.ui.render(state, prev);
  }

  _ensureMenuScene() {
    if (!this.menuScene) this.menuScene = new MenuScene(this);
    if (this.garageScene) {
      this.garageScene.dispose();
      this.garageScene = null;
    }
  }

  _ensureGarageScene() {
    if (!this.garageScene) this.garageScene = new GarageScene(this);
    if (this.menuScene) {
      this.menuScene.dispose();
      this.menuScene = null;
    }
  }

  _disposeBackdrops() {
    if (this.menuScene) {
      this.menuScene.dispose();
      this.menuScene = null;
    }
    if (this.garageScene) {
      this.garageScene.dispose();
      this.garageScene = null;
    }
  }

  _leaveRace() {
    if (!this.race) return;
    this.audio.stopRace();
    this.audio.setPaused(false);
    this.race.dispose();
    this.race = null;
    this.loader = null;
    this.input.releaseAll();
    this.renderer.renderLists.dispose();
    this.renderer.shadowMap.enabled = this.quality.preset.shadows;
  }

  /** Every race camera gets the aspect of its own screen rectangle. */
  _applyAspects() {
    if (!this.race) return;
    const w = window.innerWidth;
    const hh = Math.max(1, window.innerHeight);
    // (before load() builds the drivers this is a no-op; it runs again after loading)
    for (const hm of this.race.humans) hm.rig.setAspect((hm.rect[2] * w) / Math.max(1, hm.rect[3] * hh));
  }

  // ------------------------------------------------------------------ online

  /** Use an online room (lobby → races). */
  attachNet(session) {
    if (this.net && this.net !== session) this.closeNet();
    this.net = session;
    this._netOut = [];
    session.on('start', (m) => this._netStart(m));
    session.on('go', () => {
      if (this.race) this.race.go();
    });
    session.on('lobby', () => this.ui.onLobby && this.ui.onLobby());
    session.on('error', (err) => {
      this.ui.toast(err.message || String(err), 'warn');
      if (session.state === 'closed') {
        this.net = null;
        if (this.store.phase !== 'menu') this.quitToMenu();
      }
    });
  }

  closeNet() {
    const n = this.net;
    this.net = null;
    if (n) n.close();
  }

  _netStart(m) {
    const net = this.net;
    if (!net) return;
    const s = this.save.data.settings;
    const me = net.me;
    const raceConfig = {
      circuitId: m.settings.circuitId,
      mode: 'grandprix',
      laps: m.settings.laps,
      opponents: 0,
      difficulty: 'medium',
      carId: me.carId,
      liveryId: me.livery,
      camera: s.camera,
      units: s.units,
      assists: s.assists,
      handling: s.handling,
      minimap: s.showMinimap,
      target: null,
      obstacles: true,
      moving: true,
      tokens: false,
      humans: [{ name: me.name, carId: me.carId, liveryId: me.livery, device: 'all' }],
      online: { players: m.players, mySlot: net.slot, isHost: net.isHost, ai: m.settings.ai || 0 },
    };
    const p = this.store.phase;
    if (p === 'racing' || p === 'countdown' || p === 'paused') this.store.go('menu', { screen: 'main' });
    this.store.go('loading', { raceConfig });
  }

  /** Build a race config from the store selection and start loading. */
  startRace(cfg) {
    const s = this.save.data.settings;
    const car = getCar(cfg.carId || this.save.data.carId);
    const raceConfig = {
      circuitId: cfg.circuitId || 'beginner',
      mode: cfg.mode || 'practice',
      laps: cfg.laps ?? CIRCUITS[cfg.circuitId || 'beginner'].laps.grandprix,
      opponents: cfg.opponents || 0,
      difficulty: cfg.difficulty || 'medium',
      carId: car.id,
      liveryId: cfg.liveryId || this.save.data.livery[car.id] || car.defaultLivery,
      camera: s.camera,
      units: s.units,
      assists: s.assists,
      minimap: s.showMinimap,
      handling: s.handling,
      target: cfg.target || null,
      levelId: cfg.levelId || null,
      levelIndex: cfg.levelIndex || 0,
      obstacles: cfg.obstacles !== false,
      moving: cfg.moving !== false,
      tokens: cfg.tokens !== false,
      humans: cfg.humans || null,
    };
    this.store.go('loading', { raceConfig });
  }

  requestPause() {
    const p = this.store.phase;
    if (p === 'racing' || p === 'countdown') this.store.go('paused', { resumeTo: p });
  }

  resume() {
    if (this.store.phase === 'paused') this.store.go(this.store.state.resumeTo === 'countdown' ? 'countdown' : 'racing');
  }

  restartRace() {
    if (this.race && this.race.online) return; // online races restart from the lobby
    const p = this.store.phase;
    if (p === 'racing' || p === 'paused' || p === 'results' || p === 'countdown') this.store.go('countdown', { resumeTo: null });
  }

  quitToMenu() {
    this.store.go('menu', { screen: 'main' });
  }

  /** End a practice / time-trial session from the pause menu. */
  endSession() {
    if (!this.race) return;
    const res = this.race.buildResults();
    res.ended = true;
    this._onRaceFinished(res);
  }

  onRaceGo() {
    if (this.store.phase === 'countdown') this.store.go('racing');
  }

  _onRaceFinished(results) {
    this.lastResults = applyResults(this.save, results, this.race ? this.race.config : null);
    if (this.store.phase === 'paused') {
      this.race.setPaused(false);
      this.audio.setPaused(false);
      this.store.go('racing');
    }
    if (this.store.phase === 'racing') this.store.go('results', { results: this.lastResults });
  }

  // ------------------------------------------------------------------ loop

  step(dt) {
    const p = this.store.phase;
    if (this.race && (p === 'countdown' || p === 'racing' || (p === 'paused' && this.race.online))) this.race.step(dt);
    else if (this.menuScene && (p === 'menu' || p === 'select')) this.menuScene.step(dt);
    else if (this.garageScene && p === 'garage') this.garageScene.step(dt);
  }

  frame(alpha, dt) {
    if (this.contextLost) return;
    const t0 = performance.now();
    const input = this.input;
    input.poll(dt);
    this._globalKeys(dt);
    const p = this.store.phase;

    if (p === 'loading' && this.loader) {
      const r = this.loader.next();
      if (!r.done && r.value) {
        this.loadProgress = r.value.progress;
        this.ui.setLoading(r.value.progress, r.value.label);
      }
      if (r.done || (r.value && r.value.progress >= 1)) {
        this.loader = null;
        this.ui.setLoading(1, 'Ready');
        this._applyAspects();
        this.store.go('countdown');
      }
    }

    let scene = null;
    let camera = null;
    let views = null;
    if (this.race && this.race.ready && p !== 'loading') {
      if (this.net && this.race.online) {
        this.net.setOutgoing(this.race.netStates(this._netOut));
        this.net.tick(dt);
        this.race.applyNet(this.net.remote);
      }
      this.race.frame(alpha, dt);
      scene = this.race.scene;
      camera = this.race.camera;
      if (this.race.humans.length > 1) views = this.race.views;
    } else if (this.garageScene && p === 'garage') {
      this.garageScene.frame(alpha, dt);
      scene = this.garageScene.scene;
      camera = this.garageScene.camera;
    } else if (this.menuScene) {
      this.menuScene.frame(alpha, dt);
      scene = this.menuScene.scene;
      camera = this.menuScene.camera;
    }
    this.ui.frame(dt);
    this.audio.update();
    if (scene && camera) {
      const render = this.renderMode === 'always' || this.renderRequests > 0;
      if (render) {
        this.renderer.info.reset();
        if (views) this._renderViews(scene, views);
        else this.renderer.render(scene, camera);
        if (this.renderRequests > 0) this.renderRequests--;
      }
    }
    if (this.debugView) this.debugView.draw();
    this.frameMs = performance.now() - t0;
    if (p === 'racing' && this.quality.adaptive && this.renderMode === 'always') this.quality.sample(dt * 1000, dt);
    if (this.debugOverlay) this._updateDebugOverlay(dt);
  }

  /** Split-screen: one scissored viewport per local driver. */
  _renderViews(scene, views) {
    const r = this.renderer;
    const w = window.innerWidth;
    const hh = window.innerHeight;
    r.setScissorTest(true);
    for (let k = 0; k < views.length; k++) {
      const [x, y, vw, vh] = views[k].rect;
      const px = Math.round(x * w);
      const pw = Math.round((x + vw) * w) - px;
      const top = Math.round(y * hh);
      const ph = Math.round((y + vh) * hh) - top;
      const py = hh - top - ph; // WebGL viewports start at the bottom
      r.setViewport(px, py, pw, ph);
      r.setScissor(px, py, pw, ph);
      this.race.prepareView(k);
      r.render(scene, views[k].camera);
    }
    r.setScissorTest(false);
    r.setViewport(0, 0, w, hh);
  }

  _globalKeys() {
    const input = this.input;
    const p = this.store.phase;
    if (input.consume('mute')) {
      const muted = this.audio.toggleMute();
      this.save.update((d) => (d.settings.muted = muted));
      this.ui.toast(muted ? 'Sound off' : 'Sound on');
    }
    if (input.consume('debug')) this.toggleDebugOverlay();
    if (p === 'racing' || p === 'countdown') {
      if (input.consume('pause')) this.requestPause();
      if (input.consume('speedbreak') && p === 'racing') this.race.toggleSpeedbreak();
      if (this.race.humans.length > 1) {
        // split-screen: camera / reset per player device
        input.consume('camera');
        input.consume('reset');
        for (const hm of this.race.humans) {
          if (input.consumeDevice(hm.device, 'camera')) hm.hud.toast(`Camera: ${hm.rig.cycle()}`);
          if (input.consumeDevice(hm.device, 'reset') && p === 'racing') this.race.resetPlayer(hm.racer);
        }
        return;
      }
      if (input.consume('camera')) {
        const mode = this.race.rig.cycle();
        this.ui.toast(`Camera: ${mode}`);
      }
      // reset: tap = back on track, hold 1 s = full restart (not online)
      const held = this.race.online ? 0 : input.heldFor('reset');
      this.race.resetHold = held;
      if (held > 1.0) {
        input.holdStart.delete('reset');
        input.down.clear();
        this.restartRace();
        return;
      }
      if (input.consume('reset')) this._resetTapPending = true;
      if (this._resetTapPending && !input.isHeld('reset')) {
        this._resetTapPending = false;
        if (p === 'racing') this.race.resetPlayer();
      }
    } else {
      input.consume('camera');
      input.consume('reset');
      input.consume('speedbreak');
      // gamepad Start / P / Esc resume from pause (the menu also handles Esc directly)
      // (keyboard Esc / P is handled by the menu's own key listener)
      if (input.consume('pause') && p === 'paused' && input.lastDevice === 'gamepad' && !this.ui.overlayOpen()) this.resume();
    }
  }

  // ------------------------------------------------------------------ misc

  toggleDebugOverlay() {
    if (this.debugOverlay) {
      this.debugOverlay.remove();
      this.debugOverlay = null;
      return;
    }
    this.debugOverlay = h('div', { className: 'debug-overlay' });
    this.uiRoot.appendChild(this.debugOverlay);
    this._dbgAcc = 0;
    this._dbgFrames = 0;
  }

  _updateDebugOverlay(dt) {
    this._dbgAcc += dt;
    this._dbgFrames++;
    if (this._dbgAcc < 0.25) return;
    const fps = this._dbgFrames / this._dbgAcc;
    this._dbgAcc = 0;
    this._dbgFrames = 0;
    const info = this.renderer.info;
    const lines = [
      `FPS ${fps.toFixed(0)}  frame ${this.frameMs.toFixed(2)} ms`,
      `draw calls ${info.render.calls}  triangles ${info.render.triangles}`,
      `geometries ${info.memory.geometries}  textures ${info.memory.textures}`,
      `quality ${this.quality.id}  pixel ratio ${this.quality.pixelRatio.toFixed(2)}`,
    ];
    if (this.race && this.race.ready) {
      const s = this.race.snapshot();
      lines.push(`speed ${(s.speed * 3.6).toFixed(0)} km/h  slip ${((s.slip * 180) / Math.PI).toFixed(1)}°  ${s.surface}`);
      lines.push(`s ${s.s.toFixed(1)} / ${s.length.toFixed(0)}  t ${s.t.toFixed(2)}  cam ${s.camera.mode}`);
    }
    this.debugOverlay.textContent = lines.join('\n');
  }

  _onResize() {
    const w = window.innerWidth;
    const hgt = window.innerHeight;
    this.renderer.setPixelRatio(this.quality.computePixelRatio());
    this.renderer.setSize(w, hgt, false);
    const aspect = w / Math.max(1, hgt);
    if (this.race && this.race.humans.length) this._applyAspects();
    if (this.menuScene) this.menuScene.setAspect(aspect);
    if (this.garageScene) this.garageScene.setAspect(aspect);
    this.aspect = aspect;
  }

  /** Apply a changed quality preset (settings). */
  applyQuality(id, adaptive) {
    this.quality.setPreset(id);
    this.quality.adaptive = adaptive;
    this.renderer.shadowMap.enabled = this.quality.preset.shadows;
    this._onResize();
  }

  _contextLost(e) {
    e.preventDefault();
    this.contextLost = true;
    this.loop.stop();
    showError(this.uiRoot, {
      title: 'Graphics reset',
      message: 'The graphics context was lost (driver reset or too many tabs). Trying to restore it…',
      actions: [{ label: 'Reload', onClick: () => window.location.reload() }],
    });
  }

  _contextRestored() {
    this.contextLost = false;
    hideError();
    this._onResize();
    this.loop.resetClock();
    this.loop.start();
  }

  fail(title, message, err) {
    this.loop.stop();
    if (err) console.error(err);
    showError(this.uiRoot, {
      title,
      message,
      detail: err ? String(err && err.message ? err.message : err) : undefined,
      actions: [{ label: 'Reload', onClick: () => window.location.reload() }],
    });
  }

  // ------------------------------------------------------------------ test hook

  _installHook() {
    const game = this;
    window.__apex = {
      game,
      ready: () => game.store.phase,
      getState: () => ({ ...game.store.state, results: undefined, raceConfig: game.store.state.raceConfig }),
      getCar: () => (game.race && game.race.ready ? game.race.snapshot() : null),
      getRace: () => {
        const r = game.race;
        if (!r || !r.ready) return null;
        return {
          state: r.manager.state,
          time: r.manager.time,
          laps: r.player.cp.laps,
          totalLaps: r.config.laps,
          racers: r.racers.map((x) => ({ name: x.name, player: x.isPlayer, laps: x.cp.laps, s: x.proj.s, t: x.proj.t, speed: x.vehicle.speed, position: x.position, finished: x.finished, finishTime: x.finishTime, stuck: x.stuckTime, recoveries: x.recoveries, progress: x.progress })),
          results: game.lastResults,
        };
      },
      getTrack: () => {
        const r = game.race;
        if (!r || !r.ready) return null;
        const m = r.model;
        const step = 2;
        const out = { length: m.length, ds: m.ds * step, n: Math.floor(m.n / step), px: [], pz: [], tx: [], tz: [], w: [], line: [], speed: [], kappa: [] };
        for (let i = 0; i < m.n; i += step) {
          out.px.push(m.px[i]);
          out.pz.push(m.pz[i]);
          out.tx.push(m.tx[i]);
          out.tz.push(m.tz[i]);
          out.w.push(m.width[i]);
          out.line.push(r.line.offset[i]);
          out.speed.push(r.line.speed[i]);
          out.kappa.push(m.kappa[i]);
        }
        out.n = out.px.length;
        return out;
      },
      setInput: (inp) => {
        if (game.race) game.race.inputOverride = inp ? { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false, ...inp } : null;
      },
      step: (n = 1) => {
        if (!game.race) return null;
        for (let i = 0; i < n; i++) game.race.step(1 / 120);
        return game.race.snapshot();
      },
      teleport: (s, t = 0) => {
        const r = game.race;
        if (!r) return null;
        r._spawn(r.player, r.model.wrapS(s), t);
        r.player.cp.lastS = r.player.proj.s;
        r.rig.snap();
        return r.snapshot();
      },
      startRace: (cfg) => game.startRace(cfg),
      go: (phase, patch) => game.store.go(phase, patch),
      render: () => {
        game.renderRequests++;
      },
      info: () => ({
        calls: game.renderer.info.render.calls,
        triangles: game.renderer.info.render.triangles,
        geometries: game.renderer.info.memory.geometries,
        textures: game.renderer.info.memory.textures,
        programs: game.renderer.info.programs ? game.renderer.info.programs.length : 0,
        loops: Loop.activeLoops,
        frameMs: game.frameMs,
        quality: game.quality.id,
        pixelRatio: game.renderer.getPixelRatio(),
        shadows: game.renderer.shadowMap.enabled,
      }),
      /** Feed the adaptive-quality governor slow frames (test of the step-down). */
      slowFrames: (n, ms) => {
        for (let i = 0; i < n; i++) game.quality.sample(ms, ms / 1000);
        return window.__apex.info();
      },
      save: () => game.save.data,
      /** Online test helpers (kind 'local' = BroadcastChannel between tabs). */
      netCreate: async (kind = 'local', name = 'Host', code) => {
        const s = new NetSession({ kind, name, carId: game.save.data.carId });
        await s.create(code);
        game.attachNet(s);
        game.store.go('select', { screen: 'lobby' });
        return s.code;
      },
      netJoin: async (kind, code, name = 'Guest') => {
        const s = new NetSession({ kind, name, carId: game.save.data.carId });
        await s.join(code);
        game.attachNet(s);
        game.store.go('select', { screen: 'lobby' });
        return s.slot;
      },
      netSettings: (patch) => game.net && game.net.setSettings(patch),
      netStart: () => game.net && game.net.start(),
      netInfo: () => (game.net ? { code: game.net.code, slot: game.net.slot, host: game.net.isHost, players: game.net.players.map((p) => p.name), remote: [...game.net.remote.keys()], state: game.net.state } : null),
      levels: () => LEVELS.map((l) => ({ id: l.id, index: l.index, mode: l.mode })),
      startLevel: (id) => game.startRace(levelRaceConfig(getLevel(id), game.save.data)),
      /** Scoring + unlock rules on synthetic results, against a throwaway in-memory save. */
      campaignSelfTest: () => {
        const rows = [{}, {}, {}, {}, {}, {}];
        const gpL = getLevel('beginner-grandprix');
        const gp = [1, 2, 3, 4].map((p) => starsFor(gpL, levelTarget(gpL), { position: p, rows }));
        const taL = getLevel('beginner-timeattack');
        const tt = levelTarget(taL);
        const lap = (t, extra = {}) => starsFor(taL, tt, { bestLap: t, lapTimes: [t, t, t], penalty: 0, ...extra });
        const ta = [lap(tt.gold - 0.1), lap(tt.silver - 0.1), lap(tt.bronze - 0.1), lap(tt.bronze + 1), lap(tt.gold - 1, { timedOut: true })];
        const drL = getLevel('beginner-drift');
        const dt = levelTarget(drL);
        const drift = [dt.gold, dt.silver, dt.bronze, dt.bronze - 1].map((p) => starsFor(drL, dt, { driftScore: p }));
        const mem = new SaveManager(null);
        mem.load();
        const cfgOf = (id) => levelRaceConfig(getLevel(id), mem.data);
        const sum = () => Object.values(mem.data.stars).reduce((a, b) => a + b, 0);
        const win = { mode: 'grandprix', position: 1, rows, bestLap: 50, lapTimes: [50], driftScore: 0, longestDrift: 0 };
        applyResults(mem, win, cfgOf('beginner-grandprix'));
        const r2 = applyResults(mem, { mode: 'timeattack', bestLap: tt.gold - 0.5, lapTimes: [tt.gold - 0.5], penalty: 0, driftScore: 0, longestDrift: 0 }, cfgOf('beginner-timeattack'));
        const r3 = applyResults(mem, { mode: 'drift', bestLap: 60, lapTimes: [60], driftScore: dt.silver + 1, longestDrift: 3 }, cfgOf('beginner-drift'));
        const street = sum() >= 5;
        const worse = applyResults(mem, { mode: 'grandprix', position: 4, rows, bestLap: 60, lapTimes: [60], driftScore: 0, longestDrift: 0 }, cfgOf('beginner-grandprix'));
        const streetGp = applyResults(mem, { ...win }, cfgOf('street-grandprix'));
        return {
          gp,
          ta,
          drift,
          unlocks: {
            street,
            titan: mem.data.unlockedCars.includes('titan'),
            newUnlocks: r2.newUnlocks.length + r3.newUnlocks.length + streetGp.newUnlocks.length,
            keepsBest: worse.stars === 0 && mem.data.stars['beginner-grandprix'] === 3,
            total: sum(),
          },
        };
      },
    };
  }
}
