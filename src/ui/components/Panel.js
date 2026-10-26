import { h, append } from '../dom.js';

/**
 * Panel({label, raised, translucent, flush}) — returns the panel element.
 * Children go into `panel.body` (the panel itself when no label is given).
 */
export function Panel({ label, labelRight, raised = false, translucent = false, flush = false, className = '', children } = {}) {
  const cls = ['panel'];
  if (raised) cls.push('panel--raised');
  if (translucent) cls.push('panel--translucent');
  if (flush) cls.push('panel--flush');
  if (className) cls.push(className);
  const panel = h('section', { className: cls.join(' ') });
  if (label) {
    const head = h('header', { className: 'panel__label' }, [h('span', { text: label })]);
    if (labelRight) append(head, labelRight);
    panel.appendChild(head);
  }
  panel.body = panel;
  append(panel, children);
  return panel;
}
