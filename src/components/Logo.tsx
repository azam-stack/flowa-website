import { asset } from "@/lib/asset";

/**
 * The Flowa wordmark on a transparent background: ink letters with the
 * orange "o" (public/flowa-logo-dark.png, made from the original
 * flowa-logo.png, which keeps the orange box for other uses).
 */
export function Logo({ className = "" }: { className?: string }) {
  return <img src={asset("flowa-logo-dark.png")} alt="Flowa" width={685} height={202} className={`h-7 w-auto sm:h-8 ${className}`} />;
}
