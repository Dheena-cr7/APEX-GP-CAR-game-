import { h } from '../dom.js';

/** Badge({tone:'neutral|solid|hazard|outlineHazard|info|good|warn'}) */
export function Badge({ label, tone = 'neutral' } = {}) {
  return h('span', { className: `badge badge--${tone}`, text: label });
}
