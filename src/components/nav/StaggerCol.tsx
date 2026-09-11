import type { ReactNode } from "react";

/** One column inside a mega-panel — fades/rises in with a 20ms-per-column stagger. */
export function StaggerCol({ index, open, className = "", children }: { index: number; open: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      className={`transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"} ${className}`}
      style={{ transitionDelay: open ? `${index * 20}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
