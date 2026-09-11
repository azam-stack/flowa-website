import { useState, type FormEvent } from "react";
import { Mail, Linkedin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/content/site.en";

const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-colors focus-visible:border-accent";
const labelCls = "mb-1.5 block text-sm font-medium text-fg";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot: a field real visitors never fill in. Bots that auto-fill
    // every input trip it and we silently drop the submission.
    if (String(form.get("company_website") || "").trim() !== "") {
      setSent(true);
      return;
    }

    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");

    const subject = `Book a call — ${company || name}`;
    const body = [`Name: ${name}`, `Company: ${company}`, `Email: ${email}`, `Phone: ${phone}`, "", "What can we help you with?", message].join("\n");

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal>
            <SectionLabel>{contact.eyebrow}</SectionLabel>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{contact.h2}</h2>
            <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-muted">{contact.body}</p>

            <div className="mt-10 flex flex-col gap-4">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[15px] font-medium text-fg hover:text-accent">
                <Mail size={18} className="text-muted" />
                {contact.email}
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[15px] font-medium text-fg hover:text-accent"
              >
                <Linkedin size={18} className="text-muted" />
                {contact.linkedin}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-7 md:p-9">
              {sent ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <p className="text-xl font-bold text-fg">{contact.successTitle}</p>
                  <p className="mt-2 max-w-xs text-[15px] text-muted">
                    {contact.successBody} {contact.email}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Honeypot — hidden from real users, visible to naive bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company_website">Company website</label>
                    <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div>
                    <label htmlFor="name" className={labelCls}>{contact.fields.name}</label>
                    <input id="name" name="name" required className={inputCls} placeholder={contact.fields.name} />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelCls}>{contact.fields.company}</label>
                    <input id="company" name="company" required className={inputCls} placeholder={contact.fields.company} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>{contact.fields.email}</label>
                    <input id="email" name="email" type="email" required className={inputCls} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelCls}>{contact.fields.phone}</label>
                    <input id="phone" name="phone" type="tel" className={inputCls} placeholder="Optional" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelCls}>{contact.fields.message}</label>
                    <textarea id="message" name="message" rows={4} className={`${inputCls} resize-none`} placeholder={contact.fields.messagePlaceholder} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="accent" className="w-full">
                      {contact.submit}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
