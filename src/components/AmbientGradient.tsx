import { useEffect, useRef, useState } from "react";

/**
 * Ambient light for the dark band: three large, heavily blurred radial
 * gradients in the accent family drifting on their own cycles, plus one
 * that follows the pointer. Almost subliminal by design.
 *
 * Built to spec, not from the reference: no theme hook, no global CSS
 * variables, no viewport units, no SVG goo filter. The layer is
 * `absolute; inset: 0` inside its band (which is `relative` and
 * `overflow: hidden`), sized to the band, never the viewport. Blob
 * motion is CSS (transform + opacity only, keyframes in
 * tailwind.config.ts); it runs only while the band is on screen and the
 * tab is visible. The pointer blob lerps toward the cursor on a rAF
 * loop that starts on enter and stops on leave, desktop only.
 * prefers-reduced-motion: one still frame, nothing runs.
 */
const BLOBS = [
  { cls: "animate-drift-1", rgb: "var(--rgb-accent)", opacity: 0.14, size: "72%", left: "8%", top: "-10%" },
  { cls: "animate-drift-2", rgb: "var(--rgb-accent-strong)", opacity: 0.1, size: "64%", left: "48%", top: "10%" },
  { cls: "animate-drift-3", rgb: "var(--rgb-accent-band)", opacity: 0.08, size: "70%", left: "24%", top: "38%" },
] as const;

export function AmbientGradient({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // Pointer blob: lerp toward the cursor, written straight to the node.
  useEffect(() => {
    const el = root.current;
    const dot = pointer.current;
    if (!el || !dot || !active) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;

    const band = el.parentElement ?? el;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = e.clientX - r.left - r.width / 2;
      ty = e.clientY - r.top - r.height / 2;
    };
    const tick = () => {
      cx += (tx - cx) / 20;
      cy += (ty - cy) / 20;
      dot.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    band.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      band.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: "var(--depth-atmosphere)" as unknown as number, filter: "blur(60px)" }}
      data-active={active ? "true" : "false"}
    >
      {BLOBS.map((b) => (
        <div
          key={b.cls}
          className={`ambient-blob absolute rounded-full ${b.cls}`}
          style={{
            width: b.size,
            paddingBottom: b.size,
            left: b.left,
            top: b.top,
            background: `radial-gradient(circle at center, rgb(${b.rgb} / ${b.opacity}) 0%, rgb(${b.rgb} / 0) 60%)`,
          }}
        />
      ))}
      <div
        ref={pointer}
        className="absolute left-1/2 top-1/2 h-[60%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle at center, rgb(var(--rgb-accent) / 0.06) 0%, rgb(var(--rgb-accent) / 0) 60%)" }}
      />
    </div>
  );
}
