// Star scoring for campaign levels (0..3).

/**
 * level: campaign level, target: resolved thresholds, res: race results.
 * Grand Prix: P1 = 3, P2 = 2, P3 = 1 (top-3 medal).
 * Time Attack: best lap vs gold / silver / bronze (0 if the time ran out
 * before finishing).
 * Drift Challenge: banked drift score vs thresholds.
 */
export function starsFor(level, target, res) {
  if (!target) return 0;
  if (target.type === 'position') {
    if (!res.rows || res.rows.length < 2) return 0;
    return res.position === 1 ? 3 : res.position === 2 ? 2 : res.position === 3 ? 1 : 0;
  }
  if (target.type === 'lap') {
    if (res.timedOut) return 0;
    const best = res.bestLap;
    if (!(best > 0)) return 0;
    // penalties count against the lap target, spread over the laps driven
    const laps = Math.max(1, res.lapTimes ? res.lapTimes.length : 1);
    const lap = best + (res.penalty || 0) / laps;
    return lap <= target.gold ? 3 : lap <= target.silver ? 2 : lap <= target.bronze ? 1 : 0;
  }
  if (target.type === 'drift') {
    const pts = res.driftScore || 0;
    return pts >= target.gold ? 3 : pts >= target.silver ? 2 : pts >= target.bronze ? 1 : 0;
  }
  return 0;
}

export function medalName(position) {
  return position === 1 ? 'Gold' : position === 2 ? 'Silver' : position === 3 ? 'Bronze' : '';
}
