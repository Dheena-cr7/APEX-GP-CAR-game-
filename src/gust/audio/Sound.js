// Procedural audio (Web Audio, no files): per-sailor gust voices, river
// ambience that follows the current, one-shot effects and a small adaptive
// music engine per theme. The context starts on the first user gesture.

const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
};
// chord roots as scale degrees
const PROGS = {
  major: [0, 4, 5, 3],
  minor: [0, 5, 2, 6],
  dorian: [0, 3, 0, 6],
  lydian: [0, 1, 4, 0],
};

export class Sound {
  constructor() {
    this.ctx = null;
    this.vol = { master: 0.8, music: 0.5, sfx: 0.85 };
    this.muted = false;
    this.gusts = new Map();
    this.music = null;
    this.shellStreak = 0;
    this.lastShell = 0;
  }

  get ready() {
    return !!this.ctx && this.ctx.state === 'running';
  }

  /** Create / resume the context; call from a user gesture. */
  unlock() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC({ latencyHint: 'interactive' });
      this._graph();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  _graph() {
    const ctx = this.ctx;
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -14;
    this.comp.knee.value = 10;
    this.comp.ratio.value = 4;
    this.comp.attack.value = 0.004;
    this.comp.release.value = 0.2;
    this.master = ctx.createGain();
    this.master.connect(this.comp);
    this.comp.connect(ctx.destination);
    this.sfx = ctx.createGain();
    this.sfx.connect(this.master);
    this.musicBus = ctx.createGain();
    this.musicBus.connect(this.master);
    // shared noise buffers
    const len = ctx.sampleRate * 2;
    this.white = ctx.createBuffer(1, len, ctx.sampleRate);
    const w = this.white.getChannelData(0);
    for (let i = 0; i < len; i++) w[i] = Math.random() * 2 - 1;
    this.brown = ctx.createBuffer(1, len, ctx.sampleRate);
    const b = this.brown.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      b[i] = last * 3.5;
    }
    this._applyVolumes();
    this._ambience();
  }

  setVolumes(v) {
    Object.assign(this.vol, v);
    this._applyVolumes();
  }

  setMuted(m) {
    this.muted = m;
    this._applyVolumes();
  }

  _applyVolumes() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.vol.master, t, 0.05);
    this.sfx.gain.setTargetAtTime(this.vol.sfx, t, 0.05);
    this.musicBus.gain.setTargetAtTime(this.vol.music * 0.55, t, 0.05);
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }

  _noise(buf = this.white, loop = true) {
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    s.loop = loop;
    if (loop) s.loopStart = Math.random();
    return s;
  }

  // ------------------------------------------------------------ ambience

  _ambience() {
    const ctx = this.ctx;
    const mk = (buf, type, freq, q) => {
      const src = this._noise(buf);
      const f = ctx.createBiquadFilter();
      f.type = type;
      f.frequency.value = freq;
      f.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = 0;
      src.connect(f).connect(g).connect(this.sfx);
      src.start(ctx.currentTime + Math.random() * 0.1, Math.random());
      return { g, f };
    };
    this.amb = {
      calm: mk(this.brown, 'lowpass', 520, 0.5),
      rapid: mk(this.white, 'bandpass', 1400, 0.6),
      roar: mk(this.brown, 'lowpass', 260, 0.7),
      wind: mk(this.white, 'bandpass', 500, 0.4),
    };
    // a slow LFO on the calm water for movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.13;
    const lg = ctx.createGain();
    lg.gain.value = 140;
    lfo.connect(lg).connect(this.amb.calm.f.frequency);
    lfo.start();
  }

  /** River bed: 0..1 calm, rapids and falls proximity, wind. */
  setWater(calm, rapid, roar, wind = 0.15) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.amb.calm.g.gain.setTargetAtTime(0.16 * calm, t, 0.3);
    this.amb.rapid.g.gain.setTargetAtTime(0.11 * rapid, t, 0.25);
    this.amb.roar.g.gain.setTargetAtTime(0.5 * roar, t, 0.3);
    this.amb.wind.g.gain.setTargetAtTime(0.035 * wind, t, 0.5);
  }

  // ------------------------------------------------------------ gust voices

  _gustVoice(slot) {
    const ctx = this.ctx;
    const src = this._noise();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.8;
    bp.frequency.value = 650 + slot * 90;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 2400;
    const ng = ctx.createGain();
    ng.gain.value = 0;
    // a soft brassy drone under the hiss (the horn)
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = [98, 110, 123, 131][slot % 4];
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.5 + slot * 0.4;
    const vg = ctx.createGain();
    vg.gain.value = 3;
    vib.connect(vg).connect(osc.frequency);
    const olp = ctx.createBiquadFilter();
    olp.type = 'lowpass';
    olp.frequency.value = 520;
    olp.Q.value = 3;
    const og = ctx.createGain();
    og.gain.value = 0;
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    const out = ctx.createGain();
    src.connect(bp).connect(lp).connect(ng).connect(out);
    osc.connect(olp).connect(og).connect(out);
    if (pan) out.connect(pan).connect(this.sfx);
    else out.connect(this.sfx);
    const t = ctx.currentTime;
    src.start(t, Math.random());
    osc.start(t);
    vib.start(t);
    const v = { src, osc, vib, ng, og, bp, olp, pan, out, amt: 0 };
    this.gusts.set(slot, v);
    return v;
  }

  /** amount 0..1, pan -1..1, distance gain 0..1 */
  setGust(slot, amount, pan = 0, near = 1) {
    if (!this.ctx) return;
    let v = this.gusts.get(slot);
    if (!v) {
      if (amount < 0.02) return;
      v = this._gustVoice(slot);
    }
    const t = this.ctx.currentTime;
    const a = Math.max(0, Math.min(1, amount)) * near;
    v.ng.gain.setTargetAtTime(a * 0.22, t, amount > v.amt ? 0.03 : 0.08);
    v.og.gain.setTargetAtTime(a * 0.07, t, 0.05);
    v.bp.frequency.setTargetAtTime(600 + slot * 80 + a * 500, t, 0.08);
    v.olp.frequency.setTargetAtTime(380 + a * 420, t, 0.08);
    if (v.pan) v.pan.pan.setTargetAtTime(Math.max(-0.9, Math.min(0.9, pan)), t, 0.05);
    v.amt = amount;
  }

  stopGusts() {
    for (const [, v] of this.gusts) {
      try {
        v.src.stop();
        v.osc.stop();
        v.vib.stop();
      } catch {
        /* already stopped */
      }
      v.out.disconnect();
    }
    this.gusts.clear();
  }

  // ------------------------------------------------------------ one-shots

  _env(g, t, a, peak, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }

  _tone(type, f0, f1, dur, peak, t = this.ctx.currentTime, dest = this.sfx, attack = 0.005) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    this._env(g, t, attack, peak, dur);
    o.connect(g).connect(dest);
    o.start(t);
    o.stop(t + attack + dur + 0.05);
    return o;
  }

  _burst(type, f0, f1, dur, peak, q = 1, t = this.ctx.currentTime, buf = this.white, dest = this.sfx) {
    const ctx = this.ctx;
    const s = this._noise(buf, false);
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t + dur);
    const g = ctx.createGain();
    this._env(g, t, 0.006, peak, dur);
    s.connect(f).connect(g).connect(dest);
    s.start(t, Math.random() * 1.5);
    s.stop(t + dur + 0.1);
  }

  play(name, o = {}) {
    if (!this.ready) return;
    const t = this.ctx.currentTime;
    const p = o.power ?? 1;
    switch (name) {
      case 'puff':
        this._burst('lowpass', 2600, 260, 0.42, 0.55, 0.9);
        this._tone('sine', 120, 42, 0.28, 0.5);
        this._tone('square', 240, 110, 0.12, 0.05);
        break;
      case 'impact': {
        const g = Math.min(1, 0.25 + p * 0.12);
        this._tone('sine', 150, 55, 0.22, 0.6 * g);
        this._burst('bandpass', 520, 180, 0.16, 0.6 * g, 1.2);
        if (o.kind === 'rock' || o.kind === 'bank') this._burst('bandpass', 2200, 900, 0.06, 0.25 * g, 2);
        if (o.kind === 'log' || o.kind === 'spinner') this._tone('triangle', 260, 180, 0.12, 0.2 * g);
        break;
      }
      case 'splash': {
        const g = Math.min(1, 0.4 + p * 0.15);
        this._burst('bandpass', 3200, 700, 0.55, 0.5 * g, 0.7);
        this._burst('lowpass', 900, 200, 0.4, 0.35 * g, 0.7, t, this.brown);
        for (let i = 0; i < 4; i++) this._tone('sine', 500 + Math.random() * 700, 900 + Math.random() * 600, 0.05, 0.05, t + 0.05 + i * 0.05);
        break;
      }
      case 'land':
        this.play('splash', { power: p * 0.6 });
        this._tone('sine', 90, 40, 0.35, 0.5);
        break;
      case 'shell': {
        const now = performance.now();
        this.shellStreak = now - this.lastShell < 1400 ? Math.min(7, this.shellStreak + 1) : 0;
        this.lastShell = now;
        const scale = [0, 2, 4, 7, 9, 12, 14, 16];
        const n = 84 + scale[this.shellStreak];
        this._tone('sine', midi(n), midi(n), 0.35, 0.22);
        this._tone('sine', midi(n + 12), midi(n + 12), 0.2, 0.06);
        this._tone('triangle', midi(n + 7), midi(n + 7), 0.25, 0.08, t + 0.06);
        break;
      }
      case 'checkpoint':
        [72, 76, 79, 84].forEach((n, i) => this._tone('triangle', midi(n), midi(n), 0.5, 0.16, t + i * 0.07));
        break;
      case 'count':
        this._tone('square', 660, 660, 0.14, 0.12);
        this._tone('sine', 660, 660, 0.2, 0.15);
        break;
      case 'go':
        this._tone('square', 990, 990, 0.35, 0.12);
        this._tone('sine', 1320, 1320, 0.45, 0.14);
        this._tone('sawtooth', 165, 165, 0.6, 0.06);
        break;
      case 'finish':
        [67, 72, 76, 79].forEach((n, i) => {
          this._tone('triangle', midi(n), midi(n), 0.28, 0.18, t + i * 0.13);
          this._tone('square', midi(n), midi(n), 0.2, 0.035, t + i * 0.13);
        });
        [72, 76, 79, 84].forEach((n) => this._tone('triangle', midi(n), midi(n), 1.3, 0.11, t + 0.6, this.sfx, 0.02));
        break;
      case 'medal':
        [84, 88, 91, 96, 100].forEach((n, i) => this._tone('sine', midi(n), midi(n), 0.4, 0.1, t + i * 0.06));
        break;
      case 'knock': {
        // a little "whoa-oa!" with a wobbling formant
        const base = 520 + (o.slot || 0) * 60;
        const ctx = this.ctx;
        const os = ctx.createOscillator();
        os.type = 'triangle';
        os.frequency.setValueAtTime(base, t);
        os.frequency.linearRampToValueAtTime(base * 1.7, t + 0.12);
        os.frequency.linearRampToValueAtTime(base * 0.8, t + 0.45);
        const vib = ctx.createOscillator();
        vib.frequency.value = 14;
        const vg = ctx.createGain();
        vg.gain.value = 30;
        vib.connect(vg).connect(os.frequency);
        const f = ctx.createBiquadFilter();
        f.type = 'bandpass';
        f.frequency.value = 1100;
        f.Q.value = 1.4;
        const g = ctx.createGain();
        this._env(g, t, 0.02, 0.22, 0.45);
        os.connect(f).connect(g).connect(this.sfx);
        os.start(t);
        vib.start(t);
        os.stop(t + 0.55);
        vib.stop(t + 0.55);
        break;
      }
      case 'climb':
        this._tone('triangle', 420, 760, 0.12, 0.12);
        break;
      case 'empty':
        this._burst('lowpass', 900, 90, 0.4, 0.3, 1);
        this._tone('sine', 220, 80, 0.35, 0.12);
        break;
      case 'respawn':
        this._burst('bandpass', 300, 2400, 0.5, 0.3, 0.8);
        this._tone('sine', 300, 900, 0.4, 0.1);
        break;
      case 'click':
        this._tone('triangle', 880, 660, 0.06, 0.12);
        break;
      case 'hover':
        this._tone('sine', 1200, 1200, 0.04, 0.035);
        break;
      case 'join':
        [76, 83].forEach((n, i) => this._tone('triangle', midi(n), midi(n), 0.18, 0.13, t + i * 0.08));
        break;
      case 'leave':
        [79, 72].forEach((n, i) => this._tone('triangle', midi(n), midi(n), 0.18, 0.1, t + i * 0.08));
        break;
      default:
        break;
    }
  }

  // ------------------------------------------------------------ music

  startMusic(spec, intensity = 1) {
    if (!this.ctx) return;
    if (this.music && this.music.spec === spec) {
      this.music.intensity = intensity;
      return;
    }
    this.stopMusic();
    const m = {
      spec,
      intensity,
      step: 0,
      next: this.ctx.currentTime + 0.12,
      timer: 0,
      seed: spec.root * 7 + spec.bpm,
      motif: null,
      out: this.ctx.createGain(),
    };
    m.out.gain.value = 0;
    m.out.gain.setTargetAtTime(1, this.ctx.currentTime, 0.8);
    m.out.connect(this.musicBus);
    // a seeded motif for the lead
    let s = m.seed;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    m.motif = Array.from({ length: 16 }, () => (rnd() < 0.55 ? Math.floor(rnd() * 5) : -1));
    m.timer = setInterval(() => this._schedule(m), 25);
    this.music = m;
  }

  setMusicIntensity(v) {
    if (this.music) this.music.intensity = v;
  }

  stopMusic() {
    const m = this.music;
    if (!m) return;
    clearInterval(m.timer);
    if (this.ctx) {
      const t = this.ctx.currentTime;
      m.out.gain.setTargetAtTime(0, t, 0.3);
      setTimeout(() => m.out.disconnect(), 1500);
    }
    this.music = null;
  }

  _schedule(m) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') {
      m.next = ctx ? ctx.currentTime + 0.1 : 0;
      return;
    }
    const spb = 60 / m.spec.bpm / 2; // eighth notes
    while (m.next < ctx.currentTime + 0.12) {
      this._note(m, m.step, m.next, spb);
      m.step++;
      m.next += spb;
    }
  }

  _note(m, step, t, spb) {
    const { root, mode } = m.spec;
    const scale = SCALES[mode] || SCALES.major;
    const prog = PROGS[mode] || PROGS.major;
    const bar = Math.floor(step / 8) % 4;
    const e = step % 8;
    const deg = prog[bar];
    const chord = [0, 2, 4].map((k) => {
      const d = deg + k;
      return root + scale[d % 7] + 12 * Math.floor(d / 7);
    });
    const out = m.out;
    const I = m.intensity;
    // pluck arpeggio
    const arp = [0, 1, 2, 1, 2, 1, 0, 2][e];
    const pn = chord[arp] + 12;
    this._pluck(midi(pn), t, 0.11 * (0.7 + 0.3 * I), out);
    // bass on the beat
    if (e === 0 || e === 3 || e === 4 || (e === 6 && I > 0.6)) {
      this._tone('triangle', midi(chord[0] - 12), midi(chord[0] - 12), spb * 1.6, 0.17, t, out, 0.01);
    }
    // soft pad at the start of each bar
    if (e === 0) {
      for (const n of chord) this._pad(midi(n), t, spb * 8, out);
    }
    if (I > 0.5) {
      // percussion
      if (e % 2 === 1) this._burst('highpass', 7000, 6000, 0.04, 0.05 * I, 0.7, t, this.white, out);
      if (e === 0 || e === 4) this._tone('sine', 110, 45, 0.18, 0.28 * I, t, out);
      if (e === 2 || e === 6) this._burst('bandpass', 1600, 1100, 0.09, 0.07 * I, 1, t, this.white, out);
    }
    // lead motif on the second half of every 8 bars
    const phrase = Math.floor(step / 32) % 2;
    if (phrase === 1 && I > 0.3) {
      const k = m.motif[step % 16];
      if (k >= 0 && e % 2 === 0) {
        const d = deg + k;
        const n = root + 24 + scale[d % 7] + 12 * Math.floor(d / 7);
        this._lead(midi(n), t, spb * 1.8, out);
      }
    }
  }

  _pluck(f, t, peak, out) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = f;
    const o2 = ctx.createOscillator();
    o2.type = 'sine';
    o2.frequency.value = f * 2;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    const g2 = ctx.createGain();
    g2.gain.value = 0.25;
    o.connect(g);
    o2.connect(g2).connect(g);
    g.connect(out);
    o.start(t);
    o2.start(t);
    o.stop(t + 0.4);
    o2.stop(t + 0.4);
  }

  _pad(f, t, dur, out) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.022, t + 0.4);
    g.gain.setValueAtTime(0.022, t + dur - 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1100;
    for (const det of [-7, 7]) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.detune.value = det;
      o.connect(lp);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
    lp.connect(g).connect(out);
  }

  _lead(f, t, dur, out) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const v = ctx.createOscillator();
    v.frequency.value = 5;
    const vg = ctx.createGain();
    vg.gain.value = f * 0.006;
    v.connect(vg).connect(o.frequency);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.07, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    v.start(t);
    o.stop(t + dur + 0.05);
    v.stop(t + dur + 0.05);
  }
}
