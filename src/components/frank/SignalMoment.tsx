import { useEffect, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { Calendar, Check, People, Search, Sparkle } from "./Icons";
import { Section } from "./SectionHeading";

const ROW_MS = 1100; // one signal lands every ~1.1 s
const STAMP_MS = 900; // the "contacted" stamp follows the row
const HOLD_MS = 5000; // full feed rests before it replays

/**
 * "We don't call lists. We catch the moment." Timing is the product, so
 * the card is a feed: four signals land one at a time, each followed by
 * its "contacted" stamp, then the feed rests and replays. Under it the
 * ten signal types fold into three words. All rows are in the markup
 * (prerender and reduced motion show the finished feed).
 */
export function SignalMoment() {
  const m = home.moment;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const n = m.signals.length;
  // How many rows are in; stamps trail by one beat. `run` re-keys the feed to replay it.
  const [shown, setShown] = useState<number>(n);
  const [run, setRun] = useState(0);
  const playing = active && !reduced;

  useEffect(() => {
    if (!playing) {
      setShown(n);
      return;
    }
    setShown(0);
    const timers: number[] = [];
    for (let i = 1; i <= n; i++) timers.push(window.setTimeout(() => setShown(i), 300 + i * ROW_MS));
    timers.push(window.setTimeout(() => setRun((r) => r + 1), 300 + n * ROW_MS + STAMP_MS + HOLD_MS));
    return () => timers.forEach(clearTimeout);
  }, [playing, n, run]);

  return (
    <Section id="why-it-works" tone="white">
      <Container>
        <div ref={ref} className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <p className="text-eyebrow text-brand-deep">{m.eyebrow}</p>
            <h2 className="mt-3 text-statement font-semibold text-ink">
              {m.h2Light}
              <br className="hidden md:block" />
              <span className="text-muted">{m.h2Bold}</span>
            </h2>
            <p className="mt-6 max-w-lead text-sub text-ink-2">{m.sub}</p>

          </Reveal>

          <Reveal className="lg:row-span-2">
            <div className="overflow-hidden rounded-frame border border-line bg-soft shadow-float">
              <div className="flex items-center justify-between gap-4 px-6 pt-5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
                <span>{m.card.label}</span>
                <span className="flex items-center gap-2 text-[#1B7F4E]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#2BB673] text-[#2BB673]" />
                  {m.card.status}
                </span>
              </div>

              <ol key={run} className="flex flex-col gap-2.5 px-4 pb-4 pt-5 md:px-5" aria-label="Signals this week">
                {m.signals.map((s, i) => {
                  const on = i < shown;
                  return (
                    <li
                      key={s.key}
                      className={`signal-row flex items-center gap-3 rounded-[14px] border border-line bg-white p-3 md:p-3.5 ${on ? "is-on" : ""}`}
                    >
                      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-white">
                        <SignalIcon kind={s.key} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-[15px] font-semibold text-ink">{s.company}</span>
                          <span className="text-[12px] text-muted">
                            {s.source} · {s.when}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[14px] leading-snug text-ink-2">{s.signal}</span>
                      </span>
                      <Stamp show={on} delayMs={STAMP_MS} label={s.stamp} />
                    </li>
                  );
                })}
              </ol>

              <p className="border-t border-line px-6 py-4 text-center text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">{m.card.foot}</p>
            </div>

            <p className="mt-6 text-[17px] leading-snug text-ink">
              <span className="font-semibold">{m.closing.split(". ")[0]}.</span> {m.closing.split(". ").slice(1).join(". ")}
            </p>
          </Reveal>

          <Reveal className="lg:col-start-1">
            <ul className="grid gap-6 sm:grid-cols-3" aria-label="The three kinds of moment">
              {m.groups.map((g) => (
                <li key={g.name}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-deep">{g.name}</p>
                  <p className="mt-1.5 text-[15px] leading-snug text-ink">{g.line}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {g.tags.map((t) => (
                      <li key={t} className="rounded-pill border border-line bg-soft px-2.5 py-1 text-[12.5px] font-medium text-ink-2">
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Stamp({ show, delayMs, label }: { show: boolean; delayMs: number; label: string }) {
  return (
    <span className={`signal-stamp hidden flex-none items-center gap-1.5 rounded-pill px-2.5 py-1 text-[12px] font-semibold sm:inline-flex ${show ? "is-on" : ""}`} style={{ transitionDelay: show ? `${delayMs}ms` : "0ms" }}>
      <Check size={10} /> {label}
    </span>
  );
}

function SignalIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "hire":
      return <Search size={15} />;
    case "leader":
      return <People size={15} />;
    case "funding":
      return <Sparkle size={15} />;
    default:
      return <Calendar size={15} />;
  }
}
