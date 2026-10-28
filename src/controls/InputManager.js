// Keyboard + Standard Gamepad + on-screen touch controls.
//
// Single player: every device is merged into one analog driving state
// (`state`). Split-screen: each player reads one device through
// `deviceState(device)` — 'kbA' (WASD set), 'kbB' (arrow set) or 'pad0'..'pad3'
// — and per-device press edges through `consumeDevice(device, action)`.
// Global press edges (pause, mute…) are queued per action. Everything is
// released on blur / visibility change.

export const DEFAULT_BINDINGS = Object.freeze({
  throttle: ['KeyW', 'ArrowUp'],
  brake: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  handbrake: ['Space'],
  boost: ['ShiftLeft', 'ShiftRight', 'KeyN'],
  speedbreak: ['KeyQ'],
  camera: ['KeyC'],
  reset: ['KeyR', 'Backspace'],
  pause: ['Escape', 'KeyP'],
  mute: ['KeyM'],
  debug: ['F3'],
});

export const ACTION_LABELS = Object.freeze({
  throttle: 'Throttle',
  brake: 'Brake / reverse',
  left: 'Steer left',
  right: 'Steer right',
  handbrake: 'Handbrake / drift',
  boost: 'Nitro (hold)',
  speedbreak: 'Speedbreaker',
  camera: 'Camera',
  reset: 'Reset (hold: restart)',
  pause: 'Pause',
  mute: 'Mute',
  debug: 'Debug overlay',
});

const REBINDABLE = ['throttle', 'brake', 'left', 'right', 'handbrake', 'boost', 'speedbreak', 'camera', 'reset'];

/** Fixed keyboard halves for split-screen (two players on one keyboard). */
export const SPLIT_SCHEMES = Object.freeze({
  kbA: { throttle: ['KeyW'], brake: ['KeyS'], left: ['KeyA'], right: ['KeyD'], handbrake: ['Space'], boost: ['ShiftLeft'], camera: ['KeyC'], reset: ['KeyR'] },
  kbB: { throttle: ['ArrowUp'], brake: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], handbrake: ['ControlRight', 'Numpad0'], boost: ['ShiftRight', 'Enter'], camera: ['Slash'], reset: ['Period'] },
});

export const DEVICE_LABELS = Object.freeze({
  all: 'Keyboard / pad',
  kbA: 'Keyboard WASD',
  kbB: 'Keyboard arrows',
  pad0: 'Gamepad 1',
  pad1: 'Gamepad 2',
  pad2: 'Gamepad 3',
  pad3: 'Gamepad 4',
});

// Standard gamepad mapping
const GP = { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, BACK: 8, START: 9, UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15 };
const DEAD_ZONE = 0.15;
const MAX_PADS = 4;

export function keyLabel(code) {
  if (!code) return '—';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map = { ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Space: 'Space', ShiftLeft: 'Shift', ShiftRight: 'R-Shift', Escape: 'Esc', Backspace: 'Bksp', Enter: 'Enter', ControlLeft: 'Ctrl', ControlRight: 'R-Ctrl', AltLeft: 'Alt', Tab: 'Tab', Slash: '/', Period: '.', Numpad0: 'Num0' };
  return map[code] || code;
}

function blankPad() {
  return { connected: false, throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false, resetHeld: false, prev: [], prevStick: null };
}

export class InputManager {
  constructor(target = window) {
    this.target = target;
    this.down = new Set();
    this.pressQueue = new Map(); // action -> count (global)
    this.devicePress = new Map(); // `${device}:${action}` -> count
    this.holdStart = new Map(); // action -> time (s) when held
    this.time = 0;
    this.enabled = true;
    this.captureNext = null; // rebinding callback
    this.setBindings(null);
    this.state = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false };
    this.touch = { throttle: 0, brake: 0, left: 0, right: 0, handbrake: false, boost: false };
    this.pads = Array.from({ length: MAX_PADS }, blankPad);
    this.gamepad = this.pads[0]; // merged single-player view uses the first connected pad
    this.devStates = new Map();
    this.navQueue = [];
    this.lastDevice = 'keyboard';
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onVisibility = this._onVisibility.bind(this);
    target.addEventListener('keydown', this._onKeyDown);
    target.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
    document.addEventListener('visibilitychange', this._onVisibility);
    // split-scheme code → [device, action] lookups
    this.splitCodes = new Map();
    for (const dev of Object.keys(SPLIT_SCHEMES)) {
      for (const action of Object.keys(SPLIT_SCHEMES[dev])) {
        for (const code of SPLIT_SCHEMES[dev][action]) {
          if (!this.splitCodes.has(code)) this.splitCodes.set(code, []);
          this.splitCodes.get(code).push([dev, action]);
        }
      }
    }
  }

  setBindings(custom) {
    const b = {};
    for (const k of Object.keys(DEFAULT_BINDINGS)) b[k] = DEFAULT_BINDINGS[k].slice();
    if (custom) {
      for (const k of REBINDABLE) {
        if (Array.isArray(custom[k]) && custom[k].length) b[k] = custom[k].slice(0, 3);
      }
    }
    this.bindings = b;
    this.codeToActions = new Map();
    for (const action of Object.keys(b)) {
      for (const code of b[action]) {
        if (!this.codeToActions.has(code)) this.codeToActions.set(code, []);
        this.codeToActions.get(code).push(action);
      }
    }
  }

  static get rebindable() {
    return REBINDABLE;
  }

  /** Start capturing the next key for rebinding; cb(code) or cb(null) on Escape. */
  captureKey(cb) {
    this.captureNext = cb;
  }

  _onKeyDown(e) {
    if (this.captureNext) {
      e.preventDefault();
      const cb = this.captureNext;
      this.captureNext = null;
      cb(e.code === 'Escape' ? null : e.code);
      return;
    }
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    this.lastDevice = 'keyboard';
    const actions = this.codeToActions.get(e.code);
    const split = this.splitCodes.get(e.code);
    if (!actions && !split) return;
    // stop the page from scrolling / browser shortcuts while playing
    if (this.enabled && (e.code.startsWith('Arrow') || e.code === 'Space' || e.code === 'Backspace' || e.code === 'F3' || e.code === 'Slash')) e.preventDefault();
    if (e.repeat) return;
    if (!this.down.has(e.code)) {
      this.down.add(e.code);
      if (actions) for (const a of actions) this._press(a);
      if (split) for (const [dev, a] of split) this._pressDevice(dev, a);
    }
  }

  _onKeyUp(e) {
    if (!this.down.has(e.code)) return;
    this.down.delete(e.code);
    const actions = this.codeToActions.get(e.code);
    if (actions) for (const a of actions) if (!this._held(a)) this.holdStart.delete(a);
  }

  _press(action) {
    this.pressQueue.set(action, (this.pressQueue.get(action) || 0) + 1);
    if (!this.holdStart.has(action)) this.holdStart.set(action, this.time);
  }

  _pressDevice(device, action) {
    const k = `${device}:${action}`;
    this.devicePress.set(k, (this.devicePress.get(k) || 0) + 1);
  }

  _held(action) {
    const codes = this.bindings[action];
    if (codes) for (const c of codes) if (this.down.has(c)) return true;
    return false;
  }

  _onBlur() {
    this.releaseAll();
  }

  _onVisibility() {
    if (document.hidden) this.releaseAll();
  }

  /** Release every input (blur, visibility change, leaving a race). */
  releaseAll() {
    this.down.clear();
    this.holdStart.clear();
    this.pressQueue.clear();
    this.devicePress.clear();
    for (const k of Object.keys(this.touch)) this.touch[k] = typeof this.touch[k] === 'boolean' ? false : 0;
    const s = this.state;
    s.throttle = 0;
    s.brake = 0;
    s.steer = 0;
    s.handbrake = false;
    s.boost = false;
    for (const d of this.devStates.values()) {
      d.throttle = d.brake = d.steer = 0;
      d.handbrake = d.boost = false;
    }
  }

  /** True once per press of the action (consumes it). */
  consume(action) {
    const n = this.pressQueue.get(action);
    if (!n) return false;
    this.pressQueue.delete(action);
    return true;
  }

  /** Per-device press edge (split-screen): consumes it. */
  consumeDevice(device, action) {
    const k = `${device}:${action}`;
    if (!this.devicePress.get(k)) return false;
    this.devicePress.delete(k);
    return true;
  }

  /** Drop any queued presses (e.g. on phase change). */
  clearPresses() {
    this.pressQueue.clear();
    this.devicePress.clear();
  }

  isHeld(action) {
    return this._held(action) || (action === 'reset' && this.gamepad.resetHeld);
  }

  /** Seconds the action has been held continuously (0 if not held). */
  heldFor(action) {
    if (!this.isHeld(action)) return 0;
    const t0 = this.holdStart.get(action);
    return t0 === undefined ? 0 : this.time - t0;
  }

  /** Gamepad menu navigation edges: 'up'|'down'|'left'|'right'|'confirm'|'back'. */
  consumeNav() {
    return this.navQueue.length ? this.navQueue.shift() : null;
  }

  /** Number of connected gamepads. */
  get padCount() {
    let n = 0;
    for (const p of this.pads) if (p.connected) n++;
    return n;
  }

  /** Read devices and update `state`. Call once per frame. */
  poll(dt) {
    this.time += dt;
    this._pollGamepads();
    const k = (a) => (this._held(a) ? 1 : 0);
    let gp = null;
    for (const p of this.pads) if (p.connected) {
      gp = p;
      break;
    }
    this.gamepad = gp || this.pads[0];
    const g = this.gamepad;
    const t = this.touch;
    const steerKeys = k('right') - k('left');
    const steerTouch = t.right - t.left;
    let steer = steerKeys || steerTouch;
    if (Math.abs(g.steer) > Math.abs(steer)) steer = g.steer;
    const s = this.state;
    s.throttle = Math.max(k('throttle'), t.throttle, g.throttle);
    s.brake = Math.max(k('brake'), t.brake, g.brake);
    s.steer = Math.max(-1, Math.min(1, steer));
    s.handbrake = !!(k('handbrake') || t.handbrake || g.handbrake);
    s.boost = !!(k('boost') || t.boost || g.boost);
    if (!this.enabled) {
      s.throttle = 0;
      s.brake = 0;
      s.steer = 0;
      s.handbrake = false;
      s.boost = false;
    }
    return s;
  }

  /**
   * Driving state of one device: 'all' (merged single-player state), 'kbA',
   * 'kbB' or 'pad0'..'pad3'. Returns a reused object.
   */
  deviceState(device) {
    if (device === 'all' || !device) return this.state;
    let out = this.devStates.get(device);
    if (!out) this.devStates.set(device, (out = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false }));
    const scheme = SPLIT_SCHEMES[device];
    if (scheme) {
      const held = (a) => {
        for (const c of scheme[a]) if (this.down.has(c)) return 1;
        return 0;
      };
      out.throttle = held('throttle');
      out.brake = held('brake');
      out.steer = held('right') - held('left');
      out.handbrake = !!held('handbrake');
      out.boost = !!held('boost');
    } else if (device.startsWith('pad')) {
      const p = this.pads[Number(device.slice(3))] || blankPad();
      out.throttle = p.throttle;
      out.brake = p.brake;
      out.steer = p.steer;
      out.handbrake = p.handbrake;
      out.boost = p.boost;
    }
    if (!this.enabled) {
      out.throttle = out.brake = out.steer = 0;
      out.handbrake = out.boost = false;
    }
    return out;
  }

  _pollGamepads() {
    let list = null;
    try {
      list = navigator.getGamepads ? navigator.getGamepads() : null;
    } catch {
      list = null;
    }
    // compact connected pads into slots 0..3 by browser index order
    const connected = [];
    if (list) for (const p of list) if (p && p.connected) connected.push(p);
    for (let slot = 0; slot < MAX_PADS; slot++) {
      const gp = this.pads[slot];
      const pad = connected[slot];
      if (!pad) {
        gp.connected = false;
        gp.throttle = gp.brake = gp.steer = 0;
        gp.handbrake = gp.boost = false;
        gp.resetHeld = false;
        continue;
      }
      gp.connected = true;
      const btn = (i) => (pad.buttons[i] ? pad.buttons[i].value || (pad.buttons[i].pressed ? 1 : 0) : 0);
      const pressed = (i) => !!(pad.buttons[i] && pad.buttons[i].pressed);
      let x = pad.axes[0] || 0;
      const ax = Math.abs(x);
      x = ax < DEAD_ZONE ? 0 : (Math.sign(x) * (ax - DEAD_ZONE)) / (1 - DEAD_ZONE);
      // light smoothing so a twitchy stick does not jerk the car
      gp.steer += (x - gp.steer) * 0.5;
      if (Math.abs(gp.steer) < 0.01) gp.steer = 0;
      gp.throttle = btn(GP.RT);
      gp.brake = btn(GP.LT);
      gp.handbrake = pressed(GP.A);
      gp.boost = pressed(GP.X) || pressed(GP.RB);
      gp.resetHeld = pressed(GP.Y);
      const dev = `pad${slot}`;
      const edges = [
        [GP.B, 'camera'],
        [GP.START, 'pause'],
        [GP.Y, 'reset'],
        [GP.BACK, 'mute'],
        [GP.LB, 'speedbreak'],
      ];
      const prev = gp.prev;
      for (const [i, action] of edges) {
        if (pressed(i) && !prev[i]) {
          this._press(action);
          this._pressDevice(dev, action);
          this.lastDevice = 'gamepad';
        }
        if (!pressed(i) && prev[i] && action === 'reset') this.holdStart.delete('reset');
      }
      if (slot === 0 || connected.length === 1) {
        const nav = [
          [GP.UP, 'up'],
          [GP.DOWN, 'down'],
          [GP.LEFT, 'left'],
          [GP.RIGHT, 'right'],
          [GP.A, 'confirm'],
          [GP.B, 'back'],
        ];
        for (const [i, dir] of nav) if (pressed(i) && !prev[i]) this.navQueue.push(dir);
        // left stick as menu navigation too
        const ay = pad.axes[1] || 0;
        const stickDir = Math.abs(ay) > 0.6 ? (ay < 0 ? 'up' : 'down') : Math.abs(pad.axes[0] || 0) > 0.6 ? ((pad.axes[0] || 0) < 0 ? 'left' : 'right') : null;
        if (stickDir && stickDir !== gp.prevStick) this.navQueue.push(stickDir);
        gp.prevStick = stickDir;
      }
      if (this.navQueue.length > 8) this.navQueue.splice(0, this.navQueue.length - 8);
      for (let i = 0; i < pad.buttons.length; i++) prev[i] = pressed(i);
    }
  }

  /** Haptics on supporting gamepads (no-op elsewhere). `slot` limits it to one pad. */
  rumble(strong, weak, ms, slot = -1) {
    try {
      const list = navigator.getGamepads ? navigator.getGamepads() : [];
      let k = 0;
      for (const p of list) {
        if (!p || !p.connected) continue;
        if ((slot < 0 || slot === k) && p.vibrationActuator && p.vibrationActuator.playEffect) {
          p.vibrationActuator.playEffect('dual-rumble', { duration: ms, strongMagnitude: strong, weakMagnitude: weak }).catch(() => {});
        }
        k++;
      }
    } catch {
      /* haptics are optional */
    }
  }

  dispose() {
    this.target.removeEventListener('keydown', this._onKeyDown);
    this.target.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('blur', this._onBlur);
    document.removeEventListener('visibilitychange', this._onVisibility);
  }
}

export function isTouchDevice() {
  try {
    return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
  } catch {
    return false;
  }
}
