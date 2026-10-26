// Quality presets + adaptive quality. Adaptive mode watches the frame time
// and steps the preset down (pixel ratio first, then shadows/particles/draw
// distance) when the budget is exceeded for a sustained period.

export const PRESETS = Object.freeze({
  low: {
    id: 'low',
    pixelRatioCap: 1,
    shadows: false,
    shadowSize: 512,
    particles: 120,
    skidMarks: 300,
    drawDistance: 0.7,
    propDensity: 0.55,
    antialias: false,
  },
  medium: {
    id: 'medium',
    pixelRatioCap: 1.5,
    shadows: true,
    shadowSize: 1024,
    particles: 260,
    skidMarks: 600,
    drawDistance: 0.85,
    propDensity: 0.8,
    antialias: true,
  },
  high: {
    id: 'high',
    pixelRatioCap: 2,
    shadows: true,
    shadowSize: 2048,
    particles: 400,
    skidMarks: 1000,
    drawDistance: 1,
    propDensity: 1,
    antialias: true,
  },
});

const ORDER = ['low', 'medium', 'high'];

export class Quality {
  constructor(presetId = 'high', adaptive = true) {
    this.setPreset(presetId);
    this.adaptive = adaptive;
    this.avgMs = 16.7;
    this.overBudgetTime = 0;
    this.underBudgetTime = 0;
    this.pixelRatio = 1;
    this.listeners = new Set();
  }

  setPreset(id) {
    this.preset = PRESETS[id] || PRESETS.high;
    this.id = this.preset.id;
    this.dynamicScale = 1; // 0.6..1 multiplier on pixel ratio
  }

  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  computePixelRatio() {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    this.pixelRatio = Math.max(0.5, Math.min(dpr, 2, this.preset.pixelRatioCap) * this.dynamicScale);
    return this.pixelRatio;
  }

  /**
   * Feed one frame's duration. Returns true if the effective quality changed.
   * Only active in races; never runs while paused or hidden.
   */
  sample(frameMs, dt) {
    if (!this.adaptive) return false;
    if (frameMs > 250) return false; // tab switch / breakpoint, ignore
    this.avgMs += (frameMs - this.avgMs) * Math.min(1, dt * 2);
    const budget = 1000 / 58;
    if (this.avgMs > budget * 1.12) {
      this.overBudgetTime += dt;
      this.underBudgetTime = 0;
    } else if (this.avgMs < budget * 0.75) {
      this.underBudgetTime += dt;
      this.overBudgetTime = 0;
    } else {
      this.overBudgetTime = 0;
      this.underBudgetTime = 0;
    }
    if (this.overBudgetTime > 2) {
      this.overBudgetTime = 0;
      if (this.dynamicScale > 0.65) {
        this.dynamicScale = Math.max(0.6, this.dynamicScale - 0.15);
      } else {
        const idx = ORDER.indexOf(this.id);
        if (idx <= 0) return false;
        this.setPreset(ORDER[idx - 1]);
      }
      this._emit();
      return true;
    }
    if (this.underBudgetTime > 6 && this.dynamicScale < 1) {
      this.underBudgetTime = 0;
      this.dynamicScale = Math.min(1, this.dynamicScale + 0.1);
      this._emit();
      return true;
    }
    return false;
  }

  _emit() {
    for (const fn of this.listeners) fn(this);
  }
}
