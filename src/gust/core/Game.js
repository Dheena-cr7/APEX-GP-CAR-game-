// GUST CREW: renderer, loop, menus, race lifecycle, online rooms.

import * as THREE from 'three';
import { Loop, FIXED_DT } from '../../core/Loop.js';
import { Input } from '../input/Input.js';
import { Sound } from '../audio/Sound.js';
import { Save } from './Save.js';
import { UI } from '../ui/UI.js';
import { Race } from './Race.js';
import { COURSES, COURSE_BY_ID } from '../sim/Courses.js';
import { THEMES } from '../render/Themes.js';
import { GustNet } from '../net/Net.js';

const PIXEL_CAP = { high: 1.6, medium: 1.25, low: 1 };

export class Game {
  constructor({ canvas, uiRoot, params }) {
    this.canvas = canvas;
    this.uiRoot = uiRoot;
    this.params = params;
    this.race = null;
    this.attract = null;
    this.loading = null;
    this.net = null;
    this.localBots = 0;
    this.lastCourse = 'lagoon';
    this.lastStart = null;
    this.width = 1;
    this.height = 1;
    this.touch = Input.isTouchDevice();
    this.perf = { acc: 0, n: 0, slow: 0, fast: 0, scale: 1 };
  }

  init() {
    this.save = new Save();
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Neutral tone mapping keeps the cartoon colours bright and saturated
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer = renderer;
    this.applyQualitySetting();
    this.input = new Input(this.canvas, this.uiRoot);
    this.sound = new Sound();
    this.applyVolumes();
    this.ui = new UI(this, this.uiRoot);
    this.loop = new Loop({ step: (dt) => this._step(dt), frame: (a, dt) => this._frame(a, dt) });
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    this.resize();
    const unlock = () => {
      this.sound.unlock();
      this._startMusic();
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock);
    document.addEventListener('visibilitychange', () => this._onVisibility());
    this._bg = null;
    this._lastFrame = performance.now();
    // watchdog: some browsers stop animation frames for background or
    // occluded windows without reporting them hidden; online games must not stall
    setInterval(() => {
      if (this.net && !this._bg && performance.now() - this._lastFrame > 700) this._startBackground();
    }, 500);
    this.startAttract('lagoon');
    this.ui.showTitle();
    if (this.params.get('room')) this.ui.showOnline();
    this.loop.start();
    if (this.params.has('debug')) window.__gust = this;
  }

  // ------------------------------------------------------------ settings

  get quality() {
    const q = this.save.settings.quality;
    if (q !== 'auto') return q;
    if (this.params.get('quality')) return this.params.get('quality');
    return this.touch || Math.min(screen.width, screen.height) < 700 ? 'medium' : 'high';
  }

  applyQualitySetting() {
    const cap = PIXEL_CAP[this.quality] || 1.5;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap) * this.perf.scale);
    if (this.width > 1) this.resize();
  }

  applyVolumes() {
    const s = this.save.settings;
    this.sound.setVolumes({ master: s.master, music: s.music, sfx: s.sfx });
    this.sound.silly = s.silly !== false;
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    for (const r of [this.race, this.attract]) if (r && r.world.camera) r.world.resize(w, h);
  }

  _startMusic() {
    const r = this.race || this.attract;
    if (!r) return;
    const th = THEMES[r.course.theme];
    this.sound.startMusic(th.music, this.race ? 1 : 0.35);
  }

  // ------------------------------------------------------------ loop

  _step(dt) {
    if (this.race && !this.loading) this.race.step(dt);
    else if (this.attract && !this.race) this.attract.step(dt);
  }

  _frame(alpha, dt) {
    this._lastFrame = performance.now();
    if (this._bg) {
      // frames are back: the page loop takes over from the background ticker
      this._stopBackground();
      this.loop.resetClock();
    }
    this.input.gameActive = !!this.race && !this.loading && !this.ui.current && this.ui.modalEl.hidden;
    this.input.poll();
    this.ui.pollPad(this.input);
    this.ui.pollLocalJoin(this.input);
    if (this.loading) this._advanceLoading();
    const active = this.race && !this.loading ? this.race : this.attract;
    if (active && active.world.camera) {
      active.frame(alpha, dt);
      active.world.render();
    }
    if ((this.attract && this.attract._pending) || this._nextAttract) this._advanceAttract();
    this.input.endFrame();
    this._perfWatch(dt);
  }

  _perfWatch(dt) {
    const p = this.perf;
    // only judge speed while the player is actually looking at the game:
    // background / unfocused windows are throttled by the browser
    if (!this.race || this.loading || document.hidden || !document.hasFocus() || dt > 0.25) {
      p.acc = 0;
      p.n = 0;
      return;
    }
    p.acc += dt;
    p.n++;
    if (p.acc < 2) return;
    const avg = p.acc / p.n;
    p.acc = 0;
    p.n = 0;
    if (avg > 1 / 42 && p.scale > 0.62) {
      p.fast = 0;
      if (++p.slow >= 2) {
        p.slow = 0;
        p.scale = Math.max(0.6, p.scale - 0.15);
        this.applyQualitySetting();
      }
    } else if (avg < 1 / 56 && p.scale < 1) {
      // plenty of headroom again: step the resolution back up
      p.slow = 0;
      if (++p.fast >= 5) {
        p.fast = 0;
        p.scale = Math.min(1, p.scale + 0.1);
        this.applyQualitySetting();
      }
    } else {
      p.slow = 0;
      p.fast = 0;
    }
  }

  // ------------------------------------------------------------ loading

  /** Build a race over several frames, showing progress. */
  loadRace(opts, onReady) {
    const course = COURSE_BY_ID[opts.course] || COURSES[0];
    this.ui.hideScreen();
    this.ui.hideHUD();
    this.ui.showLoading(course);
    if (this.race) {
      this.race.dispose();
      this.race = null;
    }
    this.lastCourse = course.id;
    const race = new Race(this, { ...opts, course });
    this.loading = { race, gen: race.build(), onReady, started: performance.now() };
    this.sound.stopGusts();
  }

  _advanceLoading(budget = 12) {
    const L = this.loading;
    // a few ms of building per frame keeps the page responsive
    const t0 = performance.now();
    let res;
    do {
      try {
        res = L.gen.next();
      } catch (err) {
        this.loading = null;
        this.ui.hideLoading();
        this.fail('Could not build the river', 'Something went wrong while building the course.', err);
        return;
      }
      if (!res.done) this.ui.loadingProgress(res.value);
    } while (!res.done && performance.now() - t0 < budget);
    if (!res.done) return;
    this.loading = null;
    this.race = L.race;
    this.ui.hideLoading();
    this.ui.showHUD(this.race);
    this.input.showTouch(this.touch);
    if (this.attract) {
      this.attract.dispose();
      this.attract = null;
    }
    if (this._nextAttract) {
      this._nextAttract.dispose();
      this._nextAttract = null;
    }
    this.loop.resetClock();
    this._startMusic();
    this.sound.setMusicIntensity(1);
    if (L.onReady) L.onReady(this.race);
  }

  startAttract(courseId) {
    const course = COURSE_BY_ID[courseId] || COURSES[0];
    const crew = [0, 1, 2].map((i) => ({ slot: i, name: ['Pip', 'Mo', 'Juno'][i], color: i, hat: i, bot: true }));
    const r = new Race(this, { course, crew, role: 'attract', seed: 3 });
    r._pending = r.build();
    r._courseId = course.id;
    if (!this.attract) this.attract = r;
    else this._nextAttract = r;
  }

  _advanceAttract() {
    if (this.race || this.loading) {
      // a race took over: drop a half-built background demo
      if (this._nextAttract) {
        this._nextAttract.dispose();
        this._nextAttract = null;
      }
      return;
    }
    const r = this._nextAttract || this.attract;
    if (!r || !r._pending) return;
    const t0 = performance.now();
    let res;
    do {
      res = r._pending.next();
    } while (!res.done && performance.now() - t0 < 10);
    if (!res.done) return;
    r._pending = null;
    r.start();
    if (this._nextAttract === r) {
      if (this.attract) this.attract.dispose();
      this.attract = r;
      this._nextAttract = null;
    }
    this._startMusic();
  }

  restartAttract() {
    if (this.race) return;
    this.startAttract(this.attract ? this.attract.course.id : 'lagoon');
  }

  /** Menu background follows the river being picked. */
  previewCourse(id) {
    if (this.race || this.loading) return;
    const cur = this._nextAttract || this.attract;
    if (cur && cur._courseId === id) return;
    if (this._nextAttract) {
      this._nextAttract.dispose();
      this._nextAttract = null;
    }
    this.startAttract(id);
  }

  _toAttract() {
    if (this.race) {
      this.race.dispose();
      this.race = null;
    }
    this.ui.hideHUD();
    this.input.showTouch(false);
    if (!this.attract && !this._nextAttract) this.startAttract(this.lastCourse);
    this.sound.setMusicIntensity(0.35);
  }

  // ------------------------------------------------------------ offline

  startOffline(mode, courseId) {
    const save = this.save;
    const crew = [];
    if (mode === 'local' && this.ui.localJoin.length) {
      this.ui.localJoin.forEach((p, i) => crew.push({ slot: i, name: `P${i + 1}`, color: i, hat: p.hat, scheme: p.scheme }));
      for (let k = 0; k < this.localBots && crew.length < 4; k++) {
        const slot = crew.length;
        crew.push({ slot, name: 'Bot', color: slot, hat: slot, bot: true });
      }
    } else {
      mode = 'solo';
      crew.push({ slot: 0, name: save.data.name || 'You', color: 0, hat: save.data.hat, scheme: 'solo' });
      for (let k = 0; k < save.settings.bots; k++) crew.push({ slot: k + 1, name: ['Pip', 'Mo', 'Juno'][k], color: k + 1, hat: (k + 1) % 4, bot: true });
    }
    this.lastStart = { mode, courseId };
    this.loadRace({ course: courseId, crew, role: mode, seed: Math.floor(Math.random() * 1e6) }, (race) => race.start());
  }

  restartRace() {
    if (this.paused) this._setPaused(false);
    if (this.net) return;
    if (this.lastStart) this.startOffline(this.lastStart.mode, this.lastStart.courseId);
  }

  quitRace() {
    this._setPaused(false);
    if (this.net) {
      this.leaveOnline();
      return;
    }
    this.toMenu();
  }

  toMenu(target = 'title') {
    this._setPaused(false);
    this._toAttract();
    if (target === 'courses') this.ui.showCourses('solo');
    else if (target === 'local-courses') this.ui.showCourses('local');
    else this.ui.showTitle();
  }

  finishRace(race, results) {
    if (race !== this.race) return;
    const rec = this.save.record(results.course, results.time, results.shells, results.medal, results.maxShells);
    if (race.role === 'host') this.net.sendEnd(results);
    this.ui.hideHUD();
    this.input.showTouch(false);
    this.ui.showResults(race, results, rec);
  }

  // ------------------------------------------------------------ pause

  togglePause() {
    if (!this.race || this.loading) return;
    if (this.ui.current === 'results') return;
    this._setPaused(!this.paused);
  }

  _setPaused(v) {
    if (!this.race) {
      this.paused = false;
      return;
    }
    this.paused = v;
    // offline races really pause; online the river keeps flowing
    this.race.paused = v && !this.net;
    if (v) this.ui.showPause(this.race);
    else {
      if (this.ui.current === 'pause') this.ui.hideScreen();
      this.ui.closeModal();
      this.loop.resetClock();
    }
  }

  // ------------------------------------------------------------ online

  _newNet() {
    const kind = this.params.has('localnet') ? 'local' : 'peer';
    const net = new GustNet({ kind, name: this.save.data.name || 'Sailor', hat: this.save.data.hat });
    net.on('lobby', () => {
      if (this.net !== net) return;
      if (!this.race && !this.loading && (this.ui.current === 'lobby' || this.ui.current === null)) this.ui.showLobby(net);
    });
    net.on('peer', (kind2, p) => {
      if (this.net !== net) return;
      this.sound.play(kind2 === 'join' ? 'join' : 'leave');
      this.ui.toast(kind2 === 'join' ? `${p.name} came aboard!` : `${p.name} left the raft.`);
      if (this.race && this.race.net === net) {
        if (kind2 === 'join') this.race.addCrew({ slot: p.slot, name: p.name, color: p.slot, hat: p.hat, local: false });
        else this.race.removeCrew(p.slot);
      }
    });
    net.on('respawn', () => {
      if (this.race && this.race.net === net) this.race.sim.respawn();
    });
    net.on('start', (m) => this._clientStart(net, m));
    net.on('snap', (m) => {
      if (this.race && this.race.net === net && !this.loading) this.race.onSnap(m);
    });
    net.on('end', (results) => {
      if (!this.race || this.race.net !== net) return;
      const rec = this.save.record(results.course, results.time, results.shells, results.medal, results.maxShells);
      this.ui.hideHUD();
      this.input.showTouch(false);
      this.ui.showResults(this.race, { ...results, knocks: this.race.knocks }, rec);
    });
    net.on('back', () => {
      if (this.net !== net) return;
      this._setPaused(false);
      this._toAttract();
      this.ui.showLobby(net);
    });
    net.on('ping', (rtt) => this.ui.updatePing(rtt));
    net.on('error', (err) => this.ui.toast(err.message || String(err), 'warn'));
    net.on('closed', (reason) => {
      if (this.net !== net) return;
      const code = net.code;
      const wasClient = !net.isHost;
      this.net = null;
      this._setPaused(false);
      this._toAttract();
      if (wasClient && /Lost connection/.test(reason || '') && !this._rejoining) {
        // one automatic retry: networks blip
        this._rejoining = true;
        this.ui.toast('Connection dropped, reconnecting…', 'warn');
        this.joinOnline(code, true);
        return;
      }
      this.ui.showOnline(reason || 'Disconnected.');
    });
    return net;
  }

  async hostOnline() {
    if (this.net) this.net.dispose();
    const net = this._newNet();
    this.net = net;
    try {
      await net.create();
      this.ui.showLobby(net);
    } catch (err) {
      if (this.net === net) this.net = null;
      net.dispose();
      this.ui.showOnline(err.message || 'Could not create a room.');
    }
  }

  async joinOnline(code, retry = false) {
    if (this.net) this.net.dispose();
    const net = this._newNet();
    this.net = net;
    try {
      await net.join(code);
      this._rejoining = false;
      if (!this.race && !this.loading) this.ui.showLobby(net);
    } catch (err) {
      if (this.net === net) this.net = null;
      net.dispose();
      this._rejoining = false;
      this.ui.showOnline((retry ? 'Could not reconnect. ' : '') + (err.message || 'Could not join.'));
    }
  }

  leaveOnline() {
    const net = this.net;
    this.net = null;
    if (net) net.dispose();
    this._setPaused(false);
    this._toAttract();
    this.ui.showOnline();
  }

  _crewFromPlayers(players, bots, mySlot, hostSide) {
    const crew = players.map((p) => ({ slot: p.slot, name: p.name, color: p.slot % 4, hat: p.hat, local: p.slot === mySlot, scheme: p.slot === mySlot ? 'solo' : undefined }));
    const used = new Set(crew.map((c) => c.slot));
    for (let s = 0, k = 0; s < 4 && k < bots; s++) {
      if (used.has(s)) continue;
      crew.push({ slot: s, name: 'Bot', color: s, hat: s, bot: true, local: hostSide });
      k++;
    }
    return crew.sort((a, b) => a.slot - b.slot);
  }

  startOnlineRace() {
    const net = this.net;
    if (!net || !net.isHost) return;
    this._setPaused(false);
    const seed = Math.floor(Math.random() * 1e6);
    net.setSeed(seed);
    net.start(seed);
    const crew = this._crewFromPlayers(net.players, net.settings.bots, 0, true);
    this.loadRace({ course: net.settings.course, crew, role: 'host', seed, net }, (race) => {
      race.readyAt = performance.now();
    });
    if (document.hidden) this._startBackground();
  }

  _clientStart(net, m) {
    if (this.net !== net) return;
    this._setPaused(false);
    const crew = this._crewFromPlayers(m.players, m.settings.bots, net.slot, false);
    this.loadRace({ course: m.settings.course, crew, role: 'client', seed: m.seed, net }, () => net.sendReady());
    if (document.hidden) this._startBackground();
  }

  onlineToLobby() {
    const net = this.net;
    if (!net || !net.isHost) return;
    net.backToLobby();
    this._toAttract();
    this.ui.showLobby(net);
  }

  // ------------------------------------------------------------ hidden tab

  _onVisibility() {
    if (document.hidden) {
      if (this.net) this._startBackground();
      else this.sound.suspend();
      if (this.race && !this.net && !this.paused && this.race.sim.phase === 'run') this._setPaused(true);
    } else {
      this._stopBackground();
      this.sound.resume();
      this.loop.resetClock();
    }
  }

  _startBackground() {
    if (this._bg) return;
    // timers in a worker are not throttled like the page's, so an online
    // race keeps running (and syncing) while the tab is in the background
    const src = 'let id=0;onmessage=(e)=>{clearInterval(id);if(e.data)id=setInterval(()=>postMessage(0),50)}';
    try {
      const w = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
      let last = performance.now();
      let acc = 0;
      w.onmessage = () => {
        const now = performance.now();
        let el = Math.min(0.5, (now - last) / 1000);
        last = now;
        if (this.loading) {
          this._advanceLoading(40);
          last = performance.now();
          return;
        }
        const race = this.race;
        if (!race) return;
        acc += el;
        while (acc >= FIXED_DT) {
          race.step(FIXED_DT);
          acc -= FIXED_DT;
        }
        race.frameHeadless(el);
      };
      w.postMessage(1);
      this._bg = w;
    } catch {
      this._bg = null;
    }
  }

  _stopBackground() {
    if (!this._bg) return;
    this._bg.postMessage(0);
    this._bg.terminate();
    this._bg = null;
  }

  fail(title, message, err) {
    console.error(err);
    this.ui.showError(title, message, [{ label: 'Reload', onClick: () => location.reload() }]);
  }
}
