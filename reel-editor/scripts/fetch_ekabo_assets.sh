#!/usr/bin/env bash
# Fetch the 5 purpose-built Ekabo b-roll clips from Higgsfield storage.
#
# These clips were generated with veo3_1_lite (text-to-video, 9:16, 6s) and live
# on the Higgsfield CDN. That host must be in the container's network egress
# allowlist or every download returns HTTP 403 ("host_not_allowed"):
#
#     d8j0ntlcm91z4.cloudfront.net
#
# Run from the reel-editor/ directory:  bash scripts/fetch_ekabo_assets.sh
# On success, flip ASSETS_READY=true in src/ekabo-data.ts and render:
#     npx remotion render EkaboReel out/EkaboReel.mp4
set -euo pipefail

BASE="https://d8j0ntlcm91z4.cloudfront.net/user_38Q7UV4HRCn3Op8W57z72pn2Iev"
DEST="public/broll"
mkdir -p "$DEST"

# local filename -> remote object (Higgsfield job result)
declare -A CLIPS=(
  [re_skyline.mp4]="hf_20260612_013121_c4127f69-965e-4ee7-ab52-f85a4dccc82e.mp4"   # aerial city skyline, golden hour
  [re_cash.mp4]="hf_20260612_013123_81ff4f5a-7c1d-4404-8f56-983ced7ec894.mp4"      # stacks of $100s shrinking
  [re_house.mp4]="hf_20260612_013148_c70962ac-0c8d-4ab5-9db6-1fcb1b5f363a.mp4"     # modern suburban house at sunset
  [re_keys.mp4]="hf_20260612_013126_cc177b26-a2b2-4ebd-9cca-e538deb956dd.mp4"      # hand passing house keys
  [re_interior.mp4]="hf_20260612_013127_11828d09-d216-4102-bb2c-e749266daa12.mp4"  # luxury living room push-in
)

fail=0
for name in "${!CLIPS[@]}"; do
  url="$BASE/${CLIPS[$name]}"
  out="$DEST/$name"
  echo "-> $name"
  curl -fSL -m 180 -o "$out" "$url" || { echo "   DOWNLOAD FAILED (egress blocked?)"; fail=1; continue; }
  # Reject the proxy's 403 text body that masquerades as a file.
  if ! head -c12 "$out" | grep -q "ftyp"; then
    echo "   NOT AN MP4 -> $(head -c120 "$out")"; rm -f "$out"; fail=1; continue
  fi
  echo "   ok ($(wc -c < "$out") bytes)"
done

if [ "$fail" -ne 0 ]; then
  echo
  echo "One or more clips did not download. If you saw 'host_not_allowed', add"
  echo "  d8j0ntlcm91z4.cloudfront.net"
  echo "to the environment's network egress allowlist, then re-run this script."
  exit 1
fi
echo
echo "All 5 clips fetched. Next: set ASSETS_READY=true in src/ekabo-data.ts,"
echo "add public/ekabo-vo.mp3 + public/ekabo-music.mp3, then render EkaboReel."
