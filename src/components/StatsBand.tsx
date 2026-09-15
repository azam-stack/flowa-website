import type { Stat } from "@/content/types";
import { SourceBadge } from "./SourceBadge";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * Large numbers, small explanations, provenance on every one. Stats with
 * `value: null` are pending a real figure and are not rendered. Only a
 * verified, purely numeric value counts up; targets, benchmarks and
 * process facts are shown static so motion never lends them weight.
 */
function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const numeric = stat.sourceType === "verified" && /^\d+$/.test(stat.value ?? "");
  const n = useCountUp(numeric ? Number(stat.value) : 0, start && numeric);
  return <span className="tabular-nums">{numeric ? n : stat.value}</span>;
}

export function StatsBand({ heading, items, dark = false }: { heading: string; items: Stat[]; dark?: boolean }) {
  const shown = items.filter((s) => s.value !== null);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  if (shown.length === 0) return null;
  const cols = shown.length >= 5 ? "lg:grid-cols-5" : shown.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div ref={ref}>
      <p className={`text-eyebrow ${dark ? "text-white/70" : "text-muted"}`}>{heading}</p>
      <Reveal stagger className={`mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-card border ${dark ? "border-white/15 bg-white/15" : "border-border bg-border"} ${cols}`}>
        {shown.map((stat) => (
          <div key={stat.label} className={`flex flex-col gap-2 p-5 md:p-6 ${dark ? "bg-riskband" : "bg-card"}`}>
            <p className={`text-[34px] font-extrabold leading-none tracking-[-0.03em] md:text-[40px] ${stat.sourceType === "verified" ? "text-accent-display" : dark ? "text-white" : "text-fg"}`}>
              <StatValue stat={stat} start={inView} />
            </p>
            <p className={`text-small font-semibold ${dark ? "text-white/[0.88]" : "text-fg"}`}>{stat.label}</p>
            {stat.description && <p className={`text-[13px] leading-snug ${dark ? "text-white/60" : "text-muted"}`}>{stat.description}</p>}
            <div className="mt-auto pt-2">
              <SourceBadge type={stat.sourceType} source={stat.source} dark={dark} />
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
