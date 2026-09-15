import { useEffect, useState } from "react";
import { Phone, Check } from "lucide-react";
import { useCycle } from "@/hooks/useCycle";
import { demo } from "@/content/demo";
import { MeetingCard } from "./MeetingCard";

/**
 * The cold-calling hero: one prospect moving from research to a booked
 * meeting through a call interface. Status, duration, qualification and
 * next action all change with the stage. It is a Flowa system, not a
 * call-centre dashboard: one prospect, one conversation, one outcome.
 */
const STATUS = demo.call.status;
const NEXT = demo.call.nextAction;
const CONNECTED_FROM = 3;

export function DialerVisual() {
  const { ref, step, active, reduced } = useCycle<HTMLDivElement>(STATUS.length, 1900, { holdLastMs: 3400 });
  const p = demo.prospects[1];
  const m = demo.meeting;
  const [seconds, setSeconds] = useState(0);
  const connected = step >= CONNECTED_FROM && step < STATUS.length - 1;

  useEffect(() => {
    if (step < CONNECTED_FROM) setSeconds(0);
    if (!connected || !active || reduced) return;
    const t = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [connected, active, reduced, step]);

  const dur = reduced ? 402 : seconds + (step >= CONNECTED_FROM ? (step - CONNECTED_FROM) * 57 : 0);
  const mm = String(Math.floor(dur / 60)).padStart(2, "0");
  const ss = String(dur % 60).padStart(2, "0");
  const checks = ["Fits the ICP", "Decision-maker", "Relevant problem", "Genuine interest", "Meeting agreed"];
  const passed = step <= 3 ? 0 : step === 4 ? 2 : step === 5 ? 4 : 5;
  const dialling = step === 2;

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
            Call session
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
                <dd className="font-semibold text-accent-display">{p.icp}%</dd>
              </div>
              <div>
                <dt className="text-muted">Call status</dt>
                <dd className="font-medium text-fg">{STATUS[step]}</dd>
              </div>
              <div>
                <dt className="text-muted">Duration</dt>
                <dd className="font-medium tabular-nums text-fg">{step >= CONNECTED_FROM ? `${mm}:${ss}` : "—"}</dd>
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
            <div className={`relative flex flex-1 flex-col items-center justify-center rounded-card border p-5 text-center transition-[background-color,border-color] duration-slow ${connected ? "border-accent/40 bg-accent/[0.06]" : "border-border bg-bg/60"}`}>
              <span className={`relative flex h-14 w-14 items-center justify-center rounded-full ${connected || dialling ? "bg-fg text-bg" : "bg-fg/[0.06] text-fg"}`}>
                {dialling && !reduced && <span className="absolute inset-0 animate-ping rounded-full bg-fg/30" />}
                <Phone size={20} className="relative" />
              </span>
              <p className="mt-3 text-[13px] font-bold uppercase tracking-[0.1em] text-fg">{STATUS[step]}</p>
              {connected && (
                <span className="mt-3 flex h-6 items-end gap-[3px]">
                  {Array.from({ length: 14 }, (_, k) => (
                    <span key={k} className="wave block w-[3px] rounded-full bg-accent" style={{ animationDelay: `${k * 90}ms`, animationPlayState: active && !reduced ? "running" : "paused" }} />
                  ))}
                </span>
              )}
              {step === STATUS.length - 1 && (
                <div className="mt-3 w-full text-left">
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
