import { Container } from "@/components/Container";
import { SITE_CONFIG } from "@/config/site";
import { track } from "@/lib/analytics";
import { ContactBand } from "@/components/frank/ContactBand";
import { Calendar, Check } from "@/components/frank/Icons";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { asset } from "@/lib/asset";
import { contactPage } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/**
 * /book-a-call: a card that opens the Cal.com calendar in a new tab, with
 * the message form underneath. /contact: the contact band as a full page.
 */
export function ContactPage({ mode }: { mode: "demo" | "contact" }) {
  const t = contactPage[mode];
  const path = mode === "demo" ? "/book-a-call" : "/contact";
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
            <div className="flex flex-col items-start justify-center rounded-frame border border-ink bg-white p-8 shadow-float md:p-12">
              <p className="text-h3 text-ink">{d.calendarCta}</p>
              <p className="mt-2 max-w-lead text-body text-ink-2">{d.calendarNote}</p>
              <a href={SITE_CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_click", { label: "book_call_page" })} className="btn btn-primary mt-8 h-14 px-8 text-[17px]">
                <Calendar size={18} /> {d.openCalendar}
              </a>
              <p className="mt-3 text-small text-muted">{d.opensNote}</p>
            </div>
          </div>
        </Container>
      </Section>
      <ContactBand h2={d.formH2} sub={d.orForm} idPrefix="demo" id="message" />
    </>
  );
}
