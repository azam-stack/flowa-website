import { useEffect, useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/content/frank/pages";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { asset } from "@/lib/asset";
import { Avatar } from "./Mocks";
import { Calendar, Check, Mail, Search, SmileyBall } from "./Icons";
import { Section } from "./SectionHeading";

const STEP_MS = 4200;
const LAST_HOLD_MS = 5200;

/**
 * "How Frank works": the loop shown as a product, not described by a
 * character. Left, the six steps with their cadence; one is open at a
 * time and the list advances on its own (click to jump, which stops
 * autoplay). Right, one dark product window that plays a small scene
 * for the open step: a search that counts, a lead that passes three
 * checks, a message being typed, a person pressing Approve, a paced
 * send, a booked slot. Plays only on screen; reduced motion shows the
 * last scene with the whole rail readable.
 */
export function FrankMotion({ id = "how-frank-works" }: { id?: string }) {
  const steps = howItWorks.steps;
  const m = howItWorks.motion;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const last = steps.length - 1;
  const playing = auto && active && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? LAST_HOLD_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step, last]);

  const shown = reduced ? last : step;
  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  return (
    <Section id={id}>
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-eyebrow text-brand-deep">{m.eyebrow}</p>
          <h2 className="mt-3 text-h2 text-ink">
            {m.h2Light}
            <span className="font-semibold">{m.h2Bold}</span>
          </h2>
          <p className="mt-4 max-w-lead text-sub text-ink-2">{m.sub}</p>
        </Reveal>

        <div ref={ref} className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Step rail */}
          <Reveal as="ol" className="order-2 lg:order-1" aria-label="The six steps">
            {steps.map((s, i) => {
              const on = i === shown;
              return (
                <li key={s.n} className="border-b border-line">
                  <button type="button" onClick={() => pick(i)} aria-current={on ? "step" : undefined} className="grid w-full grid-cols-[96px_minmax(0,1fr)] items-baseline gap-4 py-4 text-left md:grid-cols-[120px_minmax(0,1fr)] md:py-5">
                    <span className={`text-[11px] font-medium uppercase leading-snug tracking-[0.14em] ${on ? "text-brand-deep" : "text-muted/70"}`}>{s.when}</span>
                    <span className="min-w-0">
                      <span className={`block text-[26px] font-semibold leading-tight tracking-[-0.02em] transition-colors md:text-[30px] ${on ? "text-ink" : "text-muted/60"}`}>{s.title}</span>
                      <span className={`fm-body ${on ? "is-open" : ""}`}>
                        <span className="block pt-2 text-[15px] leading-relaxed text-ink-2 md:text-[16px]">{s.body}</span>
                        {on && playing && <span className="fm-progress mt-4 block h-[2px] w-full bg-line" style={{ "--d": `${i === last ? LAST_HOLD_MS : STEP_MS}ms` } as CSSProperties} />}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </Reveal>

          {/* Product window */}
          <Reveal className="order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start">
            <div className="fm-window">
              <div className="flex items-center justify-between gap-3 px-5 py-3.5 text-[13px]">
                <span className="flex items-center gap-2 font-medium text-white">
                  <span className="grid h-6 w-6 place-items-center rounded-[7px] bg-white/10">
                    <SmileyBall size={14} className="[&_path]:fill-brand" />
                  </span>
                  {m.windowTitle}
                </span>
                <span className="flex items-center gap-2 rounded-pill bg-white/[0.07] px-3 py-1 text-[12px] text-white/80">
                  <span className={`h-1.5 w-1.5 rounded-full ${shown === last ? "bg-[#2BB673]" : "bg-brand"} ${playing ? "live-dot" : ""}`} />
                  <span key={shown} className="fm-fade">
                    {m.status[shown]}
                  </span>
                </span>
              </div>
              <div className="relative grid min-h-[380px] place-items-center p-5 md:min-h-[440px] md:p-8">
                <div key={shown} className="fm-scene w-full max-w-[440px]">
                  <Scene step={steps[shown].title} playing={playing} />
                </div>
              </div>
              <p className="border-t border-white/10 px-5 py-3 text-[11.5px] text-white/45">{m.illustrative}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Types `text` character by character while `on`; shows it whole otherwise. */
function useTyped(text: string, on: boolean, cps = 38, delay = 300) {
  const [n, setN] = useState(on ? 0 : text.length);
  useEffect(() => {
    if (!on) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    let t = 0;
    const start = window.setTimeout(() => {
      t = window.setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) window.clearInterval(t);
      }, 1000 / cps);
    }, delay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(t);
    };
  }, [text, on, cps, delay]);
  return { out: text.slice(0, n), done: n >= text.length };
}

function Row({ i, children, className = "" }: { i: number; children: React.ReactNode; className?: string }) {
  return (
    <div className={`fm-row ${className}`} style={{ "--i": i } as CSSProperties}>
      {children}
    </div>
  );
}

function Scene({ step, playing }: { step: string; playing: boolean }) {
  const m = howItWorks.motion;
  switch (step) {
    case "Find":
      return <FindScene playing={playing} />;
    case "Qualify":
      return (
        <div className="fm-card">
          <Row i={0} className="flex items-center gap-3">
            <Avatar name={m.qualify.name} size={40} />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-white">{m.qualify.name}</p>
              <p className="truncate text-[12.5px] text-white/60">{m.qualify.role}</p>
            </div>
          </Row>
          <Row i={1} className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-brand/20 px-2.5 py-1 text-[12.5px] font-medium text-brand">{m.qualify.signal}</span>
          </Row>
          <ul className="mt-4 flex flex-col gap-2">
            {m.qualify.checks.map((c, i) => (
              <Row key={c} i={i + 3} className="flex items-center gap-2.5 text-[14px] text-white/90">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2BB673] text-white">
                  <Check size={11} />
                </span>
                {c}
              </Row>
            ))}
          </ul>
        </div>
      );
    case "Draft":
      return <DraftScene playing={playing} />;
    case "Approve":
      return <ApproveScene playing={playing} />;
    case "Send":
      return (
        <div className="fm-card">
          <Row i={0} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
              <Mail size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-white">{m.send.line}</p>
              <p className="text-[12.5px] text-white/60">{m.send.meta}</p>
            </div>
            <span className="rounded-pill bg-white/[0.07] px-2.5 py-1 text-[12px] text-white/70">{m.send.channel}</span>
          </Row>
          <Row i={2} className="mt-5">
            <span className="fm-send block h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-full origin-left bg-brand" />
            </span>
          </Row>
          <Row i={5} className="mt-3 flex items-center gap-2 text-[13px] text-white/80">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2BB673] text-white">
              <Check size={11} />
            </span>
            Sent · Tue 09:48
          </Row>
        </div>
      );
    case "Book":
      return (
        <div className="flex w-full flex-col gap-3">
          <Row i={0} className="flex items-end gap-2">
            <Avatar name={m.qualify.name} size={28} />
            <p className="rounded-[14px] rounded-bl-[4px] bg-white/10 px-3.5 py-2 text-[14px] text-white">{m.book.reply}</p>
          </Row>
          <Row i={3} className="fm-card flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-[12px] bg-[#2BB673] text-white">
              <Calendar size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-[20px] font-semibold leading-none text-white">{m.book.slot}</p>
              <p className="mt-1.5 text-[12.5px] text-white/60">{m.book.meta}</p>
            </div>
          </Row>
        </div>
      );
    default:
      return null;
  }
}

function FindScene({ playing }: { playing: boolean }) {
  const m = howItWorks.motion;
  const { out, done } = useTyped(m.find.query, playing, 30, 400);
  return (
    <div className="w-full">
      <div className="fm-card flex items-center gap-3">
        <Search size={16} className="flex-none text-white/60" />
        <p className="min-h-[22px] text-[15px] text-white">
          {out || <span className="text-white/40">{m.find.placeholder}</span>}
          {playing && !done && <span className="fm-caret" />}
        </p>
      </div>
      <div className={`mt-3 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-wrap gap-2">
          {m.find.sources.map((s, i) => (
            <Row key={s} i={i} className="rounded-pill border border-white/15 px-2.5 py-1 text-[12px] text-white/70">
              {s}
            </Row>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {m.find.results.map((r, i) => (
            <Row key={r} i={i + 4} className="fm-card flex items-center gap-3 !py-3">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-[15px] font-medium text-white">{r}</span>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
}

function DraftScene({ playing }: { playing: boolean }) {
  const m = howItWorks.motion;
  const { out, done } = useTyped(m.draft.body, playing, 60, 500);
  return (
    <div className="fm-card">
      <p className="text-[12.5px] text-white/55">
        To <span className="text-white/85">{m.draft.to}</span>
      </p>
      <p className="mt-1 text-[12.5px] text-white/55">
        Subject <span className="font-medium text-white">{m.draft.subject}</span>
      </p>
      <p className="mt-4 min-h-[96px] text-[15px] leading-relaxed text-white/90">
        {out}
        {playing && !done && <span className="fm-caret" />}
      </p>
      <p className="mt-3 text-[11.5px] font-medium uppercase tracking-[0.12em] text-brand">Drafted by Frank</p>
    </div>
  );
}

function ApproveScene({ playing }: { playing: boolean }) {
  const m = howItWorks.motion;
  const [done, setDone] = useState(!playing);
  useEffect(() => {
    if (!playing) {
      setDone(true);
      return;
    }
    setDone(false);
    const t = window.setTimeout(() => setDone(true), 2000);
    return () => window.clearTimeout(t);
  }, [playing]);
  return (
    <div className="fm-card">
      <Row i={0} className="flex items-center gap-3">
        <span className="relative h-11 w-11 flex-none">
          <img src={asset("images/team/ahmed.webp")} alt="" width={44} height={44} loading="lazy" className="h-full w-full rounded-full object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-white">{m.approve.who}</p>
          <p className="text-[12.5px] text-white/60">{done ? m.approve.done : m.approve.waiting}</p>
        </div>
      </Row>
      <Row i={1} className="mt-5">
        <span className={`fm-approve ${done ? "is-done" : ""} ${playing ? "is-live" : ""}`}>
          <span className="fm-approve-label">
            <Check size={14} /> {done ? "Approved" : m.approve.button}
          </span>
        </span>
      </Row>
      <p className="mt-4 text-[12px] text-white/50">{m.approve.note}</p>
    </div>
  );
}
