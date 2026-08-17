import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  HandHeart,
  Gift,
  Building2,
  Megaphone,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/shared/SEO";
import { PhotoImg } from "@/components/shared/PhotoImg";
import { DonateButton } from "@/components/donate/DonateButton";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { toast } from "sonner";
import { submitForm, formValues, openMailFallback } from "@/lib/forms";

const amounts = [25, 50, 100, 250];
const impactByAmount: Record<number, string> = {
  25: "Provides books & learning materials for one child",
  50: "Funds a week of inclusive after-school play",
  100: "Supports a family advocacy session",
  250: "Helps fund a student scholarship",
};

const ways = [
  {
    icon: HandHeart,
    title: "Volunteer",
    text: "Mentor a young person, support events, or share a professional skill.",
  },
  {
    icon: Gift,
    title: "Donate Resources",
    text: "Contribute books, supplies and learning tools for our programs.",
  },
  {
    icon: Building2,
    title: "Partner With Us",
    text: "Bring your organization alongside our outreach and education work.",
  },
  {
    icon: Megaphone,
    title: "Spread the Word",
    text: "Follow, share and champion opportunity for youth in your network.",
  },
];

const GetInvolved = () => {
  const [selected, setSelected] = useState(50);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);

  const amount = custom ? Number(custom) : selected;

  return (
    <>
      <SEO
        title="Get Involved — Donate & Volunteer | COFY"
        description="Donate, volunteer or partner with Creating Opportunities for Youth. Every gift and every hour helps a young person thrive."
      />
      <PageHero
        eyebrow="Get Involved"
        photo="outreach"
        title="Be the opportunity in a young person's story"
        description="Whether you give, volunteer or partner, you help us open doors for youth who need it most."
      />

      {/* Donation */}
      <section id="donate" className="scroll-mt-20 py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Make a Gift"
              title="Your generosity creates opportunity"
              description="Every contribution goes directly toward education, support and inclusion for youth and families."
            />
            <div className="mt-8 space-y-4">
              {Object.entries(impactByAmount).map(([amt, impact]) => (
                <div
                  key={amt}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary/20 font-display font-bold text-primary">
                    ${amt}
                  </span>
                  <span className="text-sm text-muted-foreground">{impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donation card */}
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-7 sm:p-9">
              <div className="mb-6 flex border border-border bg-muted p-1">
                <button
                  onClick={() => setMonthly(false)}
                  className={cn(
                    "flex-1 py-2.5 font-display text-lg font-medium transition-all",
                    !monthly ? "bg-primary text-white" : "text-foreground/60",
                  )}
                >
                  One-time
                </button>
                <button
                  onClick={() => setMonthly(true)}
                  className={cn(
                    "flex-1 py-2.5 font-display text-lg font-medium transition-all",
                    monthly ? "bg-primary text-white" : "text-foreground/60",
                  )}
                >
                  Monthly
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelected(amt);
                      setCustom("");
                    }}
                    className={cn(
                      "rounded-lg border-2 py-4 font-display text-lg font-bold transition-all",
                      !custom && selected === amt
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-foreground hover:border-primary/40",
                    )}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  Or enter a custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    min={1}
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Custom"
                    className="h-12 pl-8 text-lg font-semibold"
                  />
                </div>
              </div>

              {amount > 0 && impactByAmount[amount] && (
                <p className="mt-4 border-l-0 bg-secondary/15 p-3 text-sm text-foreground">
                  {impactByAmount[amount]}
                </p>
              )}

              <DonateButton amount={amount} monthly={monthly} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5,000 Books for Life campaign */}
      <section className="relative overflow-hidden bg-primary py-16 text-white lg:py-20">
        <div className="container-cofy grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow font-display text-white/80">Featured Campaign</p>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              5,000 Books for Life
            </h2>
            <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-white/90">
              In partnership with{" "}
              <a
                href="https://booksmiles.org"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4 hover:text-secondary"
              >
                BookSmiles.org
              </a>
              , we're bringing 5,000 books to rural communities in Africa. Your
              contribution goes toward purchasing and distributing books to
              schools and libraries that need them most. Every donation, no
              matter the size, makes a difference. Send a Smile today!
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-none bg-secondary font-bold text-secondary-foreground hover:bg-brand-yellow-light"
              >
                <Link to="/books">
                  Explore the campaign
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-auto whitespace-normal border-white py-3 text-white hover:bg-white hover:text-primary"
              >
                <a href="https://booksmiles.org" target="_blank" rel="noreferrer">
                  Donate books via BookSmiles
                  <ArrowUpRight className="ml-1 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          <div className="bg-white p-5 sm:p-8">
            <PhotoImg id="books" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Other ways */}
      <section id="volunteer" className="scroll-mt-20 bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            eyebrow="More Ways to Help"
            title="There's a place for everyone"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((way, i) => (
              <Reveal key={way.title} delay={i * 80}>
                <div className="card-lift h-full rounded-lg border border-border bg-card p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <way.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {way.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {way.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Volunteer signup */}
          <Reveal>
            <div className="mt-12 overflow-hidden rounded-lg bg-primary p-8 text-white sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                    Become a volunteer mentor
                  </h3>
                  <p className="mt-3 text-white/80">
                    Share a few hours a week and change a young person's life.
                    We'll train and support you every step of the way.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {["Flexible scheduling", "Full training provided", "Ongoing support"].map(
                      (b) => (
                        <li key={b} className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 bg-secondary" aria-hidden />
                          {b}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const btn = form.querySelector("button[type=submit]") as HTMLButtonElement | null;
                    if (btn) btn.disabled = true;
                    const ok = (await submitForm("Volunteer interest", formValues(form))) === "sent";
                    if (btn) btn.disabled = false;
                    if (ok) {
                      toast.success("Thanks for your interest!", {
                        description: "Our team will reach out about volunteering soon.",
                      });
                      form.reset();
                    } else {
                      toast.info("Opening your email app instead", {
                        description: `Your details are pre-filled and addressed to ${site.email} — just press send.`,
                      });
                      openMailFallback("Volunteer interest", formValues(form));
                    }
                  }}
                  className="rounded-lg bg-white p-6 text-foreground"
                >
                  <h4 className="font-display text-lg font-bold">
                    Express interest
                  </h4>
                  <div className="mt-4 space-y-3">
                    <Input required name="Full Name" placeholder="Full name" aria-label="Full name" />
                    <Input
                      required
                      name="Email"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                    />
                    <Button
                      type="submit"
                      className="w-full rounded-none font-semibold"
                    >
                      <HandHeart className="mr-1 h-4 w-4" />
                      I want to volunteer
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default GetInvolved;
