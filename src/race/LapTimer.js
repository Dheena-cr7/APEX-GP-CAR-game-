// Lap / sector timing for one racer, with a running delta against the
// personal-best lap measured at every checkpoint.

export class LapTimer {
  constructor(cpCount, sectorCount = 3) {
    this.cpCount = cpCount;
    this.sectorCount = sectorCount;
    this.bestCp = null; // checkpoint times of the best lap (from the session / save)
    this.reset();
  }

  reset() {
    this.raceTime = 0; // since GO
    this.lapStart = -1;
    this.lapTime = 0;
    this.lastLap = 0;
    this.bestLap = 0;
    this.lapTimes = [];
    this.sectorStart = 0;
    this.sectors = Array.from({ length: this.sectorCount }, () => 0); // current lap
    this.lastSectors = Array.from({ length: this.sectorCount }, () => 0);
    this.bestSectors = Array.from({ length: this.sectorCount }, () => 0);
    this.sectorState = Array.from({ length: this.sectorCount }, () => null); // 'best' | 'pb' | 'slow' per sector of the current lap
    this.cpTimes = Array.from({ length: this.cpCount }, () => 0);
    this.delta = null;
    this.bestCp = null;
    this.penalty = 0;
    this.running = false;
  }

  /**
   * Seed the personal-best reference from the save so the delta works from
   * lap 1. `splits` are the PB lap's checkpoint times (same checkpoint count).
   */
  setReference(bestLap, splits) {
    if (!(bestLap > 0)) return;
    this.refLap = bestLap;
    this.refCp = Array.isArray(splits) && splits.length === this.cpCount ? splits.slice() : null;
  }

  start(time) {
    this.running = true;
    this.lapStart = time;
    this.sectorStart = time;
    this.raceTime = time;
  }

  tick(time) {
    this.raceTime = time;
    if (this.lapStart >= 0) this.lapTime = time - this.lapStart;
  }

  /** Called when the racer crosses checkpoint `idx` (0 = finish line). */
  checkpoint(idx, time) {
    if (this.lapStart < 0) return;
    const t = time - this.lapStart;
    this.cpTimes[idx] = t;
    const ref = this.refCp || this.bestCp;
    if (ref && idx > 0 && ref[idx] > 0) this.delta = t - ref[idx];
  }

  sector(index, time) {
    if (this.lapStart < 0) return null;
    const t = time - this.sectorStart;
    this.sectorStart = time;
    this.sectors[index] = t;
    const best = this.bestSectors[index];
    let state = 'slow';
    if (!best || t < best) {
      state = 'best';
      this.bestSectors[index] = t;
    }
    this.sectorState[index] = state;
    return { index, time: t, state };
  }

  /** Completes a lap at `time`. Returns {time, best:boolean, lap}. */
  lap(time) {
    const t = time - this.lapStart;
    // final sector closes at the line
    this.sector(this.sectorCount - 1, time);
    this.lastLap = t;
    this.lapTimes.push(t);
    const isBest = !this.bestLap || t < this.bestLap;
    const refLap = this.refLap || 0;
    this.delta = refLap ? t - refLap : this.bestLap && !isBest ? t - this.bestLap : null;
    if (isBest) {
      this.bestLap = t;
      this.bestCp = this.cpTimes.slice();
    }
    if (!refLap || t < refLap) {
      this.refLap = t;
      this.refCp = this.cpTimes.slice();
      this.refCp[0] = t;
    }
    this.lastSectors = this.sectors.slice();
    this.sectors.fill(0);
    this.sectorState.fill(null);
    this.cpTimes.fill(0);
    this.lapStart = time;
    this.sectorStart = time;
    this.lapTime = 0;
    return { time: t, best: isBest, lap: this.lapTimes.length };
  }
}

/** Format seconds as m:ss.mmm (or ss.mmm under a minute when short=true). */
export function formatTime(sec, { short = false, decimals = 3 } = {}) {
  if (!(sec > 0) || !Number.isFinite(sec)) return decimals === 3 ? '-:--.---' : '-:--.-';
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  const ss = s.toFixed(decimals).padStart(decimals + 3, '0');
  if (short && m === 0) return s.toFixed(decimals);
  return `${m}:${ss}`;
}

export function formatDelta(d) {
  if (d === null || d === undefined || !Number.isFinite(d)) return '';
  const sign = d < 0 ? '-' : '+';
  return sign + Math.abs(d).toFixed(3);
}
