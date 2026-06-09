// Brand palette (sampled from the user's reference designs) — see
// .claude/skills/cult-brand-reel-style/SKILL.md
export const COLORS = {
  cobalt: "#1E49A6",
  rust: "#DB835B",
  cream: "#F0EDE8",
  espresso: "#4C220C",
  ink: "#111111",
  white: "#FFFFFF",
};

// Full-frame interstitial "title cards" placed on the silence-cut timeline (seconds).
// bg/fg use the palette; rust is reserved for the punchline beat.
export type TitleCard = {
  start: number;
  dur: number;
  bg: string;
  fg: string;
  lines: string[];
};

export const TITLE_CARDS: TitleCard[] = [
  { start: 13.0, dur: 0.85, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["WHAT CLIENTS", "NEVER SEE"] },
  { start: 72.2, dur: 1.0, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["7:58 PM"] },
  { start: 89.6, dur: 0.85, bg: COLORS.rust, fg: COLORS.cream, lines: ["EVERY PIECE", "OF THE PUZZLE"] },
];

// Hook overlay (kept ON top of the A-roll so we still see him talking).
export const HOOK = {
  start: 0.3,
  end: 6.0,
  kicker: "THE $1,000,000 DEAL",
  headline: ["30 minutes", "to save it"],
};

// Closing CTA full-frame card.
export const CTA = {
  start: 101.0,
  kicker: "YOUR NEXT DEAL",
  big: ["DM me", "‘PUZZLE’"],
  sub: "or tap the link in my bio",
};

export const TOTAL_SECONDS = 104.6;
export const FPS = 30;
