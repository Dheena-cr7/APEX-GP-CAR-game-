// LocalStorage wrapper with schema versioning and validation. Every access is
// wrapped in try/catch; when storage is blocked the game keeps an in-memory
// copy and stays fully playable.

const KEY = 'apexgp.save';
export const SCHEMA_VERSION = 2;

export function defaultSave() {
  return {
    version: SCHEMA_VERSION,
    carId: 'falcon',
    livery: { falcon: 'ember' },
    settings: {
      quality: 'high',
      adaptiveQuality: true,
      master: 0.8,
      sfx: 0.9,
      music: 0.5,
      muted: false,
      camera: 'chase',
      units: 'kmh',
      assists: 'medium', // 'easy' | 'medium' | 'hard' drift stabilisation
      showMinimap: true,
      freePlay: false,
      bindings: null,
    },
    stars: {}, // levelId -> 0..3
    cups: {}, // circuitId -> true when all GP stars collected
    bestLaps: {}, // `${trackId}:${mode}` -> seconds
    bestDrift: {}, // `${trackId}:${mode}` -> points
    bestSplits: {}, // `${trackId}:${mode}` -> checkpoint times of the best lap
    records: { races: 0, wins: 0, distance: 0, longestDrift: 0 },
    unlockedCars: ['falcon', 'viper', 'comet'],
    unlockedLiveries: ['ember', 'glacier', 'volt', 'graphite'],
    seenIntro: false,
  };
}

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const num = (v, lo, hi, d) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
const oneOf = (v, list, d) => (list.includes(v) ? v : d);
const bool = (v, d) => (typeof v === 'boolean' ? v : d);

function numberMap(src, lo, hi) {
  const out = {};
  if (!isObj(src)) return out;
  for (const k of Object.keys(src)) {
    if (typeof k !== 'string' || k.length > 64) continue;
    const v = src[k];
    if (typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi) out[k] = v;
  }
  return out;
}

function splitMap(src) {
  const out = {};
  if (!isObj(src)) return out;
  for (const k of Object.keys(src)) {
    const v = src[k];
    if (Array.isArray(v) && v.length <= 64 && v.every((x) => typeof x === 'number' && Number.isFinite(x) && x >= 0 && x < 36000)) out[k] = v.slice();
  }
  return out;
}

function stringList(src, fallback) {
  if (!Array.isArray(src)) return fallback.slice();
  const out = src.filter((s) => typeof s === 'string' && s.length < 32);
  for (const f of fallback) if (!out.includes(f)) out.push(f);
  return out;
}

/** Validate / migrate a parsed save. Unknown or corrupt fields fall back to defaults. */
export function validateSave(raw) {
  const d = defaultSave();
  if (!isObj(raw)) return d;
  const s = isObj(raw.settings) ? raw.settings : {};
  const out = {
    version: SCHEMA_VERSION,
    carId: typeof raw.carId === 'string' ? raw.carId : d.carId,
    livery: {},
    settings: {
      quality: oneOf(s.quality, ['low', 'medium', 'high'], d.settings.quality),
      adaptiveQuality: bool(s.adaptiveQuality, d.settings.adaptiveQuality),
      master: num(s.master, 0, 1, d.settings.master),
      sfx: num(s.sfx, 0, 1, d.settings.sfx),
      music: num(s.music, 0, 1, d.settings.music),
      muted: bool(s.muted, d.settings.muted),
      camera: oneOf(s.camera, ['chase', 'close', 'cockpit', 'tv'], d.settings.camera),
      units: oneOf(s.units, ['kmh', 'mph'], d.settings.units),
      assists: oneOf(s.assists, ['easy', 'medium', 'hard'], d.settings.assists),
      showMinimap: bool(s.showMinimap, d.settings.showMinimap),
      freePlay: bool(s.freePlay, d.settings.freePlay),
      bindings: isObj(s.bindings) ? sanitizeBindings(s.bindings) : null,
    },
    stars: numberMap(raw.stars, 0, 3),
    cups: {},
    bestLaps: numberMap(raw.bestLaps, 1, 36000),
    bestDrift: numberMap(raw.bestDrift, 0, 1e9),
    bestSplits: splitMap(raw.bestSplits),
    records: {
      races: num(raw.records && raw.records.races, 0, 1e9, 0),
      wins: num(raw.records && raw.records.wins, 0, 1e9, 0),
      distance: num(raw.records && raw.records.distance, 0, 1e12, 0),
      longestDrift: num(raw.records && raw.records.longestDrift, 0, 1e9, 0),
    },
    unlockedCars: stringList(raw.unlockedCars, d.unlockedCars),
    unlockedLiveries: stringList(raw.unlockedLiveries, d.unlockedLiveries),
    seenIntro: bool(raw.seenIntro, false),
  };
  for (const k of Object.keys(out.stars)) out.stars[k] = Math.round(out.stars[k]);
  if (isObj(raw.cups)) for (const k of Object.keys(raw.cups)) if (raw.cups[k] === true) out.cups[k] = true;
  if (isObj(raw.livery)) for (const k of Object.keys(raw.livery)) if (typeof raw.livery[k] === 'string') out.livery[k] = raw.livery[k];
  return out;
}

function sanitizeBindings(b) {
  const out = {};
  for (const k of Object.keys(b)) {
    if (Array.isArray(b[k])) out[k] = b[k].filter((c) => typeof c === 'string' && c.length < 24).slice(0, 3);
  }
  return out;
}

export class SaveManager {
  constructor(storage) {
    this.storage = storage === undefined ? SaveManager.probeStorage() : storage;
    this.available = !!this.storage;
    this.data = defaultSave();
    this.loadError = null;
    this.listeners = new Set();
  }

  static probeStorage() {
    try {
      const ls = window.localStorage;
      const k = '__apexgp_probe__';
      ls.setItem(k, '1');
      ls.removeItem(k);
      return ls;
    } catch {
      return null;
    }
  }

  load() {
    if (!this.storage) {
      this.data = defaultSave();
      return this.data;
    }
    let raw = null;
    try {
      raw = this.storage.getItem(KEY);
    } catch {
      this.loadError = 'read-failed';
      this.available = false;
      this.data = defaultSave();
      return this.data;
    }
    if (raw === null) {
      this.data = defaultSave();
      return this.data;
    }
    try {
      this.data = validateSave(JSON.parse(raw));
    } catch {
      this.loadError = 'corrupt';
      this.data = defaultSave();
      this.save();
    }
    return this.data;
  }

  save() {
    if (!this.storage) return false;
    try {
      this.storage.setItem(KEY, JSON.stringify(this.data));
      return true;
    } catch {
      this.available = false;
      return false;
    }
  }

  update(fn) {
    fn(this.data);
    this.save();
    for (const l of this.listeners) l(this.data);
  }

  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  reset() {
    const keepSettings = this.data.settings;
    this.data = defaultSave();
    this.data.settings = keepSettings;
    this.save();
    for (const l of this.listeners) l(this.data);
  }
}
