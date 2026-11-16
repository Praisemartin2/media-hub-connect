# November 27 webinar — promotion pack

Everything here is ready to publish **as a save-the-date**. Three details were
not available when this was written — the session topic, the start time (and
time zone) and the registration/Zoom link. They are marked `[TOPIC]`,
`[TIME]` and `[LINK]` below. Fill those three in and the pack is a full
announcement; nothing else needs rewriting.

## The graphics

| Where | File | Size |
|---|---|---|
| Instagram feed, Threads | `public/media/promo/instagram-4x5.png` | 1080 × 1350 |
| Facebook, WhatsApp, square posts | `public/media/promo/square-1x1.png` | 1080 × 1080 |
| LinkedIn, X link card | `public/media/promo/linkedin-16x9.png` | 1200 × 627 |

Once the site is deployed they are also downloadable from any phone at
`https://www.cofyouth.org/media/promo/instagram-4x5.png` (and the same for the
other two file names).

To re-render them after the details land, edit
`automation/promo/webinar-2026-11-27.json` and run:

```
node scripts/promo/render-event.mjs automation/promo/webinar-2026-11-27.json public/media/promo
```

## Instagram — @cofyinc

> Save the date. 📅
>
> Friday, November 27, 2026 — our next Educational Webinar for Teachers,
> Parents & Caregivers. Online, on Zoom, and free of charge, like everything
> COFY does.
>
> This is the quarterly session for the people who do the daily work of
> supporting a young person: the teacher adapting a lesson, the parent
> advocating at an IEP meeting, the caregiver holding the routine together.
> Practical, research-based strategies from educators who have done it.
>
> Ask us to be added to the list and you'll get the topic and the Zoom link
> first — link in bio, or www.cofyouth.org
>
> Helping Together. (2 Corinthians 1:11)
>
> #COFYinc #CreatingOpportunitiesForYouth #SpecialEducation
> #InclusiveEducation #Neurodiversity #ParentSupport #Caregivers #Teachers
> #ProfessionalDevelopment #FreeWebinar #SaveTheDate #NewJersey #Nonprofit

**Story / Reel cover text:** `SAVE THE DATE · NOV 27 · FREE WEBINAR` over the
4:5 graphic, with a link sticker to www.cofyouth.org/events.

## LinkedIn — COFY company page

> **Save the date: Friday, November 27, 2026.**
>
> COFY's next quarterly Educational Webinar for Teachers, Parents and
> Caregivers is online, on Zoom, and free of charge.
>
> Most conversations about supporting youth with developmental delays focus
> on the young person. This series is deliberately about the adults around
> them — the teacher differentiating a lesson for a class of thirty, the
> parent preparing for an IEP meeting, the caregiver who keeps the routine
> steady. They are the people who turn a good plan into a good day, and they
> are rarely the ones being trained.
>
> Each session brings practical, research-based strategies from educators who
> have worked in inclusive classrooms, with time for real questions.
>
> [TOPIC — one or two lines on the session subject]
> 🗓 Friday, November 27, 2026 · [TIME]
> 💻 Online (Zoom)
> 💛 Free of charge
> 🔗 [LINK]
>
> Creating Opportunities for Youth Inc. is a registered nonprofit in New
> Jersey supporting youth with developmental delays and their families. Every
> event and service we run is free to the people who attend.
>
> #SpecialEducation #InclusiveEducation #Neurodiversity #ProfessionalDevelopment
> #Nonprofit #Education #Caregivers #NewJersey

**Personal re-share** (post from your own profile, quoting the page post):

> The part of this work people don't see is how little support the supporting
> adults get. That's who our November 27 webinar is for — teachers, parents
> and caregivers, free, online. If you know someone doing that work quietly,
> send it to them.

## Facebook

> 📅 SAVE THE DATE — Friday, November 27, 2026
>
> Our next Educational Webinar for Teachers, Parents & Caregivers is online
> on Zoom, and it's free, like every COFY event.
>
> Practical strategies from experienced educators, for the people who support
> our youth every day. [TOPIC]
>
> ⏰ [TIME]
> 🔗 Save your place: [LINK]
>
> More at www.cofyouth.org/events

## WhatsApp / email one-liner

> COFY's free Educational Webinar for Teachers, Parents & Caregivers is on
> Friday, November 27, 2026, on Zoom. [TIME] — save your place here: [LINK]
> Please pass it on to anyone supporting a young person with developmental
> delays.

## Suggested run-up

| When | What |
|---|---|
| Now | Save-the-date graphic on Instagram, LinkedIn and Facebook |
| As soon as topic + time + link are set | Re-render the graphics and post the full announcement |
| One week before | Reminder post + Instagram story with the link sticker |
| Day before | Story reminder, and email the list the Zoom link |
| Day of | Morning story: "Tonight / today at [TIME] — last chance to join" |
| After | Thank-you post; add the recording to the Events page if one is made |
