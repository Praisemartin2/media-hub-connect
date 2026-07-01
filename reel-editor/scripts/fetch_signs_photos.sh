#!/usr/bin/env bash
# Download the 7 Higgsfield photos for the "Neighborhood Signs" Ekabo carousel.
# Requires d8j0ntlcm91z4.cloudfront.net in the egress allowlist (fresh session).
# Run from reel-editor/:  bash scripts/fetch_signs_photos.sh
set -euo pipefail
BASE="https://d8j0ntlcm91z4.cloudfront.net/user_38Q7UV4HRCn3Op8W57z72pn2Iev"
DEST="public/signs"; mkdir -p "$DEST"
declare -A P=(
  [s1.png]="hf_20260701_020226_a6562f35-1c66-4f5f-9d3b-64c9e7be44cc.png"  # cover: up-and-coming street
  [s2.png]="hf_20260701_020227_cfc64b93-b19e-4c0e-b397-62409e070b6b.png"  # 01: corner cafe
  [s3.png]="hf_20260701_020231_c68ece26-f36a-4004-a13d-e4c1e399dbcb.png"  # 02: construction cranes
  [s4.png]="hf_20260701_020231_1fc9124e-2de7-4389-9ec2-31903b2cf73e.png"  # 03: beltline trail
  [s5.png]="hf_20260701_020232_e379c27b-6a09-47d2-9969-73bd62a5f55a.png"  # 04: home mid-renovation
  [s6.png]="hf_20260701_020233_81b6b0ff-39e5-4d4d-be93-24a9e8514832.png"  # 05: street mural
  [s7.png]="hf_20260701_020234_2b19c198-40f5-4243-83f1-58d3bbae7145.png"  # close: aerial at dusk
)
fail=0
for name in "${!P[@]}"; do
  echo "-> $name"
  curl -fSL -m 120 -o "$DEST/$name" "$BASE/${P[$name]}" || { echo "   FAILED"; fail=1; continue; }
  head -c8 "$DEST/$name" | grep -q PNG || { echo "   not png"; rm -f "$DEST/$name"; fail=1; }
done
[ "$fail" = 0 ] && echo "OK — 7 photos in public/signs/. Set ASSETS_READY=true in src/signs-data.ts and render NeighborhoodSigns." \
  || { echo "Allowlist d8j0ntlcm91z4.cloudfront.net (fresh session) and re-run."; exit 1; }
