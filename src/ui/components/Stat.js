import { h, setText, setClass } from '../dom.js';

/**
 * Stat({label, value, unit, size:'sm|md|lg', align, hazard}) — label above,
 * big Anton number below. Returns the element with `set(value)`,
 * `setHazard(bool)`, `setTone(tone)` and `setUnit(unit)` helpers that only
 * touch the DOM when something changed.
 */
export function Stat({ label, value = '', unit, size = 'md', align = 'left', hazard = false, className = '' } = {}) {
  const valueEl = h('span', { className: 'stat__value', text: String(value) });
  const unitEl = h('span', { className: 'stat__unit', text: unit || '' });
  const labelEl = h('span', { className: 'stat__label', text: label || '' });
  const el = h('div', { className: `stat stat--${size} stat--${align} ${className}`.trim() }, [
    labelEl,
    h('div', { className: 'stat__row' }, [valueEl, unit ? unitEl : null]),
  ]);
  if (hazard) el.classList.add('stat--hazard');
  let tone = null;
  el.set = (v) => setText(valueEl, v);
  el.setLabel = (v) => setText(labelEl, v);
  el.setUnit = (v) => setText(unitEl, v);
  el.setHazard = (on) => setClass(el, 'stat--hazard', !!on);
  el.setTone = (t) => {
    if (t === tone) return;
    if (tone) el.classList.remove(`stat--${tone}`);
    tone = t;
    if (tone) el.classList.add(`stat--${tone}`);
  };
  el.valueEl = valueEl;
  return el;
}
