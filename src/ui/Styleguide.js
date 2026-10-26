import { h } from './dom.js';
import { Button } from './components/Button.js';
import { Badge } from './components/Badge.js';
import { Panel } from './components/Panel.js';
import { Stat } from './components/Stat.js';
import { StatBar } from './components/StatBar.js';
import { StarRating } from './components/StarRating.js';
import { HazardBand } from './components/HazardBand.js';
import { KeyHint } from './components/KeyHint.js';
import { Toast } from './components/Toast.js';
import { LevelCard, CarCard } from './components/Cards.js';

const COLOR_TOKENS = ['void', 'slate', 'asphalt', 'edge', 'chalk', 'ash', 'red', 'info-blue', 'good-green', 'warn-amber'];
const TYPE_SCALE = [
  ['t-hero', 'Hero 112'],
  ['t-display-1', 'Display-1 72'],
  ['t-display-2', 'Display-2 48'],
  ['t-display-3', 'Display-3 32'],
  ['t-display-4', 'Display-4 24'],
];
const LABEL_SCALE = [
  ['t-label', 'Label 14'],
  ['t-label-md', 'Label 12'],
  ['t-label-sm', 'Label 11'],
  ['t-label-xs', 'Label 10'],
];

function section(title, children) {
  return h('section', { className: 'sg-section' }, [h('h2', { className: 't-label-sm t-secondary sg-section__title', text: title }), h('div', { className: 'sg-section__body' }, children)]);
}

function previewCanvas() {
  // A small hand-drawn loop so the card media is not empty in the styleguide.
  const c = document.createElement('canvas');
  c.width = 320;
  c.height = 200;
  const g = c.getContext('2d');
  const styles = getComputedStyle(document.documentElement);
  g.fillStyle = styles.getPropertyValue('--void').trim();
  g.fillRect(0, 0, 320, 200);
  g.strokeStyle = styles.getPropertyValue('--chalk').trim();
  g.lineWidth = 6;
  g.beginPath();
  g.ellipse(160, 100, 120, 60, 0, 0, Math.PI * 2);
  g.stroke();
  return c;
}

/** Renders every token and component so the system can be eyeballed. */
export function renderStyleguide(root) {
  document.documentElement.classList.add('is-scrollable');
  document.title = 'APEX GP — Styleguide';
  const live = Stat({ label: 'Speed', value: '287', unit: 'km/h', size: 'lg' });

  const page = h('main', { className: 'styleguide' }, [
    h('header', { className: 'sg-header' }, [
      h('div', { className: 't-label-sm t-secondary', text: 'APEX GP / Design system' }),
      h('h1', { className: 't-display-1', text: 'Styleguide' }),
      HazardBand({}),
    ]),
    section('Colour tokens', [
      h(
        'div',
        { className: 'sg-swatches' },
        COLOR_TOKENS.map((t) =>
          h('div', { className: 'sg-swatch' }, [h('span', { className: 'sg-swatch__chip', style: { background: `var(--${t})` } }), h('span', { className: 't-label-xs', text: `--${t}` })]),
        ),
      ),
    ]),
    section('Type scale', [
      ...TYPE_SCALE.map(([cls, text]) => h('div', { className: cls, text })),
      ...LABEL_SCALE.map(([cls, text]) => h('div', { className: cls, text })),
      h('p', { className: 't-body', text: 'Body copy in JetBrains Mono. Labels are uppercase with 0.18em tracking.' }),
    ]),
    section('Buttons', [
      h('div', { className: 'sg-row' }, [
        Button({ label: 'Drive', variant: 'primary', size: 'lg', hotkey: 'Enter' }),
        Button({ label: 'Primary', variant: 'primary', size: 'md' }),
        Button({ label: 'Hover', variant: 'primary', size: 'md', className: 'is-hover' }),
        Button({ label: 'Press', variant: 'primary', size: 'md', className: 'is-active' }),
        Button({ label: 'Small', variant: 'primary', size: 'sm' }),
        Button({ label: 'Disabled', variant: 'primary', size: 'md', disabled: true }),
      ]),
      h('div', { className: 'sg-row' }, [
        Button({ label: 'Secondary', variant: 'secondary', size: 'md' }),
        Button({ label: 'Hover', variant: 'secondary', size: 'md', className: 'is-hover' }),
        Button({ label: 'Press', variant: 'secondary', size: 'md', className: 'is-active' }),
        Button({ label: 'Ghost', variant: 'ghost', size: 'md' }),
        Button({ label: 'Ghost hover', variant: 'ghost', size: 'md', className: 'is-hover' }),
      ]),
    ]),
    section('Badges', [
      h('div', { className: 'sg-row' }, [
        Badge({ label: 'Neutral' }),
        Badge({ label: 'Solid', tone: 'solid' }),
        Badge({ label: 'Hazard', tone: 'hazard' }),
        Badge({ label: 'Outline hazard', tone: 'outlineHazard' }),
        Badge({ label: 'Info', tone: 'info' }),
        Badge({ label: 'Best', tone: 'good' }),
        Badge({ label: 'Penalty', tone: 'warn' }),
      ]),
    ]),
    section('Panels & stats', [
      h('div', { className: 'sg-grid' }, [
        Panel({ label: 'Panel', children: [Stat({ label: 'Position', value: '3', unit: '/ 8', size: 'md' })] }),
        Panel({ label: 'Raised', raised: true, children: [Stat({ label: 'Lap', value: '2', unit: '/ 3', size: 'md' })] }),
        Panel({ label: 'Translucent', translucent: true, children: [Stat({ label: 'Delta', value: '-0.412', size: 'md', className: 'stat--good' })] }),
        Panel({ label: 'Hazard stat', children: [Stat({ label: 'Time left', value: '0:08.2', size: 'md', hazard: true })] }),
        Panel({ label: 'Large', children: [live] }),
        Panel({ label: 'Flush', flush: true, children: [h('div', { className: 'sg-flush-demo t-label-xs t-secondary', text: 'Flush body' })] }),
      ]),
    ]),
    section('Racing components', [
      h('div', { className: 'sg-grid' }, [
        Panel({
          label: 'Stat bars',
          children: [
            StatBar({ label: 'Acceleration', value: 8 }),
            StatBar({ label: 'Top speed', value: 6, compare: 8 }),
            StatBar({ label: 'Drift', value: 9, compare: 5 }),
          ],
        }),
        Panel({
          label: 'Stars & keys',
          children: [
            h('div', { className: 'sg-row' }, [StarRating({ value: 0 }), StarRating({ value: 2 }), StarRating({ value: 3, size: 'lg' })]),
            h('div', { className: 'sg-row' }, [KeyHint({ keys: ['W', '↑'], label: 'Throttle' }), KeyHint({ keys: ['Space'], label: 'Drift' })]),
          ],
        }),
        Panel({
          label: 'Hazard bands',
          children: [HazardBand({ text: 'Locked' }), HazardBand({ text: 'Wrong way', tone: 'amber', size: 'lg' })],
        }),
        Panel({
          label: 'Toasts',
          children: [Toast({ text: 'Best lap', tone: 'good' }), Toast({ text: 'Boost', tone: 'info' }), Toast({ text: '+2s penalty', tone: 'warn' })],
        }),
      ]),
      h('div', { className: 'sg-cards' }, [
        LevelCard({ title: 'Level card', subtitle: 'Grand Prix · 3 laps', media: previewCanvas(), stars: 2, badges: [{ label: 'Easy', tone: 'good' }], selected: true }),
        LevelCard({ title: 'Locked level', subtitle: 'Drift challenge', media: previewCanvas(), stars: 0, locked: true, lockText: 'Need 6 stars' }),
        CarCard({ name: 'Car card', tagline: 'Long nose · balanced', swatches: ['var(--red)', 'var(--void)', 'var(--chalk)'] }),
        CarCard({ name: 'Locked car', tagline: 'Wide body', locked: true, lockText: 'Win Street Cup' }),
      ]),
    ]),
    section('Motion', [
      h('div', { className: 'sg-row' }, [
        h('span', { className: 'badge badge--hazard sg-blink', text: 'Blink hazard' }),
        h('span', { className: 't-label-xs t-secondary', text: '60 / 120 / 200 / 400 ms · linear or hard-step only' }),
      ]),
    ]),
  ]);
  root.appendChild(page);
}
