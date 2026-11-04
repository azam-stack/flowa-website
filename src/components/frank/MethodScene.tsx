import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { Avatar } from "./Mocks";
import { Calendar, Check, Mail } from "./Icons";
import { Section } from "./SectionHeading";

const W = 1120;
const H = 560;
const MW = 520;
const MH = 740;
const STEP_MS = 3000;
const END_HOLD_MS = 2200;
const STEPS = 4;

/**
 * The method as one scene with depth. A fixed 1120×560 stage, scaled to
 * fit, so the composition is the same on every screen. Four beats:
 *  0 read  — the market: a field of dots at the left, a few turning orange.
 *  1 find  — a person card rises out of the field and settles centre-left.
 *  2 reach — a message slides from the card to the three channel pills;
 *            the one they answer on (LinkedIn) lights; a reply slides back.
 *  3 book  — a calendar card drops in at the right and turns "Held".
 * Everything moves with real transforms; nothing fades in from nowhere.
 */
export function MethodScene() {
  const m = home.method;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [step, setStep] = useState(reduced ? STEPS - 1 : 0);
  const [auto, setAuto] = useState(true);
  const playing = auto && active && !reduced;
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [mobile, setMobile] = useState(false);
  const SW = mobile ? MW : W;
  const SH = mobile ? MH : H;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS), step === STEPS - 1 ? STEP_MS + END_HOLD_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step]);

  // Scale the fixed stage to the available width.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const bw = el.getBoundingClientRect().width;
      const m = bw < 700;
      setMobile(m);
      setScale(Math.min(1, bw / (m ? MW : W)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  return (
    <Section id="see-it-work" tone="white">
      <Container>
        <Reveal className="mx-auto max-w-[860px] text-center">
          <p className="mono-label text-brand">{m.eyebrow}</p>
          <h2 className="mt-4 text-[clamp(2.4rem,1.4rem+3.2vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
            {m.h2Light}
            <span className="dim">{m.h2Bold}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">{m.sub}</p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14">
          <div ref={ref}>
            <div ref={wrap} className="ms-frame" style={{ height: SH * scale, maxWidth: SW }}>
              <div className={`ms ${playing ? "is-live" : ""} ${mobile ? "is-m" : ""}`} data-step={step} style={{ width: SW, height: SH, transform: `scale(${scale})` }}>
                {/* glow */}
                <span className="ms-glow" aria-hidden="true" />

                {/* 0 · the market */}
                <div className="ms-market" aria-hidden="true">
                  {Array.from({ length: 11 * 9 }).map((_, i) => {
                    const hot = [13, 29, 41, 58, 67, 83, 94].includes(i);
                    return <span key={i} className={`ms-dot ${hot ? "is-hot" : ""}`} style={{ "--i": i } as CSSProperties} />;
                  })}
                </div>
                <span className="ms-cap ms-cap-market mono-label">{m.stations[0].stat}</span>

                {/* 1 · the one */}
                <div className="ms-card ms-person">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.one.name} size={44} />
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold text-ink">{m.one.name}</p>
                      <p className="truncate text-[12.5px] text-muted">{m.one.role}</p>
                    </div>
                  </div>
                  <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-pill bg-brand/12 px-2.5 py-1 text-[12px] font-medium text-brand-dark ring-1 ring-brand/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {m.one.signal}
                  </span>
                  <span className="ms-approved mt-3 flex items-center gap-2 text-[12px] text-muted">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-white">
                      <Check size={9} />
                    </span>
                    Approved by Ahmed
                  </span>
                </div>

                {/* 2 · the message, travelling */}
                <div className="ms-card ms-msg">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">Message</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-2">Saw you're hiring two SDRs. While they ramp, we can keep your calendar full…</p>
                </div>

                {/* 2 · the channels */}
                <div className="ms-channels">
                  {m.channels.map((c, i) => (
                    <div key={c.key} className={`ms-ch ms-ch-${c.key}`} style={{ "--i": i } as CSSProperties}>
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-soft text-ink">
                        <ChannelIcon kind={c.key} />
                      </span>
                      <span className="text-[14px] font-medium text-ink">{c.name}</span>
                      <span className="ms-sent ml-auto text-[11px] font-medium uppercase tracking-[0.1em] text-brand-dark">Sent</span>
                    </div>
                  ))}
                </div>

                {/* 2→3 · the reply, travelling back */}
                <div className="ms-reply">
                  <Avatar name={m.one.name} size={26} />
                  <p className="rounded-[14px] rounded-bl-[4px] bg-lime px-3.5 py-2 text-[13.5px] text-ink shadow-float">{m.reply}</p>
                </div>

                {/* 3 · the meeting */}
                <div className="ms-card ms-meeting">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-[12px] bg-brand text-white">
                      <Calendar size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] text-muted">{m.meeting.slot}</p>
                      <p className="truncate text-[15px] font-semibold text-ink">{m.meeting.title}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[12px] text-muted">Booked by Anton · brief attached</span>
                    <span className="ms-held inline-flex items-center gap-1.5 rounded-pill bg-lime px-2.5 py-1 text-[12px] font-semibold text-ink">
                      <Check size={11} /> {m.meeting.held}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* the four beats as a scrubber */}
            <ol className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 md:grid-cols-4">
              {m.stations.map((s, i) => {
                const on = i === step;
                const done = i < step;
                return (
                  <li key={s.key}>
                    <button type="button" onClick={() => pick(i)} aria-current={on ? "step" : undefined} className="w-full text-left">
                      <span className="block h-[2px] w-full overflow-hidden rounded-full bg-line">
                        <span className={`block h-full bg-brand ${on && playing ? "ms-progress" : ""}`} style={{ width: done ? "100%" : on && !playing ? "100%" : "0%", "--d": `${i === STEPS - 1 ? STEP_MS + END_HOLD_MS : STEP_MS}ms` } as CSSProperties} />
                      </span>
                      <span className={`mt-3 block text-[11px] font-medium uppercase tracking-[0.14em] ${on ? "text-brand" : "text-muted"}`}>{s.label}</span>
                      <span className={`mt-1 block text-[15px] font-semibold tracking-[-0.01em] ${on || done ? "text-ink" : "text-muted"}`}>{s.title}</span>
                      <span className="mt-1 hidden text-[13.5px] leading-snug text-ink-2 md:block">{s.body}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ChannelIcon({ kind }: { kind: string }) {
  if (kind === "email") return <Mail size={15} />;
  if (kind === "linkedin")
    return (
      <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.5 8.5H3.6V20h2.9zM5.05 3.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4zM20.4 13.2c0-3.2-1.7-4.9-4.1-4.9-1.8 0-2.7.9-3.2 1.7V8.5H10.2c0 .8 0 11.5 0 11.5h2.9v-6.4c0-.3 0-.7.1-.9.3-.7.8-1.4 1.9-1.4 1.3 0 1.8 1 1.8 2.5V20h2.9z" />
      </svg>
    );
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 3.5h3l1.6 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.7a2 2 0 0 1 2-2.2z" />
    </svg>
  );
}
