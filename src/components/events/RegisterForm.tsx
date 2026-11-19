import { ArrowUpRight, ClipboardList } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { registrationForm, site } from "@/data/site";

/**
 * COFY's event registration form, embedded so visitors can sign up
 * without leaving the site. The iframe is lazy so it only loads when
 * someone scrolls to it, and the form also opens in its own tab for
 * anyone whose browser blocks embedded content.
 */
export function RegisterForm() {
  return (
    <section id="register" className="scroll-mt-20 bg-brand-cream py-14 lg:py-20">
      <div className="container-cofy">
        <Reveal>
          <div className="mb-8 flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Register for an event
            </h2>
          </div>
          <p className="mb-8 max-w-2xl font-serif text-base leading-relaxed text-foreground/75">
            Every COFY event is free of charge. Fill in the form below and we
            will send you the joining details. If the form does not load, you
            can open it in a new tab, or email us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-primary underline underline-offset-4 break-all"
            >
              {site.email}
            </a>
            .
          </p>

          <div className="overflow-hidden border border-border bg-white">
            <iframe
              src={registrationForm.embed}
              title="COFY event registration form"
              loading="lazy"
              className="h-[82svh] max-h-[1100px] min-h-[640px] w-full border-0"
            >
              Loading the registration form…
            </iframe>
          </div>

          <a
            href={registrationForm.view}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 font-display text-base font-bold text-primary hover:underline focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Open the registration form in a new tab
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
