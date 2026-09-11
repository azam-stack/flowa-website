const STAGES = ["Prospects", "Samtaler", "Kvalificerede møder", "Muligheder"];

/** Original abstract pipeline visualization — not stock imagery. Subtle motion only. */
export function PipelineVisual() {
  return (
    <div className="relative rounded-[28px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(12,12,11,0.04),0_24px_48px_-20px_rgba(12,12,11,0.16)] sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Fra kontakt til møde</span>
        <span className="flex h-2.5 w-2.5 items-center justify-center">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
        </span>
      </div>

      <div className="relative flex flex-col gap-0">
        {STAGES.map((stage, i) => (
          <div key={stage} className="relative flex items-center gap-4 py-3.5">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              {i < STAGES.length - 1 && (
                <span className="absolute left-1/2 top-8 h-[calc(100%+0.75rem)] w-px -translate-x-1/2 overflow-hidden bg-border">
                  <span
                    className="absolute left-0 top-0 h-3 w-px bg-accent motion-safe:animate-[flow_2.6s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  />
                </span>
              )}
              <span
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                  i === STAGES.length - 1 ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-fg"
                }`}
              >
                {i + 1}
              </span>
            </div>
            <span className={`text-[15px] font-medium ${i === STAGES.length - 1 ? "text-fg" : "text-fg/75"}`}>{stage}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-fg/[0.03] p-4">
        <p className="text-sm leading-relaxed text-muted">
          I ser kun møder, der lever op til jeres kriterier — resten sorterer vi fra, før det når jeres kalender.
        </p>
      </div>

      <style>{`
        @keyframes flow {
          0% { top: 0; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: calc(100% - 0.75rem); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
