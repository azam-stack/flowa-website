import { asset } from "@/lib/asset";

/** The real Flowa wordmark (public/flowa-logo.png), used as-is, not redrawn. */
export function Logo({ className = "" }: { className?: string }) {
  return <img src={asset("flowa-logo.png")} alt="Flowa" width={760} height={320} className={`h-8 w-auto sm:h-9 ${className}`} />;
}
