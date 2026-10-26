// Ordered checkpoints along the centreline. Checkpoint 0 is the finish line
// (s = 0). A lap only counts when every checkpoint was crossed in order and
// the finish line is crossed forward; crossing a checkpoint backward un-passes
// it, so reversing over the line cannot farm laps, and a "high-water" lap
// counter makes sure jitter on the line never fires a lap event twice.

export class CheckpointSystem {
  constructor(model, sectors = [0.33, 0.66], count = 16) {
    this.model = model;
    const L = model.length;
    const list = [];
    for (let i = 0; i < count; i++) list.push((L * i) / count);
    this.sectorS = sectors.map((u) => L * u);
    for (const s of this.sectorS) list.push(s);
    list.sort((a, b) => a - b);
    // drop near-duplicates
    this.points = list.filter((s, i) => i === 0 || s - list[i - 1] > 5);
    this.sectorIndex = this.sectorS.map((s) => {
      let best = 1;
      for (let i = 1; i < this.points.length; i++) if (Math.abs(this.points[i] - s) < Math.abs(this.points[best] - s)) best = i;
      return best;
    });
  }

  get count() {
    return this.points.length;
  }

  createState(startS) {
    // a car on the grid sits behind the line and has not started lap 1:
    // it still has to cross checkpoint 0 (the start / finish line)
    return { next: 0, laps: -1, highLaps: -1, lastS: startS, started: false, crossings: 0, lastCrossTime: -1 };
  }

  /**
   * Update a racer's progress with its new s. Returns an event or null:
   * {type:'start'} first crossing, {type:'lap', lap} each completed lap,
   * {type:'checkpoint', index} for intermediate checkpoints,
   * {type:'sector', sector} at sector splits, {type:'back'} when un-passing.
   */
  update(state, s, time, out) {
    const m = this.model;
    const d = m.deltaS(state.lastS, s);
    out.type = null;
    out.index = -1;
    if (d === 0) return out;
    if (Math.abs(d) > 60) {
      // teleport / reset: no crossings, just re-sync
      state.lastS = s;
      return out;
    }
    if (d > 0) {
      const cp = this.points[state.next];
      if (this._crossed(state.lastS, d, cp)) {
        const idx = state.next;
        state.next = (state.next + 1) % this.points.length;
        out.index = idx;
        if (idx === 0) {
          state.laps++;
          if (state.laps > state.highLaps) {
            state.highLaps = state.laps;
            state.crossings++;
            state.lastCrossTime = time;
            out.type = state.laps === 0 ? 'start' : 'lap';
            out.lap = state.laps;
          } else out.type = 'recross';
        } else {
          out.type = 'checkpoint';
          const sec = this.sectorIndex.indexOf(idx);
          if (sec >= 0) {
            out.type = 'sector';
            out.sector = sec;
          }
        }
      }
    } else {
      const prevIdx = (state.next - 1 + this.points.length) % this.points.length;
      const cp = this.points[prevIdx];
      if (this._crossed(s, -d, cp) && state.laps >= 0) {
        state.next = prevIdx;
        if (prevIdx === 0) state.laps--;
        out.type = 'back';
        out.index = prevIdx;
      }
    }
    state.lastS = s;
    return out;
  }

  /** True if the forward interval [from, from + len) contains cp (wrapped). */
  _crossed(from, len, cp) {
    const L = this.model.length;
    let off = cp - from;
    off = ((off % L) + L) % L;
    return off >= 0 && off <= len;
  }

  /** Distance travelled in the race (for ranking). */
  progress(state, s) {
    return state.laps * this.model.length + s;
  }
}
