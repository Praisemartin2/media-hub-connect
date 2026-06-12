#!/usr/bin/env python3
"""Build word-level karaoke caption timing for the Ekabo reel.

The Higgsfield VO is generated from a known script, so instead of forced
alignment we distribute each line's words across its [start,end] window,
weighting by word length (longer words take proportionally more time). Good
enough for karaoke highlighting; refine against the real VO if needed.

Usage: python scripts/build_ekabo_captions.py
Writes: src/ekabo-captions.json
"""
import json, os

# Keep in sync with SCRIPT in src/ekabo-data.ts
LINES = [
    (0.4, 2.2, "Here's the truth nobody tells you."),
    (2.3, 4.6, "Saving money is just going broke slowly."),
    (4.8, 7.5, "Every year, inflation quietly eats your cash."),
    (8.6, 10.7, "Real estate pays you three ways at once."),
    (10.9, 12.8, "Your tenants cover the mortgage."),
    (13.0, 15.0, "The property climbs in value."),
    (15.2, 17.8, "And your equity grows while you sleep."),
    (18.0, 20.8, "Cash sits still. Real estate goes to work."),
    (21.0, 23.2, "So stop saving for a rainy day."),
    (24.5, 25.5, "Start owning the umbrella."),
    (25.9, 28.6, "Follow Ekabo Home for more."),
]


def build():
    out = []
    for start, end, text in LINES:
        words = text.split()
        # weight by character length (min 1) so longer words last longer
        weights = [max(len(w.strip(".,!?;:")), 1) for w in words]
        total = sum(weights)
        span = end - start
        t = start
        wj = []
        for w, wt in zip(words, weights):
            d = span * (wt / total)
            wj.append({"w": w, "start": round(t, 3), "end": round(t + d, 3)})
            t += d
        out.append({"start": start, "end": end, "text": text, "words": wj})
    return out


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    dst = os.path.join(here, "..", "src", "ekabo-captions.json")
    json.dump(build(), open(dst, "w"), indent=1)
    print("wrote", os.path.relpath(dst))
