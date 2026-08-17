import { PageHero } from "@/components/shared/PageHero";
import { SEO } from "@/components/shared/SEO";
import { site } from "@/data/site";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Who we are",
    body: [
      "This website is operated by Creating Opportunities for Youth Inc. (COFY), a registered nonprofit organization in the state of New Jersey. Our office is at 7 Woodbridge Ave, Sewaren, NJ 07077.",
    ],
  },
  {
    title: "Using this site",
    body: [
      "The content on this site is provided for information about our mission, programs and events. You are welcome to read, share and link to it. Please do not misrepresent our organization, copy the site wholesale, or use it in a way that could mislead others about COFY.",
    ],
  },
  {
    title: "Event registration",
    body: [
      "Registration for our events is handled through Google Forms. The information you submit there goes to COFY so we can plan and run the event you signed up for. Google's own terms apply to the form service itself.",
    ],
  },
  {
    title: "Donations",
    body: [
      "Online donations are processed by PayPal on PayPal's own pages. COFY never sees or stores your card details. PayPal's terms and privacy policy apply to the payment itself. If a donation is made in error, contact us and we will work with you to put it right.",
    ],
  },
  {
    title: "Accuracy",
    body: [
      "We work to keep event dates, program details and resource links current and truthful. If you spot something out of date, we would genuinely like to know.",
    ],
  },
  {
    title: "Outside links",
    body: [
      "Pages on this site link to outside organizations, including New Jersey state services and partner nonprofits. Those sites belong to their organizations and we are not responsible for their content.",
    ],
  },
  {
    title: "Questions",
    body: [
      `Write to us at ${site.email} or call ${site.phone}. We read everything.`,
    ],
  },
];

const Terms = () => (
  <>
    <SEO
      title="Terms of Service — Creating Opportunities for Youth Inc."
      description="The plain-language terms for using the COFY website."
    />
    <PageHero
      eyebrow="Legal"
      title="Terms of Service"
      description="The short, plain-language version of how this site works. Last updated August 2026."
    />
    <section className="py-16 lg:py-20">
      <div className="container-cofy max-w-3xl">
        {sections.map((s) => (
          <div key={s.title} className="border-t border-border py-8 first:border-t-0">
            <h2 className="font-display text-2xl font-bold">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 30)} className="mt-3 font-serif text-lg leading-relaxed text-foreground/80">
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  </>
);

export default Terms;
