import type { ReactNode } from "react";

export function Container({ children, className = "", style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 md:px-10 ${className}`} style={style}>
      {children}
    </div>
  );
}
