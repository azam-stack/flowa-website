import type { ChannelNode, ChannelStatus } from "@/content/types";
import { useCycle } from "@/hooks/useCycle";

/**
 * The 360° view: every capability between prospect and opportunity as a
 * node, with its status stated (current service, supporting workflow,
 * planned). A light moves through the current nodes in order, so the
 * primary method is read as the core and nothing planned is mistaken
 * for something sold.
 */
const STATUS_CLS: Record<ChannelStatus, string> = {
  current: "border-border bg-card text-fg",
  supporting: "border-border bg-bg text-fg",
  future: "border-dashed border-border bg-transparent text-muted",
};
const DOT: Record<ChannelStatus, string> = { current: "bg-accent", supporting: "bg-fg/40", future: "border border-muted" };

export function ChannelSystem({ nodes, legend }: { nodes: ChannelNode[]; legend: Record<ChannelStatus, string> }) {
  const order = nodes.map((n, i) => (n.status === "current" ? i : -1)).filter((i) => i >= 0);
  const { ref, step, active } = useCycle<HTMLDivElement>(order.length, 1500, { holdLastMs: 2400 });
  const lit = order[step];
  return (
    <div ref={ref} data-active={active ? "true" : "false"}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((n, i) => {
          const isLit = i === lit;
          return (
            <li key={n.label} className={`relative rounded-card border p-4 transition-[box-shadow,border-color] duration-slow ease-flowa motion-reduce:transition-none md:p-5 ${STATUS_CLS[n.status]} ${isLit ? "border-accent/60 shadow-glow" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold">{n.label}</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                  <span className={`h-1.5 w-1.5 rounded-full ${DOT[n.status]}`} aria-hidden="true" />
                  {legend[n.status]}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-snug text-muted">{n.body}</p>
              {n.status === "current" && <span className={`absolute inset-x-5 bottom-0 h-[2px] rounded-full bg-accent transition-transform duration-slow ease-flowa motion-reduce:transition-none ${isLit ? "scale-x-100" : "scale-x-0"}`} aria-hidden="true" />}
            </li>
          );
        })}
      </ul>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-muted">
        {(Object.keys(legend) as ChannelStatus[]).map((k) => (
          <li key={k} className="inline-flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${DOT[k]}`} aria-hidden="true" />
            {legend[k]}
          </li>
        ))}
      </ul>
    </div>
  );
}
