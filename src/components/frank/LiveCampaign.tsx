import { useEffect, useState, type ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { asset } from "@/lib/asset";
import { Avatar } from "./Mocks";
import { Calendar, Check, Mail, Search } from "./Icons";
import { Section } from "./SectionHeading";

const STEP_MS = 2800;
const END_HOLD_MS = 4200;

/**
 * "Watch a campaign run": the product, shown working. Six steps from a
 * public signal to a booked meeting, played one by one while the section
 * is on screen, with the human approval step as the visual centre. The
 * step rail on the left is clickable; clicking stops autoplay. All rows
 * are always rendered (the prerendered HTML and reduced motion show the
 * whole run); the active one is highlighted, later ones are faded.
 */
export function LiveCampaign() {
  const d = home.demo;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const last = d.steps.length - 1;
  const playing = auto && active && !reduced;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? END_HOLD_MS : STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, step, last]);

  const shown = reduced ? last : step;
  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  return (
    <Section id="see-it-work">
      <Container>
        <div ref={ref} className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <Reveal>
            <p className="text-eyebrow text-brand-deep">{d.eyebrow}</p>
            <h2 className="mt-3 text-h2 text-ink">
              {d.h2Light}
              <span className="font-semibold">{d.h2Bold}</span>
            </h2>
            <p className="mt-4 max-w-lead text-sub text-ink-2">{d.sub}</p>

            <ol className="mt-8 hidden flex-col lg:flex">
              {d.steps.map((s, i) => {
                const on = i === shown;
                const done = i < shown;
                return (
                  <li key={s.key}>
                    <button
                      type="button"
                      onClick={() => pick(i)}
                      aria-current={on ? "step" : undefined}
                      className={`group relative flex w-full items-start gap-4 rounded-[14px] px-3 py-3 text-left transition-colors ${on ? "bg-white shadow-float" : "hover:bg-white/60"}`}
                    >
                      <span className={`mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full border text-[12px] font-semibold transition-colors ${on ? "border-ink bg-ink text-white" : done ? "border-ink bg-brand text-ink" : "border-line bg-white text-muted"}`}>
                        {done ? <Check size={12} /> : i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className={`text-[16px] font-semibold ${on || done ? "text-ink" : "text-muted"}`}>{s.name}</span>
                          <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-brand-deep">{s.when}</span>
                        </span>
                        <span className={`mt-0.5 block text-[14px] leading-snug transition-colors ${on ? "text-ink-2" : "text-muted"}`}>{s.line}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-frame border border-ink bg-white shadow-lift">
              <div className="flex items-center gap-3 border-b border-line bg-soft px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5E1DA]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5E1DA]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5E1DA]" />
                </span>
                <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{d.windowTitle}</p>
                <span className="flex items-center gap-1.5 text-[12px] text-muted">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#2BB673] text-[#2BB673]" /> live
                </span>
              </div>

              <div className="flex flex-col gap-2.5 p-3 md:p-4" aria-hidden="true">
                {d.steps.map((s, i) => (
                  <Row key={s.key} index={i} shown={shown} when={s.when} name={s.name} onPick={() => pick(i)}>
                    <FeedBody kind={s.key} />
                  </Row>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5">
                <p className="text-[12px] text-muted">{d.illustrative}</p>
                <div className="flex gap-1" aria-hidden="true">
                  {d.steps.map((s, i) => (
                    <span key={s.key} className={`h-1.5 rounded-full transition-all duration-500 ${i === shown ? "w-6 bg-ink" : i < shown ? "w-1.5 bg-ink/50" : "w-1.5 bg-line"}`} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Row({ index, shown, when, name, onPick, children }: { index: number; shown: number; when: string; name: string; onPick: () => void; children: ReactNode }) {
  const on = index === shown;
  const later = index > shown;
  const approve = home.demo.steps[index].key === "approve";
  return (
    <div
      onClick={onPick}
      className={`cursor-pointer rounded-[14px] border p-3 transition-all duration-500 md:p-3.5 ${
        on ? (approve ? "border-ink bg-brand/15 shadow-float" : "border-ink bg-white shadow-float") : later ? "border-transparent bg-soft opacity-40" : "border-line bg-white"
      }`}
    >
      <p className="mb-2 flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
        <span className={on ? "text-ink" : ""}>{name}</span>
        <span className="h-px flex-1 bg-line" />
        <span className={on ? "text-brand-deep" : ""}>{when}</span>
      </p>
      <div key={on ? "on" : "off"} className={on ? "swap-in" : ""}>
        {children}
      </div>
    </div>
  );
}

function Chip({ children, tone = "soft" }: { children: ReactNode; tone?: "soft" | "brand" | "ok" }) {
  const cls = tone === "brand" ? "bg-brand/25 text-ink" : tone === "ok" ? "bg-[#2BB673]/12 text-[#1B7F4E]" : "bg-soft text-ink-2";
  return <span className={`inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[12px] font-medium ${cls}`}>{children}</span>;
}

function FeedBody({ kind }: { kind: string }) {
  const f = home.demo.feed;
  switch (kind) {
    case "find":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white">
            <Search size={14} />
          </span>
          <span className="mr-1 text-[14px] text-ink">{f.find.title}</span>
          {f.find.chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      );
    case "qualify":
      return (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <Avatar name={f.qualify.name} size={36} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-ink">{f.qualify.name}</p>
              <p className="truncate text-[12.5px] text-muted">{f.qualify.role}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip tone="brand">{f.qualify.signal}</Chip>
            {f.qualify.checks.map((c) => (
              <Chip key={c} tone="ok">
                <Check size={10} /> {c}
              </Chip>
            ))}
          </div>
        </div>
      );
    case "draft":
      return (
        <div className="rounded-[10px] border border-line bg-white px-3 py-2.5">
          <p className="text-[12px] text-muted">
            Subject: <span className="font-medium text-ink">{f.draft.subject}</span>
          </p>
          <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{f.draft.body}</p>
          <p className="mt-2 text-[11.5px] font-medium text-brand-deep">{f.draft.by}</p>
        </div>
      );
    case "approve":
      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="relative h-10 w-10 flex-none">
            <img src={asset("images/team/ahmed.webp")} alt="" width={40} height={40} loading="lazy" className="h-full w-full rounded-full object-cover ring-2 ring-white" />
            <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-brand text-ink ring-2 ring-white">
              <Check size={9} />
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-ink">{f.approve.text}</p>
            <p className="text-[12.5px] text-muted">{f.approve.note}</p>
          </div>
          <span className="text-[12px] text-muted">{f.approve.time}</span>
        </div>
      );
    case "send":
      return (
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-soft text-ink">
            <Mail size={14} />
          </span>
          <p className="text-[14px] text-ink">{f.send.text}</p>
          <span className="text-[12.5px] text-muted">{f.send.meta}</span>
        </div>
      );
    case "book":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Avatar name={f.qualify.name} size={24} />
            <p className="rounded-[12px] rounded-bl-[4px] bg-soft px-3 py-1.5 text-[13.5px] text-ink">{f.book.reply}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#2BB673] text-white">
              <Calendar size={14} />
            </span>
            <p className="text-[14px] font-semibold text-ink">{f.book.text}</p>
            <span className="text-[12.5px] text-muted">{f.book.meta}</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}
