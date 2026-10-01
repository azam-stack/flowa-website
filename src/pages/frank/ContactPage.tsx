import { Container } from "@/components/Container";
import { CalEmbed } from "@/components/frank/CalEmbed";
import { ContactBand } from "@/components/frank/ContactBand";
import { Check } from "@/components/frank/Icons";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { asset } from "@/lib/asset";
import { contactPage } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/**
 * /demo: "Book a call" with the Cal.com calendar inline, so visitors see
 * the free times and book without leaving the site; the message form sits
 * underneath. /contact: the contact band as a full page.
 */
export function ContactPage({ mode }: { mode: "demo" | "contact" }) {
  const t = contactPage[mode];
  const path = `/${mode}`;
  useSeo({ title: t.seo.title, description: t.seo.description, path, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: mode === "demo" ? "Book a call" : "Contact", path }])] });
  if (mode === "contact") return <ContactBand as="h1" h2={`${t.h1Light}${t.h1Bold}`} sub={contactPage.sub} pose="wave" idPrefix={mode} id="top" />;
  const d = contactPage.demo;
  return (
    <>
      <PageHero light={d.h1Light} bold={d.h1Bold} sub={d.calendarNote} />
      <Section id="book" className="!pt-10 md:!pt-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:gap-12">
            <aside className="lg:pt-4">
              <span className="flex -space-x-3">
                {["ahmed", "anton"].map((k) => (
                  <img key={k} src={asset(`images/team/${k}.webp`)} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-white" />
                ))}
              </span>
              <p className="mt-4 text-[17px] font-semibold text-ink">Ahmed Zamzam and Anton Busk</p>
              <ul className="mt-5 flex flex-col gap-3">
                {d.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-body text-ink-2">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand text-ink">
                      <Check size={13} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </aside>
            <CalEmbed />
          </div>
        </Container>
      </Section>
      <ContactBand h2={d.formH2} sub={d.orForm} idPrefix="demo" id="message" />
    </>
  );
}
