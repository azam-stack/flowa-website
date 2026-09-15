import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";

/**
 * One button system for the whole site.
 * - primary: near-black, orange on hover — the default call to action.
 * - accent: orange — reserved for the nav and the final "get started" form.
 * - ghost: bordered — secondary actions ("See how it works").
 * Never more than one accent button in view at a time.
 *
 * Hover: the label slides up and is replaced by itself from below, the
 * arrow (if any) leads by 3px, the colour follows. Press: 0.98 scale.
 * `magnetic` makes the button lean toward the pointer (desktop only).
 */
const BASE =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-60";

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

/** The label twice, stacked, so it can slide out and back in on hover. */
function Label({ children }: { children: ReactNode }) {
  return (
    <span className="btn-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  /** Trailing arrow — for secondary "go and look" actions. */
  arrow?: boolean;
  /** Leans toward the pointer. Only for the page's main calls to action. */
  magnetic?: boolean;
  children: ReactNode;
}

export function LinkButton({ variant = "primary", size = "md", arrow = false, magnetic = false, className = "", children, ...rest }: LinkButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ? 0.28 : 0);
  return (
    <a ref={magnetic ? ref : undefined} className={classes(variant, size, className)} {...rest}>
      <Label>{children}</Label>
      {arrow && <ArrowRight size={16} className="transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px] motion-reduce:transition-none" aria-hidden="true" />}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  magnetic?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", loading = false, magnetic = false, className = "", children, disabled, ...rest }: ButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(magnetic ? 0.2 : 0);
  return (
    <button ref={magnetic ? ref : undefined} className={classes(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && (
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" aria-hidden="true" />
      )}
      <Label>{children}</Label>
    </button>
  );
}
