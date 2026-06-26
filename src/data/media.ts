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
  /** Tailwind gradient classes used for the thumbnail */
  gradient: string;
  featured?: boolean;
};

export const mediaItems: MediaItem[] = [
  {
    id: "vlog-day-12",
    type: "vlog",
    title: "Daily Vlog #12 — A Morning at the Library Learning Lab",
    excerpt:
      "Follow our mentors and youth through a hands-on morning of reading circles, art and big laughs at the public library.",
    author: "COFY Media Team",
    date: "2026-06-24",
    duration: "8:42",
    category: "Daily Vlog",
    gradient: "from-brand-blue to-brand-blue-dark",
    featured: true,
  },
  {
    id: "blog-strengths",
    type: "blog",
    title: "5 Ways We Build Care Plans Around a Child's Strengths",
    excerpt:
      "Strengths-based care isn't a buzzword — it's how we help every young person see what they're capable of. Here's our approach.",
    author: "Dr. A. Reed",
    date: "2026-06-22",
    readTime: "6 min read",
    category: "Programs",
    gradient: "from-brand-yellow to-brand-yellow-light",
  },
  {
    id: "news-scholarship",
    type: "news",
    title: "COFY Awards 12 New Scholarships This Spring",
    excerpt:
      "Twelve determined students received need-based scholarships to continue their education — meet a few of this year's recipients.",
    author: "COFY Newsroom",
    date: "2026-06-18",
    readTime: "3 min read",
    category: "Announcement",
    gradient: "from-brand-blue-dark to-brand-blue-deep",
  },
  {
    id: "vlog-park-day",
    type: "vlog",
    title: "Daily Vlog #11 — Park Day Adventures & Team Games",
    excerpt:
      "Sunshine, teamwork and inclusive games in the park. See how outdoor play builds confidence and friendships.",
    author: "COFY Media Team",
    date: "2026-06-21",
    duration: "11:05",
    category: "Daily Vlog",
    gradient: "from-brand-blue to-brand-yellow",
  },
  {
    id: "blog-family-advocacy",
    type: "blog",
    title: "A Parent's Guide to Advocating for Your Child at School",
    excerpt:
      "Navigating IEPs, meetings and paperwork can feel overwhelming. Our family advocates share their go-to playbook.",
    author: "M. Okafor",
    date: "2026-06-15",
    readTime: "8 min read",
    category: "Family Resources",
    gradient: "from-brand-blue-light to-brand-blue",
  },
  {
    id: "news-partnership",
    type: "news",
    title: "New Partnership Brings Free Books to 3 More Communities",
    excerpt:
      "Our educational outreach is expanding — thousands of books are headed to families thanks to a new community partnership.",
    author: "COFY Newsroom",
    date: "2026-06-10",
    readTime: "4 min read",
    category: "Partnership",
    gradient: "from-brand-yellow-light to-brand-yellow",
  },
  {
    id: "vlog-mentor-spotlight",
    type: "vlog",
    title: "Daily Vlog #10 — Mentor Spotlight: Meet Coach Daniel",
    excerpt:
      "Spend a day with mentor Daniel as he shares why showing up for youth changed his life as much as theirs.",
    author: "COFY Media Team",
    date: "2026-06-08",
    duration: "9:18",
    category: "Daily Vlog",
    gradient: "from-brand-blue-deep to-brand-blue",
  },
  {
    id: "blog-inclusive-play",
    type: "blog",
    title: "Why Inclusive Play Matters More Than You Think",
    excerpt:
      "Play is where belonging begins. We unpack the research and the real-world moments behind inclusive recreation.",
    author: "Dr. A. Reed",
    date: "2026-06-04",
    readTime: "5 min read",
    category: "Insights",
    gradient: "from-brand-yellow to-brand-blue",
  },
  {
    id: "news-volunteer-drive",
    type: "news",
    title: "Volunteer Drive: 40 New Mentors Join the COFY Family",
    excerpt:
      "Our largest volunteer cohort yet completed training this month and is ready to make a difference. Welcome aboard!",
    author: "COFY Newsroom",
    date: "2026-05-29",
    readTime: "2 min read",
    category: "Community",
    gradient: "from-brand-blue to-brand-blue-light",
  },
];

export const mediaFilters: { label: string; value: MediaType | "all" }[] = [
  { label: "All Stories", value: "all" },
  { label: "Daily Vlogs", value: "vlog" },
  { label: "Blog", value: "blog" },
  { label: "News", value: "news" },
];
