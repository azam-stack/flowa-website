import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SITE_CONFIG } from "@/config/site";
import { home } from "@/content/frank/home";
import { Btn } from "./Btn";
import { Check, Close } from "./Icons";
import { SectionHeading, Section } from "./SectionHeading";

/**
 * Who it's for: an honest fit check. A good fit on a white card with
 * orange ticks, not a fit on an ink card with crosses, then the call CTA.
 * Being clear about who we don't work with is part of the premium signal.
 */
export function WhoFrankHelps() {
  const w = home.who;
  return (
    <Section tone="white" id="who">
      <Container>
        <SectionHeading eyebrow={w.eyebrow} title={w.h2} sub={w.sub} />
        <Reveal stagger className="mx-auto mt-12 grid max-w-5xl gap-5 md:mt-16 md:grid-cols-[1.25fr_1fr]">
          <div className="framed p-6 shadow-float md:p-9">
            <h3 className="text-h3 text-ink">{w.fitTitle}</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {w.fit.map((f) => (
                <li key={f} className="flex items-start gap-3 text-body text-ink-2">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand text-ink">
                    <Check size={13} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-frame bg-ink p-6 text-white md:p-9">
            <h3 className="text-h3">{w.notFitTitle}</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {w.notFit.map((f) => (
                <li key={f} className="flex items-start gap-3 text-body text-white/80">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full border border-white/30 text-white/80">
                    <Close size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="mt-10 flex justify-center">
          <Btn href={SITE_CONFIG.bookingUrl} size="lg" trackLabel="fit_book_call">
            {w.cta}
          </Btn>
        </div>
      </Container>
    </Section>
  );
}
