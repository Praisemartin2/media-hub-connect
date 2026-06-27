// "Creative deals" talking-head reel (IMG_2071) — cult-brand style.
// Timings are ABSOLUTE seconds, placed on the real SRT timeline.
// Brand: Ekabo Home (@ekabohome). B-roll currently uses repo clips; swap the
// BROLL src values for Higgsfield AI clips once that CDN is allowlisted.
import { COLORS } from "./reel-data";
export { COLORS };

export const FPS = 30;
export const SRC = "source/img2071.mp4";
export const DURATION_SECONDS = 104.3;
export const ASSETS_READY = true;

export const HOOK = {
  start: 0.3,
  end: 5.0,
  kicker: "CREATIVE FINANCE",
  headline: ["The deals", "most realtors", "can't close"],
};

export type TitleCard = { at: number; dur: number; bg: string; fg: string; lines: string[] };
export const TITLE_CARDS: TitleCard[] = [
  { at: 30.0, dur: 0.9, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["FOLLOW", "THE LEAD"] },
  { at: 57.6, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["WE DO", "CREATIVE DEALS"] },
  { at: 66.0, dur: 0.9, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["200+ DAYS", "ON MARKET"] },
  { at: 92.0, dur: 1.0, bg: COLORS.rust, fg: COLORS.cream, lines: ["ALL IN", "THE DEAL"] },
];

export const CTA = {
  start: 100.0,
  kicker: "WORK WITH US",
  big: ["DM us", "‘CREATIVE’"],
  sub: "Ekabo Home Team · @ekabohome",
};

// B-roll punch-ins (absolute seconds). Repo clips for now; replace src with
// Higgsfield clips (salsa / duplex / roof / kitchen) when the CDN is allowlisted.
export type Broll = { at: number; dur: number; src: string };
export const BROLL: Broll[] = [
  { at: 17.0, dur: 1.6, src: "broll/contract.mp4" },   // "amendments ... convolute the deal"
  { at: 64.5, dur: 2.0, src: "broll/quadplex.mp4" },   // "a duplex sitting over 200 days"
  { at: 78.0, dur: 2.0, src: "broll/quadplex.mp4" },   // "brand new roof ... updated kitchens"
];
