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
    // Per-column [top, bottom] of the logo silhouette, or null where there is none.
    let band: Array<[number, number] | null> = [];
    let bandL = 0;
    let bandR = 0;
    const seeds = Array.from({ length: strands }, (_, i) => ({
      y: (i + 0.5) / strands, // base vertical position 0..1
      amp: 0.02 + Math.random() * 0.08,
      freq: 0.8 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.35,
      alpha: 0.05 + Math.random() * 0.22,
      width: 0.6 + Math.random() * 1.2,
    }));

    const size = () => {
      const r = root.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width));
      h = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      band = [];
      if (shape === "logo") {
        const size = h * shapeSize;
        const scale = size / 360;
        const ox = w / 2 - (180 * scale);
        const oy = h / 2 - (170 * scale);
        const off = document.createElement("canvas");
        off.width = w;
        off.height = h;
        const o = off.getContext("2d", { willReadFrequently: true });
        if (o) {
          o.setTransform(scale, 0, 0, scale, ox, oy);
          o.fillStyle = "#000";
          o.fill(new Path2D(LOGO_PATH));
          const img = o.getImageData(0, 0, w, h).data;
          for (let x = 0; x < w; x++) {
            let top = -1;
            let bottom = -1;
            for (let y = 0; y < h; y++) {
              if (img[(y * w + x) * 4 + 3] > 40) {
                if (top < 0) top = y;
                bottom = y;
              }
            }
            band[x] = top >= 0 ? [top, bottom] : null;
          }
          bandL = band.findIndex((b) => b);
          bandR = band.length - 1 - [...band].reverse().findIndex((b) => b);
          // Soften the silhouette's edges along x so strands bend instead of kinking.
          const R = 14;
          const smooth: typeof band = band.map((_, x) => {
            let t = 0;
            let bo = 0;
            let n = 0;
            for (let k = -R; k <= R; k++) {
              const b = band[x + k];
              if (b) {
                t += b[0];
                bo += b[1];
                n++;
              }
            }
            return n > 0 && band[x] ? [t / n, bo / n] : null;
          });
          band = smooth;
        }
      }
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
        for (let k = 0; k <= steps; k++) {
          const u = k / steps; // 0..1 across
          const x = u * w;
          // pinch toward the centre line in the middle of the width
          const bell = Math.exp(-Math.pow((u - 0.5) / 0.22, 2));
          const spread = 1 - pinch * bell;
          const wave = Math.sin(u * Math.PI * 2 * s.freq + s.phase + t * s.speed) * s.amp;
          let y = cy + ((s.y - 0.5) * spread + wave * spread) * h;
          if (shape === "logo") {
            const b = band[Math.min(w - 1, Math.max(0, Math.round(x)))];
            if (b) {
              // inside the logo's columns: the strand's slot inside the silhouette. The weight stays ~1 across the
              // body of the shape and eases to 0 at its left and right tips, so there are no walls at the edges.
              const ty = b[0] + s.y * (b[1] - b[0]) + wave * (b[1] - b[0]) * 0.3;
              const cxl = (bandL + bandR) / 2;
              const half = Math.max(1, (bandR - bandL) / 2);
              const d = Math.min(1, Math.abs(x - cxl) / half);
              const k = 1 - d * d * d * d;
              y = y + (ty - y) * k;
            }
          }
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
