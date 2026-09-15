import { hero } from "@/content/site.en";

/**
 * The flow system: four states an opportunity passes through, set as
 * small glass chips along one path over the light-form, ending in the
 * meeting card (rendered by the hero). The path draws itself after the
 * form has come into focus, the chips arrive in order, and a single
 * point of light then travels the path on a slow loop — information
 * moving through the system. Conceptual and anonymised; the note says so.
 *
 * Positions are percentages of the square visual box. On small screens
 * the first node is dropped and the rest sit closer to the card.
 */
/** Desktop positions (% of the square box) and the tighter mobile set. */
const POS = [
  { x: 6, y: 26, sx: 50, sy: 8 },
  { x: 30, y: 9, sx: 24, sy: 8 },
  { x: 64, y: 13, sx: 60, sy: 18 },
  { x: 84, y: 40, sx: 66, sy: 28 },
];
const END = { x: 34, y: 80 };
/** One smooth line through the states: cubic segments with horizontal tangents. */
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
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 hidden h-full w-full overflow-visible sm:block" preserveAspectRatio="none">
        <path d={PATH} className="flow-path" pathLength={1} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" style={T(900)} />
      </svg>
      <span className="flow-dot hidden sm:block" style={{ offsetPath: `path('${PATH}')` } as React.CSSProperties} />
      {f.nodes.map((n, i) => (
        <div
          key={n.label}
          className={`flow-node hero-rise absolute -translate-x-1/2 -translate-y-1/2 ${i === 0 ? "hidden sm:block" : ""}`}
          style={{ "--x": `${POS[i].x}%`, "--y": `${POS[i].y}%`, "--sx": `${POS[i].sx}%`, "--sy": `${POS[i].sy}%`, ...T(1000 + i * 160) } as React.CSSProperties}
        >
          <div className="parallax flex items-center gap-2.5 rounded-full border py-1.5 pl-2 pr-3.5 shadow-subtle backdrop-blur-md" style={{ "--p": `${10 + i * 8}px`, background: "var(--surface-glass)", borderColor: "var(--glass-border-visible)" } as React.CSSProperties}>
            <span className="flow-node-core h-2 w-2 shrink-0 rounded-full" style={{ background: i === 3 ? "var(--status-success)" : "var(--status-neutral)", "--at": `${2400 + i * 1350}ms` } as React.CSSProperties} />
            <span className="whitespace-nowrap">
              <span className="block text-[12px] font-semibold leading-tight text-fg">{n.label}</span>
              <span className="block text-[11px] leading-tight text-muted">{n.sub}</span>
            </span>
          </div>
        </div>
      ))}
      <span className="hero-rise absolute right-0 top-full mt-3 text-[11px] text-muted sm:right-auto sm:left-0" style={T(1800)}>
        {f.note}
      </span>
    </div>
  );
}
