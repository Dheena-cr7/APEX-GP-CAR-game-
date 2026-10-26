# Prompt log

| # | Prompt / phase | Gate result |
|---|---|---|
| 1 | Master prompt v2, Phase 1 — Foundation (Vite + pinned Three, tokens, 4 UI components + racing components, `?styleguide`, fixed-timestep loop, resize, game-state store, verify skeleton with fake clock + seeded random) | build PASS · lint PASS (0 warnings) · verify PASS (styleguide + game shell, 0 console errors/warnings) · styleguide screenshot reviewed |
| 2 | Phase 2 — Drivable car + one circuit (spline track, car, keyboard, chase camera, drift physics, `?debug` hook, `?debugview`). Menus, garage, race rules and FX modules were written in the same pass because the race scene integrates them; their own gates run in later phases. | physics 6×20 PASS · build PASS · lint PASS · verify 22/22 PASS: autopilot full lap of Beginner GP (60.3 s) with scripted wall hit, drift and cone row; 0 camera-in-geometry frames; max overlap 0.00 cm; 3 runs identical. Screenshots reviewed → fixed oversized particles, HUD overlapping the car, HUD visible behind pause/results, garage overflow, missing impact shot, gantry pillars inside the runoff. |
