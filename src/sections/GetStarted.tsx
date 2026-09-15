import { useState, type FormEvent } from "react";
import { Mail, Linkedin } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { Accordion } from "@/components/Accordion";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Field, TextareaField } from "@/components/Field";
import { Reveal } from "@/components/Reveal";
import { faq, finalCta, footer, team } from "@/content/site.en";
import { asset } from "@/lib/asset";

/**
 * Section 9 — "what am I unsure about, and how do I start?" FAQ on the
 * left, the request form on the right. Two ids live here: `faq` (the
 * section) and `contact` (the form), so both nav links still land.
 *
 * Sending: if VITE_FORM_ENDPOINT is set (a Formspree/Basin-style URL that
 * accepts JSON), the form POSTs there and shows a true success or a real
 * error. Without it, the browser's email client is opened with the
 * details filled in — and the page says exactly that, not "sent".
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";
type Errors = Partial<Record<"name" | "company" | "email", string>>;

function validate(form: FormData): Errors {
  const errors: Errors = {};
  if (!String(form.get("name") || "").trim()) errors.name = finalCta.errors.required;
  if (!String(form.get("company") || "").trim()) errors.company = finalCta.errors.required;
  const email = String(form.get("email") || "").trim();
  if (!email) errors.email = finalCta.errors.required;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = finalCta.errors.email;
  return errors;
}

export function GetStarted() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot: a field real visitors never fill in.
    if (String(form.get("company_website") || "").trim() !== "") {
      setStatus("sent");
      return;
    }

    const nextErrors = validate(form);
    setErrors(nextErrors);
    setAttempt((n) => n + 1);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }

    const payload = {
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
    };

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const subject = `Book a call — ${payload.company || payload.name}`;
    const body = [`Name: ${payload.name}`, `Company: ${payload.company}`, `Email: ${payload.email}`, `Phone: ${payload.phone}`, "", finalCta.fields.message, payload.message].join("\n");
    window.location.href = `mailto:${finalCta.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  return (
    <Section id="faq">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={faq.eyebrow} title={faq.h2} />
            <Reveal delay={120} variant="near" className="mt-6 md:mt-8">
              <Accordion className="stagger" items={faq.items.map((f) => ({ title: f.q, body: f.a }))} />
            </Reveal>
          </div>

          <Reveal delay={160} variant="surface" threshold={0.15} id="contact" className="scroll-mt-24">
            <Card className="p-5 sm:p-7 md:p-9">
              {status === "sent" || status === "mailto" ? (
                <div className="fade-in flex min-h-[320px] flex-col items-start justify-center" role="status">
                  <p className="text-h3 text-fg">{status === "sent" ? finalCta.successTitle : finalCta.mailtoTitle}</p>
                  <p className="mt-3 text-body text-muted">
                    {status === "sent" ? finalCta.successBody : finalCta.mailtoBody}{" "}
                    <a href={`mailto:${finalCta.email}`} className="font-medium text-fg underline underline-offset-4">
                      {finalCta.email}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-eyebrow text-muted">{finalCta.eyebrow}</p>
                  <h2 className="mt-2 text-h3 text-fg sm:text-[26px]">{finalCta.h2}</h2>
                  <p className="mt-2 text-body text-muted">{finalCta.body}</p>

                  <form onSubmit={handleSubmit} noValidate className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-7 md:gap-5">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company_website">Company website</label>
                      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <Field id="name" name="name" label={finalCta.fields.name} autoComplete="name" error={errors.name} attempt={attempt} />
                    <Field id="company" name="company" label={finalCta.fields.company} autoComplete="organization" error={errors.company} attempt={attempt} />
                    <Field id="email" name="email" type="email" label={finalCta.fields.email} autoComplete="email" inputMode="email" placeholder="you@company.com" error={errors.email} attempt={attempt} />
                    <Field id="phone" name="phone" type="tel" label={finalCta.fields.phone} autoComplete="tel" inputMode="tel" />
                    <TextareaField id="message" name="message" rows={4} label={finalCta.fields.message} placeholder={finalCta.fields.messagePlaceholder} className="sm:col-span-2" />

                    {status === "error" && (
                      <p role="alert" className="fade-in rounded-field border border-error/40 bg-error/[0.06] px-4 py-3 text-small text-fg sm:col-span-2">
                        {finalCta.errors.network}{" "}
                        <a href={`mailto:${finalCta.email}`} className="font-medium underline underline-offset-4">
                          {finalCta.email}
                        </a>
                        .
                      </p>
                    )}

                    <div className="sm:col-span-2">
                      <Button type="submit" variant="accent" size="lg" magnetic className="w-full" loading={status === "sending"}>
                        {status === "sending" ? finalCta.sending : finalCta.submit}
                      </Button>
                      <p className="mt-3 text-[13px] text-muted">{finalCta.privacy}</p>
                    </div>
                  </form>
                </>
              )}

              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 md:mt-8 md:gap-4 md:pt-6">
                <div className="flex items-center gap-3.5">
                  <picture>
                    <source srcSet={`${asset(team.ahmed.photoBase)}.avif`} type="image/avif" />
                    <source srcSet={`${asset(team.ahmed.photoBase)}.webp`} type="image/webp" />
                    <img src={`${asset(team.ahmed.photoBase)}.jpg`} alt={`${team.ahmed.firstName}, ${team.ahmed.role}`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover grayscale" />
                  </picture>
                  <p className="text-small font-medium text-fg">{finalCta.responsePromise}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a href={`mailto:${finalCta.email}`} className="flex items-center gap-2 text-small font-medium text-fg hover:text-accent-hover">
                    <Mail size={16} className="text-muted" aria-hidden="true" />
                    {finalCta.email}
                  </a>
                  {footer.linkedinUrl && (
                    <a href={footer.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-small font-medium text-fg hover:text-accent-hover">
                      <Linkedin size={16} className="text-muted" aria-hidden="true" />
                      {finalCta.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
