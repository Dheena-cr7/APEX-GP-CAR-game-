import { h, clear, setText } from './dom.js';
import { Button } from './components/Button.js';
import { Badge } from './components/Badge.js';
import { Panel } from './components/Panel.js';
import { Stat } from './components/Stat.js';
import { StatBar } from './components/StatBar.js';
import { StarRating } from './components/StarRating.js';
import { HazardBand } from './components/HazardBand.js';
import { KeyHint, Kbd } from './components/KeyHint.js';
import { ToastStack } from './components/Toast.js';
import { LevelCard, CarCard } from './components/Cards.js';
import { ConfirmDialog } from './components/ConfirmDialog.js';
import { CARS, STAT_LABELS, getCar } from '../cars/CarData.js';
import { CIRCUITS, CIRCUIT_ORDER } from '../tracks/TrackData.js';
import { trackPreview, circuitModel } from '../tracks/TrackPreview.js';
import { LIVERIES, css } from '../core/Palette.js';
import {
  LEVELS, VARIANT_LABELS, CIRCUIT_UNLOCK, totalStars, circuitStars, isCircuitUnlocked, isLevelUnlocked, isCarUnlocked,
  isLiveryUnlocked, levelRaceConfig, levelTarget, getLevel, LIVERY_UNLOCK,
} from '../race/Campaign.js';
import { formatTime } from '../race/LapTimer.js';
import { ACTION_LABELS, InputManager, keyLabel, DEFAULT_BINDINGS } from '../controls/InputManager.js';
import { modeLabel } from './RaceHUD.js';
import { CAMERA_LABELS } from '../camera/CameraRig.js';
import { renderResults } from './ResultsUI.js';

const MODES = [
  { id: 'campaign', name: 'Campaign', desc: '12 levels across 4 circuits. Earn stars to unlock circuits, cars and liveries.', badge: { label: '12 levels', tone: 'solid' } },
  { id: 'grandprix', name: 'Grand Prix', desc: 'Race a full grid of AI drivers. Pick laps, grid size and difficulty.', badge: { label: 'vs AI', tone: 'info' } },
  { id: 'timetrial', name: 'Time Trial', desc: 'Solo laps against the clock. Your personal best sets the delta.', badge: { label: 'Solo', tone: 'neutral' } },
  { id: 'drift', name: 'Drift Challenge', desc: 'Chain long slides for points. Drift zones double the score.', badge: { label: 'Score', tone: 'good' } },
  { id: 'practice', name: 'Practice', desc: 'Unlimited laps, no pressure. End the session from the pause menu.', badge: { label: 'Free', tone: 'neutral' } },
];

const TIPS = [
  'Tap the handbrake while turning in to start a drift, then hold the throttle to keep it.',
  'Counter-steer to straighten a slide. Lifting off ends a drift and banks the points.',
  'A long drift fills the boost meter — it fires when you straighten, or press Shift.',
  'Hitting a wall breaks your drift combo and loses the unbanked points.',
  'Blue chevron pads give a burst of speed. Amber means hazard.',
  'Tuck in behind a rival on a straight to catch the slipstream.',
  'Hold R to restart instantly. Tap R to get back on the road.',
];

const FOCUSABLE = 'button:not([disabled]):not([aria-disabled="true"]), [role="radio"], input[type="range"], [tabindex="0"]';

/**
 * Every menu screen. Rebuilds the DOM for a screen on phase / screen change,
 * never per frame. Keyboard: arrows move focus, Enter = focused button or the
 * screen's primary action, Esc = back. Gamepad: d-pad / stick / A / B.
 */
export class MenuUI {
  constructor(game) {
    this.game = game;
    this.root = game.uiRoot;
    this.layer = h('div', { className: 'menu-layer' });
    this.root.appendChild(this.layer);
    this.toasts = new ToastStack(this.root);
    this.toasts.el.classList.add('toast-stack--menu');
    this.primary = null;
    this.back = null;
    this.overlay = null; // sub-panel (settings / controls / confirm) on top of a screen
    this.garageIndex = 0;
    this.selectedLevel = null;
    this.setup = { circuitId: 'beginner', difficulty: 'medium', laps: 3, opponents: 5 };
    this.loadingEls = null;
    this.tipIndex = 0;
    this._onKey = this._onKey.bind(this);
    window.addEventListener('keydown', this._onKey);
  }

  overlayOpen() {
    return !!this.overlay;
  }

  toast(text, tone = 'neutral') {
    this.toasts.show(text, tone);
  }

  click() {
    this.game.audio.play('click');
  }

  // ------------------------------------------------------------------ routing

  render(state) {
    const phase = state.phase;
    this.closeOverlay(false);
    this.primary = null;
    this.back = null;
    clear(this.layer);
    this.layer.className = `menu-layer menu-layer--${phase}`;
    this.loadingEls = null;
    this.garageEls = null;
    if (phase === 'menu') this._main();
    else if (phase === 'select') {
      if (state.screen === 'track') this._track(state);
      else if (state.screen === 'setup') this._setup(state);
      else this._mode(state);
    } else if (phase === 'garage') this._garage(state);
    else if (phase === 'loading') this._loading(state);
    else if (phase === 'paused') this._pause(state);
    else if (phase === 'results') this._results(state);
    else if (phase === 'countdown' || phase === 'racing') this.layer.className = 'menu-layer menu-layer--hidden';
    if (phase === 'menu' && state.screen === 'settings') this.openSettings();
    if (phase === 'menu' && state.screen === 'controls') this.openControls();
    // focus the primary action for keyboard users
    const focusTarget = this.layer.querySelector('[data-autofocus]') || this.primary;
    if (focusTarget && phase !== 'countdown' && phase !== 'racing') focusTarget.focus({ preventScroll: true });
  }

  _screen(className, children) {
    const el = h('div', { className: `screen ${className}` }, children);
    this.layer.appendChild(el);
    return el;
  }

  // ------------------------------------------------------------------ main

  _main() {
    const save = this.game.save.data;
    const stars = totalStars(save);
    const drive = Button({ label: 'Drive', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => this._go('select', { screen: 'mode' }) });
    drive.dataset.autofocus = '';
    this.primary = drive;
    const car = getCar(save.carId);
    const card = Panel({
      raised: true,
      className: 'hero-card',
      children: [
        h('div', { className: 't-label-sm t-secondary', text: 'Season 01 · Low-poly formula racing' }),
        h('h1', { className: 't-hero hero-card__title', text: 'Apex GP' }),
        HazardBand({}),
        h('p', { className: 't-body', text: 'Twelve levels, four circuits, six cars. Race, drift and chase the perfect lap.' }),
        h('div', { className: 'hero-card__actions' }, [
          drive,
          Button({ label: 'Garage', variant: 'secondary', size: 'md', onClick: () => this._go('garage', { returnTo: 'menu' }) }),
          Button({ label: 'Quick practice', variant: 'secondary', size: 'md', onClick: () => this._quickPractice() }),
          Button({ label: 'Settings', variant: 'ghost', size: 'md', onClick: () => this.openSettings() }),
          Button({ label: 'Controls', variant: 'ghost', size: 'md', onClick: () => this.openControls() }),
        ]),
        h('div', { className: 'hero-card__meta' }, [
          Badge({ label: `★ ${stars} / ${LEVELS.length * 3}`, tone: 'solid' }),
          Badge({ label: car.name, tone: 'info' }),
          !this.game.save.available ? Badge({ label: 'Progress not saved (storage blocked)', tone: 'warn' }) : null,
          save.settings.freePlay ? Badge({ label: 'Free play', tone: 'good' }) : null,
        ]),
      ],
    });
    this._screen('screen--main', [
      card,
      h('div', { className: 'screen__corner' }, [KeyHint({ keys: ['M'], label: 'Mute' }), KeyHint({ keys: ['F3'], label: 'Debug' })]),
    ]);
  }

  _quickPractice() {
    this.click();
    const save = this.game.save.data;
    const last = this.setup.circuitId;
    const cid = isCircuitUnlocked(save, last) ? last : 'beginner';
    this.game.startRace({ circuitId: cid, mode: 'practice', laps: 0, opponents: 0 });
  }

  _go(phase, patch) {
    this.click();
    this.game.store.go(phase, patch);
  }

  // ------------------------------------------------------------------ mode select

  _mode(state) {
    const cards = MODES.map((m, i) =>
      h(
        'button',
        {
          className: `card mode-card${state.mode === m.id ? ' is-selected' : ''}`,
          attrs: { type: 'button', 'data-autofocus': (state.mode === m.id || (!state.mode && i === 0)) ? '' : undefined },
          onClick: () => {
            this.click();
            this.game.store.set({ mode: m.id, screen: 'track' });
            this.render(this.game.store.state);
          },
        },
        [h('div', { className: 'card__title', text: m.name }), h('p', { className: 't-body', text: m.desc }), h('div', { className: 'card__meta' }, [Badge(m.badge)])],
      ),
    );
    this.back = () => this._go('menu', { screen: 'main' });
    this._screen('screen--mode', [
      this._header('Choose mode', 'Step 1 of 3'),
      h('div', { className: 'mode-grid' }, cards),
      this._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => this.back() })]),
    ]);
  }

  _header(title, sub, right) {
    return h('header', { className: 'screen__header' }, [h('div', {}, [h('div', { className: 't-label-sm t-secondary', text: sub || '' }), h('h1', { className: 't-display-2', text: title })]), right || null]);
  }

  _footer(children) {
    return h('footer', { className: 'screen__footer' }, children);
  }

  // ------------------------------------------------------------------ track / level select

  _track(state) {
    const save = this.game.save.data;
    this.back = () => {
      this.click();
      this.game.store.set({ screen: 'mode' });
      this.render(this.game.store.state);
    };
    if (state.mode === 'campaign') return this._campaign(save);
    const cards = CIRCUIT_ORDER.map((cid) => {
      const c = CIRCUITS[cid];
      const locked = !isCircuitUnlocked(save, cid);
      const best = save.bestLaps[`${cid}:${state.mode}`];
      const card = LevelCard({
        title: c.name,
        subtitle: `${c.venue} · ${Math.round(circuitLength(cid))} m`,
        media: trackPreview(cid, 320, 200),
        stars: 0,
        badges: [{ label: difficultyLabel(c.difficulty), tone: c.difficulty >= 4 ? 'outlineHazard' : c.difficulty >= 3 ? 'info' : 'good' }, best ? { label: `PB ${formatTime(best)}`, tone: 'neutral' } : null].filter(Boolean),
        locked,
        lockText: `Need ${CIRCUIT_UNLOCK[cid]} stars`,
        selected: this.setup.circuitId === cid,
        onSelect: () => {
          if (locked) {
            this.toast(`Earn ${CIRCUIT_UNLOCK[cid]} campaign stars to unlock`, 'warn');
            return;
          }
          this.click();
          this.setup.circuitId = cid;
          this.game.store.set({ screen: 'setup', trackId: cid });
          this.render(this.game.store.state);
        },
      });
      card.querySelector('.stars').remove();
      if (this.setup.circuitId === cid) card.dataset.autofocus = '';
      return card;
    });
    this._screen('screen--track', [
      this._header('Choose circuit', `${modeLabel(state.mode)} · Step 2 of 3`),
      h('div', { className: 'track-grid' }, cards),
      this._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => this.back() })]),
    ]);
  }

  _campaign(save) {
    const total = totalStars(save);
    const rows = CIRCUIT_ORDER.map((cid) => {
      const c = CIRCUITS[cid];
      const unlocked = isCircuitUnlocked(save, cid);
      const levels = LEVELS.filter((l) => l.circuitId === cid);
      const cards = levels.map((lvl) => {
        const stars = save.stars[lvl.id] || 0;
        const card = LevelCard({
          title: VARIANT_LABELS[lvl.variant],
          subtitle: lvl.mode === 'grandprix' ? `${lvl.laps} laps · ${lvl.opponents + 1} cars` : lvl.mode === 'timeattack' ? `${lvl.laps} laps · beat the clock` : `${lvl.laps} laps · score target`,
          media: trackPreview(cid, 240, 140),
          stars,
          badges: [{ label: `L${lvl.index + 1}`, tone: 'solid' }],
          locked: !unlocked,
          lockText: `Need ${CIRCUIT_UNLOCK[cid]} stars`,
          selected: this.selectedLevel === lvl.id,
          onSelect: () => {
            if (!unlocked) {
              this.toast(`Earn ${CIRCUIT_UNLOCK[cid]} stars to unlock ${c.name}`, 'warn');
              return;
            }
            this.click();
            this.selectedLevel = lvl.id;
            this._showLevelDetail(lvl);
            for (const el of this.layer.querySelectorAll('.level-card')) el.classList.remove('is-selected');
            card.classList.add('is-selected');
          },
        });
        card.dataset.level = lvl.id;
        return card;
      });
      return h('section', { className: 'campaign-row' }, [
        h('div', { className: 'campaign-row__head' }, [
          h('div', {}, [h('div', { className: 'card__title', text: c.name }), h('div', { className: 't-label-xs t-secondary', text: `${c.venue} · ${difficultyLabel(c.difficulty)}` })]),
          unlocked ? Badge({ label: `★ ${circuitStars(save, cid)} / 9`, tone: save.cups[cid] ? 'good' : 'neutral' }) : HazardBand({ text: `Locked · ${CIRCUIT_UNLOCK[cid]} ★` }),
          save.cups[cid] ? Badge({ label: 'Cup won', tone: 'good' }) : null,
        ]),
        h('div', { className: 'campaign-row__levels' }, cards),
      ]);
    });
    this.detail = Panel({ raised: true, className: 'level-detail' });
    this._screen('screen--campaign', [
      this._header('Campaign', 'Step 2 of 2', Badge({ label: `★ ${total} / ${LEVELS.length * 3}`, tone: 'solid' })),
      h('div', { className: 'campaign' }, [h('div', { className: 'campaign__rows' }, rows), this.detail]),
      this._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => this.back() }), Button({ label: 'Garage', variant: 'ghost', size: 'md', onClick: () => this._go('garage', { returnTo: 'select' }) })]),
    ]);
    // default selection: first unlocked level without 3 stars
    let pick = this.selectedLevel ? getLevel(this.selectedLevel) : null;
    if (!pick || !isLevelUnlocked(save, pick)) pick = LEVELS.find((l) => isLevelUnlocked(save, l) && (save.stars[l.id] || 0) < 3) || LEVELS[0];
    this.selectedLevel = pick.id;
    const el = this.layer.querySelector(`[data-level="${pick.id}"]`);
    if (el) {
      el.classList.add('is-selected');
      el.dataset.autofocus = '';
    }
    this._showLevelDetail(pick);
  }

  _showLevelDetail(lvl) {
    const save = this.game.save.data;
    const c = CIRCUITS[lvl.circuitId];
    const target = levelTarget(lvl);
    const stars = save.stars[lvl.id] || 0;
    const rows = [];
    if (target.type === 'position') rows.push(['3 ★', 'Win'], ['2 ★', '2nd place'], ['1 ★', '3rd place']);
    else if (target.type === 'lap') rows.push(['3 ★', `Lap ≤ ${formatTime(target.gold)}`], ['2 ★', `Lap ≤ ${formatTime(target.silver)}`], ['1 ★', `Lap ≤ ${formatTime(target.bronze)}`], ['Limit', `${formatTime(target.timeLimit, { decimals: 1 })} total`]);
    else rows.push(['3 ★', `${target.gold} pts`], ['2 ★', `${target.silver} pts`], ['1 ★', `${target.bronze} pts`]);
    const key = `${lvl.circuitId}:${lvl.mode}`;
    const best = lvl.mode === 'drift' ? save.bestDrift[key] : save.bestLaps[key];
    const start = Button({ label: 'Start', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => this._startLevel(lvl) });
    this.primary = start;
    clear(this.detail);
    this.detail.append(
      h('div', { className: 't-label-sm t-secondary', text: `Level ${lvl.index + 1} · ${c.venue}` }),
      h('h2', { className: 't-display-3', text: `${c.name}` }),
      h('div', { className: 't-label t-info', text: VARIANT_LABELS[lvl.variant] }),
      trackPreview(lvl.circuitId, 300, 180),
      h('div', { className: 'level-detail__row' }, [StarRating({ value: stars, size: 'lg' })]),
      h('table', { className: 'kv' }, rows.map(([k, v]) => h('tr', {}, [h('th', { text: k }), h('td', { text: v })]))),
      h('div', { className: 'level-detail__row' }, [
        Stat({ label: 'Laps', value: lvl.laps, size: 'sm' }),
        Stat({ label: 'Cars', value: (lvl.opponents || 0) + 1, size: 'sm' }),
        Stat({ label: lvl.mode === 'drift' ? 'Best score' : 'Best lap', value: best ? (lvl.mode === 'drift' ? best : formatTime(best)) : '—', size: 'sm' }),
      ]),
      h('div', { className: 'level-detail__row' }, [Badge({ label: `Car: ${getCar(save.carId).name}`, tone: 'info' })]),
      start,
    );
  }

  _startLevel(lvl) {
    this.click();
    const save = this.game.save.data;
    this.game.startRace(levelRaceConfig(lvl, save));
  }

  // ------------------------------------------------------------------ setup

  _setup(state) {
    const mode = state.mode;
    const cid = this.setup.circuitId;
    const c = CIRCUITS[cid];
    const save = this.game.save.data;
    const st = this.setup;
    if (mode === 'grandprix') st.laps = st.laps || 3;
    this.back = () => {
      this.click();
      this.game.store.set({ screen: 'track' });
      this.render(this.game.store.state);
    };
    const fields = [];
    if (mode === 'grandprix') {
      fields.push(this._segmented('Difficulty', ['easy', 'medium', 'hard'], st.difficulty, (v) => (st.difficulty = v), (v) => cap(v)));
      fields.push(this._segmented('Laps', [1, 2, 3, 4, 5], st.laps, (v) => (st.laps = v)));
      fields.push(this._segmented('Opponents', [3, 4, 5, 6, 7], st.opponents, (v) => (st.opponents = v)));
    } else if (mode === 'timetrial') {
      st.ttLaps = st.ttLaps || 3;
      fields.push(this._segmented('Laps', [1, 2, 3, 4, 5], st.ttLaps, (v) => (st.ttLaps = v)));
    } else if (mode === 'drift') {
      st.driftLaps = st.driftLaps || 2;
      fields.push(this._segmented('Laps', [1, 2, 3], st.driftLaps, (v) => (st.driftLaps = v)));
    } else {
      fields.push(h('p', { className: 't-body', text: 'Unlimited laps. Lap times and sector splits are recorded. Pause and choose End session to see your summary.' }));
    }
    fields.push(this._segmented('Obstacles', ['on', 'off'], st.obstacles === false ? 'off' : 'on', (v) => (st.obstacles = v === 'on'), (v) => cap(v)));
    const car = getCar(save.carId);
    const start = Button({ label: 'Start', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => this._startSetup(mode) });
    start.dataset.autofocus = '';
    this.primary = start;
    const key = `${cid}:${mode}`;
    const best = mode === 'drift' ? save.bestDrift[key] : save.bestLaps[key];
    this._screen('screen--setup', [
      this._header(c.name, `${modeLabel(mode)} · Step 3 of 3`),
      h('div', { className: 'setup' }, [
        Panel({ label: 'Race setup', raised: true, className: 'setup__panel', children: fields }),
        Panel({
          label: 'Circuit',
          className: 'setup__panel',
          children: [
            trackPreview(cid, 360, 220),
            h('div', { className: 'level-detail__row' }, [
              Stat({ label: 'Length', value: Math.round(circuitLength(cid)), unit: 'm', size: 'sm' }),
              Stat({ label: mode === 'drift' ? 'Best score' : 'Best lap', value: best ? (mode === 'drift' ? best : formatTime(best)) : '—', size: 'sm' }),
            ]),
            h('div', { className: 'level-detail__row' }, [Badge({ label: car.name, tone: 'info' }), Button({ label: 'Change car', variant: 'ghost', size: 'sm', onClick: () => this._go('garage', { returnTo: 'select' }) })]),
          ],
        }),
      ]),
      this._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => this.back() }), start]),
    ]);
  }

  _startSetup(mode) {
    this.click();
    const st = this.setup;
    const cfg = { circuitId: st.circuitId, mode, obstacles: st.obstacles !== false, moving: st.obstacles !== false };
    if (mode === 'grandprix') Object.assign(cfg, { laps: st.laps, opponents: st.opponents, difficulty: st.difficulty });
    else if (mode === 'timetrial') Object.assign(cfg, { laps: st.ttLaps, opponents: 0 });
    else if (mode === 'drift') {
      const lvl = getLevel(`${st.circuitId}-drift`);
      Object.assign(cfg, { laps: st.driftLaps, opponents: 0, target: levelTarget(lvl) });
    } else Object.assign(cfg, { laps: 0, opponents: 0 });
    this.game.startRace(cfg);
  }

  /** Segmented radio control (arrow keys move within it). */
  _segmented(label, options, value, onChange, fmt = (v) => String(v)) {
    const group = h('div', { className: 'segmented', attrs: { role: 'radiogroup', 'aria-label': label } });
    const opts = options.map((o) => {
      const b = h('button', { className: 'segmented__opt', text: fmt(o), attrs: { type: 'button', role: 'radio', 'aria-checked': o === value ? 'true' : 'false' } });
      b.addEventListener('click', () => {
        this.click();
        for (const x of opts) x.setAttribute('aria-checked', 'false');
        b.setAttribute('aria-checked', 'true');
        onChange(o);
      });
      return b;
    });
    group.append(...opts);
    return h('div', { className: 'field' }, [h('span', { className: 'field__label', text: label }), group]);
  }

  _range(label, value, onInput) {
    const out = h('span', { className: 'range-row__value', text: String(Math.round(value * 100)) });
    const input = h('input', { className: 'range', attrs: { type: 'range', min: 0, max: 100, step: 5, value: Math.round(value * 100), 'aria-label': label } });
    input.addEventListener('input', () => {
      const v = Number(input.value) / 100;
      setText(out, Math.round(v * 100));
      onInput(v);
    });
    return h('div', { className: 'field' }, [h('span', { className: 'field__label', text: label }), h('div', { className: 'range-row' }, [input, out])]);
  }

  // ------------------------------------------------------------------ garage

  _garage(state) {
    const save = this.game.save.data;
    const idx = CARS.findIndex((c) => c.id === save.carId);
    this.garageIndex = idx < 0 ? 0 : idx;
    this.back = () => this._leaveGarage(state);
    const nameEl = h('h1', { className: 't-display-2', text: '' });
    const tagEl = h('div', { className: 't-label-sm t-secondary', text: '' });
    const bars = STAT_LABELS.map(([, label]) => StatBar({ label, value: 1 }));
    const liveryRow = h('div', { className: 'livery-row', attrs: { role: 'radiogroup', 'aria-label': 'Livery' } });
    const lockEl = h('div', { className: 'garage__lock' });
    const select = Button({ label: 'Select car', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => this._selectCar(state) });
    select.dataset.autofocus = '';
    this.primary = select;
    const strip = h('div', { className: 'car-strip' });
    const prev = Button({ label: '◀ Prev', variant: 'secondary', size: 'sm', onClick: () => this._cycleCar(-1) });
    const next = Button({ label: 'Next ▶', variant: 'secondary', size: 'sm', onClick: () => this._cycleCar(1) });
    const panel = Panel({
      raised: true,
      className: 'garage__panel',
      children: [
        h('div', { className: 'garage__nav' }, [prev, h('span', { className: 't-label-xs t-secondary garage__count' }), next]),
        tagEl,
        nameEl,
        lockEl,
        h('div', { className: 'garage__stats' }, bars),
        h('div', { className: 't-label-xs t-secondary', text: 'Livery' }),
        liveryRow,
        h('div', { className: 'garage__actions' }, [select, Button({ label: 'Back', variant: 'secondary', size: 'lg', hotkey: 'Esc', onClick: () => this.back() })]),
        h('div', { className: 'garage__hint' }, [KeyHint({ keys: ['←', '→'], label: 'Car' }), KeyHint({ keys: ['Drag'], label: 'Rotate' })]),
      ],
    });
    this.garageEls = { nameEl, tagEl, bars, liveryRow, lockEl, select, strip, count: panel.querySelector('.garage__count') };
    this._screen('screen--garage', [
      this._header('Garage', state.returnTo === 'select' ? 'Choose your car' : 'Cars & liveries'),
      panel,
      strip,
    ]);
    this._refreshGarage();
  }

  _cycleCar(dir) {
    this.click();
    this.garageIndex = (this.garageIndex + dir + CARS.length) % CARS.length;
    this.garageLivery = null;
    this._refreshGarage();
  }

  _refreshGarage() {
    const els = this.garageEls;
    if (!els) return;
    const save = this.game.save.data;
    const car = CARS[this.garageIndex];
    const current = getCar(save.carId);
    const locked = !isCarUnlocked(save, car);
    const liveryId = this.garageLivery || save.livery[car.id] || car.defaultLivery;
    this.garageLivery = liveryId;
    setText(els.nameEl, car.name);
    setText(els.tagEl, car.tagline);
    setText(els.count, `${this.garageIndex + 1} / ${CARS.length}`);
    STAT_LABELS.forEach(([key], i) => els.bars[i].set(car.stats[key], car.id === current.id ? undefined : current.stats[key]));
    clear(els.lockEl);
    if (locked) els.lockEl.append(HazardBand({ text: `Unlock with ${car.unlock.stars} stars` }));
    else if (car.id === current.id) els.lockEl.append(Badge({ label: 'Equipped', tone: 'good' }));
    els.select.disabled = locked;
    els.select.setAttribute('aria-disabled', locked ? 'true' : 'false');
    // liveries
    clear(els.liveryRow);
    for (const l of LIVERIES) {
      const ok = isLiveryUnlocked(save, l.id, car);
      const sw = h('button', {
        className: `livery${l.id === liveryId ? ' is-selected' : ''}${ok ? '' : ' is-locked'}`,
        attrs: { type: 'button', role: 'radio', 'aria-checked': l.id === liveryId ? 'true' : 'false', 'aria-label': `${l.name}${ok ? '' : ' (locked)'}`, title: ok ? l.name : `${l.name} · ${LIVERY_UNLOCK[l.id] ?? 0} stars` },
      }, [h('span', { className: 'livery__a', style: { background: css(l.primary) } }), h('span', { className: 'livery__b', style: { background: css(l.secondary) } }), h('span', { className: 'livery__c', style: { background: css(l.accent) } })]);
      sw.addEventListener('click', () => {
        if (!ok) {
          this.toast(`${l.name} unlocks at ${LIVERY_UNLOCK[l.id] ?? 0} stars`, 'warn');
          return;
        }
        this.click();
        this.garageLivery = l.id;
        if (!locked) this.game.save.update((d) => (d.livery[car.id] = l.id));
        this._refreshGarage();
      });
      els.liveryRow.appendChild(sw);
    }
    // strip of all cars
    clear(els.strip);
    CARS.forEach((c, i) => {
      const lk = !isCarUnlocked(save, c);
      const card = CarCard({
        name: c.name,
        tagline: c.tagline,
        swatches: [css(LIVERIES.find((l) => l.id === (save.livery[c.id] || c.defaultLivery)).primary), css(LIVERIES.find((l) => l.id === (save.livery[c.id] || c.defaultLivery)).secondary)],
        locked: lk,
        lockText: lk ? `${c.unlock.stars} ★` : '',
        selected: i === this.garageIndex,
        onSelect: () => {
          this.click();
          this.garageIndex = i;
          this.garageLivery = null;
          this._refreshGarage();
        },
      });
      els.strip.appendChild(card);
    });
    if (this.game.garageScene) this.game.garageScene.setCar(car.id, liveryId, locked);
  }

  _selectCar(state) {
    const save = this.game.save.data;
    const car = CARS[this.garageIndex];
    if (!isCarUnlocked(save, car)) return;
    this.click();
    this.game.save.update((d) => {
      d.carId = car.id;
      if (this.garageLivery) d.livery[car.id] = this.garageLivery;
    });
    this.toast(`${car.name} selected`, 'good');
    this._leaveGarage(state);
  }

  _leaveGarage(state) {
    this.click();
    if (state.returnTo === 'select') this.game.store.go('select', { screen: state.mode === 'campaign' ? 'track' : 'setup' });
    else this.game.store.go('menu', { screen: 'main' });
  }

  // ------------------------------------------------------------------ loading

  _loading(state) {
    const cfg = state.raceConfig;
    const c = CIRCUITS[cfg.circuitId];
    const fill = h('div', { className: 'loading__fill' });
    const label = h('div', { className: 't-label-xs t-secondary loading__label', text: 'Preparing' });
    const pct = h('span', { className: 't-display-3', text: '0%' });
    this.tipIndex = (this.tipIndex + 1) % TIPS.length;
    this.loadingEls = { fill, label, pct };
    this._screen('screen--loading', [
      Panel({
        raised: true,
        className: 'loading',
        children: [
          h('div', { className: 't-label-sm t-secondary', text: `${modeLabel(cfg.mode)} · ${c.venue}` }),
          h('h1', { className: 't-display-1', text: c.name }),
          h('div', { className: 'loading__row' }, [h('div', { className: 'loading__bar' }, [fill]), pct]),
          label,
          h('p', { className: 't-body loading__tip', text: TIPS[this.tipIndex] }),
        ],
      }),
    ]);
  }

  setLoading(p, label) {
    const els = this.loadingEls;
    if (!els) return;
    els.fill.style.transform = `scaleX(${Math.max(0, Math.min(1, p)).toFixed(3)})`;
    setText(els.label, label);
    setText(els.pct, `${Math.round(p * 100)}%`);
  }

  // ------------------------------------------------------------------ pause

  _pause() {
    const race = this.game.race;
    const mode = race ? race.config.mode : 'practice';
    const resume = Button({ label: 'Resume', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => this._resume() });
    resume.dataset.autofocus = '';
    this.primary = resume;
    this.back = () => this._resume();
    const canEnd = mode === 'practice' || mode === 'timetrial';
    this._screen('screen--pause', [
      Panel({
        raised: true,
        className: 'pause',
        children: [
          h('div', { className: 't-label-sm t-secondary', text: `${modeLabel(mode)} · ${race ? race.def.name : ''}` }),
          h('h1', { className: 't-display-1', text: 'Paused' }),
          HazardBand({}),
          h('div', { className: 'pause__actions' }, [
            resume,
            Button({ label: 'Restart', variant: 'secondary', size: 'md', hotkey: 'R', onClick: () => this._restart() }),
            canEnd ? Button({ label: 'End session', variant: 'secondary', size: 'md', onClick: () => this._endSession() }) : null,
            Button({ label: 'Settings', variant: 'ghost', size: 'md', onClick: () => this.openSettings() }),
            Button({ label: 'Controls', variant: 'ghost', size: 'md', onClick: () => this.openControls() }),
            Button({ label: 'Quit to menu', variant: 'ghost', size: 'md', onClick: () => this._confirmQuit() }),
          ]),
        ],
      }),
    ]);
  }

  _resume() {
    this.click();
    this.game.resume();
  }

  _restart() {
    this.click();
    this.game.restartRace();
  }

  _endSession() {
    this.click();
    this.game.endSession();
  }

  _confirmQuit() {
    this.openOverlay(
      ConfirmDialog({
        title: 'Quit race?',
        message: 'Progress in this race will be lost.',
        confirmLabel: 'Quit',
        onConfirm: () => {
          this.closeOverlay();
          this.click();
          this.game.quitToMenu();
        },
        onCancel: () => this.closeOverlay(),
      }),
    );
  }

  // ------------------------------------------------------------------ results

  _results(state) {
    renderResults(this, state);
  }

  // ------------------------------------------------------------------ overlays

  openOverlay(el) {
    this.closeOverlay(false);
    const wrap = h('div', { className: 'overlay', attrs: { role: 'dialog', 'aria-modal': 'true' } }, [el]);
    this.root.appendChild(wrap);
    this.overlay = wrap;
    const f = wrap.querySelector('[data-autofocus]') || wrap.querySelector(FOCUSABLE);
    if (f) f.focus({ preventScroll: true });
  }

  closeOverlay(refocus = true) {
    if (!this.overlay) return;
    if (this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
    this.overlay = null;
    if (this.capturing) {
      this.game.input.captureNext = null;
      this.capturing = false;
    }
    if (refocus) {
      const f = this.layer.querySelector('[data-autofocus]') || this.primary;
      if (f) f.focus({ preventScroll: true });
    }
  }

  openSettings() {
    this.click();
    const game = this.game;
    const save = game.save;
    const s = save.data.settings;
    const set = (fn) => save.update((d) => fn(d.settings));
    const body = h('div', { className: 'settings' });
    const sections = [
      [
        'Graphics',
        [
          this._segmented('Quality', ['low', 'medium', 'high'], s.quality, (v) => {
            set((x) => (x.quality = v));
            game.applyQuality(v, s.adaptiveQuality);
          }, cap),
          this._segmented('Adaptive', ['on', 'off'], s.adaptiveQuality ? 'on' : 'off', (v) => {
            set((x) => (x.adaptiveQuality = v === 'on'));
            game.applyQuality(save.data.settings.quality, v === 'on');
          }, cap),
        ],
      ],
      [
        'Audio',
        [
          this._range('Master', s.master, (v) => {
            set((x) => (x.master = v));
            game.audio.setVolumes({ master: v });
          }),
          this._range('Effects', s.sfx, (v) => {
            set((x) => (x.sfx = v));
            game.audio.setVolumes({ sfx: v });
          }),
          this._range('Music', s.music, (v) => {
            set((x) => (x.music = v));
            game.audio.setVolumes({ music: v });
          }),
          this._segmented('Sound', ['on', 'off'], s.muted ? 'off' : 'on', (v) => {
            set((x) => (x.muted = v === 'off'));
            game.audio.setVolumes({ muted: v === 'off' });
          }, cap),
        ],
      ],
      [
        'Gameplay',
        [
          this._segmented('Camera', ['chase', 'close', 'cockpit', 'tv'], s.camera, (v) => set((x) => (x.camera = v)), (v) => CAMERA_LABELS[v]),
          this._segmented('Drift assist', ['easy', 'medium', 'hard'], s.assists, (v) => set((x) => (x.assists = v)), (v) => ({ easy: 'Strong', medium: 'Normal', hard: 'Light' })[v]),
          this._segmented('Units', ['kmh', 'mph'], s.units, (v) => set((x) => (x.units = v)), (v) => (v === 'kmh' ? 'km/h' : 'mph')),
          this._segmented('Mini-map', ['on', 'off'], s.showMinimap ? 'on' : 'off', (v) => set((x) => (x.showMinimap = v === 'on')), cap),
          this._segmented('Free play', ['off', 'on'], s.freePlay ? 'on' : 'off', (v) => set((x) => (x.freePlay = v === 'on')), (v) => (v === 'on' ? 'All unlocked' : 'Off')),
        ],
      ],
    ];
    for (const [title, fields] of sections) body.appendChild(h('section', { className: 'settings__section' }, [h('h2', { className: 't-label-sm t-secondary', text: title }), ...fields]));
    // key rebinding
    const bindRows = h('div', { className: 'bindings' });
    const renderBinds = () => {
      clear(bindRows);
      for (const action of InputManager.rebindable) {
        const keys = game.input.bindings[action];
        const btn = h('button', { className: 'bind-btn', attrs: { type: 'button', 'aria-label': `Rebind ${ACTION_LABELS[action]}` } }, keys.map((k) => Kbd(keyLabel(k))));
        btn.addEventListener('click', () => {
          this.click();
          clear(btn);
          btn.appendChild(h('span', { className: 't-label-xs t-warn', text: 'Press a key… (Esc cancels)' }));
          this.capturing = true;
          game.input.captureKey((code) => {
            this.capturing = false;
            if (code) {
              const custom = { ...save.data.settings.bindings };
              for (const a of InputManager.rebindable) {
                const list = (custom[a] || game.input.bindings[a]).filter((c) => c !== code);
                custom[a] = list;
              }
              custom[action] = [code, ...(game.input.bindings[action] || []).filter((c) => c !== code)].slice(0, 2);
              set((x) => (x.bindings = custom));
              game.input.setBindings(custom);
            }
            renderBinds();
            btn.focus();
          });
        });
        bindRows.appendChild(h('div', { className: 'field' }, [h('span', { className: 'field__label', text: ACTION_LABELS[action] }), btn]));
      }
      bindRows.appendChild(
        h('div', { className: 'settings__row' }, [
          Button({
            label: 'Reset keys',
            variant: 'ghost',
            size: 'sm',
            onClick: () => {
              set((x) => (x.bindings = null));
              game.input.setBindings(null);
              renderBinds();
            },
          }),
        ]),
      );
    };
    renderBinds();
    body.appendChild(h('section', { className: 'settings__section' }, [h('h2', { className: 't-label-sm t-secondary', text: 'Keyboard' }), bindRows]));
    body.appendChild(
      h('section', { className: 'settings__section' }, [
        h('h2', { className: 't-label-sm t-secondary', text: 'Progress' }),
        h('p', { className: 't-body', text: game.save.available ? 'Progress is saved in this browser.' : 'Browser storage is blocked: progress lasts until you close the tab.' }),
        Button({ label: 'Reset progress', variant: 'secondary', size: 'sm', onClick: () => this._confirmReset() }),
      ]),
    );
    const done = Button({ label: 'Done', variant: 'primary', size: 'md', hotkey: 'Esc', onClick: () => this._closeSub() });
    const panel = Panel({ label: 'Settings', raised: true, className: 'sub-panel', children: [body, h('div', { className: 'sub-panel__actions' }, [done])] });
    this.openOverlay(panel);
    this.overlayBack = () => this._closeSub();
  }

  _closeSub() {
    this.click();
    this.closeOverlay();
    const st = this.game.store.state;
    if (st.phase === 'menu' && st.screen !== 'main') this.game.store.set({ screen: 'main' });
    if (st.phase === 'menu') this.render(this.game.store.state);
  }

  _confirmReset() {
    this.openOverlay(
      ConfirmDialog({
        title: 'Reset progress?',
        message: 'All stars, best laps, records and unlocks will be erased. Settings are kept. This cannot be undone.',
        confirmLabel: 'Erase progress',
        onConfirm: () => {
          this.game.save.reset();
          this.closeOverlay();
          this.toast('Progress reset', 'warn');
          if (this.game.store.phase === 'menu') this.render(this.game.store.state);
        },
        onCancel: () => {
          this.closeOverlay();
          this.openSettings();
        },
      }),
    );
    this.overlayBack = () => {
      this.closeOverlay();
      this.openSettings();
    };
  }

  openControls() {
    this.click();
    const b = this.game.input.bindings;
    const row = (label, keys) => h('tr', {}, [h('th', { text: label }), h('td', {}, keys.map((k) => Kbd(k)))]);
    const kb = h('table', { className: 'kv kv--wide' }, [
      row('Throttle', b.throttle.map(keyLabel)),
      row('Brake / reverse', b.brake.map(keyLabel)),
      row('Steer', [...b.left.map(keyLabel), ...b.right.map(keyLabel)]),
      row('Handbrake / drift', b.handbrake.map(keyLabel)),
      row('Drift boost', b.boost.map(keyLabel)),
      row('Camera', b.camera.map(keyLabel)),
      row('Reset (hold: restart)', b.reset.map(keyLabel)),
      row('Pause', DEFAULT_BINDINGS.pause.map(keyLabel)),
      row('Mute', ['M']),
      row('Debug overlay', ['F3']),
    ]);
    const gp = h('table', { className: 'kv kv--wide' }, [
      row('Throttle / brake', ['RT', 'LT']),
      row('Steer', ['L-stick']),
      row('Drift', ['A']),
      row('Boost', ['X', 'RB']),
      row('Camera', ['B']),
      row('Reset (hold: restart)', ['Y']),
      row('Pause', ['Start']),
    ]);
    const done = Button({ label: 'Done', variant: 'primary', size: 'md', hotkey: 'Esc', onClick: () => this._closeSub() });
    const panel = Panel({
      label: 'Controls',
      raised: true,
      className: 'sub-panel',
      children: [
        h('div', { className: 'controls-guide' }, [
          h('section', {}, [h('h2', { className: 't-label-sm t-secondary', text: 'Keyboard' }), kb]),
          h('section', {}, [h('h2', { className: 't-label-sm t-secondary', text: 'Gamepad' }), gp, h('h2', { className: 't-label-sm t-secondary', text: 'Touch' }), h('p', { className: 't-body', text: 'On touch screens, on-screen buttons appear during a race: steer on the left, gas / brake / drift / boost on the right.' })]),
          h('section', {}, [
            h('h2', { className: 't-label-sm t-secondary', text: 'Drifting' }),
            h('p', { className: 't-body', text: 'Turn in and tap the handbrake (or brake hard) to break the rear loose. Keep the throttle on to hold the slide; steer into it to widen the angle, counter-steer to straighten. Points bank when you straighten; hitting a wall or leaving the track loses the unbanked points.' }),
          ]),
        ]),
        h('div', { className: 'sub-panel__actions' }, [done]),
      ],
    });
    this.openOverlay(panel);
    this.overlayBack = () => this._closeSub();
  }

  // ------------------------------------------------------------------ input

  _focusables() {
    const scope = this.overlay || this.layer;
    return Array.from(scope.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null);
  }

  _moveFocus(dir) {
    const list = this._focusables();
    if (!list.length) return;
    const i = list.indexOf(document.activeElement);
    const next = i < 0 ? list[0] : list[(i + dir + list.length) % list.length];
    next.focus({ preventScroll: false });
    this.game.audio.play('hover');
  }

  _activePhaseIsMenu() {
    const p = this.game.store.phase;
    return p === 'menu' || p === 'select' || p === 'garage' || p === 'paused' || p === 'results';
  }

  _onKey(e) {
    if (this.capturing) return;
    if (!this._activePhaseIsMenu() && !this.overlay) return;
    const tag = document.activeElement && document.activeElement.tagName;
    const inRange = tag === 'INPUT';
    if (e.key === 'Escape' || (e.key === 'p' && this.game.store.phase === 'paused' && !this.overlay)) {
      e.preventDefault();
      if (this.overlay) {
        if (this.overlayBack) this.overlayBack();
        else this.closeOverlay();
      } else if (this.back) this.back();
      return;
    }
    if (e.key === 'Enter') {
      const a = document.activeElement;
      const inside = a && (this.layer.contains(a) || (this.overlay && this.overlay.contains(a)));
      if (inside && (a.tagName === 'BUTTON' || a.getAttribute('role') === 'radio')) return; // native click
      if (!this.overlay && this.primary && !this.primary.disabled) {
        e.preventDefault();
        this.primary.click();
      }
      return;
    }
    if (this.game.store.phase === 'garage' && !this.overlay && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !inRange) {
      const a = document.activeElement;
      if (!a || !a.closest || !a.closest('.livery-row, .segmented')) {
        e.preventDefault();
        this._cycleCar(e.key === 'ArrowLeft' ? -1 : 1);
        return;
      }
    }
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key) && !inRange) {
      e.preventDefault();
      // inside a radio group, left/right move within the group
      const a = document.activeElement;
      const group = a && a.closest && a.closest('.segmented, .livery-row');
      if (group && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        const opts = Array.from(group.querySelectorAll('button'));
        const i = opts.indexOf(a);
        const n = opts[(i + (e.key === 'ArrowLeft' ? -1 : 1) + opts.length) % opts.length];
        n.focus();
        n.click();
        return;
      }
      this._moveFocus(e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1);
    }
  }

  /** Per-frame: gamepad navigation + toasts + garage orbit. */
  frame(dt) {
    this.toasts.update(dt);
    const nav = this.game.input.consumeNav();
    if (!nav || (!this._activePhaseIsMenu() && !this.overlay)) return;
    if (nav === 'confirm') {
      const a = document.activeElement;
      if (a && a.tagName === 'BUTTON' && (this.layer.contains(a) || (this.overlay && this.overlay.contains(a)))) a.click();
      else if (this.primary) this.primary.click();
    } else if (nav === 'back') {
      if (this.overlay) {
        if (this.overlayBack) this.overlayBack();
        else this.closeOverlay();
      } else if (this.back) this.back();
    } else if (this.game.store.phase === 'garage' && (nav === 'left' || nav === 'right') && !this.overlay) {
      this._cycleCar(nav === 'left' ? -1 : 1);
    } else this._moveFocus(nav === 'down' || nav === 'right' ? 1 : -1);
  }
}

function cap(v) {
  const s = String(v);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function difficultyLabel(d) {
  return ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'][d] || 'Intermediate';
}

function circuitLength(cid) {
  return circuitModel(cid).length;
}
