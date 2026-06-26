import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, socials, site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-blue-deep text-white">
      <div className="absolute inset-0 bg-hero-radial opacity-60" aria-hidden />
      <div className="container-cofy relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {site.mission}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-secondary hover:text-secondary-foreground"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/get-involved"
                  className="font-semibold text-white/90 transition-colors hover:text-secondary"
                >
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-2.5 text-white/75 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-2.5 text-white/75 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/75">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                Serving youth online & across the community
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-white/70">
              Get vlogs, stories and event news in your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("You're subscribed!", {
                  description: "Thanks for joining the COFY community.",
                });
                form.reset();
              }}
              className="flex flex-col gap-2.5 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-secondary"
              />
              <Button
                type="submit"
                className="shrink-0 rounded-lg bg-secondary font-semibold text-secondary-foreground hover:bg-brand-yellow-light"
              >
                Join
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-secondary">♥</span> for every young person.
          </p>
        </div>
      </div>
    </footer>
  );
}
