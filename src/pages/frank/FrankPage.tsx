import { SITE_CONFIG } from "@/config/site";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Btn } from "@/components/frank/Btn";
import { ContactBand } from "@/components/frank/ContactBand";
import { CountUp } from "@/components/frank/CountUp";
import { FaqList } from "@/components/frank/FaqList";
import { FrankMotion } from "@/components/frank/FrankMotion";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { UseCases } from "@/components/frank/UseCases";
import { home } from "@/content/frank/home";
import { frankPage as t } from "@/content/frank/pages";
import { breadcrumbJsonLd, faqJsonLd, useSeo } from "@/lib/seo";

/**
 * /frank: the system, shown working. A short hero (name, one paragraph,
 * one button), then the six-step product window, the use cases, the
 * numbers, the contact band and the FAQ. No character: Frank is what
 * the window does.
 */
export function FrankPage() {
  useSeo({
    title: t.seo.title,
    description: t.seo.description,
    path: "/frank",
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Frank", path: "/frank" }]), faqJsonLd(home.faq.items)],
  });
  const p = home.proof;
  return (
    <>
      <section className="pt-12 md:pt-20" aria-label="Meet Frank">
        <Container>
          <Reveal className="max-w-3xl">
            <h1 className="text-h1 text-ink">
              {t.h1Light}
              <span className="font-semibold">{t.h1Bold}</span>
            </h1>
            <p className="mt-6 max-w-[620px] text-sub text-ink-2">{t.sub}</p>
            <div className="mt-8">
              <Btn href={SITE_CONFIG.bookCallHref} size="lg" trackLabel="frank_hero_book_demo">
                Book a call
              </Btn>
            </div>
          </Reveal>
        </Container>
      </section>

      <FrankMotion />

      <UseCases />

      <Section tone="white" id="stats">
        <Container>
          <SectionHeading eyebrow={t.statsEyebrow} title={t.statsH2} align="left" />
          <Reveal className="mt-10 grid border-t border-ink sm:grid-cols-2 md:mt-14">
            {p.stats.map((s, i) => (
              <div key={s.label} className={`border-b border-ink py-8 md:py-10 ${i % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}>
                <CountUp value={s.value} className="text-[clamp(3rem,2rem+3vw,5rem)] font-light leading-none tracking-[-0.03em] text-ink" />
                <p className="mt-3 text-body text-ink-2">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <p className="mt-4 text-small text-muted">{p.footnote}</p>
        </Container>
      </Section>

      <ContactBand idPrefix="frank" />

      <Section id="faq">
        <Container>
          <SectionHeading title={t.faqH2} />
          <FaqList items={home.faq.items} className="mx-auto mt-10 max-w-3xl md:mt-14" />
        </Container>
      </Section>
    </>
  );
}
