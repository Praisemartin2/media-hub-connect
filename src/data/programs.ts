import {
  HeartHandshake,
  BookOpen,
  Globe2,
  Accessibility,
  Users,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  highlights: string[];
};

export const programs: Program[] = [
  {
    slug: "disability-support",
    title: "Disability Support",
    icon: Accessibility,
    summary:
      "Empowering families with special-needs children to reach their full potential.",
    description:
      "Our flagship program walks alongside youth with developmental delays and their families. Through advocacy, one-on-one support services and strengths-based education, we help every young person build the skills and confidence to thrive in the real world.",
    highlights: [
      "Individualized, strengths-based care plans",
      "Family advocacy & navigation support",
      "Inclusive social and life-skills sessions",
    ],
  },
  {
    slug: "educational-opportunities",
    title: "Educational Opportunities",
    icon: BookOpen,
    summary:
      "Equal access to books and learning resources for every child.",
    description:
      "We believe a great education should never depend on a zip code or income. Our funding program puts books, supplies and learning tools directly into the hands of children who need them most — closing gaps and opening doors.",
    highlights: [
      "Free books & learning materials",
      "Tutoring and homework support",
      "Digital learning access",
    ],
  },
  {
    slug: "international-outreach",
    title: "International Outreach",
    icon: Globe2,
    summary:
      "Education outreaches and scholarships for students in need worldwide.",
    description:
      "COFY's heart reaches beyond our community. We partner on education outreaches abroad and award scholarships to determined students who simply need an opportunity to keep learning and growing.",
    highlights: [
      "Need-based scholarships",
      "Global education partnerships",
      "Mentorship across borders",
    ],
  },
  {
    slug: "mentorship",
    title: "Mentorship & Life Skills",
    icon: Users,
    summary:
      "Caring mentors guiding youth toward independence and confidence.",
    description:
      "Every young person deserves someone in their corner. Our mentors meet youth where they are — online, at home, at the library or in the park — to build life skills, set goals and celebrate every win along the way.",
    highlights: [
      "Goal-setting & coaching",
      "Confidence & social skills",
      "Flexible, youth-led pacing",
    ],
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
