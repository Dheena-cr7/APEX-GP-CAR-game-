// Transports for online rooms. Both expose the same small API:
//
//   await t.host(code)        become the room host (code = room id)
//   await t.join(code)        connect to a room's host
//   t.send(peerId, data)      host → one client
//   t.broadcast(data)         host → every client, client → host
//   t.onMessage(fn(peerId, data)), t.onJoin(fn(peerId)), t.onLeave(fn(peerId)), t.onError(fn(err))
//   t.close()
//
// PeerTransport: WebRTC data channels through PeerJS (works across the
// internet; uses the free public PeerJS signalling server).
// LocalTransport: BroadcastChannel between tabs of the same browser (offline
// play across windows, and the automated tests).

import { iceServers, turnConfigured } from './iceServers.js';

const ID_PREFIX = 'apexgp-v1-';
const SERVER_TIMEOUT = 20000; // the free PeerJS server can take 10 s+ to answer
const CONNECT_TIMEOUT = 15000;
const DROP_AFTER = 6000;
const BLOCKED = turnConfigured()
  ? 'Could not connect to the host. Check both internet connections and try again.'
  : 'Could not connect to the host: one of your networks blocks direct connections (common on mobile data and office or campus Wi-Fi). Try another network, or let the player on home Wi-Fi host the room.';

class BaseTransport {
  constructor() {
    this.handlers = { message: [], join: [], leave: [], error: [] };
    this.isHost = false;
    this.closed = false;
    // closing the tab says goodbye, so the others notice at once
    this._onPageHide = () => this.close();
    if (typeof window !== 'undefined') window.addEventListener('pagehide', this._onPageHide);
  }

  _unhook() {
    if (typeof window !== 'undefined') window.removeEventListener('pagehide', this._onPageHide);
  }

  onMessage(fn) {
    this.handlers.message.push(fn);
  }

  onJoin(fn) {
    this.handlers.join.push(fn);
  }

  onLeave(fn) {
    this.handlers.leave.push(fn);
  }

  onError(fn) {
    this.handlers.error.push(fn);
  }

  _emit(kind, ...args) {
    for (const fn of this.handlers[kind]) {
      try {
        fn(...args);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export class PeerTransport extends BaseTransport {
  constructor() {
    super();
    this.peer = null;
    this.conns = new Map(); // peerId -> DataConnection
  }

  async _peer(id) {
    const { Peer } = await import('peerjs');
    return new Promise((resolve, reject) => {
      const opts = { debug: 0, config: { iceServers: iceServers() } };
      const peer = id ? new Peer(id, opts) : new Peer(opts);
      const timer = setTimeout(() => {
        peer.destroy();
        reject(new Error('Could not reach the matchmaking server (check your internet connection).'));
      }, SERVER_TIMEOUT);
      peer.on('open', () => {
        clearTimeout(timer);
        resolve(peer);
      });
      peer.on('error', (err) => {
        clearTimeout(timer);
        const msg =
          err.type === 'unavailable-id' ? 'That room code is already in use.' :
          err.type === 'peer-unavailable' ? 'Room not found. Check the code.' :
          err.type === 'network' || err.type === 'server-error' || err.type === 'socket-error' ? 'Network problem: could not reach the matchmaking server.' :
          err.type === 'browser-incompatible' ? 'This browser does not support WebRTC.' :
          String(err.message || err.type || err);
        const e = new Error(msg);
        e.type = err.type;
        if (this.peer) this._emit('error', e);
        else {
          peer.destroy();
          reject(e);
        }
      });
    });
  }

  _wire(conn) {
    conn.on('data', (data) => this._emit('message', conn.peer, data));
    conn.on('close', () => {
      this.conns.delete(conn.peer);
      this._emit('leave', conn.peer);
    });
    conn.on('error', () => {
      this.conns.delete(conn.peer);
      this._emit('leave', conn.peer);
    });
  }

  async host(code) {
    this.isHost = true;
    this.peer = await this._peer(ID_PREFIX + code);
    this.peer.on('connection', (conn) => {
      // a closed tab is only noticed when ICE gives up: drop a link that stays
      // broken for a few seconds so the lobby and the start never wait on it
      let lost = 0;
      conn.on('iceStateChanged', (state) => {
        clearTimeout(lost);
        if (state === 'failed' || state === 'closed') conn.close();
        else if (state === 'disconnected') lost = setTimeout(() => conn.close(), DROP_AFTER);
      });
      conn.on('open', () => {
        this.conns.set(conn.peer, conn);
        this._wire(conn);
        this._emit('join', conn.peer);
      });
    });
    this.peer.on('disconnected', () => {
      if (!this.closed) this.peer.reconnect();
    });
  }

  async join(code) {
    this.isHost = false;
    this.peer = await this._peer(null);
    const hostId = ID_PREFIX + code;
    await new Promise((resolve, reject) => {
      const conn = this.peer.connect(hostId, { reliable: true, serialization: 'json' });
      const timer = setTimeout(() => reject(new Error(BLOCKED)), CONNECT_TIMEOUT);
      conn.on('iceStateChanged', (state) => {
        if (state === 'failed') {
          clearTimeout(timer);
          reject(new Error(BLOCKED));
        }
      });
      conn.on('open', () => {
        clearTimeout(timer);
        this.conns.set(hostId, conn);
        this._wire(conn);
        resolve();
      });
      this.peer.on('error', (err) => {
        clearTimeout(timer);
        reject(new Error(err.type === 'peer-unavailable' ? 'Room not found. Check the code.' : String(err.message || err.type)));
      });
    });
    this.hostId = hostId;
  }

  send(peerId, data) {
    const c = this.conns.get(peerId);
    if (c && c.open) c.send(data);
  }

  broadcast(data) {
    for (const c of this.conns.values()) if (c.open) c.send(data);
  }

  close() {
    this.closed = true;
    this._unhook();
    for (const c of this.conns.values()) {
      try {
        c.close();
      } catch {
        /* closing */
      }
    }
    this.conns.clear();
    if (this.peer) this.peer.destroy();
    this.peer = null;
  }
}

/** Same-browser rooms over BroadcastChannel (tabs / windows / tests). */
export class LocalTransport extends BaseTransport {
  constructor() {
    super();
    this.id = 'p' + Math.random().toString(36).slice(2, 10);
    this.clients = new Set();
    this.channel = null;
  }

  _open(code) {
    this.channel = new BroadcastChannel('apexgp-room-' + code);
    this.channel.onmessage = (e) => {
      const m = e.data;
      if (!m || m.to !== this.id && !(m.to === 'host' && this.isHost)) return;
      if (m.kind === 'hello' && this.isHost) {
        this.clients.add(m.from);
        this.channel.postMessage({ kind: 'welcome', to: m.from, from: this.id });
        this._emit('join', m.from);
      } else if (m.kind === 'welcome' && !this.isHost) {
        this.hostId = m.from;
        if (this._joined) this._joined();
      } else if (m.kind === 'bye') {
        if (this.isHost) this.clients.delete(m.from);
        this._emit('leave', m.from);
      } else if (m.kind === 'busy' && !this.isHost) {
        if (this._busy) this._busy();
      } else if (m.kind === 'ping' && this.isHost) {
        this.channel.postMessage({ kind: 'busy', to: m.from, from: this.id });
      } else if (m.kind === 'data') this._emit('message', m.from, m.data);
    };
  }

  async host(code) {
    this.isHost = true;
    this._open(code);
    // refuse if another host already owns this code
    const taken = await new Promise((resolve) => {
      this._busy = () => resolve(true);
      this.isHost = false;
      this.channel.postMessage({ kind: 'ping', to: 'host', from: this.id });
      setTimeout(() => resolve(false), 150);
    });
    this.isHost = true;
    this._busy = null;
    if (taken) {
      this.close();
      throw new Error('That room code is already in use.');
    }
  }

  async join(code) {
    this.isHost = false;
    this._open(code);
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Room not found. Check the code.')), 2000);
      this._joined = () => {
        clearTimeout(timer);
        resolve();
      };
      this.channel.postMessage({ kind: 'hello', to: 'host', from: this.id });
    });
  }

  send(peerId, data) {
    if (this.channel) this.channel.postMessage({ kind: 'data', to: peerId, from: this.id, data });
  }

  broadcast(data) {
    if (!this.channel) return;
    if (this.isHost) for (const c of this.clients) this.send(c, data);
    else this.send(this.hostId, data);
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this._unhook();
    if (this.channel) {
      const to = this.isHost ? null : this.hostId;
      if (this.isHost) for (const c of this.clients) this.channel.postMessage({ kind: 'bye', to: c, from: this.id });
      else if (to) this.channel.postMessage({ kind: 'bye', to, from: this.id });
      this.channel.close();
    }
    this.channel = null;
  }
}

/** Random 4-letter room code (no easily confused letters). */
export function makeRoomCode(rng = Math.random) {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let s = '';
  for (let i = 0; i < 4; i++) s += A[Math.floor(rng() * A.length)];
  return s;
}
