#!/usr/bin/env bash
# Download the 6 Higgsfield photos for the "4 Reasons" Ekabo carousel.
# Requires d8j0ntlcm91z4.cloudfront.net in the egress allowlist (fresh session).
# Run from reel-editor/:  bash scripts/fetch_reasons_photos.sh
set -euo pipefail
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_38Q7UV4HRCn3Op8W57z72pn2Iev"
DEST="public/reasons"; mkdir -p "$DEST"
declare -A P=(
  [r1.png]="hf_20260701_000142_78f3ef03-31bb-4cf9-a535-de3d2613a238.png"  # cover: luxury mansion
  [r2.png]="hf_20260701_000013_e1781997-9d78-42dd-b3c6-94e83deada77.png"  # 01: living room
  [r3.png]="hf_20260701_000115_0377f1b6-7448-47c1-97f6-61dcada55e55.png"  # 02: gold key + sapling
  [r4.png]="hf_20260701_000118_50c1e5f8-afcb-45c4-8b34-f0ca8db70b42.png"  # 03: hands holding city
  [r5.png]="hf_20260701_000121_947b0502-a1ea-47de-8c7c-1d4cb6d3c147.png"  # 04: gold bar chart
  [r6.png]="hf_20260701_000124_8fdbce60-ee0d-4354-8d29-cb6da45bfc82.png"  # close: night skyline
)
fail=0
for name in "${!P[@]}"; do
  echo "-> $name"
  curl -fSL -m 120 -o "$DEST/$name" "$BASE/${P[$name]}" || { echo "   FAILED"; fail=1; continue; }
  head -c8 "$DEST/$name" | grep -q PNG || { echo "   not png: $(head -c80 "$DEST/$name")"; rm -f "$DEST/$name"; fail=1; }
done
[ "$fail" = 0 ] && echo "OK — 6 photos in public/reasons/. Set ASSETS_READY=true in src/reasons-data.ts and render FourReasons." \
  || { echo "Allowlist d8j0ntlcm91z4.cloudfront.net (fresh session) and re-run."; exit 1; }
