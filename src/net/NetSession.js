// Online room: lobby, race start, and car-state relay over a Transport.
//
// Star topology: clients talk to the host only; the host relays. Each
// player's game simulates its OWN car and sends its state ~15 times a second;
// everyone else's car is drawn from those states (smoothed). The host also
// simulates any AI cars and sends theirs. Up to 6 human players per room.

import { PeerTransport, LocalTransport, makeRoomCode } from './Transport.js';

export const MAX_PLAYERS = 6;
export const NET_RATE = 15; // state packets per second
const PROTOCOL = 1;

export class NetSession {
  /** kind: 'peer' (internet) or 'local' (same browser, tabs). */
  constructor({ kind = 'peer', name = 'Driver', carId = 'falcon', livery = 'ember' } = {}) {
    this.kind = kind;
    this.me = { name: cleanName(name), carId, livery };
    this.transport = kind === 'local' ? new LocalTransport() : new PeerTransport();
    this.isHost = false;
    this.code = null;
    this.slot = -1;
    this.players = []; // [{slot, name, carId, livery, peerId, loaded}]
    this.settings = { circuitId: 'beginner', laps: 3, ai: 0, mode: 'grandprix' };
    this.remote = new Map(); // id -> {st, at}
    this.state = 'idle'; // idle | lobby | racing | closed
    this.listeners = { lobby: [], start: [], go: [], error: [], closed: [] };
    this.sendAcc = 0;
    this._outbox = null;
    this.transport.onMessage((from, msg) => this._onMessage(from, msg));
    this.transport.onJoin(() => {});
    this.transport.onLeave((peerId) => this._onLeave(peerId));
    this.transport.onError((err) => this._emit('error', err));
  }

  on(kind, fn) {
    this.listeners[kind].push(fn);
    return () => {
      const i = this.listeners[kind].indexOf(fn);
      if (i >= 0) this.listeners[kind].splice(i, 1);
    };
  }

  _emit(kind, ...a) {
    for (const fn of this.listeners[kind].slice()) fn(...a);
  }

  // ---------------------------------------------------------------- lobby

  async create(code = makeRoomCode()) {
    await this.transport.host(code);
    this.isHost = true;
    this.code = code;
    this.slot = 0;
    this.players = [{ slot: 0, ...this.me, peerId: 'host', loaded: false }];
    this.state = 'lobby';
    this._emit('lobby');
    return code;
  }

  async join(code) {
    code = String(code || '').trim().toUpperCase();
    if (!/^[A-Z]{4}$/.test(code)) throw new Error('Room codes are 4 letters.');
    await this.transport.join(code);
    this.code = code;
    this.state = 'joining';
    this.transport.broadcast({ t: 'hello', v: PROTOCOL, ...this.me });
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('The host did not answer.')), 8000);
      this._welcome = (err) => {
        clearTimeout(timer);
        if (err) reject(err);
        else resolve();
      };
    });
    this.state = 'lobby';
  }

  /** Change my name / car (clients send it to the host). */
  updateMe(patch) {
    Object.assign(this.me, patch);
    if (patch.name !== undefined) this.me.name = cleanName(patch.name);
    if (this.isHost) {
      Object.assign(this.players[0], this.me);
      this._sendLobby();
    } else this.transport.broadcast({ t: 'me', ...this.me });
  }

  /** Host: change race settings. */
  setSettings(patch) {
    if (!this.isHost) return;
    Object.assign(this.settings, patch);
    this.settings.ai = Math.max(0, Math.min(MAX_PLAYERS + 2 - this.players.length, this.settings.ai | 0));
    this._sendLobby();
  }

  _sendLobby() {
    const msg = { t: 'lobby', players: this.players.map(({ slot, name, carId, livery }) => ({ slot, name, carId, livery })), settings: this.settings, code: this.code };
    this.transport.broadcast(msg);
    this._emit('lobby');
  }

  /** Host: start the race for everyone. */
  start() {
    if (!this.isHost) return;
    for (const p of this.players) p.loaded = false;
    this.remote.clear();
    const msg = { t: 'start', settings: this.settings, players: this.players.map(({ slot, name, carId, livery }) => ({ slot, name, carId, livery })), seed: Math.floor(Math.random() * 1e6) };
    this.transport.broadcast(msg);
    this.state = 'racing';
    this._emit('start', msg);
  }

  /** My race finished loading; the host sends 'go' once everyone has. */
  loaded() {
    if (this.isHost) {
      this.players[0].loaded = true;
      this._maybeGo();
      clearTimeout(this._goTimer);
      // never wait forever for a slow or vanished player
      this._goTimer = setTimeout(() => this._go(), 15000);
    } else this.transport.broadcast({ t: 'loaded' });
  }

  _maybeGo() {
    if (this.players.every((p) => p.loaded)) this._go();
  }

  _go() {
    if (this._wentGo) return;
    this._wentGo = true;
    clearTimeout(this._goTimer);
    this.transport.broadcast({ t: 'go' });
    this._emit('go');
  }

  /** Back to the lobby after a race (host). */
  backToLobby() {
    this._wentGo = false;
    this.state = 'lobby';
    if (this.isHost) {
      this.transport.broadcast({ t: 'lobbyReturn' });
      this._sendLobby();
    }
  }

  // ---------------------------------------------------------------- race state

  /**
   * Queue my car (and, on the host, the AI cars) for sending; actually sent
   * at NET_RATE by tick(). states: array of compact arrays [id, ...fields].
   */
  setOutgoing(states) {
    this._outbox = states;
  }

  tick(dt) {
    this.sendAcc += dt;
    if (this.sendAcc < 1 / NET_RATE || !this._outbox) return;
    this.sendAcc = 0;
    if (this.isHost) {
      const all = this._outbox.slice();
      for (const [id, r] of this.remote) if (!String(id).startsWith('ai')) all.push(r.st);
      this.transport.broadcast({ t: 'sts', list: all });
    } else this.transport.broadcast({ t: 'st', list: this._outbox });
  }

  // ---------------------------------------------------------------- protocol

  _onMessage(from, m) {
    if (!m || typeof m !== 'object') return;
    const now = performance.now();
    if (this.isHost) {
      if (m.t === 'hello') {
        if (m.v !== PROTOCOL) return this.transport.send(from, { t: 'reject', reason: 'Different game version. Reload the page.' });
        if (this.state === 'racing') return this.transport.send(from, { t: 'reject', reason: 'A race is in progress. Try again when it ends.' });
        if (this.players.length >= MAX_PLAYERS) return this.transport.send(from, { t: 'reject', reason: 'Room is full (6 players).' });
        const used = new Set(this.players.map((p) => p.slot));
        let slot = 1;
        while (used.has(slot)) slot++;
        this.players.push({ slot, name: cleanName(m.name), carId: String(m.carId || 'falcon'), livery: String(m.livery || 'ember'), peerId: from, loaded: false });
        this.players.sort((a, b) => a.slot - b.slot);
        this.settings.ai = Math.min(this.settings.ai, MAX_PLAYERS + 2 - this.players.length);
        this.transport.send(from, { t: 'welcome', slot });
        this._sendLobby();
      } else if (m.t === 'me') {
        const p = this.players.find((x) => x.peerId === from);
        if (p) {
          p.name = cleanName(m.name);
          p.carId = String(m.carId || p.carId);
          p.livery = String(m.livery || p.livery);
          this._sendLobby();
        }
      } else if (m.t === 'loaded') {
        const p = this.players.find((x) => x.peerId === from);
        if (p) p.loaded = true;
        this._maybeGo();
      } else if (m.t === 'st' && Array.isArray(m.list)) {
        for (const st of m.list) if (Array.isArray(st)) this.remote.set(st[0], { st, at: now });
      }
      return;
    }
    // client
    if (m.t === 'welcome') {
      this.slot = m.slot;
      if (this._welcome) this._welcome(null);
    } else if (m.t === 'reject') {
      if (this._welcome) this._welcome(new Error(m.reason));
      this.close();
    } else if (m.t === 'lobby') {
      this.players = m.players;
      this.settings = m.settings;
      this._emit('lobby');
    } else if (m.t === 'start') {
      this.remote.clear();
      this.players = m.players;
      this.settings = m.settings;
      this.state = 'racing';
      this._wentGo = false;
      this._emit('start', m);
    } else if (m.t === 'go') {
      this._wentGo = true;
      this._emit('go');
    } else if (m.t === 'lobbyReturn') {
      this.state = 'lobby';
      this._emit('lobby');
    } else if (m.t === 'sts' && Array.isArray(m.list)) {
      for (const st of m.list) if (Array.isArray(st) && st[0] !== this.slot) this.remote.set(st[0], { st, at: now });
    }
  }

  _onLeave(peerId) {
    if (this.isHost) {
      const i = this.players.findIndex((p) => p.peerId === peerId);
      if (i >= 0) {
        const slot = this.players[i].slot;
        this.players.splice(i, 1);
        this.remote.delete(slot);
        this._sendLobby();
        this._maybeGo();
      }
    } else if (this.state !== 'closed') {
      this.close();
      this._emit('error', new Error('The host left the room.'));
    }
  }

  close() {
    if (this.state === 'closed') return;
    this.state = 'closed';
    clearTimeout(this._goTimer);
    this.transport.close();
    this._emit('closed');
  }
}

function cleanName(n) {
  const s = String(n || '').replace(/[^\p{L}\p{N} _.-]/gu, '').trim().slice(0, 14);
  return s || 'Driver';
}
