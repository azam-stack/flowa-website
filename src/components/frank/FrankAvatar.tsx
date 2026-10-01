import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/hooks/useInView";

/**
 * Frank, Flowa's AI outbound agent: ginger-brown quiff, round tortoiseshell
 * glasses, short beard, gap-toothed grin, orange cardigan over a denim
 * shirt. Rendered 3D stills live in public/images/frank; this is the only
 * place that maps a pose to a file, so swapping art never touches callers.
 *
 * - `round`: the face crop (frank-face.webp), for chat, nav and avatars.
 * - `video`: plays the idle loop (public/video/frank-idle.*) with the
 *   portrait as poster; under reduced motion the still is shown instead.
 */
export type FrankPose = "portrait" | "wave" | "laptop" | "thumbs";

export const FRANK_ALT = "Frank, Flowa's AI outbound agent";

const FILE: Record<FrankPose, string> = {
  portrait: "images/frank/frank-portrait.webp",
  wave: "images/frank/frank-wave.webp",
  laptop: "images/frank/frank-laptop.webp",
  thumbs: "images/frank/frank-thumbsup.webp",
};

export function FrankAvatar({
  pose = "portrait",
  className = "",
  decorative = false,
  round = false,
  video = false,
  eager = false,
}: {
  pose?: FrankPose;
  /** Kept for API compatibility with the vector stand-in; the renders carry their own soft backdrop. */
  bg?: "apricot" | "none";
  className?: string;
  decorative?: boolean;
  round?: boolean;
  video?: boolean;
  eager?: boolean;
}) {
  const reduced = useReducedMotion();
  const alt = decorative ? "" : FRANK_ALT;
  const src = asset(round ? "images/frank/frank-face.webp" : FILE[pose]);
  const size = round ? 256 : 1024;
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-[#EFE9E8] ${round ? "rounded-full" : ""} ${className}`}>
      {video && !reduced ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={asset(FILE.portrait)}
          aria-label={decorative ? undefined : FRANK_ALT}
          aria-hidden={decorative || undefined}
        >
          <source src={asset("video/frank-idle.webm")} type="video/webm" />
          <source src={asset("video/frank-idle.mp4")} type="video/mp4" />
        </video>
      ) : (
        <img src={src} alt={alt} width={size} height={size} loading={eager ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      )}
    </div>
  );
}
