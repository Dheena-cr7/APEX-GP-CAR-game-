// Single game-state store. Every screen reads from this one store; phase
// changes go through `go()`, which rejects any transition not listed below, so
// illegal transitions are impossible by construction.

export const PHASES = Object.freeze(['boot', 'menu', 'garage', 'select', 'loading', 'countdown', 'racing', 'paused', 'results', 'error']);

const TRANSITIONS = Object.freeze({
  boot: ['menu', 'error'],
  menu: ['garage', 'select', 'loading', 'error'],
  garage: ['menu', 'select', 'error'],
  select: ['menu', 'garage', 'loading', 'error'],
  loading: ['countdown', 'menu', 'error'],
  countdown: ['racing', 'paused', 'countdown', 'menu', 'error'],
  racing: ['paused', 'results', 'countdown', 'menu', 'error'],
  paused: ['racing', 'countdown', 'menu', 'error'],
  results: ['countdown', 'loading', 'menu', 'select', 'garage', 'error'],
  error: ['menu', 'boot'],
});

export function canTransition(from, to) {
  const list = TRANSITIONS[from];
  return !!list && list.includes(to);
}

export class GameStore {
  constructor(initial = {}) {
    this.state = {
      phase: 'boot',
      prevPhase: null,
      // menu / select sub-screen ('main', 'mode', 'track', 'setup', 'settings', 'controls', 'reset', 'credits')
      screen: 'main',
      mode: 'campaign', // 'campaign' | 'practice' | 'timetrial' | 'grandprix' | 'drift'
      levelId: null,
      trackId: 'beginner',
      variant: 'grandprix',
      difficulty: 'medium',
      laps: 3,
      error: null,
      ...initial,
    };
    this.listeners = new Set();
    this.history = [];
  }

  get phase() {
    return this.state.phase;
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  /** Change phase (validated) and optionally patch other fields. */
  go(phase, patch = null) {
    const from = this.state.phase;
    if (from !== phase && !canTransition(from, phase)) {
      throw new Error(`Illegal phase transition ${from} -> ${phase}`);
    }
    if (from === phase && !canTransition(from, phase) && !patch) return false;
    const prev = this.state;
    this.state = { ...prev, ...patch, phase, prevPhase: from };
    this.history.push(phase);
    if (this.history.length > 64) this.history.shift();
    this._emit(prev);
    return true;
  }

  /** Patch non-phase fields (sub-screen, selections). */
  set(patch) {
    if ('phase' in patch) throw new Error('Use go() to change phase');
    const prev = this.state;
    this.state = { ...prev, ...patch };
    this._emit(prev);
  }

  _emit(prev) {
    for (const fn of this.listeners) fn(this.state, prev);
  }
}
