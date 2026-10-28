// Campaign: 5 circuits × 3 variants = 15 levels, star scoring, unlocks and
// writing results into the save.

import { CIRCUITS, CIRCUIT_ORDER } from '../tracks/TrackData.js';
import { TrackModel } from '../tracks/TrackModel.js';
import { RacingLine } from '../tracks/RacingLine.js';
import { CARS } from '../cars/CarData.js';
import { LIVERIES } from '../core/Palette.js';
import { starsFor } from './Scoring.js';

export const VARIANTS = Object.freeze(['grandprix', 'timeattack', 'drift']);
export const VARIANT_LABELS = Object.freeze({ grandprix: 'Grand Prix', timeattack: 'Time Attack', drift: 'Drift Challenge' });

// stars needed to open each circuit (in CIRCUIT_ORDER)
export const CIRCUIT_UNLOCK = Object.freeze({ beginner: 0, street: 5, speed: 11, technical: 17, night: 23 });
// stars needed for liveries beyond the starter set
export const LIVERY_UNLOCK = Object.freeze({ sunset: 3, cobalt: 9, jade: 15, magenta: 22 });

const GP_SETUP = Object.freeze({
  beginner: { laps: 3, opponents: 5, difficulty: 'easy' },
  street: { laps: 3, opponents: 6, difficulty: 'medium' },
  speed: { laps: 3, opponents: 7, difficulty: 'medium' },
  technical: { laps: 2, opponents: 7, difficulty: 'hard' },
  night: { laps: 3, opponents: 7, difficulty: 'hard' },
});

const idealCache = new Map();

/** Ideal lap (s) from the racing line speed profile — basis for targets. */
export function idealLap(circuitId) {
  if (idealCache.has(circuitId)) return idealCache.get(circuitId);
  const model = new TrackModel(CIRCUITS[circuitId]);
  const line = new RacingLine(model, { aLat: 15.5, vMax: 82 });
  let t = 0;
  for (let i = 0; i < model.n; i++) t += model.ds / Math.max(5, line.speed[i]);
  const out = { lap: t, length: model.length };
  idealCache.set(circuitId, out);
  return out;
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

function buildLevels() {
  const levels = [];
  CIRCUIT_ORDER.forEach((cid, ci) => {
    const c = CIRCUITS[cid];
    VARIANTS.forEach((variant, vi) => {
      const lvl = {
        id: `${cid}-${variant}`,
        index: ci * 3 + vi,
        circuitId: cid,
        variant,
        name: `${c.venue}`,
        title: `${c.name} · ${VARIANT_LABELS[variant]}`,
        difficulty: c.difficulty,
        unlockStars: CIRCUIT_UNLOCK[cid],
      };
      if (variant === 'grandprix') {
        const g = GP_SETUP[cid];
        Object.assign(lvl, { mode: 'grandprix', laps: g.laps, opponents: g.opponents, aiDifficulty: g.difficulty, target: { type: 'position' } });
      } else if (variant === 'timeattack') {
        lvl.mode = 'timeattack';
        lvl.laps = cid === 'technical' ? 2 : 3;
        lvl.opponents = 0;
        lvl.lazyTarget = true;
      } else {
        lvl.mode = 'drift';
        lvl.laps = 2;
        lvl.opponents = 0;
        lvl.lazyTarget = true;
      }
      levels.push(lvl);
    });
  });
  return levels;
}

export const LEVELS = buildLevels();

/** Resolve star thresholds (computed lazily from the track). */
export function levelTarget(level) {
  if (!level.lazyTarget) return level.target;
  if (level.target) return level.target;
  const ideal = idealLap(level.circuitId);
  if (level.variant === 'timeattack') {
    const gold = round1(ideal.lap * 1.07);
    const silver = round1(ideal.lap * 1.15);
    const bronze = round1(ideal.lap * 1.27);
    // whole-run time limit: every lap at bronze pace plus a standing start
    const timeLimit = Math.round(bronze * level.laps * 1.12 + 8);
    level.target = { type: 'lap', gold, silver, bronze, timeLimit };
  } else {
    // drift points scale with lap length
    const L = ideal.length;
    level.target = { type: 'drift', bronze: Math.round((L * 1.1) / 50) * 50, silver: Math.round((L * 2.4) / 50) * 50, gold: Math.round((L * 4.2) / 50) * 50 };
  }
  return level.target;
}

export function getLevel(id) {
  return LEVELS.find((l) => l.id === id) || null;
}

export function totalStars(save) {
  let n = 0;
  for (const k of Object.keys(save.stars)) n += save.stars[k] || 0;
  return n;
}

export function circuitStars(save, cid) {
  let n = 0;
  for (const v of VARIANTS) n += save.stars[`${cid}-${v}`] || 0;
  return n;
}

export function isCircuitUnlocked(save, cid) {
  if (save.settings.freePlay) return true;
  return totalStars(save) >= CIRCUIT_UNLOCK[cid];
}

export function isLevelUnlocked(save, level) {
  return isCircuitUnlocked(save, level.circuitId);
}

export function isCarUnlocked(save, car) {
  if (save.settings.freePlay || !car.unlock) return true;
  return save.unlockedCars.includes(car.id) || totalStars(save) >= car.unlock.stars;
}

export function isLiveryUnlocked(save, liveryId, car) {
  if (save.settings.freePlay) return true;
  if (car && car.defaultLivery === liveryId) return true;
  if (save.unlockedLiveries.includes(liveryId)) return true;
  const need = LIVERY_UNLOCK[liveryId];
  return need !== undefined && totalStars(save) >= need;
}

/** Race config for a campaign level. */
export function levelRaceConfig(level, save) {
  return {
    circuitId: level.circuitId,
    mode: level.mode,
    laps: level.laps,
    opponents: level.opponents,
    difficulty: level.aiDifficulty || 'medium',
    target: levelTarget(level),
    levelId: level.id,
    levelIndex: level.index,
    carId: save.carId,
  };
}

/**
 * Write a finished race into the save (records, stars, unlocks) and return
 * the results enriched with {stars, previousStars, newUnlocks, records}.
 */
export function applyResults(saveMgr, results, config) {
  const out = { ...results, stars: 0, previousStars: 0, newUnlocks: [], records: {} };
  if (!config) return out;
  const save = saveMgr.data;
  const before = totalStars(save);
  const key = `${config.circuitId}:${config.mode}`;
  saveMgr.update((d) => {
    d.records.races += 1;
    if (results.mode === 'grandprix' && results.position === 1 && !results.ended) d.records.wins += 1;
    if (results.longestDrift > d.records.longestDrift) d.records.longestDrift = Math.round(results.longestDrift * 10) / 10;
    if (results.bestLap > 0 && (!d.bestLaps[key] || results.bestLap < d.bestLaps[key])) {
      d.bestLaps[key] = Math.round(results.bestLap * 1000) / 1000;
      if (results.bestSplits) d.bestSplits[key] = results.bestSplits.map((x) => Math.round(x * 1000) / 1000);
      out.records.bestLap = true;
    }
    if (results.ghost && config.mode === 'timetrial') {
      const old = d.ghosts[config.circuitId];
      if (!old || results.ghost.time < old.time) d.ghosts[config.circuitId] = results.ghost;
    }
    if (results.driftScore > 0 && (!d.bestDrift[key] || results.driftScore > d.bestDrift[key])) {
      d.bestDrift[key] = results.driftScore;
      out.records.drift = true;
    }
    if (config.levelId) {
      const level = getLevel(config.levelId);
      const stars = level && !results.ended ? starsFor(level, levelTarget(level), results) : 0;
      out.stars = stars;
      out.previousStars = d.stars[config.levelId] || 0;
      if (stars > out.previousStars) d.stars[config.levelId] = stars;
      for (const cid of CIRCUIT_ORDER) if (circuitStars(d, cid) >= 6) d.cups[cid] = true;
    }
    const after = totalStars(d);
    for (const car of CARS) {
      if (car.unlock && !d.unlockedCars.includes(car.id) && after >= car.unlock.stars) {
        d.unlockedCars.push(car.id);
        out.newUnlocks.push({ type: 'car', name: car.name });
      }
    }
    for (const l of LIVERIES) {
      const need = LIVERY_UNLOCK[l.id];
      if (need !== undefined && !d.unlockedLiveries.includes(l.id) && after >= need) {
        d.unlockedLiveries.push(l.id);
        out.newUnlocks.push({ type: 'livery', name: l.name });
      }
    }
    for (const cid of CIRCUIT_ORDER) {
      const need = CIRCUIT_UNLOCK[cid];
      if (need > 0 && before < need && after >= need) out.newUnlocks.push({ type: 'circuit', name: CIRCUITS[cid].name });
    }
  });
  out.totalStars = totalStars(save);
  return out;
}
