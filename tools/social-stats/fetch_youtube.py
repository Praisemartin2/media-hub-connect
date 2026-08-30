#!/usr/bin/env python3
"""Fetch public YouTube stats (views/likes/comments) for the podcast channel.

Requires env vars:
  YT_API_KEY     - free API key from Google Cloud console (YouTube Data API v3)
  YT_CHANNEL_ID  - the channel id (starts with UC...). Find it at
                   youtube.com -> channel page -> ...more -> Share -> Copy channel ID.

Writes stats/youtube/videos.csv and a dated raw snapshot.
Watch-time/impressions need YouTube Studio (owner-only): export CSV from
Studio > Analytics and drop it in stats/manual/ instead.
"""
import csv, json, os, sys, urllib.parse, urllib.request
from datetime import date

SINCE = "2025-09-01T00:00:00Z"
KEY = os.environ.get("YT_API_KEY", "").strip()
CHANNEL = os.environ.get("YT_CHANNEL_ID", "").strip()

def get(endpoint, **params):
    params["key"] = KEY
    url = f"https://www.googleapis.com/youtube/v3/{endpoint}?{urllib.parse.urlencode(params)}"
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)

def main():
    if not KEY or not CHANNEL:
        print("[setup needed] YT_API_KEY and/or YT_CHANNEL_ID not set. "
              "See tools/social-stats/README.md."); sys.exit(1)
    os.makedirs("stats/youtube", exist_ok=True)
    ch = get("channels", part="contentDetails,statistics,snippet", id=CHANNEL)
    if not ch.get("items"):
        print(f"[setup needed] Channel {CHANNEL} not found."); sys.exit(1)
    item = ch["items"][0]
    uploads = item["contentDetails"]["relatedPlaylists"]["uploads"]
    print(f"Channel: {item['snippet']['title']} "
          f"({item['statistics'].get('subscriberCount','?')} subs)")

    vids, page = [], None
    while True:
        pl = get("playlistItems", part="contentDetails,snippet",
                 playlistId=uploads, maxResults=50,
                 **({"pageToken": page} if page else {}))
        for it in pl.get("items", []):
            if it["contentDetails"].get("videoPublishedAt", "") >= SINCE:
                vids.append(it["contentDetails"]["videoId"])
        page = pl.get("nextPageToken")
        if not page:
            break

    rows, raw = [], []
    for i in range(0, len(vids), 50):
        st = get("videos", part="statistics,snippet,contentDetails",
                 id=",".join(vids[i:i+50]))
        for v in st.get("items", []):
            raw.append(v)
            s = v["statistics"]
            rows.append({
                "platform": "youtube",
                "date": v["snippet"]["publishedAt"][:10],
                "type": "video",
                "title": v["snippet"]["title"][:120],
                "permalink": f"https://youtu.be/{v['id']}",
                "views": s.get("viewCount"), "reach": "",
                "likes": s.get("likeCount"), "comments": s.get("commentCount"),
                "saves": "", "shares": "",
                "engagement": (int(s.get("likeCount", 0) or 0) + int(s.get("commentCount", 0) or 0)),
                "engagement_rate_pct": "",
                "media_id": v["id"],
            })
    rows.sort(key=lambda r: r["date"])
    with open("stats/youtube/videos.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys() if rows else ["platform","date"])
        w.writeheader(); w.writerows(rows)
    with open(f"stats/youtube/snapshot_{date.today().isoformat()}.json", "w") as f:
        json.dump({"channel": item, "videos": raw}, f, indent=1)
    print(f"Wrote {len(rows)} videos since {SINCE[:10]} -> stats/youtube/")

if __name__ == "__main__":
    main()
