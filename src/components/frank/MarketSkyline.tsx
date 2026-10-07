import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { SectionHeading, Section } from "./SectionHeading";

/**
 * "A year of Frank in one market": a GitHub-style heatmap of buying
 * signals (one block per day) that morphs from a flat grid into a 3D
 * skyline when it scrolls into view. One colour ramp, two numbers, a
 * flat/3D toggle and a tooltip per day. Drawn on a canvas with a real
 * (orthographic) camera, so the morph is a single smooth tilt.
 * Example market, illustrative data.
 */

const DAYS = 7;
const MORPH_MS = 1800;
const RAMP = ["#ECE8E1", "#FCE1C2", "#F8C186", "#F29A45", "#C96A14"] as const;
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Day = { w: number; d: number; v: number; level: number; date: Date };

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 52 weeks of illustrative signal counts: busy weekdays, quiet weekends, a few hot streaks. */
function buildYear(): Day[] {
  const rand = rng(11);
  const end = new Date(2026, 9, 3); // a Saturday
  const start = new Date(end);
  start.setDate(end.getDate() - (52 * 7 - 1));
  const hot = [6, 14, 15, 23, 31, 32, 33, 41, 47];
  const days: Day[] = [];
  for (let w = 0; w < 52; w++) {
    for (let d = 0; d < DAYS; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const weekend = d === 0 || d === 6;
      const season = 0.75 + 0.35 * Math.sin((w / 52) * Math.PI * 2 - 1.2);
      let v = weekend ? rand() * 3 : 3 + rand() * 9 * season;
      if (!weekend && hot.includes(w)) v += 10 + rand() * 22;
      if (!weekend && rand() < 0.04) v += 14 + rand() * 12;
      if (rand() < 0.06) v = 0;
      v = Math.round(v);
      const level = v === 0 ? 0 : v < 6 ? 1 : v < 11 ? 2 : v < 20 ? 3 : 4;
      days.push({ w, d, v, level, date });
    }
  }
  return days;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (x: number) => Math.min(1, Math.max(0, x));

function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.round(Math.min(255, Math.max(0, c * k)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

/** Camera for morph m (0 flat, 1 3D). */
function camera(m: number) {
  const yaw = ((30 * Math.PI) / 180) * m;
  const pitch = ((90 - 56 * m) * Math.PI) / 180; // 90° = straight down
  return { cy: Math.cos(yaw), sy: Math.sin(yaw), sp: Math.sin(pitch), cp: Math.cos(pitch) };
}

export function MarketSkyline() {
  const d = home.skyline;
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4, once: true });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const year = useMemo(buildYear, []);
  const [weeks, setWeeks] = useState(52);
  const [target, setTarget] = useState<0 | 1>(0);
  const morph = useRef(0);
  const paths = useRef<{ p: Path2D; day: Day }[]>([]);
  const [tip, setTip] = useState<{ x: number; y: number; day: Day } | null>(null);

  const days = useMemo(() => year.filter((x) => x.w >= 52 - weeks).map((x) => ({ ...x, w: x.w - (52 - weeks) })), [year, weeks]);
  const total = useMemo(() => year.reduce((a, x) => a + x.v, 0), [year]);
  const busiest = useMemo(() => year.reduce((a, x) => (x.v > a.v ? x : a), year[0]), [year]);
  const maxV = busiest.v;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const W = wrap.clientWidth;
    const H = Math.round(Math.max(260, Math.min(520, W * 0.5)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const m = easeInOut(clamp(morph.current));
    const cam = camera(m);
    const hMax = 7.5; // world units for the busiest day
    const heightOf = (day: Day) => {
      // heights grow in a wave from the first week to the last
      const wave = clamp(morph.current * 1.6 - (day.w / weeks) * 0.6);
      return day.v === 0 ? 0.08 : 0.08 + (day.v / maxV) * hMax * easeInOut(wave);
    };
    const proj = (x: number, y: number, z: number) => {
      const xr = x * cam.cy - z * cam.sy;
      const zr = x * cam.sy + z * cam.cy;
      return [xr, zr * cam.sp - y * cam.cp, zr] as const;
    };

    // Fit: scale and centre from the bounding box of the full grid at this camera, with full heights in 3D.
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const [x, z] of [
      [0, 0],
      [weeks, 0],
      [0, DAYS],
      [weeks, DAYS],
    ]) {
      for (const y of [0, hMax * m]) {
        const [px, py] = proj(x, y, z);
        minX = Math.min(minX, px);
        maxX = Math.max(maxX, px);
        minY = Math.min(minY, py);
        maxY = Math.max(maxY, py);
      }
    }
    const pad = W < 640 ? 14 : 28;
    const scale = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2 - 18) / (maxY - minY));
    const offX = (W - (maxX - minX) * scale) / 2 - minX * scale;
    const offY = (H - (maxY - minY) * scale) / 2 - minY * scale + 6;
    const S = (x: number, y: number, z: number) => {
      const [px, py] = proj(x, y, z);
      return [offX + px * scale, offY + py * scale] as const;
    };

    // Painter's order: far to near.
    const order = [...days].sort((a, b) => proj(a.w + 0.5, 0, a.d + 0.5)[2] - proj(b.w + 0.5, 0, b.d + 0.5)[2]);
    const gap = 0.12;
    const out: { p: Path2D; day: Day }[] = [];
    for (const day of order) {
      const x0 = day.w + gap;
      const x1 = day.w + 1 - gap;
      const z0 = day.d + gap;
      const z1 = day.d + 1 - gap;
      const h = heightOf(day);
      const base = RAMP[day.level];
      const top = [S(x0, h, z0), S(x1, h, z0), S(x1, h, z1), S(x0, h, z1)];
      const faces: { pts: (readonly [number, number])[]; k: number }[] = [];
      if (h > 0.1) {
        faces.push({ pts: [S(x0, 0, z1), S(x1, 0, z1), S(x1, h, z1), S(x0, h, z1)], k: 0.8 }); // front (z+)
        faces.push({ pts: [S(x1, 0, z0), S(x1, 0, z1), S(x1, h, z1), S(x1, h, z0)], k: 0.9 }); // right (x+)
        faces.push({ pts: [S(x0, 0, z0), S(x0, 0, z1), S(x0, h, z1), S(x0, h, z0)], k: 0.9 }); // left (x-)
      }
      const hit = new Path2D();
      for (const f of faces) {
        const [a, b, c] = f.pts;
        const area = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
        if (Math.abs(area) < 0.01) continue;
        const path = new Path2D();
        path.moveTo(f.pts[0][0], f.pts[0][1]);
        for (const pt of f.pts.slice(1)) path.lineTo(pt[0], pt[1]);
        path.closePath();
        ctx.fillStyle = shade(base, f.k);
        ctx.fill(path);
        hit.addPath(path);
      }
      const tp = new Path2D();
      tp.moveTo(top[0][0], top[0][1]);
      for (const pt of top.slice(1)) tp.lineTo(pt[0], pt[1]);
      tp.closePath();
      ctx.fillStyle = base;
      ctx.fill(tp);
      hit.addPath(tp);
      out.push({ p: hit, day });
    }
    paths.current = out;

    // Month labels along the front edge.
    ctx.fillStyle = "#8A857C";
    ctx.font = `500 ${W < 640 ? 10 : 11}px Poppins, system-ui, sans-serif`;
    ctx.textAlign = "center";
    let last = -1;
    for (const day of days) {
      if (day.d !== 0) continue;
      const mo = day.date.getMonth();
      if (mo !== last && day.date.getDate() <= 7) {
        const [lx, ly] = S(day.w + 0.5, 0, DAYS + 0.9);
        ctx.fillText(MONTHS[mo], lx, ly + 4);
      }
      last = mo;
    }
  }, [days, weeks, maxV]);

  // Fewer weeks on narrow screens.
  useEffect(() => {
    const onResize = () => {
      setWeeks((wrapRef.current?.clientWidth ?? 800) < 560 ? 26 : 52);
      draw();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  // Morph to 3D once it is on screen (straight to 3D under reduced motion).
  useEffect(() => {
    if (reduced) {
      morph.current = 1;
      setTarget(1);
      draw();
      return;
    }
    if (!inView) return;
    const t = window.setTimeout(() => setTarget(1), 450);
    return () => window.clearTimeout(t);
  }, [inView, reduced, draw]);

  useEffect(() => {
    if (reduced) {
      morph.current = target;
      draw();
      return;
    }
    let raf = 0;
    let prev = performance.now();
    const step = (now: number) => {
      const dt = (now - prev) / MORPH_MS;
      prev = now;
      const dir = target === 1 ? 1 : -1;
      morph.current = clamp(morph.current + dir * dt);
      draw();
      if ((dir > 0 && morph.current < 1) || (dir < 0 && morph.current > 0)) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, draw]);

  // Frame-exact control for recording the LinkedIn video in an automated browser only.
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.webdriver) return;
    (window as unknown as { __skyline?: (v: number) => void }).__skyline = (v: number) => {
      morph.current = v;
      draw();
    };
  }, [draw]);

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dpr = canvas.width / rect.width;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = paths.current.length - 1; i >= 0; i--) {
      if (ctx.isPointInPath(paths.current[i].p, x * dpr, y * dpr)) {
        setTip({ x, y, day: paths.current[i].day });
        return;
      }
    }
    setTip(null);
  };

  const fmt = (dt: Date) => `${DAY_NAMES[dt.getDay()]} ${dt.getDate()} ${MONTHS[dt.getMonth()]}`;

  return (
    <Section id="skyline">
      <Container>
        <SectionHeading eyebrow={d.eyebrow} title={<>{d.h2Light}<span className="font-semibold">{d.h2Bold}</span></>} sub={d.sub} />
        <Reveal className="mx-auto mt-10 max-w-6xl md:mt-14">
          <div ref={ref} className="rounded-frame border border-ink bg-white p-4 shadow-lift md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[15px] text-ink">
                <span className="font-semibold">{d.marketLabel}:</span> <span className="text-ink-2">{d.market}</span>
              </p>
              <div className="flex rounded-[10px] border border-line p-1" role="group" aria-label="View">
                {([0, 1] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={target === v}
                    onClick={() => setTarget(v)}
                    className={`rounded-[7px] px-3 py-1.5 text-[13px] font-medium transition-colors ${target === v ? "bg-ink text-white" : "text-ink-2 hover:bg-soft"}`}
                  >
                    {v === 0 ? d.flat : d.city}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-card border border-line bg-[#FCFBF9]">
              <div ref={wrapRef} className="relative">
                <canvas
                  ref={canvasRef}
                  className="block w-full"
                  role="img"
                  aria-label={`${d.eyebrow}. ${total} ${d.totalUnit} in a year; busiest day ${busiest.v} ${d.busiestUnit}. ${d.note}`}
                  onPointerMove={onMove}
                  onPointerLeave={() => setTip(null)}
                />
                {tip && (
                  <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-[10px] bg-ink px-3 py-1.5 text-[12.5px] text-white shadow-lift" style={{ left: tip.x, top: tip.y }}>
                    <span className="font-semibold">
                      {tip.day.v} {d.signalsWord}
                    </span>{" "}
                    · {fmt(tip.day.date)}
                  </div>
                )}
              </div>
              <div className="pointer-events-none absolute right-4 top-4 hidden text-right sm:block md:right-6 md:top-6">
                <p className="text-[13px] text-muted">{d.totalLabel}</p>
                <p className="mt-0.5 text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-ink">{total.toLocaleString("en-GB")}</p>
                <p className="mt-1 text-[13px] text-ink-2">{d.totalUnit}</p>
              </div>
              <div className="pointer-events-none absolute bottom-4 left-4 hidden sm:block md:bottom-6 md:left-6">
                <p className="text-[13px] text-muted">{d.busiestLabel}</p>
                <p className="mt-0.5 text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-[#C96A14]">{busiest.v}</p>
                <p className="mt-1 text-[13px] text-ink-2">
                  {d.busiestUnit} · {fmt(busiest.date)}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-muted">
              <span>{d.note}</span>
              <span className="flex items-center gap-1.5">
                {d.less}
                {RAMP.map((c) => (
                  <span key={c} className="h-3 w-3 rounded-[3px]" style={{ background: c }} />
                ))}
                {d.more}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
