#!/usr/bin/env python3
"""Build karaoke captions for the subject-to reel from the transcript.

No speech-to-text is available in this environment, so word timing is
distributed proportionally across the spoken portion of the clip. Run AFTER you
know the A-roll duration (ffprobe the silence-cut source):

    python3 scripts/build_subjectto_captions.py <duration_seconds> \
        [--in public/source/transcript.txt] [--out src/subjectto-captions.json] \
        [--lead 0.4] [--tail-frac 0.93] [--words-per-line 4]

--tail-frac stops captions before the CTA card (default 0.93 of duration).
Tweak per-word timing later by editing the JSON if a line drifts.
"""
import argparse, json, re, sys

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("duration", type=float, help="A-roll duration in seconds")
    ap.add_argument("--in", dest="inp", default="public/source/transcript.txt")
    ap.add_argument("--out", dest="out", default="src/subjectto-captions.json")
    ap.add_argument("--lead", type=float, default=0.4, help="seconds before first word")
    ap.add_argument("--tail-frac", type=float, default=0.93, help="caption end as frac of duration")
    ap.add_argument("--words-per-line", type=int, default=4)
    a = ap.parse_args()

    text = open(a.inp, encoding="utf-8").read()
    words = re.findall(r"[\w'$%.-]+", text)
    if not words:
        print("no words in transcript", file=sys.stderr); sys.exit(1)

    t0 = a.lead
    t1 = a.duration * a.tail_frac
    per = (t1 - t0) / len(words)

    # word -> (start,end)
    timed = []
    for i, w in enumerate(words):
        s = t0 + i * per
        timed.append({"w": w, "start": round(s, 3), "end": round(s + per, 3)})

    # group into caption lines
    caps = []
    for i in range(0, len(timed), a.words_per_line):
        grp = timed[i:i + a.words_per_line]
        caps.append({
            "start": grp[0]["start"],
            "end": round(grp[-1]["end"], 3),
            "text": " ".join(g["w"] for g in grp),
            "words": grp,
        })

    json.dump(caps, open(a.out, "w", encoding="utf-8"), indent=1)
    print(f"wrote {len(caps)} caption lines ({len(words)} words) over "
          f"{t0:.1f}-{t1:.1f}s -> {a.out}")

if __name__ == "__main__":
    main()
