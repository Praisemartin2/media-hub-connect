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
    min: `${CDN}/hf_20260703_043813_8d4c39d4-aa6f-43b6-8d4b-0d43c02aba59_min.webp`,
    raw: `${CDN}/hf_20260703_043813_8d4c39d4-aa6f-43b6-8d4b-0d43c02aba59.png`,
    alt: "A caring teacher kneels beside a smiling boy in a wheelchair at a bright learning-center table",
  },
  education: {
    min: `${CDN}/hf_20260703_043836_416f23c2-62ca-4641-aeb5-4f6c30d6ef74_min.webp`,
    raw: `${CDN}/hf_20260703_043836_416f23c2-62ca-4641-aeb5-4f6c30d6ef74.png`,
    alt: "Children's hands share an open picture book surrounded by school supplies",
  },
  outreach: {
    min: `${CDN}/hf_20260703_043838_7a384574-d456-4f0b-a1a5-248a1ebcd1a9_min.webp`,
    raw: `${CDN}/hf_20260703_043838_7a384574-d456-4f0b-a1a5-248a1ebcd1a9.png`,
    alt: "Joyful schoolchildren in bright uniforms receive donated books at an outdoor outreach event",
  },
  mentorship: {
    min: `${CDN}/hf_20260703_043839_c593d0aa-5cf8-4975-900b-21edb77248c8_min.webp`,
    raw: `${CDN}/hf_20260703_043839_c593d0aa-5cf8-4975-900b-21edb77248c8.png`,
    alt: "A teenager and a mentor laugh together over a notebook on a park bench at golden hour",
  },
  community: {
    min: `${CDN}/hf_20260703_043841_1e9ac394-8318-4d74-897d-9d62ce51c885_min.webp`,
    raw: `${CDN}/hf_20260703_043841_1e9ac394-8318-4d74-897d-9d62ce51c885.png`,
    alt: "Families, children of varied abilities and volunteers gather smiling in a sunlit park",
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
