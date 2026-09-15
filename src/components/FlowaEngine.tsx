import type { EngineStage } from "@/content/types";
import { useCycle } from "@/hooks/useCycle";

/**
 * The recurring visual DNA of the service pages: the pipeline from target
 * to opportunity as one line with a light travelling along it, each
 * stage lighting up as the light reaches it. The service decides the
 * stages; the component is the same everywhere.
 */
export function FlowaEngine({ stages, heading, body, dark = false }: { stages: EngineStage[]; heading?: string; body?: string; dark?: boolean }) {
  const { ref, step, active } = useCycle<HTMLDivElement>(stages.length, 1400, { holdLastMs: 2600 });
  const text = dark ? "text-white" : "text-fg";
  const muted = dark ? "text-white/60" : "text-muted";
  return (
    <div ref={ref} data-active={active ? "true" : "false"} className="engine">
      {(heading || body) && (
        <div className="mb-8 max-w-lead md:mb-10">
          {heading && <h2 className={`text-h3 ${text}`}>{heading}</h2>}
          {body && <p className={`mt-2 text-body ${muted}`}>{body}</p>}
        </div>
      )}
      <ol className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-2" aria-label="The Flowa engine">
        <span className={`engine-line pointer-events-none absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[13px] hidden h-px lg:block ${dark ? "engine-line-dark" : ""}`} aria-hidden="true" />
        {stages.map((s, i) => {
          const lit = i <= step;
          const current = i === step;
          return (
            <li key={s.label} className="relative flex flex-col items-start gap-3 lg:flex-1 lg:items-center lg:text-center">
              <span
                className={`relative z-[1] flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold tabular-nums transition-[background-color,border-color,color,box-shadow] duration-slow ease-flowa motion-reduce:transition-none ${
                  lit ? (dark ? "border-accent bg-accent text-fg" : "border-fg bg-fg text-bg") : dark ? "border-white/30 bg-riskband text-white/60" : "border-border bg-bg text-muted"
                } ${current ? "shadow-glow" : ""}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span>
                <span className={`block text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-slow ${lit ? text : muted}`}>{s.label}</span>
                {s.sub && <span className={`mt-0.5 block text-[12px] ${muted}`}>{s.sub}</span>}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
