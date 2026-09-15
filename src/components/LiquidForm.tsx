/**
 * The hero's living object — a translucent form in Flowa's own orange,
 * lit from the top-left and cooled toward the bottom, slowly changing
 * shape and drifting. Pure CSS: layered gradients on an element whose
 * border-radius morphs (index.css → Liquid form). Decorative only.
 *
 * The idea comes from the reference clip (one refractive object over a
 * warm gradient); the material, colours and scale are Flowa's.
 */
export function LiquidForm({ className = "" }: { className?: string }) {
  return (
    <div className={`liquid ${className}`} aria-hidden="true">
      <div className="liquid-glow" />
      <div className="liquid-core" />
      <div className="liquid-shade" />
      <div className="liquid-highlight" />
      <div className="liquid-rim" />
    </div>
  );
}
