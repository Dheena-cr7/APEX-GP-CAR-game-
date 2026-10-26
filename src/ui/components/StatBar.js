import { h } from '../dom.js';

/**
 * StatBar({label, value 1..10, compare}) — segmented car stat. When `compare`
 * is given, segments above/below it are tinted to show the difference.
 */
export function StatBar({ label, value = 0, compare } = {}) {
  const segs = [];
  for (let i = 0; i < 10; i++) segs.push(h('span', { className: 'statbar__seg' }));
  const valueEl = h('span', { className: 'statbar__value' });
  const el = h('div', { className: 'statbar', attrs: { role: 'meter', 'aria-valuemin': 1, 'aria-valuemax': 10, 'aria-label': label } }, [
    h('span', { className: 'statbar__label', text: label }),
    h('span', { className: 'statbar__track' }, segs),
    valueEl,
  ]);
  el.set = (v, cmp) => {
    const val = Math.max(0, Math.min(10, Math.round(v)));
    for (let i = 0; i < 10; i++) {
      const n = i + 1;
      const s = segs[i];
      s.className = 'statbar__seg';
      if (cmp === undefined || cmp === null) {
        if (n <= val) s.classList.add('is-on');
      } else if (n <= Math.min(val, cmp)) s.classList.add('is-on');
      else if (n <= val) s.classList.add('is-up');
      else if (n <= cmp) s.classList.add('is-down');
    }
    valueEl.textContent = String(val);
    el.setAttribute('aria-valuenow', String(val));
  };
  el.set(value, compare);
  return el;
}
