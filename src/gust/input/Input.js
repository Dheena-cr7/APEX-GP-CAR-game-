// Input: keyboard (two players can share one), mouse aim, gamepads, touch.
// read(scheme) returns screen-relative movement (mx = right, my = up), an
// optional aim (screen point or stick direction) and button states.

const KB = {
  kb1: {
    up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'],
    blast: ['Space'], puff: ['ShiftLeft', 'KeyE'], respawn: ['KeyR'],
  },
  kb2: {
    up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'],
    blast: ['Enter', 'NumpadEnter', 'Numpad0', 'ControlRight'], puff: ['ShiftRight', 'Numpad1', 'Slash'], respawn: ['Period', 'NumpadDecimal'],
  },
};
// solo: both keyboard layouts work
KB.solo = Object.fromEntries(Object.keys(KB.kb1).map((k) => [k, [...KB.kb1[k], ...KB.kb2[k]]]));

export const SCHEME_LABEL = {
  kb1: 'Keyboard WASD',
  kb2: 'Keyboard Arrows',
  pad0: 'Gamepad 1', pad1: 'Gamepad 2', pad2: 'Gamepad 3', pad3: 'Gamepad 4',
  touch: 'Touch',
  solo: 'Keyboard / Mouse / Gamepad',
};

const DEAD = 0.18;
const dz = (v) => (Math.abs(v) < DEAD ? 0 : (v - Math.sign(v) * DEAD) / (1 - DEAD));

export class Input {
  constructor(canvas, uiRoot) {
    this.canvas = canvas;
    this.down = new Set();
    this.pressed = new Set();
    this.mouse = { x: 0, y: 0, active: false, at: -1e9, l: false, r: false, lPressed: false, rPressed: false, over: false };
    this.pads = [];
    this.padPrev = [[], [], [], []];
    this.padPressed = [new Set(), new Set(), new Set(), new Set()];
    this.enabled = true;
    this.gameActive = false; // set by the game: racing with no menu open
    this.touch = { active: false, mx: 0, my: 0, blast: false, puff: false, id: -1, ox: 0, oy: 0 };
    this._onKeyDown = (e) => {
      if (e.repeat) return;
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      this.down.add(e.code);
      this.pressed.add(e.code);
      // only swallow keys while racing, so menus keep normal keyboard use
      if (this.enabled && this.gameActive && this._gameKey(e.code)) e.preventDefault();
    };
    this._onKeyUp = (e) => this.down.delete(e.code);
    this._onBlur = () => {
      this.down.clear();
      this.mouse.l = this.mouse.r = false;
    };
    this._onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const nx = e.clientX - r.left, ny = e.clientY - r.top;
      if (Math.abs(nx - this.mouse.x) + Math.abs(ny - this.mouse.y) > 2) this.mouse.at = performance.now();
      this.mouse.x = nx;
      this.mouse.y = ny;
      this.mouse.over = true;
    };
    this._onMouseDown = (e) => {
      if (e.pointerType === 'touch') return;
      if (e.button === 0) { this.mouse.l = true; this.mouse.lPressed = true; }
      if (e.button === 2) { this.mouse.r = true; this.mouse.rPressed = true; }
      this.mouse.at = performance.now();
    };
    this._onMouseUp = (e) => {
      if (e.button === 0) this.mouse.l = false;
      if (e.button === 2) this.mouse.r = false;
    };
    this._onContext = (e) => e.preventDefault();
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
    canvas.addEventListener('pointermove', this._onMove);
    canvas.addEventListener('pointerdown', this._onMouseDown);
    window.addEventListener('pointerup', this._onMouseUp);
    canvas.addEventListener('contextmenu', this._onContext);
    this._buildTouch(uiRoot);
  }

  _gameKey(code) {
    for (const s of ['kb1', 'kb2']) for (const k of Object.values(KB[s])) if (k.includes(code)) return true;
    return false;
  }

  // ------------------------------------------------------------ touch

  _buildTouch(root) {
    const el = document.createElement('div');
    el.className = 'gc-touch';
    el.innerHTML = `
      <div class="gc-stick"><div class="gc-stick-base"></div><div class="gc-stick-knob"></div></div>
      <button type="button" class="gc-tbtn gc-tbtn-puff" aria-label="Big puff">PUFF</button>
      <button type="button" class="gc-tbtn gc-tbtn-blast" aria-label="Blast">BLAST</button>
      <button type="button" class="gc-tbtn gc-tbtn-respawn" aria-label="Back to checkpoint">↺</button>`;
    root.appendChild(el);
    this.touchEl = el;
    const stick = el.querySelector('.gc-stick');
    const knob = el.querySelector('.gc-stick-knob');
    const T = this.touch;
    const R = 52;
    const setKnob = (dx, dy) => { knob.style.transform = `translate(${dx}px, ${dy}px)`; };
    stick.addEventListener('pointerdown', (e) => {
      T.id = e.pointerId;
      const r = stick.getBoundingClientRect();
      T.ox = r.left + r.width / 2;
      T.oy = r.top + r.height / 2;
      stick.setPointerCapture(e.pointerId);
      T.active = true;
      e.preventDefault();
    });
    stick.addEventListener('pointermove', (e) => {
      if (e.pointerId !== T.id) return;
      let dx = e.clientX - T.ox, dy = e.clientY - T.oy;
      const l = Math.hypot(dx, dy);
      if (l > R) { dx = (dx / l) * R; dy = (dy / l) * R; }
      setKnob(dx, dy);
      T.mx = dx / R;
      T.my = -dy / R;
    });
    const end = (e) => {
      if (e.pointerId !== T.id) return;
      T.id = -1;
      T.mx = T.my = 0;
      setKnob(0, 0);
    };
    stick.addEventListener('pointerup', end);
    stick.addEventListener('pointercancel', end);
    const hold = (sel, key) => {
      const b = el.querySelector(sel);
      b.addEventListener('pointerdown', (e) => { T[key] = true; T.active = true; if (key === 'puff') T.puffPressed = true; if (key === 'respawn') T.respawnPressed = true; e.preventDefault(); });
      const up = () => { T[key] = false; };
      b.addEventListener('pointerup', up);
      b.addEventListener('pointercancel', up);
      b.addEventListener('pointerleave', up);
    };
    hold('.gc-tbtn-blast', 'blast');
    hold('.gc-tbtn-puff', 'puff');
    hold('.gc-tbtn-respawn', 'respawn');
  }

  showTouch(v) {
    if (this.touchEl) this.touchEl.classList.toggle('is-on', v);
  }

  static isTouchDevice() {
    return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.matchMedia('(pointer: coarse)').matches;
  }

  // ------------------------------------------------------------ frame

  /** Poll gamepads; call once per frame before read(). */
  poll() {
    const list = navigator.getGamepads ? navigator.getGamepads() : [];
    this.pads = [];
    let k = 0;
    for (const g of list) {
      if (!g || !g.connected) continue;
      if (k > 3) break;
      const prev = this.padPrev[k];
      const now = g.buttons.map((b) => b.pressed || b.value > 0.4);
      const pr = this.padPressed[k];
      pr.clear();
      now.forEach((v, i) => { if (v && !prev[i]) pr.add(i); });
      this.padPrev[k] = now;
      this.pads[k] = g;
      k++;
    }
  }

  /** Clear one-frame edges; call at the end of a frame. */
  endFrame() {
    this.pressed.clear();
    this.mouse.lPressed = this.mouse.rPressed = false;
    this.touch.puffPressed = false;
    this.touch.respawnPressed = false;
  }

  anyKey(codes) {
    for (const c of codes) if (this.down.has(c)) return true;
    return false;
  }

  anyPressed(codes) {
    for (const c of codes) if (this.pressed.has(c)) return true;
    return false;
  }

  padButton(i, b) {
    const g = this.pads[i];
    return !!g && !!g.buttons[b] && (g.buttons[b].pressed || g.buttons[b].value > 0.35);
  }

  padPressedBtn(i, b) {
    return this.padPressed[i] && this.padPressed[i].has(b);
  }

  get mouseAiming() {
    return this.mouse.over && performance.now() - this.mouse.at < 3000;
  }

  /**
   * @returns {{mx:number,my:number,aim:null|{kind:'screen',x:number,y:number}|{kind:'stick',x:number,y:number},blast:boolean,puff:boolean,respawn:boolean,pause:boolean}}
   */
  read(scheme) {
    const out = { mx: 0, my: 0, aim: null, blast: false, puff: false, respawn: false, pause: false, active: false };
    if (!this.enabled) return out;
    const kb = KB[scheme];
    if (kb) {
      out.mx += (this.anyKey(kb.right) ? 1 : 0) - (this.anyKey(kb.left) ? 1 : 0);
      out.my += (this.anyKey(kb.up) ? 1 : 0) - (this.anyKey(kb.down) ? 1 : 0);
      out.blast = this.anyKey(kb.blast);
      out.puff = this.anyPressed(kb.puff);
      out.respawn = this.anyPressed(kb.respawn);
    }
    if (scheme === 'kb1' || scheme === 'solo') {
      if (this.mouseAiming) out.aim = { kind: 'screen', x: this.mouse.x, y: this.mouse.y };
      out.blast = out.blast || this.mouse.l;
      out.puff = out.puff || this.mouse.rPressed;
    }
    const pads = scheme === 'solo' ? [0, 1, 2, 3] : scheme.startsWith('pad') ? [Number(scheme.slice(3))] : [];
    for (const i of pads) {
      const g = this.pads[i];
      if (!g) continue;
      const lx = dz(g.axes[0] || 0), ly = dz(g.axes[1] || 0);
      const rx = dz(g.axes[2] || 0), ry = dz(g.axes[3] || 0);
      let px = lx, py = -ly;
      if (this.padButton(i, 12)) py = 1;
      if (this.padButton(i, 13)) py = -1;
      if (this.padButton(i, 14)) px = -1;
      if (this.padButton(i, 15)) px = 1;
      out.mx += px;
      out.my += py;
      if (Math.hypot(rx, ry) > 0.35) out.aim = { kind: 'stick', x: rx, y: -ry };
      out.blast = out.blast || this.padButton(i, 7) || this.padButton(i, 0);
      out.puff = out.puff || this.padPressedBtn(i, 2) || this.padPressedBtn(i, 5) || this.padPressedBtn(i, 6);
      out.respawn = out.respawn || this.padPressedBtn(i, 3);
      out.pause = out.pause || this.padPressedBtn(i, 9);
    }
    if (scheme === 'solo' || scheme === 'touch') {
      const T = this.touch;
      if (T.active) {
        out.mx += T.mx;
        out.my += T.my;
        out.blast = out.blast || T.blast;
        out.puff = out.puff || !!T.puffPressed;
        out.respawn = out.respawn || !!T.respawnPressed;
      }
    }
    const l = Math.hypot(out.mx, out.my);
    if (l > 1) { out.mx /= l; out.my /= l; }
    out.active = l > 0.1 || out.blast;
    return out;
  }

  /** Which device pressed its join button this frame (local co-op). */
  joinPresses() {
    const found = [];
    if (this.pressed.has('Space')) found.push('kb1');
    if (this.pressed.has('Enter') || this.pressed.has('NumpadEnter')) found.push('kb2');
    for (let i = 0; i < 4; i++) if (this.padPressedBtn(i, 0) || this.padPressedBtn(i, 9)) found.push('pad' + i);
    return found;
  }

  dispose() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('blur', this._onBlur);
    this.canvas.removeEventListener('pointermove', this._onMove);
    this.canvas.removeEventListener('pointerdown', this._onMouseDown);
    window.removeEventListener('pointerup', this._onMouseUp);
    this.canvas.removeEventListener('contextmenu', this._onContext);
    if (this.touchEl) this.touchEl.remove();
  }
}
