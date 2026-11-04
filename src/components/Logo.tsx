import { asset } from "@/lib/asset";

/**
 * The Flowa wordmark on a transparent background: ink letters with the
 * orange "o" (public/flowa-logo-dark.png, made from the original
 * flowa-logo.png, which keeps the orange box for other uses).
 */
export function Logo({ className = "", onOrange = false }: { className?: string; /** All-white wordmark for use over a tangerine surface, where the orange "o" would vanish. */ onOrange?: boolean }) {
  return <img src={asset(onOrange ? "flowa-logo-white.png" : "flowa-logo-light.png")} alt="Flowa" width={685} height={202} className={`h-7 w-auto sm:h-8 ${className}`} />;
}
