import { useRef } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { SmartLink } from "@/components/SmartLink";
import { footer } from "@/content/frank/chrome";
import { HalftoneField } from "./HalftoneField";
export function HalftoneFooter({ wordmark = "flowa", dotGap = 6, radius = 90, crop = 0.3, grain = 0.5 }: { wordmark?: string; dotGap?: number; radius?: number; crop?: number; grain?: number }) {
  const rootRef = useRef<HTMLElement>(null);
  const paint = (m: CanvasRenderingContext2D, w: number, h: number) => {
    const family = '"Inter Tight Variable", "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif';
    m.font = `800 100px ${family}`;
    const measured = m.measureText(wordmark).width;
    const fit = measured > 0 ? ((w * 0.96) / measured) * 100 : 0;
    m.font = `800 ${fit}px ${family}`;
    const box = m.measureText(wordmark);
    const cap = box.actualBoundingBoxAscent || fit * 0.72;
    m.textBaseline = "alphabetic";
    m.fillText(wordmark, (w - box.width) / 2, h + cap * Math.max(0, Math.min(0.6, crop)));
  };
  return (
    <footer ref={rootRef} className="relative isolate h-[620px] overflow-hidden border-t border-line bg-page text-ink md:h-[760px]">
      <HalftoneField paint={paint} ink={[252, 255, 255]} warm={[238, 80, 1]} dotGap={dotGap} radius={radius} grain={grain} listenOn={rootRef} />
      <span className="sr-only">{wordmark}</span>
      <div className="relative z-[1] mx-auto grid w-full max-w-container gap-8 px-4 pt-12 md:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] md:px-10 md:pt-14 xl:px-gutter">
        <div>
          <Link to="/" aria-label="Flowa home" className="inline-flex rounded-control">
            <Logo />
          </Link>
          <p className="mt-5 max-w-xs text-[15px] leading-snug text-ink-2">
            {footer.tagline} <span className="text-brand-deep">{footer.taglineAccent}</span>
          </p>
          <a href={`mailto:${footer.email}`} className="mono-label mt-4 inline-block text-ink-2 hover:text-ink">
            {footer.email}
          </a>
        </div>
        {footer.columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="mono-label">{col.heading}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <SmartLink href={l.href} className="text-[14px] text-ink-2/80 transition-colors hover:text-ink">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="relative z-[1] mx-auto mt-8 flex w-full max-w-container items-center justify-between gap-4 border-t border-line px-4 pt-4 md:px-10 xl:px-gutter">
        <p className="mono-label">{footer.bottom}</p>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="mono-label text-ink-2 hover:text-ink">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
