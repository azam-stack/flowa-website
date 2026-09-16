import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { ClientLogos } from "@/components/ClientLogos";
import { ProofStrip } from "@/components/ProofStrip";
import { CaseStudies } from "@/components/CaseStudies";
import { Reveal } from "@/components/Reveal";
import { LeadCta } from "@/components/LeadCta";
import { caseStudies, casesPage } from "@/content/cases";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

/** Cases: the real client logos, the case architecture, and whatever cases have been verified. */
export function CasesPage() {
  const c = casesPage;
  useSeo({ title: c.seo.title, description: c.seo.description, path: "/cases", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cases", path: "/cases" }])] });
  return (
    <>
      <section id="top" className="atmosphere relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40 lg:pt-44">
        <Container className="relative z-[2]">
          <div className="max-w-3xl">
            <h1 className="text-display text-[color:var(--flowa-text)]">
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {c.hero.headline}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
              {c.hero.sub}
            </p>
          </div>
        </Container>
      </section>
      <ClientLogos />
      <ProofStrip compact />
      <Section>
        <Container>
          <Reveal>
            <CaseStudies cases={caseStudies} />
          </Reveal>
        </Container>
      </Section>
      <LeadCta heading={c.cta.heading} body={c.cta.body} service="cases" />
    </>
  );
}
