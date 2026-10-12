/**
 * The faint grid behind the hero and the illustration bands: thin white
 * lines in ~80px squares with a small 4-point sparkle at every
 * intersection (brief §2.1). Pure CSS background, no image request.
 * `fade` clears the grid from the centre (where the headline and text sit)
 * so it only shows towards the edges.
 */
const MASK = "radial-gradient(ellipse 62% 70% at 50% 42%, transparent 45%, rgba(0,0,0,0.6) 75%, #000 100%)";

export function SparkleGrid({ className = "", fade = false }: { className?: string; fade?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`sparkle-grid pointer-events-none absolute inset-0 ${className}`}
      style={fade ? { WebkitMaskImage: MASK, maskImage: MASK } : undefined}
    />
  );
}
