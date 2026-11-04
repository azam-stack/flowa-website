import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";
import { footer } from "@/content/frank/chrome";
import { useReducedMotion } from "@/hooks/useInView";

/**
 * Footer with the wordmark set enormous and cropped by the bottom edge,
 * printed as a field of halftone dots. Each dot is sized by how much of
 * the letter covers its cell. Move across it and the dots part around the
 * pointer on springs, warming to tangerine as they leave home; click and
 * a shock ring runs through the word. The links sit above on a hairline.
 *
 * Adapted from the "Halftone Wordmark Footer" component: a 2D canvas for
 * the dots and the grain, real links for the columns, Flowa's palette.
 */
const INK = [252, 255, 255];
const WARM = [238, 80, 1];

function radiusFor(coverage: number, gap: number) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage;
  return Math.sqrt(c) * gap * 0.56;
}

export function HalftoneFooter({ wordmark = "flowa", dotGap = 6, radius = 90, crop = 0.3, grain = 0.5 }: { wordmark?: string; dotGap?: number; radius?: number; crop?: number; grain?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let visible = true;
    let awake = true;
    let ring = { x: 0, y: 0, t: -1 };
    let dots = new Float32Array(0);
    let count = 0;
    let grainTile: HTMLCanvasElement | null = null;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      const family = '"Inter Tight Variable", "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif';
      m.font = `800 100px ${family}`;
      const measured = m.measureText(wordmark).width;
      const fit = measured > 0 ? ((w * 0.96) / measured) * 100 : 0;
      m.font = `800 ${fit}px ${family}`;
      const box = m.measureText(wordmark);
      const cap = box.actualBoundingBoxAscent || fit * 0.72;
      m.fillStyle = "#000";
      m.textBaseline = "alphabetic";
      m.fillText(wordmark, (w - box.width) / 2, h + cap * Math.max(0, Math.min(0.6, crop)));
      const img = m.getImageData(0, 0, w, h).data;

      const gap = Math.max(3, dotGap);
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const tmp: number[] = [];
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sum = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
              const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
              sum += img[(y * w + x) * 4 + 3];
            }
          }
          const cov = sum / (9 * 255);
          if (cov < 0.06) continue;
          const hx = gx * gap + gap / 2;
          const hy = gy * gap + gap / 2;
          tmp.push(hx, hy, 0, 0, hx, hy, radiusFor(cov, gap));
        }
      }
      dots = new Float32Array(tmp);
      count = tmp.length / 7;

      grainTile = document.createElement("canvas");
      grainTile.width = 256;
      grainTile.height = 256;
      const g = grainTile.getContext("2d");
      if (g) {
        const id = g.createImageData(256, 256);
        for (let i = 0; i < id.data.length; i += 4) {
          const v = Math.random() * 255;
          id.data[i] = id.data[i + 1] = id.data[i + 2] = v;
          id.data[i + 3] = Math.random() < 0.5 ? 0 : 255;
        }
        g.putImageData(id, 0, 0);
      }
      awake = true;
    };

    const draw = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const r = reduced ? 0 : radius;
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
      const ringR = ringAge * 0.9;
      let moving = false;
      for (let i = 0; i < count; i++) {
        const j = i * 7;
        let x = dots[j];
        let y = dots[j + 1];
        let vx = dots[j + 2];
        let vy = dots[j + 3];
        const hx = dots[j + 4];
        const hy = dots[j + 5];
        if (!reduced) {
          if (ringAge < 900) {
            const dx = hx - ring.x;
            const dy = hy - ring.y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
            const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
            if (band > 0) {
              const f = band * 3.2 * (1 - ringAge / 900);
              vx += (dx / d) * f;
              vy += (dy / d) * f;
            }
          }
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          if (r > 0 && d2 < r * r) {
            const d = Math.sqrt(d2) + 0.001;
            const f = (1 - d / r) * 2.6;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
          vx = (vx + (hx - x) * 0.05) * 0.84;
          vy = (vy + (hy - y) * 0.05) * 0.84;
          x += vx;
          y += vy;
          if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true;
          else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }
          dots[j] = x;
          dots[j + 1] = y;
          dots[j + 2] = vx;
          dots[j + 3] = vy;
        }
        const k = Math.min(1, Math.hypot(x - hx, y - hy) / 28);
        ctx.fillStyle =
          k > 0.02
            ? `rgb(${Math.round(INK[0] + (WARM[0] - INK[0]) * k)},${Math.round(INK[1] + (WARM[1] - INK[1]) * k)},${Math.round(INK[2] + (WARM[2] - INK[2]) * k)})`
            : "#fcffff";
        ctx.beginPath();
        ctx.arc(x, y, dots[j + 6], 0, 6.2832);
        ctx.fill();
      }
      if (grainTile && grain > 0) {
        ctx.globalAlpha = Math.min(1, grain) * 0.09;
        ctx.globalCompositeOperation = "overlay";
        const pattern = ctx.createPattern(grainTile, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
      awake = moving || ringAge < 900 || px > -1e4;
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      draw(now);
      if (awake) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };
    const toLocal = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      return [e.clientX - b.left, e.clientY - b.top];
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      px = p[0];
      py = p[1];
      wake();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      if ((e.target as HTMLElement).closest("a,button")) return;
      const p = toLocal(e);
      ring = { x: p[0], y: p[1], t: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(root);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(root);
    let alive = true;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!alive) return;
        layout();
        wake();
      });
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
    };
  }, [wordmark, dotGap, radius, crop, grain, reduced]);

  return (
    <footer ref={rootRef} className="relative isolate h-[620px] overflow-hidden border-t border-line bg-page text-ink md:h-[760px]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <span className="sr-only">{wordmark}</span>
      <div className="relative z-[1] mx-auto grid w-full max-w-container gap-8 px-4 pt-12 md:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] md:px-10 md:pt-14 xl:px-gutter">
        <div>
          <Link to="/" aria-label="Flowa home" className="inline-flex rounded-control">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-[15px] leading-snug text-ink-2">
            {footer.tagline} <span className="text-brand-deep">{footer.taglineAccent}</span>
          </p>
          <a href={`mailto:${footer.email}`} className="mono-label mt-4 inline-block text-ink-2 hover:text-ink">
            {footer.email}
          </a>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="mono-label">{col.heading}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="text-[14px] text-ink-2/80 transition-colors hover:text-ink">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="relative z-[1] mx-auto mt-8 flex w-full max-w-container items-center justify-between gap-4 border-t border-line px-4 pt-4 md:px-10 xl:px-gutter">
        <p className="mono-label">{footer.bottom}</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mono-label text-ink-2 hover:text-ink">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
