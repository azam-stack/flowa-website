import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { home } from "@/content/frank/home";
import { asset } from "@/lib/asset";
import { Btn } from "./Btn";
import { Calendar, Check, Shield } from "./Icons";
import { SITE_CONFIG } from "@/config/site";
import { SectionHeading, Section } from "./SectionHeading";
import { Sphere } from "./Sphere";

/**
 * How an engagement runs: four steps on a line, each with when it
 * happens, a title and one or two sentences. The founders' faces sit on
 * the line to show the same two people run it from start to finish.
 */
export function EngagementTimeline() {
  const e = home.engagement;
  return (
    <Section id="engagement">
      <Container>
        <SectionHeading eyebrow={e.eyebrow} title={e.h2} sub={e.sub} />
        <div className="relative mt-12 md:mt-16">
          <span aria-hidden="true" className="absolute left-0 right-0 top-[22px] hidden h-px bg-ink lg:block" />
          <Reveal stagger as="ol" className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {e.steps.map((s, i) => (
              <li key={s.title} className="relative min-w-0">
                <span className={`relative z-[1] grid h-11 w-11 place-items-center rounded-full border border-ink text-[14px] font-semibold ${i === e.steps.length - 1 ? "bg-brand text-ink" : "bg-surface text-ink"}`}>
                  {i === e.steps.length - 1 ? <Calendar size={18} /> : `0${i + 1}`}
                </span>
                <p className="mt-5 text-[13px] font-semibold uppercase tracking-wide text-brand-deep">{s.when}</p>
                <h3 className="mt-1 text-h3 text-ink">{s.title}</h3>
                <p className="mt-2 text-body text-ink-2">{s.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
        <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-frame border border-line bg-surface p-5 shadow-float sm:flex-row sm:items-center md:mt-14 md:p-6">
          <span className="flex -space-x-3">
            {["ahmed", "anton"].map((k) => (
              <img key={k} src={asset(`images/team/${k}.webp`)} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-white" />
            ))}
          </span>
          <p className="min-w-0 flex-1 text-body text-ink-2">
            <span className="font-semibold text-ink">Ahmed Zamzam and Anton Busk</span> run your campaign themselves. No account managers, no hand-offs.
          </p>
          <Btn href={SITE_CONFIG.bookingUrl} trackLabel="engagement_book_call">
            Book a call
          </Btn>
        </Reveal>
      </Container>
    </Section>
  );
}

/** The commercial promise: pay for held meetings, no-shows rebooked, criteria in writing. Ink band. */
export function PromiseBand() {
  const p = home.promise;
  return (
    <section id="promise" className="relative overflow-hidden bg-ink py-section-m text-white lg:py-section" aria-label={p.eyebrow}>
      <img src={asset("images/backgrounds/silk-dark.webp")} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70" />
      <Sphere size={160} tint={1} className="absolute -left-12 bottom-8 hidden opacity-90 lg:block" rotate={18} duration={9} />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <p className="text-eyebrow text-brand">{p.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2.25rem,1.5rem+2.4vw,3.75rem)] font-light leading-[1.05] tracking-[-0.03em]">
            {p.h2Light}
            <span className="font-semibold">{p.h2Bold}</span>
          </h2>
          <p className="mt-4 max-w-lead text-sub text-white/75">{p.sub}</p>
        </Reveal>
        <Reveal stagger as="ul" className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
          {p.points.map((pt, i) => (
            <li key={pt.title} className="rounded-frame border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md md:p-7" style={{ "--i": i } as CSSProperties}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink">
                <Check size={16} />
              </span>
              <h3 className="mt-5 text-[20px] font-semibold">{pt.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/75">{pt.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/** Compliance and brand safety: UK GDPR and PECR, opt-outs, no bought lists, data ownership. */
export function ComplianceSection() {
  const c = home.compliance;
  return (
    <Section tone="white" id="compliance">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
              <Shield size={22} />
            </span>
            <p className="mt-6 text-eyebrow text-brand-deep">{c.eyebrow}</p>
            <h2 className="mt-3 text-h2 text-ink">{c.h2}</h2>
            <p className="mt-4 max-w-lead text-sub text-ink-2">{c.sub}</p>
            <SmartLink href={c.link.href} className="mt-6 inline-block text-[15px] font-medium text-brand-deep underline underline-offset-4">
              {c.link.label}
            </SmartLink>
          </Reveal>
          <Reveal stagger as="ul" className="grid gap-px overflow-hidden rounded-frame border border-ink bg-ink sm:grid-cols-2">
            {c.items.map((it) => (
              <li key={it.title} className="bg-surface p-6 md:p-7">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-ink">
                  <Check size={13} />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold text-ink">{it.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{it.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
