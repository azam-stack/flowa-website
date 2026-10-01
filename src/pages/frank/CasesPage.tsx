import { Container } from "@/components/Container";
import { CaseCard } from "@/components/frank/CaseCard";
import { ContactBand } from "@/components/frank/ContactBand";
import { Marquee } from "@/components/frank/Marquee";
import { PageHero } from "@/components/frank/PageHero";
import { ProofBlock, StatsStrip } from "@/components/frank/Proof";
import { Section } from "@/components/frank/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { casesPage as t } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /cases: the published client cases, our own numbers, the founder quote and the contact band. */
export function CasesPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/cases", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cases", path: "/cases" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} />
      <Section>
        <Container>
          <Reveal stagger className="grid gap-6 md:grid-cols-2">
            {t.cases.map((c) => (
              <CaseCard key={c.slug} c={c} />
            ))}
          </Reveal>
          <p className="mt-5 text-small text-muted">{t.approvalNote}</p>
        </Container>
      </Section>
      <StatsStrip />
      <Marquee className="mt-16 md:mt-20" />
      <Section>
        <Container>
          <ProofBlock withHeading={false} withStats={false} />
        </Container>
      </Section>
      <ContactBand h2={t.contactH2} sub={t.contactSub} idPrefix="cases" />
    </>
  );
}
