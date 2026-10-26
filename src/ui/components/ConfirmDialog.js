import { h } from '../dom.js';
import { Panel } from './Panel.js';
import { Button } from './Button.js';
import { HazardBand } from './HazardBand.js';

/** ConfirmDialog({title, message, confirmLabel, onConfirm, onCancel}) */
export function ConfirmDialog({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel } = {}) {
  const cancel = Button({ label: cancelLabel, variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => onCancel && onCancel() });
  cancel.dataset.autofocus = '';
  return Panel({
    raised: true,
    className: 'confirm',
    children: [
      HazardBand({ text: 'Confirm' }),
      h('h2', { className: 't-display-3', text: title }),
      h('p', { className: 't-body', text: message }),
      h('div', { className: 'confirm__actions' }, [cancel, Button({ label: confirmLabel, variant: 'primary', size: 'md', onClick: () => onConfirm && onConfirm() })]),
    ],
  });
}
