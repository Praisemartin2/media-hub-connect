# Next session — IMG_2071 cult-brand edit + Higgsfield b-roll

The source video is committed at `public/source/img2071.mp4` (272×484, 24fps, ~104s).
Goal: edit in our cult-brand style (warm grade + rust karaoke captions + cobalt/cream
title cards + b-roll punch-ins + CTA) with **Higgsfield AI b-roll** added.

## Prereqs for this session to work
1. `d8j0ntlcm91z4.cloudfront.net` is in the network egress allowlist (so Higgsfield
   results can be downloaded). Verify: `curl -sI https://d8j0ntlcm91z4.cloudfront.net/`
   should NOT be a 000/403 egress denial.
2. User pastes the transcript (no speech-to-text here) → save to
   `public/source/img2071-transcript.txt`.

## Steps (streamlined — reuse the SubjectToReel pipeline)
1. **Probe**: `FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")`
   then `"$FF" -i public/source/img2071.mp4` for exact duration.
2. **Higgsfield b-roll** (after reading transcript to pick 4–6 keyword scenes):
   - `generate_image` (model `nano_banana_2` or `seedream_v4_5`, 9:16) per scene — these
     need user approval. Real-estate-appropriate, cult-brand warm palette.
   - Download each result URL into `public/broll/` via curl (works once cloudfront is
     allowlisted). Validate each is a real image (`file`/`ftyp` for video).
   - NOTE: generate_video b-roll also works the same way if motion is wanted.
3. **Compose**: clone the `SubjectToReel` approach — make `img2071-data.ts` +
   `IMG2071Reel.tsx` (or generalize SubjectToReel to take props). Point A-roll at
   `source/img2071.mp4`, set `DURATION_SECONDS`, map title cards + b-roll `atFrac` to
   transcript positions (see how subjectto-data.ts derived fractions from word indices).
4. **Captions**: `python3 scripts/build_subjectto_captions.py <duration> \
   --in public/source/img2071-transcript.txt --out src/img2071-captions.json`
5. **Render**: `npx remotion render IMG2071Reel renders/IMG2071Reel.mp4`, then also emit a
   720p copy for easy download:
   `"$FF" -i renders/IMG2071Reel.mp4 -vf scale=-2:1280 -c:v libx264 -crf 30 -preset veryfast -c:a aac -b:a 128k -movflags +faststart renders/IMG2071Reel_720p.mp4`
6. Commit both MP4s; deliver the 720p in chat (59MB+ files don't download from chat well).

## Caveats to tell the user
- Source is low-res (272×484) → will look soft upscaled to 1080×1920.
- 104s is long for a reel; consider trimming or a silence-cut pass (`scripts/silence_cut.py`).
- Caption sync is proportional (no ASR), so lines may drift slightly — nudge in the JSON.
