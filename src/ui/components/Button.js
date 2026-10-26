import { h } from '../dom.js';

/**
 * Button({variant:'primary|secondary|ghost', size:'sm|md|lg', disabled, onClick})
 * `hotkey` renders a small key label inside the button (e.g. "ENTER").
 */
export function Button({ label, variant = 'primary', size = 'md', disabled = false, onClick, hotkey, id, title, className = '' } = {}) {
  const btn = h('button', {
    className: `btn btn--${variant} btn--${size} ${className}`.trim(),
    attrs: { type: 'button', id, title, 'aria-disabled': disabled ? 'true' : undefined },
  });
  btn.disabled = !!disabled;
  btn.appendChild(h('span', { className: 'btn__label', text: label }));
  if (hotkey) btn.appendChild(h('span', { className: 'btn__key', text: hotkey, attrs: { 'aria-hidden': 'true' } }));
  if (onClick) {
    btn.addEventListener('click', (e) => {
      if (btn.disabled) return;
      onClick(e);
    });
  }
  return btn;
}
