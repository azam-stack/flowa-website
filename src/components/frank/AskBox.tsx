import { useState, type FormEvent } from "react";
import { SITE_CONFIG } from "@/config/site";
import { track } from "@/lib/analytics";
import { FrankAvatar } from "./FrankAvatar";
import { Send } from "./Icons";

const MAX = 300;
const SUGGESTIONS = ["Who writes the messages?", "Where do your leads come from?", "What if a meeting is a no-show?"];

/**
 * "Ask a question": a visitor types a question and an AI answers from
 * Flowa's approved facts only (backend/src/ask.ts). Anything outside them
 * is handed to Ahmed and Anton. Rendered only when VITE_ASK_ENDPOINT is
 * set, so the site never shows a box that cannot answer.
 */
export function AskBox({ className = "" }: { className?: string }) {
  const [q, setQ] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [handoff, setHandoff] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "error" | "limited">("idle");
  if (!SITE_CONFIG.askEndpoint) return null;

  const ask = async (text: string) => {
    const question = text.trim().slice(0, MAX);
    if (question.length < 3 || state === "loading") return;
    setAsked(question);
    setAnswer(null);
    setState("loading");
    track("ask_submit");
    try {
      const res = await fetch(SITE_CONFIG.askEndpoint as string, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      if (res.status === 429) return setState("limited");
      const data = (await res.json()) as { ok?: boolean; answer?: string; handoff?: boolean };
      if (!data.ok || !data.answer) return setState("error");
      setAnswer(data.answer);
      setHandoff(Boolean(data.handoff));
      setState("idle");
      setQ("");
    } catch {
      setState("error");
    }
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    void ask(q);
  };

  return (
    <div className={`rounded-frame border border-ink bg-surface p-5 shadow-float md:p-7 ${className}`}>
      <div className="flex items-center gap-3">
        <FrankAvatar round decorative className="h-10 w-10 flex-none" />
        <div>
          <p className="text-[17px] font-semibold text-ink">Didn't find your question?</p>
          <p className="text-[13px] text-muted">Ask it here. Answers come only from what Flowa has written down.</p>
        </div>
      </div>

      {asked && (
        <div className="mt-5 flex flex-col gap-3" aria-live="polite">
          <p className="ml-auto max-w-[85%] rounded-[16px] rounded-br-[4px] bg-ink px-4 py-2.5 text-[14px] text-white">{asked}</p>
          {state === "loading" && (
            <span className="typing w-fit rounded-[16px] rounded-bl-[4px] bg-soft px-4 py-3 text-ink" aria-label="Answering">
              <span />
              <span />
              <span />
            </span>
          )}
          {answer && (
            <div className="swap-up max-w-[90%] rounded-[16px] rounded-bl-[4px] bg-soft px-4 py-3 text-[14px] leading-relaxed text-ink-2">
              {answer}
              {handoff && (
                <a href={SITE_CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block w-fit rounded-pill bg-ink px-4 py-2 text-[13px] font-medium text-white">
                  Book a call
                </a>
              )}
            </div>
          )}
          {state === "error" && <p className="text-[14px] text-error">Something went wrong. Email info@flowa.dk and Ahmed or Anton will reply within one working day.</p>}
          {state === "limited" && <p className="text-[14px] text-muted">That's a lot of questions. Book a call and ask Ahmed and Anton directly.</p>}
        </div>
      )}

      {!asked && (
        <div className="mt-5 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => void ask(s)} className="rounded-pill border border-line bg-white px-3.5 py-2 text-[13px] text-ink-2 transition-colors hover:border-ink">
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={submit} className="mt-4 flex items-center gap-2 rounded-pill border border-ink/20 bg-white py-1.5 pl-4 pr-1.5 focus-within:border-ink">
        <label htmlFor="ask-q" className="sr-only">
          Your question
        </label>
        <input id="ask-q" value={q} maxLength={MAX} onChange={(e) => setQ(e.target.value)} placeholder="Type your question" autoComplete="off" className="h-10 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" />
        <button type="submit" disabled={state === "loading" || q.trim().length < 3} aria-label="Ask" className="grid h-10 w-10 flex-none place-items-center rounded-full bg-ink text-white transition-opacity disabled:opacity-40">
          <Send size={15} />
        </button>
      </form>
      <p className="mt-3 text-[12px] text-muted">AI answers based only on Flowa's own FAQ. Please don't include personal details. Anything specific goes to Ahmed or Anton.</p>
    </div>
  );
}
