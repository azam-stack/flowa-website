import { useRef, useState, type FormEvent } from "react";
import { SmartLink } from "@/components/SmartLink";
import { shortForm as t } from "@/content/frank/form";
import { track } from "@/lib/analytics";
import { leadDedupeKey, type LeadErrors } from "@/lib/lead-schema";
import { buildLead, submitLead, type SubmitResult } from "@/lib/leads";
import { Btn } from "./Btn";
import { FrankAvatar } from "./FrankAvatar";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const MIN_FILL_MS = 1500;
const DEDUPE_STORAGE = "flowa:lead-sent";

/**
 * A short, non-reversible fingerprint of the dedupe key, so no readable
 * email address is left in session storage. Two FNV-1a accumulators give
 * a 64-bit hex digest: not cryptography, but past the collision risk
 * that matters for at most ten entries.
 */
function fingerprint(value: string): string {
  let a = 0x811c9dc5;
  let b = 0x01000193;
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ (c + i), 0x85ebca6b) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The contact form (brief §4.10): first name, work email, "What would you
 * like to discuss?", a consent checkbox, "Get in touch". Honeypot, a
 * minimum time on form and a session fingerprint stop bots and double
 * sends. Success shows Frank's thumbs-up and the promised reply time.
 * Without a draft endpoint it opens the visitor's email client and says
 * so; it never pretends something was sent.
 */
export function ShortForm({ idPrefix = "contact" }: { idPrefix?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [failure, setFailure] = useState<Extract<SubmitResult, { status: "error" }> | null>(null);
  const [fields, setFields] = useState({ first_name: "", email: "", message: "", consent: false });
  const started = useRef<number | null>(null);
  const inFlight = useRef(false);
  const id = (f: string) => `${idPrefix}-${f}`;

  const set = (k: keyof typeof fields, v: string | boolean) => {
    if (started.current === null) {
      started.current = Date.now();
      track("form_start", { kind: "contact" });
    }
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k as keyof LeadErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): LeadErrors => {
    const e: LeadErrors = {};
    if (!fields.first_name.trim()) e.first_name = "required";
    if (!fields.email.trim()) e.email = "required";
    else if (!EMAIL.test(fields.email.trim())) e.email = "email";
    if (!fields.message.trim()) e.message = "required";
    if (!fields.consent) e.consent = "required";
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (inFlight.current) return;
    const form = ev.currentTarget;
    const honey = (form.elements.namedItem("company_website_confirm") as HTMLInputElement | null)?.value;
    if (honey) {
      setStatus("sent");
      return;
    }
    if (started.current !== null && Date.now() - started.current < MIN_FILL_MS) return;
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      (form.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus();
      return;
    }
    const lead = buildLead({ kind: "contact", ...fields, consent: true });
    let sentKeys: string[] = [];
    try {
      sentKeys = JSON.parse(sessionStorage.getItem(DEDUPE_STORAGE) || "[]") as string[];
    } catch {
      /* storage blocked: a repeat send is the only cost */
    }
    const key = fingerprint(leadDedupeKey(lead));
    if (sentKeys.includes(key)) {
      setStatus("sent");
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    const result = await submitLead(lead);
    inFlight.current = false;
    if (result.status === "invalid") {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }
    if (result.status === "error") {
      setFailure(result);
      setStatus("error");
      return;
    }
    if (result.status === "sent") {
      try {
        sessionStorage.setItem(DEDUPE_STORAGE, JSON.stringify([...sentKeys, key].slice(-10)));
      } catch {
        /* storage blocked */
      }
    }
    setStatus(result.status);
  };

  if (status === "sent" || status === "mailto") {
    return (
      <div className="fade-in flex flex-col items-center gap-5 text-center" role="status" aria-live="polite">
        <FrankAvatar pose="thumbs" className="h-36 w-36 rounded-card" />
        <p className="text-[20px] font-medium leading-snug text-ink">{status === "sent" ? t.successTitle : t.mailtoTitle}</p>
        {status === "mailto" && (
          <p className="text-body text-ink-2">
            {t.mailtoBody}{" "}
            <a href={`mailto:${t.address}`} className="font-medium text-brand-deep underline underline-offset-4">
              {t.address}
            </a>
            .
          </p>
        )}
      </div>
    );
  }

  const msg = (code?: string) => (code === "email" ? t.errors.email : code === "required" ? t.errors.required : code ? t.errors.required : undefined);
  const describe = (f: keyof LeadErrors) => (errors[f] ? id(`${f}-error`) : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4" aria-describedby={Object.keys(errors).length ? id("summary") : undefined}>
      {Object.keys(errors).length > 0 && (
        <p id={id("summary")} role="alert" className="text-[14px] font-medium text-error">
          {t.errors.summary}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id("first_name")} className="mb-1.5 block text-[14px] font-medium text-ink">
            {t.firstName} <span aria-hidden="true">*</span>
          </label>
          <input id={id("first_name")} name="first_name" autoComplete="given-name" required value={fields.first_name} onChange={(e) => set("first_name", e.target.value)} aria-invalid={errors.first_name ? true : undefined} aria-describedby={describe("first_name")} className="control h-12" />
          {errors.first_name && (
            <p id={id("first_name-error")} className="mt-1.5 text-[13px] font-medium text-error">
              {msg(errors.first_name)}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={id("email")} className="mb-1.5 block text-[14px] font-medium text-ink">
            {t.email} <span aria-hidden="true">*</span>
          </label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required value={fields.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describe("email")} className="control h-12" />
          {errors.email && (
            <p id={id("email-error")} className="mt-1.5 text-[13px] font-medium text-error">
              {msg(errors.email)}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor={id("message")} className="mb-1.5 block text-[14px] font-medium text-ink">
          {t.message} <span aria-hidden="true">*</span>
        </label>
        <textarea id={id("message")} name="message" rows={4} required value={fields.message} onChange={(e) => set("message", e.target.value)} placeholder={t.messagePlaceholder} aria-invalid={errors.message ? true : undefined} aria-describedby={describe("message")} className="control resize-none py-3" />
        {errors.message && (
          <p id={id("message-error")} className="mt-1.5 text-[13px] font-medium text-error">
            {msg(errors.message)}
          </p>
        )}
      </div>
      {/* honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={id("company_website_confirm")}>Leave this empty</label>
        <input id={id("company_website_confirm")} name="company_website_confirm" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor={id("consent")} className="flex items-start gap-3 text-[14px] leading-snug text-ink-2">
          <input id={id("consent")} name="consent" type="checkbox" required checked={fields.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={describe("consent")} className="checkbox mt-0.5" />
          <span>
            {t.consentBefore}
            <SmartLink href={t.consentHref} className="font-medium text-brand-deep underline underline-offset-4">
              {t.consentLink}
            </SmartLink>
            {t.consentAfter}
          </span>
        </label>
        {errors.consent && (
          <p id={id("consent-error")} className="mt-1.5 text-[13px] font-medium text-error">
            {t.errors.consent}
          </p>
        )}
      </div>
      {status === "error" && failure && (
        <p role="alert" className="text-[14px] text-error">
          {t.errors.network}{" "}
          <a href={`mailto:${t.address}`} className="font-medium underline underline-offset-4">
            {t.address}
          </a>
          .
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Btn type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? t.sending : status === "error" && failure?.retryable ? t.retry : t.submit}
        </Btn>
      </div>
    </form>
  );
}
