// Single requestAnimationFrame loop with a fixed-timestep accumulator.
// step(dt) runs at a fixed rate (120 Hz); frame(alpha, frameDt) runs once per
// rendered frame with the interpolation factor between the last two steps.

export const FIXED_DT = 1 / 120;
const MAX_FRAME_DT = 0.1; // clamp long frames so a stall never spirals
const MAX_STEPS_PER_FRAME = 12;

let activeLoops = 0; // global guard for the "one rAF loop" quality gate

export class Loop {
  constructor({ step, frame }) {
    this.stepFn = step;
    this.frameFn = frame;
    this.running = false;
    this.rafId = 0;
    this.lastTime = 0;
    this.acc = 0;
    this.hidden = typeof document !== 'undefined' && document.hidden;
    this.frameCount = 0;
    this._tick = this._tick.bind(this);
    this._onVisibility = this._onVisibility.bind(this);
    document.addEventListener('visibilitychange', this._onVisibility);
  }

  start() {
    if (this.running) return;
    this.running = true;
    activeLoops++;
    this.lastTime = -1;
    this.acc = 0;
    if (!this.hidden) this.rafId = requestAnimationFrame(this._tick);
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    activeLoops--;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  /** Drop accumulated time (e.g. after loading or resuming). */
  resetClock() {
    this.lastTime = -1;
    this.acc = 0;
  }

  _onVisibility() {
    this.hidden = document.hidden;
    if (!this.running) return;
    if (this.hidden) {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    } else if (!this.rafId) {
      this.lastTime = -1;
      this.rafId = requestAnimationFrame(this._tick);
    }
  }

  _tick(now) {
    this.rafId = 0;
    if (!this.running || this.hidden) return;
    this.rafId = requestAnimationFrame(this._tick);
    let frameDt = this.lastTime < 0 ? FIXED_DT : (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (frameDt > MAX_FRAME_DT) frameDt = MAX_FRAME_DT;
    if (frameDt < 0) frameDt = 0;
    this.acc += frameDt;
    let steps = 0;
    while (this.acc >= FIXED_DT && steps < MAX_STEPS_PER_FRAME) {
      this.stepFn(FIXED_DT);
      this.acc -= FIXED_DT;
      steps++;
    }
    if (steps === MAX_STEPS_PER_FRAME) this.acc = 0;
    this.frameCount++;
    this.frameFn(this.acc / FIXED_DT, frameDt, now);
  }

  dispose() {
    this.stop();
    document.removeEventListener('visibilitychange', this._onVisibility);
  }

  static get activeLoops() {
    return activeLoops;
  }
}
