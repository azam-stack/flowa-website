import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { Check } from "./Icons";
import { Section } from "./SectionHeading";

/**
 * The buyer's real alternative, side by side: hiring an SDR against
 * working with Flowa. Two framed columns, the Flowa column in ink so the
 * eye lands on the deal. One closing line.
 */
export function SdrMath() {
  const m = home.math;
  return (
    <Section id="the-alternative">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-eyebrow text-brand-deep">{m.eyebrow}</p>
          <h2 className="mt-3 text-h2 font-light text-ink">
            {m.h2Light}
            <strong className="font-semibold">{m.h2Bold}</strong>
          </h2>
          <p className="mt-4 max-w-lead text-sub text-ink-2">{m.sub}</p>
        </Reveal>
        <Reveal stagger className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
          <div className="framed p-7 md:p-9" style={{ "--i": 0 } as CSSProperties}>
            <h3 className="text-[22px] font-semibold text-ink">{m.left.title}</h3>
            <ul className="mt-6 divide-y divide-ink/10">
              {m.left.rows.map((r) => (
                <li key={r} className="flex gap-3 py-3 text-[16px] leading-snug text-ink-2">
                  <span aria-hidden="true" className="mt-[9px] h-[6px] w-[6px] flex-none rounded-full bg-ink/30" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-frame border border-ink bg-ink p-7 text-white shadow-float md:p-9" style={{ "--i": 1 } as CSSProperties}>
            <h3 className="text-[22px] font-semibold">{m.right.title}</h3>
            <ul className="mt-6 divide-y divide-white/10">
              {m.right.rows.map((r) => (
                <li key={r} className="flex gap-3 py-3 text-[16px] leading-snug text-white/85">
                  <span className="mt-[2px] grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-ink">
                    <Check size={11} />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal className="mt-8">
          <p className="serif text-[24px] italic leading-snug text-ink md:text-[28px]">{m.foot}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
