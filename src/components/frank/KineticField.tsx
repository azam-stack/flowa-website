import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useInView";

/**
 * The hero's field: a few hundred thin tangerine strands streaming left to
 * right, pinched toward the horizon at the centre like a long exposure of
 * something moving fast. Drawn additively on a 2D canvas so overlaps glow.
 * Drifts slowly while on screen; a single still frame under reduced motion.
 */
export function KineticField({ className = "", strands = 140, pinch = 0.55 }: { className?: string; strands?: number; pinch?: number }) {
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
          const y = cy + ((s.y - 0.5) * spread + wave * spread) * h;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // brighter near the centre band
        const nearCentre = 1 - Math.min(1, Math.abs(s.y - 0.5) * 2.2);
        ctx.strokeStyle = `rgba(238, 80, 1, ${s.alpha * (0.5 + nearCentre)})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }
      // a soft core glow along the horizon
      const g = ctx.createRadialGradient(w / 2, cy, 0, w / 2, cy, Math.max(w, h) * 0.45);
      g.addColorStop(0, "rgba(238,80,1,0.22)");
      g.addColorStop(0.5, "rgba(238,80,1,0.06)");
      g.addColorStop(1, "rgba(238,80,1,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
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
  }, [active, reduced, strands, pinch, wrap]);

  return (
    <div ref={wrap} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
