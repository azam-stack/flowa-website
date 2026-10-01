import { useEffect, useId, useRef, useState } from "react";
import { SmartLink } from "@/components/SmartLink";
import { SITE_CONFIG } from "@/config/site";
import { pricing as t } from "@/content/frank/pricing";
import { track } from "@/lib/analytics";
import { COMPANY_TYPES, GOALS, TEAM_SIZES, isFreeEmailDomain } from "@/lib/lead-schema";
import { buildLead, submitLead } from "@/lib/leads";
import { Btn } from "./Btn";
import { FrankAvatar } from "./FrankAvatar";
import { Check, Sparkle } from "./Icons";
import { Sphere } from "./Sphere";

type Step = 1 | 2 | 3 | 4;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AUTO_ADVANCE_MS = 250;

function emailProblem(value: string): "invalid" | "free" | null {
  const v = value.trim();
  if (!EMAIL.test(v)) return "invalid";
  if (isFreeEmailDomain(v)) return "free";
  return null;
}

/** "✓ Step 1 › Step 2 › Step 3 › Step 4": done steps get a filled check, the current is ink, the rest muted. */
function StepIndicator({ step }: { step: Step }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]" aria-label="Progress">
      {([1, 2, 3, 4] as Step[]).map((n, i) => {
        const done = n < step;
        const current = n === step;
        return (
          <li key={n} className="flex items-center gap-2" aria-current={current ? "step" : undefined}>
            {i > 0 && <span className="text-muted" aria-hidden="true">›</span>}
            <span className={`flex items-center gap-1.5 ${current ? "font-semibold text-ink" : done ? "text-ink" : "text-muted"}`}>
              {done && (
                <span className="check-pop grid h-4 w-4 place-items-center rounded-full bg-ink text-white">
                  <Check size={10} />
                </span>
              )}
              <span>
                {done && <span className="sr-only">Completed: </span>}
                {t.right.stepLabel} {n}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** 2×2 tile buttons: white with a 1px ink border, filled brand with ink text when selected. Minimum 56px tall on mobile, ~100px on desktop. */
function Tiles({ name, options, value, onPick }: { name: string; options: readonly string[]; value: string | null; onPick: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={name} className="grid grid-cols-2 gap-3">
      {options.map((o) => {
        const selected = value === o;
        return (
          <button key={o} type="button" role="radio" aria-checked={selected} onClick={() => onPick(o)} className={`press min-h-[56px] rounded-control border border-ink px-3 py-3 text-center text-[15px] font-medium leading-snug transition-[background-color,transform,box-shadow] duration-150 md:min-h-[100px] ${selected ? "bg-panel text-ink shadow-[inset_0_0_0_1px_#0C0C0B]" : "bg-white text-ink hover:-translate-y-0.5 hover:bg-soft"}`}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

/**
 * The quote quiz (brief §6): four steps, no prices. Single-select tiles
 * auto-advance after 250ms (a Continue button is there too); the
 * multi-select step uses checkboxes with Previous and Next; the last
 * step takes a work email (format checked, free mailboxes rejected with
 * "Please use your work email") and a required consent. "Get my quote"
 * stays disabled until both are valid. Every answer is sent together
 * with submitted_at, page_url and UTM; quiz_step_1..4 and quiz_submit
 * are tracked. Success swaps the card for Frank's thumbs-up.
 */
export function PricingQuiz() {
  const [step, setStep] = useState<Step>(1);
  const [companyType, setCompanyType] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const firstRender = useRef(true);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  // Keep keyboard and screen-reader users oriented: focus the new step's question.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const complete = (n: Step) => track(`quiz_step_${n}` as "quiz_step_1");

  const advanceFrom = (n: Step) => {
    complete(n);
    setStep((n + 1) as Step);
  };

  const pickTile = (n: 1 | 2, value: string) => {
    (n === 1 ? setCompanyType : setTeamSize)(value);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => advanceFrom(n), AUTO_ADVANCE_MS);
  };

  const toggleGoal = (g: string) => setGoals((gs) => (gs.includes(g) ? gs.filter((x) => x !== g) : [...gs, g]));

  const problem = emailProblem(email);
  const canSubmit = !problem && consent && status !== "sending";

  const submit = async () => {
    if (!canSubmit || !companyType || !teamSize) return;
    setStatus("sending");
    const lead = buildLead({ kind: "quote", company_type: companyType, team_size: teamSize, goals, email: email.trim(), consent: true });
    const result = await submitLead(lead);
    if (result.status === "sent" || result.status === "mailto") {
      complete(4);
      track("quiz_submit", { delivery: result.status });
      setStatus(result.status);
      return;
    }
    setStatus("error");
  };

  const stepTitle = { 1: t.steps.company.question, 2: t.steps.team.question, 3: t.steps.goals.question, 4: `${t.steps.email.question}*` }[step];

  if (status === "sent" || status === "mailto") {
    return (
      <div className="fade-in flex flex-col items-center gap-5 py-4 text-center" role="status" aria-live="polite">
        <FrankAvatar pose="thumbs" className="h-40 w-40 rounded-card" />
        <h2 className="text-h3 text-ink">{status === "sent" ? t.success.h3 : t.success.mailtoTitle}</h2>
        <p className="max-w-sm text-body text-ink-2">
          {status === "sent" ? (
            <>
              {t.success.bodyBefore}
              <strong className="font-semibold text-ink">{email.trim()}</strong>
              {t.success.bodyAfter}
            </>
          ) : (
            <>
              {t.success.mailtoBody}{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-brand-deep underline underline-offset-4">
                {SITE_CONFIG.email}
              </a>
              .
            </>
          )}
        </p>
        <SmartLink href={t.success.soonerHref} className="text-[15px] font-medium text-brand-deep underline underline-offset-4">
          {t.success.sooner}
        </SmartLink>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator step={step} />
      <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-[22px] font-semibold leading-snug text-ink outline-none md:text-[24px]">
        {stepTitle}
      </h2>

      {step === 1 && (
        <div className="swap-in mt-5">
          <Tiles name={t.steps.company.question} options={COMPANY_TYPES} value={companyType} onPick={(v) => pickTile(1, v)} />
          <div className="mt-5 flex justify-end">
            <Btn disabled={!companyType} onClick={() => advanceFrom(1)}>
              {t.right.continueLabel}
            </Btn>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="swap-in mt-5">
          <Tiles name={t.steps.team.question} options={TEAM_SIZES} value={teamSize} onPick={(v) => pickTile(2, v)} />
          <div className="mt-5 flex justify-between gap-3">
            <Btn variant="outline" onClick={() => setStep(1)}>
              {t.right.previous}
            </Btn>
            <Btn disabled={!teamSize} onClick={() => advanceFrom(2)}>
              {t.right.continueLabel}
            </Btn>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="swap-in mt-5">
          <p className="text-[14px] text-muted" id={`${id}-goals-hint`}>
            {t.steps.goals.hint}
          </p>
          <div role="group" aria-labelledby={`${id}-goals-hint`} className="mt-3 flex flex-col gap-2">
            {GOALS.map((g) => {
              const checked = goals.includes(g);
              return (
                <label key={g} className={`flex min-h-[52px] cursor-pointer items-center gap-3 rounded-control border px-4 py-3 text-[15px] font-medium transition-colors ${checked ? "border-ink bg-panel text-ink" : "border-ink bg-white text-ink hover:bg-soft"}`}>
                  <input type="checkbox" className="checkbox" checked={checked} onChange={() => toggleGoal(g)} />
                  {g}
                </label>
              );
            })}
          </div>
          <div className="mt-5 flex justify-between gap-3">
            <Btn variant="outline" onClick={() => setStep(2)}>
              {t.right.previous}
            </Btn>
            <Btn disabled={goals.length === 0} onClick={() => advanceFrom(3)}>
              {t.right.next}
            </Btn>
          </div>
        </div>
      )}

      {step === 4 && (
        <form
          className="swap-in mt-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setEmailTouched(true);
            void submit();
          }}
        >
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-[14px] font-medium text-ink">
            {t.steps.email.label} <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            placeholder={t.steps.email.placeholder}
            aria-invalid={emailTouched && problem ? true : undefined}
            aria-describedby={emailTouched && problem ? `${id}-email-hint` : undefined}
            className="control h-12"
          />
          {emailTouched && problem && (
            <p id={`${id}-email-hint`} className="mt-1.5 text-[13px] font-medium text-error">
              {problem === "free" ? t.steps.email.freeDomain : t.steps.email.invalid}
            </p>
          )}
          <label htmlFor={`${id}-consent`} className="mt-4 flex items-start gap-3 text-[14px] leading-snug text-ink-2">
            <input id={`${id}-consent`} type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="checkbox mt-0.5" />
            <span>
              {t.steps.email.consentBefore}
              <SmartLink href={t.steps.email.consentHref} className="font-medium text-brand-deep underline underline-offset-4">
                {t.steps.email.consentLink}
              </SmartLink>
              {t.steps.email.consentAfter}
            </span>
          </label>
          {status === "error" && (
            <p role="alert" className="mt-3 text-[14px] text-error">
              {t.success.error}{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium underline underline-offset-4">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          )}
          <div className="mt-5 flex justify-between gap-3">
            <Btn variant="outline" onClick={() => setStep(3)}>
              {t.right.previous}
            </Btn>
            <Btn type="submit" disabled={!canSubmit}>
              {status === "sending" ? t.success.sending : status === "error" ? t.success.retry : t.right.submit}
            </Btn>
          </div>
        </form>
      )}
    </div>
  );
}

/** The whole pricing card: left white half with the H1, bullets and proof badge; right apricot half with the quiz. */
export function PricingCard() {
  return (
    <div id="quote" className="framed grid overflow-hidden lg:grid-cols-2">
      <div className="relative overflow-hidden px-6 py-10 md:px-12 md:py-14">
        <Sphere size={220} tint={1} outline className="pointer-events-none absolute -bottom-20 -left-16 opacity-[0.07]" bob={false} rotate={-18} />
        <h1 className="text-h1 text-ink">
          {t.left.h1Light}
          <span className="font-semibold">{t.left.h1Bold}</span>
        </h1>
        <p className="mt-5 text-sub text-ink-2">{t.left.sub}</p>
        <ul className="mt-8 flex flex-col gap-3">
          {t.left.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-[17px] text-ink">
              <Sparkle size={18} className="flex-none text-ink" />
              {b}
            </li>
          ))}
        </ul>
        <div className="relative mt-12 flex items-center gap-4 lg:mt-24">
          <div className="flex -space-x-2" aria-hidden="true">
            <Sphere size={34} tint={4} mark bob={false} rotate={-10} />
            <Sphere size={34} tint={2} bob={false} rotate={14} />
            <Sphere size={34} tint={1} mark bob={false} rotate={-4} />
          </div>
          <p className="text-[17px] font-semibold text-ink">{t.left.badge}</p>
        </div>
      </div>
      <div className="bg-soft px-5 py-8 md:px-10 md:py-12 lg:border-l lg:border-ink">
        <p className="text-[15px] font-medium text-ink">{t.right.heading}</p>
        <div className="mt-4 rounded-card bg-white p-5 shadow-lift md:p-7">
          <PricingQuiz />
        </div>
      </div>
    </div>
  );
}
