import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { HowSteps } from "@/components/frank/HowStrip";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { howItWorks as t } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /how-it-works: the four steps as framed cards with mini mock-ups (brief §5). */
export function HowItWorksPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/how-it-works", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "How Frank works", path: "/how-it-works" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} />
      <Section>
        <Container>
          <HowSteps />
        </Container>
      </Section>
      <ContactBand idPrefix="how" />
    </>
  );
}
