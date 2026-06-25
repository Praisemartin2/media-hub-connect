import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Heart, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { navLinks, site } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 shadow-sm backdrop-blur-lg"
          : "bg-background/0",
      )}
    >
      <div className="container-cofy flex h-16 items-center justify-between gap-4 py-3 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-secondary transition-all duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm" className="font-semibold">
            <a href={site.phoneHref}>
              <Phone className="mr-1.5 h-4 w-4" />
              {site.phone}
            </a>
          </Button>
          <Button asChild className="rounded-full font-semibold shadow-md shadow-primary/20">
            <Link to="/get-involved">
              <Heart className="mr-1.5 h-4 w-4" />
              Donate
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="rounded-full font-semibold">
            <Link to="/get-involved">
              <Heart className="mr-1 h-4 w-4" />
              Donate
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <div className="mb-8 mt-2">
                <Logo />
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:bg-muted",
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <SheetClose asChild>
                  <Button asChild className="w-full rounded-full font-semibold">
                    <Link to="/get-involved">
                      <Heart className="mr-1.5 h-4 w-4" />
                      Donate Today
                    </Link>
                  </Button>
                </SheetClose>
                <Button asChild variant="outline" className="w-full rounded-full font-semibold">
                  <a href={site.phoneHref}>
                    <Phone className="mr-1.5 h-4 w-4" />
                    {site.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
