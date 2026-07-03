import { Accessibility as AccessibilityIcon, Keyboard, Eye, Captions, MessageCircle, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { SEO } from "@/components/shared/SEO";
import { site } from "@/data/site";

const commitments = [
  {
    icon: Eye,
    title: "Easy to see",
    text: "Strong color contrast, large readable text, and clear headings on every page.",
  },
  {
    icon: Keyboard,
    title: "Easy to navigate",
    text: "Everything works with a keyboard alone. A visible focus ring shows where you are, and a skip link jumps straight to the content.",
  },
  {
    icon: Captions,
    title: "Easy to hear and watch",
    text: "Videos include captions. Background video can be paused at any time, and motion is reduced if your device asks for it.",
  },
  {
    icon: MessageCircle,
    title: "Easy to understand",
    text: "We write in plain language and avoid jargon, because our community includes young people with developmental delays and their families.",
  },
];

const Accessibility = () => {
  return (
    <>
      <SEO
        title="Accessibility — Creating Opportunities for Youth Inc."
        description="COFY's accessibility statement: our commitment to a website every person can see, navigate, watch and understand."
      />
      <PageHero
        eyebrow="Accessibility"
        title="A website for every person"
        description="Inclusion is our mission — online too. This site is designed to meet WCAG 2.2 AA so that everyone can use it, whatever their abilities."
      />

      <section className="py-16 lg:py-24">
        <div className="container-cofy">
          <div className="grid gap-6 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="card-lift h-full rounded-lg border border-border bg-card p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold">{c.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="mt-12 rounded-lg bg-brand-cream p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <AccessibilityIcon className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    Found something hard to use?
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    Accessibility is never finished. If any part of this website is
                    difficult for you, please tell us — we will fix it. Your feedback
                    makes this site better for everyone.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {site.email}
                    </a>
                    <a
                      href={site.phoneHref}
                      className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Accessibility;
