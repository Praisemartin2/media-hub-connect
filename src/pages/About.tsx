import { Link } from "react-router-dom";
import { Target, Eye, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PhotoImg } from "@/components/shared/PhotoImg";
import { Reveal } from "@/components/shared/Reveal";
import { StatCounter } from "@/components/shared/StatCounter";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { values } from "@/data/programs";
import { impactStats, site } from "@/data/site";
import logo from "@/assets/cofy-logo.png";

const About = () => {
  return (
    <>
      <SEO
        title="About Us — Creating Opportunities for Youth Inc."
        description="Learn about COFY's mission to empower youth with developmental delays and their families through transformational education and support."
      />
      <PageHero
        eyebrow="Our Mission"
        title="In the spirit of togetherness."
        description="Welcome to COFY, a registered nonprofit organization based in the state of New Jersey. Our mission is to provide educational and life skills support to youth with developmental delays and their families, enabling them to transition successfully into college, careers, and independent living."
      />

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/20" aria-hidden />
              <div className="relative overflow-hidden bg-primary p-10">
                <div className="absolute inset-0 bg-hero-radial opacity-70" aria-hidden />
                <img
                  src={logo}
                  alt="COFY inc. logo"
                  className="relative mx-auto w-1/2 rounded-lg shadow-2xl ring-1 ring-white/20"
                />
                <p className="relative mt-8 text-center font-display text-xl font-bold text-white">
                  "Helping Together." (2 Corinthians 1:11)
                </p>
                <p className="relative mt-2 text-center text-sm text-white/70">
                  Transformational education & support since day one.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-lg border border-border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  We strive to identify and intervene with research-based
                  methods, providing a high standard of care and support
                  through our different programs. All our events and services
                  are offered free of charge to recipients.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-lg border border-border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20 text-primary">
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">Our Vision</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  A world where every young person — regardless of ability or
                  circumstance — has the opportunity, support and encouragement
                  to reach their full potential.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            eyebrow="What Drives Us"
            title="The values behind every opportunity"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="card-lift h-full rounded-lg border border-border bg-card p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-white">
                    <value.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where we serve */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Where We Serve"
              title="Meeting youth wherever they are"
              description="Our work isn't bound to a single building. We show up in the spaces where families already live, learn and play."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {site.serves.map((place) => (
                <span
                  key={place}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {place}
                </span>
              ))}
            </div>
            <ul className="mt-8 space-y-3">
              {[
                "Individualized, strengths-based support",
                "Family advocacy and navigation",
                "Free books and learning resources",
                "Scholarships and international outreach",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="grid grid-cols-2 gap-5">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-gradient-to-br from-card to-brand-cream p-7 text-center"
                >
                  <p className="font-display text-4xl font-extrabold text-primary">
                    <StatCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      {/* Our Team */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            align="left"
            eyebrow="Our Team"
            title="The people behind COFY"
          />

          {/* President */}
          <Reveal>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
              <div className="bg-brand-sky p-5 sm:p-8">
                <PhotoImg id="mentorship" className="w-full object-cover" />
              </div>
              <div>
                <p className="eyebrow font-display">President, Founder & CEO</p>
                <h3 className="mt-2 font-display text-4xl font-medium tracking-tight">
                  Dr. Ngozi Martin-Oguike
                </h3>
                <p className="mt-5 font-serif text-lg leading-relaxed text-foreground/75">
                  A certified teacher of students with disabilities and a
                  learning disability teacher consultant, Ngozi serves as a
                  Learning Disabilities Teacher Consultant at Orange Public
                  Schools, New Jersey, and Assistant Dean of Special Education
                  for Teach-Beyond Transformational Education Services, USA.
                  With a passion for educating the marginalized and vulnerable
                  — locally and internationally — she founded COFY with
                  like-minded educators to create opportunities for youth,
                  especially those with special needs.
                </p>
                <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/75">
                  Born in Benin City, Nigeria, she holds a B.A. Honors from the
                  University of Benin, an M.F.A. from the University of
                  Nigeria, Nsukka, an M.A. in Special Education from Kean
                  University, and a Doctor of Education in Educational
                  Leadership from Bethel University, St. Paul, Minnesota. She
                  is the author of three books.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Board */}
          <Reveal delay={100}>
            <div className="mt-16">
              <h3 className="font-display text-3xl font-medium tracking-tight">
                Board of Directors
              </h3>
              <ul className="mt-8 grid gap-x-10 gap-y-5 font-serif text-lg sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Mr. Praise Martin-Oguike", "Director of Marketing and IT"],
                  ["Mrs. Lorna Akabogu", "Secretary"],
                  ["Venerable Dr. Martin Oguike", "Member"],
                  ["Mrs. Helen Ani", "Member"],
                  ["Ms. Angela Amoatey", "Member"],
                  ["Sandra Uchegbulam", "Member"],
                  ["Mrs. Charity Ezeji", "Finance Officer"],
                ].map(([name, role]) => (
                  <li key={name} className="border-l-2 border-secondary pl-4">
                    <span className="block font-semibold text-foreground">{name}</span>
                    <span className="text-foreground/60">{role}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-lg text-foreground/75">
                <span className="font-semibold text-foreground">Volunteers:</span>{" "}
                Eva-Astoria Martin-Oguike · Seun Olanrewaju
              </p>
            </div>
          </Reveal>

          {/* Join the team */}
          <Reveal delay={150}>
            <div className="mt-16 bg-brand-cream p-8 sm:p-12">
              <h3 className="font-display text-3xl font-medium tracking-tight">
                Join the team
              </h3>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-foreground/75">
                You are invited to join our team at COFY! We are seeking
                educational professionals with good intentions, caregivers of
                youth with special educational needs, or anyone enthusiastic
                about our goals and objectives.
              </p>
              <Button asChild className="mt-7">
                <Link to="/get-involved#volunteer">
                  Get Involved
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
};

export default About;
