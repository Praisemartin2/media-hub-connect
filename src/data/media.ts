export type MediaType = "vlog" | "blog" | "news";

export type MediaItem = {
  id: string;
  type: MediaType;
  title: string;
  excerpt: string;
  author: string;
  date: string; // ISO
  readTime?: string;
  duration?: string; // for vlogs
  category: string;
  /** Tailwind gradient classes used for the thumbnail (fallback) */
  gradient: string;
  /** Brand illustration variant for the thumbnail */
  art: import("@/components/art/Illustration").ArtVariant;
  featured?: boolean;
  /** Article paragraphs. Assembled only from copy that already exists in the site data. */
  body?: string[];
  /** Original post on cofyouth.org, when this item summarizes a real founder blog. */
  sourceUrl?: string;
};

const COFY_BLOG = "https://www.cofyouth.org/blog";

export const mediaItems: MediaItem[] = [
  {
    id: "vlog-outreach-week",
    type: "blog",
    title: "Inside Our Educational Outreach Week",
    excerpt:
      "Every summer we hold an Educational Outreach week of hands-on learning for our members. Come behind the scenes with us.",
    author: "COFY Media Team",
    date: "2026-06-20",
    readTime: "3 min read",
    category: "Behind the Scenes",
    gradient: "from-brand-blue to-brand-blue-dark",
    art: "library",
    featured: true,
    body: [
      "Every summer we hold an Educational Outreach Week — a week of hands-on learning opportunities for our members, free of charge, as are all COFY events and services.",
      "Education is the key to unlocking future opportunities. Through research-based identification and intervention methods, we provide high-quality, transformational education to youth aged 5–21 — plus webinars, panel discussions, courses and resources for educators, youth with disabilities, and their caretakers.",
      "Want to join us for the next one? Educational Outreach Week runs July 13–17, 2026 at community venues and online. Head to the Events page to learn more — everyone is welcome.",
    ],
  },
  {
    id: "news-autism-panel",
    type: "news",
    title: "Autism Awareness Discussion Panel",
    excerpt:
      "Every April we celebrate Autism Awareness Month. Our discussion panel brought educators, parents and caregivers together for honest conversation.",
    author: "COFY Newsroom",
    date: "2026-04-05",
    readTime: "2 min read",
    category: "Community",
    gradient: "from-brand-blue to-brand-blue-light",
    art: "volunteers",
    body: [
      "Every April we celebrate Autism Awareness Month. Our discussion panel brought educators, parents and caregivers together for an honest conversation.",
      "Supporting the people who support our youth is central to what we do — from quarterly educational webinars for teachers, parents and caregivers to panel discussions like this one. All events and services are offered free of charge to recipients.",
    ],
  },
  {
    id: "blog-new-nigeria",
    type: "blog",
    title: "I See the New Nigeria",
    excerpt:
      "\"When one man cooks for the people, they finish the food. But let the people cook for one man and he is consumed by the food...\" Reflections on hope and change.",
    author: "Ngozi Martin-Oguike",
    date: "2023-03-03",
    readTime: "5 min read",
    category: "From the Founder",
    gradient: "from-brand-blue to-brand-yellow",
    art: "community",
    body: [
      "In this reflection, COFY founder Dr. Ngozi Martin-Oguike writes about hope and change in Nigeria:",
      "“When one man cooks for the people, they finish the food. But let the people cook for one man and he is consumed by the food...”",
    ],
    sourceUrl: COFY_BLOG,
  },
  {
    id: "blog-womens-togetherness",
    type: "blog",
    title: "Let's Help — Women's Togetherness",
    excerpt:
      "\"That's why she is called Woman! Mother!\" — on meeting Hanatu at the Internally Displaced People's (IDP) Camp in Abuja.",
    author: "Ngozi Martin-Oguike",
    date: "2022-04-19",
    readTime: "4 min read",
    category: "From the Founder",
    gradient: "from-brand-blue-light to-brand-blue",
    art: "family",
    body: [
      "In this piece, Dr. Ngozi Martin-Oguike writes about meeting Hanatu at the Internally Displaced People's (IDP) Camp in Abuja:",
      "“That's why she is called Woman! Mother!”",
    ],
    sourceUrl: COFY_BLOG,
  },
  {
    id: "blog-our-people-are-hungry",
    type: "blog",
    title: "Our People Are Hungry",
    excerpt:
      "A reflection on need, compassion and the call to serve our communities.",
    author: "Ngozi Martin-Oguike",
    date: "2022-01-02",
    readTime: "4 min read",
    category: "From the Founder",
    gradient: "from-brand-blue-deep to-brand-blue",
    art: "park",
    body: [
      "A reflection from Dr. Ngozi Martin-Oguike on need, compassion and the call to serve our communities.",
    ],
    sourceUrl: COFY_BLOG,
  },
  {
    id: "blog-i-was-hungry",
    type: "blog",
    title: "I Was Hungry",
    excerpt:
      "\"On an adventure that was not recommended by man. It was a clear experience of God working out his purpose one day at a time...\"",
    author: "Ngozi Martin-Oguike",
    date: "2021-10-24",
    readTime: "6 min read",
    category: "Mission Projects",
    gradient: "from-brand-yellow to-brand-yellow-light",
    art: "scholarship",
    body: [
      "From Dr. Ngozi Martin-Oguike's account of a mission journey:",
      "“On an adventure that was not recommended by man. It was a clear experience of God working out his purpose one day at a time...”",
    ],
    sourceUrl: COFY_BLOG,
  },
  {
    id: "blog-in-my-mind",
    type: "blog",
    title: "In My Mind",
    excerpt:
      "Thoughts on purpose, calling and creating opportunities for the next generation.",
    author: "Ngozi Martin-Oguike",
    date: "2021-04-02",
    readTime: "3 min read",
    category: "From the Founder",
    gradient: "from-brand-blue to-brand-blue-light",
    art: "mentorship",
    body: [
      "Thoughts from Dr. Ngozi Martin-Oguike on purpose, calling and creating opportunities for the next generation.",
    ],
    sourceUrl: COFY_BLOG,
  },
];

export const mediaFilters: { label: string; value: MediaType | "all" }[] = [
  { label: "All Stories", value: "all" },
  { label: "Blog", value: "blog" },
  { label: "News", value: "news" },
];
