import { ContactBand } from "@/components/frank/ContactBand";
import { contactPage } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /demo and /contact: the contact band as a full page, with Frank waving (pose b). */
export function ContactPage({ mode }: { mode: "demo" | "contact" }) {
  const t = contactPage[mode];
  const path = `/${mode}`;
  useSeo({ title: t.seo.title, description: t.seo.description, path, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: mode === "demo" ? "Book a call" : "Contact", path }])] });
  const d = contactPage.demo;
  return <ContactBand as="h1" h2={`${t.h1Light}${t.h1Bold}`} sub={contactPage.sub} pose="wave" idPrefix={mode} id="top" calendar={mode === "demo" ? { cta: d.calendarCta, note: d.calendarNote, orForm: d.orForm } : undefined} />;
}
