import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fade-up when scrolled into view. Fires once. Used at section level —
 * one reveal per section header/body, not one per card — so the page
 * reads as content arriving, not as every element fading in on its own.
 * 480ms on the site's easing curve; off under prefers-reduced-motion.
 * Sets `data-inview` so children can stagger off it in CSS.
 */
export function Reveal({ children, delay = 0, className = "", id }: { children: ReactNode; delay?: number; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      data-inview={inView ? "true" : "false"}
      className={`transition-[opacity,transform] duration-reveal ease-flowa motion-reduce:transition-none ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
