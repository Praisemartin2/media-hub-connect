/**
 * Photoreal media generated with Higgsfield (Soul v2 / Kling 3.0 turbo)
 * for COFY — hosted on Higgsfield's CDN. All people are AI-generated;
 * no real minors are depicted.
 *
 * `min` = optimized WebP for in-page use; `raw` = full-res PNG source.
 * Local illustration plates in public/media/photos/ remain as onError
 * fallbacks, so the site degrades gracefully if the CDN is unreachable.
 */

const CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38Q7UV4HRCn3Op8W57z72pn2Iev";
const LOCAL = `${import.meta.env.BASE_URL}media/photos`;

export type PhotoKey =
  | "disability"
  | "education"
  | "outreach"
  | "mentorship"
  | "community"
  | "books"
  | "volunteers";

export const photos: Record<PhotoKey, { min: string; raw: string; alt: string }> = {
  disability: {
    min: `${LOCAL}/real-team-nigeria.jpg`,
    raw: `${LOCAL}/real-team-nigeria.jpg`,
    alt: "COFY team members with community members during an outreach visit in Nigeria",
  },
  education: {
    min: `${CDN}/hf_20260703_043836_416f23c2-62ca-4641-aeb5-4f6c30d6ef74_min.webp`,
    raw: `${CDN}/hf_20260703_043836_416f23c2-62ca-4641-aeb5-4f6c30d6ef74.png`,
    alt: "Children's hands share an open picture book surrounded by school supplies",
  },
  outreach: {
    min: `${LOCAL}/real-outreach-distribution.jpg`,
    raw: `${LOCAL}/real-outreach-distribution.jpg`,
    alt: "Children gather around the COFY team during a distribution at an outreach in Abuja, Nigeria",
  },
  mentorship: {
    min: `${CDN}/hf_20260703_043839_c593d0aa-5cf8-4975-900b-21edb77248c8_min.webp`,
    raw: `${CDN}/hf_20260703_043839_c593d0aa-5cf8-4975-900b-21edb77248c8.png`,
    alt: "A teenager and a mentor laugh together over a notebook on a park bench at golden hour",
  },
  community: {
    min: `${LOCAL}/real-outreach-gathering.jpg`,
    raw: `${LOCAL}/real-outreach-gathering.jpg`,
    alt: "A large gathering of children and families at a COFY community outreach in Nigeria",
  },
  books: {
    min: `${CDN}/hf_20260703_043843_0545de1c-d9a7-4c3b-ac30-aeb5c2a63af0_min.webp`,
    raw: `${CDN}/hf_20260703_043843_0545de1c-d9a7-4c3b-ac30-aeb5c2a63af0.png`,
    alt: "Volunteers pack tall colorful stacks of donated children's books into boxes",
  },
  volunteers: {
    min: `${CDN}/hf_20260703_043844_331be3ca-b40a-4dfb-bd35-6f52c2759430_min.webp`,
    raw: `${CDN}/hf_20260703_043844_331be3ca-b40a-4dfb-bd35-6f52c2759430.png`,
    alt: "A diverse group of adult volunteers stand together smiling in a bright community center",
  },
};

/** Photoreal 5s hero film (Kling 3.0 turbo, 1280×720 MP4). */
export const heroFilm = `${CDN}/hf_20260703_043903_62d9786a-6653-4b4c-85fb-dad9e031817d.mp4`;

/** Local illustrated plate used as onError fallback for a photo key. */
export const plateFallback = (key: PhotoKey) =>
  `${import.meta.env.BASE_URL}media/photos/${key}.png`;
