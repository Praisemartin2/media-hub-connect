#!/usr/bin/env bash
# Download the source talking-head video from Google Drive for the cult-brand edit.
#
# Prereqs (set BEFORE the session that runs this):
#   1. The file is shared "Anyone with the link" in Google Drive.
#   2. These hosts are in the environment's network egress allowlist:
#        drive.google.com
#        drive.usercontent.google.com
#        googleusercontent.com
#      (egress changes only take effect in a fresh session)
#
# Run from reel-editor/:  bash scripts/fetch_drive_video.sh
set -euo pipefail

FILEID="1Mu0REAwaHHsaJ_cX_jqZy9Ec5MOIQZqR"   # lv_0_20260626202024.mp4 (~91 MB)
OUT="public/source/source.mp4"
mkdir -p public/source
COOKIE="$(mktemp)"

ok() { head -c12 "$1" | grep -q "ftyp"; }

echo "-> attempt 1: direct (confirm=t)"
curl -sSL -m 600 -c "$COOKIE" \
  "https://drive.usercontent.google.com/download?id=${FILEID}&export=download&confirm=t" -o "$OUT" || true

if ! ok "$OUT"; then
  echo "-> attempt 2: parse confirm token from warning page"
  page="$(curl -sSL -m 120 -c "$COOKIE" \
    "https://drive.google.com/uc?export=download&id=${FILEID}")" || true
  confirm="$(printf '%s' "$page" | grep -o 'confirm=[0-9A-Za-z_-]\+' | head -1 | cut -d= -f2 || true)"
  uuid="$(printf '%s' "$page" | grep -o 'uuid=[0-9A-Za-z_-]\+' | head -1 | cut -d= -f2 || true)"
  if [ -n "${confirm:-}" ]; then
    curl -sSL -m 600 -b "$COOKIE" \
      "https://drive.usercontent.google.com/download?id=${FILEID}&export=download&confirm=${confirm}${uuid:+&uuid=$uuid}" \
      -o "$OUT" || true
  fi
fi

rm -f "$COOKIE"

if ok "$OUT"; then
  echo "OK: $(wc -c < "$OUT") bytes -> $OUT"
  echo "Next: paste/confirm the transcript, then I build captions + the cult-brand edit."
else
  echo "FAILED. First bytes were:"; head -c160 "$OUT" || true; echo
  echo "Check: file shared 'Anyone with link', and Drive hosts on the egress allowlist (fresh session)."
  exit 1
fi
