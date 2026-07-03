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
  serves: ["Online", "Homes", "Churches", "Public Libraries", "Parks"],
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Mission", to: "/about" },
  { label: "Projects", to: "/programs" },
  { label: "Blog", to: "/media" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
];

export const socials: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
];

export const impactStats = [
  { value: 350, suffix: "+", label: "Youth & families supported" },
  { value: 1200, suffix: "+", label: "Learning resources shared" },
  { value: 48, suffix: "", label: "Scholarships awarded" },
  { value: 5, suffix: "", label: "Community venues served" },
];
