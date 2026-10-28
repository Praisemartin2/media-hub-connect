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
- Render: halloween/render.sh run by .github/workflows/halloween-render.yml (own-path trigger or
  workflow_dispatch); outputs committed to halloween/out/ (1080p master + 480p preview + sheet).
- Local container has NO ffmpeg; PIL yes; numpy no. All video work happens in CI (or the Higgsfield sandbox).
- Deliver: 480p preview via attachment (30 MB cap); 1080p via raw GitHub link.

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

## Open questions -> see the chat; answers should be recorded here when they arrive.
