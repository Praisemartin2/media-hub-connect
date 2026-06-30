#!/usr/bin/env bash
# Download a source video from Google Drive at FULL quality (no recompression).
#
# Usage:  bash scripts/fetch_drive_video.sh [FILEID] [OUTPATH]
#   defaults: FILEID = the DSCR reel, OUT = public/source/source_full.mp4
#
# Prereqs (set BEFORE the session that runs this):
#   1. The file is shared "Anyone with the link" in Google Drive.
#   2. These hosts are in the network egress allowlist (takes effect only in a
#      FRESH session):
#        drive.google.com
#        drive.usercontent.google.com
#        googleusercontent.com
#
# This pulls the ORIGINAL bytes untouched — the only quality-safe inbound path
# (chat uploads can recompress; the Drive MCP is capped at 10 MB).
set -euo pipefail

FILEID="${1:-1ISyHp7DDH72FC35BoIl9wvHQfVX4OkcX}"   # lv_0_20260629203934.mp4 (DSCR, ~84 MB)
OUT="${2:-public/source/source_full.mp4}"
mkdir -p "$(dirname "$OUT")"
COOKIE="$(mktemp)"
ok() { head -c12 "$1" 2>/dev/null | grep -q "ftyp"; }

echo "-> attempt 1: direct (confirm=t)"
curl -fsSL -m 900 -c "$COOKIE" \
  "https://drive.usercontent.google.com/download?id=${FILEID}&export=download&confirm=t" -o "$OUT" || true

if ! ok "$OUT"; then
  echo "-> attempt 2: parse confirm token from warning page"
  page="$(curl -fsSL -m 120 -c "$COOKIE" "https://drive.google.com/uc?export=download&id=${FILEID}" || true)"
  confirm="$(printf '%s' "$page" | grep -o 'confirm=[0-9A-Za-z_-]\+' | head -1 | cut -d= -f2 || true)"
  uuid="$(printf '%s' "$page" | grep -o 'uuid=[0-9A-Za-z_-]\+' | head -1 | cut -d= -f2 || true)"
  [ -n "${confirm:-}" ] && curl -fsSL -m 900 -b "$COOKIE" \
    "https://drive.usercontent.google.com/download?id=${FILEID}&export=download&confirm=${confirm}${uuid:+&uuid=$uuid}" -o "$OUT" || true
fi
rm -f "$COOKIE"

if ok "$OUT"; then
  echo "OK: $(wc -c < "$OUT") bytes -> $OUT (original quality, untouched)"
else
  echo "FAILED. First bytes:"; head -c160 "$OUT" 2>/dev/null; echo
  echo "Check: file shared 'Anyone with link' + Drive hosts allowlisted in a FRESH session."
  exit 1
fi
