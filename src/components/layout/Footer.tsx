import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { socials, site } from "@/data/site";

const columns = [
  {
    title: "Contact",
    items: [
      { label: site.address },
      { label: site.email, href: `mailto:${site.email}` },
      { label: site.phone, href: site.phoneHref },
      { label: "Serving youth online, at homes, churches, public libraries and parks" },
    ],
  },
  {
    title: "About Us",
    items: [
      { label: "Our Mission", to: "/about" },
      { label: "Projects", to: "/programs" },
      { label: "Stories & Blog", to: "/media" },
      { label: "Accessibility", to: "/accessibility" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Ways to Give", to: "/get-involved" },
      { label: "Volunteer", to: "/get-involved#volunteer" },
      { label: "Events", to: "/events" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
];

/** Cobalt full-bleed footer: four link columns + legal line. */
export function Footer() {
  return (
    <footer className="border-t border-white/25 bg-primary text-white">
      <div className="container-cofy py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs font-serif leading-relaxed text-white/85">
              {site.mission}
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-display text-2xl font-medium tracking-wide">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3 font-serif text-white/85">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {"to" in item && item.to ? (
                      <Link to={item.to} className="transition-colors hover:text-secondary">
                        {item.label}
                      </Link>
                    ) : "href" in item && item.href ? (
                      <a href={item.href} className="transition-colors hover:text-secondary">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Stay connected */}
        <div className="mt-12 border-t border-white/25 pt-8">
          <h3 className="font-display text-2xl font-medium tracking-wide">
            Stay Connected
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-serif text-white/85 transition-colors hover:text-secondary"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/25 pt-6 font-serif text-sm text-white/75 sm:flex-row">
          <p>
            {site.name} is a registered nonprofit organization in the state of
            New Jersey.
          </p>
          <p>© {new Date().getFullYear()} {site.shortName} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
