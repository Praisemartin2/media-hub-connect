# Ekabo Home Social Stats Kit

Pulls every post's stats since **September 1, 2025** into this repo as a permanent
record: raw JSON snapshots, a clean `stats/all_posts.csv`, and data for the
portfolio dashboard + PDF report.

## How to run it

Once the secrets below are added, go to the repo's **Actions** tab → **Social
stats snapshot** → **Run workflow**. It fetches everything and commits a dated
snapshot to `stats/`. It also runs by itself on the 1st of every month, so the
record keeps growing. Everything it needs is a one-time setup:

## 1. Instagram (@ekabohome) — one-time token setup (~10 minutes)

1. Make sure @ekabohome is a **Professional (Business/Creator) account** and is
   **linked to a Facebook Page** (Instagram app → Settings → Business tools →
   linked Page). It almost certainly already is.
2. Go to **developers.facebook.com** → log in with the Facebook account that
   admins that Page → **My Apps → Create App** → type **"Business"** → name it
   anything (e.g. "Ekabo Stats") → create.
3. Open **Graph API Explorer** (developers.facebook.com/tools/explorer):
   - **Meta App**: pick the app you just made.
   - **User or Page**: "User Token".
   - **Permissions**: add `instagram_basic`, `instagram_manage_insights`,
     `pages_show_list`, `pages_read_engagement`.
   - Click **Generate Access Token** and approve the popup (select the Ekabo
     Page + Instagram account when asked).
4. That token expires in ~1 hour — exchange it for a **long-lived (~60 days)**
   one: in the Explorer, click the blue ⓘ next to the token → **Open in Access
   Token Tool** → **Extend Access Token**. Copy the extended token.
5. In GitHub: repo → **Settings → Secrets and variables → Actions →
   New repository secret** → name `IG_ACCESS_TOKEN`, paste the token.

When the token expires (~60 days), repeat steps 3–5. Each snapshot you take is
already saved forever, so an expired token never loses past data.

## 2. YouTube (podcast channel) — free API key (~5 minutes)

1. **console.cloud.google.com** → create a project → **APIs & Services →
   Library** → enable **YouTube Data API v3** → **Credentials → Create
   credentials → API key**. Copy it.
2. Get the channel ID: open the channel page on youtube.com → **…more →
   Share channel → Copy channel ID** (starts with `UC`).
3. Add both as repository secrets: `YT_API_KEY` and `YT_CHANNEL_ID`.

This gets views/likes/comments per video. Watch-time and impressions are
owner-only: in **YouTube Studio → Analytics → Advanced mode → Export**, save
the CSV as `stats/manual/youtube_studio_<month>.csv` and commit it.

## 3. LinkedIn and TikTok — manual export (no API approval needed)

- **LinkedIn**: Page admin view → **Analytics → Content → Export** (pick the
  date range since Sep 1, 2025) → open the XLS, save as CSV named
  `stats/manual/linkedin_<month>.csv`, commit it.
- **TikTok**: **TikTok Studio → Analytics → Content** → export or copy the
  per-post numbers into `stats/manual/tiktok_<month>.csv` with columns:
  `date,title,permalink,views,likes,comments,saves,shares`.

Any CSV dropped in `stats/manual/` named `<platform>_*.csv` is picked up
automatically on the next run — column names are matched loosely
(views/impressions/plays, likes/reactions, shares/reposts all work).

## What gets stored

```
stats/
  catalog.csv                    <- everything produced (the portfolio record)
  all_posts.csv                  <- unified per-post metrics, all platforms
  summary.json                   <- totals + monthly rollups
  instagram/ posts.csv, account.csv, snapshot_<date>.json
  youtube/   videos.csv, snapshot_<date>.json
  manual/    your exports + normalized.csv
```

Run locally instead of via Actions:
`IG_ACCESS_TOKEN=... python3 tools/social-stats/fetch_instagram.py` etc.,
then `python3 tools/social-stats/build_outputs.py`.
