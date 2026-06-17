// Two Ekabo-Home news carousels (Morning Brew / Tech Brew format), rendered in
// the cult-brand palette (cobalt / rust / cream). 1080x1350 (IG 4:5).
// Format per post: cover -> "What's Happening" -> "Some More Context" ->
// "By the Numbers" -> takeaway/CTA. All facts verified June 2026 (see captions).
import { COLORS } from "./reel-data";
export { COLORS };

export const NEWS_W = 1080;
export const NEWS_H = 1350;

// A run of text; { b:true } renders as cobalt bold emphasis (like the reference).
export type Seg = { t: string; b?: boolean };
export type Bullet = Seg[];

export type NewsSlide =
  | { type: "cover"; bg: string; fg: string; kicker: string; headline: string[]; source: string; icon: "rate" | "city" }
  | { type: "points"; bg: string; fg: string; accent: string; title: string; bullets: Bullet[] }
  | { type: "stats"; bg: string; fg: string; accent: string; title: string; stats: { big: string; label: string }[] }
  | { type: "cta"; bg: string; fg: string; kicker: string; title: string[]; body: string; pill: string; pillSub: string };

// ---------------------------------------------------------------- POST A (US)
export const POST_A: NewsSlide[] = [
  {
    type: "cover",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    kicker: "EKABO HOME · MARKET NEWS",
    headline: ["Washington just", "made its biggest", "housing push", "in years"],
    source: "What it means for buyers · June 2026",
    icon: "rate",
  },
  {
    type: "points",
    bg: COLORS.cream,
    fg: COLORS.espresso,
    accent: COLORS.rust,
    title: "What's Happening",
    bullets: [
      [
        { t: "In March, the President signed " },
        { t: "Executive Order 14393", b: true },
        { t: ", a federal push to make " },
        { t: "mortgage credit cheaper and easier to get", b: true },
        { t: "." },
      ],
      [
        { t: "A second order tells agencies to " },
        { t: "cut the red tape", b: true },
        { t: " that slows and inflates " },
        { t: "new home construction", b: true },
        { t: "." },
      ],
      [
        { t: "The plan also directs " },
        { t: "Fannie Mae & Freddie Mac", b: true },
        { t: " to buy up to " },
        { t: "$200 billion in mortgage bonds", b: true },
        { t: " to pull rates down." },
      ],
    ],
  },
  {
    type: "points",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    accent: COLORS.rust,
    title: "Some More Context",
    bullets: [
      [
        { t: "The strategy is two-pronged: make " },
        { t: "borrowing cheaper", b: true },
        { t: " and make it " },
        { t: "faster to build", b: true },
        { t: " new homes." },
      ],
      [
        { t: "Officials are also " },
        { t: "evaluating “portable” mortgages", b: true },
        { t: " — loans you could carry to your next home." },
      ],
      [
        { t: "But as of mid-June the " },
        { t: "30-year fixed is still ~6.5%", b: true },
        { t: ", and the " },
        { t: "Fed is expected to hold rates", b: true },
        { t: " this week." },
      ],
    ],
  },
  {
    type: "stats",
    bg: COLORS.cream,
    fg: COLORS.espresso,
    accent: COLORS.rust,
    title: "By the Numbers",
    stats: [
      { big: "$200B", label: "in mortgage bonds the GSEs are directed to buy" },
      { big: "~6.5%", label: "average 30-yr fixed rate, mid-June 2026" },
      { big: "Sub-6%", label: "the rate target — a level unseen since 2022" },
    ],
  },
  {
    type: "cta",
    bg: COLORS.rust,
    fg: COLORS.cream,
    kicker: "WHAT IT MEANS FOR YOU",
    title: ["Lower rates +", "more supply", "could ease", "the squeeze"],
    body: "If the plan lands, 2026 may reward buyers who are ready early. Get pre-positioned now.",
    pill: "FOLLOW @EKABOHOME",
    pillSub: "market news & buyer tips every week",
  },
];

// ------------------------------------------------------------ POST B (ATLANTA)
export const POST_B: NewsSlide[] = [
  {
    type: "cover",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    kicker: "EKABO HOME · ATLANTA",
    headline: ["Atlanta is", "rewriting its", "zoning code —", "first time in 40 yrs"],
    source: "Why it matters for buyers & renters · 2026",
    icon: "city",
  },
  {
    type: "points",
    bg: COLORS.cream,
    fg: COLORS.espresso,
    accent: COLORS.rust,
    title: "What's Happening",
    bullets: [
      [
        { t: "“" },
        { t: "ATL Zoning 2.0", b: true },
        { t: "” would replace the city's " },
        { t: "40-year-old zoning code", b: true },
        { t: " with a simpler, clearer framework." },
      ],
      [
        { t: "City Council", b: true },
        { t: " is expected to take it up in " },
        { t: "spring / early summer 2026", b: true },
        { t: " — reshaping what gets built citywide." },
      ],
      [
        { t: "It's the backbone of Atlanta's push for " },
        { t: "more homes — and more types of homes", b: true },
        { t: "." },
      ],
    ],
  },
  {
    type: "points",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    accent: COLORS.rust,
    title: "Some More Context",
    bullets: [
      [
        { t: "Mayor Dickens pledged " },
        { t: "20,000 affordable units by 2030", b: true },
        { t: " — the city is " },
        { t: "already past halfway (12,441)", b: true },
        { t: "." },
      ],
      [
        { t: "The " },
        { t: "BeltLine", b: true },
        { t: " has hit " },
        { t: "79% of its affordable-housing goal", b: true },
        { t: " (4,425 units)." },
      ],
      [
        { t: "Yet metro Atlanta lost " },
        { t: "250,000 homes under $1,250/mo", b: true },
        { t: " between 2019–2024." },
      ],
    ],
  },
  {
    type: "stats",
    bg: COLORS.cream,
    fg: COLORS.espresso,
    accent: COLORS.rust,
    title: "By the Numbers",
    stats: [
      { big: "$435K", label: "median Atlanta sale price — stable year-over-year" },
      { big: "55 days", label: "to sell, down 14% YoY — a more balanced market" },
      { big: "116,000", label: "units metro Atlanta must add to keep up" },
    ],
  },
  {
    type: "cta",
    bg: COLORS.rust,
    fg: COLORS.cream,
    kicker: "WHAT IT MEANS FOR YOU",
    title: ["A balanced", "market =", "room to", "negotiate"],
    body: "More inventory and longer days on market hand buyers leverage. Let's get you positioned.",
    pill: "FOLLOW @EKABOHOME",
    pillSub: "Atlanta listings & buyer tips every week",
  },
];

export const POSTS: Record<string, NewsSlide[]> = { A: POST_A, B: POST_B };
