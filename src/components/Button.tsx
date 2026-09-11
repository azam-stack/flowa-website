import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent whitespace-nowrap";

const VARIANTS = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-accent-fg active:scale-[0.98]",
  accent: "bg-accent text-accent-fg hover:bg-accent-hover active:scale-[0.98]",
  ghost: "border border-border text-fg hover:border-fg active:scale-[0.98]",
  ghostDark: "border border-white/25 text-ink-fg hover:border-white/60 active:scale-[0.98]",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof VARIANTS;
}

export function LinkButton({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: keyof typeof VARIANTS } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
