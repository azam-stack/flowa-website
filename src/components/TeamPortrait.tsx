import { useState } from "react";

/**
 * 4:5 portrait. Greyscale, no zoom on hover — the only hover change is a
 * 1px orange rule growing along the bottom edge (200ms, off under
 * prefers-reduced-motion) plus the surface behind the card. Falls back to
 * initials on load error, since the real photo files may not exist yet —
 * this must never look like a fabricated stock photo.
 */
export function TeamPortrait({ name, role, srcBase, className = "" }: { name: string; role: string; srcBase: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`group relative w-full max-w-[210px] overflow-hidden rounded-2xl bg-fg/[0.04] p-2 transition-colors duration-200 hover:bg-fg/[0.06] ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-fg/[0.06]">
        {!errored ? (
          <picture>
            <source srcSet={`${srcBase}.avif`} type="image/avif" />
            <source srcSet={`${srcBase}.webp`} type="image/webp" />
            <img
              src={`${srcBase}.jpg`}
              alt={`${name}, ${role}`}
              width={480}
              height={600}
              loading="lazy"
              onError={() => setErrored(true)}
              className="h-full w-full object-cover grayscale"
            />
          </picture>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
            <span className="text-3xl font-bold text-muted">{initials}</span>
            <span className="text-xs text-muted">Photo pending</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0 bg-accent transition-[height] duration-200 ease-out group-hover:h-[3px] motion-reduce:transition-none motion-reduce:group-hover:h-0" />
      </div>
    </div>
  );
}
