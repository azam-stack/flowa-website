import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LinkButton } from "./Button";
import { nav } from "@/content/site.en";
import { MobileDrawer } from "./nav/MobileDrawer";

/**
 * Anchor navigation for a one-page site: every link lands on a section
 * that exists. The active section is underlined as you scroll, and the
 * "Book a call" button turns orange only once the hero's own call to
 * action has scrolled out of view — one orange button at a time.
 *
 * The mega-menu (src/components/nav/MegaPanel etc.) is kept in the repo,
 * unmounted, for when there are real sub-pages to point at.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  // One underline for the whole list; it glides to the active link rather
  // than each link growing its own. Keeps its last position while fading
  // out so it never jumps to x=0.
  const [underline, setUnderline] = useState<{ left: number; width: number; visible: boolean }>({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;
    const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = nav.anchors.map((a) => document.getElementById(a.sectionId)).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveId(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const link = activeId ? list.querySelector<HTMLElement>(`a[data-section="${activeId}"]`) : null;
      if (!link) {
        setUnderline((u) => ({ ...u, visible: false }));
        return;
      }
      // 14px = the link's horizontal padding (px-3.5), so the line spans the label only.
      setUnderline({ left: link.offsetLeft + 14, width: Math.max(0, link.offsetWidth - 28), visible: true });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [activeId]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
      >
        {nav.skipToContent}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 ${
          scrolled ? "border-b border-border bg-bg/[0.86] backdrop-blur-[14px]" : "border-b border-transparent bg-transparent"
        }`}
      >
        {/* The flow line: how far through the story the reader is. */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-opacity duration-200 ${scrolled ? "opacity-100" : "opacity-0"}`}
          style={{ transform: `scaleX(${progress})` }}
        />
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-content items-center justify-between px-6 transition-[height] duration-200 md:px-10 ${scrolled ? "h-[68px]" : "h-[88px]"}`}
        >
          <a href="#top" className="shrink-0 transition-transform duration-[240ms] ease-flowa hover:-translate-y-px motion-reduce:transition-none" aria-label="Flowa — back to top">
            <Logo />
          </a>

          <ul ref={listRef} className="relative hidden items-center gap-1 lg:flex">
            {nav.anchors.map((item) => {
              const active = activeId === item.sectionId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    data-section={item.sectionId}
                    aria-current={active ? "location" : undefined}
                    className={`block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 hover:bg-fg/[0.04] ${active ? "text-fg" : "text-fg/70 hover:text-fg"}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0.5 h-[2px] bg-accent transition-[left,width,opacity] duration-200 ease-out motion-reduce:transition-none"
              style={{ left: underline.left, width: underline.width, opacity: underline.visible ? 1 : 0 }}
            />
          </ul>

          <div className="hidden lg:block">
            <LinkButton href="#contact" variant={heroCtaVisible ? "ghost" : "accent"} size="sm" className="duration-[240ms]">
              {nav.bookCall}
            </LinkButton>
          </div>

          <button
            ref={menuButtonRef}
            aria-label={mobileOpen ? nav.menuClose : nav.menuOpen}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full text-fg lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="relative block h-5 w-5">
              <Menu size={20} className={`absolute inset-0 transition-all duration-200 motion-reduce:transition-none ${mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} />
              <X size={20} className={`absolute inset-0 transition-all duration-200 motion-reduce:transition-none ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} />
            </span>
          </button>
        </nav>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} returnFocusTo={menuButtonRef} />
    </>
  );
}
