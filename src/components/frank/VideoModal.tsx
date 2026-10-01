import { useEffect, useRef } from "react";
import { home } from "@/content/frank/home";
import { asset } from "@/lib/asset";
import { Close } from "./Icons";

/**
 * "See Frank in action": a modal that plays the 37-second demo (one warm
 * SaaS lead, from signal to booked meeting). Muted autoplay with
 * controls and playsinline; Esc, the close button or the backdrop close
 * it and focus returns to the page.
 */
export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={home.hero.video}>
      <button type="button" aria-label={home.hero.videoClose} onClick={onClose} className="absolute inset-0 cursor-default bg-ink/75 backdrop-blur-sm" tabIndex={-1} />
      <div className="rise-in relative w-full max-w-5xl">
        <div className="overflow-hidden rounded-frame border border-ink bg-ink shadow-lift">
          <button ref={closeRef} type="button" onClick={onClose} aria-label={home.hero.videoClose} className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-float">
            <Close size={20} />
          </button>
          <video className="block aspect-video w-full bg-ink" poster={asset(home.hero.videoPoster)} autoPlay muted controls playsInline preload="metadata">
            <source src={asset(home.hero.videoSrc.replace(/\.mp4$/, ".webm"))} type="video/webm" />
            <source src={asset(home.hero.videoSrc)} type="video/mp4" />
          </video>
        </div>
        <p className="mt-3 text-center text-small text-white/70">{home.hero.videoNote}</p>
      </div>
    </div>
  );
}
