# Halloween Managers' Meeting highlight — project handoff

Client: the user's own company (property management, 22 properties). Event: company management
meeting on 2026-10-28, Halloween theme, every manager in costume, filmed on phones.

## Brief (from the user)
- A highlight video that feels like a haunted house: camera motion, smoke/fog, heightened effects.
- Reference feel: the opening of Michael Jackson's "Thriller" (fog, night, slow dread) — but see MUSIC.
- Showcase each manager in costume; modern motion graphics; "the best plugin" = in this pipeline that
  means ffmpeg filter chains + PIL/numpy-generated graphics + Higgsfield-generated plates. Nothing to install.

## Pipeline (same as bday/)
- Sources: user drops clips in a Google Drive folder shared "anyone with link"; CI downloads with gdown.
- Analysis job: ffprobe + whisper + contact sheets -> halloween/analysis/.
- Sources: halloween/manifest.tsv (filename<TAB>Drive id, 84 files); CI downloads each with gdown
  (gdown's folder mode stops at 50 files).
- Render: `python3 render_v.py edl.json <out>` run by .github/workflows/halloween-render.yml, which
  triggers on pushes that touch edl.json or the workflow file (or workflow_dispatch). Outputs are
  committed to halloween/out/; the full-quality master is the `halloween-master` run artifact (30 days),
  because GitHub rejects files over 100 MB. The committed mp4 is the bitrate-capped social master.
- QA artefacts per render: out/_shots_<out>.jpg (labelled frame per shot), out/_wave_<out>.png (cuts in
  orange, nat-sound bites in red), out/_qa_checks_<out>.txt, out/_loudness_<out>.txt, out/_timeline_<out>.json.
- Local container has NO ffmpeg; PIL and numpy yes. All video work happens in CI (or the Higgsfield sandbox).
- Deliver: 540p preview via attachment (30 MB cap); 1080p via raw GitHub link.

## Assets (halloween/assets/)
- plates/: Higgsfield stills — mansion exterior, foggy forest path, mansion entrance hall (16:9).
- fonts/: Creepster, Nosifer, Eater, Special Elite (+ Oswald/Inter from bday/assets/fonts).
- music/: royalty-free candidates from incompetech (CC-BY, Kevin MacLeod). "Thriller" itself is
  copyrighted — only usable if the user has a licence or accepts the risk for internal-only use.
- fog/: procedural fog loop (tools/fog.py -> fog_1080.mp4), overlayed with blend=screen.

## Look
Teal/green night grade, crushed blacks, film grain, vignette, slow push-ins with handheld jitter,
lightning flash cuts, flicker, chromatic aberration on transitions, fog in every shot, tombstone-style
lower thirds (name + property), horror display type for titles.

## EDL fields (edl.json -> render_v.py)
kind (plate/title/video/photo/endcard), src, dur, in, move (push/pull/hold/pan_left/pan_right), shake,
fx (fogheavy, fogoff, flicker, flash, glitch), transition_in (cut/flash/glitch/fadeblack/fadewhite),
audio (none/nat), text/text2, crop (left/center/right) or crop_x (0..1 centre) for landscape sources,
crop_box [x0,y0,x1,y1] (fractions, keep 9:16), mask_box [x0,y0,x1,y1] (privacy blur of the background
inside the box; people are protected by a rembg person mask), focus [fx,fy] (push anchor), zoom (push
amount), gamma (per-shot lift), end_track_s (pin this shot's end to a time in the music file, seconds),
muffle (groove low-passed while these shots play), nosnap (keep this cut off the beat grid).
Top level: music, music_start_s, intro_drone, music_splice [a, b] (file seconds, jump a -> b), out.
Cuts snap to beats within 0.35 s; videos that run short are slowed (max 1.5x) instead of freezing.

## Content rules (do not break)
- Never use 20261028_122047.mp4 (management role-play disciplining an employee) — no picture, no sound.
- Keep 20261028_123050.mp4 and 20261028_123129.mp4 out (role-play skits) and the Charter House flyer.
- The wall TV in the 11:59-12:00 clown/trio shots shows a bank login: always mask_box it.
- Fun-spooky and flattering: no eating, sipping or caught-off-guard frames.
- "Thriller" is copyrighted: royalty-free score (incompetech, CC-BY Kevin MacLeod) unless the user
  supplies a licensed file. Credit line if posted publicly: "Music: Bump in the Night - Kevin MacLeod
  (incompetech.com), CC BY 4.0".

## Versions
- v1: first cut (purple cast from a YUV blend, title clipped).
- v2: teal night grade, fitted titles, 42 shots. QA found the bank login on the TV, a right-edge bar,
  fog stripes, frozen clip ends and coverage gaps.
- v3 (commit 14a5994): QA fixes; the CI render failed on an unquoted crop expression and was superseded.
- v4: the QA editor's merged list (40 shots, ~97 s): tighter dread under a low-passed "party behind the walls"
  groove that opens on the flash cut to the clown; pom-pom team/alien/duck aligned to the music's drain and
  re-entry; witch claw ends on the groove's return; breakdown cuts on the stabs; a 4-cut curtain call; the music
  is spliced (79.88 -> 102.59, matching downbeats) so the endcard plays the song's real final hit; thunder on
  every lightning strike. Rehearsed locally with stand-in media before the CI render.

## Local rehearsal (no Drive access from the Claude container)
Build stand-ins from analysis/thumbs (photos) and analysis/sheets (clips), symlink assets/tools, then run
render_v.py in that folder. Renders are cached per shot (work/sNNN.mp4.key), so an interrupted run resumes.

## Open questions -> see the chat; answers should be recorded here when they arrive.
Names/properties for lower thirds; Thriller licence; tone; deadline; where it will be posted.
