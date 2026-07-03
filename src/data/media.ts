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
};

export const mediaItems: MediaItem[] = [
  {
    id: "vlog-outreach-week",
    type: "vlog",
    title: "Inside Our Educational Outreach Week",
    excerpt:
      "Every summer we hold an Educational Outreach week of hands-on learning for our members. Come behind the scenes with us.",
    author: "COFY Media Team",
    date: "2026-06-20",
    duration: "8:42",
    category: "Daily Vlog",
    gradient: "from-brand-blue to-brand-blue-dark",
    art: "library",
    featured: true,
  },
  {
    id: "news-read-for-reach",
    type: "news",
    title: "Read for Reach — 5,000 Books Donated to Nigeria",
    excerpt:
      "Through our Read for Reach drive, 5,000 books reached communities in Nigeria — part of our mission to bridge the gap between urban and rural areas in Africa.",
    author: "COFY Newsroom",
    date: "2026-05-30",
    readTime: "3 min read",
    category: "Announcement",
    gradient: "from-brand-blue-dark to-brand-blue-deep",
    art: "books",
  },
  {
    id: "news-booksmiles",
    type: "news",
    title: "5,000 Books for Life — Our Partnership with BookSmiles",
    excerpt:
      "In partnership with BookSmiles.org, we're bringing books to schools and libraries in rural African communities. Every donation counts — send a Smile today!",
    author: "COFY Newsroom",
    date: "2026-04-18",
    readTime: "4 min read",
    category: "Partnership",
    gradient: "from-brand-yellow-light to-brand-yellow",
    art: "outreach",
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
  },
];

export const mediaFilters: { label: string; value: MediaType | "all" }[] = [
  { label: "All Stories", value: "all" },
  { label: "Daily Vlogs", value: "vlog" },
  { label: "Blog", value: "blog" },
  { label: "News", value: "news" },
];
