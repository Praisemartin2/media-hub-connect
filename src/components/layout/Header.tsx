import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, ArrowRight, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";
import { navLinks, site, socials } from "@/data/site";

/**
 * Minimal editorial header: small logo, search, a solid Donate button and
 * a "Menu" toggle that opens a full-screen overlay with oversized links.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation & lock body scroll while open
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-colors duration-300",
          scrolled
            ? "border-border bg-background/95 backdrop-blur"
            : "border-transparent bg-background",
        )}
      >
        <div className="container-cofy flex h-16 items-center justify-between gap-3 sm:h-[72px]">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <SearchDialog />
            <Button asChild className="h-10 rounded-none px-5 font-bold">
              <Link to="/get-involved">
                <Heart className="mr-1.5 h-4 w-4" />
                Donate
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-10 items-center gap-2 border border-foreground/20 px-4 font-bold transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Menu className="h-5 w-5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-brand-blue-deep text-white transition-all duration-300",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container-cofy flex h-16 items-center justify-between sm:h-[72px]">
          <Logo light />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-10 items-center gap-2 border border-white/30 px-4 font-bold text-white transition-colors hover:bg-white hover:text-brand-blue-deep"
          >
            <X className="h-5 w-5" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>

        <div className="container-cofy flex flex-1 flex-col justify-center gap-10 overflow-y-auto pb-16 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Main">
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-4 font-display text-4xl font-extrabold tracking-tight transition-all duration-500 sm:text-6xl",
                        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                        isActive ? "text-secondary" : "text-white hover:text-secondary",
                      )
                    }
                  >
                    {link.label}
                    <ArrowRight className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/get-involved"
                  style={{ transitionDelay: open ? `${navLinks.length * 40}ms` : "0ms" }}
                  className={cn(
                    "group flex items-center gap-4 font-display text-4xl font-extrabold tracking-tight text-white transition-all duration-500 hover:text-secondary sm:text-6xl",
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                >
                  Get Involved
                  <ArrowRight className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100" />
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="max-w-sm space-y-6 text-white/80">
            <p className="text-lg leading-relaxed">{site.mission}</p>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4 text-secondary" />
                {site.email}
              </a>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-white">
                <Phone className="h-4 w-4 text-secondary" />
                {site.phone}
              </a>
            </div>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white hover:text-brand-blue-deep"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-none bg-secondary px-8 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
            >
              <Link to="/get-involved">
                <Heart className="mr-1.5 h-5 w-5" />
                Donate
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
