// Every vehicle tuning constant lives here. Car stats (1..10) are mapped to
// physical parameters by `deriveParams`.

export const G = 9.81;

export const PHYSICS = Object.freeze({
  // geometry
  wheelbase: 3.4,
  cgToFront: 1.75,
  cgToRear: 1.65,
  cgHeight: 0.32,

  // tyres (normalised: lateral force = mu * load * shape(C * slip))
  muBase: 1.55,
  corneringFront: 9.5,
  corneringRear: 11.5,
  tyreFalloff: 0.18, // fraction of grip lost far past the peak
  lowSpeedBlend: 5, // m/s below which the kinematic model takes over

  // steering
  steerLockLow: 0.52, // rad at standstill
  steerSpeedFalloff: 26, // m/s, lock = low / (1 + v / falloff)
  steerLockMin: 0.13,
  steerRate: 4.2, // input units / s toward the target
  steerReturn: 6.5,
  visualSteerClamp: (25 * Math.PI) / 180,

  // longitudinal
  rolling: 0.35, // m/s^2
  aeroDrag: 0.00055, // * v^2 (coasting)
  reverseMax: 13,
  reverseAccel: 6,
  engineBrake: 1.2,
  shiftTime: 0.07,
  gearRatios: [0.24, 0.37, 0.5, 0.62, 0.74, 0.87, 1.04], // upper speed as fraction of vTop
  idleRpm: 4200,
  maxRpm: 12500,

  // handbrake & drift
  handbrakeRearGrip: 0.36,
  handbrakeYaw: 3.2, // rad/s² of extra rotation while the handbrake is pulled with steering
  handbrakeDecel: 2.6,
  driftEnterAngle: (13 * Math.PI) / 180,
  driftExitAngle: (6 * Math.PI) / 180,
  driftExitDelay: 0.22,
  driftMinSpeed: 11,
  driftRearGrip: 0.74,
  driftThrottleThrust: 3.2, // m/s^2 extra forward push while sliding on throttle

  // drift assists by setting: how firmly the slip angle is held at the
  // player's target, and the angle past which an anti-spin torque kicks in
  assist: {
    easy: { hold: 7, maxAngle: (50 * Math.PI) / 180, spin: 22 },
    medium: { hold: 4.5, maxAngle: (60 * Math.PI) / 180, spin: 14 },
    hard: { hold: 2.2, maxAngle: (75 * Math.PI) / 180, spin: 7 },
  },

  // arcade (NFS-style) handling
  arcadeGrip: 1.12, // extra grip outside drifts
  arcadeAngle: 0.38, // rad: slip angle with neutral-ish steering
  arcadeAngleSteer: 0.26, // rad added (or removed) by steering into (against) the slide
  arcadeAngleRate: 6, // 1/s: how fast the slip follows its target
  arcadeRecover: 7, // 1/s: straightening speed on exit
  arcadeExitDelay: 0.18, // s of exit input before the car straightens
  arcadeScrub: 7, // m/s² speed lost at a 90° slide (scaled by sin β)
  arcadeDrive: 0.5, // share of drive force that pushes the car along its path while sliding
  brakeTapWindow: 0.45, // s after a brake tap in which turn-in starts a drift

  // nitrous
  nitroStart: 0.5,
  nitroAccel: 10,
  nitroTopSpeedBonus: 1.14,
  nitroBurn: 0.3, // tank per second (full tank ≈ 3.3 s)
  nitroDriftFill: 0.3, // × car drift stat gain
  nitroSpeedFill: 0.02, // per second above 78 % of top speed
  nitroDraftFill: 0.08, // per second in a full slipstream
  nitroNearMiss: 0.08, // per near miss

  // speedbreaker (slow motion, single player)
  speedbreakScale: 0.45,
  speedbreakDrain: 0.22, // meter per real second
  speedbreakFill: 0.035, // meter per second while drifting or flat out
  speedbreakGrip: 1.25,

  // boost pads
  boostAccel: 9.5,
  boostTopSpeedBonus: 1.12,
  padBoostDuration: 1.1,
  padBoostAccel: 12,

  slipstreamAccel: 1.4,

  // collision
  wallRestitution: 0.15,
  wallFriction: 0.12, // fraction of tangential speed lost on a scrape per contact
  wallSpeedLoss: 0.35, // fraction of normal speed lost beyond restitution
  stuckSpeed: 2.5,
  stuckTime: 3,
});

// Surface grip multipliers and drag (m/s^2 at 30 m/s, scaled by speed).
export const SURFACES = Object.freeze({
  asphalt: { id: 'asphalt', grip: 1.0, drag: 0, bump: 0 },
  kerb: { id: 'kerb', grip: 0.94, drag: 0.3, bump: 0.035 },
  grass: { id: 'grass', grip: 0.58, drag: 5.5, bump: 0.02 },
  sand: { id: 'sand', grip: 0.5, drag: 11, bump: 0.03 },
  oil: { id: 'oil', grip: 0.22, drag: 0, bump: 0 },
});

/** Map 1..10 stats to physical parameters. */
export function deriveParams(stats) {
  const s = (k) => Math.max(1, Math.min(10, stats[k] || 5));
  const accel = s('acceleration');
  const top = s('topSpeed');
  const brake = s('braking');
  const handling = s('handling');
  const downforce = s('downforce');
  const drift = s('drift');
  return {
    maxAccel: 8.2 + accel * 0.62, // m/s^2 at low speed
    vTop: 69 + top * 2.0, // m/s (≈ 256..320 km/h)
    brakeDecel: 17 + brake * 1.6,
    mu: PHYSICS.muBase * (0.9 + handling * 0.022),
    steerRateMul: 0.85 + handling * 0.035,
    downforce: 0.00004 + downforce * 0.000016, // load gain per (m/s)^2
    driftEnter: PHYSICS.driftEnterAngle * (1.18 - drift * 0.03),
    driftRearGrip: PHYSICS.driftRearGrip * (1.06 - drift * 0.018),
    driftStab: 0.8 + drift * 0.05, // multiplies how firmly the drift assist holds the angle
    driftAngleMul: 0.9 + drift * 0.025,
    driftBoostGain: 0.18 + drift * 0.022, // nitro fill per second at 30° / 30 m/s
    powerOversteer: 0.25 + accel * 0.05,
  };
}
