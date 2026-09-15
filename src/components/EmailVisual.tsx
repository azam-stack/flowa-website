import { Check, CornerDownLeft } from "lucide-react";
import { useCycle } from "@/hooks/useCycle";
import { demo } from "@/content/demo";
import { MeetingCard } from "./MeetingCard";

/**
 * The cold-email hero: one message moving from sent to a booked meeting.
 * The email is real UI (to, subject, preview, follow-up), the states
 * change under it, the reply arrives, the qualification fills, the
 * meeting appears. Demo data, labelled illustrative.
 */
const STATES = ["Sent", "Opened", "Replied", "Qualified", "Meeting"] as const;

export function EmailVisual() {
  const { ref, step, reduced } = useCycle<HTMLDivElement>(STATES.length, 2000, { holdLastMs: 3400 });
  const p = demo.prospects[1];
  const e = demo.email;
  const m = demo.meeting;
  const replied = step >= 2;
  const qualified = step >= 3;

  return (
    <div ref={ref} className="relative w-full" aria-hidden="true">
      <div className="absolute -inset-6 rounded-panel" style={{ background: "var(--gradient-atmosphere)" }} />
      <div className="relative rounded-card border border-border shadow-float backdrop-blur-md" style={{ background: "var(--surface-glass-strong)" }}>
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <ol className="flex items-center gap-1.5">
            {STATES.map((s, i) => (
              <li key={s} className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] transition-colors duration-slow ${i === step ? "bg-fg text-bg" : i < step ? "bg-fg/[0.06] text-fg" : "text-muted"}`}>
                {s}
              </li>
            ))}
          </ol>
          <span className="hidden text-[11px] text-muted sm:block">{demo.label}</span>
        </div>

        <div className="p-4 sm:p-5">
          <dl className="grid grid-cols-[52px_1fr] gap-y-1.5 text-[13px]">
            <dt className="text-muted">To</dt>
            <dd className="text-fg">
              <span className="font-semibold">{p.name}</span> <span className="text-muted">· {p.role}, {p.company}</span>
            </dd>
            <dt className="text-muted">Subject</dt>
            <dd className="font-medium text-fg">{e.subject}</dd>
          </dl>
          <p className="mt-3 rounded-field bg-bg/70 p-3 text-[13px] leading-relaxed text-fg">{e.preview}</p>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
            <span>{e.followUp}</span>
            <span className={`transition-opacity duration-slow ${step >= 1 ? "opacity-100" : "opacity-0"}`}>Opened · Tue 08:52</span>
          </div>

          <div className={`mt-4 flex items-start gap-2 transition-[opacity,transform] duration-slow ease-flowa motion-reduce:transition-none ${replied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            <CornerDownLeft size={14} className="mt-1 shrink-0 text-accent-display" />
            <div className="flex-1 rounded-card border border-accent/30 bg-accent/[0.08] p-3">
              <p className="text-[11px] font-semibold text-accent-display">Reply · {p.name} · Tue 09:41</p>
              <p className="mt-1 text-[13px] text-fg">“Sounds relevant. Thursday morning works if you can do 09:30.”</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className={`rounded-field border border-border bg-bg/60 p-3 transition-opacity duration-slow ${qualified ? "opacity-100" : "opacity-40"}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Qualification</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {["Fits the ICP", "Decision-maker", "Genuine interest", "Meeting agreed"].map((c, k) => {
                  const ok = qualified && (step >= 4 || k < 3);
                  return (
                    <li key={c} className={`flex items-center gap-2 text-[12px] ${ok ? "text-fg" : "text-muted"}`}>
                      <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-slow ${ok ? "bg-accent text-accent-fg" : "bg-fg/[0.06] text-transparent"}`} style={{ transitionDelay: `${k * 110}ms` }}>
                        <Check size={10} strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="min-h-[96px]">
              {step >= 4 ? (
                <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled={!reduced ? true : true} className="!p-3" />
              ) : (
                <div className="flex h-full items-center justify-center rounded-field border border-dashed border-border text-[12px] text-muted">Calendar · no meeting yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
