// "4 Reasons NOT to invest in real estate" — satirical/reverse-psychology
// carousel recreated in Ekabo Home brand style (cobalt/rust/cream, bold grotesque).
// 6 slides, 1080x1350 (IG 4:5). Full-bleed Higgsfield photo per slide + brand
// scrim + text. Photos: public/reasons/r1..r6.jpg (fetched from Higgsfield).
import { COLORS } from "./reel-data";
export { COLORS };

export const W = 1080;
export const H = 1350;
export const ASSETS_READY = false; // flip true once public/reasons/r*.jpg exist

export type Slide =
  | { type: "cover"; photo: string; kicker: string; big: string; sub: string[]; emphasis: string }
  | { type: "reason"; photo: string; num: string; title: string[]; sub: string[] }
  | { type: "close"; photo: string; big: string[]; sub: string[]; ctaBold: string; cta: string };

export const SLIDES: Slide[] = [
  {
    type: "cover",
    photo: "reasons/r1.jpg",
    kicker: "EKABO HOME",
    big: "4 REASONS",
    sub: ["Why you should definitely", "NOT invest in real estate"],
    emphasis: "NOT",
  },
  {
    type: "reason",
    photo: "reasons/r2.jpg",
    num: "01",
    title: ["You love", "unpredictable stress"],
    sub: ["Who needs steady rental income?", "Unpredictable stress is the real thrill."],
  },
  {
    type: "reason",
    photo: "reasons/r3.jpg",
    num: "02",
    title: ["You enjoy watching", "your savings shrink"],
    sub: ["Inflation eating your cash? Perfect —", "watching your money disappear sounds better."],
  },
  {
    type: "reason",
    photo: "reasons/r4.jpg",
    num: "03",
    title: ["You like investments", "that vanish"],
    sub: ["Owning something real? Nah.", "Invisible assets are the future."],
  },
  {
    type: "reason",
    photo: "reasons/r5.jpg",
    num: "04",
    title: ["You're allergic to", "leverage & growth"],
    sub: ["Letting smart financing build your wealth?", "No thanks — hard work only."],
  },
  {
    type: "close",
    photo: "reasons/r6.jpg",
    big: ["IF NONE OF THIS", "SOUNDS LIKE YOU"],
    sub: ["Maybe it's time to rethink", "your money strategy."],
    ctaBold: "Follow @ekabohome",
    cta: "for real, boring wealth-building.",
  },
];
