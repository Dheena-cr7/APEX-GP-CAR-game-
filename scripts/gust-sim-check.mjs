// Headless checks for GUST CREW: course geometry + bot crews race every
// course with 1, 2 and 4 sailors. Fails (exit 1) on an unfinishable course,
// a river that folds back onto itself, or broken physics (NaN, tunnelling).
//
//   node scripts/gust-sim-check.mjs [courseId]

import { COURSES } from '../src/gust/sim/Courses.js';
import { Sim } from '../src/gust/sim/Sim.js';
import { BotCaptain } from '../src/gust/sim/Bot.js';
import { River } from '../src/gust/sim/River.js';

const only = process.argv[2];
const DT = 1 / 120;
let failed = false;
const fail = (msg) => {
  failed = true;
  console.log('  FAIL ' + msg);
};

for (const course of COURSES) {
  if (only && course.id !== only) continue;
  console.log(`\n${course.name} (${course.id})`);
  const river = new River(course.river);
  console.log(`  length ${river.length.toFixed(0)} m, bbox ${(river.bbox.maxX - river.bbox.minX).toFixed(0)} x ${(river.bbox.maxZ - river.bbox.minZ).toFixed(0)} m`);
  // separate stretches of river must stay well apart (terrain + banks between)
  let minGap = Infinity, at = null;
  for (let i = 0; i < river.n; i += 2) {
    for (let j = i + 90; j < river.n; j += 2) {
      const d = Math.hypot(river.x[i] - river.x[j], river.z[i] - river.z[j]) - river.hw[i] - river.hw[j];
      if (d < minGap) { minGap = d; at = [i, j]; }
    }
  }
  console.log(`  closest approach of separate stretches: ${minGap.toFixed(1)} m (s=${at && at[0]} vs ${at && at[1]})`);
  if (minGap < 34) fail(`river comes within ${minGap.toFixed(1)} m of itself`);
  // every shell and hazard must be on the water
  for (const sh of course.shells) if (Math.abs(sh.u) > 0.8) fail(`shell at s=${sh.s.toFixed(0)} too close to the bank (u=${sh.u})`);
  for (const h of course.hazards) if (h.s < 20 || h.s > river.length - 20) fail(`hazard ${h.type} at s=${h.s} outside the course`);

  for (const crewN of [1, 2, 4]) {
    const crew = Array.from({ length: crewN }, (_, i) => ({ slot: i, bot: true, name: 'Bot' + i }));
    const sim = new Sim(course, { crew, seed: 7 + crewN });
    const cap = new BotCaptain(sim);
    cap.autoRespawn = true;
    sim.startCountdown();
    let impacts = 0, hard = 0, knocks = 0, maxV = 0, maxPen = 0;
    let steps = 0;
    const limit = 400 / DT;
    while (sim.phase !== 'finished' && steps < limit) {
      cap.update(DT);
      sim.step(DT);
      steps++;
      const r = sim.raft;
      if (!Number.isFinite(r.x + r.z + r.yaw + r.vx + r.vz + r.w + r.y)) {
        fail(`NaN in raft state at step ${steps}`);
        break;
      }
      maxV = Math.max(maxV, Math.hypot(r.vx, r.vz));
      const hw = sim.river.at(sim.river.hw, r.s);
      maxPen = Math.max(maxPen, Math.abs(r.t) - hw);
      for (const e of sim.events) {
        if (e.type === 'impact') { impacts++; if (e.power > 3) hard++; }
        if (e.type === 'knock') knocks++;
      }
      sim.events.length = 0;
    }
    const t = sim.phase === 'finished' ? sim.finishTime : NaN;
    console.log(`  crew ${crewN}: ${sim.phase === 'finished' ? 'finished ' + t.toFixed(1) + ' s' : 'DNF at s=' + sim.raft.s.toFixed(0)} · shells ${sim.shellCount}/${sim.shells.length} · impacts ${impacts} (hard ${hard}) · knocked ${knocks} · respawns ${sim.respawns} · top ${maxV.toFixed(1)} m/s · centre past bank ${maxPen.toFixed(2)} m`);
    if (sim.phase !== 'finished') fail(`crew ${crewN} did not finish`);
    if (maxPen > 0.5) fail(`raft centre went ${maxPen.toFixed(2)} m outside the bank`);
  }
}

console.log(failed ? '\nFAILED' : '\nALL OK');
process.exit(failed ? 1 : 0);
