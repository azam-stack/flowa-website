import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { AskBox } from "@/components/frank/AskBox";
import { FaqList } from "@/components/frank/FaqList";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { home } from "@/content/frank/home";
import { faqPage as t } from "@/content/frank/pages";
import { pricing } from "@/content/frank/pricing";
import { breadcrumbJsonLd, faqJsonLd, useSeo } from "@/lib/seo";

/** /faq: every question from the homepage FAQ plus the pricing FAQ. */
export function FaqPage() {
  const all = [...home.faq.items, ...pricing.faq.items];
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/faq", jsonLd: [faqJsonLd(all), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} />
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-h3 text-ink">{t.generalHeading}</h2>
            <FaqList items={home.faq.items} className="mt-5" />
            <h2 className="mt-14 text-h3 text-ink">{t.pricingHeading}</h2>
            <FaqList items={pricing.faq.items} className="mt-5" />
            <AskBox className="mt-14" />
          </div>
        </Container>
      </Section>
      <ContactBand idPrefix="faq" />
    </>
  );
}
