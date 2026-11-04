import { useEffect, useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { Avatar } from "./Mocks";
import { Calendar, Check, Mail } from "./Icons";
import { Section } from "./SectionHeading";

const STEP_MS = 2600;
const CYCLE = 4;

/**
 * The whole chain in one picture, left to right: the market (a field of
 * dots, a few orange with a signal) → the one (a person card) → the three
 * channels (phone, email, LinkedIn; one lights as the message goes out,
 * then the reply) → the meeting (a calendar tile that turns "Held"). A
 * pulse runs along the rail from station to station while the card is on
 * screen; the captions under the rail follow. Click a caption to jump.
 */
export function MethodJourney() {
  const m = home.method;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [step, setStep] = useState(reduced ? CYCLE - 1 : 0);
  const [auto, setAuto] = useState(true);
  const playing = auto && active && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % CYCLE), step === CYCLE - 1 ? STEP_MS + 1800 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step]);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };
  const lit = (i: number) => step >= i;

  return (
    <Section id="see-it-work" tone="white">
      <Container>
        <Reveal className="max-w-[900px]">
          <p className="mono-label text-brand">{m.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.4rem,1.4rem+3.2vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            {m.h2Light}
            <span className="dim">{m.h2Bold}</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">{m.sub}</p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div ref={ref} className={`loop-card mj ${playing ? "is-live" : ""}`} data-step={step}>
            <div className="flex items-center justify-between gap-4 px-6 pt-5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
              <span key={step} className="fm-fade">
                {m.stations[step].label} · {m.stations[step].stat}
              </span>
              <span className="flex items-center gap-2 text-[#5a7a00]">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-lime text-lime" /> Live
              </span>
            </div>

            {/* the rail */}
            <div className="relative grid gap-8 px-6 pb-6 pt-8 md:grid-cols-4 md:gap-6 md:px-10 md:pb-10 md:pt-12">
              <svg className="mj-rail pointer-events-none absolute left-0 right-0 top-[132px] hidden h-[2px] w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
                <line x1="12" y1="1" x2="88" y2="1" className="mj-rail-base" pathLength={1} />
                <line x1="12" y1="1" x2="88" y2="1" className="mj-rail-pulse" pathLength={1} />
              </svg>

              {/* 01 market */}
              <Station on={lit(0)} active={step === 0} title={m.stations[0].title} body={m.stations[0].body} onPick={() => pick(0)}>
                <div className="mj-tile grid grid-cols-9 gap-[6px] p-4">
                  {Array.from({ length: 54 }).map((_, i) => {
                    const hot = [4, 11, 19, 26, 33, 40, 47].includes(i);
                    return <span key={i} className={`mj-dot ${hot ? "is-hot" : ""}`} style={{ "--i": i } as CSSProperties} />;
                  })}
                </div>
              </Station>

              {/* 02 the one */}
              <Station on={lit(1)} active={step === 1} title={m.stations[1].title} body={m.stations[1].body} onPick={() => pick(1)}>
                <div className="mj-tile flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.one.name} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-semibold text-ink">{m.one.name}</p>
                      <p className="truncate text-[12px] text-muted">{m.one.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-brand/15 px-2.5 py-1 text-[12px] font-medium text-brand-dark ring-1 ring-brand/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {m.one.signal}
                  </span>
                </div>
              </Station>

              {/* 03 reach */}
              <Station on={lit(2)} active={step === 2} title={m.stations[2].title} body={m.stations[2].body} onPick={() => pick(2)}>
                <div className="mj-tile flex flex-col gap-2 p-3">
                  {m.channels.map((c, i) => (
                    <div key={c.key} className={`mj-ch flex items-center gap-3 rounded-[12px] border border-line bg-white px-3 py-2 ${lit(2) ? "is-on" : ""}`} style={{ "--i": i } as CSSProperties}>
                      <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-soft text-ink">
                        <ChannelIcon kind={c.key} />
                      </span>
                      <span className="text-[13.5px] font-medium text-ink">{c.name}</span>
                      <span className="mj-sent ml-auto text-[11px] font-medium uppercase tracking-[0.1em] text-muted">Sent</span>
                    </div>
                  ))}
                  <div className={`mj-reply mt-1 flex items-end gap-2 ${lit(2) ? "is-on" : ""}`}>
                    <Avatar name={m.one.name} size={22} />
                    <p className="rounded-[12px] rounded-bl-[4px] bg-lime/40 px-3 py-1.5 text-[12.5px] text-ink">{m.reply}</p>
                  </div>
                </div>
              </Station>

              {/* 04 meeting */}
              <Station on={lit(3)} active={step === 3} title={m.stations[3].title} body={m.stations[3].body} onPick={() => pick(3)}>
                <div className="mj-tile flex flex-col gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-brand text-white">
                      <Calendar size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] text-muted">{m.meeting.slot}</p>
                      <p className="truncate text-[14px] font-semibold text-ink">{m.meeting.title}</p>
                    </div>
                  </div>
                  <span className={`mj-held inline-flex w-fit items-center gap-1.5 rounded-pill bg-lime px-2.5 py-1 text-[12px] font-semibold text-ink ${lit(3) ? "is-on" : ""}`}>
                    <Check size={11} /> {m.meeting.held}
                  </span>
                </div>
              </Station>
            </div>

            <p className="border-t border-line px-6 py-4 text-center text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">Every message read by a person before it sends · You pay when the meeting takes place</p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function Station({ on, active, title, body, onPick, children }: { on: boolean; active: boolean; title: string; body: string; onPick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onPick} aria-current={active ? "step" : undefined} className={`mj-station relative flex flex-col text-left ${on ? "is-on" : ""} ${active ? "is-active" : ""}`}>
      <span className="mj-node" aria-hidden="true" />
      <span className="mt-6 block w-full">{children}</span>
      <span className="mt-4 block text-[16px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
      <span className="mt-1 block text-[14px] leading-snug text-ink-2">{body}</span>
    </button>
  );
}

function ChannelIcon({ kind }: { kind: string }) {
  if (kind === "email") return <Mail size={14} />;
  if (kind === "linkedin")
    return (
      <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5H3.6V20h2.9zM5.05 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20.4 13.2c0-3.2-1.7-4.9-4.1-4.9-1.8 0-2.7.9-3.2 1.7V8.5H10.2c0 .8 0 11.5 0 11.5h2.9v-6.4c0-.3 0-.7.1-.9.3-.7.8-1.4 1.9-1.4 1.3 0 1.8 1 1.8 2.5V20h2.9z" />
      </svg>
    );
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 3.5h3l1.6 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}
