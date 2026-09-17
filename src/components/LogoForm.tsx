import { useEffect, useId, useRef } from "react";

/**
 * The hero's living object: the "O" of the Flowa wordmark, alive.
 *
 * The geometry is the logo's own. RADII are 24 samples of the O's
 * contour (traced from the outline logo artwork, measured from its
 * centroid at 15° steps, normalised to a 200-unit box). Each frame the
 * radii are modulated by three slow waves that travel around the
 * contour at incommensurate speeds, so the outline breathes and deforms
 * continuously without ever visibly repeating, and never by more than
 * about fifteen percent: the shape stays recognisably the logo.
 *
 * Three layers: a soft orange glow (CSS radial gradient, breathing on
 * the compositor), the filled body, and a thin outline echo that
 * follows the body a beat behind, the way the mark is drawn in the
 * logo itself. Drift and a slight turn are CSS animations on groups;
 * only the path data is written from JavaScript, every frame on desktop
 * and at 30 fps on small screens, and only while the object is on
 * screen and the tab visible.
 *
 * prefers-reduced-motion: one still frame, no animation at all. The
 * object also listens for `flowa:booked` (dispatched by the pipeline
 * panel when a row reaches "Meeting booked") and its glow lifts briefly.
 */
const RADII = [61.2, 68.5, 79.0, 84.0, 80.5, 66.1, 55.0, 50.7, 52.8, 66.8, 82.2, 81.1, 76.4, 73.0, 71.2, 69.8, 65.2, 59.2, 61.3, 69.1, 79.7, 80.9, 66.3, 59.0];
const N = RADII.length;
const ANGLES = RADII.map((_, i) => -Math.PI + (2 * Math.PI * i) / N);
const COS = ANGLES.map(Math.cos);
const SIN = ANGLES.map(Math.sin);
const C = 100;

/** Closed Catmull-Rom spline through the modulated points, as cubic Béziers. */
function pathAt(t: number, scale: number): string {
  const px = new Array<number>(N);
  const py = new Array<number>(N);
  for (let i = 0; i < N; i++) {
    const a = ANGLES[i];
    const w1 = Math.sin(2 * a + t * 0.5) * 0.075;
    const w2 = Math.sin(3 * a - t * 0.36 + 1.3) * 0.05;
    const w3 = Math.sin(4 * a + t * 0.72 + 2.1) * 0.028;
    const r = RADII[i] * (1 + w1 + w2 + w3) * scale;
    px[i] = C + COS[i] * r;
    py[i] = C + SIN[i] * r;
  }
  let d = `M${px[0].toFixed(2)},${py[0].toFixed(2)}`;
  for (let i = 0; i < N; i++) {
    const i0 = (i + N - 1) % N;
    const i2 = (i + 1) % N;
    const i3 = (i + 2) % N;
    const c1x = px[i] + (px[i2] - px[i0]) / 6;
    const c1y = py[i] + (py[i2] - py[i0]) / 6;
    const c2x = px[i2] - (px[i3] - px[i]) / 6;
    const c2y = py[i2] - (py[i3] - py[i]) / 6;
    d += `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${px[i2].toFixed(2)},${py[i2].toFixed(2)}`;
  }
  return d + "Z";
}

const STILL_T = 7;

export function LogoForm({ className = "" }: { className?: string }) {
  const body = useRef<SVGPathElement>(null);
  const echo = useRef<SVGPathElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const b = body.current;
    const e = echo.current;
    const g = glow.current;
    if (!b || !e || !g) return;

    const set = (t: number) => {
      b.setAttribute("d", pathAt(t, 1));
      e.setAttribute("d", pathAt(t - 1.2, 1.075));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      set(STILL_T);
      return;
    }

    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), { threshold: 0 });
    io.observe(b.ownerSVGElement ?? b);

    let pulseTimer = 0;
    const onBooked = () => {
      g.classList.add("is-lit");
      window.clearTimeout(pulseTimer);
      pulseTimer = window.setTimeout(() => g.classList.remove("is-lit"), 1400);
    };
    window.addEventListener("flowa:booked", onBooked);

    const small = window.matchMedia("(max-width: 767px)").matches;
    let raf = 0;
    let last = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      if (small && now - last < 33) return; // 30 fps on small screens
      last = now;
      set((now - start) / 1000 + STILL_T);
    };
    set(STILL_T);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(pulseTimer);
      io.disconnect();
      window.removeEventListener("flowa:booked", onBooked);
    };
  }, []);

  const fill = `${id}-fill`;
  return (
    <div className={`logo-form pointer-events-none ${className}`} aria-hidden="true">
      <div ref={glow} className="logo-form-glow" />
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={fill} cx="42%" cy="38%" r="68%">
            <stop offset="0" stopColor="rgb(255 204 140)" />
            <stop offset="0.42" stopColor="rgb(246 174 86)" />
            <stop offset="0.8" stopColor="rgb(238 158 71)" />
            <stop offset="1" stopColor="rgb(226 140 52)" />
          </radialGradient>
        </defs>
        <g className="logo-form-drift">
          <g className="logo-form-turn">
            <path ref={echo} className="logo-form-echo" d={pathAt(STILL_T - 1.2, 1.075)} />
            <path ref={body} className="logo-form-body" d={pathAt(STILL_T, 1)} fill={`url(#${fill})`} />
          </g>
        </g>
      </svg>
    </div>
  );
}
