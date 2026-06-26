import { Link } from "react-router-dom";
import { Target, Eye, Heart, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
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
        eyebrow="About COFY"
        title="Opening doors for youth who need it most"
        description={site.mission}
      />

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/20" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] bg-brand-blue-deep p-10">
                <div className="absolute inset-0 bg-hero-radial opacity-70" aria-hidden />
                <img
                  src={logo}
                  alt="COFY inc. logo"
                  className="relative mx-auto w-1/2 rounded-3xl shadow-2xl ring-1 ring-white/20"
                />
                <p className="relative mt-8 text-center font-display text-xl font-bold text-white">
                  "Creating Opportunities for Youth"
                </p>
                <p className="relative mt-2 text-center text-sm text-white/70">
                  Transformational education & support since day one.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">Our Mission</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  To provide transformational education and support to those who
                  need it most — empowering youth with developmental delays and
                  their families to thrive in the real world.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20 text-primary">
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
                <div className="card-lift h-full rounded-2xl border border-border bg-card p-7 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
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
                  className="rounded-2xl border border-border bg-gradient-to-br from-card to-brand-cream p-7 text-center"
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

      {/* CTA */}
      <section className="container-cofy">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-primary px-8 py-12 text-center text-white sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Want to be part of the story?
              </h2>
              <p className="mt-2 text-white/80">
                Donate, volunteer or partner with us to create opportunity.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
            >
              <Link to="/get-involved">
                <Heart className="mr-1 h-5 w-5" />
                Get Involved
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default About;
