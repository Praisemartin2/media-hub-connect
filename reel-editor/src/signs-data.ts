// "5 Signs a Neighborhood Is About to Blow Up" — ORIGINAL Ekabo educational
// carousel (not the satirical repost). 7 slides, 1080x1350. Distinct layout:
// top "SIGN 0X" tag + "Spot it" tip line. Photos: public/signs/s1..s7.png.
import { COLORS } from "./reel-data";
export { COLORS };

export const W = 1080;
export const H = 1350;
export const ASSETS_READY = true; // flip true once public/signs/s*.png exist

export type Slide =
  | { type: "cover"; photo: string; kicker: string; sub: string[]; tag: string }
  | { type: "sign"; photo: string; tag: string; title: string[]; body: string; spot: string }
  | { type: "close"; photo: string; big: string[]; sub: string[]; ctaBold: string; cta: string };

export const SLIDES: Slide[] = [
  {
    type: "cover",
    photo: "signs/s1.png",
    kicker: "EKABO HOME · NEIGHBORHOOD GUIDE",
    sub: ["a neighborhood is", "about to blow up"],
    tag: "Spot the next hot ZIP before prices do.",
  },
  {
    type: "sign",
    photo: "signs/s2.png",
    tag: "SIGN 01",
    title: ["The cafés", "show up first"],
    body: "Indie coffee shops, cocktail bars and brunch spots move in — homebuyers are never far behind.",
    spot: "Spot it: new walkable hangouts.",
  },
  {
    type: "sign",
    photo: "signs/s3.png",
    tag: "SIGN 02",
    title: ["Cranes on", "the skyline"],
    body: "Permits and construction mean developers are betting real money on the area's future.",
    spot: "Spot it: follow the cranes.",
  },
  {
    type: "sign",
    photo: "signs/s4.png",
    tag: "SIGN 03",
    title: ["Transit &", "trails arrive"],
    body: "A new rail stop, BeltLine extension or trail quietly reshapes commutes — and values climb around it.",
    spot: "Spot it: fresh infrastructure.",
  },
  {
    type: "sign",
    photo: "signs/s5.png",
    tag: "SIGN 04",
    title: ["The flippers", "move in"],
    body: "Dumpsters, scaffolding and fresh exteriors on tired homes mean smart money is already renovating.",
    spot: "Spot it: get in before they finish.",
  },
  {
    type: "sign",
    photo: "signs/s6.png",
    tag: "SIGN 05",
    title: ["Culture comes", "before capital"],
    body: "Murals, galleries and music venues arrive before the price tags do. Artists spot value first.",
    spot: "Spot it: a growing arts scene.",
  },
  {
    type: "close",
    photo: "signs/s7.png",
    big: ["GET IN BEFORE", "THE CROWD"],
    sub: ["We track Atlanta's next hot", "neighborhoods so you don't have to."],
    ctaBold: "DM us ‘MAP’",
    cta: "· Follow @ekabohome",
  },
];
