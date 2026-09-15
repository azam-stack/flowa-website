import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/**
 * One button system for the whole site.
 * - primary: near-black, orange on hover — the default call to action.
 * - accent: orange — reserved for the nav and the final "get started" form.
 * - ghost: bordered — secondary actions ("See how it works").
 * Never more than one accent button in view at a time.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-60";

const VARIANTS = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-accent-fg",
  accent: "bg-accent text-accent-fg hover:bg-accent-hover",
  ghost: "border border-border bg-transparent text-fg hover:border-fg",
  ghostDark: "border border-white/25 text-ink-fg hover:border-white/60",
} as const;

const SIZES = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-[52px] px-7 text-base",
  sm: "h-10 px-5 text-sm",
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

function classes(variant: Variant, size: Size, className: string) {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow — for secondary "go and look" actions. */
  arrow?: boolean;
  children: ReactNode;
}

export function LinkButton({ variant = "primary", size = "md", arrow = false, className = "", children, ...rest }: LinkButtonProps) {
  return (
    <a className={`group ${classes(variant, size, className)}`} {...rest}>
      {children}
      {arrow && <ArrowRight size={16} className="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", loading = false, className = "", children, disabled, ...rest }: ButtonProps) {
  return (
    <button className={classes(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && (
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
