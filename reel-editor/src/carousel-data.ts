// "Red flags to look for when touring a home" — 7-slide Instagram carousel
// (1080x1350, 4:5). Ekabo Home cult-brand system: cobalt / rust / cream,
// bold grotesque italic headlines, cobalt kicker pills, rust reserved for the
// punchline (the CTA slide). See .claude/skills/cult-brand-reel-style/SKILL.md
import { COLORS } from "./reel-data";
export { COLORS };

export const CAROUSEL_W = 1080;
export const CAROUSEL_H = 1350;

export type Slide =
  | {
      type: "cover";
      bg: string;
      fg: string;
      kicker: string;
      title: string[];
      sub: string;
      tag: string;
    }
  | {
      type: "flag";
      bg: string;
      fg: string;
      accent: string;
      num: string;
      title: string[];
      body: string;
      tell: string; // the "what agents know" one-liner
    }
  | {
      type: "cta";
      bg: string;
      fg: string;
      kicker: string;
      title: string[];
      sub: string;
      pill: string;
      pillSub: string;
    };

export const SLIDES: Slide[] = [
  {
    type: "cover",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    kicker: "EKABO HOME · BUYER'S GUIDE",
    title: ["RED FLAGS", "WHEN TOURING", "A HOME"],
    sub: "Agents catch these immediately. Now you will too.",
    tag: "5 things to check before you fall in love",
  },
  {
    type: "flag",
    bg: COLORS.cream,
    fg: COLORS.cobalt,
    accent: COLORS.rust,
    num: "01",
    title: ["Fresh paint in", "just one spot"],
    body:
      "One freshly painted wall, ceiling, or patch on an otherwise older home is rarely cosmetic.",
    tell: "Agents read it as: water stain, smoke, or mold being covered. Ask what's underneath.",
  },
  {
    type: "flag",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    accent: COLORS.rust,
    num: "02",
    title: ["Doors that stick", "or won't latch"],
    body:
      "Doors and windows that jam, won't close, or have big uneven gaps aren't just “an old house.”",
    tell: "It can signal foundation movement or settling. Open and shut a few on every floor.",
  },
  {
    type: "flag",
    bg: COLORS.cream,
    fg: COLORS.cobalt,
    accent: COLORS.rust,
    num: "03",
    title: ["A wall of", "air fresheners"],
    body:
      "Plug-ins, candles, and fresh cookies in every room are a staging trick — and sometimes a cover.",
    tell: "Strong scents often mask moisture, pets, or mildew. Trust your nose, not the vanilla.",
  },
  {
    type: "flag",
    bg: COLORS.cobalt,
    fg: COLORS.cream,
    accent: COLORS.rust,
    num: "04",
    title: ["Sloping or", "bouncy floors"],
    body:
      "Floors that tilt, dip, or feel spongy underfoot are one of the clearest structural tells.",
    tell: "Set a marble down — if it rolls on its own, ask about the subfloor and foundation.",
  },
  {
    type: "flag",
    bg: COLORS.cream,
    fg: COLORS.cobalt,
    accent: COLORS.rust,
    num: "05",
    title: ["Stained ceilings", "& warped trim"],
    body:
      "Brown rings, bubbling paint overhead, or swollen baseboards point to leaks — past or active.",
    tell: "Always ask for the repair history and whether the roof or plumbing was touched.",
  },
  {
    type: "cta",
    bg: COLORS.rust,
    fg: COLORS.cream,
    kicker: "TOURING SOON?",
    title: ["Save this", "before your", "next showing"],
    sub: "Walk in like you've done this a hundred times.",
    pill: "FOLLOW @EKABOHOME",
    pillSub: "new listings & buyer tips every week",
  },
];
