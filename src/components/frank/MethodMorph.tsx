import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { LOGO_PATH } from "./HalftoneField";
import { Section } from "./SectionHeading";

const HOLD_MS = 3400;
const MORPH_MS = 1100;
const GAP = 8;

type Rgb = [number, number, number];
const INK: Rgb = [14, 11, 9];
const ORANGE: Rgb = [232, 81, 26];
const LIME: Rgb = [200, 253, 3];
const PAPER: Rgb = [246, 245, 241];

/**
 * The method as one living picture. A fixed grid of halftone dots is
 * printed from three masks in turn — the market (hundreds of small marks,
 * a few orange with a signal), the one (Flowa's "o" around a single
 * person), the meeting (a calendar tile with a lime tick) — and the dots
 * morph between them: size and colour ease from one state to the next,
 * and the pointer still parts them. The captions on the left follow.
 */
export function MethodMorph() {
  const m = home.method;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [beat, setBeat] = useState(reduced ? 2 : 0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const beatRef = useRef(beat);
  beatRef.current = beat;

  // Advance the beat while on screen.
  useEffect(() => {
    if (!active || reduced) return;
    const t = window.setTimeout(() => setBeat((b) => (b + 1) % 3), HOLD_MS + MORPH_MS);
    return () => window.clearTimeout(t);
  }, [active, reduced, beat]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    // per cell: target radius + colour for each of the 3 states
    let states: Array<{ r: Float32Array; c: Float32Array }> = [];
    let cur = { r: new Float32Array(0), c: new Float32Array(0) }; // current eased
    let from = { r: new Float32Array(0), c: new Float32Array(0) };
    let pos = new Float32Array(0); // x, y, vx, vy
    let morphStart = -1;
    let shown = beatRef.current;
    let px = -1e5;
    let py = -1e5;
    let raf = 0;
    let lastBeat = beatRef.current;

    const sample = (paint: (c: CanvasRenderingContext2D) => void) => {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const o = off.getContext("2d", { willReadFrequently: true });
      const r = new Float32Array(cols * rows);
      const c = new Float32Array(cols * rows * 3);
      if (!o) return { r, c };
      paint(o);
      const img = o.getImageData(0, 0, w, h).data;
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let a = 0;
          let rr = 0;
          let gg = 0;
          let bb = 0;
          let n = 0;
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * GAP + ((sx + 0.5) * GAP) / 3));
              const y = Math.min(h - 1, Math.floor(gy * GAP + ((sy + 0.5) * GAP) / 3));
              const k = (y * w + x) * 4;
              const al = img[k + 3] / 255;
              a += al;
              if (al > 0.2) {
                rr += img[k];
                gg += img[k + 1];
                bb += img[k + 2];
                n++;
              }
            }
          }
          const cov = a / 9;
          const i = gy * cols + gx;
          r[i] = cov < 0.06 ? 0 : Math.sqrt(cov) * GAP * 0.58;
          if (n) {
            c[i * 3] = rr / n;
            c[i * 3 + 1] = gg / n;
            c[i * 3 + 2] = bb / n;
          } else {
            c[i * 3] = INK[0];
            c[i * 3 + 1] = INK[1];
            c[i * 3 + 2] = INK[2];
          }
        }
      }
      return { r, c };
    };

    const rgb = (v: Rgb) => `rgb(${v[0]},${v[1]},${v[2]})`;
    const paintMarket = (o: CanvasRenderingContext2D) => {
      // a field of small marks: companies. Seeded so it is stable across resizes.
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      const n = Math.round((w * h) / 2600);
      for (let i = 0; i < n; i++) {
        // snapped to the dot grid, so each company is one clean dot; a signal is a 2×2 orange mark
        const x = (Math.floor((w * (0.06 + rnd() * 0.88)) / GAP) + 0.5) * GAP;
        const y = (Math.floor((h * (0.08 + rnd() * 0.84)) / GAP) + 0.5) * GAP;
        const hot = rnd() < 0.14;
        o.fillStyle = hot ? rgb(ORANGE) : rgb(INK);
        o.beginPath();
        if (hot) o.roundRect(x - GAP * 0.5, y - GAP * 0.5, GAP * 2, GAP * 2, GAP * 0.6);
        else o.arc(x, y, GAP * 0.42, 0, 6.2832);
        o.fill();
      }
    };
    const paintOne = (o: CanvasRenderingContext2D) => {
      const size = Math.min(h * 0.82, w * 0.62);
      const s = size / 320;
      o.save();
      o.translate(w / 2 - 180 * s, h / 2 - 170 * s);
      o.scale(s, s);
      o.lineWidth = 26;
      o.strokeStyle = rgb(ORANGE);
      o.stroke(new Path2D(LOGO_PATH));
      o.restore();
      // the person: a head and shoulders in ink, centred
      const cx = w / 2;
      const cy = h / 2;
      o.fillStyle = rgb(INK);
      o.beginPath();
      o.arc(cx, cy - size * 0.1, size * 0.085, 0, 6.2832);
      o.fill();
      o.beginPath();
      o.moveTo(cx - size * 0.17, cy + size * 0.2);
      o.quadraticCurveTo(cx, cy - size * 0.06, cx + size * 0.17, cy + size * 0.2);
      o.closePath();
      o.fill();
    };
    const paintMeeting = (o: CanvasRenderingContext2D) => {
      const tw = Math.min(w * 0.58, h * 0.9);
      const th = tw * 0.78;
      const x = (w - tw) / 2;
      const y = (h - th) / 2;
      const rr = tw * 0.08;
      o.fillStyle = rgb(INK);
      o.beginPath();
      o.roundRect(x, y, tw, th, rr);
      o.fill();
      // header bar cut-out, binder rings
      o.globalCompositeOperation = "destination-out";
      o.fillRect(x, y + th * 0.2, tw, GAP * 1.2);
      o.globalCompositeOperation = "source-over";
      // the time, in paper (cut) — drawn as a lighter band is hard; instead a lime tick
      o.strokeStyle = rgb(LIME);
      o.lineWidth = tw * 0.075;
      o.lineCap = "round";
      o.lineJoin = "round";
      o.beginPath();
      o.moveTo(x + tw * 0.33, y + th * 0.6);
      o.lineTo(x + tw * 0.46, y + th * 0.74);
      o.lineTo(x + tw * 0.7, y + th * 0.42);
      o.stroke();
      // two small orange dots as the "14:30" marks
      o.fillStyle = rgb(ORANGE);
      o.beginPath();
      o.arc(x + tw * 0.22, y + th * 0.1, GAP * 0.9, 0, 6.2832);
      o.arc(x + tw * 0.78, y + th * 0.1, GAP * 0.9, 0, 6.2832);
      o.fill();
    };

    const layout = () => {
      const rect = stage.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / GAP);
      rows = Math.ceil(h / GAP);
      states = [sample(paintMarket), sample(paintOne), sample(paintMeeting)];
      const n = cols * rows;
      cur = { r: new Float32Array(states[shown].r), c: new Float32Array(states[shown].c) };
      from = { r: new Float32Array(cur.r), c: new Float32Array(cur.c) };
      pos = new Float32Array(n * 4);
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const i = gy * cols + gx;
          pos[i * 4] = gx * GAP + GAP / 2;
          pos[i * 4 + 1] = gy * GAP + GAP / 2;
        }
      }
      morphStart = -1;
    };

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      // start a morph when the beat changes
      if (beatRef.current !== lastBeat) {
        lastBeat = beatRef.current;
        from = { r: new Float32Array(cur.r), c: new Float32Array(cur.c) };
        shown = lastBeat;
        morphStart = now;
      }
      const to = states[shown];
      if (!to) return;
      const k = morphStart < 0 ? 1 : Math.min(1, (now - morphStart) / MORPH_MS);
      const e = ease(k);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = cols * rows;
      let moving = k < 1;
      for (let i = 0; i < n; i++) {
        // ease size and colour
        const tr = from.r[i] + (to.r[i] - from.r[i]) * e;
        cur.r[i] = tr;
        for (let ch = 0; ch < 3; ch++) cur.c[i * 3 + ch] = from.c[i * 3 + ch] + (to.c[i * 3 + ch] - from.c[i * 3 + ch]) * e;
        if (tr < 0.35) continue;
        // pointer push on position
        const hx = (i % cols) * GAP + GAP / 2;
        const hy = Math.floor(i / cols) * GAP + GAP / 2;
        let x = pos[i * 4];
        let y = pos[i * 4 + 1];
        let vx = pos[i * 4 + 2];
        let vy = pos[i * 4 + 3];
        if (!reduced) {
          const dx = x - px;
          const dy = y - py;
          const d2 = dx * dx + dy * dy;
          const R = 90;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) + 0.001;
            const f = (1 - d / R) * 2.4;
            vx += (dx / d) * f;
            vy += (dy / d) * f;
          }
          vx = (vx + (hx - x) * 0.06) * 0.82;
          vy = (vy + (hy - y) * 0.06) * 0.82;
          x += vx;
          y += vy;
          if (Math.abs(vx) + Math.abs(vy) > 0.02) moving = true;
          else {
            x = hx;
            y = hy;
            vx = 0;
            vy = 0;
          }
          pos[i * 4] = x;
          pos[i * 4 + 1] = y;
          pos[i * 4 + 2] = vx;
          pos[i * 4 + 3] = vy;
        }
        ctx.fillStyle = `rgb(${Math.round(cur.c[i * 3])},${Math.round(cur.c[i * 3 + 1])},${Math.round(cur.c[i * 3 + 2])})`;
        ctx.beginPath();
        ctx.arc(x, y, tr, 0, 6.2832);
        ctx.fill();
      }
      return moving || px > -1e4;
    };

    let visible = true;
    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      const again = draw(now);
      if (again || beatRef.current !== lastBeat) raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      px = e.clientX - b.left;
      py = e.clientY - b.top;
      wake();
    };
    const onLeave = () => {
      px = -1e5;
      py = -1e5;
      wake();
    };
    layout();
    draw(performance.now());
    wake();
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      layout();
      wake();
    });
    ro.observe(stage);
    const io = new IntersectionObserver((en) => {
      visible = en[0] ? en[0].isIntersecting : true;
      if (visible) wake();
    });
    io.observe(stage);
    // a beat change must wake the loop even if nothing else is moving
    const tick = window.setInterval(() => {
      if (beatRef.current !== lastBeat) wake();
    }, 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(tick);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  const pick = (i: number) => setBeat(i);

  return (
    <Section id="see-it-work" tone="white">
      <Container>
        <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className="mono-label text-brand">{m.eyebrow}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,1.4rem+3.8vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              {m.h2Light}
              <span className="dim">{m.h2Bold}</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink-2 md:text-[18px]">{m.sub}</p>
            <ol className="mt-10 border-t border-line">
              {m.beats.map((b, i) => {
                const on = i === beat;
                return (
                  <li key={b.key} className="border-b border-line">
                    <button type="button" onClick={() => pick(i)} aria-current={on ? "step" : undefined} className="grid w-full grid-cols-[36px_minmax(0,1fr)] items-baseline gap-4 py-4 text-left">
                      <span className={`mono-label ${on ? "text-brand" : ""}`}>0{i + 1}</span>
                      <span>
                        <span className={`block text-[20px] font-semibold tracking-[-0.01em] transition-colors ${on ? "text-ink" : "text-muted"}`}>{b.title}</span>
                        <span className={`fm-body ${on ? "is-open" : ""}`}>
                          <span className="block pt-1.5 text-[15px] leading-relaxed text-ink-2">{b.body}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal>
            <div className="loop-card overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-6 pt-5 text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted">
                <span key={beat} className="fm-fade">
                  {m.beats[beat].label}
                </span>
                <span className="flex items-center gap-2 text-[#5a7a00]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-lime text-lime" /> Live
                </span>
              </div>
              <div ref={stageRef} className="relative mx-auto aspect-[4/3] w-full max-w-[640px] cursor-crosshair">
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
              </div>
              <p className="border-t border-line px-6 py-4 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                <span key={beat} className="fm-fade">
                  {m.beats[beat].stat}
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
