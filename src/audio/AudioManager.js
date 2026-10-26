// Procedural Web Audio: engine (oscillators + filter tied to RPM/throttle),
// tyre squeal tied to slip, road/wind noise, one-shot SFX and a quiet menu
// loop. The AudioContext is only created after a trusted user gesture.
// Master / SFX / music volume and mute persist through the save.

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);

export class AudioManager {
  constructor(settings) {
    this.ctx = null;
    this.settings = { master: 0.8, sfx: 0.9, music: 0.5, muted: false, ...settings };
    this.engine = null;
    this.music = null;
    this.musicOn = false;
    this.paused = false;
    this.noiseBuffer = null;
    this.lastPlay = Object.create(null);
    this.unlocked = false;
    this._unlock = this._unlock.bind(this);
    window.addEventListener('pointerdown', this._unlock, true);
    window.addEventListener('keydown', this._unlock, true);
  }

  _unlock(e) {
    if (e && !e.isTrusted) return;
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        this.ctx = new AC();
      } catch {
        this.ctx = null;
        return;
      }
      this._buildGraph();
    }
    if (this.ctx.state === 'suspended' && !this.paused) this.ctx.resume().catch(() => {});
    this.unlocked = true;
    if (this.wantMusic && !this.music) this.startMusic();
    if (this.wantEngine && !this.engine) this._startEngine();
  }

  _buildGraph() {
    const c = this.ctx;
    this.master = c.createGain();
    this.sfxBus = c.createGain();
    this.musicBus = c.createGain();
    this.sfxBus.connect(this.master);
    this.musicBus.connect(this.master);
    this.master.connect(c.destination);
    this.applyVolumes();
    const len = c.sampleRate * 1;
    this.noiseBuffer = c.createBuffer(1, len, c.sampleRate);
    const d = this.noiseBuffer.getChannelData(0);
    let seed = 12345;
    for (let i = 0; i < len; i++) {
      seed = (seed * 16807) % 2147483647;
      d[i] = (seed / 2147483647) * 2 - 1;
    }
  }

  setVolumes(v) {
    Object.assign(this.settings, v);
    this.applyVolumes();
  }

  applyVolumes() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const s = this.settings;
    const m = s.muted || this.paused ? 0 : s.master;
    this.master.gain.setTargetAtTime(m, t, 0.03);
    this.sfxBus.gain.setTargetAtTime(s.sfx, t, 0.03);
    this.musicBus.gain.setTargetAtTime(s.music * 0.6, t, 0.05);
  }

  toggleMute() {
    this.settings.muted = !this.settings.muted;
    this.applyVolumes();
    return this.settings.muted;
  }

  /** Pause silences everything (and suspends the context to save CPU). */
  setPaused(on) {
    this.paused = on;
    this.applyVolumes();
    if (!this.ctx) return;
    if (on) this.ctx.suspend().catch(() => {});
    else this.ctx.resume().catch(() => {});
  }

  // ---------------------------------------------------------------- engine

  startRace() {
    this.stopMusic();
    this.wantEngine = true;
    if (this.ctx && !this.engine) this._startEngine();
  }

  _startEngine() {
    const c = this.ctx;
    const out = c.createGain();
    out.gain.value = 0;
    out.connect(this.sfxBus);
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 3;
    filter.connect(out);
    const o1 = c.createOscillator();
    o1.type = 'sawtooth';
    const o2 = c.createOscillator();
    o2.type = 'square';
    const o3 = c.createOscillator();
    o3.type = 'triangle';
    const g1 = c.createGain();
    g1.gain.value = 0.5;
    const g2 = c.createGain();
    g2.gain.value = 0.22;
    const g3 = c.createGain();
    g3.gain.value = 0.4;
    o1.connect(g1).connect(filter);
    o2.connect(g2).connect(filter);
    o3.connect(g3).connect(filter);
    // tyre squeal: band-passed noise
    const sq = c.createBufferSource();
    sq.buffer = this.noiseBuffer;
    sq.loop = true;
    const sqf = c.createBiquadFilter();
    sqf.type = 'bandpass';
    sqf.frequency.value = 1800;
    sqf.Q.value = 6;
    const sqg = c.createGain();
    sqg.gain.value = 0;
    sq.connect(sqf).connect(sqg).connect(this.sfxBus);
    // road / wind noise
    const rd = c.createBufferSource();
    rd.buffer = this.noiseBuffer;
    rd.loop = true;
    const rdf = c.createBiquadFilter();
    rdf.type = 'lowpass';
    rdf.frequency.value = 500;
    const rdg = c.createGain();
    rdg.gain.value = 0;
    rd.connect(rdf).connect(rdg).connect(this.sfxBus);
    o1.start();
    o2.start();
    o3.start();
    sq.start();
    rd.start();
    this.engine = { out, filter, o1, o2, o3, sq, sqf, sqg, rd, rdf, rdg, nodes: [out, filter, o1, o2, o3, g1, g2, g3, sq, sqf, sqg, rd, rdf, rdg] };
  }

  /** Per-frame engine update from the player's vehicle. */
  updateCar(v, grid) {
    const e = this.engine;
    if (!e || !this.ctx || this.paused) return;
    const t = this.ctx.currentTime;
    const rpm = v.rpm;
    const f = 34 + (rpm / 12500) * 150;
    e.o1.frequency.setTargetAtTime(f, t, 0.03);
    e.o2.frequency.setTargetAtTime(f * 2.01, t, 0.03);
    e.o3.frequency.setTargetAtTime(f * 0.5, t, 0.03);
    const thr = grid ? v.throttle * 0.6 : v.throttle;
    e.filter.frequency.setTargetAtTime(500 + thr * 2400 + (rpm / 12500) * 900, t, 0.05);
    e.out.gain.setTargetAtTime(0.07 + thr * 0.09 + (v.boostTime > 0 ? 0.04 : 0), t, 0.05);
    const squeal = Math.min(1, v.skid) * (v.u > 6 ? 1 : 0);
    e.sqg.gain.setTargetAtTime(squeal * 0.16, t, 0.05);
    e.sqf.frequency.setTargetAtTime(1500 + Math.abs(v.slip) * 900, t, 0.08);
    e.rdg.gain.setTargetAtTime(Math.min(0.12, v.speed / 700), t, 0.1);
    e.rdf.frequency.setTargetAtTime(300 + v.speed * 12, t, 0.1);
  }

  stopRace() {
    this.wantEngine = false;
    const e = this.engine;
    if (!e) return;
    for (const n of e.nodes) {
      try {
        if (n.stop) n.stop();
      } catch {
        /* already stopped */
      }
      n.disconnect();
    }
    this.engine = null;
  }

  // ---------------------------------------------------------------- one-shots

  _env(node, t, a, peak, decay) {
    node.gain.setValueAtTime(0.0001, t);
    node.gain.exponentialRampToValueAtTime(peak, t + a);
    node.gain.exponentialRampToValueAtTime(0.0001, t + a + decay);
  }

  _tone(type, freq, dur, vol, when = 0, slideTo = 0) {
    const c = this.ctx;
    const t = c.currentTime + when;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const g = c.createGain();
    this._env(g, t, 0.005, vol, dur);
    o.connect(g).connect(this.sfxBus);
    o.start(t);
    o.stop(t + dur + 0.05);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  }

  _noise(dur, vol, freq, q = 1, type = 'lowpass', when = 0, sweepTo = 0) {
    const c = this.ctx;
    const t = c.currentTime + when;
    const src = c.createBufferSource();
    src.buffer = this.noiseBuffer;
    const f = c.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    f.Q.value = q;
    const g = c.createGain();
    this._env(g, t, 0.004, vol, dur);
    src.connect(f).connect(g).connect(this.sfxBus);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.05);
    src.onended = () => {
      src.disconnect();
      f.disconnect();
      g.disconnect();
    };
  }

  /** Play a named effect. `amount` scales intensity (0..1). */
  play(name, amount = 1) {
    if (!this.ctx || this.paused || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;
    const last = this.lastPlay[name] || 0;
    if (now - last < 0.04) return;
    this.lastPlay[name] = now;
    const a = Math.max(0.1, Math.min(1, amount));
    switch (name) {
      case 'click':
        this._tone('square', 1800, 0.03, 0.05);
        break;
      case 'hover':
        this._tone('square', 1200, 0.02, 0.025);
        break;
      case 'beep':
        this._tone('sine', 660, 0.22, 0.25);
        break;
      case 'go':
        this._tone('sine', 1320, 0.5, 0.3);
        this._tone('triangle', 660, 0.5, 0.15);
        break;
      case 'thud':
        this._tone('sine', 90, 0.25, 0.5 * a, 0, 45);
        this._noise(0.18, 0.35 * a, 900);
        break;
      case 'thudSoft':
        this._tone('sine', 120, 0.2, 0.35 * a, 0, 70);
        this._noise(0.12, 0.12 * a, 500);
        break;
      case 'cone':
        this._tone('square', 520, 0.06, 0.12);
        this._tone('square', 780, 0.05, 0.08, 0.04);
        break;
      case 'boost':
        this._noise(0.6, 0.25, 400, 2, 'bandpass', 0, 3200);
        break;
      case 'lap':
        this._tone('sine', NOTE(76), 0.18, 0.2);
        this._tone('sine', NOTE(83), 0.3, 0.2, 0.14);
        break;
      case 'bank':
        this._tone('triangle', NOTE(72), 0.1, 0.12);
        this._tone('triangle', NOTE(76), 0.1, 0.12, 0.07);
        this._tone('triangle', NOTE(79), 0.18, 0.12, 0.14);
        break;
      case 'warn':
        this._tone('square', 330, 0.12, 0.1);
        this._tone('square', 330, 0.12, 0.1, 0.18);
        break;
      case 'token':
        this._tone('sine', NOTE(88), 0.15, 0.18);
        this._tone('sine', NOTE(93), 0.2, 0.15, 0.06);
        break;
      case 'finish':
        for (const [n, w] of [[72, 0], [76, 0.12], [79, 0.24], [84, 0.36]]) this._tone('triangle', NOTE(n), 0.5, 0.15, w);
        break;
      default:
        break;
    }
  }

  // ---------------------------------------------------------------- music

  /** Quiet menu loop: slow pad chords + sparse arpeggio, scheduled from update(). */
  startMusic() {
    this.wantMusic = true;
    if (!this.ctx || this.music) return;
    this.music = { nextTime: this.ctx.currentTime + 0.1, step: 0, nodes: new Set() };
  }

  stopMusic() {
    this.wantMusic = false;
    if (!this.music) return;
    for (const n of this.music.nodes) {
      try {
        n.stop();
      } catch {
        /* ended */
      }
    }
    this.music = null;
  }

  /** Called once per frame by the game: schedules music ahead. */
  update() {
    const m = this.music;
    if (!m || !this.ctx || this.paused || this.ctx.state !== 'running') return;
    const c = this.ctx;
    const beat = 0.5;
    const chords = [
      [57, 60, 64],
      [53, 57, 60],
      [55, 59, 62],
      [52, 55, 59],
    ];
    while (m.nextTime < c.currentTime + 0.3) {
      const t = m.nextTime;
      const bar = Math.floor(m.step / 8) % chords.length;
      const chord = chords[bar];
      if (m.step % 8 === 0) {
        for (const n of chord) this._musicNote('sine', NOTE(n), t, beat * 7.5, 0.05);
      }
      if (m.step % 2 === 0) {
        const n = chord[(m.step / 2) % 3] + 12;
        this._musicNote('triangle', NOTE(n), t, beat * 0.9, 0.035);
      }
      m.step++;
      m.nextTime += beat;
    }
  }

  _musicNote(type, freq, t, dur, vol) {
    const c = this.ctx;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.4, dur * 0.2));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.musicBus);
    o.start(t);
    o.stop(t + dur + 0.05);
    const set = this.music.nodes;
    set.add(o);
    o.onended = () => {
      set.delete(o);
      o.disconnect();
      g.disconnect();
    };
  }

  dispose() {
    this.stopRace();
    this.stopMusic();
    window.removeEventListener('pointerdown', this._unlock, true);
    window.removeEventListener('keydown', this._unlock, true);
    if (this.ctx) this.ctx.close().catch(() => {});
  }
}
