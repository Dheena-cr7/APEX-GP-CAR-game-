# Verification

`npm run verify` runs every section below headless on the real GPU, under a paused fake clock (exact 16 ms frames) with seeded `Math.random`. It writes screenshots and `report.json` (per-frame samples, events, memory snapshots) to `verify-shots/`. A section can be run alone with `node scripts/verify.mjs --only=<section>`: `physics, styleguide, menus, lap, rules, garage, circuits, ai, systems, memory, debugview`.

The autopilot (`scripts/verify-autopilot.js`) runs inside the page, reads the car through `window.__apex`, and drives by dispatching key events. On **every frame** it checks:

- the camera is not inside geometry (barrier, ground, obstacle colliders, oriented boxes of large props)
- the car body does not overlap a solid by more than 1 cm after collision resolution
- laps are never skipped and lap times match laps
- the route is completed

Any console error or warning fails the run.

## Final run

`npm run build` ✓ · `npm run lint` 0 warnings · `npm run verify` **114/114 checks passed** (556 s, Intel UHD iGPU via ANGLE/D3D11) · `npm run perf` 60 FPS on every circuit and preset at 1920×1080, max 117 draw calls / 114k triangles.

## Quality gates

| Gate | Result | Evidence |
|---|---|---|
| Starts with zero console errors / warnings | PASS | every section asserts a clean console |
| Every menu button and transition works, no dead ends, full keyboard navigation | PASS | every button on main / mode / circuit / campaign / setup / garage clicked and checked for an effect; arrows + Enter + Esc flow; pause menu buttons |
| Accelerate, brake, steer, reverse, handbrake, drift; drift score banks; combo breaks on wall hit | PASS | physics checks (6 cars × 21 each); rules: drift banks on straightening; combo lost on a solid hit |
| All camera modes work, no jitter, no clipping | PASS | C cycles chase / close / cockpit / TV with no camera-in-geometry frames; chase camera tested every frame of every lap |
| All 12 levels load; autopilot completes ≥ 1 lap on every circuit | PASS | 12/12 levels load with their rules; autopilot laps on all 4 circuits |
| Checkpoints can't be skipped; one crossing = one lap; reversing doesn't count | PASS | reverse over the line 3×, skip-and-cross, grid start |
| Obstacles: cones scatter, oil reduces grip, boost pads boost, walls stop | PASS | rules section |
| AI finishes, never permanently stuck, positions correct | PASS | 7 AI × 4 circuits finish with 0 auto-recoveries; results sorted, player position correct |
| Pause freezes sim and audio; resume works; restart fully resets | PASS | 2 s paused: no time or movement, AudioContext suspended; restart resets laps, clock, cones, particles, skids, drift and penalties |
| Save / restore works; corrupt data handled; blocked storage doesn't crash | PASS | reload restore; corrupt JSON; wrong types field by field; LocalStorage that throws |
| Resize / fullscreen keep layout and aspect | PASS | 800×600 and 1600×900 during a race; phone width 844×390 has no horizontal scroll |
| Tab hidden / visible and window blur don't break input or timers | PASS | blur releases keys; hidden tab stops the loop and race clock; resume without a time jump |
| 10× enter / leave race: flat `renderer.info.memory`, one rAF loop | PASS | geometries, textures and programs identical after 10 cycles; loops = 1 |
| Measured FPS, draw calls, triangles per circuit, High and Low | PASS | `npm run perf` (README → Performance); `verify` also checks < 150 calls / < 300k triangles |
| Simulated WebGL failure shows the friendly error | PASS | `?nowebgl`; real context loss + restore |
| `npm run build` succeeds and `npm run preview` serves a working game | PASS | `npm run perf` runs entirely against `vite preview` of the production build, with zero console problems |

## What I saw (screenshot review, ranked by severity, all fixed)

1. **Race views horizontally stretched.** The race camera's aspect was never set at race start (it stayed 1:1 until a window resize). Found by the resize check; fixed in `Game._onPhase`.
2. **Car could be squeezed by the Technical GP gate** (1.2 cm overlap, lap not finished). Moving obstacles now update before the cars and hold still rather than move into a car.
3. **AI queued into the Street GP crossing truck** (103 auto-recoveries in one race). AI now predicts the truck's position at arrival time and waits.
4. **Start-gantry pillars inside the runoff with no collider.** The pause screenshot showed the camera beside a pillar. Pillars moved outside the barriers.
5. **Shadow-map textures leaked** (+4 textures per race). Found by the 10× enter/leave test; lights' shadow maps are now disposed.
6. **Full-lock creep drove backwards** (gear "R" at 2 km/h). The low-speed tyre side force wasn't faded with the kinematic blend. New physics check.
7. **Particles rendered as huge opaque squares near the camera.** Sizes reduced and point size clamped.
8. **Key-hint bar and drift counter overlapped the car; HUD stayed visible behind pause / results; camera toasts covered the speed panel.** Moved and hidden as appropriate.
9. **Phone landscape:** HUD panels overlapped and the menu hero card was cut off. Added a compact layout for short screens.
10. **Garage footer off-screen at 720 p.** Back button moved into the panel, car strip anchored bottom-right.
11. **A rival car filmed from inside its body** when it passed the camera. Rivals within 2.6 m of the camera are hidden.
12. **TV camera too wide** (car tiny). Zoom tightened.
13. **Close-chase camera** looked into the rear wing. Raised.
14. **Handbrake drift too slow to start** (~0.75 s). A handbrake yaw kick now breaks the rear loose in ~0.35 s.

Remaining observations, not defects: AI grids repeat car models (5 models for 7 AI); the debug overlay (F3) shows zero draw calls under verify's render-on-demand mode only (correct in real play).

## Screenshots (verify-shots/)

| File | Shows |
|---|---|
| 00-styleguide | all tokens and components |
| 01-menu, 02-mode-select, 03-campaign, 04-garage | menus |
| 10-beginner-start / mid / drift / impact, 11-pause, 12-results | Beginner GP lap with scripted wall hit, drift and cone row |
| 20-garage-1…6, 21-garage-livery | all six cars, livery picker |
| 22-steer-lock-chase, 23-steer-lock-close | full steering lock: wheels stay inside the body envelope |
| 30-<circuit>-start / mid / drift / impact | every circuit |
| 40-ai-<circuit>, 41-results-<circuit> | 8-car races and results tables |
| 42-level-street-drift | a campaign level on the grid |
| 50-camera-chase / close / cockpit / tv, 51-resize-800x600 | camera modes, resize |
| 52-no-webgl, 53-context-lost | error screens |
| 54-phone-menu, 55-phone-race | touch device, 844×390 |
| 56-debug-view | `?debugview` top-down view + F3 overlay |
| 57-split-screen | 3 local players on Night City GP |
| 58-online-guest | a guest's view of an online race (3 tabs) |

## Not covered by automation

- Human playtesting with a physical keyboard, gamepad or wheel (feel is tuned numerically and with the autopilot).
- Listening to the audio mix.
- Real gamepad and touch hardware (a faked Gamepad API and Playwright touch emulation were used).
- Firefox and Safari.
- GPU frame time (only CPU frame cost and frame interval are measured).
