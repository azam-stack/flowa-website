import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { Section } from "./SectionHeading";

/**
 * "Your market, through Frank's eyes": an isometric skyline drawn on a
 * canvas. Every tile is a company. Frank's scan sweeps across the flat
 * market, then the companies with a signal rise, the ones that fit rise
 * higher and turn orange, and the booked ones rise highest with a pin.
 * Plays once when it scrolls into view; "Play again" replays it. Under
 * reduced motion the finished skyline is drawn straight away. Raised
 * towers show their (fictional) company and signal on hover.
 */

const COLS = 24;
const ROWS = 10;
const TOTAL_MS = 8200;
/** Stage start times (ms): scan, signals rise, fit rises, booked rises. */
const T = { scan: 300, signal: 2500, fit: 4300, booked: 5900 } as const;

type Level = 0 | 1 | 2 | 3;
type Cell = { c: number; r: number; level: Level; idx: number; jitter: number };

const COLORS = {
  0: { top: "#E9E5DD", left: "#DBD6CC", right: "#D0CAC0" },
  1: { top: "#FBD9B3", left: "#EFC08F", right: "#E2B27E" },
  2: { top: "#FFB15C", left: "#E58A2E", right: "#C9701F" },
  3: { top: "#2A2926", left: "#141412", right: "#0C0C0B" },
} as const;
const HEIGHTS = { 0: 0, 1: 0.55, 2: 1.15, 3: 1.9 } as const;

/** A small deterministic PRNG so the skyline is the same on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildCells(): Cell[] {
  const rand = rng(7);
  const cells: Cell[] = [];
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) cells.push({ c, r, level: 0, idx: -1, jitter: rand() });
  // Pick 18 raised cells away from the very edges, spread across the grid.
  const inner = cells.filter((x) => x.c > 1 && x.c < COLS - 2 && x.r > 0 && x.r < ROWS - 1);
  const picked: Cell[] = [];
  while (picked.length < 18) {
    const cand = inner[Math.floor(rand() * inner.length)];
    if (picked.some((p) => Math.abs(p.c - cand.c) + Math.abs(p.r - cand.r) < 3)) continue;
    picked.push(cand);
  }
  picked.forEach((p, i) => {
    p.idx = i;
    p.level = i < 3 ? 3 : i < 7 ? 2 : 1;
  });
  return cells;
}

const ease = (x: number) => {
  const t = Math.min(1, Math.max(0, x));
  const c1 = 1.4;
  return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Height (as a fraction of the tile width) of a cell at time ms. */
function heightAt(cell: Cell, ms: number): number {
  if (cell.level === 0) return 0;
  const d = cell.jitter * 380;
  let h = ease((ms - T.signal - d) / 650) * HEIGHTS[1];
  if (cell.level >= 2) h += ease((ms - T.fit - d) / 650) * (HEIGHTS[2] - HEIGHTS[1]);
  if (cell.level >= 3) h += ease((ms - T.booked - d) / 700) * (HEIGHTS[3] - HEIGHTS[2]);
  return Math.max(0, h);
}

/** The colour level a cell shows at time ms. */
function levelAt(cell: Cell, ms: number): Level {
  if (cell.level >= 3 && ms >= T.booked + cell.jitter * 380 + 250) return 3;
  if (cell.level >= 2 && ms >= T.fit + cell.jitter * 380 + 200) return 2;
  if (cell.level >= 1 && ms >= T.signal + cell.jitter * 380 + 150) return 1;
  return 0;
}

function stageAt(ms: number): number {
  if (ms >= T.booked) return 3;
  if (ms >= T.fit) return 2;
  if (ms >= T.signal) return 1;
  return 0;
}

export function MarketSkyline() {
  const d = home.skyline;
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35, once: true });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const cells = useMemo(buildCells, []);
  const [ms, setMs] = useState(0);
  const [run, setRun] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number; name: string; signal: string; level: Level } | null>(null);
  const geo = useRef({ w: 0, ox: 0, oy: 0, cssW: 0, cssH: 0 });
  const msRef = useRef(0);

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const cssW = wrap.clientWidth;
      const w = (cssW * 2) / (COLS + ROWS); // tile width
      const maxH = w * HEIGHTS[3] + w * 0.9;
      const cssH = Math.round(((COLS + ROWS) * w) / 4 + maxH + 8);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        canvas.style.height = `${cssH}px`;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      const ox = (ROWS * w) / 2; // x of cell (0,0) centre
      const oy = maxH;
      geo.current = { w, ox, oy, cssW, cssH };

      // Scan wave: a diagonal band moving across c + r.
      const scanP = (time - T.scan) / (T.signal - T.scan); // 0..1
      const wavePos = scanP * (COLS + ROWS + 6) - 3;

      const order = [...cells].sort((a, b) => a.c + a.r - (b.c + b.r) || a.c - b.c);
      const k = 0.43; // half-size of the drawn tile (gap between tiles)
      for (const cell of order) {
        const x = ox + ((cell.c - cell.r) * w) / 2;
        const y = oy + ((cell.c + cell.r) * w) / 4;
        const h = heightAt(cell, time) * w + 0.12 * w;
        const lv = levelAt(cell, time);
        let top: string = COLORS[lv].top;
        let left: string = COLORS[lv].left;
        const right: string = COLORS[lv].right;
        const dist = Math.abs(cell.c + cell.r - wavePos);
        if (scanP > 0 && scanP < 1.05 && dist < 2.2 && lv === 0) {
          const glow = 1 - dist / 2.2;
          top = glow > 0.5 ? "#FFF3E2" : "#F6EEE2";
          left = glow > 0.5 ? "#F2DDBF" : left;
        }
        const hw = w * k;
        const hh = (w / 2) * k;
        // top diamond centred at (x, y + w/4 - h)
        const cy = y + w / 4 - h;
        ctx.beginPath();
        ctx.moveTo(x, cy - hh);
        ctx.lineTo(x + hw, cy);
        ctx.lineTo(x, cy + hh);
        ctx.lineTo(x - hw, cy);
        ctx.closePath();
        ctx.fillStyle = top;
        ctx.fill();
        // left face
        ctx.beginPath();
        ctx.moveTo(x - hw, cy);
        ctx.lineTo(x, cy + hh);
        ctx.lineTo(x, cy + hh + h);
        ctx.lineTo(x - hw, cy + h);
        ctx.closePath();
        ctx.fillStyle = left;
        ctx.fill();
        // right face
        ctx.beginPath();
        ctx.moveTo(x + hw, cy);
        ctx.lineTo(x, cy + hh);
        ctx.lineTo(x, cy + hh + h);
        ctx.lineTo(x + hw, cy + h);
        ctx.closePath();
        ctx.fillStyle = right;
        ctx.fill();

        // Booked: a small orange pin with a tick floating above the tower.
        if (lv === 3) {
          const appear = Math.min(1, (time - T.booked - cell.jitter * 380 - 500) / 300);
          if (appear > 0) {
            const py = cy - hh - w * 0.55;
            const r = w * 0.26 * appear;
            ctx.beginPath();
            ctx.moveTo(x, cy - hh - w * 0.05);
            ctx.lineTo(x, py + r);
            ctx.strokeStyle = "rgba(12,12,11,0.35)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, py, r, 0, Math.PI * 2);
            ctx.fillStyle = "#F49A3C";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x - r * 0.42, py);
            ctx.lineTo(x - r * 0.08, py + r * 0.34);
            ctx.lineTo(x + r * 0.45, py - r * 0.32);
            ctx.strokeStyle = "#0C0C0B";
            ctx.lineWidth = Math.max(1.2, r * 0.22);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
          }
        }
      }
    },
    [cells],
  );

  // Play once when in view; replay on demand. Reduced motion: final frame.
  useEffect(() => {
    if (reduced) {
      msRef.current = TOTAL_MS;
      setMs(TOTAL_MS);
      draw(TOTAL_MS);
      return;
    }
    if (!inView) {
      draw(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      msRef.current = t;
      draw(t);
      setMs((prev) => (stageAt(prev) !== stageAt(t) || t >= TOTAL_MS ? t : prev));
      if (t < TOTAL_MS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, run, draw]);

  // Redraw on resize.
  useEffect(() => {
    const onResize = () => draw(msRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { w, ox, oy } = geo.current;
    const time = msRef.current;
    // Front-most first: check raised cells only, by their top diamond and body.
    const raised = cells.filter((c) => c.level > 0 && levelAt(c, time) > 0).sort((a, b) => b.c + b.r - (a.c + a.r));
    for (const cell of raised) {
      const x = ox + ((cell.c - cell.r) * w) / 2;
      const y = oy + ((cell.c + cell.r) * w) / 4;
      const h = heightAt(cell, time) * w + 0.12 * w;
      const cy = y + w / 4 - h;
      const hw = w * 0.43;
      if (px > x - hw && px < x + hw && py > cy - w * 0.9 && py < cy + h + w * 0.2) {
        const info = d.companies[cell.idx];
        setTip({ x, y: cy - w * 0.35, name: info.name, signal: info.signal, level: levelAt(cell, time) });
        return;
      }
    }
    setTip(null);
  };

  const stage = reduced ? 3 : inView ? stageAt(ms) : -1;
  const scanning = !reduced && inView && ms < T.signal;
  const done = reduced || ms >= TOTAL_MS;
  const tipLabel = (lv: Level) => (lv === 3 ? "Meeting booked" : lv === 2 ? "Fits your ideal customer" : "Buying signal");

  return (
    <Section id="skyline">
      <Container>
        <div ref={ref} className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-x-12 lg:gap-y-6">
          <Reveal className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="text-eyebrow text-brand-deep">{d.eyebrow}</p>
            <h2 className="mt-3 text-h2 text-ink">
              {d.h2Light}
              <span className="font-semibold">{d.h2Bold}</span>
            </h2>
            <p className="mt-4 max-w-lead text-sub text-ink-2">{d.sub}</p>
          </Reveal>

          <Reveal className="order-3 lg:order-none lg:col-start-1 lg:row-start-2">
            <ol className="flex flex-col gap-1" aria-label="From market to meetings">
              {d.stages.map((s, i) => {
                const on = i === stage;
                const reached = i <= stage;
                const dot = ["bg-[#E9E5DD]", "bg-[#FBD9B3]", "bg-[#F49A3C]", "bg-ink"][i];
                return (
                  <li key={s.key} className={`flex items-center gap-4 rounded-[12px] px-3 py-2.5 transition-colors duration-500 ${on ? "bg-white shadow-float" : ""}`}>
                    <span className={`h-4 w-4 flex-none rounded-[4px] border border-ink/20 ${dot}`} aria-hidden="true" />
                    <span className={`w-14 flex-none text-[26px] font-light leading-none tracking-[-0.02em] transition-colors duration-500 ${reached ? "text-ink" : "text-ink/25"}`}>{s.count}</span>
                    <span className="min-w-0">
                      <span className={`block text-[15px] font-semibold transition-colors duration-500 ${reached ? "text-ink" : "text-ink/35"}`}>{s.label}</span>
                      <span className={`block text-[13px] leading-snug transition-colors duration-500 ${reached ? "text-ink-2" : "text-ink/30"}`}>{s.line}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <div className="relative rounded-frame border border-ink bg-white p-4 shadow-lift md:p-6">
              <div className="mb-2 flex min-h-[24px] items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[13px] text-muted" aria-live="polite">
                  {scanning ? (
                    <>
                      <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand text-brand" /> {d.scanning}
                    </>
                  ) : done ? (
                    d.hoverHint
                  ) : (
                    d.stages[Math.max(0, stage)].count + " " + d.stages[Math.max(0, stage)].label
                  )}
                </p>
                {done && !reduced && (
                  <button type="button" onClick={() => { setTip(null); setMs(0); setRun((r) => r + 1); }} className="whitespace-nowrap text-[13px] font-medium text-brand-deep underline underline-offset-4">
                    {d.replay}
                  </button>
                )}
              </div>
              <div ref={wrapRef} className="relative w-full">
                <canvas
                  ref={canvasRef}
                  className="block w-full touch-none"
                  role="img"
                  aria-label={`${d.stages.map((s) => `${s.count} ${s.label}`).join(", ")}. ${d.note}`}
                  onPointerMove={onMove}
                  onPointerLeave={() => setTip(null)}
                />
                {tip && (
                  <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-[12px] border border-ink bg-white px-3 py-2 text-left shadow-lift" style={{ left: tip.x, top: tip.y }}>
                    <p className="whitespace-nowrap text-[13px] font-semibold text-ink">{tip.name}</p>
                    <p className="whitespace-nowrap text-[12px] text-ink-2">{tip.signal}</p>
                    <p className={`mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.06em] ${tip.level === 3 ? "text-ink" : "text-brand-deep"}`}>{tipLabel(tip.level)}</p>
                  </div>
                )}
              </div>
              <p className="mt-2 text-[12px] text-muted">{d.note}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
