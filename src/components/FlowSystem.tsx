import { hero } from "@/content/site.en";

/**
 * The flow of states an opportunity passes through, in reading order:
 * four numbered glass chips along one arc from the top-left of the
 * visual down to the meeting card, which is where the line ends. The
 * line is drawn above the light-form with a pale halo under a warm
 * stroke, so it reads against the glow. A point of light travels it on
 * a slow loop and each state lights up as it passes.
 *
 * Positions are percentages of the square visual box. Under 640px the
 * line is dropped and the four states sit in two rows above the card,
 * still in reading order (1 2 / 3 4).
 */
const POS = [
  { x: 14, y: 14, sx: 18, sy: 10 },
  { x: 44, y: 7, sx: 63, sy: 10 },
  { x: 74, y: 16, sx: 24, sy: 26 },
  { x: 86, y: 42, sx: 70, sy: 26 },
];
/** Where the line ends: the meeting card's top-right corner. */
const END = { x: 52, y: 63 };
const PATH = [POS[0], POS[1], POS[2], POS[3], END]
  .map((p, i, all) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const q = all[i - 1];
    const mx = q.x + (p.x - q.x) / 2;
    return `C ${mx} ${q.y}, ${mx} ${p.y}, ${p.x} ${p.y}`;
  })
  .join(" ");

const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

export function FlowSystem() {
  const f = hero.flow;
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 hidden h-full w-full overflow-visible sm:block" preserveAspectRatio="none">
        {/* widths in viewBox units (box ≈ 560px → 0.28 ≈ 1.5px); non-scaling-stroke breaks dash-drawing in Chromium */}
        <path d={PATH} className="flow-path-halo" pathLength={1} fill="none" strokeWidth={0.9} strokeLinecap="round" style={T(900)} />
        <path d={PATH} className="flow-path" pathLength={1} fill="none" strokeWidth={0.28} strokeLinecap="round" style={T(900)} />
        {/* the travelling point lives inside the SVG so its motion path shares the viewBox units */}
        <g className="flow-dot" style={{ offsetPath: `path('${PATH}')` } as React.CSSProperties}>
          <circle r={2.4} fill="#ee9e47" opacity={0.28} />
          <circle r={1} fill="#ee9e47" />
        </g>
      </svg>
      {f.nodes.map((n, i) => (
        <div
          key={n.label}
          className="flow-node hero-rise absolute -translate-x-1/2 -translate-y-1/2"
          style={{ "--x": `${POS[i].x}%`, "--y": `${POS[i].y}%`, "--sx": `${POS[i].sx}%`, "--sy": `${POS[i].sy}%`, ...T(1000 + i * 160) } as React.CSSProperties}
        >
          <div className="flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3.5 shadow-subtle backdrop-blur-md" style={{ background: "var(--surface-glass-strong)", borderColor: "var(--glass-border-visible)" } as React.CSSProperties}>
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fg text-[11px] font-bold tabular-nums text-bg">
              {i + 1}
              <span className="flow-node-core absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-card" style={{ background: i === 3 ? "var(--status-success)" : "var(--status-neutral)", "--at": `${2400 + i * 1350}ms` } as React.CSSProperties} />
            </span>
            <span className="whitespace-nowrap">
              <span className="block text-[12px] font-semibold leading-tight text-fg">{n.label}</span>
              <span className="hidden text-[11px] leading-tight text-muted sm:block">{n.sub}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
