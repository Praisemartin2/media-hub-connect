import { cn } from "@/lib/utils";

/**
 * Brand illustration system — flat vector scenes in COFY's visual language
 * (cobalt night-to-day skies, the winding opportunity path, the lightbulb
 * of ideas from the logo). Used as story thumbnails, program art and the
 * hero poster until real photography/video is dropped into public/media/.
 *
 * Each variant is a composed scene; all colors come from the HSL design
 * tokens so they adapt to theme changes automatically.
 */

export type ArtVariant =
  | "hero"
  | "disability"
  | "education"
  | "outreach"
  | "mentorship"
  | "library"
  | "park"
  | "scholarship"
  | "books"
  | "volunteers"
  | "family"
  | "community";

const T = {
  blue: "hsl(var(--brand-blue))",
  blueDark: "hsl(var(--brand-blue-dark))",
  blueDeep: "hsl(var(--brand-blue-deep))",
  // On the light sky background, former "light" fills flip dark for contrast
  blueLight: "hsl(var(--brand-blue))",
  yellow: "hsl(var(--brand-yellow))",
  yellowLight: "hsl(var(--brand-yellow))",
  cream: "hsl(var(--brand-blue-dark))",
  white: "hsl(0 0% 100%)",
};

/* ---------- shared motifs ---------- */

const Sun = ({ cx, cy, r }: { cx: number; cy: number; r: number }) => (
  <>
    <circle cx={cx} cy={cy} r={r * 1.8} fill={T.yellow} opacity={0.18} />
    <circle cx={cx} cy={cy} r={r} fill={T.yellow} />
  </>
);

const Sparkles = ({ seed = 0 }: { seed?: number }) => (
  <g fill={T.yellowLight} opacity={0.9}>
    {[
      [30 + seed * 7, 22],
      [150 - seed * 5, 14],
      [250 + seed * 3, 30],
      [330 - seed * 9, 18],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 2 ? 2 : 3} />
    ))}
  </g>
);

const Path = ({ light = false }: { light?: boolean }) => (
  <path
    d="M-10 205 C 90 185, 120 150, 185 138 S 300 120, 410 95"
    fill="none"
    stroke={light ? T.cream : T.yellow}
    strokeWidth={20}
    strokeLinecap="round"
    opacity={0.9}
  />
);

const Hills = ({ tone = T.blueDark }: { tone?: string }) => (
  <>
    <path d="M-10 250 Q 100 165 210 250 Z" fill={tone} opacity={0.55} />
    <path d="M150 250 Q 290 155 420 250 Z" fill={tone} opacity={0.8} />
  </>
);

/** Two abstract friendly figures (adult + child), no facial detail. */
const Pair = ({
  x,
  y,
  scale = 1,
  childSeated = false,
}: {
  x: number;
  y: number;
  scale?: number;
  childSeated?: boolean;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* adult */}
    <circle cx={0} cy={-34} r={10} fill={T.cream} />
    <rect x={-11} y={-24} width={22} height={34} rx={10} fill={T.yellow} />
    {/* child */}
    {childSeated ? (
      <g transform="translate(26 6)">
        <circle cx={0} cy={-22} r={8} fill={T.cream} />
        <rect x={-8} y={-14} width={16} height={20} rx={8} fill={T.blueLight} />
        {/* wheelchair wheel */}
        <circle cx={0} cy={12} r={11} fill="none" stroke={T.cream} strokeWidth={3} />
        <circle cx={0} cy={12} r={2.5} fill={T.cream} />
      </g>
    ) : (
      <g transform="translate(26 2)">
        <circle cx={0} cy={-24} r={8} fill={T.cream} />
        <rect x={-8} y={-16} width={16} height={26} rx={8} fill={T.blueLight} />
      </g>
    )}
  </g>
);

const Book = ({ x, y, scale = 1, tone = T.cream }: { x: number; y: number; scale?: number; tone?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-26 0 Q -13 -10 0 0 Q 13 -10 26 0 L 26 16 Q 13 8 0 16 Q -13 8 -26 16 Z" fill={tone} />
    <line x1={0} y1={0} x2={0} y2={16} stroke={T.blueDark} strokeWidth={1.5} />
  </g>
);

const Bulb = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx={0} cy={0} r={16} fill={T.yellow} />
    <rect x={-6} y={13} width={12} height={7} rx={2} fill={T.cream} />
    {[[-24, 0], [24, 0], [0, -24], [-17, -17], [17, -17]].map(([dx, dy], i) => (
      <line
        key={i}
        x1={dx * 0.8}
        y1={dy * 0.8}
        x2={dx}
        y2={dy}
        stroke={T.yellow}
        strokeWidth={3}
        strokeLinecap="round"
      />
    ))}
  </g>
);

/* ---------- scenes (400×250 viewBox) ---------- */

function Scene({ variant }: { variant: ArtVariant }) {
  switch (variant) {
    case "hero":
      return (
        <>
          <Sparkles />
          <Sun cx={72} cy={54} r={24} />
          <Hills />
          <Path />
          <Bulb x={368} y={78} scale={0.85} />
        </>
      );
    case "disability":
      return (
        <>
          <Sparkles seed={2} />
          <Sun cx={70} cy={48} r={20} />
          <Hills />
          <Path light />
          <Pair x={318} y={186} scale={0.9} childSeated />
        </>
      );
    case "education":
      return (
        <>
          <Sparkles seed={4} />
          <Sun cx={340} cy={44} r={20} />
          <Hills tone={T.blue} />
          <Book x={120} y={150} scale={2.2} tone={T.yellow} />
          <Book x={230} y={180} scale={1.7} />
          <Book x={300} y={140} scale={1.3} tone={T.yellowLight} />
        </>
      );
    case "outreach":
      return (
        <>
          <Sparkles seed={1} />
          {/* globe */}
          <circle cx={200} cy={110} r={58} fill={T.blue} />
          <path d="M200 52 a58 58 0 0 1 0 116 a30 58 0 0 1 0 -116" fill={T.blueLight} opacity={0.65} />
          <ellipse cx={200} cy={110} rx={58} ry={20} fill="none" stroke={T.cream} strokeWidth={2.5} opacity={0.7} />
          <Path />
          <Book x={318} y={92} scale={1.4} tone={T.yellow} />
        </>
      );
    case "mentorship":
      return (
        <>
          <Sparkles seed={3} />
          <Sun cx={78} cy={50} r={22} />
          <Hills />
          <Pair x={230} y={172} scale={1.25} />
          <Bulb x={318} y={78} scale={0.7} />
        </>
      );
    case "library":
      return (
        <>
          {/* shelves */}
          <rect x={40} y={40} width={320} height={16} rx={4} fill={T.blueLight} opacity={0.5} />
          <rect x={40} y={110} width={320} height={16} rx={4} fill={T.blueLight} opacity={0.5} />
          {[60, 100, 140, 190, 235, 280, 320].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={i % 2 ? 62 : 58}
              width={22}
              height={i % 2 ? 48 : 52}
              rx={3}
              fill={i % 3 === 0 ? T.yellow : i % 3 === 1 ? T.blue : T.cream}
            />
          ))}
          <Pair x={150} y={205} childSeated />
          <Book x={290} y={195} scale={1.8} tone={T.yellow} />
        </>
      );
    case "park":
      return (
        <>
          <Sun cx={330} cy={48} r={24} />
          <Hills tone={T.blue} />
          {/* tree */}
          <rect x={78} y={140} width={12} height={50} rx={5} fill={T.blueDark} />
          <circle cx={84} cy={122} r={34} fill={T.blue} />
          <circle cx={64} cy={140} r={22} fill={T.blueLight} opacity={0.8} />
          <Pair x={230} y={182} scale={1.15} childSeated />
          <Sparkles seed={5} />
        </>
      );
    case "scholarship":
      return (
        <>
          <Sparkles seed={6} />
          {/* grad cap */}
          <g transform="translate(200 105)">
            <polygon points="-70,0 0,-34 70,0 0,34" fill={T.blueLight} />
            <rect x={-30} y={8} width={60} height={26} rx={5} fill={T.blue} />
            <line x1={58} y1={5} x2={58} y2={52} stroke={T.yellow} strokeWidth={3} />
            <circle cx={58} cy={56} r={6} fill={T.yellow} />
          </g>
          <Path />
        </>
      );
    case "books":
      return (
        <>
          <Sparkles seed={7} />
          {/* book stack */}
          <rect x={120} y={102} width={172} height={24} rx={6} fill={T.yellow} />
          <rect x={112} y={126} width={186} height={24} rx={6} fill={T.blueLight} />
          <rect x={104} y={150} width={200} height={24} rx={6} fill={T.cream} />
          <rect x={112} y={174} width={186} height={24} rx={6} fill={T.yellow} />
          <rect x={120} y={198} width={172} height={24} rx={6} fill={T.blueLight} />
          <Bulb x={330} y={70} scale={0.75} />
        </>
      );
    case "volunteers":
      return (
        <>
          <Sun cx={62} cy={46} r={20} />
          <Hills />
          <Pair x={110} y={176} />
          <Pair x={230} y={176} childSeated />
          <Pair x={330} y={176} scale={0.9} />
          <Sparkles seed={8} />
        </>
      );
    case "family":
      return (
        <>
          <Sparkles seed={9} />
          {/* house */}
          <g transform="translate(120 130)">
            <polygon points="-64,0 0,-52 64,0" fill={T.yellow} />
            <rect x={-52} y={0} width={104} height={64} rx={6} fill={T.cream} />
            <rect x={-14} y={22} width={28} height={42} rx={4} fill={T.blue} />
          </g>
          <Pair x={280} y={186} scale={1.1} childSeated />
        </>
      );
    case "community":
    default:
      return (
        <>
          <Sun cx={200} cy={56} r={24} />
          <Hills />
          <Path />
          <Pair x={90} y={180} scale={0.95} />
          <Pair x={215} y={182} childSeated />
          <Pair x={330} y={180} scale={0.9} />
        </>
      );
  }
}

type IllustrationProps = {
  variant: ArtVariant;
  className?: string;
  /** Accessible description; pass "" to mark as purely decorative. */
  label?: string;
};

const defaultLabels: Record<ArtVariant, string> = {
  hero: "Illustration of a mentor and a child in a wheelchair on a winding path toward a bright lightbulb",
  disability: "Illustration of a mentor beside a child using a wheelchair on a sunny path",
  education: "Illustration of open books under a bright sun",
  outreach: "Illustration of a globe with a path and a book, representing global outreach",
  mentorship: "Illustration of a mentor and teen together with a bright idea lightbulb",
  library: "Illustration of colorful library shelves with a mentor and child reading",
  park: "Illustration of a sunny park with a tree, a mentor and a child in a wheelchair",
  scholarship: "Illustration of a graduation cap on a golden path",
  books: "Illustration of a tall stack of colorful books with a lightbulb",
  volunteers: "Illustration of several mentors and children together on green hills",
  family: "Illustration of a warm home with a family outside",
  community: "Illustration of families and mentors gathered on a sunlit path",
};

export function Illustration({ variant, className, label }: IllustrationProps) {
  const aria = label === "" ? { "aria-hidden": true as const } : { role: "img" as const, "aria-label": label ?? defaultLabels[variant] };
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      {...aria}
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(0 0% 100%)" />
          <stop offset="100%" stopColor="hsl(var(--brand-sky))" />
        </linearGradient>
      </defs>
      <rect width={400} height={250} fill={`url(#sky-${variant})`} />
      <Scene variant={variant} />
    </svg>
  );
}
