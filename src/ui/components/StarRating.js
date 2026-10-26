import { h } from '../dom.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
// Hard-edged five point star in a 20x20 box.
const STAR_POINTS = '10,1 12.6,7.4 19.5,7.6 14.1,11.9 16,18.6 10,14.7 4,18.6 5.9,11.9 0.5,7.6 7.4,7.4';

function star(on) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('class', on ? 'stars__star is-on' : 'stars__star');
  svg.setAttribute('aria-hidden', 'true');
  const poly = document.createElementNS(SVG_NS, 'polygon');
  poly.setAttribute('points', STAR_POINTS);
  svg.appendChild(poly);
  return svg;
}

/** StarRating({value 0..3, size:'sm|lg'}) */
export function StarRating({ value = 0, max = 3, size = 'sm' } = {}) {
  const el = h('span', { className: `stars stars--${size}`, attrs: { role: 'img', 'aria-label': `${value} of ${max} stars` } });
  for (let i = 0; i < max; i++) el.appendChild(star(i < value));
  return el;
}
