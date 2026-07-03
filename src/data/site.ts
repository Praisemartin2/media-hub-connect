import { Facebook, Instagram, Youtube, Linkedin, type LucideIcon } from "lucide-react";

export const site = {
  name: "Creating Opportunities for Youth Inc.",
  shortName: "COFY inc.",
  tagline: "Helping Together.",
  taglineRef: "(2 Corinthians 1:11)",
  mission:
    "We support youth with special needs and their families through educational programs and service providers.",
  aboutIntro:
    "COFY is a registered nonprofit, non-governmental organization in the state of New Jersey. COFY is a community-based organization that strives to support youth with developmental delays and their families, helping them to thrive in the real world. We provide treatment plans and care based on the strengths and needs of individuals.",
  aboutSkills:
    "COFY supports youth and young adults with academic and life skills to enable them to transition into college, career, and independent living. Our curriculum covers social skills, self-advocacy, health and wellness, self-management, independent living, and leadership.",
  email: "cofyincorporated@gmail.com",
  phone: "(732) 844-9392",
  phoneHref: "tel:+17328449392",
  website: "www.cofyouth.org",
  address: "7 Woodbridge Ave, Sewaren, NJ 07077",
  serves: ["Online", "Homes", "Churches", "Public Libraries", "Parks"],
};

export const navLinks = [
  { label: "Mission", to: "/about" },
  { label: "What's On", to: "/events" },
  { label: "Projects", to: "/programs" },
  { label: "Stories", to: "/media" },
  { label: "Support Us", to: "/get-involved" },
];

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export const impactStats = [
  { value: 5000, suffix: "", label: "Books for rural communities in Africa" },
  { value: 100, suffix: "%", label: "Events & services free of charge" },
  { value: 4, suffix: "", label: "Educational webinars every year" },
  { value: 17, suffix: "", label: "Ages served — youth 5 to 21" },
];
