import { PageHero } from "@/components/shared/PageHero";
import { SEO } from "@/components/shared/SEO";
import { site } from "@/data/site";

const sections: { title: string; body: string[] }[] = [
  {
    title: "The short version",
    body: [
      "This website does not use advertising trackers or analytics cookies, and it does not sell data to anyone. The little it collects, it collects so we can run events and receive donations.",
    ],
  },
  {
    title: "What we collect, and where it goes",
    body: [
      "Event registration: when you register for an event, the form runs on Google Forms. Your answers (typically your name and contact details) go to COFY so we can run the event. Google processes the form under its own privacy policy.",
      "Donations: payments are handled entirely by PayPal on PayPal's pages. COFY receives your name, the amount, and the contact details PayPal shares with recipients. We never see your card number.",
      "Email: if you write to us, we keep the correspondence so we can reply and follow up.",
    ],
  },
  {
    title: "Newsletter",
    body: [
      "The newsletter signup form on our homepage is not yet connected to a mailing system. Until it is, submitting it does not store your details anywhere. When that changes, this policy will say so plainly.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our work serves young people, but this website is written for parents, caregivers, educators and donors. We do not knowingly collect personal information from children through this site. Photographs of children on the site are used with care; if you have a concern about any image, contact us and we will act on it quickly.",
    ],
  },
  {
    title: "Media hosting",
    body: [
      "Some images and video on this site are served from a content delivery network. Requesting those files shares your IP address with the host, as with any content on the internet. No identity information is attached.",
    ],
  },
  {
    title: "Your choices",
    body: [
      `You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Write to ${site.email} and we will respond.`,
    ],
  },
];

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy — Creating Opportunities for Youth Inc."
      description="What the COFY website collects, what it doesn't, and where your information goes."
    />
    <PageHero
      eyebrow="Legal"
      title="Privacy Policy"
      description="What this site collects, what it doesn't, and where your information goes. Last updated August 2026."
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

export default Privacy;
