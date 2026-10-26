import { h } from '../dom.js';

/** HazardBand({text, tone:'red|amber', size:'sm|lg'}) — the 135° stripe. */
export function HazardBand({ text, tone = 'red', size = 'sm', className = '' } = {}) {
  const cls = ['hazard-band'];
  if (tone === 'amber') cls.push('hazard-band--amber');
  if (size === 'lg') cls.push('hazard-band--lg');
  if (className) cls.push(className);
  const el = h('div', { className: cls.join(' '), attrs: { role: text ? 'status' : 'presentation' } });
  const textEl = text ? h('span', { className: 'hazard-band__text', text }) : null;
  if (textEl) el.appendChild(textEl);
  el.setText = (t) => {
    if (textEl) textEl.textContent = t;
  };
  return el;
}
