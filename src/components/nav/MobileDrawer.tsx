import { useEffect, useRef, type RefObject } from "react";
import { nav } from "@/content/site.en";
import { liveServices, servicePath } from "@/content/services";
import { BookCallLink } from "../BookCallLink";
import { SmartLink } from "../SmartLink";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Off-canvas sheet: traps focus while open, closes on Escape and on the
 * backdrop, locks body scroll, and returns focus to the button that
 * opened it. Services is a group with its pages listed beneath it.
 */
export function MobileDrawer({ open, onClose, returnFocusTo }: { open: boolean; onClose: () => void; returnFocusTo: RefObject<HTMLButtonElement> }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusTo.current?.focus();
    };
  }, [open, onClose, returnFocusTo]);

  const item = (i: number) => ({
    tabIndex: open ? 0 : -1,
    className: `block py-4 text-lg font-semibold text-fg transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`,
    style: { transitionDelay: open ? `${60 + i * 30}ms` : "0ms" },
  });

  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-fg/30 transition-opacity duration-200 motion-reduce:transition-none ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-bg shadow-2xl transition-transform duration-[240ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pt-24">
          <ul className="flex flex-col">
            {nav.primary.map((entry, i) => (
              <li key={entry.key} className="border-b border-border">
                <SmartLink href={entry.href} onClick={onClose} {...item(i)}>
                  {entry.label}
                </SmartLink>
                {"menu" in entry && entry.menu && (
                  <ul className="-mt-1 mb-3 flex flex-col">
                    {liveServices.map((s, k) => (
                      <li key={s.slug}>
                        <SmartLink href={servicePath(s.slug)} onClick={onClose} tabIndex={open ? 0 : -1} className={`block py-2 pl-4 text-[15px] font-medium text-fg/75 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`} style={{ transitionDelay: open ? `${90 + k * 30}ms` : "0ms" }}>
                          {s.name}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-border p-6">
          <BookCallLink location="mobile-drawer" variant="accent" size="lg" className="w-full" onClick={onClose} tabIndex={open ? 0 : -1} />
        </div>
      </div>
    </div>
  );
}
