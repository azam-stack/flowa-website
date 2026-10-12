import { useId, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { meetingValue as t } from "@/content/frank/snapshot";
import { SectionHeading, Section } from "./SectionHeading";

const PILOT = 400;
const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

/**
 * "What is one meeting worth to you?": two inputs, one answer. Runs only
 * in the browser; nothing is sent or stored.
 */
export function MeetingValue() {
  const uid = useId();
  const [deal, setDeal] = useState(10000);
  const [rate, setRate] = useState(2);
  const value = (Math.max(0, deal) * rate) / 10;
  const multiple = value / PILOT;
  const payback = Math.floor(Math.max(0, deal) / PILOT);

  return (
    <Section id="meeting-value">
      <Container>
        <SectionHeading title={<>{t.h2Light}<span className="font-semibold">{t.h2Bold}</span></>} sub={t.sub} />
        <Reveal className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-frame border border-ink bg-white md:mt-14 md:grid-cols-2">
          <div className="flex flex-col gap-6 p-6 md:p-8">
            <div>
              <label htmlFor={`${uid}-deal`} className="mb-2 block text-[15px] font-medium text-ink">
                {t.dealLabel}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[17px] text-muted">£</span>
                <input
                  id={`${uid}-deal`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  value={Number.isFinite(deal) ? deal : 0}
                  onChange={(e) => setDeal(Number(e.target.value) || 0)}
                  className="control h-12 pl-9 text-[17px]"
                />
              </div>
            </div>
            <div>
              <label htmlFor={`${uid}-rate`} className="mb-2 block text-[15px] font-medium text-ink">
                {t.rateLabel}
              </label>
              <div className="flex items-center gap-4">
                <input id={`${uid}-rate`} type="range" min={1} max={5} step={1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[#0C0C0B]" />
                <span className="w-14 flex-none text-right text-[17px] font-semibold text-ink">{rate} / 10</span>
              </div>
            </div>
            <p className="text-small text-muted">{t.note}</p>
          </div>
          <div className="flex flex-col justify-center gap-5 bg-ink p-6 text-white md:p-8" aria-live="polite">
            <div>
              <p className="text-[15px] text-white/70">{t.resultLabel}</p>
              <p className="mt-1 text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-light leading-none tracking-[-0.03em]">{gbp(value)}</p>
              <p className="mt-2 text-[15px] text-white/80">
                <span className="font-semibold text-brand">{multiple >= 1 ? `${multiple.toFixed(multiple >= 10 ? 0 : 1)}×` : `${Math.round(multiple * 100)}%`}</span> {t.vsPilot}
              </p>
            </div>
            <div className="border-t border-white/15 pt-5">
              <p className="text-[15px] text-white/70">{t.payback}</p>
              <p className="mt-1 text-[24px] font-semibold">
                {payback} {t.paybackUnit}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
