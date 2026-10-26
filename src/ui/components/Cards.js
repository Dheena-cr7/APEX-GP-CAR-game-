import { h } from '../dom.js';
import { Badge } from './Badge.js';
import { StarRating } from './StarRating.js';
import { HazardBand } from './HazardBand.js';

/**
 * LevelCard({title, subtitle, media, stars, badges, locked, lockText, selected, onSelect})
 * `media` is a canvas/img element (real track preview).
 */
export function LevelCard({ title, subtitle, media, stars = 0, badges = [], locked = false, lockText = 'LOCKED', selected = false, onSelect, onFocus } = {}) {
  const el = h('button', {
    className: `card level-card${locked ? ' is-locked' : ''}${selected ? ' is-selected' : ''}`,
    attrs: { type: 'button', 'aria-pressed': selected ? 'true' : 'false', 'aria-disabled': locked ? 'true' : undefined },
  });
  if (media) {
    media.classList.add('card__media');
    el.appendChild(media);
  }
  el.appendChild(
    h('div', { className: 'card__body' }, [
      h('div', { className: 'card__title', text: title }),
      subtitle ? h('div', { className: 't-label-xs t-secondary', text: subtitle }) : null,
      h('div', { className: 'card__meta' }, [StarRating({ value: stars }), ...badges.map((b) => Badge(b))]),
    ]),
  );
  if (locked) el.appendChild(HazardBand({ text: lockText, className: 'card__lock' }));
  if (onSelect) el.addEventListener('click', () => onSelect());
  if (onFocus) {
    el.addEventListener('focus', () => onFocus());
    el.addEventListener('mouseenter', () => onFocus());
  }
  return el;
}

/** CarCard({name, tagline, swatches, locked, lockText, selected, onSelect}) */
export function CarCard({ name, tagline, swatches = [], locked = false, lockText = 'LOCKED', selected = false, onSelect } = {}) {
  const el = h('button', {
    className: `card car-card${locked ? ' is-locked' : ''}${selected ? ' is-selected' : ''}`,
    attrs: { type: 'button', 'aria-pressed': selected ? 'true' : 'false', 'aria-disabled': locked ? 'true' : undefined },
  });
  el.appendChild(
    h('div', { className: 'card__body' }, [
      h('div', { className: 'card__title', text: name }),
      h('div', { className: 't-label-xs t-secondary', text: tagline }),
      h('div', { className: 'card__meta' }, swatches.map((c) => h('span', { className: 'card__swatch', style: { background: c } }))),
    ]),
  );
  if (locked) el.appendChild(HazardBand({ text: lockText, className: 'card__lock' }));
  if (onSelect) el.addEventListener('click', () => onSelect());
  return el;
}
