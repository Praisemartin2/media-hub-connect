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

/** "August 5 – 7, 2026" for ranges; a single formatted date otherwise. */
export function formatDateRange(iso: string, endIso?: string): string {
  if (!endIso) return formatDate(iso);
  const s = new Date(iso + "T00:00:00");
  const e = new Date(endIso + "T00:00:00");
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.toLocaleDateString("en-US", { month: "long" })} ${s.getDate()} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${formatDate(iso, { year: undefined })} – ${formatDate(endIso)}`;
}

/**
 * Venue + location as one line, dropping placeholder venues and any
 * location segment the venue already names (e.g. "…, Umuahia" +
 * "Umuahia, Abia State" -> "…, Umuahia, Abia State").
 */
export function formatPlace(venue: string, location: string): string {
  if (!venue || venue === "Various" || venue === "Virtual") return location;
  const rest = location
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p && !venue.includes(p));
  return rest.length ? `${venue}, ${rest.join(", ")}` : venue;
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
