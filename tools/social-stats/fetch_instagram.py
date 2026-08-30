#!/usr/bin/env python3
"""Fetch Ekabo Home Instagram stats via the Meta Graph API.

Requires env var IG_ACCESS_TOKEN (a long-lived user token with
instagram_basic, instagram_manage_insights, pages_show_list,
pages_read_engagement). See tools/social-stats/README.md for the
click-by-click setup guide.

Writes:
  stats/instagram/snapshot_<today>.json   (raw API responses)
  stats/instagram/posts.csv               (normalized per-post rows)
  stats/instagram/account.csv             (account snapshot per run)
"""
import csv, json, os, sys, time, urllib.parse, urllib.request
from datetime import date, datetime, timezone

SINCE = "2025-09-01"
GRAPH = "https://graph.facebook.com/v21.0"
TOKEN = os.environ.get("IG_ACCESS_TOKEN", "").strip()

def die(msg):
    print(f"\n[setup needed] {msg}\nSee tools/social-stats/README.md for the token guide.")
    sys.exit(1)

def get(path, **params):
    params["access_token"] = TOKEN
    url = f"{GRAPH}/{path}?{urllib.parse.urlencode(params)}"
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            try:
                err = json.loads(body)["error"]
            except Exception:
                err = {"message": body}
            if e.code in (4, 17, 429) or "rate" in err.get("message", "").lower():
                time.sleep(30 * (attempt + 1)); continue
            if e.code in (400, 401) and "token" in err.get("message", "").lower():
                die(f"Access token rejected: {err.get('message')}")
            raise RuntimeError(f"{path}: {err.get('message')}")
    raise RuntimeError(f"{path}: rate-limited after retries")

def paged(path, **params):
    data = get(path, **params)
    while True:
        yield from data.get("data", [])
        nxt = data.get("paging", {}).get("next")
        if not nxt:
            return
        with urllib.request.urlopen(nxt, timeout=60) as r:
            data = json.load(r)

def media_insights(mid, product):
    """Lifetime insights; metric set depends on media product type."""
    if product == "REELS":
        metrics = "views,reach,likes,comments,saved,shares,total_interactions"
    elif product in ("FEED", "STORY"):
        metrics = "views,reach,saved,shares,total_interactions"
    else:
        metrics = "views,reach,saved,total_interactions"
    try:
        data = get(f"{mid}/insights", metric=metrics)
        return {d["name"]: (d.get("values") or [{}])[0].get("value") for d in data.get("data", [])}
    except RuntimeError as e:
        print(f"  insights unavailable for {mid}: {e}")
        return {}

def main():
    if not TOKEN:
        die("IG_ACCESS_TOKEN is not set.")
    today = date.today().isoformat()
    os.makedirs("stats/instagram", exist_ok=True)
    raw = {"fetched_at": datetime.now(timezone.utc).isoformat(), "since": SINCE}

    # Resolve the IG business account from the user's pages
    pages = list(paged("me/accounts", fields="id,name,instagram_business_account"))
    ig_id = None
    for p in pages:
        if p.get("instagram_business_account"):
            ig_id = p["instagram_business_account"]["id"]
            print(f"IG business account via page '{p['name']}': {ig_id}")
            break
    if not ig_id:
        die("No Instagram business account found on your pages. Make sure "
            "@ekabohome is a professional account linked to a Facebook Page.")

    acct = get(ig_id, fields="username,name,followers_count,follows_count,media_count,profile_picture_url")
    raw["account"] = acct
    print(f"@{acct.get('username')}: {acct.get('followers_count')} followers, {acct.get('media_count')} posts")

    since_ts = int(datetime.fromisoformat(SINCE).replace(tzinfo=timezone.utc).timestamp())
    posts, raw["media"] = [], []
    fields = "id,caption,media_type,media_product_type,timestamp,permalink,like_count,comments_count"
    for m in paged(f"{ig_id}/media", fields=fields, since=since_ts, limit=50):
        raw["media"].append(m)
        ins = media_insights(m["id"], m.get("media_product_type", ""))
        m["insights"] = ins
        views = ins.get("views")
        reach = ins.get("reach")
        likes = m.get("like_count") or ins.get("likes") or 0
        comments = m.get("comments_count") or ins.get("comments") or 0
        saves, shares = ins.get("saved") or 0, ins.get("shares") or 0
        eng = (likes + comments + saves + shares)
        posts.append({
            "platform": "instagram",
            "date": (m.get("timestamp") or "")[:10],
            "type": m.get("media_product_type") or m.get("media_type"),
            "title": (m.get("caption") or "").split("\n")[0][:120],
            "permalink": m.get("permalink"),
            "views": views, "reach": reach, "likes": likes,
            "comments": comments, "saves": saves, "shares": shares,
            "engagement": eng,
            "engagement_rate_pct": round(100 * eng / reach, 2) if reach else "",
            "media_id": m["id"],
        })
        print(f"  {posts[-1]['date']}  {posts[-1]['type']:<9} reach={reach} views={views}  {posts[-1]['title'][:50]}")

    posts.sort(key=lambda r: r["date"])
    with open("stats/instagram/posts.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(posts[0].keys()) if posts else
                           ["platform","date","type","title","permalink","views","reach",
                            "likes","comments","saves","shares","engagement",
                            "engagement_rate_pct","media_id"])
        w.writeheader(); w.writerows(posts)
    with open("stats/instagram/account.csv", "a", newline="") as f:
        w = csv.writer(f)
        if f.tell() == 0:
            w.writerow(["snapshot_date","username","followers","following","media_count"])
        w.writerow([today, acct.get("username"), acct.get("followers_count"),
                    acct.get("follows_count"), acct.get("media_count")])
    with open(f"stats/instagram/snapshot_{today}.json", "w") as f:
        json.dump(raw, f, indent=1)
    print(f"\nWrote {len(posts)} posts since {SINCE} -> stats/instagram/")

if __name__ == "__main__":
    main()
