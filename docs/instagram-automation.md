# COFY Daily Instagram Automation — Handoff Brief

> **New Claude Code chat?** Read this file first — it links you into everything.
> Say: *"Read docs/instagram-automation.md and continue from there."*

## What this is

A fully automated daily Instagram pipeline for **@cofyinc**
(https://www.instagram.com/cofyinc): every day it researches one real news
story from around the world about **creating opportunities for youth**, designs
a branded 1080×1350 post image, writes a caption, and publishes it to
Instagram via the official Graph API.

## Organization context

- **COFY Inc.** (Creating Opportunities for Youth, cofyouth.org) — NJ nonprofit
  providing educational and life-skills support to youth with developmental
  delays and their families. Tagline: *"Helping Together." (2 Corinthians 1:11)*.
- Address: 7 Woodbridge Ave, Sewaren, NJ 07077 · cofyincorporated@gmail.com · (732) 844-9392
- President/Founder: Dr. Ngozi Martin-Oguike. Marketing & IT: Mr. Praise Martin-Oguike.
- Website (this repo, auto-deployed from `main` via GitHub Pages):
  **https://www.cofyouth.org/**
- Brand: cobalt `#0064F0`, yellow `#FFBD12`, white; Oswald (display) + Inter;
  square corners; sunburst motif. Logo: `src/assets/cofy-logo.png`.

## How the pipeline works

`.github/workflows/daily-instagram-post.yml` runs daily at **13:23 UTC**
(~9:23am US Eastern) and on demand (Actions → *Daily Instagram Post* → Run
workflow; check *dry_run* to skip publishing):

1. **Research + write** — Claude Code runs headless with
   `automation/ig-post-prompt.md`: checks `automation/archive/` to avoid
   repeats and rotate regions, finds a credible story from the last 7 days,
   writes `automation/out/post.json` (headline, summary, source, caption).
2. **Render** — `scripts/ig/render-image.mjs` builds the branded 1080×1350
   PNG (cobalt/yellow, logo, "OPPORTUNITY WATCH — {REGION}").
3. **Commit** — image → `public/ig/YYYY-MM-DD.png`, post record →
   `automation/archive/YYYY-MM-DD.json`, pushed to `main` (this also gives the
   image a public URL and keeps a permanent archive the next run reads).
4. **Publish** — `scripts/ig/publish.mjs` calls the Instagram Graph API:
   create media container from the raw.githubusercontent.com image URL → wait
   for processing → publish → log the permalink.

If Instagram credentials are missing, steps 1–3 still run: every day you get a
ready-to-post image + caption committed to the repo (visible in the workflow
run summary), and publishing is skipped with a warning.

## One-time setup (required secrets)

Add under **repo Settings → Secrets and variables → Actions → New repository secret**:

| Secret | What it is | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Powers the daily research/writing | https://console.anthropic.com → API keys |
| `IG_USER_ID` | Instagram Professional account ID | See below |
| `IG_ACCESS_TOKEN` | Long-lived Graph API token | See below |

### Getting the Instagram credentials

1. Make @cofyinc a **Professional account** (Instagram app → Settings →
   Account type → Business) and **link it to a Facebook Page** you admin.
2. Create an app at https://developers.facebook.com (type: Business), add the
   **Instagram Graph API** product.
3. In Graph API Explorer, grant permissions `instagram_basic`,
   `instagram_content_publish`, `pages_show_list`, `business_management`;
   generate a token, then exchange it for a **long-lived token** (valid ~60
   days — set a reminder to refresh it and update the secret).
4. Get the IG user ID: `GET /me/accounts` → your Page ID →
   `GET /{page-id}?fields=instagram_business_account` → that `id` is `IG_USER_ID`.

### Test it

Actions → **Daily Instagram Post** → Run workflow with **dry_run** checked.
Check the run summary for the headline, caption, and image link. Then run once
unchecked to publish for real.

## Tuning

- **Time of day**: edit the `cron:` line (UTC).
- **Voice/rules/themes/hashtags**: edit `automation/ig-post-prompt.md`.
- **Visual design**: edit `scripts/ig/render-image.mjs` (pure SVG template).
- **History**: `automation/archive/*.json` is the memory that prevents repeats.

## Costs & limits

- One Claude API run/day (typically a few cents to ~$0.25 depending on model).
- Instagram Graph API allows up to 50 published posts per 24h — one/day is far under.
- GitHub Actions minutes: ~3–5 min/day, free tier is plenty for a public repo.

## Related context

- The website redesign (Obama.org-caliber, real COFY content, Higgsfield
  media) lives in this same repo; see `CLAUDE.md` for conventions. The site
  deploys from `main` via `.github/workflows/deploy-pages.yml`.
- A sample post (2026-07-11, U.S. Youth Ambassadors Program) is in
  `automation/archive/` as the pipeline's first archive entry.
