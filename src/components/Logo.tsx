/** The real Flowa wordmark (public/flowa-logo.png) — used as-is, not redrawn. */
export function Logo({ className = "" }: { className?: string }) {
  return <img src="/flowa-logo.png" alt="Flowa" className={`h-8 w-auto rounded-lg sm:h-9 ${className}`} />;
}
