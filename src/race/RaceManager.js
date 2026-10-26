// Race rules: grid → 5-light countdown → running → finished. Owns the race
// clock, positions and the results table. Racers are plain objects created by
// the race scene; this class never touches meshes.

import { createRng } from '../core/Random.js';

export const LIGHT_INTERVAL = 0.9;

function byRank(a, b) {
  if (a.finished && b.finished) return a.finishTime - b.finishTime;
  if (a.finished) return -1;
  if (b.finished) return 1;
  return b.progress - a.progress;
}

export class RaceManager {
  constructor({ mode, laps, racers, checkpoints, seed = 1 }) {
    this.mode = mode;
    this.laps = laps; // 0 = unlimited (practice)
    this.racers = racers;
    this.cp = checkpoints;
    this.seed = seed;
    this.reset();
  }

  reset() {
    this.state = 'grid';
    this.time = 0;
    this.countdown = 0;
    this.lights = 0;
    const rng = createRng(this.seed);
    this.holdAfterLights = 0.5 + rng.next() * 0.8;
    this.goTime = -1;
    this.finishTime = -1;
    this.playerFinished = false;
    this.finishOrder = [];
    this.events = [];
  }

  get canDrive() {
    return this.state === 'running' || this.state === 'finished';
  }

  startCountdown() {
    this.state = 'countdown';
    this.countdown = 0;
    this.lights = 0;
  }

  /** Advance the countdown / race clock. Pushes events into this.events. */
  step(dt) {
    if (this.state === 'countdown') {
      this.countdown += dt;
      const n = Math.min(5, Math.floor(this.countdown / LIGHT_INTERVAL) + 1);
      if (n !== this.lights && this.countdown < 5 * LIGHT_INTERVAL) {
        this.lights = n;
        this.events.push({ type: 'light', n });
      }
      if (this.countdown >= 5 * LIGHT_INTERVAL + this.holdAfterLights) {
        this.lights = 0;
        this.state = 'running';
        this.goTime = 0;
        this.time = 0;
        this.events.push({ type: 'go' });
      }
      return;
    }
    if (this.state === 'running' || this.state === 'finished') this.time += dt;
  }

  /** Mark a racer finished (called when it completes its final lap). */
  finish(racer) {
    if (racer.finished) return;
    racer.finished = true;
    racer.finishTime = this.time + racer.penalty;
    this.finishOrder.push(racer);
    if (racer.isPlayer) {
      this.playerFinished = true;
      this.state = 'finished';
      this.finishTime = this.time;
      this.events.push({ type: 'finish', racer });
    }
  }

  /** Sort racers into positions (finished by time, others by progress). */
  rank() {
    const list = this.racers;
    for (const r of list) r.progress = this.cp.progress(r.cp, r.proj.s);
    list.sort(byRank);
    for (let i = 0; i < list.length; i++) list[i].position = i + 1;
    return list;
  }

  /** Results table for the results screen. */
  buildResults(player, extra = {}) {
    this.rank();
    const rows = this.racers.map((r) => {
      let time = r.finished ? r.finishTime : null;
      if (!r.finished) {
        // estimate from remaining distance at the racer's average speed
        const total = this.cp.model.length * Math.max(1, this.laps);
        const done = Math.max(1, r.progress);
        const avg = done / Math.max(1, this.time);
        time = this.time + Math.max(0, total - done) / Math.max(5, avg) + r.penalty;
      }
      return {
        name: r.name,
        car: r.carDef.name,
        isPlayer: r.isPlayer,
        finished: r.finished,
        time,
        best: r.timer.bestLap,
        position: r.position,
      };
    });
    rows.sort((a, b) => a.time - b.time);
    rows.forEach((row, i) => (row.position = i + 1));
    const me = rows.find((r) => r.isPlayer);
    return {
      mode: this.mode,
      laps: this.laps,
      position: me ? me.position : 1,
      totalTime: player.finished ? player.finishTime : this.time,
      bestLap: player.timer.bestLap,
      lapTimes: player.timer.lapTimes.slice(),
      penalty: player.penalty,
      rows,
      ...extra,
    };
  }
}
