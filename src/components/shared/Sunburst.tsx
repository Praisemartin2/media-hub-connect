import { cn } from "@/lib/utils";

/**
 * Decorative radiating-line motif for colored feature blocks —
 * echoes the sun-over-path mark in the COFY logo.
 */
export function Sunburst({
  className,
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 11 - Math.PI; // fan across the top half
    const x1 = 100 + Math.cos(a) * 38;
    const y1 = 100 + Math.sin(a) * 38;
    const x2 = 100 + Math.cos(a) * 96;
    const y2 = 100 + Math.sin(a) * 96;
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });
  return (
    <svg
      viewBox="0 0 200 104"
      aria-hidden
      className={cn("pointer-events-none", className)}
      stroke={stroke}
      strokeWidth={2}
      fill="none"
    >
      {rays}
    </svg>
  );
}
