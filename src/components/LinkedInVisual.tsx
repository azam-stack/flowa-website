import { Linkedin, Check } from "lucide-react";
import { useCycle } from "@/hooks/useCycle";
import { demo } from "@/content/demo";
import { MeetingCard } from "./MeetingCard";

/**
 * The LinkedIn outreach hero: one prospect moving from research to a
 * booked meeting through a sequence, not a blast. Connection, message,
 * reply, qualification, meeting — each stage changes the status, the
 * thread and the next action, so the panel reads as one conversation
 * being worked rather than a dashboard of activity counts.
 *
 * Replaces the earlier call-session visual: phone outreach is no longer
 * a Flowa service.
 */
const STATUS = demo.linkedin.status;
const NEXT = demo.linkedin.nextAction;
const THREAD = demo.linkedin.thread;
/** From this step the thread starts filling in, one entry per step. */
const THREAD_FROM = 1;

export function LinkedInVisual() {
  const { ref, step, active, reduced } = useCycle<HTMLDivElement>(STATUS.length, 1900, { holdLastMs: 3400 });
  const p = demo.prospects[2];
  const m = demo.meeting;
  const shown = Math.max(0, Math.min(THREAD.length, step - THREAD_FROM + 1));
  const connected = step >= 2 && step < STATUS.length - 1;
  const checks = ["Fits the ICP", "Decision-maker", "Relevant problem", "Genuine interest", "Meeting agreed"];
  const passed = step <= 3 ? 0 : step === 4 ? 2 : step === 5 ? 4 : 5;

  return (
    <div ref={ref} className="relative w-full" aria-hidden="true">
      <div className="absolute -inset-6 rounded-panel" style={{ background: "var(--gradient-atmosphere)" }} />
      <div className="relative rounded-card border border-border shadow-float backdrop-blur-md" style={{ background: "var(--surface-glass-strong)" }}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-fg">
            <span className={`relative flex h-2 w-2 ${connected ? "" : "opacity-40"}`}>
              {connected && !reduced && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Sequence
          </span>
          <span className="text-[11px] text-muted">{demo.label}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-[1.1fr_1fr] sm:p-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Prospect</p>
            <p className="mt-1 text-[17px] font-semibold text-fg">{p.name}</p>
            <p className="text-[13px] text-muted">
              {p.role} · {p.company}
            </p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
              <div>
                <dt className="text-muted">Industry</dt>
                <dd className="font-medium text-fg">{p.industry}</dd>
              </div>
              <div>
                <dt className="text-muted">ICP match</dt>
                <dd className="font-semibold text-accent-text">{p.icp}%</dd>
              </div>
              <div>
                <dt className="text-muted">Stage</dt>
                <dd className="font-medium text-fg">{STATUS[step]}</dd>
              </div>
              <div>
                <dt className="text-muted">Written by</dt>
                <dd className="font-medium text-fg">A person</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-field border border-border bg-bg/60 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Qualification</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {checks.map((c, k) => {
                  const ok = k < passed;
                  return (
                    <li key={c} className={`flex items-center gap-2 text-[12px] transition-colors duration-slow ${ok ? "text-fg" : "text-muted"}`}>
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-slow ${ok ? "bg-accent text-accent-fg" : "bg-fg/[0.06] text-transparent"}`}>
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className={`relative flex flex-1 flex-col rounded-card border p-4 transition-[background-color,border-color] duration-slow ${connected ? "border-accent/40 bg-accent/[0.06]" : "border-border bg-bg/60"}`}>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-fg">
                <Linkedin size={14} className="text-accent-text" />
                {STATUS[step]}
              </span>

              <ul className="mt-3 flex flex-col gap-2">
                {THREAD.map((t, k) => (
                  <li
                    key={t.text}
                    className={`rounded-field px-2.5 py-2 text-[12px] leading-snug transition-opacity duration-slow ${
                      k < shown ? "opacity-100" : "opacity-0"
                    } ${t.from === "flowa" ? "bg-fg text-bg" : "bg-fg/[0.05] text-fg"}`}
                  >
                    {t.text}
                  </li>
                ))}
              </ul>

              {step === STATUS.length - 1 && (
                <div className="mt-3">
                  <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled className="!p-3" />
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-field bg-fg px-3 py-2 text-[12px] text-bg">
              <span className="text-bg/70">Next action</span>
              <span className="font-semibold">{NEXT[step]}</span>
            </div>
          </div>
        </div>

        <ol className="flex items-center gap-1 border-t border-border px-4 py-3 sm:px-5">
          {STATUS.map((s, i) => (
            <li key={s} className={`h-1 flex-1 rounded-full transition-colors duration-slow ${i <= step ? "bg-accent" : "bg-fg/[0.08]"}`} title={s} />
          ))}
        </ol>
      </div>
    </div>
  );
}
