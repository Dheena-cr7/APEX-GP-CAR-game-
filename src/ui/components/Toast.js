import { h } from '../dom.js';

/**
 * ToastStack — small queue of transient messages. Timers run on the game's
 * own clock via `update(dt)` so they freeze while paused.
 */
export class ToastStack {
  constructor(parent) {
    this.el = h('div', { className: 'toast-stack layer-passive', attrs: { 'aria-live': 'polite' } });
    parent.appendChild(this.el);
    this.items = [];
  }

  show(text, tone = 'neutral', duration = 2.2) {
    const el = h('div', { className: `toast toast--${tone}`, text });
    this.el.appendChild(el);
    this.items.push({ el, t: duration });
    while (this.items.length > 4) this._remove(0);
  }

  update(dt) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const it = this.items[i];
      it.t -= dt;
      if (it.t <= 0.4 && !it.leaving) {
        it.leaving = true;
        it.el.classList.add('is-leaving');
      }
      if (it.t <= 0) this._remove(i);
    }
  }

  _remove(i) {
    const it = this.items[i];
    if (it.el.parentNode) it.el.parentNode.removeChild(it.el);
    this.items.splice(i, 1);
  }

  clear() {
    while (this.items.length) this._remove(0);
  }

  dispose() {
    this.clear();
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }
}

/** One-off static toast element (used by the styleguide). */
export function Toast({ text, tone = 'neutral' } = {}) {
  return h('div', { className: `toast toast--${tone}`, text });
}
