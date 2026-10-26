import { h } from '../dom.js';

/** KeyHint({keys:['W','↑'], label:'Throttle'}) — <kbd>-style key labels. */
export function KeyHint({ keys = [], label = '' } = {}) {
  return h('span', { className: 'keyhint' }, [
    h('span', { className: 'keyhint__keys' }, keys.map((k) => h('kbd', { className: 'kbd', text: k }))),
    label ? h('span', { text: label }) : null,
  ]);
}

export function Kbd(key) {
  return h('kbd', { className: 'kbd', text: key });
}
