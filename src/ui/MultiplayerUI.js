import { h, clear } from './dom.js';
import { Button } from './components/Button.js';
import { Badge } from './components/Badge.js';
import { Panel } from './components/Panel.js';
import { HazardBand } from './components/HazardBand.js';
import { CARS, getCar } from '../cars/CarData.js';
import { CIRCUITS, CIRCUIT_ORDER } from '../tracks/TrackData.js';
import { trackPreview } from '../tracks/TrackPreview.js';
import { DEVICE_LABELS, SPLIT_SCHEMES, keyLabel } from '../controls/InputManager.js';
import { NetSession, MAX_PLAYERS } from '../net/NetSession.js';

// Multiplayer screens (phase 'select'): choose split-screen or online,
// split-screen setup, online host / join, and the room lobby.

const DEVICES = ['kbA', 'kbB', 'pad0', 'pad1', 'pad2', 'pad3'];

// Multiplayer is for playing with friends: every car and circuit is open.
function unlockedCars() {
  return CARS.slice();
}

function unlockedCircuits() {
  return CIRCUIT_ORDER.slice();
}

/** Small "◀ value ▶" stepper. */
function stepper(label, value, onStep) {
  const val = h('span', { className: 'stepper__value', text: value });
  const prev = h('button', { className: 'btn btn--secondary btn--sm', text: '◀', attrs: { type: 'button', 'aria-label': `Previous ${label}` } });
  const next = h('button', { className: 'btn btn--secondary btn--sm', text: '▶', attrs: { type: 'button', 'aria-label': `Next ${label}` } });
  prev.addEventListener('click', () => val.replaceChildren(String(onStep(-1))));
  next.addEventListener('click', () => val.replaceChildren(String(onStep(1))));
  return h('span', { className: 'stepper' }, [prev, val, next]);
}

function deviceHint(dev) {
  const s = SPLIT_SCHEMES[dev];
  if (s) return `${s.throttle.concat(s.left, s.brake, s.right).map(keyLabel).join(' ')} · drift ${keyLabel(s.handbrake[0])} · nitro ${keyLabel(s.boost[0])} · cam ${keyLabel(s.camera[0])}`;
  return 'RT/LT drive · stick steer · A drift · X nitro · B camera';
}

// ---------------------------------------------------------------- choose

export function renderMultiplayer(ui) {
  ui.back = () => ui._go('menu', { screen: 'main' });
  const card = (title, desc, badge, onClick, auto) =>
    h('button', { className: 'card mode-card', attrs: { type: 'button', 'data-autofocus': auto ? '' : undefined }, onClick }, [
      h('div', { className: 'card__title', text: title }),
      h('p', { className: 't-body', text: desc }),
      h('div', { className: 'card__meta' }, [Badge(badge)]),
    ]);
  ui._screen('screen--mode', [
    ui._header('Multiplayer', '1 to 6 drivers'),
    h('div', { className: 'mode-grid' }, [
      card('Split-screen', 'Up to 6 players on this computer. Two share the keyboard (WASD and arrows), the rest use gamepads. Add AI to fill the grid.', { label: '2–6 players', tone: 'info' }, () => {
        ui.click();
        ui.game.store.set({ screen: 'split' });
        ui.render(ui.game.store.state);
      }, true),
      card('Online', 'Play from different computers with a 4-letter room code. Up to 6 drivers; the host can add AI. Needs an internet connection.', { label: 'Room code', tone: 'good' }, () => {
        ui.click();
        ui.game.store.set({ screen: 'online' });
        ui.render(ui.game.store.state);
      }),
    ]),
    ui._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => ui.back() })]),
  ]);
}

// ---------------------------------------------------------------- split-screen

export function renderSplit(ui) {
  const cars = unlockedCars();
  const circuits = unlockedCircuits();
  const st = (ui.split = ui.split || {
    players: 2,
    slots: DEVICES.map((dev, i) => ({ name: `P${i + 1}`, device: dev, car: cars[i % cars.length].id })),
    circuitId: circuits[0],
    laps: 3,
    ai: 2,
    mode: 'grandprix',
  });
  if (!circuits.includes(st.circuitId)) st.circuitId = circuits[0];
  ui.back = () => {
    ui.click();
    ui.game.store.set({ screen: 'mp' });
    ui.render(ui.game.store.state);
  };
  const rows = h('div', { className: 'mp-slots' });
  const drawRows = () => {
    clear(rows);
    for (let i = 0; i < st.players; i++) {
      const slot = st.slots[i];
      const pads = ui.game.input.padCount;
      const devOk = !slot.device.startsWith('pad') || Number(slot.device.slice(3)) < pads;
      rows.appendChild(
        h('div', { className: 'mp-slot' }, [
          h('span', { className: 'mp-slot__tag', text: `P${i + 1}` }),
          stepper('car', getCar(slot.car).name, (d) => {
            const idx = cars.findIndex((c) => c.id === slot.car);
            slot.car = cars[(idx + d + cars.length) % cars.length].id;
            return getCar(slot.car).name;
          }),
          stepper('controls', DEVICE_LABELS[slot.device], (d) => {
            const idx = DEVICES.indexOf(slot.device);
            slot.device = DEVICES[(idx + d + DEVICES.length) % DEVICES.length];
            setTimeout(drawRows, 0);
            return DEVICE_LABELS[slot.device];
          }),
          h('span', { className: 't-label-xs t-secondary mp-slot__hint', text: deviceHint(slot.device) }),
          devOk ? null : Badge({ label: 'Connect this gamepad', tone: 'warn' }),
        ]),
      );
    }
  };
  drawRows();
  const start = Button({ label: 'Start', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => startSplit(ui) });
  start.dataset.autofocus = '';
  ui.primary = start;
  const preview = h('div', { className: 'mp-preview' }, [trackPreview(st.circuitId, 320, 190)]);
  ui._screen('screen--setup', [
    ui._header('Split-screen', `${st.players} players on one screen`),
    h('div', { className: 'setup' }, [
      Panel({
        label: 'Players',
        raised: true,
        className: 'setup__panel',
        children: [
          ui._segmented('Players', [2, 3, 4, 5, 6], st.players, (v) => {
            st.players = v;
            st.ai = Math.min(st.ai, 8 - v);
            drawRows();
          }),
          rows,
          h('p', { className: 't-body', text: `Gamepads connected: ${ui.game.input.padCount}. Press any button on a gamepad if it is not detected.` }),
        ],
      }),
      Panel({
        label: 'Race',
        className: 'setup__panel',
        children: [
          ui._segmented('Circuit', circuits, st.circuitId, (v) => {
            st.circuitId = v;
            preview.replaceChildren(trackPreview(v, 320, 190));
          }, (v) => CIRCUITS[v].name.replace(' GP', '')),
          preview,
          ui._segmented('Mode', ['grandprix', 'drift'], st.mode, (v) => (st.mode = v), (v) => (v === 'drift' ? 'Drift battle' : 'Race')),
          ui._segmented('Laps', [1, 2, 3, 4, 5], st.laps, (v) => (st.laps = v)),
          ui._segmented('AI cars', [0, 1, 2, 3, 4, 5, 6], st.ai, (v) => (st.ai = Math.min(v, 8 - st.players))),
        ],
      }),
    ]),
    ui._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => ui.back() }), start]),
  ]);
}

function startSplit(ui) {
  const st = ui.split;
  ui.click();
  const humans = st.slots.slice(0, st.players).map((p, i) => {
    const car = getCar(p.car);
    return { name: `P${i + 1}`, carId: car.id, liveryId: ui.game.save.data.livery[car.id] || car.defaultLivery, device: p.device };
  });
  ui.game.startRace({ circuitId: st.circuitId, mode: st.mode, laps: st.laps, opponents: Math.min(st.ai, 8 - st.players), difficulty: 'medium', humans, tokens: false });
}

// ---------------------------------------------------------------- online: host / join

export function renderOnline(ui) {
  const game = ui.game;
  const save = game.save.data;
  const car = getCar(save.carId);
  ui.back = () => {
    ui.click();
    game.store.set({ screen: 'mp' });
    ui.render(game.store.state);
  };
  const st = (ui.online = ui.online || { kind: 'peer', busy: false, error: '' });
  const nameInput = h('input', { className: 'text-input', attrs: { type: 'text', maxlength: 14, value: save.settings.playerName, 'aria-label': 'Your name', autocomplete: 'off' } });
  const codeInput = h('input', { className: 'text-input text-input--code', attrs: { type: 'text', maxlength: 4, placeholder: 'ABCD', 'aria-label': 'Room code', autocomplete: 'off' } });
  codeInput.addEventListener('input', () => (codeInput.value = codeInput.value.toUpperCase().replace(/[^A-Z]/g, '')));
  const status = h('p', { className: 't-body mp-status', attrs: { role: 'status' }, text: st.error });
  const setBusy = (on, msg = '') => {
    st.busy = on;
    status.textContent = msg;
    hostBtn.disabled = on;
    joinBtn.disabled = on;
  };
  const session = () => {
    const name = nameInput.value.trim() || 'Driver';
    game.save.update((d) => (d.settings.playerName = name));
    return new NetSession({ kind: st.kind, name, carId: car.id, livery: save.livery[car.id] || car.defaultLivery });
  };
  const hostBtn = Button({
    label: 'Create room',
    variant: 'primary',
    size: 'lg',
    onClick: async () => {
      setBusy(true, 'Creating room…');
      const s = session();
      try {
        await s.create();
        game.attachNet(s);
        st.error = '';
        game.store.set({ screen: 'lobby' });
        ui.render(game.store.state);
      } catch (err) {
        s.close();
        setBusy(false, err.message);
      }
    },
  });
  hostBtn.dataset.autofocus = '';
  const joinBtn = Button({
    label: 'Join',
    variant: 'secondary',
    size: 'lg',
    onClick: async () => {
      if (!/^[A-Z]{4}$/.test(codeInput.value)) {
        setBusy(false, 'Enter the 4-letter room code from the host.');
        codeInput.focus();
        return;
      }
      setBusy(true, `Joining ${codeInput.value}…`);
      const s = session();
      try {
        await s.join(codeInput.value);
        game.attachNet(s);
        st.error = '';
        game.store.set({ screen: 'lobby' });
        ui.render(game.store.state);
      } catch (err) {
        s.close();
        setBusy(false, err.message);
      }
    },
  });
  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') joinBtn.click();
  });
  ui.primary = hostBtn;
  ui._screen('screen--setup', [
    ui._header('Online', 'Up to 6 drivers with a room code'),
    h('div', { className: 'setup' }, [
      Panel({
        label: 'You',
        raised: true,
        className: 'setup__panel',
        children: [
          h('label', { className: 'field' }, [h('span', { className: 'field__label', text: 'Name' }), nameInput]),
          h('div', { className: 'field' }, [h('span', { className: 'field__label', text: 'Car' }), h('span', { className: 't-label', text: car.name }), Button({ label: 'Garage', variant: 'ghost', size: 'sm', onClick: () => ui._go('garage', { returnTo: 'select', returnScreen: 'online' }) })]),
          ui._segmented('Connection', ['peer', 'local'], st.kind, (v) => (st.kind = v), (v) => (v === 'peer' ? 'Internet' : 'This browser')),
          h('p', { className: 't-body', text: 'Internet connects every player straight to the host. If a friend cannot join, let the player on home Wi-Fi host (mobile data and office or campus Wi-Fi often block direct links). "This browser" links tabs and windows on one computer.' }),
        ],
      }),
      Panel({
        label: 'Room',
        className: 'setup__panel',
        children: [
          h('div', { className: 't-label-sm t-secondary', text: 'Host a race' }),
          hostBtn,
          HazardBand({}),
          h('div', { className: 't-label-sm t-secondary', text: 'Join a friend' }),
          h('div', { className: 'mp-join' }, [codeInput, joinBtn]),
          status,
        ],
      }),
    ]),
    ui._footer([Button({ label: 'Back', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => ui.back() })]),
  ]);
}

// ---------------------------------------------------------------- lobby

export function renderLobby(ui) {
  const game = ui.game;
  const net = game.net;
  if (!net) {
    game.store.set({ screen: 'online' });
    ui.render(game.store.state);
    return;
  }
  const save = game.save.data;
  ui.back = () => {
    ui.click();
    game.closeNet();
    game.store.set({ screen: 'online' });
    ui.render(game.store.state);
  };
  const list = h('ol', { className: 'mp-lobby' });
  for (const p of net.players) {
    list.appendChild(
      h('li', { className: p.slot === net.slot ? 'is-me' : '' }, [
        h('span', { className: 'mp-lobby__name', text: p.name }),
        h('span', { className: 't-label-xs t-secondary', text: getCar(p.carId).name }),
        p.slot === 0 ? Badge({ label: 'Host', tone: 'solid' }) : null,
        p.slot === net.slot ? Badge({ label: 'You', tone: 'info' }) : null,
      ]),
    );
  }
  const cars = unlockedCars();
  const circuits = unlockedCircuits();
  const meCar = stepper('car', getCar(net.me.carId).name, (d) => {
    const idx = Math.max(0, cars.findIndex((c) => c.id === net.me.carId));
    const c = cars[(idx + d + cars.length) % cars.length];
    net.updateMe({ carId: c.id, livery: save.livery[c.id] || c.defaultLivery });
    return c.name;
  });
  const children = [
    h('div', { className: 'mp-code' }, [h('span', { className: 't-label-sm t-secondary', text: 'Room code' }), h('span', { className: 't-display-1 mp-code__value', text: net.code || '----' })]),
    h('p', { className: 't-body', text: `${net.players.length} / ${MAX_PLAYERS} drivers. Friends open the game, choose Multiplayer → Online, and enter this code.` }),
    list,
    h('div', { className: 'field' }, [h('span', { className: 'field__label', text: 'Your car' }), meCar]),
  ];
  let start = null;
  const hostControls = [];
  const waitInfo = [];
  if (net.isHost) {
    const S = net.settings;
    if (!circuits.includes(S.circuitId)) net.setSettings({ circuitId: circuits[0] });
    hostControls.push(
      ui._segmented('Circuit', circuits, S.circuitId, (v) => net.setSettings({ circuitId: v }), (v) => CIRCUITS[v].name.replace(' GP', '')),
      ui._segmented('Laps', [1, 2, 3, 4, 5], S.laps, (v) => net.setSettings({ laps: v })),
      ui._segmented('AI cars', [0, 1, 2, 3, 4], Math.min(S.ai, 4), (v) => net.setSettings({ ai: v })),
    );
    start = Button({ label: 'Start race', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => {
      ui.click();
      net.start();
    } });
    start.dataset.autofocus = '';
    ui.primary = start;
  } else {
    const S = net.settings;
    waitInfo.push(
      h('p', { className: 't-label', text: `${CIRCUITS[S.circuitId] ? CIRCUITS[S.circuitId].name : ''} · ${S.laps} laps · ${S.ai} AI` }),
      h('p', { className: 't-body mp-status', text: 'Waiting for the host to start the race…' }),
    );
  }
  const right = [trackPreview(net.settings.circuitId, 360, 200)];
  if (net.isHost) right.push(...hostControls, start);
  else right.push(...waitInfo);
  ui._screen('screen--setup', [
    ui._header('Lobby', net.isHost ? 'You are hosting' : 'Joined'),
    h('div', { className: 'setup' }, [
      Panel({ label: 'Drivers', raised: true, className: 'setup__panel', children }),
      Panel({ label: 'Race', className: 'setup__panel', children: right }),
    ]),
    ui._footer([Button({ label: 'Leave room', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => ui.back() })]),
  ]);
}
