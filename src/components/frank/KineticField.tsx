import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useInView";

/**
 * The hero's field: a few hundred thin tangerine strands streaming left to
 * right, pinched toward the horizon at the centre like a long exposure of
 * something moving fast. Drawn additively on a 2D canvas so overlaps glow.
 * Drifts slowly while on screen; a single still frame under reduced motion.
 */
/** The Flowa "o": the logo loop, in a 0..360 box. Strands are pressed into this silhouette as they cross the centre. */
const LOGO_PATH = "M40 36 C58 12 84 2 132 26 C176 49 212 68 236 65 C256 62 274 61 304 63 C336 66 348 96 348 134 C344 200 298 298 240 292 C206 287 170 302 128 313 C92 322 64 320 50 304 C36 288 44 256 48 232 C52 210 52 196 48 186 C30 128 14 92 22 66 C25 54 31 46 40 36 Z";

type Contour = { upper: Array<[number, number]>; lower: Array<[number, number]>; at: (p: [number, number], scale: number) => [number, number] };

/**
 * Sample the logo path with an SVG element, normalise it around its centre
 * and split it at its leftmost and rightmost points into an upper and a
 * lower run, both ordered left → right. `at` scales a point about the
 * field's centre.
 */
function makeContour(w: number, h: number, size: number): Contour | null {
  if (typeof document === "undefined") return null;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", LOGO_PATH);
  svg.appendChild(path);
  const len = path.getTotalLength();
  const N = 220;
  const raw: Array<[number, number]> = [];
  for (let i = 0; i < N; i++) {
    const pt = path.getPointAtLength((i / N) * len);
    raw.push([pt.x, pt.y]);
  }
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y] of raw) {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  const s = size / (maxY - minY);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const pts: Array<[number, number]> = raw.map(([x, y]) => [(x - cx) * s, (y - cy) * s]);
  let li = 0;
  let ri = 0;
  pts.forEach((p, i) => {
    if (p[0] < pts[li][0]) li = i;
    if (p[0] > pts[ri][0]) ri = i;
  });
  const walk = (from: number, to: number) => {
    const out: Array<[number, number]> = [];
    let i = from;
    while (true) {
      out.push(pts[i]);
      if (i === to) break;
      i = (i + 1) % pts.length;
    }
    return out;
  };
  const a = walk(li, ri);
  const b = walk(ri, li).reverse();
  const meanY = (arr: Array<[number, number]>) => arr.reduce((acc, p) => acc + p[1], 0) / arr.length;
  const upper = meanY(a) < meanY(b) ? a : b;
  const lower = upper === a ? b : a;
  return { upper, lower, at: (p, scale) => [w / 2 + p[0] * scale, h / 2 + p[1] * scale] };
}

export function KineticField({ className = "", strands = 140, pinch = 0.55, color = "238, 80, 1", intensity = 1, glow = true, shape = "horizon", shapeSize = 0.62 }: { className?: string; strands?: number; pinch?: number; /** "r, g, b" */ color?: string; intensity?: number; glow?: boolean; /** "horizon": strands pinch to a line. "logo": strands are pressed into the Flowa "o" at the centre. */ shape?: "horizon" | "logo"; /** Logo height as a fraction of the field height. */ shapeSize?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { ref: wrap, active } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const root = wrap.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let contour: Contour | null = null;
    const seeds = Array.from({ length: strands }, (_, i) => ({
      y: (i + 0.5) / strands, // base vertical position 0..1
      amp: 0.02 + Math.random() * 0.08,
      freq: 0.8 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      alpha: 0.05 + Math.random() * 0.22,
      width: 0.6 + Math.random() * 1.2,
      // offset from the logo outline: most strands hug it, a few sit well inside or outside
      scale: 1 + Math.sign(Math.random() - 0.5) * Math.pow(Math.random(), 2.2) * 0.42,
      // where along the contour this strand joins and leaves (fractions of the half's length), so they don't all knot at the tips
      join: Math.random() * 0.22,
      leave: 1 - Math.random() * 0.22,
    }));

    const size = () => {
      const r = root.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      contour = shape === "logo" ? makeContour(w, h, h * shapeSize) : null;
    };

    const draw = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      const cy = h * 0.5;
      const steps = 64;
      for (const s of seeds) {
        ctx.beginPath();
        if (contour) {
          // Logo mode: in from the left, along the "o" (one of its two halves) at this strand's offset, out to the right.
          const upper = s.y < 0.5;
          const pts = upper ? contour.upper : contour.lower;
          const sc = s.scale * (1 + Math.sin(t * s.speed * 0.6 + s.phase) * 0.012);
          const yIn = cy + (s.y - 0.5) * h * 1.6;
          const i0 = Math.floor(s.join * (pts.length - 1));
          const i1 = Math.max(i0 + 2, Math.floor(s.leave * (pts.length - 1)));
          const first = contour.at(pts[i0], sc);
          const last = contour.at(pts[i1], sc);
          const wave = (u: number) => Math.sin(u * Math.PI * 2 * s.freq + s.phase + t * s.speed) * s.amp * h;
          ctx.moveTo(0, yIn + wave(0));
          // entry: a soft curve into the leftmost point of the contour
          ctx.bezierCurveTo(first[0] * 0.45, yIn + wave(0.2), first[0] * 0.75, first[1] + wave(0.35) * 0.3, first[0], first[1]);
          for (let i = i0 + 1; i <= i1; i++) {
            const q = contour.at(pts[i], sc);
            ctx.lineTo(q[0], q[1]);
          }
          const yOut = cy + (s.y - 0.5) * h * 1.6;
          ctx.bezierCurveTo(last[0] + (w - last[0]) * 0.25, last[1] + wave(0.65) * 0.3, last[0] + (w - last[0]) * 0.55, yOut + wave(0.8), w, yOut + wave(1));
          const nearOne = 1 - Math.min(1, Math.abs(s.scale - 1) / 0.35);
          ctx.strokeStyle = `rgba(${color}, ${Math.min(1, s.alpha * intensity * (0.5 + nearOne * 0.7))})`;
          ctx.lineWidth = s.width * (0.7 + nearOne * 0.5);
          ctx.stroke();
          continue;
        }
        for (let k = 0; k <= steps; k++) {
          const u = k / steps; // 0..1 across
          const x = u * w;
          // pinch toward the centre line in the middle of the width
          const bell = Math.exp(-Math.pow((u - 0.5) / 0.22, 2));
          const spread = 1 - pinch * bell;
          const wave = Math.sin(u * Math.PI * 2 * s.freq + s.phase + t * s.speed) * s.amp;
          const y = cy + ((s.y - 0.5) * spread + wave * spread) * h;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // brighter near the centre band
        const nearCentre = 1 - Math.min(1, Math.abs(s.y - 0.5) * 2.2);
        ctx.strokeStyle = `rgba(${color}, ${Math.min(1, s.alpha * intensity * (0.5 + nearCentre))})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }
      // a soft core glow along the horizon
      if (glow) {
        const g = ctx.createRadialGradient(w / 2, cy, 0, w / 2, cy, Math.max(w, h) * 0.45);
        g.addColorStop(0, `rgba(${color},${0.22 * intensity})`);
        g.addColorStop(0.5, `rgba(${color},${0.06 * intensity})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    size();
    const ro = new ResizeObserver(() => {
      size();
      draw(performance.now() / 1000);
    });
    ro.observe(root);
    draw(0);
    let last = 0;
    const loop = (now: number) => {
      raf = 0;
      if (!active || reduced) return;
      if (now - last > 33) {
        last = now;
        draw(now / 1000);
      }
      raf = requestAnimationFrame(loop);
    };
    if (active && !reduced) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active, reduced, strands, pinch, color, intensity, glow, shape, shapeSize, wrap]);

  return (
    <div ref={wrap} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
