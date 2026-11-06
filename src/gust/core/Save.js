// Saved progress and settings in localStorage. Every field is validated on
// load; blocked or corrupt storage falls back to defaults in memory.

const KEY = 'gustcrew.v1';

const DEFAULTS = () => ({
  v: 1,
  name: '',
  hat: 0,
  best: {}, // courseId -> { time, shells, medal }
  settings: {
    master: 0.8,
    music: 0.5,
    sfx: 0.85,
    quality: 'auto',
    shake: true,
    helpers: true,
    silly: true,
    bots: 1,
  },
});

const num = (v, lo, hi, d) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d);

export class Save {
  constructor() {
    this.ok = true;
    this.data = DEFAULTS();
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) this._merge(JSON.parse(raw));
    } catch {
      this.ok = false;
    }
  }

  _merge(d) {
    if (!d || typeof d !== 'object') return;
    const D = this.data;
    if (typeof d.name === 'string') D.name = d.name.slice(0, 14);
    D.hat = num(d.hat, 0, 3, 0) | 0;
    if (d.best && typeof d.best === 'object') {
      for (const [k, b] of Object.entries(d.best)) {
        if (!b || typeof b !== 'object' || !/^[a-z]{2,16}$/.test(k)) continue;
        const time = num(b.time, 1, 36000, 0);
        if (!time) continue;
        D.best[k] = {
          time,
          shells: num(b.shells, 0, 999, 0) | 0,
          medal: ['gold', 'silver', 'bronze', 'none'].includes(b.medal) ? b.medal : 'none',
          maxShells: num(b.maxShells, 0, 999, 0) | 0,
        };
      }
    }
    const s = d.settings || {};
    D.settings.master = num(s.master, 0, 1, D.settings.master);
    D.settings.music = num(s.music, 0, 1, D.settings.music);
    D.settings.sfx = num(s.sfx, 0, 1, D.settings.sfx);
    D.settings.quality = ['auto', 'low', 'medium', 'high'].includes(s.quality) ? s.quality : 'auto';
    D.settings.shake = s.shake !== false;
    D.settings.helpers = s.helpers !== false;
    D.settings.silly = s.silly !== false;
    D.settings.bots = num(s.bots, 0, 3, 1) | 0;
  }

  write() {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(this.data));
      this.ok = true;
    } catch {
      this.ok = false;
    }
  }

  get settings() {
    return this.data.settings;
  }

  best(id) {
    return this.data.best[id] || null;
  }

  /** Record a finish; returns { newBest, medal }. */
  record(id, time, shells, medal, maxShells) {
    const prev = this.data.best[id];
    const rank = { gold: 3, silver: 2, bronze: 1, none: 0 };
    const newBest = !prev || time < prev.time;
    const next = {
      time: newBest ? time : prev.time,
      shells: Math.max(shells, prev ? prev.shells : 0),
      medal: !prev || rank[medal] > rank[prev.medal] ? medal : prev.medal,
      maxShells,
    };
    this.data.best[id] = next;
    this.write();
    return { newBest, medal: next.medal };
  }
}
