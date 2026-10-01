import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Marks its element `data-inview` once it has scrolled into view (fires
 * once). The movement itself lives in CSS (.reveal in index.css): cards
 * fade up 16px over 300ms, ease-out (brief §2.4). `stagger` makes the
 * element's direct children arrive one by one; `delay` shifts it (ms).
 */
export function Reveal({
  children,
  delay = 0,
  stagger = false,
  className = "",
  id,
  threshold = 0.1,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
  className?: string;
  id?: string;
  threshold?: number;
  as?: "div" | "section" | "ul" | "ol" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
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
    <Tag ref={ref as never} id={id} data-inview={inView ? "true" : "false"} className={`reveal ${stagger ? "stagger" : ""} ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
