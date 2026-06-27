#!/usr/bin/env python3
"""Build karaoke captions from a real .srt (accurate timing).

Collects every word with timing distributed inside its cue window, fixes known
mis-transcriptions (Acaba -> Ekabo), strips watermark text, then re-chunks into
N-word caption lines preserving per-word timing.

    python3 scripts/build_srt_captions.py public/source/img2071.srt \
        --out src/img2071-captions.json [--words-per-line 4]
"""
import argparse, json, re

FIXES = {"acaba": "Ekabo", "ekabo": "Ekabo"}
WATERMARK = re.compile(r"\(Transcribed by TurboScribe.*?\)", re.I)

def ts(s):
    h, m, rest = s.split(":")
    sec, ms = rest.split(",")
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("srt")
    ap.add_argument("--out", default="src/img2071-captions.json")
    ap.add_argument("--words-per-line", type=int, default=4)
    a = ap.parse_args()

    blocks = re.split(r"\n\s*\n", open(a.srt, encoding="utf-8").read().strip())
    timed = []
    for b in blocks:
        lines = [l for l in b.splitlines() if l.strip()]
        tl = next((l for l in lines if "-->" in l), None)
        if not tl:
            continue
        idx = lines.index(tl)
        start, end = [ts(x.strip()) for x in tl.split("-->")]
        text = " ".join(lines[idx + 1:])
        text = WATERMARK.sub("", text).strip()
        words = text.split()
        if not words:
            continue
        per = (end - start) / len(words)
        for i, w in enumerate(words):
            key = re.sub(r"[^\w]", "", w).lower()
            if key in FIXES:
                w = FIXES[key] + w[len(re.sub(r"[^\w]", "", w)):]  # keep trailing punct
            s = start + i * per
            timed.append({"w": w, "start": round(s, 3), "end": round(s + per, 3)})

    caps = []
    n = a.words_per_line
    for i in range(0, len(timed), n):
        grp = timed[i:i + n]
        caps.append({
            "start": grp[0]["start"],
            "end": round(grp[-1]["end"], 3),
            "text": " ".join(g["w"] for g in grp),
            "words": grp,
        })
    json.dump(caps, open(a.out, "w", encoding="utf-8"), indent=1)
    print(f"wrote {len(caps)} lines / {len(timed)} words, "
          f"{timed[0]['start']:.1f}-{timed[-1]['end']:.1f}s -> {a.out}")

if __name__ == "__main__":
    main()
