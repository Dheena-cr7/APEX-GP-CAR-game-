import { h } from './dom.js';
import { Panel } from './components/Panel.js';
import { Button } from './components/Button.js';
import { HazardBand } from './components/HazardBand.js';

let current = null;

/**
 * Friendly full-screen error. actions: [{label, variant, onClick}]
 * Returns a handle with remove().
 */
export function showError(root, { title, message, detail, actions = [] }) {
  hideError();
  const actionEls = actions.map((a) => Button({ label: a.label, variant: a.variant || 'primary', size: 'md', onClick: a.onClick }));
  const card = Panel({
    label: 'System',
    raised: true,
    className: 'error-card',
    children: [
      HazardBand({ text: 'Fault' }),
      h('h1', { className: 't-display-2', text: title }),
      h('p', { className: 't-body', text: message }),
      detail ? h('pre', { className: 'error-card__detail', text: detail }) : null,
      actionEls.length ? h('div', { className: 'error-card__actions' }, actionEls) : null,
    ],
  });
  const el = h('div', { className: 'screen-center', attrs: { role: 'alertdialog', 'aria-label': title } }, [card]);
  root.appendChild(el);
  current = el;
  if (actionEls[0]) actionEls[0].focus();
  return { remove: hideError };
}

export function hideError() {
  if (current && current.parentNode) current.parentNode.removeChild(current);
  current = null;
}

/** True if a WebGL context can be created (honours the ?nowebgl test flag). */
export function webglAvailable(params) {
  if (params && params.has('nowebgl')) return false;
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}
