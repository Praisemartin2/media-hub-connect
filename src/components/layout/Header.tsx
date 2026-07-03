import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { SearchDialog } from "./SearchDialog";
import { navLinks, site, socials } from "@/data/site";

/**
 * Sticky white global nav: logo left, condensed nav links center-left,
 * search + cobalt Donate right. Tall at rest, shrinks smoothly on scroll.
 * Mobile uses a full-screen overlay menu.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          "sticky top-0 z-50 w-full bg-background shadow-sm transition-all duration-300",
        )}
      >
        <div
          className={cn(
            "container-cofy flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16 lg:h-[74px]" : "h-16 lg:h-[110px]",
          )}
        >
          <div className="flex items-center gap-10">
            <Logo />
            <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "font-display text-xl font-medium tracking-wide transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <SearchDialog />
            <Button asChild className="hidden sm:inline-flex">
              <Link to="/get-involved">
                <Heart className="mr-1 h-4 w-4" />
                Donate
              </Link>
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-0 z-[70] flex flex-col bg-primary text-white transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div className="container-cofy flex h-16 items-center justify-between">
          <Logo light />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center border border-white text-white transition-colors hover:bg-white hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="container-cofy flex flex-1 flex-col justify-center gap-10 overflow-y-auto pb-14">
          <nav aria-label="Mobile">
            <ul className="space-y-2">
              {[{ label: "Home", to: "/" }, ...navLinks].map((link, i) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                    className={({ isActive }) =>
                      cn(
                        "block font-display text-5xl font-medium tracking-wide transition-all duration-500",
                        open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                        isActive ? "text-secondary" : "text-white hover:text-secondary",
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-4 text-white/90">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 font-serif hover:text-white">
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
            <a href={site.phoneHref} className="flex items-center gap-2 font-serif hover:text-white">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <div className="flex gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
