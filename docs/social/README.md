# COFY social media playbook

Standing rules for COFY's social accounts. This is the reference a future
session reads before writing or scheduling anything.

## The accounts

| Network | Account | Status |
|---|---|---|
| Instagram | @cofyinc | connected in Metricool |
| Facebook | cofyinc | connected in Metricool |
| LinkedIn | COFYinc: Creating Opportunities For Youth (company page) | connected in Metricool |
| Google Business Profile | COFY Inc. | connected in Metricool |
| YouTube | COFY | connected in Metricool — needs video, not used for the webinar campaign |
| X | @cofyinc | **not connected.** Could not be linked; dropped by decision, not an oversight |

Scheduling runs through **Metricool**, under the COFY account
(cofyincorporated@gmail.com).

> **Claude cannot reach that account yet.** Claude's Metricool connector is
> still authorised against marketwithpmo@gmail.com, whose only brand is
> *PMO MEDIA LLC* — a different organisation. Until the connector is
> re-authorised to the COFY account, `getBrandSettings` returns only
> PMO MEDIA LLC, and **COFY content must never be posted there.** Posts stay
> paste-by-hand from this folder until then.

### Which Metricool account COFY should live in

This matters more than it looks. Claude reaches Metricool through a connector
that is authorised against **one** Metricool account — currently
marketwithpmo@gmail.com. A brand created in a *different* Metricool account is
invisible to it.

So there are two workable shapes:

- **COFY's own account** (cofyincorporated@gmail.com), with Claude's Metricool
  connector re-authorised to it. Correct ownership for a nonprofit, and the
  free tier's single brand slot is exactly what COFY needs. The trade-off:
  re-authorising points Claude at the COFY account, so it can no longer reach
  the PMO MEDIA LLC brand. **This is the recommended shape.**
- **A second brand inside the existing account.** Nothing to re-authorise and
  Claude sees it immediately, but the existing account's one free brand slot
  is already used by PMO MEDIA LLC, so a second brand needs a paid plan — and
  COFY's presence then sits under a personal account.

Sharing one brand across both accounts is *not* a free option: Metricool
restricts user sharing to its Advanced and Custom plans.

Re-authorising is done in Claude's connector settings and is an ordinary
sign-in flow. **No Metricool password should ever be pasted into a chat** —
Claude neither needs nor can use one.

### Budget check before committing to the cadence

Reported limits worth confirming on Metricool's own pricing page, because
third-party sources disagree:

- The **free tier is reported at ~20 scheduled posts per month**. A daily
  story across four networks is roughly 120 publications a month, so the free
  tier almost certainly will not carry this cadence.
- **X scheduling is a paid add-on**, reported between $5 and $10 per month per
  connected account.

If the cost is not wanted, the fallback is unchanged and costs nothing: Claude
writes every post into `docs/social/`, and they get pasted by hand.

### What has to be connected, once

Claude cannot do this part: connecting an account means signing in to each
network and granting access, which only the account owner can do.

1. In Metricool, **Brands → add a new brand**, named `COFY Inc.`
2. Connect to that brand, in this order:
   - **Instagram** @cofyinc — must be a Professional (Business or Creator)
     account, linked to the COFY Facebook Page. Instagram only permits
     scheduled auto-publishing for Professional accounts.
   - **Facebook** — the COFY *Page*, not a personal profile.
   - **LinkedIn** — the *COFYinc: Creating Opportunities For Youth*
     company page, with the signing-in person as a Page admin.
   - **X** @cofyinc. X's API access is paid; if the free tier blocks
     scheduling, Metricool will say so when connecting, and that network
     falls back to manual posting from the copy in this folder.
3. Set the brand timezone to **America/New_York**.

Once that is done, Claude can schedule to all four from here, and the posts
in this folder stop being copy-paste and start being scheduled automatically.

Until then every post in this folder is still **ready to paste by hand**, and
nothing is lost.

## Cadence

- **Event promotion** — every 3 days until the event, then one day-of post.
  See `webinar-2026-11-27-campaign.md` for the current campaign.
- **Daily story** — one positive, mission-relevant news story per day.
  Claude proposes **three options each morning**; nothing is posted until one
  is approved. See "Daily story" below.
- **Website updates** — see "Standing rule" below.

## Standing rule: the website and social move together

Whenever the website changes in a way the public would care about — a new or
changed event, a new programme or resource, a new story, a new video, a
significant new page — Claude writes matching posts for all four networks in
the same piece of work, and says so. Each post links to the page that
changed.

This does **not** apply to invisible changes: refactors, dependency bumps,
layout fixes, accessibility corrections, copy tidying. Those ship silently.

## Daily story

**The routine:** a scheduled task, *COFY daily story options*, fires every
morning at **5:38 AM America/New_York** and opens a fresh session with three
options in it, with a push notification. (5:38 rather than 6:00 on purpose —
scheduled jobs pile up on the hour and get delayed; this lands it just before
you want it.) Reply in that session with the number you want and only that
one gets posted. You can also skip the day or ask for different options.

That morning session also checks `docs/social/` for a campaign slot dated
that day and flags it, so event promotion and the daily story arrive in one
message.

**Known limitation:** the routine's sessions do not carry the Metricool
connector, so they can research, choose and write but cannot schedule. Until
that changes, approve in the morning session to get the finished copy, and
either paste it yourself or ask in a normal chat session to schedule it. Once
the COFY accounts are connected, re-create the routine from the Routines page
on claude.ai so it carries the connector and can schedule end to end.

Every morning Claude researches positive news from around the world about
creating opportunities for youth — education access, disability inclusion,
neurodiversity, youth employment and training, literacy — and brings back
**three** options.

Each option carries: the headline, one line on why it fits COFY, the source
link, and a draft caption. Claude posts **only** the one chosen, across all
four connected networks, and never posts an unapproved story.

Sources must be real and linked. No invented statistics, no invented quotes,
no implying COFY was involved in something it was not.

## Voice

- Plain, warm, direct. Short sentences. No hype, no jargon, no emoji storms.
- Lead with the person, not the organisation.
- Specific beats general: "the teacher adapting a lesson for a class of
  thirty" lands, "stakeholders" does not.
- Never invent a statistic, a quote, a testimonial or an outcome.
- Every COFY event and service is **free of charge** — say so, it matters.
- The tagline, used sparingly and usually only on Instagram and Facebook:
  *Helping Together. (2 Corinthians 1:11)*

## Per-network shape

| Network | Image | Length | Links |
|---|---|---|---|
| Instagram | square flyer or 4:5 graphic — required | caption can run long | not clickable; use "link in bio" **and** write the URL out |
| Facebook | square or landscape | medium | clickable in the text |
| LinkedIn | **landscape 1200×627** — square gets cropped | longest, most professional | clickable |
| Google Business Profile | optional | ≤ 1500 characters; plain, factual, local-search shaped | clickable |
| YouTube | **video required**, plus a title and a kids/not-kids audience setting | description | clickable |
| X | landscape 1200×627 | ≤ 280 characters, single post, never a thread | counts as 23 characters |

X is not connected, so its copy is written but goes unused. Leave it in the
campaign files: it costs nothing and is ready if the account is ever linked.

Google Business Profile posts use the `publication` type (a text update on the
profile). The `photo` type carries media but no text of its own, so it is not
a substitute. GMB readers are usually local people searching for services
rather than followers, so keep those posts plainer than the social ones: what
it is, when, that it is free, and the link.

## Assets

- Event flyers and graphics: `public/media/` and `public/media/promo/`
- Re-render the branded graphics:
  `node scripts/promo/render-event.mjs automation/promo/<event>.json public/media/promo`
- Everything in `public/` is live at `https://www.cofyouth.org/<path>`, so any
  asset can be pulled straight from there when scheduling.
