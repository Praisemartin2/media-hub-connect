#!/usr/bin/env python3
"""Merge all platform stats into the unified record stats/all_posts.csv
and print a summary (totals + per-campaign) used by the dashboard/report."""
import csv, json, os
from collections import defaultdict

SOURCES = ["stats/instagram/posts.csv", "stats/youtube/videos.csv",
           "stats/manual/normalized.csv"]
FIELDS = ["platform","date","type","title","permalink","views","reach",
          "likes","comments","saves","shares","engagement","engagement_rate_pct","media_id"]

def num(v):
    try: return int(float(str(v).replace(",", "")))
    except (ValueError, TypeError): return 0

def main():
    rows = []
    for src in SOURCES:
        if os.path.exists(src):
            with open(src, newline="") as f:
                for r in csv.DictReader(f):
                    rows.append({k: r.get(k, "") for k in FIELDS})
            print(f"+ {src}")
    rows.sort(key=lambda r: (r["date"], r["platform"]))
    with open("stats/all_posts.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader(); w.writerows(rows)

    total = defaultdict(int); monthly = defaultdict(lambda: defaultdict(int))
    for r in rows:
        for k in ("views","reach","likes","comments","saves","shares","engagement"):
            total[k] += num(r[k]); monthly[r["date"][:7]][k] += num(r[k])
        total["posts"] += 1; monthly[r["date"][:7]]["posts"] += 1
    summary = {"totals": dict(total),
               "monthly": {m: dict(v) for m, v in sorted(monthly.items())}}
    with open("stats/summary.json", "w") as f:
        json.dump(summary, f, indent=1)
    print(f"{len(rows)} rows -> stats/all_posts.csv")
    print(json.dumps(summary["totals"], indent=1))

if __name__ == "__main__":
    main()
