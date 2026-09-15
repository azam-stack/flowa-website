import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "near" | "far" | "surface" | "blur";

const VARIANT_CLASS: Record<Variant, string> = {
  up: "",
  near: "reveal-near",
  far: "reveal-far",
  surface: "reveal-surface",
  blur: "reveal-blur",
};

/**
 * Marks its element `data-inview` once it has scrolled into view (fires
 * once). The movement itself lives in CSS (.reveal, .stagger, .rule,
 * .img-settle in index.css), so every reveal on the site shares one
 * duration, one easing and one set of distances.
 *
 * - `variant` picks the distance/depth the element arrives from.
 * - `stagger` makes the element's direct children arrive one by one.
 * - `delay` shifts the whole thing (ms).
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  stagger = false,
  className = "",
  id,
  threshold = 0.1,
}: {
  children: ReactNode;
  delay?: number;
  variant?: Variant;
  stagger?: boolean;
  className?: string;
  id?: string;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      id={id}
      data-inview={inView ? "true" : "false"}
      className={`reveal ${VARIANT_CLASS[variant]} ${stagger ? "stagger" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
