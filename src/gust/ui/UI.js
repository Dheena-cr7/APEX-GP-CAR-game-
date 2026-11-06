// DOM menus and HUD for GUST CREW. Real <button>s throughout so keyboard,
// mouse, touch and (via polling) gamepads all work.

import { COURSES, COURSE_BY_ID } from '../sim/Courses.js';
import { CREW_CSS, HATS } from '../render/Themes.js';
import { SCHEME_LABEL } from '../input/Input.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function fmtTime(t) {
  if (!Number.isFinite(t) || t <= 0) return '0:00.0';
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(1)}`;
}

const MEDAL_LABEL = { gold: 'Gold', silver: 'Silver', bronze: 'Bronze', none: 'Finished' };
const DIFF = ['', 'Easy', 'Medium', 'Hard', 'Expert'];

function critterSVG(color, hat = 0, size = 64) {
  const hats = [
    '<rect x="21" y="9" width="22" height="8" rx="3" fill="#fff"/><rect x="19" y="15" width="26" height="3" rx="1.5" fill="#22344f"/>',
    '<path d="M19 18 Q32 2 45 18 Z" fill="#e63946"/><rect x="18" y="16" width="28" height="4" rx="2" fill="#f1faee"/><circle cx="32" cy="5" r="3.5" fill="#f1faee"/>',
    '<path d="M14 17 L32 7 L50 17 Z" fill="#1d1d28"/><circle cx="32" cy="12" r="2" fill="#ffd23f"/>',
    '<ellipse cx="32" cy="17" rx="19" ry="3.5" fill="#e9c46a"/><rect x="24" y="8" width="16" height="9" rx="4" fill="#e9c46a"/><rect x="24" y="13" width="16" height="3" fill="#d62828"/>',
  ];
  return `<svg class="gc-critter" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true">
    <ellipse cx="32" cy="60" rx="15" ry="3" fill="rgba(0,0,0,.18)"/>
    <ellipse cx="25" cy="57" rx="6" ry="3" fill="#ff9f1c"/><ellipse cx="39" cy="57" rx="6" ry="3" fill="#ff9f1c"/>
    <circle cx="32" cy="38" r="20" fill="${color}"/>
    <ellipse cx="32" cy="44" rx="12" ry="10" fill="rgba(255,255,255,.45)"/>
    <circle cx="25" cy="33" r="5.5" fill="#fff"/><circle cx="39" cy="33" r="5.5" fill="#fff"/>
    <circle cx="26" cy="34" r="3" fill="#141414"/><circle cx="40" cy="34" r="3" fill="#141414"/>
    <circle cx="27" cy="32.6" r="1" fill="#fff"/><circle cx="41" cy="32.6" r="1" fill="#fff"/>
    <ellipse cx="20" cy="41" rx="3" ry="2" fill="#ff9eae"/><ellipse cx="44" cy="41" rx="3" ry="2" fill="#ff9eae"/>
    <path d="M28 42 Q32 46 36 42" stroke="#3b1f1f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${hats[hat % 4]}
  </svg>`;
}

function medalDot(medal, size = 'sm') {
  return `<span class="gc-medal gc-medal-${medal} gc-medal-${size}" aria-label="${MEDAL_LABEL[medal]}"></span>`;
}

export class UI {
  constructor(game, root) {
    this.game = game;
    this.root = root;
    root.classList.add('gc-ui');
    root.insertAdjacentHTML('beforeend', `
      <div class="gc-screen" role="main"></div>
      <div class="gc-hud" hidden></div>
      <div class="gc-banners" aria-live="polite"></div>
      <div class="gc-toasts" aria-live="polite"></div>
      <div class="gc-modal" hidden></div>
      <div class="gc-loading" hidden></div>`);
    this.screenEl = root.querySelector('.gc-screen');
    this.hudEl = root.querySelector('.gc-hud');
    this.bannerEl = root.querySelector('.gc-banners');
    this.toastEl = root.querySelector('.gc-toasts');
    this.modalEl = root.querySelector('.gc-modal');
    this.loadingEl = root.querySelector('.gc-loading');
    this.current = null;
    this.backFn = null;
    this.hud = null;
    this.localJoin = [];
    this._padNav = { prev: [] };
    root.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b && !b.disabled) this.game.sound.play('click');
    });
    root.addEventListener('pointerover', (e) => {
      const b = e.target.closest('button');
      if (b && !b.disabled && b !== this._hovered) {
        this._hovered = b;
        this.game.sound.play('hover');
      }
    });
    window.addEventListener('keydown', (e) => this._onKey(e));
  }

  get inMenu() {
    return !this.screenEl.hidden && this.screenEl.childElementCount > 0;
  }

  // ------------------------------------------------------------ helpers

  _show(name, html, back = null) {
    this.current = name;
    this.backFn = back;
    this.screenEl.hidden = false;
    this.screenEl.innerHTML = `<div class="gc-panel-wrap gc-screen-${name}">${html}</div>`;
    const first = this.screenEl.querySelector('[data-autofocus]') || this.screenEl.querySelector('button:not([disabled])');
    if (first && name !== 'local' && !matchMedia('(pointer: coarse)').matches) setTimeout(() => first.focus({ preventScroll: true }), 30);
    else if (name === 'local' && document.activeElement && document.activeElement.blur) document.activeElement.blur();
    return this.screenEl.firstElementChild;
  }

  hideScreen() {
    this.current = null;
    this.backFn = null;
    this.screenEl.innerHTML = '';
    this.screenEl.hidden = true;
  }

  _on(el, act, fn) {
    el.querySelectorAll(`[data-act="${act}"]`).forEach((b) => b.addEventListener('click', (e) => fn(b, e)));
  }

  _onKey(e) {
    if (e.defaultPrevented) return;
    // on the co-op join screen Space / Enter are "join" keys, not button presses
    if (this.current === 'local' && this.modalEl.hidden && (e.code === 'Space' || e.key === 'Enter')) {
      e.preventDefault();
      return;
    }
    const tag = document.activeElement && document.activeElement.tagName;
    if (!this.modalEl.hidden) {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.closeModal();
      }
      return;
    }
    if (this.current && (e.key === 'Escape' || (e.key === 'Backspace' && tag !== 'INPUT'))) {
      if (this.backFn) {
        e.preventDefault();
        this.backFn();
      }
      return;
    }
    if (this.current && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && tag !== 'INPUT') {
      if (this.current === 'local') return; // arrows are player 2's keys there
      this._moveFocus(e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1);
      e.preventDefault();
    }
    if (!this.current && this.hud && e.key === 'Escape') {
      e.preventDefault();
      this.game.togglePause();
    }
  }

  _focusables() {
    const scope = !this.modalEl.hidden ? this.modalEl : this.screenEl;
    return [...scope.querySelectorAll('button:not([disabled]), input, select, a[href]')].filter((b) => b.offsetParent !== null);
  }

  _moveFocus(dir) {
    const list = this._focusables();
    if (!list.length) return;
    const i = list.indexOf(document.activeElement);
    const n = i < 0 ? list[0] : list[(i + dir + list.length) % list.length];
    n.focus();
    this.game.sound.play('hover');
  }

  /** Gamepad menu navigation; call each frame. */
  pollPad(input) {
    if (this.screenEl.hidden && this.modalEl.hidden) return;
    if (this.current === 'local') return;
    for (let i = 0; i < 4; i++) {
      if (input.padPressedBtn(i, 13) || input.padPressedBtn(i, 15)) this._moveFocus(1);
      if (input.padPressedBtn(i, 12) || input.padPressedBtn(i, 14)) this._moveFocus(-1);
      if (input.padPressedBtn(i, 0)) {
        const a = document.activeElement;
        if (a && a.tagName === 'BUTTON') a.click();
        else this._moveFocus(1);
      }
      if (input.padPressedBtn(i, 1)) {
        if (!this.modalEl.hidden) this.closeModal();
        else if (this.backFn) this.backFn();
      }
    }
  }

  // ------------------------------------------------------------ title

  showTitle() {
    const g = this.game;
    const el = this._show('title', `
      <div class="gc-title">
        <h1 class="gc-logo" aria-label="Gust Crew"><span class="gc-logo-a">GUST</span><span class="gc-logo-b">CREW</span></h1>
        <p class="gc-tag">Blast your raft down wild rivers — together.</p>
        <div class="gc-menu">
          <button class="gc-btn gc-btn-primary gc-btn-xl" data-act="solo" data-autofocus>Play</button>
          <button class="gc-btn" data-act="local">Local co-op <small>1–4 on one screen</small></button>
          <button class="gc-btn" data-act="online">Online crew <small>Play with friends</small></button>
          <div class="gc-row">
            <button class="gc-btn gc-btn-ghost" data-act="howto">How to play</button>
            <button class="gc-btn gc-btn-ghost" data-act="settings">Settings</button>
          </div>
        </div>
        <p class="gc-foot">${g.save.ok ? '' : 'Progress cannot be saved in this browser (storage is blocked). '}Best with a keyboard + mouse, a gamepad, or touch.</p>
      </div>`);
    this._on(el, 'solo', () => this.showCourses('solo'));
    this._on(el, 'local', () => this.showLocal());
    this._on(el, 'online', () => this.showOnline());
    this._on(el, 'howto', () => this.showHowTo());
    this._on(el, 'settings', () => this.showSettings());
  }

  // ------------------------------------------------------------ courses

  _courseCards(selected, { compact = false, allUnlocked = false } = {}) {
    const save = this.game.save;
    return COURSES.map((c, i) => {
      const best = save.best(c.id);
      const prevDone = i === 0 || !!save.best(COURSES[i - 1].id);
      const locked = !allUnlocked && !prevDone;
      return `
        <button class="gc-course gc-theme-${c.theme}${c.id === selected ? ' is-selected' : ''}${compact ? ' is-compact' : ''}" data-act="course" data-id="${c.id}" ${locked ? 'disabled' : ''} aria-pressed="${c.id === selected}">
          <span class="gc-course-art" aria-hidden="true"><i></i></span>
          <span class="gc-course-body">
            <span class="gc-course-name">${esc(c.name)}</span>
            <span class="gc-course-diff">${'<b></b>'.repeat(c.difficulty)}${'<b class="off"></b>'.repeat(4 - c.difficulty)} ${DIFF[c.difficulty]}</span>
            ${compact ? '' : `<span class="gc-course-blurb">${esc(c.blurb)}</span>`}
            <span class="gc-course-best">${locked ? 'Finish ' + esc(COURSES[i - 1].name) + ' to unlock' : best ? `${medalDot(best.medal)} Best ${fmtTime(best.time)} · ${best.shells}/${c.shells.length} shells` : `Gold under ${fmtTime(c.medals.gold)}`}</span>
          </span>
        </button>`;
    }).join('');
  }

  _hatPicker(current, act = 'hat', color = 0) {
    return `<div class="gc-hats" role="radiogroup" aria-label="Hat">${HATS.map((h, i) => `
      <button class="gc-hat${i === current ? ' is-selected' : ''}" data-act="${act}" data-hat="${i}" role="radio" aria-checked="${i === current}" title="${h}">${critterSVG(CREW_CSS[color], i, 44)}<span>${h}</span></button>`).join('')}</div>`;
  }

  showCourses(mode) {
    const g = this.game;
    const save = g.save;
    let sel = g.lastCourse && COURSE_BY_ID[g.lastCourse] ? g.lastCourse : 'lagoon';
    const unlocked = (id) => {
      const i = COURSES.findIndex((c) => c.id === id);
      return i === 0 || !!save.best(COURSES[i - 1].id);
    };
    if (!unlocked(sel)) sel = 'lagoon';
    const solo = mode === 'solo';
    const render = () => {
      const el = this._show('courses', `
        <header class="gc-head">
          <button class="gc-btn gc-btn-ghost gc-back" data-act="back" aria-label="Back">← Back</button>
          <h2>${solo ? 'Choose a river' : 'Local co-op: choose a river'}</h2>
        </header>
        <div class="gc-courses">${this._courseCards(sel)}</div>
        <div class="gc-options">
          ${solo ? `
            <div class="gc-opt">
              <span class="gc-opt-label">Your sailor</span>
              ${this._hatPicker(save.data.hat, 'hat', 0)}
            </div>
            <div class="gc-opt">
              <span class="gc-opt-label">Bot crewmates <small>They walk the deck and blast with you</small></span>
              <div class="gc-stepper" role="group" aria-label="Bot crewmates">
                <button class="gc-btn gc-btn-icon" data-act="bots-" aria-label="Fewer bots">−</button>
                <span class="gc-stepper-val">${save.settings.bots}</span>
                <button class="gc-btn gc-btn-icon" data-act="bots+" aria-label="More bots">+</button>
              </div>
            </div>` : `
            <div class="gc-opt">
              <span class="gc-opt-label">Bots fill empty seats</span>
              <div class="gc-stepper" role="group" aria-label="Bots">
                <button class="gc-btn gc-btn-icon" data-act="lbots-" aria-label="Fewer bots">−</button>
                <span class="gc-stepper-val">${g.localBots}</span>
                <button class="gc-btn gc-btn-icon" data-act="lbots+" aria-label="More bots">+</button>
              </div>
            </div>`}
          <button class="gc-btn gc-btn-primary gc-btn-xl" data-act="go" data-autofocus>Cast off!</button>
        </div>`, () => (solo ? this.showTitle() : this.showLocal()));
      this._on(el, 'back', () => (solo ? this.showTitle() : this.showLocal()));
      this._on(el, 'course', (b) => {
        sel = b.dataset.id;
        g.previewCourse(sel);
        render();
        const again = this.screenEl.querySelector(`[data-id="${sel}"]`);
        if (again) again.focus();
      });
      this._on(el, 'hat', (b) => {
        save.data.hat = Number(b.dataset.hat);
        save.write();
        render();
      });
      this._on(el, 'bots-', () => { save.settings.bots = Math.max(0, save.settings.bots - 1); save.write(); render(); });
      this._on(el, 'bots+', () => { save.settings.bots = Math.min(3, save.settings.bots + 1); save.write(); render(); });
      this._on(el, 'lbots-', () => { g.localBots = Math.max(0, g.localBots - 1); render(); });
      this._on(el, 'lbots+', () => { g.localBots = Math.min(4 - this.localJoin.length, g.localBots + 1); render(); });
      this._on(el, 'go', () => g.startOffline(mode, sel));
    };
    render();
  }

  // ------------------------------------------------------------ local co-op

  showLocal() {
    const g = this.game;
    const render = () => {
      const slots = [0, 1, 2, 3].map((i) => {
        const p = this.localJoin[i];
        if (!p) {
          return `<div class="gc-seat is-empty"><div class="gc-seat-wait">${critterSVG('#c9d3e0', 0, 72)}</div>
            <p>Press <kbd>Space</kbd> (WASD), <kbd>Enter</kbd> (arrows) or <kbd>A</kbd> on a gamepad to join</p></div>`;
        }
        return `<div class="gc-seat" style="--seat:${CREW_CSS[i]}">
          <button class="gc-btn gc-btn-icon gc-seat-x" data-act="drop" data-i="${i}" aria-label="Remove player ${i + 1}">×</button>
          ${critterSVG(CREW_CSS[i], p.hat, 84)}
          <strong>Player ${i + 1}</strong>
          <span class="gc-seat-dev">${SCHEME_LABEL[p.scheme]}</span>
          <div class="gc-seat-hat">
            <button class="gc-btn gc-btn-icon" data-act="hatp" data-i="${i}" aria-label="Previous hat">‹</button>
            <span>${HATS[p.hat]}</span>
            <button class="gc-btn gc-btn-icon" data-act="hatn" data-i="${i}" aria-label="Next hat">›</button>
          </div></div>`;
      }).join('');
      const el = this._show('local', `
        <header class="gc-head">
          <button class="gc-btn gc-btn-ghost gc-back" data-act="back">← Back</button>
          <h2>Local co-op</h2>
        </header>
        <p class="gc-sub">Everyone shares one raft and one screen. Up to 4 sailors: two on one keyboard plus gamepads.</p>
        <div class="gc-seats">${slots}</div>
        <div class="gc-options">
          <button class="gc-btn gc-btn-primary gc-btn-xl" data-act="next" ${this.localJoin.length ? '' : 'disabled'}>Choose river →</button>
        </div>`, () => this.showTitle());
      this._on(el, 'back', () => this.showTitle());
      this._on(el, 'drop', (b) => { this.localJoin.splice(Number(b.dataset.i), 1); render(); });
      this._on(el, 'hatp', (b) => { const p = this.localJoin[Number(b.dataset.i)]; p.hat = (p.hat + 3) % 4; render(); });
      this._on(el, 'hatn', (b) => { const p = this.localJoin[Number(b.dataset.i)]; p.hat = (p.hat + 1) % 4; render(); });
      this._on(el, 'next', () => {
        g.localBots = Math.min(g.localBots, 4 - this.localJoin.length);
        this.showCourses('local');
      });
    };
    this._renderLocal = render;
    render();
  }

  /** Called every frame on the local co-op screen. */
  pollLocalJoin(input) {
    if (this.current !== 'local') return;
    for (const scheme of input.joinPresses()) {
      const existing = this.localJoin.find((p) => p.scheme === scheme);
      if (existing) {
        if (this.localJoin.length) {
          // a joined player pressing again starts
          const btn = this.screenEl.querySelector('[data-act="next"]');
          if (btn && !btn.disabled && scheme === this.localJoin[0].scheme) btn.click();
        }
        continue;
      }
      if (this.localJoin.length >= 4) continue;
      this.localJoin.push({ scheme, hat: this.localJoin.length % 4 });
      this.game.sound.play('join');
      this._renderLocal();
    }
  }

  // ------------------------------------------------------------ online

  showOnline(error = '') {
    const g = this.game;
    const save = g.save;
    const params = new URLSearchParams(location.search);
    const invite = (params.get('room') || '').toUpperCase().slice(0, 4);
    const el = this._show('online', `
      <header class="gc-head">
        <button class="gc-btn gc-btn-ghost gc-back" data-act="back">← Back</button>
        <h2>Online crew</h2>
      </header>
      <div class="gc-online">
        <div class="gc-card">
          <label class="gc-field"><span>Your name</span>
            <input class="gc-input" data-name maxlength="14" autocomplete="nickname" placeholder="Sailor" value="${esc(save.data.name)}"/></label>
          <span class="gc-opt-label">Your hat</span>
          ${this._hatPicker(save.data.hat, 'hat', 0)}
        </div>
        <div class="gc-card gc-card-split">
          <div>
            <h3>Start a raft</h3>
            <p>Get a 4-letter code and send it (or the invite link) to up to 3 friends.</p>
            <button class="gc-btn gc-btn-primary" data-act="create" ${invite ? '' : 'data-autofocus'}>Create room</button>
          </div>
          <div class="gc-or">or</div>
          <div>
            <h3>Join a raft</h3>
            <p>Type the code your friend sent you.</p>
            <div class="gc-join">
              <input class="gc-input gc-code" data-code maxlength="4" placeholder="ABCD" value="${esc(invite)}" autocapitalize="characters" spellcheck="false" ${invite ? 'data-autofocus' : ''}/>
              <button class="gc-btn gc-btn-primary" data-act="join">Join</button>
            </div>
          </div>
        </div>
        ${error ? `<p class="gc-error" role="alert">${esc(error)}</p>` : ''}
        <p class="gc-note">Players connect directly, browser to browser. If a friend can't connect, let the player on home Wi-Fi host.${g.params.has('localnet') ? ' <b>Same-browser test mode is on.</b>' : ''}</p>
      </div>`, () => this.showTitle());
    const nameIn = el.querySelector('[data-name]');
    const codeIn = el.querySelector('[data-code]');
    const saveName = () => {
      save.data.name = nameIn.value.trim().slice(0, 14);
      save.write();
    };
    nameIn.addEventListener('change', saveName);
    codeIn.addEventListener('input', () => { codeIn.value = codeIn.value.toUpperCase().replace(/[^A-Z]/g, ''); });
    codeIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') el.querySelector('[data-act="join"]').click(); });
    this._on(el, 'back', () => this.showTitle());
    this._on(el, 'hat', (b) => {
      saveName();
      save.data.hat = Number(b.dataset.hat);
      save.write();
      this.showOnline();
    });
    const busy = (b, text) => {
      el.querySelectorAll('button').forEach((x) => (x.disabled = true));
      b.textContent = text;
    };
    this._on(el, 'create', (b) => {
      saveName();
      busy(b, 'Creating…');
      g.hostOnline();
    });
    this._on(el, 'join', (b) => {
      saveName();
      const code = codeIn.value.trim();
      if (!/^[A-Z]{4}$/.test(code)) {
        codeIn.focus();
        codeIn.classList.add('is-bad');
        return;
      }
      busy(b, 'Joining…');
      g.joinOnline(code);
    });
    if (invite && /^[A-Z]{4}$/.test(invite) && params.has('autojoin')) el.querySelector('[data-act="join"]').click();
  }

  showLobby(net) {
    const g = this.game;
    const host = net.isHost;
    const link = `${location.origin}${location.pathname}?room=${net.code}`;
    const players = net.players.slice().sort((a, b) => a.slot - b.slot);
    const bots = net.settings.bots;
    const seats = [];
    for (const p of players) seats.push({ ...p, bot: false });
    const used = new Set(players.map((p) => p.slot));
    for (let s = 0, k = 0; s < 4 && k < bots; s++) if (!used.has(s)) { seats.push({ slot: s, name: 'Bot', hat: s, bot: true }); k++; }
    seats.sort((a, b) => a.slot - b.slot);
    const course = COURSE_BY_ID[net.settings.course] || COURSES[0];
    const el = this._show('lobby', `
      <header class="gc-head">
        <button class="gc-btn gc-btn-ghost gc-back" data-act="leave">← Leave</button>
        <h2>Crew lobby</h2>
        <span class="gc-ping" data-ping>${host ? 'You are the host' : net.rtt ? Math.round(net.rtt) + ' ms' : ''}</span>
      </header>
      <div class="gc-lobby">
        <div class="gc-card gc-roomcode">
          <span class="gc-opt-label">Room code</span>
          <strong class="gc-code-big">${esc(net.code)}</strong>
          <div class="gc-row">
            <button class="gc-btn" data-act="copy">Copy invite link</button>
            <button class="gc-btn gc-btn-ghost" data-act="copycode">Copy code</button>
          </div>
          <p class="gc-note">${players.length}/4 sailors aboard</p>
        </div>
        <div class="gc-card">
          <span class="gc-opt-label">Crew</span>
          <ul class="gc-crewlist">${seats.map((p) => `
            <li style="--seat:${CREW_CSS[p.slot % 4]}">${critterSVG(CREW_CSS[p.slot % 4], p.hat, 40)}
              <span class="gc-crew-name">${esc(p.name)}${p.slot === net.slot ? ' <em>(you)</em>' : ''}</span>
              ${p.slot === 0 && !p.bot ? '<span class="gc-pill">Host</span>' : ''}${p.bot ? '<span class="gc-pill gc-pill-bot">Bot</span>' : ''}
            </li>`).join('')}
            ${seats.length < 4 ? `<li class="is-empty">Waiting for sailors… share the code!</li>` : ''}
          </ul>
        </div>
        <div class="gc-card gc-lobby-course">
          <span class="gc-opt-label">River ${host ? '' : '(the host picks)'}</span>
          ${host ? `<div class="gc-courses is-compact">${this._courseCards(course.id, { compact: true, allUnlocked: true })}</div>
            <div class="gc-opt">
              <span class="gc-opt-label">Bots fill empty seats</span>
              <div class="gc-stepper">
                <button class="gc-btn gc-btn-icon" data-act="nbots-" aria-label="Fewer bots">−</button>
                <span class="gc-stepper-val">${bots}</span>
                <button class="gc-btn gc-btn-icon" data-act="nbots+" aria-label="More bots">+</button>
              </div>
            </div>
            <button class="gc-btn gc-btn-primary gc-btn-xl" data-act="start" data-autofocus>Cast off!</button>`
          : `<div class="gc-courses is-compact">${this._courseCards(course.id, { compact: true, allUnlocked: true }).replace(/data-act="course"/g, 'data-act="none" tabindex="-1"')}</div>
            <p class="gc-wait"><span class="gc-dots"><i></i><i></i><i></i></span> Waiting for the host to start</p>`}
        </div>
      </div>`, () => g.leaveOnline());
    this._on(el, 'leave', () => g.leaveOnline());
    const copy = async (text, msg) => {
      try {
        await navigator.clipboard.writeText(text);
        this.toast(msg);
      } catch {
        this.toast(text);
      }
    };
    this._on(el, 'copy', () => copy(link, 'Invite link copied. Paste it to your friends!'));
    this._on(el, 'copycode', () => copy(net.code, 'Room code copied.'));
    if (host) {
      this._on(el, 'course', (b) => net.setSettings({ course: b.dataset.id }));
      this._on(el, 'nbots-', () => net.setSettings({ bots: net.settings.bots - 1 }));
      this._on(el, 'nbots+', () => net.setSettings({ bots: net.settings.bots + 1 }));
      this._on(el, 'start', () => g.startOnlineRace());
    }
  }

  updatePing(rtt) {
    const el = this.screenEl.querySelector('[data-ping]');
    if (el) el.textContent = `${Math.round(rtt)} ms`;
  }

  // ------------------------------------------------------------ loading

  showLoading(course) {
    const tips = [
      'Stand behind the mast and blast forward to go straight.',
      'Blasting from a corner spins the raft. Use it to turn!',
      'Tap Shift (or right-click) for a Big Puff when you need a burst.',
      'Hard hits can throw sailors overboard. Swim back to the raft!',
      'Your gust meter refills when you stop blasting for a moment.',
      'Two sailors on opposite corners pushing the same way go dead straight.',
      'One touch on a rock or log wrecks the raft. Respawns are instant!',
      'Waterfalls launch the raft. Hold on tight!',
    ];
    const tip = tips[Math.floor(Math.random() * tips.length)];
    this.loadingEl.hidden = false;
    this.loadingEl.className = `gc-loading gc-theme-${course.theme}`;
    this.loadingEl.innerHTML = `
      <div class="gc-loading-card">
        <span class="gc-opt-label">${DIFF[course.difficulty]} river</span>
        <h2>${esc(course.name)}</h2>
        <div class="gc-bar"><i style="width:0%"></i></div>
        <p class="gc-tip"><b>Tip</b> ${esc(tip)}</p>
      </div>`;
    this._loadBar = this.loadingEl.querySelector('.gc-bar i');
  }

  loadingProgress(p) {
    if (this._loadBar) this._loadBar.style.width = `${Math.round(p * 100)}%`;
  }

  hideLoading() {
    this.loadingEl.hidden = true;
    this.loadingEl.innerHTML = '';
    this._loadBar = null;
  }

  // ------------------------------------------------------------ HUD

  showHUD(race) {
    const sim = race.sim;
    const course = race.course;
    const L = sim.finishS;
    const ticks = sim.checkpoints.map((s) => `<i class="gc-tick" style="left:${(s / L) * 100}%"></i>`).join('');
    this.hudEl.hidden = false;
    this.hudEl.innerHTML = `
      <div class="gc-hud-top">
        <div class="gc-hud-course">
          <span class="gc-hud-name">${esc(course.name)}</span>
          <div class="gc-progress"><div class="gc-progress-fill"></div>${ticks}<i class="gc-flag"></i><i class="gc-raftdot"></i></div>
        </div>
        <div class="gc-hud-timer"><span class="gc-time">0:00.0</span><span class="gc-target"></span></div>
        <div class="gc-hud-right">
          <div class="gc-hud-shells"><span class="gc-shell-icon" aria-hidden="true"></span><span class="gc-shell-n">0</span><span class="gc-shell-of">/${sim.shells.length}</span></div>
          <div class="gc-hud-wrecks" title="Wrecks"><span class="gc-wreck-icon" aria-hidden="true"></span><span class="gc-wreck-n">0</span></div>
        </div>
      </div>
      <div class="gc-hud-crew"></div>
      <div class="gc-hud-hint" hidden></div>
      <div class="gc-hud-net" hidden></div>
      <button class="gc-hud-pause" aria-label="Pause"><i></i><i></i></button>`;
    this.hudEl.querySelector('.gc-hud-pause').addEventListener('click', () => this.game.togglePause());
    this.hud = {
      fill: this.hudEl.querySelector('.gc-progress-fill'),
      dot: this.hudEl.querySelector('.gc-raftdot'),
      time: this.hudEl.querySelector('.gc-time'),
      target: this.hudEl.querySelector('.gc-target'),
      shells: this.hudEl.querySelector('.gc-shell-n'),
      wrecks: this.hudEl.querySelector('.gc-wreck-n'),
      crew: this.hudEl.querySelector('.gc-hud-crew'),
      hint: this.hudEl.querySelector('.gc-hud-hint'),
      net: this.hudEl.querySelector('.gc-hud-net'),
      last: {},
      crewKey: '',
      bars: [],
    };
  }

  hideHUD() {
    this.hudEl.hidden = true;
    this.hudEl.innerHTML = '';
    this.hud = null;
  }

  _set(key, el, value, prop = 'textContent') {
    const h = this.hud;
    if (h.last[key] === value) return;
    h.last[key] = value;
    if (prop === 'textContent') el.textContent = value;
    else if (prop === 'html') el.innerHTML = value;
    else el.style[prop] = value;
  }

  updateHUD(race) {
    const h = this.hud;
    if (!h) return;
    const sim = race.sim;
    const t = sim.phase === 'finished' ? sim.finishTime : sim.phase === 'run' ? sim.raceTime : 0;
    this._set('time', h.time, fmtTime(t));
    const m = race.course.medals;
    const next = t <= m.gold ? ['gold', m.gold] : t <= m.silver ? ['silver', m.silver] : t <= m.bronze ? ['bronze', m.bronze] : null;
    this._set('target', h.target, next ? `${medalDot(next[0])} ${fmtTime(next[1])}` : 'Keep going!', 'html');
    const f = Math.max(0, Math.min(1, sim.raft.s / sim.finishS));
    const pct = (f * 100).toFixed(1) + '%';
    this._set('fill', h.fill, pct, 'width');
    this._set('dot', h.dot, pct, 'left');
    this._set('shells', h.shells, String(sim.shellCount));
    this._set('wrecks', h.wrecks, String(sim.crashes));
    // crew cards
    const key = sim.crew.map((c) => `${c.slot}:${c.name}:${c.bot}`).join('|');
    if (key !== h.crewKey) {
      h.crewKey = key;
      h.crew.innerHTML = sim.crew.map((c) => `
        <div class="gc-crewcard${c.slot === race.localSlot ? ' is-me' : ''}" style="--seat:${CREW_CSS[c.color % 4]}">
          <span class="gc-crewcard-dot"></span>
          <span class="gc-crewcard-name">${esc(c.name)}${c.bot ? ' <em>bot</em>' : ''}</span>
          <span class="gc-gas"><i></i></span>
        </div>`).join('');
      h.bars = [...h.crew.querySelectorAll('.gc-crewcard')].map((el) => ({ el, bar: el.querySelector('.gc-gas i') }));
    }
    sim.crew.forEach((c, i) => {
      const b = h.bars[i];
      if (!b) return;
      const w = Math.round(c.gas * 100) + '%';
      if (b.w !== w) { b.bar.style.width = w; b.w = w; }
      const st = c.mode === 'swim' ? 'swim' : c.out ? 'out' : c.blasting ? 'blast' : '';
      if (b.st !== st) { b.el.dataset.state = st; b.st = st; }
    });
    // hints
    let hint = '';
    if (sim.phase === 'ready') hint = race.role === 'client' || race.role === 'host' ? 'Waiting for the whole crew to load…' : '';
    else if (sim.phase === 'run') {
      const me = sim.crewBySlot(race.localSlot);
      if (sim.wreck > 0) hint = 'Wrecked! Back to the last checkpoint…';
      else if (me && me.mode === 'swim') hint = 'Overboard! Swim back to the raft.';
      else if (sim.invuln > 0.3 && sim.crashes > 0 && sim.raceTime < 200) hint = 'Don’t touch rocks, logs or mill wheels: one bump and the raft breaks!';
      else if (sim.stuck > 3.5) hint = 'Stuck? Press <kbd>R</kbd> to go back to the last checkpoint';
      else if (race.course.id === 'lagoon' && race.role !== 'attract') {
        const s = sim.raft.s;
        if (s < 45) hint = race.game.touch ? 'Hold <b>BLAST</b>: the raft moves the way your sailor faces' : 'Hold <kbd>Space</kbd> or click to blast. The raft moves the way you face (aim with the mouse)';
        else if (s < 120) hint = 'Stand <b>behind the mast</b> to go straight. Blast from a <b>corner</b> to turn.';
        else if (s < 190) hint = race.game.touch ? 'Tap <b>PUFF</b> for a Big Puff boost' : 'Tap <kbd>Shift</kbd> or right-click for a Big Puff boost';
      }
    }
    if (hint !== h.last.hint) {
      h.last.hint = hint;
      h.hint.hidden = !hint;
      h.hint.innerHTML = hint;
    }
    if (race.net && !race.net.isHost) {
      const ms = Math.round(race.net.rtt || 0);
      this._set('net', h.net, ms ? `${ms} ms` : '');
      h.net.hidden = !ms;
      h.net.dataset.bad = ms > 220 ? '1' : '';
    }
  }

  banner(text, kind = '') {
    const b = document.createElement('div');
    b.className = `gc-banner gc-banner-${kind}`;
    b.textContent = text;
    this.bannerEl.replaceChildren(b);
    setTimeout(() => b.classList.add('is-out'), kind === 'count' ? 650 : 1100);
    setTimeout(() => b.remove(), kind === 'count' ? 950 : 1500);
  }

  toast(text, kind = '') {
    const t = document.createElement('div');
    t.className = `gc-toast ${kind ? 'gc-toast-' + kind : ''}`;
    t.textContent = text;
    this.toastEl.appendChild(t);
    while (this.toastEl.children.length > 3) this.toastEl.firstElementChild.remove();
    setTimeout(() => t.classList.add('is-out'), 2800);
    setTimeout(() => t.remove(), 3300);
  }

  // ------------------------------------------------------------ pause / results

  showPause(race) {
    const online = !!race.net;
    const canRestart = race.role === 'solo' || race.role === 'local';
    const el = this._show('pause', `
      <div class="gc-card gc-pause">
        <h2>${online ? 'Menu' : 'Paused'}</h2>
        ${online ? '<p class="gc-note">The river keeps flowing for your crew.</p>' : ''}
        <div class="gc-menu">
          <button class="gc-btn gc-btn-primary" data-act="resume" data-autofocus>Resume</button>
          ${canRestart ? '<button class="gc-btn" data-act="restart">Restart river</button>' : ''}
          <button class="gc-btn" data-act="respawn">Back to checkpoint</button>
          <button class="gc-btn gc-btn-ghost" data-act="howto">How to play</button>
          <button class="gc-btn gc-btn-ghost" data-act="settings">Settings</button>
          <button class="gc-btn gc-btn-ghost" data-act="quit">${online ? 'Leave room' : 'Quit to menu'}</button>
        </div>
      </div>`, () => this.game.togglePause());
    this._on(el, 'resume', () => this.game.togglePause());
    this._on(el, 'restart', () => this.game.restartRace());
    this._on(el, 'respawn', () => { this.game.togglePause(); race.requestRespawn(); });
    this._on(el, 'howto', () => this.showHowTo());
    this._on(el, 'settings', () => this.showSettings());
    this._on(el, 'quit', () => this.game.quitRace());
  }

  showResults(race, r, rec) {
    const g = this.game;
    const course = COURSE_BY_ID[r.course];
    const idx = COURSES.indexOf(course);
    const next = COURSES[idx + 1];
    const online = !!race.net;
    const host = online && race.net.isHost;
    const m = course.medals;
    const el = this._show('results', `
      <div class="gc-card gc-results">
        <div class="gc-results-medal">${medalDot(r.medal, 'xl')}<span>${MEDAL_LABEL[r.medal]}${r.medal !== 'none' ? ' medal' : ''}</span></div>
        <h2>${esc(course.name)}</h2>
        <div class="gc-results-time">${fmtTime(r.time)}${rec && rec.newBest ? '<span class="gc-ribbon">New best!</span>' : ''}</div>
        <div class="gc-stats">
          <div><b>${r.shells}/${r.maxShells}</b><span>Shells</span></div>
          <div><b>${r.wrecks ?? 0}</b><span>Wrecks</span></div>
          <div><b>${r.knocks}</b><span>Overboard</span></div>
        </div>
        <ul class="gc-targets">
          <li class="${r.time <= m.gold ? 'is-hit' : ''}">${medalDot('gold')} ${fmtTime(m.gold)}</li>
          <li class="${r.time <= m.silver ? 'is-hit' : ''}">${medalDot('silver')} ${fmtTime(m.silver)}</li>
          <li class="${r.time <= m.bronze ? 'is-hit' : ''}">${medalDot('bronze')} ${fmtTime(m.bronze)}</li>
        </ul>
        <p class="gc-crewline">${r.crew.map((c) => `<span style="--seat:${CREW_CSS[c.color % 4]}">${esc(c.name)}</span>`).join('')}</p>
        <div class="gc-menu gc-menu-row">
          ${online ? (host ? `
            <button class="gc-btn gc-btn-primary" data-act="again" data-autofocus>Race again</button>
            ${next ? '<button class="gc-btn" data-act="nextonline">Next river →</button>' : ''}
            <button class="gc-btn gc-btn-ghost" data-act="lobby">Back to lobby</button>`
            : '<p class="gc-wait"><span class="gc-dots"><i></i><i></i><i></i></span> Waiting for the host</p><button class="gc-btn gc-btn-ghost" data-act="leave">Leave room</button>') : `
            <button class="gc-btn gc-btn-primary" data-act="retry" data-autofocus>Retry</button>
            ${next ? `<button class="gc-btn" data-act="next">Next: ${esc(next.name)} →</button>` : ''}
            <button class="gc-btn gc-btn-ghost" data-act="courses">Rivers</button>
            <button class="gc-btn gc-btn-ghost" data-act="menu">Menu</button>`}
        </div>
      </div>`, null);
    this._on(el, 'retry', () => g.restartRace());
    this._on(el, 'next', () => g.startOffline(race.role, next.id));
    this._on(el, 'courses', () => g.toMenu(race.role === 'local' ? 'local-courses' : 'courses'));
    this._on(el, 'menu', () => g.toMenu());
    this._on(el, 'again', () => g.startOnlineRace());
    this._on(el, 'nextonline', () => { race.net.setSettings({ course: next.id }); g.startOnlineRace(); });
    this._on(el, 'lobby', () => g.onlineToLobby());
    this._on(el, 'leave', () => g.leaveOnline());
    if (r.medal !== 'none') setTimeout(() => g.sound.play('medal'), 250);
  }

  // ------------------------------------------------------------ modals

  _modal(html) {
    this._modalReturn = document.activeElement;
    this.modalEl.hidden = false;
    this.modalEl.innerHTML = `<div class="gc-modal-card" role="dialog" aria-modal="true">${html}</div>`;
    this.modalEl.onclick = (e) => { if (e.target === this.modalEl) this.closeModal(); };
    const f = this.modalEl.querySelector('[data-autofocus]') || this.modalEl.querySelector('button');
    if (f) setTimeout(() => f.focus(), 30);
    return this.modalEl.firstElementChild;
  }

  closeModal() {
    this.modalEl.hidden = true;
    this.modalEl.innerHTML = '';
    if (this._modalReturn && this._modalReturn.isConnected) this._modalReturn.focus();
  }

  showSettings() {
    const g = this.game;
    const s = g.save.settings;
    const el = this._modal(`
      <h2>Settings</h2>
      <div class="gc-settings">
        ${[['master', 'Master volume'], ['music', 'Music'], ['sfx', 'Sound effects']].map(([k, l]) => `
          <label class="gc-slider"><span>${l}</span><input type="range" min="0" max="100" value="${Math.round(s[k] * 100)}" data-vol="${k}"/><output>${Math.round(s[k] * 100)}</output></label>`).join('')}
        <label class="gc-field"><span>Graphics</span>
          <select class="gc-input" data-quality>
            ${['auto', 'high', 'medium', 'low'].map((q) => `<option value="${q}" ${s.quality === q ? 'selected' : ''}>${q === 'auto' ? 'Auto (recommended)' : q[0].toUpperCase() + q.slice(1)}</option>`).join('')}
          </select></label>
        <label class="gc-check"><input type="checkbox" data-shake ${s.shake ? 'checked' : ''}/> <span>Camera shake</span></label>
        <label class="gc-check"><input type="checkbox" data-helpers ${s.helpers ? 'checked' : ''}/> <span>Push arrows under sailors</span></label>
        <label class="gc-check"><input type="checkbox" data-silly ${s.silly !== false ? 'checked' : ''}/> <span>Silly toot sounds (off = wind)</span></label>
      </div>
      <p class="gc-note">Graphics changes apply from the next river.</p>
      <div class="gc-menu gc-menu-row"><button class="gc-btn gc-btn-primary" data-act="close" data-autofocus>Done</button></div>`);
    el.querySelectorAll('[data-vol]').forEach((inp) => {
      inp.addEventListener('input', () => {
        s[inp.dataset.vol] = Number(inp.value) / 100;
        inp.nextElementSibling.textContent = inp.value;
        g.applyVolumes();
      });
      inp.addEventListener('change', () => g.save.write());
    });
    el.querySelector('[data-quality]').addEventListener('change', (e) => { s.quality = e.target.value; g.save.write(); g.applyQualitySetting(); });
    el.querySelector('[data-shake]').addEventListener('change', (e) => { s.shake = e.target.checked; g.save.write(); });
    el.querySelector('[data-helpers]').addEventListener('change', (e) => { s.helpers = e.target.checked; g.save.write(); });
    el.querySelector('[data-silly]').addEventListener('change', (e) => { s.silly = e.target.checked; g.save.write(); g.applyVolumes(); g.sound.play('puff'); });
    this._on(el, 'close', () => this.closeModal());
  }

  showHowTo() {
    const el = this._modal(`
      <h2>How to play</h2>
      <div class="gc-howto">
        <div class="gc-howto-art" aria-hidden="true">
          <div class="gc-mini-raft">
            <span class="gc-mini-mast"></span>
            <span class="gc-mini-sailor s1"><i></i></span>
            <span class="gc-mini-sailor s2"><i></i></span>
          </div>
          <div class="gc-mini-cap"><b>Behind the mast</b> = straight<br/><b>At a corner</b> = turn</div>
        </div>
        <ol class="gc-howto-list">
          <li><b>Blast</b> your gust horn and the raft is pushed the way your sailor faces.</li>
          <li><b>Where you stand matters.</b> A push through the middle goes straight; a push from the side spins the raft.</li>
          <li>Your <b>gust meter</b> runs down while you blast and refills when you rest. <b>Big Puff</b> is a burst that costs a third of it.</li>
          <li><b>Don't touch obstacles!</b> One bump on a rock, log or mill wheel and the raft breaks. Everyone respawns at the last checkpoint (they come every ~60 m).</li>
          <li>Hard landings can throw sailors <b>overboard</b>. Swim back, or wait and you'll be hauled aboard.</li>
          <li>Grab <b>golden shells</b>, pass every checkpoint and reach the finish arch as fast as you can.</li>
        </ol>
      </div>
      <table class="gc-keys">
        <thead><tr><th></th><th>Keyboard + mouse</th><th>Player 2 keys</th><th>Gamepad</th><th>Touch</th></tr></thead>
        <tbody>
          <tr><th>Walk</th><td><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></td><td>Arrows</td><td>Left stick</td><td>Joystick</td></tr>
          <tr><th>Aim</th><td>Mouse (or walk direction)</td><td>Walk direction</td><td>Right stick</td><td>Joystick</td></tr>
          <tr><th>Blast</th><td><kbd>Space</kbd> / left click</td><td><kbd>Enter</kbd></td><td>RT / A</td><td>BLAST</td></tr>
          <tr><th>Big Puff</th><td><kbd>Shift</kbd> / right click</td><td>Right <kbd>Shift</kbd></td><td>X / RB</td><td>PUFF</td></tr>
          <tr><th>Checkpoint</th><td><kbd>R</kbd></td><td><kbd>.</kbd></td><td>Y</td><td>↺</td></tr>
          <tr><th>Pause</th><td><kbd>Esc</kbd></td><td></td><td>Start</td><td>Pause button</td></tr>
        </tbody>
      </table>
      <div class="gc-menu gc-menu-row"><button class="gc-btn gc-btn-primary" data-act="close" data-autofocus>Got it!</button></div>`);
    this._on(el, 'close', () => this.closeModal());
  }

  showError(title, message, actions = []) {
    const el = this._show('error', `
      <div class="gc-card gc-errorcard">
        <h2>${esc(title)}</h2>
        <p>${esc(message)}</p>
        <div class="gc-menu gc-menu-row">${actions.map((a, i) => `<button class="gc-btn ${i === 0 ? 'gc-btn-primary' : ''}" data-act="a${i}">${esc(a.label)}</button>`).join('')}</div>
      </div>`, null);
    actions.forEach((a, i) => this._on(el, 'a' + i, a.onClick));
  }
}
