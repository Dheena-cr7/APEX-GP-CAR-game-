// Time Trial ghost: records the player's pose at 20 Hz during each lap and
// replays the best lap as a translucent car. Fixed-size typed buffers, no
// allocation while recording or playing.

const RATE = 20; // samples per second
const MAX_SECONDS = 240;
const STRIDE = 4; // x, y, z, h

export class GhostRecorder {
  constructor() {
    this.cap = RATE * MAX_SECONDS;
    this.buf = new Float32Array(this.cap * STRIDE);
    this.count = 0;
    this.acc = 0;
    this.overflow = false;
  }

  begin() {
    this.count = 0;
    this.acc = 0;
    this.overflow = false;
  }

  /** Call every fixed step while a lap is running. */
  record(dt, v) {
    this.acc += dt;
    if (this.acc < 1 / RATE - 1e-9 && this.count > 0) return;
    this.acc = 0;
    if (this.count >= this.cap) {
      this.overflow = true;
      return;
    }
    const k = this.count * STRIDE;
    this.buf[k] = v.x;
    this.buf[k + 1] = v.y;
    this.buf[k + 2] = v.z;
    this.buf[k + 3] = v.h;
    this.count++;
  }

  /** Snapshot of the recorded lap (only valid if it did not overflow). */
  toLap() {
    if (this.overflow || this.count < 2) return null;
    return { rate: RATE, count: this.count, data: this.buf.slice(0, this.count * STRIDE) };
  }
}

/** Compact JSON-safe form for the save (centimetre / milliradian precision). */
export function encodeGhost(lap) {
  const data = Array.from(lap.data, (x) => Math.round(x * 100) / 100);
  return { rate: lap.rate, count: lap.count, data };
}

export function decodeGhost(obj) {
  if (!obj || typeof obj !== 'object' || !Array.isArray(obj.data) || obj.count * STRIDE !== obj.data.length || obj.count < 2) return null;
  if (!obj.data.every((x) => typeof x === 'number' && Number.isFinite(x))) return null;
  return { rate: obj.rate || RATE, count: obj.count, data: Float32Array.from(obj.data) };
}

/**
 * Interpolated pose of a ghost lap at time t (seconds since its lap start),
 * written into `out` ({x, y, z, h}). Returns false past the end.
 */
export function ghostPose(lap, t, out) {
  const f = t * lap.rate;
  const i = Math.floor(f);
  if (i < 0 || i >= lap.count - 1) return false;
  const a = i * STRIDE;
  const b = a + STRIDE;
  const u = f - i;
  const d = lap.data;
  out.x = d[a] + (d[b] - d[a]) * u;
  out.y = d[a + 1] + (d[b + 1] - d[a + 1]) * u;
  out.z = d[a + 2] + (d[b + 2] - d[a + 2]) * u;
  let dh = d[b + 3] - d[a + 3];
  if (dh > Math.PI) dh -= Math.PI * 2;
  else if (dh < -Math.PI) dh += Math.PI * 2;
  out.h = d[a + 3] + dh * u;
  return true;
}
