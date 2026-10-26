import { ContactBand } from "@/components/frank/ContactBand";
import { FrankMotion } from "@/components/frank/FrankMotion";
import { PageHero } from "@/components/frank/PageHero";
import { howItWorks as t } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /how-it-works: the six steps as the product window, then the contact band. */
export function HowItWorksPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/how-it-works", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How Frank works", path: "/how-it-works" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} />
      <FrankMotion id="steps" />
      <ContactBand idPrefix="how" />
    </>
  );
}
