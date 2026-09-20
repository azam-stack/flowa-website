import { lazy, Suspense } from "react";
import { Container } from "@/components/Container";
import { Section, SectionHeader } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { BookCallLink } from "@/components/BookCallLink";
import { Reveal } from "@/components/Reveal";
import { StatsBand } from "@/components/StatsBand";
import { FlowaEngine } from "@/components/FlowaEngine";
import { ProcessFlow } from "@/components/ProcessFlow";
import { QualificationModel } from "@/components/QualificationModel";
import { ChannelSystem } from "@/components/ChannelSystem";
import { Pillars } from "@/components/Pillars";
import { ReplyRouting } from "@/components/ReplyRouting";
import { ReportingPanel } from "@/components/ReportingPanel";
import { CaseStudies } from "@/components/CaseStudies";
import { FaqSection } from "@/components/FaqSection";
import { RelatedServices } from "@/components/RelatedServices";
import { LeadCta } from "@/components/LeadCta";
import { RiskBand } from "@/sections/RiskBand";
import { SmartLink } from "@/components/SmartLink";
import type { ServiceDefinition } from "@/content/types";
import { caseStudies, casesPage } from "@/content/cases";
import { demo } from "@/content/demo";
import { servicePath } from "@/content/services";
import { useSeo, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";

const PipelineVisual = lazy(() => import("@/components/PipelineVisual").then((m) => ({ default: m.PipelineVisual })));
const LinkedInVisual = lazy(() => import("@/components/LinkedInVisual").then((m) => ({ default: m.LinkedInVisual })));
const EmailVisual = lazy(() => import("@/components/EmailVisual").then((m) => ({ default: m.EmailVisual })));
const OperatorSection = lazy(() => import("@/components/OperatorSection").then((m) => ({ default: m.OperatorSection })));

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

/**
 * The service-page template. Every section reads the service's data and
 * renders only what the service defines: the same components produce the
 * appointment-setting, linkedin-outreach and cold-email pages, and any service
 * added to the registry.
 */
export function ServicePage({ service }: { service: ServiceDefinition }) {
  const s = service;
  const path = servicePath(s.slug);
  useSeo({
    title: s.seo.title,
    description: s.seo.description,
    ogTitle: s.seo.ogTitle,
    ogDescription: s.seo.ogDescription,
    path,
    service: s.slug,
    jsonLd: [serviceJsonLd({ name: s.name, description: s.seo.description, path }), faqJsonLd(s.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path }])],
  });
  const relevantCases = caseStudies.filter((c) => c.service.toLowerCase() === s.name.toLowerCase());

  return (
    <>
      <section id="top" className="atmosphere relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 lg:pt-44">
        <Container className="relative z-[2]">
          <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb" className="hero-rise mb-5 text-[13px] text-muted" style={T(0)}>
                <SmartLink href="/services" className="hover:text-fg">
                  Services
                </SmartLink>
                <span aria-hidden="true"> / </span>
                <span className="text-fg">{s.name}</span>
              </nav>
              <h1 className="mt-4 text-display text-[color:var(--flowa-text)]">
                <span className="hero-mask">
                  <span className="hero-line" style={T(120)}>
                    {s.hero.headline}
                  </span>
                </span>
              </h1>
              <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744]" style={T(420)}>
                {s.hero.sub}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
                <div className="hero-rise" style={T(560)}>
                  <BookCallLink id="hero-cta" location="service-hero" service={s.slug} size="lg" arrow magnetic className="w-full sm:w-auto" />
                </div>
                {s.hero.ctaSecondary && (
                  <div className="hero-rise" style={T(620)}>
                    <LinkButton href={s.hero.ctaSecondary.href} variant="ghost" size="lg" className="w-full sm:w-auto" onClick={() => track("cta_click", { cta: s.hero.ctaSecondary?.label, location: "service-hero", service: s.slug })}>
                      {s.hero.ctaSecondary.label}
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
            <div className="hero-surface min-w-0" style={T(500)}>
              <Suspense fallback={<div className="aspect-[4/3] w-full rounded-card border border-border bg-card/60" aria-hidden="true" />}>
                {s.hero.visual === "pipeline" && <PipelineVisual />}
                {s.hero.visual === "linkedin" && <LinkedInVisual />}
                {s.hero.visual === "email" && <EmailVisual />}
              </Suspense>
              <p className="mt-3 text-center text-[12px] text-muted lg:text-right">{demo.label}. Not a real prospect or client.</p>
            </div>
          </div>
        </Container>
      </section>

      <Section density="compact" divider>
        <Container>
          <StatsBand heading={s.stats.heading} items={s.stats.items} />
        </Container>
      </Section>

      {s.qualification && (
        <Section id="qualification" className="scroll-mt-20">
          <Container>
            <SectionHeader title={s.qualification.heading} lead={s.qualification.body} />
            <Reveal delay={160} className="mt-10 md:mt-14">
              <QualificationModel criteria={s.qualification.criteria} states={s.qualification.states} />
            </Reveal>
          </Container>
        </Section>
      )}

      {s.system && (
        <Section>
          <Container>
            <SectionHeader title={s.system.heading} lead={s.system.body} />
            <Reveal delay={160} className="mt-10 md:mt-12">
              <ChannelSystem nodes={s.system.nodes} legend={s.system.legend} />
            </Reveal>
          </Container>
        </Section>
      )}

      {s.pillars && (
        <Section>
          <Container>
            <SectionHeader title={s.pillars.heading} />
            <Reveal delay={160} className="mt-10 md:mt-12">
              <Pillars items={s.pillars.items} />
            </Reveal>
          </Container>
        </Section>
      )}

      <Section id="process" className="scroll-mt-20">
        <Container>
          <SectionHeader title={s.process.heading} lead={s.process.body} align="center" />
          <Reveal delay={160} className="mt-12 lg:mt-16">
            <ProcessFlow steps={s.process.steps} />
          </Reveal>
        </Container>
      </Section>

      {s.replyRouting && (
        <Section>
          <Container>
            <SectionHeader title={s.replyRouting.heading} lead={s.replyRouting.body} />
            <Reveal delay={160} className="mt-10 md:mt-12">
              <ReplyRouting routes={s.replyRouting.routes} />
            </Reveal>
          </Container>
        </Section>
      )}

      {s.reporting && (
        <Section>
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <SectionHeader title={s.reporting.heading} lead={s.reporting.body} />
              <Reveal delay={160} variant="surface">
                <ReportingPanel metrics={s.reporting.metrics} label={s.reporting.demoLabel} period={s.reporting.period} />
              </Reveal>
            </div>
          </Container>
        </Section>
      )}

      {s.operator && (
        <Suspense fallback={null}>
          <OperatorSection />
        </Suspense>
      )}

      <Section>
        <Container>
          <Reveal>
            <FlowaEngine stages={s.engine.stages} heading={s.engine.heading} body={s.engine.body} />
          </Reveal>
        </Container>
      </Section>

      <RiskBand showNodes />

      <Section>
        <Container>
          <SectionHeader title={relevantCases.length ? `${s.name} cases` : casesPage.hero.headline} lead={casesPage.hero.sub} />
          <Reveal delay={160} className="mt-8 md:mt-12">
            <CaseStudies cases={relevantCases} />
          </Reveal>
          <Reveal delay={200} className="mt-6">
            <LinkButton href="/cases" variant="ghost" arrow>
              All cases
            </LinkButton>
          </Reveal>
        </Container>
      </Section>

      <section aria-label="Pricing" className="border-t border-border py-compact">
        <Container>
          <Reveal className="flex flex-col gap-5 rounded-card border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="text-h3 text-fg">{s.pricingNote.text}</p>
            <LinkButton href="/pricing" variant="primary" arrow className="shrink-0" onClick={() => track("cta_click", { cta: s.pricingNote.cta, location: "service-pricing-note", service: s.slug })}>
              {s.pricingNote.cta}
            </LinkButton>
          </Reveal>
        </Container>
      </section>

      <FaqSection heading={s.faq.heading} items={s.faq.items} service={s.slug} />
      <LeadCta heading={s.cta.heading} body={s.cta.body} service={s.slug} />
      <RelatedServices heading={s.related.heading} slugs={s.related.slugs} extra={s.related.extra} />
    </>
  );
}
