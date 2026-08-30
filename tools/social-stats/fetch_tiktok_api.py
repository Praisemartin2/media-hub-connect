#!/usr/bin/env python3
"""Fetch TikTok video stats directly from TikTok's official Display API.

Requires secrets (see README, TikTok section):
  TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REFRESH_TOKEN

Writes stats/tiktok/videos.csv (+ dated raw snapshot). If TikTok rotates the
refresh token, the run logs a notice to update the repo secret.
"""
import csv, json, os, sys, urllib.parse, urllib.request
from datetime import date, datetime, timezone

SINCE = "2025-09-01"
KEY = os.environ.get("TIKTOK_CLIENT_KEY", "").strip()
SECRET = os.environ.get("TIKTOK_CLIENT_SECRET", "").strip()
REFRESH = os.environ.get("TIKTOK_REFRESH_TOKEN", "").strip()

def post(url, data, headers=None, form=False):
    body = (urllib.parse.urlencode(data).encode() if form
            else json.dumps(data).encode())
    h = {"Content-Type": "application/x-www-form-urlencoded" if form else "application/json"}
    h.update(headers or {})
    req = urllib.request.Request(url, data=body, headers=h)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

def main():
    if not (KEY and SECRET and REFRESH):
        print("[setup needed] TIKTOK_CLIENT_KEY / TIKTOK_CLIENT_SECRET / "
              "TIKTOK_REFRESH_TOKEN not set. See tools/social-stats/README.md.")
        sys.exit(1)
    tok = post("https://open.tiktokapis.com/v2/oauth/token/",
               {"client_key": KEY, "client_secret": SECRET,
                "grant_type": "refresh_token", "refresh_token": REFRESH}, form=True)
    access = tok.get("access_token")
    if not access:
        print(f"[setup needed] Token refresh failed: {tok}"); sys.exit(1)
    if tok.get("refresh_token") and tok["refresh_token"] != REFRESH:
        print("NOTICE: TikTok rotated the refresh token. Update the "
              "TIKTOK_REFRESH_TOKEN repo secret to:", tok["refresh_token"][:6] + "...(see run log)")
        print("FULL_NEW_REFRESH_TOKEN:", tok["refresh_token"])

    os.makedirs("stats/tiktok", exist_ok=True)
    since_ts = int(datetime.fromisoformat(SINCE).replace(tzinfo=timezone.utc).timestamp())
    fields = ("id,create_time,title,duration,view_count,like_count,"
              "comment_count,share_count,embed_link,share_url")
    rows, raw, cursor, more = [], [], 0, True
    while more:
        res = post(f"https://open.tiktokapis.com/v2/video/list/?fields={fields}",
                   {"cursor": cursor, "max_count": 20},
                   headers={"Authorization": f"Bearer {access}"})
        d = res.get("data", {})
        for v in d.get("videos", []):
            raw.append(v)
            if v.get("create_time", 0) < since_ts:
                more = False
                continue
            dt = datetime.fromtimestamp(v["create_time"], tz=timezone.utc).date().isoformat()
            views = v.get("view_count", 0); likes = v.get("like_count", 0)
            comments = v.get("comment_count", 0); shares = v.get("share_count", 0)
            eng = likes + comments + shares
            rows.append({
                "platform": "tiktok", "date": dt, "type": "video",
                "title": (v.get("title") or "").split("\n")[0][:120],
                "permalink": v.get("share_url") or v.get("embed_link"),
                "views": views, "reach": "", "likes": likes, "comments": comments,
                "saves": "", "shares": shares, "engagement": eng,
                "engagement_rate_pct": round(100 * eng / views, 2) if views else "",
                "media_id": v.get("id"),
            })
        cursor = d.get("cursor", 0)
        if not d.get("has_more"):
            more = False
    rows.sort(key=lambda r: r["date"])
    with open("stats/tiktok/videos.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else ["platform", "date"])
        w.writeheader(); w.writerows(rows)
    with open(f"stats/tiktok/snapshot_{date.today().isoformat()}.json", "w") as f:
        json.dump(raw, f, indent=1)
    print(f"Wrote {len(rows)} TikTok videos since {SINCE} -> stats/tiktok/videos.csv")

if __name__ == "__main__":
    main()
