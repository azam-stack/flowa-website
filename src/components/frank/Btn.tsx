import type { ButtonHTMLAttributes, ReactNode } from "react";
import { SmartLink } from "@/components/SmartLink";
import { track } from "@/lib/analytics";

type Variant = "primary" | "outline" | "text";
type Size = "md" | "lg" | "sm";

const SIZE: Record<Size, string> = {
  sm: "h-10 px-4 text-[15px]",
  md: "h-12 px-6 text-[16px]",
  lg: "h-14 px-7 text-[17px]",
};

/**
 * The one button. Black primary (8px radius), outline and text variants,
 * all with the hover lift from index.css. With `href` it renders a link.
 * `trackLabel` records a cta_click with that label.
 */
export function Btn({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  trackLabel,
  onClick,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  trackLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & { onClick?: () => void }) {
  const cls = `btn btn-${variant} ${SIZE[size]} ${className}`;
  // Plain-text labels get the hover label slide: the label slides up and is replaced by itself.
  const label =
    typeof children === "string" ? (
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    ) : (
      children
    );
  const handle = () => {
    if (trackLabel) track("cta_click", { label: trackLabel });
    onClick?.();
  };
  if (href) {
    return (
      <SmartLink href={href} className={cls} onClick={handle} aria-disabled={rest.disabled || undefined}>
        {label}
      </SmartLink>
    );
  }
  return (
    <button type={rest.type ?? "button"} className={cls} onClick={handle} {...rest}>
      {label}
    </button>
  );
}
