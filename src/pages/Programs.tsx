import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Heart } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/shared/SEO";
import { programs } from "@/data/programs";
import { Illustration } from "@/components/art/Illustration";

const Programs = () => {
  return (
    <>
      <SEO
        title="Our Programs — Creating Opportunities for Youth Inc."
        description="Explore COFY's programs: disability support, educational opportunities, international outreach, and mentorship for youth and families."
      />
      <PageHero
        eyebrow="Our Programs"
        title="Every program removes a barrier"
        description="Four ways we turn challenges into opportunity for youth with developmental delays and the families who love them."
      />

      <section className="py-20 lg:py-28">
        <div className="container-cofy space-y-8">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={i * 60}>
              <div
                id={program.slug}
                className="card-lift grid gap-8 overflow-hidden rounded-3xl border border-border bg-card p-7 lg:grid-cols-[1fr_1.4fr] lg:p-10"
              >
                <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-brand-blue-deep p-8 text-white">
                  <div className="absolute inset-0 opacity-90"><Illustration variant={program.art} label="" /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep/90 via-brand-blue-deep/40 to-transparent" aria-hidden />
                  <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <program.icon className="h-8 w-8" />
                  </span>
                  <h2 className="relative mt-6 font-display text-2xl font-bold sm:text-3xl">
                    {program.title}
                  </h2>
                  <p className="relative mt-3 text-white/85">{program.summary}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-1">
                    {program.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 font-medium text-foreground">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full font-semibold">
                      <Link to={`/programs/${program.slug}`}>
                        Visit program page
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full font-semibold">
                      <Link to="/get-involved">Support this program</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-cofy">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue-deep px-8 py-14 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-hero-radial" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Help us reach more young people
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Every program runs on the generosity of people like you.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
              >
                <Link to="/get-involved">
                  <Heart className="mr-1 h-5 w-5" />
                  Donate to COFY
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Programs;
