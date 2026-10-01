import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { SmartLink } from "@/components/SmartLink";
import { chat } from "@/content/frank/chrome";
import { useReducedMotion } from "@/hooks/useInView";
import { track } from "@/lib/analytics";
import { FrankAvatar } from "./FrankAvatar";
import { Calendar, Close, Send } from "./Icons";

type Mode = "avatar" | "teaser" | "panel";

const TEASER_DELAY_MS = 8000;
const TYPING_MS = 1200;
const DISMISS_KEY = "frank-chat-dismissed";

function wasDismissed() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}
function rememberDismissed() {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* storage unavailable: the teaser simply shows again next page */
  }
}

/**
 * "Ask Frank" (design upgrade §6.1): starts collapsed as a round Frank
 * avatar, bottom-right, on every page and every screen size, so it never
 * covers the hero cards or content. On desktop, after 8 s a small teaser rises above
 * the avatar: a typing indicator for 1.2 s, then Frank's greeting. A click
 * opens the panel with the quick replies and a message box (no live AI in
 * the draft). Closing the teaser keeps it closed for the session.
 */
export function ChatWidget() {
  const [mode, setMode] = useState<Mode>("avatar");
  const [typing, setTyping] = useState(true);
  const [draft, setDraft] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);

  // A new page: back to the avatar; the teaser comes back after 8 s unless dismissed.
  useEffect(() => {
    setMode("avatar");
    setAsked(null);
    setDraft("");
    // Mobile: the avatar only, so nothing ever covers content.
    if (wasDismissed() || window.matchMedia("(max-width: 767px)").matches) return;
    const t = window.setTimeout(() => {
      setTyping(!reduced);
      setMode((m) => (m === "avatar" ? "teaser" : m));
    }, TEASER_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [pathname, reduced]);

  useEffect(() => {
    if (mode !== "teaser" || !typing) return;
    const t = window.setTimeout(() => setTyping(false), TYPING_MS);
    return () => window.clearTimeout(t);
  }, [mode, typing]);

  useEffect(() => {
    if (mode !== "panel") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button, input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const open = (question?: string) => {
    track("chat_open", { via: question ? "message" : mode === "teaser" ? "teaser" : "avatar" });
    if (question) setAsked(question);
    setMode("panel");
  };
  const close = () => {
    track("chat_close");
    rememberDismissed();
    setMode("avatar");
    setTimeout(() => avatarRef.current?.focus(), 0);
  };
  const send = (e: FormEvent) => {
    e.preventDefault();
    if (draft.trim()) setAsked(draft.trim());
    setDraft("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {mode === "teaser" && (
        <div className="rise-in relative w-[min(300px,calc(100vw-2rem))] rounded-[18px] rounded-br-[6px] border border-line bg-white p-4 pr-10 text-left shadow-lift">
          <button type="button" onClick={close} aria-label={chat.close} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-soft hover:text-ink">
            <Close size={15} />
          </button>
          <button type="button" onClick={() => open()} className="block w-full text-left">
            <span className="flex items-center gap-2 text-[12px] text-muted">
              <FrankAvatar round decorative className="h-6 w-6" /> {chat.meta}
            </span>
            {typing ? (
              <span className="typing mt-3 text-ink" aria-label="Frank is typing">
                <span />
                <span />
                <span />
              </span>
            ) : (
              <span className="swap-up mt-2 block text-[14px] leading-snug text-ink">{chat.greeting}</span>
            )}
          </button>
        </div>
      )}

      {mode === "panel" && (
        <div ref={panelRef} role="dialog" aria-label="Chat with Frank" className="rise-in w-[min(380px,calc(100vw-2rem))] overflow-hidden rounded-[20px] border border-line bg-white shadow-lift">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <FrankAvatar round decorative className="h-11 w-11 flex-none" />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-ink">Frank</p>
              <p className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2BB673]" /> AI outbound agent · online
              </p>
            </div>
            <button type="button" onClick={close} aria-label={chat.close} className="ml-auto grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-soft">
              <Close size={20} />
            </button>
          </div>
          <div className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto px-4 py-4">
            <p className="max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-soft px-3.5 py-2.5 text-[14px] text-ink-2">{chat.greeting}</p>
            {asked && <p className="ml-auto max-w-[85%] rounded-[16px] rounded-br-[4px] bg-ink px-3.5 py-2.5 text-[14px] text-white">{asked}</p>}
            <p className="max-w-[88%] rounded-[16px] rounded-bl-[4px] bg-soft px-3.5 py-2.5 text-[14px] text-ink-2">{chat.quickRepliesHeading}</p>
            <div className="flex flex-wrap gap-2 pl-1">
              {chat.quickReplies.map((q) => (
                <SmartLink key={q.href} href={q.href} onClick={() => track("chat_quick_reply", { label: q.label })} className="rounded-pill border border-ink px-3.5 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-ink hover:text-white">
                  {q.label}
                </SmartLink>
              ))}
            </div>
          </div>
          <form onSubmit={send} className="flex items-center gap-1.5 border-t border-line py-2 pl-4 pr-2">
            <label htmlFor="ask-frank" className="sr-only">
              {chat.placeholder}
            </label>
            <input id="ask-frank" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={chat.placeholder} autoComplete="off" className="h-10 min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted" />
            <SmartLink href={chat.bookMeetingHref} onClick={() => track("cta_click", { label: "chat_book_meeting" })} aria-label={chat.bookMeeting} className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line text-ink transition-colors hover:bg-soft">
              <Calendar size={16} />
            </SmartLink>
            <button type="submit" aria-label={chat.send} className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-white transition-colors hover:bg-black">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button
        ref={avatarRef}
        type="button"
        onClick={() => (mode === "panel" ? close() : open())}
        aria-label={mode === "panel" ? chat.close : chat.open}
        aria-expanded={mode === "panel"}
        className="relative grid h-16 w-16 place-items-center rounded-full border border-ink bg-white shadow-lift transition-transform duration-200 hover:-translate-y-0.5"
      >
        <FrankAvatar round decorative className="h-[56px] w-[56px]" />
        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-[#2BB673] ring-2 ring-white" />
      </button>
    </div>
  );
}
