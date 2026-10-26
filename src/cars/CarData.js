// The six original cars. Stats are 1..10 and map to physics via
// deriveParams(); `shape` drives the procedural model in CarFactory.

export const CARS = Object.freeze([
  {
    id: 'falcon',
    name: 'Falcon F1-R',
    tagline: 'Long nose · balanced',
    stats: { acceleration: 6, topSpeed: 7, braking: 6, handling: 6, downforce: 6, drift: 5 },
    defaultLivery: 'ember',
    unlock: null,
    shape: { nose: 1.25, bodyWidth: 0.78, podWidth: 0.42, podLength: 1.3, frontWing: 1.72, rearWing: 1.05, rearWingHeight: 0.95, engineCover: 0.55, wheelScale: 1.0, fin: true },
  },
  {
    id: 'viper',
    name: 'Viper V6',
    tagline: 'Short tail · drift specialist',
    stats: { acceleration: 7, topSpeed: 5, braking: 5, handling: 7, downforce: 4, drift: 9 },
    defaultLivery: 'volt',
    unlock: null,
    shape: { nose: 1.0, bodyWidth: 0.74, podWidth: 0.36, podLength: 1.1, frontWing: 1.6, rearWing: 0.95, rearWingHeight: 1.08, engineCover: 0.62, wheelScale: 1.04, fin: false },
  },
  {
    id: 'comet',
    name: 'Comet C3',
    tagline: 'Compact · easy to drive',
    stats: { acceleration: 8, topSpeed: 4, braking: 7, handling: 8, downforce: 5, drift: 6 },
    defaultLivery: 'glacier',
    unlock: null,
    shape: { nose: 0.82, bodyWidth: 0.8, podWidth: 0.4, podLength: 1.0, frontWing: 1.55, rearWing: 0.9, rearWingHeight: 0.9, engineCover: 0.5, wheelScale: 0.94, fin: false },
  },
  {
    id: 'titan',
    name: 'Titan T9',
    tagline: 'Wide body · huge grip',
    stats: { acceleration: 5, topSpeed: 6, braking: 8, handling: 6, downforce: 9, drift: 3 },
    defaultLivery: 'cobalt',
    unlock: { stars: 8, text: '8 stars' },
    shape: { nose: 1.1, bodyWidth: 0.9, podWidth: 0.52, podLength: 1.5, frontWing: 1.78, rearWing: 1.2, rearWingHeight: 1.0, engineCover: 0.6, wheelScale: 1.1, fin: true },
  },
  {
    id: 'raven',
    name: 'Raven R7',
    tagline: 'Low drag · top speed',
    stats: { acceleration: 6, topSpeed: 9, braking: 6, handling: 5, downforce: 5, drift: 6 },
    defaultLivery: 'graphite',
    unlock: { stars: 16, text: '16 stars' },
    shape: { nose: 1.4, bodyWidth: 0.72, podWidth: 0.34, podLength: 1.6, frontWing: 1.6, rearWing: 0.88, rearWingHeight: 0.82, engineCover: 0.46, wheelScale: 0.98, fin: true },
  },
  {
    id: 'nova',
    name: 'Nova N1',
    tagline: 'Flagship · all-rounder',
    stats: { acceleration: 9, topSpeed: 8, braking: 8, handling: 8, downforce: 7, drift: 8 },
    defaultLivery: 'magenta',
    unlock: { stars: 26, text: '26 stars' },
    shape: { nose: 1.2, bodyWidth: 0.8, podWidth: 0.46, podLength: 1.4, frontWing: 1.74, rearWing: 1.1, rearWingHeight: 1.0, engineCover: 0.58, wheelScale: 1.02, fin: true },
  },
]);

export const STAT_LABELS = Object.freeze([
  ['acceleration', 'Acceleration'],
  ['topSpeed', 'Top speed'],
  ['braking', 'Braking'],
  ['handling', 'Handling'],
  ['downforce', 'Downforce'],
  ['drift', 'Drift'],
]);

export function getCar(id) {
  return CARS.find((c) => c.id === id) || CARS[0];
}
