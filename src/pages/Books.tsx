import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  HandHeart,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { StatCounter } from "@/components/shared/StatCounter";
import { Sunburst } from "@/components/shared/Sunburst";
import { PhotoImg } from "@/components/shared/PhotoImg";
import { SEO } from "@/components/shared/SEO";
import { programs } from "@/data/programs";

const steps = [
  {
    icon: BookOpen,
    title: "Donate books",
    text: "In partnership with BookSmiles.org — send a Smile today and put books directly into children's hands.",
    href: "https://booksmiles.org",
    external: true,
    cta: "Visit BookSmiles",
  },
  {
    icon: Heart,
    title: "Give",
    text: "Your donation purchases and distributes books to schools and libraries that need them most.",
    href: "/get-involved",
    external: false,
    cta: "Support the campaign",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    text: "Mentor a young person, support events, or share a professional skill.",
    href: "/get-involved#volunteer",
    external: false,
    cta: "Join the team",
  },
];

/**
 * Dedicated campaign page for 5,000 Books for Life. All narrative copy
 * comes from the Funding Learning Opportunities program data.
 */
const Books = () => {
  const program = programs.find((p) => p.slug === "international-outreach")!;

  return (
    <>
      <SEO
        title="5,000 Books for Life — COFY Campaign"
        description={program.summary}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-20 text-secondary-foreground lg:py-28">
        <Sunburst className="absolute -top-4 right-8 w-56 text-black/20" />
        <div className="container-cofy relative">
          <p className="eyebrow font-display text-black/60">Featured Campaign</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-medium uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            5,000 Books
            <br />
            for Life
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-black/80">
            In partnership with BookSmiles.org, we are working to bring 5,000
            books to rural communities in Africa.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
            >
              <a href="https://booksmiles.org" target="_blank" rel="noreferrer">
                Donate books via BookSmiles
                <ArrowUpRight className="ml-1 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg">
              <Link to="/get-involved">
                Give today
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Narrative + goal */}
      <section className="py-16 lg:py-24">
        <div className="container-cofy grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                What this campaign is
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {program.description}
              </p>
              <ul className="mt-8 space-y-4">
                {program.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-lg font-medium text-foreground"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-lg bg-primary p-8 text-center text-white">
              <p className="text-sm font-bold uppercase tracking-wider text-white/80">
                Our goal
              </p>
              <p className="mt-2 font-display text-6xl font-extrabold text-secondary">
                <StatCounter value={5000} />
              </p>
              <p className="mt-2 text-white/85">
                books for rural communities in Africa
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo band */}
      <section className="bg-brand-cream py-16 lg:py-20">
        <div className="container-cofy grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="bg-brand-sky p-5 sm:p-8">
              <PhotoImg id="books" className="w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="bg-white p-5 sm:p-8">
              <PhotoImg id="outreach" className="w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How to help */}
      <section className="py-16 lg:py-24">
        <div className="container-cofy">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            How you can help
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="card-lift flex h-full flex-col rounded-lg border border-border bg-card p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                  {step.external ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      {step.cta}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      to={step.href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      {step.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Books;
