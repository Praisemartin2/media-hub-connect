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

## 3. TikTok (@ekabohome) — official Display API (~15 minutes, one time)

Direct from TikTok, no app review needed for your own account (Sandbox mode):

1. Go to **developers.tiktok.com** → log in (any TikTok login works) →
   **Manage apps → Connect an app** → name it (e.g. "Ekabo Stats").
2. In the app: **Add products → Login Kit** and **Display API** (wanted scopes:
   `user.info.basic`, `video.list`).
3. Under **Login Kit → Redirect URI** add exactly: `https://ekabohome.com/`
4. Keep the app in **Sandbox** mode and add **@ekabohome** as a *target user*
   (Sandbox → Manage targets). Sandbox apps work immediately for target users —
   no review wait.
5. Copy the app's **Client key** and **Client secret**, then on your computer run:
   `python3 tiktok_auth.py CLIENT_KEY CLIENT_SECRET`
   (download `tools/social-stats/tiktok_auth.py` from the repo). It walks you
   through approving as @ekabohome and prints three values.
6. Add those as repo secrets: `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`,
   `TIKTOK_REFRESH_TOKEN`.

The snapshot then pulls every video's views, likes, comments and shares
directly from TikTok. (Note: TikTok blocks anonymous scraping from cloud
servers — verified — so the official API is the only reliable direct route.)

## 4. LinkedIn — manual export (their API is approval-gated)

Page admin view → **Analytics → Content → Export** (date range since
Sep 1, 2025) → open the XLS, save as CSV named
`stats/manual/linkedin_<month>.csv`, commit it. TikTok Studio CSV exports can
also be dropped in `stats/manual/tiktok_<month>.csv` as a supplement (Studio
has retention/watch-time numbers the public API doesn't expose).

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
