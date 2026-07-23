/**
 * Daily "Opportunity Watch" posts — produced by the automated Instagram
 * pipeline (.github/workflows/daily-instagram-post.yml), which commits one
 * JSON record to automation/archive/ and a matching branded image to
 * public/ig/ every day. Ingested at build time; every push to main
 * redeploys the site, so the feed stays current automatically.
 */
export type IgPost = {
  date: string; // YYYY-MM-DD
  region: string;
  headline: string;
  summary: string;
  source_name: string;
  source_url: string;
  caption: string;
};

const modules = import.meta.glob("../../automation/archive/*.json", {
  eager: true,
  import: "default",
});

/** All archived daily posts, newest first. */
export const igPosts: IgPost[] = (Object.values(modules) as IgPost[])
  .filter((p) => p && /^\d{4}-\d{2}-\d{2}$/.test(p.date))
  .sort((a, b) => b.date.localeCompare(a.date));

/** Branded image committed by the daily action (may not exist for every date). */
export const igImageUrl = (date: string) => `${import.meta.env.BASE_URL}ig/${date}.png`;
