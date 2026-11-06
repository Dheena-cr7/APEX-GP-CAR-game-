// Course data. A river is a list of segments (length, total turn in degrees,
// width, current speed, optional rapids `rough` and waterfall `drop`), walked
// turtle-style from the start dock. Hazards are placed at (s, u): s metres
// along the river, u = fraction of the half width (-1 right bank .. 1 left).
//
// Medal times are seconds for the whole course (crew size does not matter:
// thrust per sailor scales so a full crew and a solo sailor are equally fast).

function segStarts(path) {
  const out = [0];
  let s = 0;
  for (const p of path) out.push((s += p.len));
  return out;
}

function shellLine(s0, s1, u0, u1, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const f = n === 1 ? 0.5 : i / (n - 1);
    out.push({ s: s0 + (s1 - s0) * f, u: u0 + (u1 - u0) * f });
  }
  return out;
}

function shellArc(s0, s1, u, amp, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const f = n === 1 ? 0.5 : i / (n - 1);
    out.push({ s: s0 + (s1 - s0) * f, u: u + amp * Math.sin(f * Math.PI) });
  }
  return out;
}

// ---------------------------------------------------------------- 1
const lagoonPath = [
  { len: 34, turn: 0, w: 24, v: 0.9 },
  { len: 50, turn: 25, w: 26, v: 1.1 },
  { len: 60, turn: -45, w: 28, v: 1.25 },
  { len: 44, turn: 10, w: 22, v: 1.5 },
  { len: 60, turn: 50, w: 24, v: 1.3 },
  { len: 50, turn: -20, w: 27, v: 1.2 },
  { len: 60, turn: -40, w: 20, v: 1.8 },
  { len: 50, turn: 30, w: 24, v: 1.4 },
  { len: 46, turn: 0, w: 28, v: 0.9 },
];
const L1 = segStarts(lagoonPath);

const lagoon = {
  id: 'lagoon',
  name: 'Lily Lagoon',
  theme: 'meadow',
  difficulty: 1,
  blurb: 'A lazy, sunny river to learn the ropes. Lily pads, a few rocks and one grumpy log.',
  river: { start: { x: 0, z: 0, heading: -90 }, w: 24, v: 0.9, h: 0, path: lagoonPath },
  checkpoints: [L1[3] + 10, L1[6] + 4],
  hazards: [
    { type: 'rock', s: L1[2] + 22, u: 0.5, r: 1.6 },
    { type: 'rock', s: L1[2] + 30, u: -0.55, r: 1.3 },
    { type: 'rock', s: L1[3] + 20, u: 0.05, r: 1.9 },
    { type: 'rock', s: L1[4] + 18, u: -0.55, r: 1.5 },
    { type: 'rock', s: L1[4] + 42, u: 0.45, r: 1.4 },
    { type: 'rock', s: L1[5] + 30, u: 0.82, r: 1.2 },
    { type: 'log', s: L1[6] + 26, u: 0, len: 6.5, angle: 90, amp: 0.45, period: 7.5 },
    { type: 'rock', s: L1[7] + 20, u: -0.6, r: 1.4 },
    { type: 'rock', s: L1[7] + 26, u: 0.62, r: 1.2 },
  ],
  shells: [
    ...shellLine(L1[1] + 6, L1[1] + 40, 0, 0.35, 5),
    ...shellArc(L1[2] + 18, L1[2] + 36, -0.05, 0.12, 4),
    ...shellLine(L1[3] + 30, L1[4] + 6, -0.5, -0.3, 4),
    ...shellArc(L1[4] + 24, L1[4] + 52, -0.1, 0.4, 5),
    ...shellLine(L1[5] + 10, L1[5] + 40, 0.3, -0.3, 5),
    ...shellLine(L1[6] + 36, L1[7] + 6, -0.4, -0.2, 4),
    ...shellLine(L1[7] + 34, L1[8] + 10, 0, 0, 3),
  ],
  medals: { gold: 85, silver: 100, bronze: 130 },
  lilies: true,
};

// ---------------------------------------------------------------- 2
const timberPath = [
  { len: 34, turn: 0, w: 20, v: 1.4 },
  { len: 60, turn: -35, w: 20, v: 2.0 },
  { len: 50, turn: 40, w: 18, v: 2.7, rough: 0.6 },
  { len: 40, turn: 0, w: 19, v: 2.3, rough: 0.3 },
  { len: 50, turn: -50, w: 22, v: 2.0 },
  { len: 10, turn: 0, w: 18, v: 4.0, drop: 2.2 },
  { len: 44, turn: 10, w: 25, v: 1.6, rough: 0.4 },
  { len: 60, turn: 45, w: 21, v: 2.1 },
  { len: 56, turn: -30, w: 24, v: 1.8 },
  { len: 60, turn: -35, w: 18, v: 2.8, rough: 0.7 },
  { len: 12, turn: 0, w: 17, v: 4.5, drop: 3 },
  { len: 50, turn: 30, w: 25, v: 1.6, rough: 0.3 },
  { len: 60, turn: 20, w: 21, v: 2.2 },
  { len: 50, turn: -40, w: 22, v: 1.8 },
  { len: 44, turn: 0, w: 26, v: 1.0 },
];
const L2 = segStarts(timberPath);

const timber = {
  id: 'timber',
  name: 'Timber Rapids',
  theme: 'forest',
  difficulty: 2,
  blurb: 'Pine canyon white water. Logs sweep the lanes, a mill wheel turns, and two waterfalls drop you hard.',
  river: { start: { x: 0, z: 0, heading: -90 }, w: 20, v: 1.4, h: 0, path: timberPath },
  checkpoints: [L2[4] + 10, L2[7] + 30, L2[11] + 20],
  hazards: [
    { type: 'rock', s: L2[1] + 24, u: -0.45, r: 1.5 },
    { type: 'rock', s: L2[1] + 44, u: 0.5, r: 1.6 },
    { type: 'rock', s: L2[2] + 14, u: 0.05, r: 1.4 },
    { type: 'rock', s: L2[2] + 34, u: -0.6, r: 1.2 },
    { type: 'rock', s: L2[2] + 40, u: 0.6, r: 1.2 },
    { type: 'log', s: L2[3] + 22, u: 0, len: 6, angle: 75, amp: 0.4, period: 6 },
    { type: 'rock', s: L2[4] + 30, u: 0.55, r: 1.5 },
    { type: 'rock', s: L2[6] + 22, u: -0.3, r: 1.7 },
    { type: 'log', s: L2[7] + 18, u: 0.2, len: 7, angle: 100, amp: 0.38, period: 7 },
    { type: 'log', s: L2[7] + 44, u: -0.2, len: 6, angle: 80, amp: 0.38, period: 6.2, phase: 2.2 },
    { type: 'spinner', s: L2[8] + 28, u: 0, len: 5.4, omega: 0.6, arms: 2 },
    { type: 'rock', s: L2[9] + 12, u: 0.55, r: 1.3 },
    { type: 'rock', s: L2[9] + 24, u: -0.5, r: 1.3 },
    { type: 'rock', s: L2[9] + 38, u: 0.25, r: 1.2 },
    { type: 'rock', s: L2[11] + 26, u: -0.5, r: 1.6 },
    { type: 'log', s: L2[12] + 26, u: 0, len: 6.5, angle: 90, amp: 0.42, period: 6.5 },
    { type: 'rock', s: L2[13] + 20, u: 0.5, r: 1.5 },
    { type: 'rock', s: L2[13] + 30, u: -0.45, r: 1.3 },
  ],
  shells: [
    ...shellLine(L2[1] + 6, L2[1] + 30, 0.1, 0.1, 4),
    ...shellArc(L2[2] + 18, L2[2] + 44, -0.3, 0.25, 4),
    ...shellLine(L2[4] + 6, L2[5] + 4, 0, 0, 5),
    ...shellArc(L2[6] + 6, L2[6] + 40, 0.35, -0.2, 4),
    ...shellLine(L2[7] + 26, L2[7] + 38, -0.3, 0.3, 3),
    ...shellArc(L2[8] + 8, L2[8] + 48, 0.62, -0.1, 4),
    ...shellLine(L2[9] + 44, L2[11] + 8, 0, 0, 4),
    ...shellLine(L2[12] + 6, L2[12] + 50, -0.4, 0.4, 4),
  ],
  medals: { gold: 120, silver: 140, bronze: 180 },
};

// ---------------------------------------------------------------- 3
const fjordPath = [
  { len: 34, turn: 0, w: 24, v: 1.0 },
  { len: 70, turn: 30, w: 30, v: 1.3 },
  { len: 60, turn: -40, w: 32, v: 1.2 },
  { len: 50, turn: -20, w: 19, v: 2.2, rough: 0.3 },
  { len: 60, turn: 50, w: 16, v: 2.6, rough: 0.45 },
  { len: 50, turn: -30, w: 20, v: 2.0 },
  { len: 70, turn: -30, w: 34, v: 1.1 },
  { len: 60, turn: 45, w: 22, v: 1.8 },
  { len: 8, turn: 0, w: 20, v: 3.5, drop: 1.8 },
  { len: 60, turn: 20, w: 26, v: 1.5 },
  { len: 60, turn: -35, w: 22, v: 1.8 },
  { len: 44, turn: 0, w: 28, v: 1.0 },
];
const L3 = segStarts(fjordPath);

const fjord = {
  id: 'fjord',
  name: 'Frostbite Fjord',
  theme: 'glacier',
  difficulty: 3,
  blurb: 'Icy blue water under snowy peaks. Drifting floes, sucking whirlpools and a tight ice gorge.',
  river: { start: { x: 0, z: 0, heading: -90 }, w: 24, v: 1.0, h: 0, path: fjordPath },
  checkpoints: [L3[3] + 6, L3[6] + 10, L3[9] + 10],
  hazards: [
    { type: 'floe', s: L3[1] + 24, u: 0.3, r: 2.2, as: 6, au: 0.3, period: 14 },
    { type: 'floe', s: L3[1] + 50, u: -0.35, r: 2.6, as: 5, au: 0.25, period: 12, phase: 2 },
    { type: 'whirl', s: L3[2] + 24, u: 0.45, r: 5.5, strength: 2.4, spin: 1 },
    { type: 'floe', s: L3[2] + 40, u: -0.4, r: 2.0, as: 4, au: 0.2, period: 10, phase: 1 },
    { type: 'rock', s: L3[3] + 26, u: 0.55, r: 1.4, ice: true },
    { type: 'rock', s: L3[3] + 34, u: -0.55, r: 1.3, ice: true },
    { type: 'rock', s: L3[4] + 20, u: 0.0, r: 1.3, ice: true },
    { type: 'floe', s: L3[5] + 26, u: 0, r: 1.8, as: 3, au: 0.45, period: 8 },
    { type: 'whirl', s: L3[6] + 20, u: -0.4, r: 6, strength: 2.6, spin: -1 },
    { type: 'floe', s: L3[6] + 34, u: 0.4, r: 2.8, as: 6, au: 0.2, period: 16, phase: 3 },
    { type: 'whirl', s: L3[6] + 52, u: 0.45, r: 5, strength: 2.4, spin: 1 },
    { type: 'floe', s: L3[7] + 24, u: -0.3, r: 2.2, as: 4, au: 0.3, period: 11 },
    { type: 'rock', s: L3[9] + 28, u: 0.4, r: 1.6, ice: true },
    { type: 'floe', s: L3[10] + 20, u: -0.25, r: 2.4, as: 5, au: 0.35, period: 13, phase: 1.5 },
    { type: 'rock', s: L3[10] + 40, u: 0.5, r: 1.3, ice: true },
  ],
  shells: [
    ...shellArc(L3[1] + 10, L3[1] + 60, -0.1, 0.25, 5),
    ...shellArc(L3[2] + 8, L3[2] + 50, -0.2, -0.3, 5),
    ...shellLine(L3[4] + 6, L3[4] + 50, 0.3, -0.3, 5),
    ...shellArc(L3[6] + 8, L3[6] + 64, 0.05, 0.2, 6),
    ...shellLine(L3[7] + 40, L3[9] + 6, 0, 0, 4),
    ...shellArc(L3[10] + 6, L3[10] + 54, 0.2, -0.3, 4),
  ],
  medals: { gold: 118, silver: 140, bronze: 180 },
  snow: true,
};

// ---------------------------------------------------------------- 4
const gorgePath = [
  { len: 34, turn: 0, w: 22, v: 1.3 },
  { len: 60, turn: 40, w: 20, v: 2.0 },
  { len: 50, turn: -60, w: 17, v: 2.7, rough: 0.5 },
  { len: 46, turn: 0, w: 21, v: 2.1 },
  { len: 60, turn: 50, w: 22, v: 2.0 },
  { len: 50, turn: -20, w: 16, v: 3.0, rough: 0.8 },
  { len: 14, turn: 0, w: 16, v: 5.0, drop: 4.5 },
  { len: 54, turn: -30, w: 28, v: 1.4, rough: 0.3 },
  { len: 64, turn: 40, w: 22, v: 2.1 },
  { len: 60, turn: -45, w: 19, v: 2.5, rough: 0.5 },
  { len: 50, turn: 30, w: 22, v: 2.0 },
  { len: 10, turn: 0, w: 20, v: 4.0, drop: 2.2 },
  { len: 60, turn: -20, w: 24, v: 1.6 },
  { len: 44, turn: 0, w: 28, v: 1.0 },
];
const L4 = segStarts(gorgePath);

const gorge = {
  id: 'gorge',
  name: 'Sunset Gorge',
  theme: 'canyon',
  difficulty: 4,
  blurb: 'Red-rock canyon at golden hour. Twin mill wheels, slot rapids and a monster waterfall.',
  river: { start: { x: 0, z: 0, heading: -90 }, w: 22, v: 1.3, h: 0, path: gorgePath },
  checkpoints: [L4[3] + 8, L4[7] + 14, L4[10] + 10],
  hazards: [
    { type: 'rock', s: L4[1] + 22, u: -0.5, r: 1.6, red: true },
    { type: 'rock', s: L4[1] + 40, u: 0.45, r: 1.5, red: true },
    { type: 'rock', s: L4[2] + 22, u: 0.0, r: 1.3, red: true },
    { type: 'spinner', s: L4[3] + 26, u: 0, len: 5, omega: 0.55, arms: 2 },
    { type: 'log', s: L4[4] + 20, u: 0.25, len: 6.5, angle: 95, amp: 0.4, period: 6.5 },
    { type: 'log', s: L4[4] + 42, u: -0.25, len: 6.5, angle: 85, amp: 0.4, period: 6.5, phase: 3.1 },
    { type: 'rock', s: L4[5] + 16, u: 0.5, r: 1.2, red: true },
    { type: 'rock', s: L4[5] + 30, u: -0.5, r: 1.2, red: true },
    { type: 'whirl', s: L4[7] + 26, u: -0.4, r: 6, strength: 2.6, spin: 1 },
    { type: 'rock', s: L4[7] + 40, u: 0.55, r: 1.6, red: true },
    { type: 'spinner', s: L4[8] + 22, u: -0.4, len: 4, omega: -0.7, arms: 2 },
    { type: 'spinner', s: L4[8] + 44, u: 0.4, len: 4, omega: 0.7, arms: 2, phase: 0.8 },
    { type: 'rock', s: L4[9] + 20, u: -0.45, r: 1.4, red: true },
    { type: 'rock', s: L4[9] + 36, u: 0.45, r: 1.4, red: true },
    { type: 'log', s: L4[10] + 26, u: 0, len: 7, angle: 90, amp: 0.4, period: 6 },
    { type: 'rock', s: L4[12] + 24, u: 0.5, r: 1.5, red: true },
    { type: 'whirl', s: L4[12] + 40, u: -0.45, r: 5, strength: 2.2, spin: -1 },
  ],
  shells: [
    ...shellArc(L4[1] + 8, L4[1] + 52, 0.05, -0.15, 5),
    ...shellLine(L4[2] + 6, L4[2] + 16, 0, 0, 2),
    ...shellLine(L4[2] + 30, L4[3] + 6, -0.3, 0.2, 4),
    ...shellLine(L4[3] + 18, L4[3] + 34, 0.68, 0.68, 3),
    ...shellLine(L4[4] + 26, L4[4] + 36, -0.2, 0.2, 3),
    ...shellLine(L4[5] + 36, L4[6] + 10, 0, 0, 4),
    ...shellArc(L4[7] + 8, L4[7] + 48, 0.3, -0.1, 4),
    ...shellLine(L4[8] + 30, L4[8] + 36, 0, 0, 2),
    ...shellArc(L4[9] + 40, L4[10] + 20, 0, 0.3, 4),
    ...shellLine(L4[12] + 6, L4[12] + 54, -0.1, 0.1, 4),
  ],
  medals: { gold: 115, silver: 135, bronze: 175 },
  falls: true,
};

export const COURSES = [lagoon, timber, fjord, gorge];
export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]));

/** Finish line distance (just before the end of the river). */
export function finishS(river) {
  return river.length - 18;
}
