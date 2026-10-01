import { SITE_CONFIG } from "@/config/site";
import { useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Btn } from "@/components/frank/Btn";
import { Chip } from "@/components/frank/Chip";
import { ContactBand } from "@/components/frank/ContactBand";
import { CountUp } from "@/components/frank/CountUp";
import { FaqList } from "@/components/frank/FaqList";
import { FrankAvatar } from "@/components/frank/FrankAvatar";
import { Play, PlusIcon } from "@/components/frank/Icons";
import { Marquee } from "@/components/frank/Marquee";
import { Avatar, ChannelBadge, StepMock } from "@/components/frank/Mocks";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { SparkleGrid } from "@/components/frank/SparkleGrid";
import { Sphere } from "@/components/frank/Sphere";
import { VideoModal } from "@/components/frank/VideoModal";
import { home } from "@/content/frank/home";
import { frankPage as t, howItWorks } from "@/content/frank/pages";
import { track } from "@/lib/analytics";
import { breadcrumbJsonLd, faqJsonLd, useSeo } from "@/lib/seo";

/** The "Hot leads" card that floats over Frank in the hero. Fictional people, illustrative. */
function HotLeads({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[18px] bg-white p-4 shadow-lift ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold text-ink">{t.hotLeads.title}</p>
        <span className="flex items-center gap-1.5 text-[11px] text-muted">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand text-brand" /> live
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {t.hotLeads.rows.map((r, i) => (
          <li key={r.name} className="row-in flex items-center gap-2.5" style={{ "--i": i + 4 } as CSSProperties}>
            <Avatar name={r.name} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{r.name}</p>
              <p className="truncate text-[11px] text-muted">{r.why}</p>
            </div>
            <Chip className="px-2.5 py-0.5 text-[11px]">{t.hotLeads.chip}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "How Frank works": a numbered accordion; the large mock-up on the left follows the open step. */
function HowAccordion() {
  const [open, setOpen] = useState(0);
  const steps = howItWorks.steps;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
      <div className="lg:sticky lg:top-36 lg:self-start">
        <div key={open} className="swap-in">
          <StepMock kind={steps[open].mock} className="min-h-[340px] justify-center md:min-h-[420px] md:p-12" />
        </div>
      </div>
      <ol className="border-t border-ink">
        {steps.map((s, i) => {
          const isOpen = i === open;
          const id = `how-step-${i}`;
          return (
            <li key={s.n} className="border-b border-ink">
              <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(i)} className="flex w-full items-start gap-4 py-6 text-left md:py-7">
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-medium text-brand-deep">
                    {s.n} {s.title}
                  </span>
                  <span className={`mt-1 block text-[28px] font-light leading-tight transition-colors md:text-[34px] ${isOpen ? "text-ink" : "text-muted"}`}>{s.headline}</span>
                </span>
                <span className={`mt-2 grid h-10 w-10 flex-none place-items-center rounded-full border border-ink transition-transform duration-300 ${isOpen ? "rotate-45 bg-ink text-white" : "bg-white text-ink"}`}>
                  <PlusIcon size={18} />
                </span>
              </button>
              <div id={id} className="acc-body" data-open={isOpen}>
                <div>
                  <p className="max-w-lead pb-4 text-body text-ink-2">{s.body}</p>
                  <div className="pb-7">
                    {isOpen && (
                      <Btn href={SITE_CONFIG.bookingUrl} size="sm" trackLabel={`frank_how_${s.title.toLowerCase()}`}>
                        Book a call
                      </Btn>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/**
 * /frank: the agent page, built like a product page for one agent. A
 * two-column hero (big "Meet Frank.", Frank's idle loop in a peach card
 * with a floating hot-leads card, channel badges and soft pixel blocks),
 * the logo marquee, a numbered "How Frank works" accordion, the stats
 * grid, the dark contact band and the FAQ.
 */
export function FrankPage() {
  const [video, setVideo] = useState(false);
  useSeo({
    title: t.seo.title,
    description: t.seo.description,
    path: "/frank",
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Frank", path: "/frank" }]), faqJsonLd(home.faq.items)],
  });
  const p = home.proof;
  return (
    <>
      <section className="pt-5 md:pt-8" aria-label="Meet Frank">
        <Container>
          <div className="framed relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%)" }}>
            <SparkleGrid fade />
            <div className="relative z-[1] grid items-center gap-12 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1fr_1.05fr] lg:px-16 lg:py-20">
              <div>
                <h1 className="text-[clamp(3.25rem,2rem+4vw,5.5rem)] font-semibold leading-[1] tracking-[-0.035em] text-ink">
                  {t.h1Light}
                  {t.h1Bold}
                </h1>
                <p className="mt-6 max-w-[520px] text-sub text-ink-2">{t.sub}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Btn href={SITE_CONFIG.bookingUrl} size="lg" trackLabel="frank_hero_book_demo">
                    Book a call
                  </Btn>
                  <button
                    type="button"
                    onClick={() => {
                      track("video_open", { from: "frank" });
                      setVideo(true);
                    }}
                    className="btn btn-text h-14 gap-3 self-start px-4 text-[17px] sm:self-auto"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-ink bg-white">
                      <Play size={16} />
                    </span>
                    {t.video}
                  </button>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[560px]">
                {/* soft pixel blocks */}
                <span className="pixel left-[-18px] top-[12%] h-9 w-9" aria-hidden="true" />
                <span className="pixel grey left-[-46px] top-[22%] h-6 w-6" aria-hidden="true" />
                <span className="pixel right-[-22px] top-[6%] h-7 w-7" aria-hidden="true" />
                <span className="pixel grey right-[-40px] top-[16%] h-10 w-10" aria-hidden="true" />
                <span className="pixel bottom-[18%] right-[-26px] h-8 w-8" aria-hidden="true" />
                <Sphere size={110} tint={1} mark className="absolute -right-10 -top-12 z-[2] hidden md:block" rotate={12} />
                <Sphere size={64} tint={3} className="absolute -left-12 bottom-6 z-[2] hidden md:block" delay={1.2} blur />

                <div className="relative overflow-hidden rounded-frame border border-ink bg-panel p-2 shadow-lift">
                  <FrankAvatar video eager className="aspect-[4/4.2] w-full rounded-[14px]" />
                  <div className="label-bar mt-2 px-3 py-2 text-center text-[13px] font-medium">{home.meet.nameBar}</div>
                </div>

                <HotLeads className="lift-in relative z-[3] mt-4 w-full sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:w-[280px]" />

                <div className="absolute -right-3 top-[30%] z-[3] hidden flex-col gap-2.5 sm:flex md:-right-6" aria-hidden="true">
                  {(["linkedin", "email", "calendar"] as const).map((k, i) => (
                    <span key={k} className="lift-in rounded-full bg-white p-1.5 shadow-lift" style={{ "--i": i + 2 } as CSSProperties}>
                      <ChannelBadge kind={k} size={36} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
        <VideoModal open={video} onClose={() => setVideo(false)} />
      </section>

      <Marquee className="mt-16 md:mt-20" />

      <Section id="how-frank-works">
        <Container>
          <SectionHeading eyebrow={t.stripEyebrow} title={t.stripH2} align="left" className="mb-10 md:mb-14" />
          <HowAccordion />
        </Container>
      </Section>

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
