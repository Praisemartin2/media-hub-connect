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

// "Today" reference for the site: 2026-06-25
export const events: COFYEvent[] = [
  // Upcoming — COFY's recurring annual activities
  {
    id: "educational-outreach-week",
    title: "Educational Outreach Week",
    date: "2026-07-13",
    endDate: "2026-07-17",
    time: "9:00 AM – 1:00 PM",
    location: "Community venues & online",
    venue: "Various",
    description:
      "Our annual summer week of hands-on learning opportunities for members. Free of charge, as are all COFY events and services.",
    category: "Workshop",
    gradient: "from-brand-blue to-brand-blue-dark",
    registerUrl: "#register",
  },
  {
    id: "educational-summit-2026-abuja",
    title: "Educational Summit 2026 — Abuja",
    date: "2026-08-05",
    endDate: "2026-08-07",
    time: "8:00 AM – 5:00 PM",
    location: "Abuja, FCT, Nigeria",
    venue: "Anglican Girls' Grammar School, Apo 1, Gudu District",
    description:
      "A three-day Professional Development Workshop for Educators. Theme: Teaching How They Learn — Special Education Conversations. Reaching schools with transformational education.",
    category: "Workshop",
    gradient: "from-brand-blue to-brand-blue-dark",
    registerUrl: "#register",
  },
  {
    id: "educational-summit-2026-imo",
    title: "Educational Summit 2026 — Imo State",
    date: "2026-08-10",
    endDate: "2026-08-11",
    time: "8:00 AM – 4:00 PM",
    location: "Owerri, Imo State, Nigeria",
    venue: "Federal Government Girls' College, Owerri",
    description:
      "A two-day Professional Development Workshop for Educators — featuring the T.O.T.A.L.-36+ Project launch, mentorship sessions and project-based learning.",
    category: "Workshop",
    gradient: "from-brand-yellow to-brand-yellow-light",
    registerUrl: "#register",
  },
  {
    id: "educational-summit-2026-abia",
    title: "Educational Summit 2026 — Abia State",
    date: "2026-08-13",
    endDate: "2026-08-14",
    time: "8:00 AM – 4:30 PM",
    location: "Umuahia, Abia State, Nigeria",
    venue: "Bertram American International School, Ikot Ekpene Road, Umuahia",
    description:
      "A two-day Professional Development Workshop for Educators — understanding neurodiversity, differentiated instruction in inclusive classrooms, multiple intelligences, a book fair and a PBL showcase.",
    category: "Workshop",
    gradient: "from-brand-blue-dark to-brand-blue-deep",
    registerUrl: "#register",
  },
  {
    id: "quarterly-webinar-q3",
    title: "Quarterly Educational Webinar for Teachers, Parents & Caregivers",
    date: "2026-09-17",
    time: "6:00 PM – 8:00 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "Our quarterly webinar series supports the people who support our youth — practical strategies from experienced educators.",
    category: "Workshop",
    gradient: "from-brand-yellow to-brand-yellow-light",
    registerUrl: "#register",
  },
  {
    id: "read-for-reach-2026",
    title: "Read for Reach — Book Drive",
    date: "2026-08-01",
    endDate: "2026-10-31",
    time: "All season",
    location: "Collection points & online giving",
    venue: "Citywide",
    description:
      "Help us gather and fund books for rural communities in Africa, in partnership with BookSmiles.org. Every donation counts.",
    category: "Outreach",
    gradient: "from-brand-blue-dark to-brand-blue-deep",
    registerUrl: "#register",
  },
  // Past events
  {
    id: "autism-awareness-panel-2026",
    title: "Autism Awareness Discussion Panel",
    date: "2026-04-10",
    time: "6:00 PM – 8:00 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "Celebrating Autism Awareness Month with an honest panel conversation among educators, parents and caregivers.",
    category: "Community",
    gradient: "from-brand-blue to-brand-blue-light",
  },
  {
    id: "achievement-gap-webinar",
    title: "Closing the Achievement Gap Through Data-Driven Instruction",
    date: "2026-01-22",
    time: "6:00 PM – 7:30 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "A professional webinar for educators on using data-driven instruction to close achievement gaps.",
    category: "Workshop",
    gradient: "from-brand-blue-light to-brand-blue",
  },
  {
    id: "prof-dev-workshop-3",
    title: "Professional Developmental Workshop 3",
    date: "2023-06-23",
    time: "9:00 AM – 4:00 PM",
    location: "Online (Zoom)",
    venue: "Virtual",
    description:
      "The third in our professional development series for educators of students with disabilities.",
    category: "Workshop",
    gradient: "from-brand-yellow-light to-brand-yellow",
  },
  {
    id: "roadmap-with-tech",
    title: "Roadmap with Tech",
    date: "2023-04-01",
    endDate: "2023-10-31",
    time: "Program series",
    location: "Online",
    venue: "Virtual",
    description:
      "A multi-month technology roadmap program helping youth build digital skills for college and career.",
    category: "Workshop",
    gradient: "from-brand-blue to-brand-yellow",
  },
  {
    id: "read-for-reach-2023",
    title: "Read for Reach",
    date: "2023-03-01",
    endDate: "2023-08-31",
    time: "All season",
    location: "Nigeria outreach",
    venue: "International",
    description:
      "Our book drive delivered 5,000 donated books to communities in Nigeria.",
    category: "Outreach",
    gradient: "from-brand-blue-deep to-brand-blue",
  },
];
