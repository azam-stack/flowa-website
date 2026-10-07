import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Container } from "@/components/Container";
import { home } from "@/content/frank/home";
import { useReducedMotion } from "@/hooks/useInView";
import { asset } from "@/lib/asset";
import { Avatar, ChannelBadge } from "./Mocks";
import { Check } from "./Icons";

/**
 * "Inside one day": one scroll-driven story in a pinned stage.
 *
 *   0.00–0.10  the year's signals tilt from a flat heatmap into a skyline
 *   0.10–0.27  the camera zooms into the busiest day until its top face fills the stage
 *   0.30–0.60  that day's signals flow past; the lead Frank picked settles in
 *   0.60–1.00  the outreach: email, LinkedIn note, Oliver replies and Anton
 *              takes over, the meeting lands in the calendar
 *
 * Scroll position is the only input, so it scrubs both ways and never
 * gets out of step. Under reduced motion the three scenes are stacked
 * as static cards instead.
 */

const DAYS = 7;
const RAMP = ["#ECE8E1", "#FCE1C2", "#F8C186", "#F29A45", "#C96A14"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const STAGE_VH = 420;

type Day = { w: number; d: number; v: number; level: number; date: Date };

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** 52 weeks of illustrative signal counts. Week 15, Thursday is the busiest day on purpose. */
function buildYear(): Day[] {
  const rand = rng(11);
  const end = new Date(2026, 9, 3);
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
      v = Math.round(Math.min(v, 48));
      if (w === 15 && d === 4) v = 56;
      const level = v === 0 ? 0 : v < 6 ? 1 : v < 11 ? 2 : v < 20 ? 3 : 4;
      days.push({ w, d, v, level, date });
    }
  }
  return days;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** 0→1 as p goes a→b, eased. */
const seg = (p: number, a: number, b: number) => easeInOut(clamp01((p - a) / (b - a)));

function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.round(Math.min(255, Math.max(0, c * k)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

function camera(m: number) {
  const yaw = ((30 * Math.PI) / 180) * m;
  const pitch = ((90 - 56 * m) * Math.PI) / 180;
  return { cy: Math.cos(yaw), sy: Math.sin(yaw), sp: Math.sin(pitch), cp: Math.cos(pitch) };
}

/** The skyline on a canvas. `morph` 0 = flat, 1 = 3D. `zoom` 0 = whole year, 1 = the busiest block fills the stage. */
function Skyline({ morph, zoom, days, weeks, maxV }: { morph: number; zoom: number; days: Day[]; weeks: number; maxV: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    if (!W || !H) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const m = easeInOut(clamp01(morph));
    const cam = camera(m);
    const hMax = 7.5;
    const heightOf = (day: Day) => {
      const wave = clamp01(morph * 1.6 - (day.w / weeks) * 0.6);
      return day.v === 0 ? 0.08 : 0.08 + (day.v / maxV) * hMax * easeInOut(wave);
    };
    const proj = (x: number, y: number, z: number) => {
      const xr = x * cam.cy - z * cam.sy;
      const zr = x * cam.sy + z * cam.cy;
      return [xr, zr * cam.sp - y * cam.cp, zr] as const;
    };
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
    const pad = W < 640 ? 16 : 40;
    const baseScale = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2 - 20) / (maxY - minY));
    const baseOffX = (W - (maxX - minX) * baseScale) / 2 - minX * baseScale;
    const baseOffY = (H - (maxY - minY) * baseScale) / 2 - minY * baseScale + 4;
    // Zoom: the busiest block grows until it fills the stage, and slides to the centre.
    const tgt = days.find((x) => x.v === maxV);
    let scale = baseScale;
    let offX = baseOffX;
    let offY = baseOffY;
    if (tgt && zoom > 0) {
      const th = heightOf(tgt);
      // Top-face centre and width in projected units; the zoom ends with that face wider than the stage.
      const [tcx, tcy] = proj(tgt.w + 0.5, th, tgt.d + 0.5);
      const tfw = Math.abs(proj(tgt.w + 1, th, tgt.d)[0] - proj(tgt.w, th, tgt.d + 1)[0]);
      const Z = Math.max(1, (1.6 * Math.max(W, H)) / Math.max(0.01, tfw * baseScale));
      const zz = easeInOut(zoom);
      scale = baseScale * Math.pow(Z, zz);
      // The face's screen position glides from where it sits to the stage centre.
      const sx = (1 - zz) * (baseOffX + tcx * baseScale) + zz * (W / 2);
      const sy = (1 - zz) * (baseOffY + tcy * baseScale) + zz * (H / 2);
      offX = sx - tcx * scale;
      offY = sy - tcy * scale;
    }
    const S = (x: number, y: number, z: number) => {
      const [px, py] = proj(x, y, z);
      return [offX + px * scale, offY + py * scale] as const;
    };
    const order = [...days].sort((a, b) => proj(a.w + 0.5, 0, a.d + 0.5)[2] - proj(b.w + 0.5, 0, b.d + 0.5)[2]);
    const gap = 0.12;
    for (const day of order) {
      const x0 = day.w + gap;
      const x1 = day.w + 1 - gap;
      const z0 = day.d + gap;
      const z1 = day.d + 1 - gap;
      const h = heightOf(day);
      const base = RAMP[day.level];
      if (h > 0.1) {
        const faces = [
          { pts: [S(x0, 0, z1), S(x1, 0, z1), S(x1, h, z1), S(x0, h, z1)], k: 0.8 },
          { pts: [S(x1, 0, z0), S(x1, 0, z1), S(x1, h, z1), S(x1, h, z0)], k: 0.9 },
          { pts: [S(x0, 0, z0), S(x0, 0, z1), S(x0, h, z1), S(x0, h, z0)], k: 0.9 },
        ];
        for (const f of faces) {
          const [a, b, c] = f.pts;
          const area = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
          if (Math.abs(area) < 0.01) continue;
          ctx.beginPath();
          ctx.moveTo(f.pts[0][0], f.pts[0][1]);
          for (const pt of f.pts.slice(1)) ctx.lineTo(pt[0], pt[1]);
          ctx.closePath();
          ctx.fillStyle = shade(base, f.k);
          ctx.fill();
        }
      }
      const top = [S(x0, h, z0), S(x1, h, z0), S(x1, h, z1), S(x0, h, z1)];
      ctx.beginPath();
      ctx.moveTo(top[0][0], top[0][1]);
      for (const pt of top.slice(1)) ctx.lineTo(pt[0], pt[1]);
      ctx.closePath();
      ctx.fillStyle = base;
      ctx.fill();
    }
    ctx.globalAlpha = Math.max(0, 1 - zoom * 3);
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
    ctx.globalAlpha = 1;
  }, [morph, zoom, days, weeks, maxV]);

  useEffect(() => {
    draw();
  }, [draw]);
  useEffect(() => {
    const ro = new ResizeObserver(() => draw());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [draw]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
    </div>
  );
}

/** One signal card in the flowing columns. */
function SignalCard({ item, dim = false }: { item: (typeof home.story.signals.items)[number]; dim?: boolean }) {
  return (
    <div className={`flex items-start gap-3 rounded-[14px] border border-line bg-white p-3.5 shadow-[0_1px_0_rgba(12,12,11,0.04)] ${dim ? "opacity-70" : ""}`}>
      <Avatar name={item.company} size={32} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-pill bg-brand/20 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink">{item.type}</span>
          <span className="text-[11px] text-muted">{item.when}</span>
        </div>
        <p className="mt-1.5 truncate text-[13px] font-semibold text-ink">{item.company}</p>
        <p className="truncate text-[12.5px] text-ink-2">{item.text}</p>
      </div>
    </div>
  );
}

function Portrait({ who, size = 28 }: { who: "ahmed" | "anton"; size?: number }) {
  return <img src={asset(`images/team/${who}.webp`)} alt="" width={size} height={size} loading="lazy" className="rounded-full object-cover ring-2 ring-white" style={{ width: size, height: size }} />;
}

export function SignalStory() {
  const t = home.story;
  const reduced = useReducedMotion();
  const outerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [weeks, setWeeks] = useState(52);
  const year = useMemo(buildYear, []);
  // Narrow screens show the first half of the year, which holds the busiest day.
  const days = useMemo(() => year.filter((x) => x.w < weeks), [year, weeks]);
  const total = useMemo(() => year.reduce((a, x) => a + x.v, 0), [year]);
  const busiest = useMemo(() => year.reduce((a, x) => (x.v > a.v ? x : a), year[0]), [year]);

  // Scroll progress across the pinned range.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      setP(clamp01(range > 0 ? -rect.top / range : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    const onResize = () => setWeeks(window.innerWidth < 640 ? 26 : 52);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scene timings.
  const morph = seg(p, 0.0, 0.1);
  const zoom = seg(p, 0.1, 0.27);
  const bridge = seg(p, 0.245, 0.275);
  const marketOut = seg(p, 0.27, 0.3);
  const signalsIn = seg(p, 0.27, 0.36);
  const signalsOut = seg(p, 0.56, 0.64);
  const pickedIn = seg(p, 0.36, 0.48);
  const outreachIn = seg(p, 0.6, 0.68);
  const phase = p < 0.28 ? 0 : p < 0.62 ? 1 : 2;
  const stepIn = (i: number) => seg(p, 0.64 + i * 0.085, 0.7 + i * 0.085);

  const picked = t.signals.picked;
  const cols = [t.signals.items.filter((_, i) => i % 2 === 0), t.signals.items.filter((_, i) => i % 2 === 1)];

  const Stage = (
    <div className="relative h-[calc(100svh-390px)] max-h-[720px] min-h-[430px] overflow-hidden rounded-frame border border-ink bg-white shadow-lift">
      {/* 1. The market */}
      <div className="absolute inset-0" style={{ opacity: 1 - marketOut, visibility: marketOut >= 1 ? "hidden" : "visible" }}>
        <Skyline morph={reduced ? 1 : morph} zoom={reduced ? 0 : zoom} days={days} weeks={weeks} maxV={busiest.v} />
        <div className="pointer-events-none absolute left-5 top-5 md:left-7 md:top-7" style={{ opacity: 1 - zoom }}>
          <p className="text-[13px] text-muted">{t.market.label}</p>
          <p className="text-[15px] font-medium text-ink">{t.market.value}</p>
        </div>
        <div className="pointer-events-none absolute right-5 top-5 text-right md:right-7 md:top-7" style={{ opacity: 1 - zoom }}>
          <p className="text-[13px] text-muted">{t.market.totalLabel}</p>
          <p className="text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-ink">{total.toLocaleString("en-GB")}</p>
          <p className="mt-1 text-[13px] text-ink-2">{t.market.totalUnit}</p>
        </div>
        <div className="pointer-events-none absolute bottom-5 left-5 md:bottom-7 md:left-7" style={{ opacity: 1 - zoom }}>
          <p className="text-[13px] text-muted">{t.market.busiestLabel}</p>
          <p className="text-[clamp(2rem,1.4rem+1.8vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-[#C96A14]">{busiest.v}</p>
          <p className="mt-1 text-[13px] text-ink-2">
            {t.market.busiestUnit} · {t.signals.day}
          </p>
        </div>
        <p className="pointer-events-none absolute bottom-5 right-5 text-[12px] text-muted md:bottom-7 md:right-7" style={{ opacity: 1 - zoom }}>
          {t.market.note}
        </p>
        <div className="pointer-events-none absolute inset-0 bg-[#C96A14]" style={{ opacity: bridge }} />
      </div>

      {/* 2. The signals */}
      <div className="absolute inset-0" style={{ opacity: Math.min(signalsIn, 1 - signalsOut), visibility: signalsIn <= 0 || signalsOut >= 1 ? "hidden" : "visible" }}>
        <div className="pointer-events-none absolute inset-0 bg-[#C96A14]" style={{ opacity: 1 - signalsIn }} />
        <div className="grid h-full grid-cols-1 gap-6 p-5 md:grid-cols-[1.05fr_1fr] md:p-7">
          <div className="relative min-h-0 overflow-hidden max-md:[opacity:calc(1-var(--picked)*0.92)]" style={{ transform: `translateY(${(1 - signalsIn) * 24}px)`, "--picked": pickedIn } as CSSProperties}>
            <p className="text-[13px] text-muted">{t.signals.day}</p>
            <p className="text-[22px] font-semibold leading-tight text-ink md:text-[26px]">
              {t.signals.count} <span className="font-light text-ink-2">· {t.signals.lead}</span>
            </p>
            <div className="relative mt-4 h-[calc(100%-64px)] overflow-hidden [perspective:1200px]">
              <div className="grid h-full grid-cols-2 gap-3" style={{ transform: "rotateX(8deg) rotateY(-10deg) rotateZ(2deg) translateZ(-40px)", transformStyle: "preserve-3d" }}>
                {cols.map((col, ci) => (
                  <div key={ci} className="relative h-full overflow-hidden">
                    <div className={`flex flex-col gap-3 ${reduced ? "" : ci === 0 ? "story-flow" : "story-flow-reverse"}`} style={{ "--dur": `${34 + ci * 8}s` } as CSSProperties}>
                      {[...col, ...col].map((item, i) => (
                        <SignalCard key={`${item.company}-${i}`} item={item} dim={ci === 1} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 flex min-h-0 flex-col justify-center md:static md:inset-auto" style={{ opacity: pickedIn, pointerEvents: pickedIn > 0.5 ? "auto" : "none", transform: `translateY(${(1 - pickedIn) * 28}px) scale(${0.96 + pickedIn * 0.04})` }}>
            <p className="text-eyebrow text-brand-deep">{t.signals.pickedEyebrow}</p>
            <div className="mt-3 rounded-frame border border-ink bg-white p-5 shadow-lift md:p-6">
              <div className="flex items-center gap-3">
                <Avatar name={picked.person} size={48} />
                <div className="min-w-0">
                  <p className="text-[17px] font-semibold text-ink">{picked.person}</p>
                  <p className="text-[13.5px] text-muted">
                    {picked.role} · {picked.company}
                  </p>
                  <p className="text-[12.5px] text-muted">{picked.size}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {picked.signals.map((s) => (
                  <span key={s} className="rounded-pill bg-brand/25 px-3 py-1 text-[13px] font-medium text-ink">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{picked.whyLabel}</p>
              <p className="mt-1 text-[14px] leading-snug text-ink-2 md:text-[15px]">{picked.why}</p>
              <ul className="mt-4 hidden flex-col gap-2 border-t border-line pt-4 md:flex">
                {picked.checks.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-[14px] text-ink">
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-ink">
                      <Check size={11} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The outreach */}
      <div className="absolute inset-0 flex flex-col p-5 md:p-7" style={{ opacity: outreachIn, visibility: outreachIn <= 0 ? "hidden" : "visible" }}>
        <div className="flex items-center gap-3">
          <Avatar name={picked.person} size={36} />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-ink">{t.outreach.lead}</p>
            <p className="truncate text-[13px] text-muted">
              {picked.person} · {picked.role} · {picked.company}
            </p>
          </div>
        </div>
        <ol className="relative mt-5 grid min-h-0 flex-1 gap-3 md:mt-6 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
          {t.outreach.steps.map((s, i) => {
            const k = stepIn(i);
            const next = i < t.outreach.steps.length - 1 ? stepIn(i + 1) : 0;
            return (
              <li
                key={s.key}
                className="relative flex items-start gap-3 max-md:absolute max-md:inset-x-0 max-md:top-0 max-md:[opacity:var(--o-m)] md:gap-4 md:[opacity:var(--o-d)]"
                style={{ "--o-d": k, "--o-m": Math.min(k, 1 - next), transform: `translateY(${(1 - k) * 16}px)`, pointerEvents: k > 0.5 ? "auto" : "none" } as CSSProperties}
              >
                <div className="flex flex-col items-center self-stretch">
                  <ChannelBadge kind={s.channel} size={34} className="flex-none" />
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-deep">{s.day}</span>
                    <span className="text-[15px] font-semibold text-ink">{s.title}</span>
                  </div>
                  <p className="text-[12.5px] text-muted">{s.who}</p>
                  {"reply" in s ? (
                    <div className="mt-2 flex flex-col gap-2">
                      <div className="flex items-end gap-2">
                        <Avatar name={picked.person} size={22} />
                        <p className="max-w-[90%] rounded-[14px] rounded-bl-[4px] bg-soft px-3 py-2 text-[13px] text-ink">{s.reply}</p>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <p className="max-w-[90%] rounded-[14px] rounded-br-[4px] bg-ink px-3 py-2 text-[13px] text-white">{s.answer}</p>
                        <Portrait who="anton" size={22} />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-col items-start gap-2.5 rounded-[14px] border border-line bg-white px-3.5 py-2.5 sm:flex-row sm:gap-3">
                      <p className="min-w-0 flex-1 text-[13px] leading-snug text-ink-2">{s.body}</p>
                      {s.approver && (
                        <span className="flex flex-none items-center gap-1.5 rounded-pill bg-brand/20 py-1 pl-1 pr-2.5 text-[11.5px] font-semibold text-ink">
                          <Portrait who={s.approver} size={20} />
                          <Check size={11} /> Approved
                        </span>
                      )}
                      {s.key === "booked" && (
                        <span className="flex flex-none items-center gap-1.5 rounded-pill bg-[#2BB673]/15 px-2.5 py-1 text-[11.5px] font-semibold text-[#1B7F4E]">
                          <Check size={11} /> Booked
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="flex gap-1.5 md:hidden" aria-hidden="true">
            {t.outreach.steps.map((s, i) => (
              <span key={s.key} className="h-1.5 rounded-full bg-ink transition-all duration-300" style={{ width: stepIn(i) > 0.5 && (i === 3 || stepIn(i + 1) < 0.5) ? 20 : 6, opacity: stepIn(i) > 0.5 ? 1 : 0.25 }} />
            ))}
          </span>
          <p className="text-[13px] text-muted md:ml-auto md:text-right" style={{ opacity: stepIn(3) }}>
            {t.outreach.handoff}
          </p>
        </div>
      </div>
    </div>
  );

  const Heading = (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-eyebrow text-brand-deep">{t.eyebrow}</p>
      <h2 className="mt-3 text-h2 text-ink">
        {t.h2Light}
        <span className="font-semibold">{t.h2Bold}</span>
      </h2>
      <p className="mx-auto mt-4 hidden max-w-lead text-sub text-ink-2 sm:block">{t.sub}</p>
    </div>
  );

  const Rail = (
    <ol className="mt-5 flex items-center justify-center gap-2 md:gap-3" aria-label="Story progress">
      {t.phases.map((ph, i) => (
        <li key={ph.key} className="flex items-center gap-2 md:gap-3">
          <span className={`flex items-center gap-2 rounded-pill px-3 py-1.5 text-[13px] font-medium transition-colors duration-300 ${i === phase ? "bg-ink text-white" : i < phase ? "text-ink" : "text-muted"}`}>
            <span className="text-[11px] opacity-70">0{i + 1}</span> {ph.label}
          </span>
          {i < t.phases.length - 1 && <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );

  if (reduced) {
    // Static fallback: the three scenes stacked, no scroll pinning.
    return (
      <section className="py-section-m lg:py-section" id="story">
        <Container>
          {Heading}
          <div className="mt-10 flex flex-col gap-6 md:mt-14">{Stage}</div>
          <p className="mt-4 text-center text-small text-muted">{t.note}</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="story" className="relative" aria-label={t.eyebrow}>
      <div ref={outerRef} style={{ height: `${STAGE_VH}vh` }}>
        <div className="sticky top-[72px] flex h-[calc(100svh-72px)] flex-col justify-center py-6 md:py-8">
          <Container>
            {Heading}
            <div className="mt-6 md:mt-8">{Stage}</div>
            {Rail}
          </Container>
        </div>
      </div>
    </section>
  );
}
