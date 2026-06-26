import { Facebook, Instagram, Youtube, Linkedin, type LucideIcon } from "lucide-react";

export const site = {
  name: "Creating Opportunities for Youth Inc.",
  shortName: "COFY inc.",
  tagline: "Creating Opportunities for Youth",
  mission:
    "We provide transformational education and support to those who need it most — empowering youth with developmental delays and their families to thrive in the real world.",
  email: "cofyincorporated@gmail.com",
  phone: "(732) 844-9392",
  phoneHref: "tel:+17328449392",
  website: "www.cofyouth.org",
  serves: ["Online", "Homes", "Churches", "Public Libraries", "Parks"],
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Media Hub", to: "/media" },
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
