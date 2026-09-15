import { useEffect, useRef } from "react";

/**
 * A button that leans a few pixels toward the pointer while it is over
 * it, and settles back when it leaves. Pointer devices only (no touch),
 * off under prefers-reduced-motion. Transform-only, one rAF per move.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transition = "transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms, color 150ms, border-color 150ms";
        el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength * 0.8).toFixed(1)}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms, color 150ms, border-color 150ms";
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
