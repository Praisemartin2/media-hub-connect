export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "COFY didn't just support my son — they believed in him. For the first time, he sees himself as capable. That changes everything.",
    name: "Maria T.",
    role: "Parent",
    initials: "MT",
  },
  {
    quote:
      "The mentorship program gave me confidence I never knew I had. My mentor showed up for me every single week.",
    name: "Jamal R.",
    role: "Youth Participant",
    initials: "JR",
  },
  {
    quote:
      "As a volunteer, I came to give and ended up receiving so much more. This community is something special.",
    name: "Daniel K.",
    role: "Mentor & Volunteer",
    initials: "DK",
  },
];
