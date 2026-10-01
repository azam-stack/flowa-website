import type { CSSProperties, ReactNode } from "react";

/** Container max-width 1400px, side padding 88px desktop / 16px mobile (brief §2.4). */
export function Container({ children, className = "", style, id }: { children: ReactNode; className?: string; style?: CSSProperties; id?: string }) {
  return (
    <div id={id} className={`mx-auto w-full max-w-container px-4 md:px-10 xl:px-gutter ${className}`} style={style}>
      {children}
    </div>
  );
}
