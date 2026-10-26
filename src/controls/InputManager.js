// Keyboard + Standard Gamepad + on-screen touch controls, merged into one
// analog driving state. Press edges are queued per action and consumed by
// game logic; everything is released on blur / visibility change.

export const DEFAULT_BINDINGS = Object.freeze({
  throttle: ['KeyW', 'ArrowUp'],
  brake: ['KeyS', 'ArrowDown'],
  left: ['KeyA', 'ArrowLeft'],
  right: ['KeyD', 'ArrowRight'],
  handbrake: ['Space'],
  boost: ['ShiftLeft', 'ShiftRight'],
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
  boost: 'Drift boost',
  camera: 'Camera',
  reset: 'Reset (hold: restart)',
  pause: 'Pause',
  mute: 'Mute',
  debug: 'Debug overlay',
});

const REBINDABLE = ['throttle', 'brake', 'left', 'right', 'handbrake', 'boost', 'camera', 'reset'];

// Standard gamepad mapping
const GP = { A: 0, B: 1, X: 2, Y: 3, LB: 4, RB: 5, LT: 6, RT: 7, BACK: 8, START: 9, UP: 12, DOWN: 13, LEFT: 14, RIGHT: 15 };
const DEAD_ZONE = 0.15;

export function keyLabel(code) {
  if (!code) return '—';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  const map = { ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Space: 'Space', ShiftLeft: 'Shift', ShiftRight: 'R-Shift', Escape: 'Esc', Backspace: 'Bksp', Enter: 'Enter', ControlLeft: 'Ctrl', AltLeft: 'Alt', Tab: 'Tab' };
  return map[code] || code;
}

export class InputManager {
  constructor(target = window) {
    this.target = target;
    this.down = new Set();
    this.pressQueue = new Map(); // action -> count
    this.holdStart = new Map(); // action -> time (s) when held
    this.time = 0;
    this.enabled = true;
    this.captureNext = null; // rebinding callback
    this.setBindings(null);
    this.state = { throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false };
    this.touch = { throttle: 0, brake: 0, left: 0, right: 0, handbrake: false, boost: false };
    this.gamepad = { connected: false, throttle: 0, brake: 0, steer: 0, handbrake: false, boost: false, prev: [] };
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
  }

  setBindings(custom) {
    const b = {};
    for (const k of Object.keys(DEFAULT_BINDINGS)) b[k] = DEFAULT_BINDINGS[k].slice();
    if (custom) {
      for (const k of REBINDABLE) {
        if (Array.isArray(custom[k]) && custom[k].length) b[k] = custom[k].slice(0, 2);
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

  _isGameKey(code) {
    return this.codeToActions.has(code);
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
    if (!actions) return;
    // stop the page from scrolling / browser shortcuts while playing
    if (this.enabled && (e.code.startsWith('Arrow') || e.code === 'Space' || e.code === 'Backspace' || e.code === 'F3')) e.preventDefault();
    if (e.repeat) return;
    if (!this.down.has(e.code)) {
      this.down.add(e.code);
      for (const a of actions) this._press(a);
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
    for (const k of Object.keys(this.touch)) this.touch[k] = typeof this.touch[k] === 'boolean' ? false : 0;
    this.state.throttle = 0;
    this.state.brake = 0;
    this.state.steer = 0;
    this.state.handbrake = false;
    this.state.boost = false;
  }

  /** True once per press of the action (consumes it). */
  consume(action) {
    const n = this.pressQueue.get(action);
    if (!n) return false;
    this.pressQueue.delete(action);
    return true;
  }

  /** Drop any queued presses (e.g. on phase change). */
  clearPresses() {
    this.pressQueue.clear();
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

  /** Read devices and update `state`. Call once per frame. */
  poll(dt) {
    this.time += dt;
    this._pollGamepad();
    const k = (a) => (this._held(a) ? 1 : 0);
    const gp = this.gamepad;
    const t = this.touch;
    const steerKeys = k('right') - k('left');
    const steerTouch = t.right - t.left;
    let steer = steerKeys || steerTouch;
    if (Math.abs(gp.steer) > Math.abs(steer)) steer = gp.steer;
    const s = this.state;
    s.throttle = Math.max(k('throttle'), t.throttle, gp.throttle);
    s.brake = Math.max(k('brake'), t.brake, gp.brake);
    s.steer = Math.max(-1, Math.min(1, steer));
    s.handbrake = !!(k('handbrake') || t.handbrake || gp.handbrake);
    s.boost = !!(k('boost') || t.boost || gp.boost);
    if (!this.enabled) {
      s.throttle = 0;
      s.brake = 0;
      s.steer = 0;
      s.handbrake = false;
      s.boost = false;
    }
    return s;
  }

  _pollGamepad() {
    const gp = this.gamepad;
    let pads = null;
    try {
      pads = navigator.getGamepads ? navigator.getGamepads() : null;
    } catch {
      pads = null;
    }
    let pad = null;
    if (pads) for (const p of pads) if (p && p.connected) {
      pad = p;
      break;
    }
    if (!pad) {
      gp.connected = false;
      gp.throttle = gp.brake = gp.steer = 0;
      gp.handbrake = gp.boost = false;
      gp.resetHeld = false;
      return;
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
    const edges = [
      [GP.B, 'camera'],
      [GP.START, 'pause'],
      [GP.Y, 'reset'],
      [GP.BACK, 'mute'],
    ];
    const nav = [
      [GP.UP, 'up'],
      [GP.DOWN, 'down'],
      [GP.LEFT, 'left'],
      [GP.RIGHT, 'right'],
      [GP.A, 'confirm'],
      [GP.B, 'back'],
    ];
    const prev = gp.prev;
    for (const [i, action] of edges) {
      if (pressed(i) && !prev[i]) {
        this._press(action);
        this.lastDevice = 'gamepad';
      }
      if (!pressed(i) && prev[i] && action === 'reset') this.holdStart.delete('reset');
    }
    for (const [i, dir] of nav) if (pressed(i) && !prev[i]) this.navQueue.push(dir);
    // left stick as menu navigation too
    const ay = pad.axes[1] || 0;
    const stickDir = Math.abs(ay) > 0.6 ? (ay < 0 ? 'up' : 'down') : Math.abs(pad.axes[0] || 0) > 0.6 ? ((pad.axes[0] || 0) < 0 ? 'left' : 'right') : null;
    if (stickDir && stickDir !== gp.prevStick) this.navQueue.push(stickDir);
    gp.prevStick = stickDir;
    if (this.navQueue.length > 8) this.navQueue.splice(0, this.navQueue.length - 8);
    for (let i = 0; i < pad.buttons.length; i++) prev[i] = pressed(i);
  }

  /** Haptics on supporting gamepads (no-op elsewhere). */
  rumble(strong, weak, ms) {
    try {
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      for (const p of pads) {
        if (p && p.vibrationActuator && p.vibrationActuator.playEffect) {
          p.vibrationActuator.playEffect('dual-rumble', { duration: ms, strongMagnitude: strong, weakMagnitude: weak }).catch(() => {});
        }
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
