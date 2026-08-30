#!/usr/bin/env python3
"""Fetch Ekabo Home Facebook Page post stats via the Meta Graph API.

Uses the same IG_ACCESS_TOKEN as fetch_instagram.py (needs pages_show_list +
pages_read_engagement, which that token already carries).

Writes stats/facebook/posts.csv and a dated raw snapshot.
"""
import csv, json, os, sys, urllib.parse, urllib.request
from datetime import date, datetime, timezone

SINCE = "2025-09-01"
GRAPH = "https://graph.facebook.com/v21.0"
TOKEN = os.environ.get("IG_ACCESS_TOKEN", "").strip()

def get(path, token, **params):
    params["access_token"] = token
    url = f"{GRAPH}/{path}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)

def paged(path, token, **params):
    data = get(path, token, **params)
    while True:
        yield from data.get("data", [])
        nxt = data.get("paging", {}).get("next")
        if not nxt:
            return
        with urllib.request.urlopen(nxt, timeout=60) as r:
            data = json.load(r)

def main():
    if not TOKEN:
        print("[setup needed] IG_ACCESS_TOKEN is not set. See tools/social-stats/README.md.")
        sys.exit(1)
    os.makedirs("stats/facebook", exist_ok=True)
    pages = get("me/accounts", TOKEN, fields="id,name,access_token").get("data", [])
    if not pages:
        print("[setup needed] No Facebook Pages on this token."); sys.exit(1)
    page = pages[0]
    ptoken = page.get("access_token") or TOKEN
    print(f"Page: {page['name']} ({page['id']})")

    since_ts = int(datetime.fromisoformat(SINCE).replace(tzinfo=timezone.utc).timestamp())
    rows, raw = [], []
    fields = ("id,message,created_time,permalink_url,shares,"
              "reactions.summary(true).limit(0),comments.summary(true).limit(0)")
    for p in paged(f"{page['id']}/posts", ptoken, fields=fields, since=since_ts, limit=50):
        raw.append(p)
        try:
            ins = get(f"{p['id']}/insights", ptoken,
                      metric="post_impressions,post_impressions_unique")
            im = {d["name"]: (d.get("values") or [{}])[0].get("value") for d in ins.get("data", [])}
        except Exception as e:
            im = {}; print(f"  insights unavailable for {p['id']}: {e}")
        likes = ((p.get("reactions") or {}).get("summary") or {}).get("total_count", 0)
        comments = ((p.get("comments") or {}).get("summary") or {}).get("total_count", 0)
        shares = (p.get("shares") or {}).get("count", 0)
        reach = im.get("post_impressions_unique")
        eng = likes + comments + shares
        rows.append({
            "platform": "facebook", "date": (p.get("created_time") or "")[:10],
            "type": "post", "title": (p.get("message") or "").split("\n")[0][:120],
            "permalink": p.get("permalink_url"),
            "views": im.get("post_impressions"), "reach": reach,
            "likes": likes, "comments": comments, "saves": "", "shares": shares,
            "engagement": eng,
            "engagement_rate_pct": round(100 * eng / reach, 2) if reach else "",
            "media_id": p["id"],
        })
        print(f"  {rows[-1]['date']}  reach={reach}  {rows[-1]['title'][:50]}")
    rows.sort(key=lambda r: r["date"])
    with open("stats/facebook/posts.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else ["platform", "date"])
        w.writeheader(); w.writerows(rows)
    with open(f"stats/facebook/snapshot_{date.today().isoformat()}.json", "w") as f:
        json.dump(raw, f, indent=1)
    print(f"Wrote {len(rows)} page posts since {SINCE} -> stats/facebook/")

if __name__ == "__main__":
    main()
