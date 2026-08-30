#!/usr/bin/env python3
"""Normalize hand-entered or exported stats into the unified schema.

Drop files into stats/manual/ named  <platform>_*.csv  (e.g. tiktok_2026-08.csv,
linkedin_2026-08.csv). Columns can be any subset of:

  date,title,permalink,views,reach,likes,comments,saves,shares,type

Anything missing is left blank. LinkedIn's page-analytics XLS should be
saved/exported as CSV first (File > Save As in Excel or Sheets).
Rows are merged into stats/manual/normalized.csv, deduped by
(platform, date, title).
"""
import csv, glob, os

OUT = "stats/manual/normalized.csv"
FIELDS = ["platform","date","type","title","permalink","views","reach",
          "likes","comments","saves","shares","engagement","engagement_rate_pct","media_id"]

def norm_row(platform, r):
    g = lambda *ks: next((str(r[k]).strip() for k in ks if k in r and str(r[k]).strip()), "")
    num = lambda v: int(float(v.replace(",", ""))) if v else 0
    views = g("views","impressions","video views","plays")
    reach = g("reach","unique views","members reached")
    likes, comments = g("likes","reactions"), g("comments")
    saves, shares = g("saves","saved"), g("shares","reposts")
    eng = num(likes) + num(comments) + num(saves) + num(shares)
    base = num(reach) or num(views)
    return {
        "platform": platform, "date": g("date","post date","created")[:10],
        "type": g("type","format") or "post",
        "title": g("title","caption","post title","update title")[:120],
        "permalink": g("permalink","url","link"),
        "views": views, "reach": reach, "likes": likes, "comments": comments,
        "saves": saves, "shares": shares, "engagement": eng or "",
        "engagement_rate_pct": round(100*eng/base, 2) if base and eng else "",
        "media_id": "",
    }

def main():
    os.makedirs("stats/manual", exist_ok=True)
    rows = {}
    if os.path.exists(OUT):
        for r in csv.DictReader(open(OUT)):
            rows[(r["platform"], r["date"], r["title"])] = r
    for path in sorted(glob.glob("stats/manual/*_*.csv")):
        if os.path.basename(path) == os.path.basename(OUT):
            continue
        platform = os.path.basename(path).split("_")[0].lower()
        with open(path, newline="", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                r = {k.lower().strip(): v for k, v in r.items() if k}
                n = norm_row(platform, r)
                if n["date"] or n["title"]:
                    rows[(n["platform"], n["date"], n["title"])] = n
        print(f"ingested {path}")
    with open(OUT, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(sorted(rows.values(), key=lambda r: (r["platform"], r["date"])))
    print(f"{len(rows)} rows -> {OUT}")

if __name__ == "__main__":
    main()
