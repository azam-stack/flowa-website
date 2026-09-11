const BLOB_PATH =
  "M-5,-62C13,-64,34,-62,48,-48C58,-38,54,-28,46,-20C36,-10,22,-12,26,-2C30,8,50,4,50,22C50,38,36,36,26,46C16,56,4,64,-12,62C-30,60,-40,50,-46,36C-54,18,-58,4,-50,-14C-44,-28,-48,-38,-38,-48C-28,-58,-18,-60,-5,-62Z";

/** Flowa wordmark: bold sans-serif with the signature hand-drawn O outline. */
export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[2px] text-2xl font-extrabold tracking-tight ${dark ? "text-ink-fg" : "text-fg"} ${className}`}>
      fl
      <svg viewBox="-64 -68 128 136" className="relative -mx-[1px] inline-block h-[0.7em] w-[0.66em] translate-y-[0.02em]" aria-hidden="true">
        <path d={BLOB_PATH} fill="none" stroke="currentColor" className="text-accent" strokeWidth="11" />
      </svg>
      wa
    </span>
  );
}
