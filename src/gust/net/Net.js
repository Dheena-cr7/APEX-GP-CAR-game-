// Online crew session.
//
// Star topology over a Transport: clients talk only to the host.
//  - Every peer simulates the whole raft locally (prediction), so your own
//    blasts move the raft instantly with no network delay.
//  - Each player owns their own sailor and sends its state 30x a second.
//  - The host's simulation is the authority: it sends snapshots 20x a second
//    (raft, clock, phase, shells, every sailor). Clients blend toward them,
//    so everyone sees the same river without visible snapping.
//  - Messages use an unordered channel; snapshots carry a sequence number
//    and stale ones are dropped, so a slow packet never holds up a new one.

import { PeerTransport, LocalTransport, makeRoomCode } from './Transport.js';

export const MAX_CREW = 4;
export const SNAP_HZ = 20;
export const INPUT_HZ = 30;
const PROTOCOL = 1;
const INTERP_DELAY = 110; // ms behind the newest state for remote sailors
const HOST_SILENT = 7000;
const CLIENT_SILENT = 9000;

const r3 = (v) => Math.round(v * 1000) / 1000;
const PHASES = ['ready', 'countdown', 'run', 'finished'];

export function cleanName(s) {
  const t = String(s || '').replace(/[^\p{L}\p{N} _.-]/gu, '').trim().slice(0, 14);
  return t || 'Sailor';
}

export class GustNet {
  constructor({ kind = 'peer', name = 'Sailor', hat = 0 } = {}) {
    this.kind = kind;
    this.me = { name: cleanName(name), hat: hat | 0 };
    this.transport = kind === 'local' ? new LocalTransport() : new PeerTransport();
    this.isHost = false;
    this.code = null;
    this.slot = -1;
    this.players = []; // {slot, name, hat, peerId, ready, seen}
    this.settings = { course: 'lagoon', bots: 0 };
    this.state = 'idle';
    this.listeners = {};
    this.rtt = 0;
    this.snapSeq = 0;
    this.lastSnap = -1;
    this.inSeq = 0;
    this.crewBuf = new Map(); // slot -> [{at, a}]
    this.lastHeard = performance.now();
    this._timers = [];
    this.transport.onMessage((from, msg) => this._onMessage(from, msg));
    this.transport.onLeave((peerId) => this._onLeave(peerId));
    this.transport.onError((err) => this._emit('error', err));
  }

  on(kind, fn) {
    (this.listeners[kind] || (this.listeners[kind] = [])).push(fn);
    return () => {
      const l = this.listeners[kind];
      const i = l.indexOf(fn);
      if (i >= 0) l.splice(i, 1);
    };
  }

  _emit(kind, ...a) {
    for (const fn of (this.listeners[kind] || []).slice()) {
      try {
        fn(...a);
      } catch (err) {
        console.error(err);
      }
    }
  }

  _every(ms, fn) {
    const id = setInterval(fn, ms);
    this._timers.push(id);
  }

  // ------------------------------------------------------------ lobby

  async create(code) {
    for (let k = 0; ; k++) {
      const c = code || makeRoomCode();
      try {
        await this.transport.host(c);
        code = c;
        break;
      } catch (err) {
        if (code || err.type !== 'unavailable-id' || k >= 3) throw err;
      }
    }
    this.isHost = true;
    this.code = code;
    this.slot = 0;
    this.players = [{ slot: 0, ...this.me, peerId: 'host', ready: true, seen: performance.now() }];
    this.state = 'lobby';
    // drop sailors who went silent (closed laptop, lost Wi-Fi)
    this._every(1000, () => {
      const now = performance.now();
      for (const p of this.players.slice()) {
        if (p.peerId !== 'host' && now - p.seen > CLIENT_SILENT) this._onLeave(p.peerId);
      }
    });
    this._emit('lobby');
    return code;
  }

  async join(code) {
    code = String(code || '').trim().toUpperCase();
    if (!/^[A-Z]{4}$/.test(code)) throw new Error('Room codes are 4 letters.');
    await this.transport.join(code);
    this.code = code;
    this.state = 'joining';
    const hello = () => this.transport.broadcast({ t: 'hello', v: PROTOCOL, ...this.me });
    hello();
    await new Promise((resolve, reject) => {
      const again = setInterval(hello, 1500);
      const timer = setTimeout(() => {
        clearInterval(again);
        reject(new Error('The host did not answer. Check the code and try again.'));
      }, 9000);
      this._welcome = (err) => {
        clearInterval(again);
        clearTimeout(timer);
        this._welcome = null;
        if (err) reject(err);
        else resolve();
      };
    });
    if (this.state === 'joining') this.state = 'lobby';
    this.lastHeard = performance.now();
    // ping for latency, watch for a silent host
    this._every(1000, () => {
      this.transport.broadcast({ t: 'ping', a: performance.now() });
      if (performance.now() - this.lastHeard > HOST_SILENT && this.state !== 'closed') {
        this._close('Lost connection to the host.');
      }
    });
  }

  updateMe(patch) {
    Object.assign(this.me, patch);
    if (patch.name !== undefined) this.me.name = cleanName(patch.name);
    if (this.isHost) {
      Object.assign(this.players[0], this.me);
      this._sendLobby();
    } else this.transport.broadcast({ t: 'me', ...this.me });
  }

  setSettings(patch) {
    if (!this.isHost) return;
    Object.assign(this.settings, patch);
    this.settings.bots = Math.max(0, Math.min(MAX_CREW - this.players.length, this.settings.bots | 0));
    this._sendLobby();
  }

  _publicPlayers() {
    return this.players.map(({ slot, name, hat }) => ({ slot, name, hat }));
  }

  _sendLobby() {
    this.settings.bots = Math.max(0, Math.min(MAX_CREW - this.players.length, this.settings.bots | 0));
    this.transport.broadcast({ t: 'lobby', players: this._publicPlayers(), settings: this.settings, code: this.code, state: this.state });
    this._emit('lobby');
  }

  /** Host: everyone loads the course; the race starts when all are ready. */
  start(seed) {
    if (!this.isHost) return;
    this.state = 'race';
    for (const p of this.players) p.ready = p.peerId === 'host';
    this.crewBuf.clear();
    this.transport.broadcast({ t: 'start', settings: this.settings, players: this._publicPlayers(), seed });
    this._emit('lobby');
  }

  allReady() {
    return this.players.every((p) => p.ready);
  }

  /** Client: tell the host my world is built. */
  sendReady() {
    if (!this.isHost) this.transport.broadcast({ t: 'ready' });
  }

  sendRespawn() {
    if (!this.isHost) this.transport.broadcast({ t: 'respawn' });
  }

  /** Host: results are final. */
  sendEnd(results) {
    if (this.isHost) this.transport.broadcast({ t: 'end', results });
  }

  /** Host: everyone back to the lobby. */
  backToLobby() {
    if (!this.isHost) return;
    this.state = 'lobby';
    this._sendLobby();
    this.transport.broadcast({ t: 'back' });
  }

  // ------------------------------------------------------------ race traffic

  /** Host: snapshot of the authoritative sim. */
  sendSnap(sim) {
    const r = sim.raft;
    const shells = [];
    for (const s of sim.shells) if (s.got) shells.push(s.i);
    const msg = {
      t: 's',
      n: ++this.snapSeq,
      c: r3(sim.clock),
      rt: r3(sim.raceTime),
      ph: PHASES.indexOf(sim.phase),
      cd: r3(sim.cd),
      cp: sim.cpIndex,
      rs: sim.respawns,
      ft: r3(sim.finishTime),
      r: [r3(r.x), r3(r.z), r3(r.yaw), r3(r.vx), r3(r.vz), r3(r.w), r3(r.y), r3(r.vy)],
      sh: shells,
      cr: sim.crew.map((c) => sim.crewState(c).map((v) => (typeof v === 'number' ? r3(v) : v))),
    };
    this.transport.broadcast(msg);
  }

  /** Client: my sailor's state. */
  sendCrew(arr) {
    this.transport.broadcast({ t: 'in', k: ++this.inSeq, a: arr.map((v) => (typeof v === 'number' ? r3(v) : v)) });
  }

  _pushCrew(slot, a) {
    let buf = this.crewBuf.get(slot);
    if (!buf) this.crewBuf.set(slot, (buf = []));
    buf.push({ at: performance.now(), a });
    if (buf.length > 12) buf.shift();
  }

  /** Remote sailor state, interpolated a little in the past for smoothness. */
  sampleCrew(slot, now = performance.now()) {
    const buf = this.crewBuf.get(slot);
    if (!buf || !buf.length) return null;
    const t = now - INTERP_DELAY;
    let i = buf.length - 1;
    while (i > 0 && buf[i - 1].at > t) i--;
    const b = buf[i];
    const a = i > 0 ? buf[i - 1] : null;
    if (!a || b.at <= t || b.a[1] !== a.a[1]) return b.a;
    const f = Math.max(0, Math.min(1, (t - a.at) / (b.at - a.at || 1)));
    const out = b.a.slice();
    for (const k of [2, 3, 6, 8, 9, 10]) out[k] = a.a[k] + (b.a[k] - a.a[k]) * f;
    let d = b.a[4] - a.a[4];
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    out[4] = a.a[4] + d * f;
    return out;
  }

  // ------------------------------------------------------------ messages

  _onMessage(from, m) {
    if (!m || typeof m !== 'object') return;
    if (this.isHost) this._hostMessage(from, m);
    else this._clientMessage(m);
  }

  _hostMessage(from, m) {
    let p = this.players.find((q) => q.peerId === from);
    if (p) p.seen = performance.now();
    switch (m.t) {
      case 'hello': {
        if (m.v !== PROTOCOL) {
          this.transport.send(from, { t: 'deny', reason: 'Your game is a different version. Reload the page.' });
          return;
        }
        if (!p) {
          if (this.players.length >= MAX_CREW) {
            this.transport.send(from, { t: 'deny', reason: 'That raft is full (4 sailors max).' });
            return;
          }
          const used = new Set(this.players.map((q) => q.slot));
          let slot = 1;
          while (used.has(slot)) slot++;
          p = { slot, name: cleanName(m.name), hat: (m.hat | 0) % 4, peerId: from, ready: false, seen: performance.now() };
          this.players.push(p);
          this.players.sort((a, b) => a.slot - b.slot);
          this._emit('peer', 'join', p);
        }
        this.transport.send(from, { t: 'welcome', slot: p.slot, code: this.code });
        this._sendLobby();
        // joining a race in progress: load straight in
        if (this.state === 'race') this.transport.send(from, { t: 'start', settings: this.settings, players: this._publicPlayers(), seed: this._seed || 1, late: true });
        break;
      }
      case 'me':
        if (p) {
          p.name = cleanName(m.name ?? p.name);
          p.hat = (m.hat ?? p.hat) % 4;
          this._sendLobby();
        }
        break;
      case 'in':
        if (p && Array.isArray(m.a)) {
          m.a[0] = p.slot; // a client can only move its own sailor
          if ((p.lastIn || 0) < m.k) {
            p.lastIn = m.k;
            this._pushCrew(p.slot, m.a);
          }
        }
        break;
      case 'ready':
        if (p) {
          p.ready = true;
          this._emit('ready', p);
        }
        break;
      case 'respawn':
        this._emit('respawn', p);
        break;
      case 'ping':
        this.transport.send(from, { t: 'pong', a: m.a });
        break;
      default:
        break;
    }
  }

  _clientMessage(m) {
    this.lastHeard = performance.now();
    switch (m.t) {
      case 'welcome':
        this.slot = m.slot;
        if (this._welcome) this._welcome();
        break;
      case 'deny':
        if (this._welcome) this._welcome(new Error(m.reason || 'Could not join.'));
        else this._close(m.reason);
        break;
      case 'lobby':
        this.players = m.players;
        this.settings = m.settings;
        this._emit('lobby');
        break;
      case 'start':
        this.state = 'race';
        this.settings = m.settings;
        this.players = m.players;
        this.lastSnap = -1;
        this.crewBuf.clear();
        this._emit('start', m);
        break;
      case 's':
        if (m.n <= this.lastSnap) return; // late packet: a newer one already arrived
        this.lastSnap = m.n;
        for (const a of m.cr) if (a[0] !== this.slot) this._pushCrew(a[0], a);
        this._emit('snap', m);
        break;
      case 'end':
        this._emit('end', m.results);
        break;
      case 'back':
        this.state = 'lobby';
        this._emit('back');
        break;
      case 'pong': {
        const rtt = performance.now() - m.a;
        this.rtt = this.rtt ? this.rtt * 0.8 + rtt * 0.2 : rtt;
        this._emit('ping', this.rtt);
        break;
      }
      default:
        break;
    }
  }

  setSeed(seed) {
    this._seed = seed;
  }

  _onLeave(peerId) {
    if (this.isHost) {
      const p = this.players.find((q) => q.peerId === peerId);
      if (!p) return;
      this.players = this.players.filter((q) => q !== p);
      this.crewBuf.delete(p.slot);
      this._emit('peer', 'leave', p);
      this._sendLobby();
    } else if (peerId === this.transport.hostId) {
      this._close('The host left the room.');
    }
  }

  _close(reason) {
    if (this.state === 'closed') return;
    this.state = 'closed';
    this._emit('closed', reason);
    this.dispose();
  }

  dispose() {
    for (const id of this._timers) clearInterval(id);
    this._timers = [];
    try {
      this.transport.close();
    } catch {
      /* closing */
    }
  }

  get phaseNames() {
    return PHASES;
  }
}
