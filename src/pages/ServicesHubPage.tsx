import { Container } from "@/components/Container";
import { Section, SectionHeader } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { BookCallLink } from "@/components/BookCallLink";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { ProofStrip } from "@/components/ProofStrip";
import { FlowaEngine } from "@/components/FlowaEngine";
import { FluidObject } from "@/components/FluidObject";
import { RiskBand } from "@/sections/RiskBand";
import { LeadCta } from "@/components/LeadCta";
import { servicesHub } from "@/content/services-hub";
import { liveServices } from "@/content/services";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

/** The services hub: one promise, three living service cards, the engine behind all of them, the deal, and the form. */
export function ServicesHubPage() {
  const h = servicesHub;
  useSeo({ title: h.seo.title, description: h.seo.description, path: "/services", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])] });
  return (
    <>
      <section id="top" className="atmosphere relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pt-44">
        <div className="hero-blur pointer-events-none absolute -right-[6%] top-[8%] h-[520px] w-[520px] opacity-60 md:h-[640px] md:w-[640px]" style={T(0)} aria-hidden="true">
          <FluidObject className="parallax parallax-slow h-full w-full" />
        </div>
        <Container className="relative z-[2]">
          <div className="max-w-3xl">
            <h1 className="text-display text-[color:var(--flowa-text)]">
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {h.hero.headline}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
              {h.hero.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
              <div className="hero-rise" style={T(560)}>
                <BookCallLink id="hero-cta" location="services-hero" size="lg" arrow magnetic className="w-full sm:w-auto" />
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href={h.hero.ctaSecondary.href} variant="ghost" size="lg" className="w-full sm:w-auto" onClick={() => track("cta_click", { cta: h.hero.ctaSecondary.label, location: "services-hero" })}>
                  {h.hero.ctaSecondary.label}
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section id="services" className="scroll-mt-20">
        <Container>
          <SectionHeader title={h.cards.heading} lead={h.cards.body} />
          <Reveal delay={120} stagger className="mt-8 grid grid-cols-1 gap-5 md:mt-12 lg:grid-cols-3">
            {liveServices.map((s, i) => (
              <div key={s.slug} className="far h-full">
                <ServiceCard service={s} promise={h.cards.promise[s.slug] ?? s.tagline} explore={h.cards.explore} index={i} />
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title={h.engine.heading} lead={h.engine.body} />
          <Reveal delay={160} className="mt-10 md:mt-14">
            <FlowaEngine stages={[...h.engine.stages]} />
          </Reveal>
        </Container>
      </Section>

      <ProofStrip compact />
      <RiskBand showNodes />
      <LeadCta heading={h.cta.heading} body={h.cta.body} service="services" />
    </>
  );
}
