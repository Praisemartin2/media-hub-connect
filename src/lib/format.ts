export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  });
}

export function formatDateShort(iso: string): string {
  return formatDate(iso, { month: "short", day: "numeric", year: undefined });
}

export function dateParts(iso: string): { month: string; day: string } {
  const d = new Date(iso + "T00:00:00");
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: d.toLocaleDateString("en-US", { day: "2-digit" }),
  };
}

/** Today reference for the demo content. */
export const TODAY = new Date("2026-06-25T00:00:00");

export function isUpcoming(iso: string): boolean {
  return new Date(iso + "T00:00:00") >= TODAY;
}
