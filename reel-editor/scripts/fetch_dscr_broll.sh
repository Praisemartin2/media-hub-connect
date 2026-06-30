#!/usr/bin/env bash
# Download the 4 fresh Higgsfield DSCR b-roll clips (veo3_1_lite, 9:16, 6s).
# Requires d8j0ntlcm91z4.cloudfront.net in the egress allowlist (fresh session).
# Run from reel-editor/:  bash scripts/fetch_dscr_broll.sh
set -euo pipefail
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_38Q7UV4HRCn3Op8W57z72pn2Iev"
DEST="public/broll"; mkdir -p "$DEST"
declare -A CLIPS=(
  [dscr_property.mp4]="hf_20260630_020507_0dcda2f5-4187-4052-a547-0e7b338dbddb.mp4"  # duplex aerial
  [dscr_income.mp4]="hf_20260630_020508_fe2f3d4e-458b-4cb7-ba59-3c645f1c4f32.mp4"    # cash + model house
  [dscr_loan.mp4]="hf_20260630_020510_418962d7-9d40-46a4-bdb1-45dc8565c036.mp4"      # signing loan docs
  [dscr_keys.mp4]="hf_20260630_020511_b646c504-8a93-44cc-bc67-19d72e786d2c.mp4"      # keys handoff
)
fail=0
for name in "${!CLIPS[@]}"; do
  echo "-> $name"
  curl -fSL -m 180 -o "$DEST/$name" "$BASE/${CLIPS[$name]}" || { echo "   FAILED (egress?)"; fail=1; continue; }
  head -c12 "$DEST/$name" | grep -q ftyp || { echo "   not mp4: $(head -c80 "$DEST/$name")"; rm -f "$DEST/$name"; fail=1; }
done
[ "$fail" = 0 ] && echo "OK — all 4 in public/broll/. Set BROLL in src/dscr-data.ts to dscr_*.mp4 and re-render." \
  || { echo "Add d8j0ntlcm91z4.cloudfront.net to egress allowlist (fresh session), then re-run."; exit 1; }
