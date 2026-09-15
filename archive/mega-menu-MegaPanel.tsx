import { type ReactNode } from "react";

interface MegaPanelProps {
  id: string;
  open: boolean;
  rendered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  align?: "left" | "center";
  width?: string;
  children: ReactNode;
}

/**
 * Positions and animates a mega-menu panel under its trigger. The panel
 * wrapper starts flush at `top-full` with no margin — visual spacing comes
 * from internal padding instead — so the hoverable hit-area is contiguous
 * from the trigger straight into the panel with no dead zone a diagonal
 * mouse path could fall through (the "bridge" the interaction spec calls for).
 */
export function MegaPanel({ id, open, rendered, onMouseEnter, onMouseLeave, align = "left", width = "w-[720px]", children }: MegaPanelProps) {
  if (!rendered) return null;
  return (
    <div
      id={id}
      role="menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute top-full pt-3 ${align === "left" ? "left-0" : "left-1/2 -translate-x-1/2"} ${width}`}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-16px_rgba(0,0,0,0.14)] transition-[opacity,transform] motion-reduce:transition-none ${
          open ? "translate-y-0 opacity-100 duration-[180ms] ease-[cubic-bezier(.16,1,.3,1)]" : "-translate-y-2 opacity-0 duration-[120ms] ease-out"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
