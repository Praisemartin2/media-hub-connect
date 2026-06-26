import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/shared/SEO";
import { site, socials } from "@/data/site";
import { toast } from "sonner";

const contactCards = [
  {
    icon: Mail,
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: MapPin,
    label: "Where we serve",
    value: "Online & across the community",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "We reply within 1–2 business days",
  },
];

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us — Creating Opportunities for Youth Inc."
        description="Get in touch with COFY. Questions about programs, volunteering or partnership? We'd love to hear from you."
      />
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about our programs, volunteering or partnership? Reach out — there's a real person ready to help."
      />

      <section className="py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map((c, i) => {
                const Inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {c.label}
                      </p>
                      <p className="font-display font-bold text-foreground">
                        {c.value}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={c.label} delay={i * 70}>
                    {c.href ? (
                      <a href={c.href} className="block">
                        {Inner}
                      </a>
                    ) : (
                      Inner
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={150}>
              <div className="mt-6 rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Follow our journey
                </p>
                <div className="mt-3 flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("Message sent!", {
                  description: "Thanks for reaching out — we'll be in touch soon.",
                });
                form.reset();
              }}
              className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-primary/5 sm:p-9"
            >
              <h2 className="font-display text-2xl font-bold">Send us a message</h2>
              <p className="mt-1.5 text-muted-foreground">
                Fill out the form and our team will get back to you.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="jane@email.com" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell us a little about how we can help…"
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full rounded-full font-semibold sm:w-auto sm:px-10"
              >
                <Send className="mr-1 h-4 w-4" />
                Send message
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
