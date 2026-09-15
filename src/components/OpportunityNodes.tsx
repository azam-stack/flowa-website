import { useCycle } from "@/hooks/useCycle";
import { MeetingCard } from "./MeetingCard";
import { demo } from "@/content/demo";

/**
 * Inside the dark band on service pages: a meeting becoming an
 * opportunity. One line from the calendar event to the pipeline entry,
 * drawn on loop, with the event settling into place each round.
 */
export function OpportunityNodes() {
  const { ref, step, active } = useCycle<HTMLDivElement>(3, 1800, { holdLastMs: 2600 });
  const m = demo.meeting;
  return (
    <div ref={ref} data-active={active ? "true" : "false"} className="relative" aria-hidden="true">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <MeetingCard time={m.time} day={m.day} title={m.title} company={m.company} person={m.person} tags={m.tags} settled={step >= 0} dark className="!p-3" />
        <div className="relative h-px w-10 bg-white/20 sm:w-16">
          <span className={`absolute inset-y-0 left-0 bg-accent transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none ${step >= 1 ? "w-full" : "w-0"}`} />
          <span className={`absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-accent transition-[left,opacity] duration-[900ms] ease-flowa motion-reduce:transition-none ${step >= 1 ? "left-[calc(100%-4px)] opacity-100" : "left-0 opacity-0"}`} />
        </div>
        <div className={`rounded-card border border-white/15 bg-white/[0.08] p-3 text-white backdrop-blur-md transition-[opacity,transform] duration-slow ease-flowa motion-reduce:transition-none ${step >= 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-60"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/60">Opportunity</p>
          <p className="mt-1 text-[14px] font-semibold">{m.company}</p>
          <p className="text-[12px] text-white/70">{step >= 2 ? "In your pipeline · proposal requested" : "Meeting held"}</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] text-white/50">{demo.label}</p>
    </div>
  );
}
