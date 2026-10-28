import { h, setText, setClass, setStyle } from './dom.js';
import { Panel } from './components/Panel.js';
import { Stat } from './components/Stat.js';
import { Badge } from './components/Badge.js';
import { HazardBand } from './components/HazardBand.js';
import { KeyHint } from './components/KeyHint.js';
import { ToastStack } from './components/Toast.js';
import { formatTime, formatDelta } from '../race/LapTimer.js';
import { keyLabel, SPLIT_SCHEMES } from '../controls/InputManager.js';

const RPM_SEGMENTS = 16;

/**
 * Race HUD: a transparent overlay (pointer-events: none) with stat clusters
 * in the corners. `update(d)` only touches the DOM when a value changes.
 */
export class RaceHUD {
  /**
   * rect: [x, y, w, h] screen fractions for a split-screen view (null = full
   * screen); compact: small-view layout; label: player tag; device: input
   * device (key hints); speedbreak: show the speedbreaker gauge.
   */
  constructor(root, { mode, laps, opponents, units = 'kmh', touch = false, bindings, onTouch, onPause, rect = null, compact = false, label = null, device = 'all', speedbreak = false }) {
    this.mode = mode;
    this.units = units;
    this.el = h('div', { className: `hud layer-passive${rect ? ' hud--split' : ''}${compact ? ' hud--compact' : ''}`, attrs: { 'aria-live': 'off' } });
    if (rect) Object.assign(this.el.style, { left: `${rect[0] * 100}%`, top: `${rect[1] * 100}%`, width: `${rect[2] * 100}%`, height: `${rect[3] * 100}%`, right: 'auto', bottom: 'auto' });
    root.appendChild(this.el);
    if (label) this.el.appendChild(h('div', { className: 'hud__player', text: label }));

    // top-left: position + lap
    this.posStat = Stat({ label: 'Pos', value: '-', unit: `/ ${opponents + 1}`, size: 'lg' });
    this.lapStat = Stat({ label: 'Lap', value: '-', unit: laps > 0 ? `/ ${laps}` : '', size: 'lg' });
    this.modeBadge = Badge({ label: modeLabel(mode), tone: 'solid' });
    const tl = Panel({ translucent: true, className: 'hud__tl', children: [h('div', { className: 'hud__row' }, [opponents > 0 ? this.posStat : null, this.lapStat]), this.modeBadge] });
    this.el.appendChild(tl);

    // top-right: timing
    this.lapTime = Stat({ label: 'Lap time', value: formatTime(0), size: 'md', align: 'right' });
    this.lastStat = Stat({ label: 'Last', value: formatTime(0), size: 'sm', align: 'right' });
    this.bestStat = Stat({ label: 'Best', value: formatTime(0), size: 'sm', align: 'right' });
    this.deltaEl = h('div', { className: 'hud__delta' });
    this.sectorEls = [0, 1, 2].map((i) => h('span', { className: 'hud__sector', text: `S${i + 1}` }));
    this.targetStat = Stat({ label: 'Target', value: '', size: 'sm', align: 'right' });
    const tr = Panel({
      translucent: true,
      className: 'hud__tr',
      children: [this.lapTime, this.deltaEl, h('div', { className: 'hud__sectors' }, this.sectorEls), h('div', { className: 'hud__row hud__row--right' }, [this.lastStat, this.bestStat]), this.targetStat],
    });
    this.el.appendChild(tr);
    this.targetStat.style.display = 'none';

    // bottom-centre: speed / gear / rpm
    this.speedVal = h('span', { className: 'hud__speed-value', text: '0' });
    this.speedUnit = h('span', { className: 'hud__speed-unit', text: units === 'mph' ? 'MPH' : 'KM/H' });
    this.gearVal = h('span', { className: 'hud__gear', text: 'N' });
    this.rpmSegs = [];
    for (let i = 0; i < RPM_SEGMENTS; i++) {
      const seg = h('span', { className: 'hud__rpm-seg' + (i >= RPM_SEGMENTS - 4 ? ' is-red' : i >= RPM_SEGMENTS - 8 ? ' is-mid' : '') });
      this.rpmSegs.push(seg);
    }
    const scheme = SPLIT_SCHEMES[device];
    const b0 = bindings || {};
    const keyOf = (a, fb) => (scheme && scheme[a] ? keyLabel(scheme[a][0]) : device.startsWith('pad') ? fb.pad : b0[a] && b0[a][0] ? keyLabel(b0[a][0]) : fb.key);
    this.boostFill = h('div', { className: 'hud__boost-fill' });
    this.boostWrap = h('div', { className: 'hud__boost', attrs: { title: 'Nitro: hold to burn. Refills from drifts, near misses, slipstream and flat-out speed.' } }, [
      h('span', { className: 'hud__boost-label', text: `Nitro ${keyOf('boost', { key: 'Shift', pad: 'X' })}` }),
      h('div', { className: 'hud__boost-track' }, [this.boostFill]),
    ]);
    this.sbFill = h('div', { className: 'hud__boost-fill hud__sb-fill' });
    this.sbWrap = speedbreak
      ? h('div', { className: 'hud__boost hud__sb', attrs: { title: 'Speedbreaker: slow motion. Refills while drifting or flat out.' } }, [
          h('span', { className: 'hud__boost-label', text: `Speedbreaker ${keyOf('speedbreak', { key: 'Q', pad: 'LB' })}` }),
          h('div', { className: 'hud__boost-track' }, [this.sbFill]),
        ])
      : null;
    const bc = h('div', { className: 'hud__bc' }, [
      h('div', { className: 'hud__rpm' }, this.rpmSegs),
      h('div', { className: 'hud__speed-row' }, [h('div', { className: 'hud__speed' }, [this.speedVal, this.speedUnit]), h('div', { className: 'hud__gear-box' }, [h('span', { className: 'hud__gear-label', text: 'Gear' }), this.gearVal])]),
      this.boostWrap,
      this.sbWrap,
    ]);
    this.el.appendChild(bc);
    // speedbreaker vignette
    this.slowmo = h('div', { className: 'hud__slowmo' });
    this.el.appendChild(this.slowmo);

    // drift cluster (centre)
    this.driftBanner = h('div', { className: 'hud__drift-banner', text: 'Drift' });
    this.driftPts = h('div', { className: 'hud__drift-points', text: '0' });
    this.driftMult = h('div', { className: 'hud__drift-mult', text: '×1' });
    this.driftZone = Badge({ label: 'Drift zone ×2', tone: 'good' });
    this.drift = h('div', { className: 'hud__drift' }, [this.driftBanner, h('div', { className: 'hud__drift-row' }, [this.driftPts, this.driftMult]), this.driftZone]);
    this.el.appendChild(this.drift);

    // bottom-right: drift total / tokens
    this.scoreStat = Stat({ label: 'Drift score', value: '0', size: 'md', align: 'right' });
    this.tokenStat = Stat({ label: 'Tokens', value: '0', size: 'sm', align: 'right' });
    const br = Panel({ translucent: true, className: 'hud__br', children: [this.scoreStat, this.tokenStat] });
    this.el.appendChild(br);

    // mini-map holder (bottom-left)
    this.mapHolder = h('div', { className: 'hud__map' });
    this.el.appendChild(this.mapHolder);

    // centre messages
    this.center = h('div', { className: 'hud__center' });
    this.bigText = h('div', { className: 'hud__big' });
    this.subText = h('div', { className: 'hud__sub' });
    this.wrongWay = HazardBand({ text: 'Wrong way', tone: 'amber', size: 'lg', className: 'hud__wrongway' });
    this.center.append(this.bigText, this.subText, this.wrongWay);
    this.el.appendChild(this.center);
    this.bigTimer = 0;

    // countdown lights
    this.lights = [];
    for (let i = 0; i < 5; i++) this.lights.push(h('span', { className: 'hud__light' }));
    this.lightsEl = h('div', { className: 'hud__lights', attrs: { 'aria-hidden': 'true' } }, this.lights);
    this.el.appendChild(this.lightsEl);

    // reset-hold progress
    this.holdFill = h('div', { className: 'hud__hold-fill' });
    this.hold = h('div', { className: 'hud__hold' }, [h('span', { className: 'hud__hold-label', text: 'Hold to restart' }), h('div', { className: 'hud__hold-track' }, [this.holdFill])]);
    this.el.appendChild(this.hold);

    // key hints (fade out after the start)
    const kk = (a, fb) => keyOf(a, fb);
    this.hints = h('div', { className: 'hud__hints' }, [
      KeyHint({ keys: scheme ? [kk('throttle', {}), kk('brake', {})] : device.startsWith('pad') ? ['RT', 'LT'] : [keyOf('throttle', { key: 'W' }), keyOf('brake', { key: 'S' })], label: 'Drive' }),
      KeyHint({ keys: scheme ? [kk('left', {}), kk('right', {})] : device.startsWith('pad') ? ['L-stick'] : [keyOf('left', { key: 'A' }), keyOf('right', { key: 'D' })], label: 'Steer' }),
      KeyHint({ keys: [keyOf('handbrake', { key: 'Space', pad: 'A' })], label: 'Drift' }),
      KeyHint({ keys: [keyOf('boost', { key: 'Shift', pad: 'X' })], label: 'Nitro' }),
      speedbreak ? KeyHint({ keys: [keyOf('speedbreak', { key: 'Q', pad: 'LB' })], label: 'Slow-mo' }) : null,
      KeyHint({ keys: [keyOf('camera', { key: 'C', pad: 'B' })], label: 'Camera' }),
      rect ? null : KeyHint({ keys: ['Esc'], label: 'Pause' }),
    ]);
    this.el.appendChild(this.hints);
    this.hintTime = 9;

    this.toasts = new ToastStack(this.el);

    // touch controls
    this.touchEl = null;
    if (touch) this._buildTouch(onTouch, onPause);

    this.brPanel = br;
    if (mode !== 'drift') setStyle(br, 'display', 'none');
    this.showDriftScore = mode === 'drift';
    this.lastDriftVisible = null;
  }

  _buildTouch(onTouch, onPause) {
    const btn = (label, key, cls) => {
      const el = h('button', { className: `touch-btn ${cls || ''}`, text: label, attrs: { type: 'button', 'aria-label': key } });
      const set = (v) => onTouch(key, v);
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-down');
        set(true);
      });
      const up = (e) => {
        e.preventDefault();
        el.classList.remove('is-down');
        set(false);
      };
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('lostpointercapture', up);
      return el;
    };
    const pause = h('button', { className: 'touch-btn touch-btn--pause', text: 'II', attrs: { type: 'button', 'aria-label': 'Pause' } });
    pause.addEventListener('click', () => onPause());
    this.touchEl = h('div', { className: 'touch' }, [
      h('div', { className: 'touch__left' }, [btn('◀', 'left'), btn('▶', 'right')]),
      h('div', { className: 'touch__right' }, [h('div', { className: 'touch__col' }, [btn('Drift', 'handbrake', 'touch-btn--sm'), btn('Boost', 'boost', 'touch-btn--sm')]), h('div', { className: 'touch__col' }, [btn('Gas', 'throttle', 'touch-btn--tall'), btn('Brake', 'brake')])]),
      pause,
    ]);
    this.el.appendChild(this.touchEl);
  }

  setMiniMap(map) {
    this.mapHolder.appendChild(map.canvas);
  }

  setMiniMapVisible(on) {
    setStyle(this.mapHolder, 'display', on ? '' : 'none');
  }

  /** Big centre message for `dur` seconds. tone: '' | 'good' | 'info' | 'warn' | 'hazard'. */
  flash(text, sub = '', tone = '', dur = 1.6) {
    this.bigText.textContent = text;
    this.bigText.className = 'hud__big' + (tone ? ` hud__big--${tone}` : '');
    this.subText.textContent = sub;
    this.bigTimer = dur;
    setClass(this.center, 'is-visible', true);
  }

  toast(text, tone) {
    this.toasts.show(text, tone);
  }

  setLights(n, visible) {
    setClass(this.lightsEl, 'is-visible', visible);
    for (let i = 0; i < 5; i++) setClass(this.lights[i], 'is-on', i < n);
  }

  /** d: per-frame data from the race scene. */
  update(d, dt) {
    const speed = this.units === 'mph' ? d.speed * 2.23694 : d.speed * 3.6;
    setText(this.speedVal, Math.round(Math.abs(speed)));
    setText(this.gearVal, d.gear === 0 ? 'R' : d.speed < 0.5 && d.throttle < 0.05 ? 'N' : String(d.gear));
    const lit = Math.round(((d.rpm - 4200) / (12500 - 4200)) * RPM_SEGMENTS);
    const limiter = d.rpm > 12100;
    for (let i = 0; i < RPM_SEGMENTS; i++) setClass(this.rpmSegs[i], 'is-on', i < lit);
    setClass(this.el, 'is-limiter', limiter);
    setStyle(this.boostFill, 'transform', `scaleX(${d.boostMeter.toFixed(2)})`);
    setClass(this.boostWrap, 'is-ready', d.boostMeter >= 0.15);
    setClass(this.boostWrap, 'is-active', !!d.nitroActive || d.boosting);
    if (this.sbWrap && d.speedbreak >= 0) {
      setStyle(this.sbFill, 'transform', `scaleX(${d.speedbreak.toFixed(2)})`);
      setClass(this.sbWrap, 'is-ready', d.speedbreak > 0.15);
      setClass(this.sbWrap, 'is-active', !!d.slowmo);
    }
    setClass(this.slowmo, 'is-on', !!d.slowmo);

    setText(this.posStat.valueEl, d.position > 0 ? d.position : '-');
    setText(this.lapStat.valueEl, d.lap > 0 ? d.lap : '-');
    this.lapTime.set(d.lapTime > 0 ? formatTime(d.lapTime) : '0:00.000');
    this.lastStat.set(formatTime(d.lastLap));
    this.bestStat.set(formatTime(d.bestLap));
    const delta = formatDelta(d.delta);
    setText(this.deltaEl, delta);
    setClass(this.deltaEl, 'is-good', d.delta !== null && d.delta < 0);
    setClass(this.deltaEl, 'is-bad', d.delta !== null && d.delta >= 0);
    for (let i = 0; i < 3; i++) {
      const st = d.sectors[i];
      setClass(this.sectorEls[i], 'is-best', st === 'best');
      setClass(this.sectorEls[i], 'is-done', st === 'slow');
    }
    if (d.target) {
      setStyle(this.targetStat, 'display', '');
      this.targetStat.setLabel(d.target.label);
      this.targetStat.set(d.target.value);
      this.targetStat.setHazard(!!d.target.hazard);
    } else setStyle(this.targetStat, 'display', 'none');

    // drift cluster
    const showDrift = d.driftActive || d.driftPoints > 0;
    if (showDrift !== this.lastDriftVisible) {
      this.lastDriftVisible = showDrift;
      setClass(this.drift, 'is-visible', showDrift);
    }
    setText(this.driftPts, Math.round(d.driftPoints));
    setText(this.driftMult, `×${d.driftMultiplier}`);
    setClass(this.driftBanner, 'is-live', d.driftActive);
    setStyle(this.driftZone, 'display', d.inDriftZone ? '' : 'none');
    if (this.showDriftScore || d.driftTotal > 0) {
      if (this.brPanel.style.display === 'none') setStyle(this.brPanel, 'display', '');
      this.scoreStat.set(Math.round(d.driftTotal));
    }
    this.tokenStat.set(`${d.tokens}/${d.tokensTotal}`);
    setStyle(this.tokenStat, 'display', d.tokensTotal > 0 ? '' : 'none');

    // wrong way
    setClass(this.wrongWay, 'is-visible', d.wrongWay);
    setClass(this.center, 'has-wrongway', d.wrongWay);

    // reset hold
    setClass(this.hold, 'is-visible', d.resetHold > 0.12);
    setStyle(this.holdFill, 'transform', `scaleX(${Math.min(1, d.resetHold).toFixed(2)})`);

    // centre flash timer
    if (this.bigTimer > 0) {
      this.bigTimer -= dt;
      if (this.bigTimer <= 0) setClass(this.center, 'is-visible', false);
    }
    if (this.hintTime > 0) {
      this.hintTime -= dt;
      if (this.hintTime <= 0) setClass(this.hints, 'is-hidden', true);
    }
    this.toasts.update(dt);
  }

  dispose() {
    this.toasts.dispose();
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }
}

export function modeLabel(mode) {
  return { practice: 'Practice', timetrial: 'Time trial', grandprix: 'Grand Prix', timeattack: 'Time attack', drift: 'Drift challenge' }[mode] || mode;
}
