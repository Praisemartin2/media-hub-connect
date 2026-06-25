import { useState } from "react";
import {
  Heart,
  HandHeart,
  Users,
  Gift,
  Building2,
  Megaphone,
  Check,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/shared/SEO";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
        title="Be the opportunity in a young person's story"
        description="Whether you give, volunteer or partner, you help us open doors for youth who need it most."
      />

      {/* Donation */}
      <section className="py-20 lg:py-28">
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
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20 font-display font-bold text-primary">
                    ${amt}
                  </span>
                  <span className="text-sm text-muted-foreground">{impact}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donation card */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-primary/5 sm:p-9">
              <div className="mb-6 flex rounded-full bg-muted p-1.5">
                <button
                  onClick={() => setMonthly(false)}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-sm font-semibold transition-all",
                    !monthly ? "bg-primary text-white shadow" : "text-foreground/60",
                  )}
                >
                  One-time
                </button>
                <button
                  onClick={() => setMonthly(true)}
                  className={cn(
                    "flex-1 rounded-full py-2.5 text-sm font-semibold transition-all",
                    monthly ? "bg-primary text-white shadow" : "text-foreground/60",
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
                      "rounded-xl border-2 py-4 font-display text-lg font-bold transition-all",
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
                <p className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/15 p-3 text-sm text-foreground">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {impactByAmount[amount]}
                </p>
              )}

              <Button
                size="lg"
                onClick={() =>
                  toast.success(
                    `Thank you for your ${monthly ? "monthly " : ""}gift of $${amount || 0}!`,
                    { description: "This demo doesn't process real payments yet." },
                  )
                }
                className="mt-6 w-full rounded-full bg-secondary text-base font-bold text-secondary-foreground hover:bg-brand-yellow-light"
              >
                <Heart className="mr-1 h-5 w-5" />
                Donate ${amount || 0}
                {monthly ? "/mo" : ""}
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Secure giving • 100% goes to youth programs
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other ways */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            eyebrow="More Ways to Help"
            title="There's a place for everyone"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ways.map((way, i) => (
              <Reveal key={way.title} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-border bg-card p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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
            <div className="mt-12 overflow-hidden rounded-3xl bg-primary p-8 text-white sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                    <Users className="h-4 w-4 text-secondary" />
                    Join 40+ mentors
                  </span>
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
                        <li key={b} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-secondary" />
                          {b}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    toast.success("Thanks for your interest!", {
                      description: "Our team will reach out about volunteering soon.",
                    });
                    form.reset();
                  }}
                  className="rounded-2xl bg-white p-6 text-foreground"
                >
                  <h4 className="font-display text-lg font-bold">
                    Express interest
                  </h4>
                  <div className="mt-4 space-y-3">
                    <Input required placeholder="Full name" aria-label="Full name" />
                    <Input
                      required
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                    />
                    <Button
                      type="submit"
                      className="w-full rounded-full font-semibold"
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
