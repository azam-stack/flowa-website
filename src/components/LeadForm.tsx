import { useRef, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { Field, SelectField, TextareaField } from "./Field";
import { leadForm, finalCta } from "@/content/site.en";
import { COMPANY_SIZES, TIMINGS, leadDedupeKey, type LeadErrorCode, type LeadErrors, type LeadField } from "@/lib/lead-schema";
import { buildLead, submitLead, type SubmitResult } from "@/lib/leads";
import { track } from "@/lib/analytics";

/**
 * The one lead form. Every call-to-action form on the site is this
 * component: same fields, same validation (shared with the backend),
 * same states. It never pretends: with an endpoint it shows the real
 * outcome, including timeouts and rate limits; without one it opens the
 * visitor's email client and says so.
 *
 * Spam and duplicates: a honeypot field, a minimum time-on-form, the
 * submit button disabled while sending, and the last successful
 * submission's key remembered for the session so a second identical
 * submit is acknowledged instead of re-sent.
 */
type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const FIELD_ORDER: LeadField[] = ["firstName", "lastName", "email", "phone", "company", "jobTitle", "companySize", "industry", "website", "goal", "preferredTiming"];
const MIN_FILL_MS = 1500;
const DEDUPE_STORAGE = "flowa:lead-sent";

function message(code: LeadErrorCode): string {
  return leadForm.errors[code] ?? leadForm.errors.required;
}

export function LeadForm({ service, compact = false }: { service?: string; compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [failure, setFailure] = useState<Extract<SubmitResult, { status: "error" }> | null>(null);
  const [duplicate, setDuplicate] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const started = useRef<number | null>(null);
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onFirstInteraction() {
    if (started.current !== null) return;
    started.current = Date.now();
    track("form_start", { service });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = new FormData(e.currentTarget);
    const fields = Object.fromEntries(form.entries()) as Record<string, string>;

    // Honeypot and speed check: bots fill hidden fields and submit instantly. A human is told nothing.
    if (fields.company_website_confirm?.trim()) {
      setStatus("sent");
      return;
    }
    if (started.current !== null && Date.now() - started.current < MIN_FILL_MS) {
      setStatus("sent");
      return;
    }

    const lead = buildLead(fields, service);
    setAttempt((n) => n + 1);

    let sentKeys: string[] = [];
    try {
      sentKeys = JSON.parse(sessionStorage.getItem(DEDUPE_STORAGE) || "[]") as string[];
    } catch {
      sentKeys = [];
    }
    const key = leadDedupeKey(lead);
    if (sentKeys.includes(key)) {
      setDuplicate(true);
      setErrors({});
      setStatus("sent");
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    setFailure(null);
    const result = await submitLead(lead);
    inFlight.current = false;

    if (result.status === "invalid") {
      setErrors(result.errors);
      setStatus("idle");
      const first = FIELD_ORDER.find((f) => result.errors[f]);
      if (first) document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    if (result.status === "error") {
      setFailure(result);
      setStatus("error");
      return;
    }
    setErrors({});
    try {
      sessionStorage.setItem(DEDUPE_STORAGE, JSON.stringify([...sentKeys, key].slice(-10)));
    } catch {
      /* storage may be unavailable */
    }
    setStatus(result.status);
  }

  if (status === "sent" || status === "mailto") {
    const sent = status === "sent";
    return (
      <div className="fade-in flex min-h-[280px] flex-col items-start justify-center" role="status" aria-live="polite">
        <p className="text-h3 text-fg">{sent ? (duplicate ? leadForm.errors.duplicate : leadForm.successTitle) : leadForm.mailtoTitle}</p>
        <p className="mt-3 text-body text-muted">
          {sent ? leadForm.successBody : leadForm.mailtoBody}{" "}
          <a href={`mailto:${finalCta.email}`} className="font-medium text-fg underline underline-offset-4">
            {finalCta.email}
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-6 text-small font-semibold text-fg underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            setDuplicate(false);
            started.current = null;
          }}
        >
          {leadForm.sendAnother}
        </button>
      </div>
    );
  }

  const f = leadForm.fields;
  const opt = (label: string) => `${label} (${f.optional})`;
  const err = (k: LeadField) => (errors[k] ? message(errors[k] as LeadErrorCode) : undefined);
  const gap = compact ? "gap-3.5 md:gap-4" : "gap-4 md:gap-5";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={`grid grid-cols-1 sm:grid-cols-2 ${gap}`} onFocus={onFirstInteraction} onInput={onFirstInteraction} aria-describedby={Object.keys(errors).length ? "lead-summary" : undefined}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-company_website_confirm">Confirm website</label>
        <input id="lead-company_website_confirm" name="company_website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="lead-firstName" name="firstName" label={f.firstName} autoComplete="given-name" required error={err("firstName")} attempt={attempt} />
      <Field id="lead-lastName" name="lastName" label={f.lastName} autoComplete="family-name" required error={err("lastName")} attempt={attempt} />
      <Field id="lead-email" name="email" type="email" label={f.email} autoComplete="email" inputMode="email" placeholder="you@company.com" required error={err("email")} attempt={attempt} />
      <Field id="lead-phone" name="phone" type="tel" label={opt(f.phone)} autoComplete="tel" inputMode="tel" error={err("phone")} attempt={attempt} />
      <Field id="lead-company" name="company" label={f.company} autoComplete="organization" required error={err("company")} attempt={attempt} />
      <Field id="lead-jobTitle" name="jobTitle" label={opt(f.jobTitle)} autoComplete="organization-title" error={err("jobTitle")} attempt={attempt} />
      <SelectField id="lead-companySize" name="companySize" label={opt(f.companySize)} options={COMPANY_SIZES} placeholder={f.select} error={err("companySize")} attempt={attempt} />
      <Field id="lead-industry" name="industry" label={opt(f.industry)} error={err("industry")} attempt={attempt} />
      <Field id="lead-website" name="website" type="url" label={opt(f.website)} autoComplete="url" inputMode="url" placeholder="company.com" error={err("website")} attempt={attempt} />
      <SelectField id="lead-preferredTiming" name="preferredTiming" label={opt(f.preferredTiming)} options={TIMINGS} placeholder={f.select} error={err("preferredTiming")} attempt={attempt} />
      <TextareaField id="lead-goal" name="goal" rows={compact ? 3 : 4} label={opt(f.goal)} placeholder={f.goalPlaceholder} className="sm:col-span-2" error={err("goal")} attempt={attempt} />

      {Object.keys(errors).length > 0 && (
        <p id="lead-summary" className="sr-only" role="alert">
          {leadForm.errors.summary}
        </p>
      )}

      {status === "error" && failure && (
        <div role="alert" className="fade-in rounded-field border border-error/40 bg-error/[0.06] px-4 py-3 text-small text-fg sm:col-span-2">
          <p>
            {failure.reason === "network" && leadForm.errors.network}
            {failure.reason === "timeout" && leadForm.errors.timeout}
            {failure.reason === "server" && leadForm.errors.server}
            {failure.reason === "rate-limited" && leadForm.errors.rateLimited}{" "}
            <a href={`mailto:${finalCta.email}`} className="font-medium underline underline-offset-4">
              {finalCta.email}
            </a>
            .
          </p>
          {failure.retryable && (
            <button type="button" className="mt-2 text-small font-semibold text-fg underline underline-offset-4" onClick={() => formRef.current?.requestSubmit()}>
              {leadForm.retry}
            </button>
          )}
        </div>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" variant="accent" size="lg" magnetic className="w-full" loading={status === "sending"}>
          {status === "sending" ? leadForm.sending : leadForm.submit}
        </Button>
        <p className="mt-3 text-[13px] text-muted">{leadForm.privacy}</p>
      </div>
    </form>
  );
}
