#!/usr/bin/env python3
"""Convert stats/tiktok/items.json (from tiktok_web.js) into the unified schema."""
import csv, json, os
from datetime import datetime, timezone

SINCE = "2025-09-01"
src = "stats/tiktok/items.json"
if not os.path.exists(src):
    print("no items.json; skipping"); raise SystemExit(0)
items = json.load(open(src))
rows = []
for it in items:
    d = datetime.fromtimestamp(it["createTime"], tz=timezone.utc).date().isoformat()
    if d < SINCE:
        continue
    s = it.get("stats") or {}
    views = s.get("playCount", 0); likes = s.get("diggCount", 0)
    comments = s.get("commentCount", 0); shares = s.get("shareCount", 0)
    saves = s.get("collectCount", 0)
    eng = likes + comments + shares + (saves if isinstance(saves, int) else 0)
    rows.append({
        "platform": "tiktok", "date": d, "type": "video",
        "title": (it.get("desc") or "").split("\n")[0][:120],
        "permalink": f"https://www.tiktok.com/@ekabohome/video/{it['id']}",
        "views": views, "reach": "", "likes": likes, "comments": comments,
        "saves": saves, "shares": shares, "engagement": eng,
        "engagement_rate_pct": round(100 * eng / views, 2) if views else "",
        "media_id": it["id"],
    })
rows.sort(key=lambda r: r["date"])
os.makedirs("stats/tiktok", exist_ok=True)
with open("stats/tiktok/videos.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else ["platform", "date"])
    w.writeheader(); w.writerows(rows)
print(f"{len(rows)} tiktok videos since {SINCE} -> stats/tiktok/videos.csv")
