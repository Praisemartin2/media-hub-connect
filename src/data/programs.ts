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
  /** Optional dedicated campaign page for this program */
  campaign?: { label: string; to: string };
  /** Real, clickable help resources available in New Jersey */
  resources?: { name: string; url: string; blurb: string }[];
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
      "Excellent care — tailored treatment plans built on each person's strengths and needs",
      "Whole-person support — emotional and mental well-being, not just physical needs",
      "Satisfaction — we seek family feedback and use it to improve our programs",
    ],
    art: "disability",
    stat: { value: 120, suffix: "+", label: "families supported each year" },
    quote: {
      text: "For the first time, my son sees himself as capable. That changes everything.",
      name: "Maria T.",
      role: "Parent",
    },
    engage: "Live your best life — sponsor a family's support plan or volunteer with our service providers.",
    resources: [
      {
        name: "PerformCare NJ — Children's System of Care",
        url: "https://www.performcarenj.org/families/disability",
        blurb: "New Jersey's single entry point for services for children with intellectual and developmental disabilities, up to age 21. Call 1-877-652-7624, 24/7.",
      },
      {
        name: "NJ Division of Developmental Disabilities (DDD)",
        url: "https://www.nj.gov/humanservices/ddd/",
        blurb: "Public funding and supports for New Jersey adults with intellectual and developmental disabilities, age 21 and older.",
      },
      {
        name: "The Arc of New Jersey",
        url: "https://www.arcnj.org/",
        blurb: "The state's largest advocacy and service organization for children and adults with intellectual and developmental disabilities and their families.",
      },
      {
        name: "Autism New Jersey",
        url: "https://autismnj.org/",
        blurb: "Statewide network of parents and professionals — helpline, referrals and guidance for families affected by autism. Call 800-4-AUTISM.",
      },
      {
        name: "SPAN Parent Advocacy Network",
        url: "https://spanadvocacy.org/",
        blurb: "Free training and one-on-one support for NJ families navigating special education, health and transition to adult life.",
      },
    ],
  },
  {
    slug: "educational-opportunities",
    title: "Empowering Youth through Education",
    icon: BookOpen,
    summary:
      "Opportunities for Educators, Youth with disabilities, and their caretakers.",
    description:
      "Education is the key to unlocking future opportunities. We provide high-quality, transformational education to youth aged 5–21 through research-based identification and intervention methods — plus webinars, panel discussions, courses and resources for Educators, Youth with disabilities, and their caretakers.",
    highlights: [
      "Vocational training, college prep, mentoring & professional development for educators",
      "Quarterly educational webinars for teachers, parents and caregivers",
      "All events and services free of charge to recipients",
    ],
    art: "education",
    stat: { value: 1200, suffix: "+", label: "books and learning resources shared" },
    quote: {
      text: "The first book that was truly hers changed how my daughter feels about reading.",
      name: "Denise W.",
      role: "Parent",
    },
    engage: "Donate books and supplies, or fund a child's learning kit.",
    resources: [
      {
        name: "New Jersey Tutoring Corps",
        url: "https://njtutoringcorps.org/",
        blurb: "High-impact math and reading tutoring for academically vulnerable K–8 students across New Jersey.",
      },
      {
        name: "NJ DOE — Office of Special Education",
        url: "https://www.nj.gov/education/specialed/",
        blurb: "State guidance on IEPs, special education programs and parent rights in New Jersey public schools.",
      },
      {
        name: "SPAN Parent Advocacy Network",
        url: "https://spanadvocacy.org/",
        blurb: "Help for families navigating special education services and school meetings — free workshops and advocates.",
      },
      {
        name: "NJ 211",
        url: "https://www.nj211.org/",
        blurb: "Free, confidential helpline connecting New Jersey families to local education, food, housing and family services. Dial 2-1-1.",
      },
    ],
  },
  {
    slug: "international-outreach",
    title: "Funding Learning Opportunities",
    icon: Globe2,
    summary:
      "Equal educational opportunities for all children — with access to books and learning resources.",
    description:
      "5,000 Books for Life: in partnership with BookSmiles.org, we are working to bring 5,000 books to rural communities in Africa. Access to books and learning resources is essential for children to reach their full potential — your donation purchases and distributes books to schools and libraries that need them most. Every donation, no matter the size, makes a difference. Send a Smile today!",
    highlights: [
      "5,000 books for rural communities in Africa",
      "In partnership with BookSmiles.org",
      "Every donation counts — no matter the size",
    ],
    art: "outreach",
    stat: { value: 5000, suffix: "", label: "books for rural communities in Africa" },
    quote: {
      text: "The scholarship kept me in school when my family could not. I will pay it forward.",
      name: "Samuel A.",
      role: "Scholarship Recipient",
    },
    engage: "Fund a scholarship or connect us with a partner school abroad.",
    campaign: { label: "Explore 5,000 Books for Life", to: "/books" },
    resources: [
      {
        name: "BookSmiles",
        url: "https://booksmiles.org/",
        blurb: "Our 5,000 Books for Life partner — a South Jersey book bank that puts donated books into children's hands. Donate books or volunteer.",
      },
      {
        name: "Bridge of Books Foundation",
        url: "https://bridgeofbooksfoundation.org/",
        blurb: "Volunteer-led NJ nonprofit that has provided over a million books to underserved children throughout New Jersey.",
      },
      {
        name: "NJ 211",
        url: "https://www.nj211.org/",
        blurb: "Find local literacy programs, libraries and family services anywhere in New Jersey. Dial 2-1-1.",
      },
    ],
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
    resources: [
      {
        name: "NJ Division of Vocational Rehabilitation Services (DVRS)",
        url: "https://www.nj.gov/labor/career-services/special-services/individuals-with-disabilities/",
        blurb: "Helps students with disabilities (from age 14) prepare for, find and keep a job — including services during the last two years of high school.",
      },
      {
        name: "The Boggs Center at Rutgers",
        url: "https://boggscenter.rwjms.rutgers.edu/",
        blurb: "New Jersey's University Center for Excellence in Developmental Disabilities — transition-to-adult-life resources and training.",
      },
      {
        name: "NJ DDD — Transition from School to Adult Life",
        url: "https://www.nj.gov/humanservices/ddd/individuals/transition/",
        blurb: "State guide for families planning the move from school services to adult supports at age 21.",
      },
      {
        name: "PerformCare NJ",
        url: "https://www.performcarenj.org/",
        blurb: "Entry point for New Jersey youth services — behavioral health, IDD supports and care coordination up to age 21.",
      },
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
