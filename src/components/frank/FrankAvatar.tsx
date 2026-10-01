import { useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/hooks/useInView";

/**
 * Frank, Flowa's AI outbound agent: ginger-brown quiff, round tortoiseshell
 * glasses, short beard, gap-toothed grin, orange cardigan over a denim
 * shirt. Rendered 3D stills live in public/images/frank; this is the only
 * place that maps a pose to a file, so swapping art never touches callers.
 *
 * - `round`: the face crop (frank-face.webp), for chat, nav and avatars.
 * - `video`: shows the portrait still, and plays the idle loop
 *   (public/video/frank-idle.*) only while the mouse is over Frank. The
 *   video is not downloaded until the first hover. Touch devices and
 *   reduced motion keep the still.
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const alt = decorative ? "" : FRANK_ALT;
  const src = asset(round ? "images/frank/frank-face.webp" : FILE[pose]);
  const size = round ? 256 : 1024;
  // The idle loop only plays while the pointer is over Frank (mouse, not touch).
  const hoverable = video && !reduced;
  const start = (e: React.PointerEvent) => {
    if (!hoverable || e.pointerType === "touch") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().then(() => setPlaying(true)).catch(() => undefined);
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(false);
    v.pause();
  };
  return (
    <div onPointerEnter={start} onPointerLeave={stop} className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-[#EFE9E8] ${round ? "rounded-full" : ""} ${className}`}>
      <img src={src} alt={alt} width={size} height={size} loading={eager ? "eager" : "lazy"} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {hoverable && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-100" : "opacity-0"}`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src={asset("video/frank-idle.webm")} type="video/webm" />
          <source src={asset("video/frank-idle.mp4")} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
