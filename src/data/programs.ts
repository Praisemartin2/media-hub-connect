import {
  HeartHandshake,
  BookOpen,
  Globe2,
  Accessibility,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

import type { ArtVariant } from "@/components/art/Illustration";

export type Program = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  highlights: string[];
  /** Brand illustration variant for hero/cards */
  art: ArtVariant;
  /** Headline impact stat for the program page */
  stat: { value: number; suffix: string; label: string };
  /** A voice from the program */
  quote: { text: string; name: string; role: string };
  /** Plain-language "how you can help" line */
  engage: string;
};

export const programs: Program[] = [
  {
    slug: "disability-support",
    title: "Disability Support",
    icon: Accessibility,
    summary:
      "Empowering families with special needs children through resources and opportunities for growth.",
    description:
      "Our disability support program empowers families with special needs children by providing resources and opportunities for growth. Our dedicated Educators and Service Providers ensure every child receives the support they need to reach their full potential through advocacy, services and education. With your support, we bring hope to families and create brighter futures for special needs children.",
    highlights: [
      "Individualized, strengths-based care plans",
      "Family advocacy & navigation support",
      "Inclusive social and life-skills sessions",
    ],
    art: "disability",
    stat: { value: 120, suffix: "+", label: "families supported each year" },
    quote: {
      text: "For the first time, my son sees himself as capable. That changes everything.",
      name: "Maria T.",
      role: "Parent",
    },
    engage: "Sponsor a family's support plan or volunteer as a session helper.",
  },
  {
    slug: "educational-opportunities",
    title: "Empowering Youth through Education",
    icon: BookOpen,
    summary:
      "Opportunities for Educators, Youth with disabilities, and their caretakers.",
    description:
      "Our mission is to create opportunities for Educators, Youth with disabilities, and their caretakers. We offer webinars, panel discussions, courses, and educational resources to support their learning journey, especially for those in need.",
    highlights: [
      "Webinars & panel discussions",
      "Courses for educators and caretakers",
      "Educational resources for youth in need",
    ],
    art: "education",
    stat: { value: 1200, suffix: "+", label: "books and learning resources shared" },
    quote: {
      text: "The first book that was truly hers changed how my daughter feels about reading.",
      name: "Denise W.",
      role: "Parent",
    },
    engage: "Donate books and supplies, or fund a child's learning kit.",
  },
  {
    slug: "international-outreach",
    title: "Funding Learning Opportunities",
    icon: Globe2,
    summary:
      "Equal educational opportunities for all children — with access to books and learning resources.",
    description:
      "Our funding program helps provide equal educational opportunities to all children, with a focus on access to books and learning resources. By donating, you can bridge the gap between urban and rural areas in Africa and give children the tools they need to succeed. Join us in creating brighter futures for youth and families in need. Every donation counts.",
    highlights: [
      "Access to books & learning resources",
      "Bridging urban and rural areas in Africa",
      "Every donation counts",
    ],
    art: "outreach",
    stat: { value: 48, suffix: "", label: "scholarships awarded to students in need" },
    quote: {
      text: "The scholarship kept me in school when my family could not. I will pay it forward.",
      name: "Samuel A.",
      role: "Scholarship Recipient",
    },
    engage: "Fund a scholarship or connect us with a partner school abroad.",
  },
  {
    slug: "mentorship",
    title: "Academic & Life Skills",
    icon: Users,
    summary:
      "Helping youth transition into college, career, and independent living.",
    description:
      "COFY supports youth and young adults with academic and life skills to enable them to transition into college, career, and independent living. Our curriculum covers social skills, self-advocacy, health and wellness, self-management, independent living, and leadership.",
    highlights: [
      "Social skills & self-advocacy",
      "Health, wellness & self-management",
      "Independent living & leadership",
    ],
    art: "mentorship",
    stat: { value: 40, suffix: "+", label: "trained mentors showing up every week" },
    quote: {
      text: "My mentor showed up for me every single week. Now I set goals I actually reach.",
      name: "Jamal R.",
      role: "Youth Participant",
    },
    engage: "Become a mentor — a few hours a week changes a life (training provided).",
  },
];

export const values: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Compassion First",
    description:
      "We lead with empathy, meeting every youth and family with dignity and warmth.",
    icon: HeartHandshake,
  },
  {
    title: "Inclusion for All",
    description:
      "Every ability is an opportunity. We build spaces where everyone belongs.",
    icon: Accessibility,
  },
  {
    title: "Education that Transforms",
    description:
      "Knowledge changes lives. We remove barriers between youth and learning.",
    icon: GraduationCap,
  },
  {
    title: "Stronger Together",
    description:
      "Real change happens in community — families, mentors and partners as one.",
    icon: Users,
  },
];
