export type COFYEvent = {
  id: string;
  title: string;
  date: string; // ISO
  endDate?: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  category: "Workshop" | "Fundraiser" | "Community" | "Outreach" | "Celebration";
  gradient: string;
  registerUrl?: string;
};

// "Today" reference for the demo: 2026-06-25
export const events: COFYEvent[] = [
  {
    id: "summer-learning-camp",
    title: "Summer Learning & Play Camp",
    date: "2026-07-12",
    endDate: "2026-07-16",
    time: "9:00 AM – 1:00 PM",
    location: "Riverside Public Library",
    venue: "Community Hall",
    description:
      "A week of inclusive learning, reading circles, art and team games for youth of all abilities. Free for COFY families.",
    category: "Workshop",
    gradient: "from-brand-blue to-brand-blue-dark",
    registerUrl: "#register",
  },
  {
    id: "family-resource-night",
    title: "Family Resource Night",
    date: "2026-07-24",
    time: "6:00 PM – 8:00 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "An evening for parents and caregivers: school advocacy, navigating services, and a live Q&A with our family advocates.",
    category: "Community",
    gradient: "from-brand-yellow to-brand-yellow-light",
    registerUrl: "#register",
  },
  {
    id: "back-to-school-drive",
    title: "Back-to-School Book & Supply Drive",
    date: "2026-08-15",
    time: "10:00 AM – 3:00 PM",
    location: "Greenfield Community Park",
    venue: "Main Pavilion",
    description:
      "Help us fill backpacks with books and supplies for hundreds of students. Volunteers and donations welcome!",
    category: "Outreach",
    gradient: "from-brand-blue-dark to-brand-blue-deep",
    registerUrl: "#register",
  },
  {
    id: "annual-gala",
    title: "Opportunity Gala 2026",
    date: "2026-09-20",
    time: "6:30 PM – 10:00 PM",
    location: "Grand Riverview Ballroom",
    venue: "Ballroom",
    description:
      "Our signature fundraising celebration — an evening of stories, music and impact in support of youth opportunity.",
    category: "Fundraiser",
    gradient: "from-brand-blue to-brand-yellow",
    registerUrl: "#register",
  },
  // Past events
  {
    id: "spring-scholarship-ceremony",
    title: "Spring Scholarship Ceremony",
    date: "2026-05-30",
    time: "2:00 PM – 4:00 PM",
    location: "St. Mary's Community Center",
    venue: "Auditorium",
    description:
      "We celebrated 12 scholarship recipients and their families — a joyful afternoon of achievement and hope.",
    category: "Celebration",
    gradient: "from-brand-yellow-light to-brand-yellow",
  },
  {
    id: "mentor-training",
    title: "New Mentor Training Cohort",
    date: "2026-05-09",
    time: "9:00 AM – 4:00 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "Forty new mentors completed our inclusive-mentorship training and joined the COFY family.",
    category: "Workshop",
    gradient: "from-brand-blue-light to-brand-blue",
  },
  {
    id: "earth-day-park",
    title: "Earth Day Park Clean-Up & Play",
    date: "2026-04-22",
    time: "10:00 AM – 1:00 PM",
    location: "Greenfield Community Park",
    venue: "North Field",
    description:
      "Youth, families and volunteers gave back to our community green space — and enjoyed games together.",
    category: "Community",
    gradient: "from-brand-blue to-brand-blue-light",
  },
  {
    id: "winter-book-drive",
    title: "Winter Book Drive",
    date: "2026-02-14",
    time: "All day",
    location: "Multiple Libraries",
    venue: "Citywide",
    description:
      "Over 1,200 books were donated and distributed to families across five communities this winter.",
    category: "Outreach",
    gradient: "from-brand-blue-deep to-brand-blue",
  },
];
