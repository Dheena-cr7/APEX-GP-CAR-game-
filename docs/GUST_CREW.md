# GUST CREW

A co-op physics raft game for the browser, and the second game on this site (at `/gust/`). One to four sailors share one raft. Each sailor walks the deck and blasts a gust horn that pushes the raft the way they face, from where they stand. A push through the middle goes straight; a push from a corner turns the raft. The crew has to coordinate to get down four rivers full of rocks, swinging logs, mill wheels, whirlpools, ice floes and waterfalls.

It is an original game in the genre of co-op "push the raft together" physics games. Its name, characters (the Puff sailors), art, rivers, sounds and code were all made for this project.

## Play

- **Solo:** you plus 0–3 bot crewmates (bots walk the deck and blast like players).
- **Local co-op:** up to 4 sailors on one screen: WASD + Space, Arrows + Enter, plus gamepads. Bots can fill empty seats.
- **Online crew:** up to 4 sailors. Create a room, share the 4-letter code or the invite link (`/gust/?room=CODE`). The host picks the river and bots. Players can join a race already in progress; a joiner takes over a bot's seat.

| Action | Keyboard + mouse | Player 2 keys | Gamepad | Touch |
|---|---|---|---|---|
| Walk | WASD | Arrows | Left stick / d-pad | Joystick |
| Aim | Mouse (else walk direction) | Walk direction | Right stick | Joystick |
| Blast (hold) | Space / left click | Enter, Numpad 0, Right Ctrl | RT / A | BLAST |
| Big Puff | Shift, E / right click | Right Shift, Numpad 1, / | X / RB / LT | PUFF |
| Back to checkpoint | R | . | Y | ↺ |
| Pause | Esc | | Start | Pause button |

**Don't touch obstacles.** One bump on a rock, log, mill wheel or ice floe wrecks the raft: it bursts into planks, everyone is thrown into the water, and 1.6 s later the whole crew respawns at the last checkpoint with 2.2 s of safety (obstacles only bounce). Checkpoints are placed automatically in clear water every ~50–65 m, so a wreck never costs much. Respawning has no time penalty; the lost time is the penalty. Bank hits only bounce.

Rivers unlock in order (finish one to open the next). Medals are time based; golden shells are collected for a separate record.

**Sound:** blasts are silly toots (a fluttering raspberry that squeaks on start and release, droops in pitch as your gust meter runs out), Big Puff is a descending "BRAAAP", and a wreck crunches, boings and splashes. Settings → "Silly toot sounds" switches back to wind.

| River | Theme | Hazards | Gold |
|---|---|---|---|
| Lily Lagoon | Sunny meadow | Rocks, one log | 1:25 |
| Timber Rapids | Pine canyon | Rapids, logs, mill wheel, two falls | 2:00 |
| Frostbite Fjord | Glacier | Ice floes, whirlpools, ice gorge, icefall | 1:58 |
| Sunset Gorge | Red canyon | Twin mill wheels, slot rapids, 4.5 m waterfall, whirlpools | 1:55 |

## Physics

All in `src/gust/sim/` (pure JS, no three.js, so the same code runs in the browser, on every online peer and in Node):

- **River** (`River.js`): a centreline walked "turtle style" from segments (length, turn, width, current, rapids, drop), sampled every metre. Current is fastest mid-stream and slower at the banks; rapids add a deterministic lateral sway; whirlpools add swirl plus a pull to the eye; waterfalls are drops in the water height.
- **Raft** (`Sim.js`): 2D rigid body (position, yaw, velocity, spin) with mass and inertia scaled by crew size. Water drag is sampled at five points, so current shear and whirlpools spin the raft naturally. Each sailor's thrust is applied at their deck position (force and torque). Collisions are box vs circle (rocks, logs, mill arms, floes, all built from circles) and hull points vs the banks, with restitution and friction impulses. Moving hazards are pure functions of the clock, so every peer agrees on them.
- **Falls:** the raft follows the water surface until the surface drops faster than gravity allows, then flies, lands with a splash, and can throw sailors overboard.
- **Wrecks:** touching any obstacle (outside the post-respawn safety window) wrecks the raft. Online, only the host decides a wreck; it sends the wreck count, timer and safety time in snapshots, and every peer throws its own sailors overboard and hauls them back at the respawn.
- **Checkpoints** (`_buildCheckpoints`): every 2 m of river is tested for open water (nothing just behind, 14 m clear ahead); checkpoints are picked greedily so they are at most ~65 m apart. The respawn picks the clearest lane at that spot.
- **Crew:** walk the deck (around the mast), turn toward aim, gust meter with drain/refill, Big Puff impulse, knocked overboard by hard hits (chance grows with impact and distance from the centre), swim back or get hauled aboard after 6 s.
- **Bots** (`Bot.js`): pick a lane that avoids the hazards they will reach (predicting moving ones), compute the push they need, and stand where the push line damps the raft's spin.

Tuning lives at the top of `Sim.js` (thrust, puff, gas, walking, knock threshold) and `setCrewCount` (mass, drag). `npm run gust:check` validates every river (no river stretch within 34 m of another, hazards and shells on the water) and races bot crews of 1, 2 and 4 down each one, failing on a DNF, NaN, or the raft escaping a bank.

## Graphics

`src/gust/render/`: custom water shader (flow-mapped normals moving at the local current speed, fresnel sky reflection, sun glints, depth tint, foam at banks, rocks, rapids and falls), procedural sky with clouds, height-field terrain shaped by distance to the river (beaches, cliffs, canyon terraces, mountains, snow), instanced scenery, procedural raft and sailors, CPU particles (gust clouds, spray, mist, sparkles, confetti), water decals (wake, ripples, shockwaves), snow and dust. Terrain and scenery are split into tiles so anything off-screen or outside the shadow area is culled.

Quality: Auto picks High on desktop and Medium on touch / small screens. While racing, sustained slow frames lower the resolution (down to 0.6×) and it steps back up when there is headroom again. Measured on the development machine (Timber Rapids, High): 7 ms median frame, ~380k triangles and ~225 draw calls including the shadow pass.

## Online

`src/gust/net/`: star topology over PeerJS WebRTC data channels (same free broker and optional TURN settings as APEX GP, see the main README).

- Every peer runs the full simulation (prediction), so your own blasts move the raft instantly.
- Each player owns their sailor and sends its state 30×/s; the host relays sailors and sends authoritative snapshots 20×/s (raft, clock, phase, checkpoints, shells, every sailor).
- Clients keep a short history of their raft and compare it with each snapshot at the host's time, then blend 30% of the difference in. Only big disagreements (respawn, more than 4 m) snap.
- The channel is unordered (no head-of-line blocking); stale snapshots are dropped by sequence number.
- Remote sailors are drawn 110 ms in the past, interpolated, so they move smoothly.
- Clock sync uses ping/pong round-trip time. Hidden or throttled tabs keep simulating and syncing through a worker timer, and a watchdog takes over if the browser stops animation frames without saying the page is hidden.
- Silent peers are dropped after 9 s; a client that loses the host retries once automatically.

Measured between two browser tabs over WebRTC through the public broker: 12 ms round trip, average prediction error 6 mm, max 3.4 cm, no hard corrections.

## Testing

- `npm run gust:check`: geometry and bot races, all courses (headless, about 3 s).
- `?debug` exposes `window.__gust` (the game) and `window.__gust.race.netStats` (online prediction error).
- `?localnet` makes online rooms use BroadcastChannel between tabs of one browser (offline testing).
- `?quality=low|medium|high` forces a preset; `?nowebgl` simulates missing WebGL.

## Known limitations

- Gamepads and touch were tested with emulation, not real hardware.
- The procedural sound and music were checked for errors, not listened to; adjust volumes in Settings.
- Only Chromium was tested. Firefox and Safari were not run.
- Players on strict networks (mobile data, campus or office Wi-Fi) need a TURN relay to connect, as with APEX GP.
