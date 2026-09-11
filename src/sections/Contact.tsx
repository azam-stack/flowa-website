import { useState, type FormEvent } from "react";
import { Mail, Linkedin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

const CONTACT_EMAIL = "flowameetings@gmail.com";
const inputCls =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-muted/70 transition-colors focus-visible:border-accent";
const labelCls = "mb-1.5 block text-sm font-medium text-fg";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "");
    const company = String(form.get("company") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");

    const subject = `Book et kald — ${company || name}`;
    const body = [`Navn: ${name}`, `Virksomhed: ${company}`, `Email: ${email}`, `Telefon: ${phone}`, "", "Hvad har I brug for hjælp til?", message].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="kontakt" className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal>
            <SectionLabel>Kontakt</SectionLabel>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">Book et kald</h2>
            <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-muted">
              Udfyld formularen, så vender vi tilbage hurtigst muligt for at finde et tidspunkt, der passer.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[15px] font-medium text-fg hover:text-accent">
                <Mail size={18} className="text-muted" />
                {CONTACT_EMAIL}
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[15px] font-medium text-fg hover:text-accent"
              >
                <Linkedin size={18} className="text-muted" />
                Flowa på LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-7 md:p-9">
              {sent ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <p className="text-xl font-bold text-fg">Din mailklient åbner nu</p>
                  <p className="mt-2 max-w-xs text-[15px] text-muted">
                    Kunne den ikke åbne automatisk, så skriv til os direkte på {CONTACT_EMAIL}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelCls}>Navn</label>
                    <input id="name" name="name" required className={inputCls} placeholder="Dit navn" />
                  </div>
                  <div>
                    <label htmlFor="company" className={labelCls}>Virksomhed</label>
                    <input id="company" name="company" required className={inputCls} placeholder="Virksomhedsnavn" />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input id="email" name="email" type="email" required className={inputCls} placeholder="dig@virksomhed.dk" />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelCls}>Telefon</label>
                    <input id="phone" name="phone" type="tel" className={inputCls} placeholder="Valgfrit" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelCls}>Hvad har I brug for hjælp til?</label>
                    <textarea id="message" name="message" rows={4} className={`${inputCls} resize-none`} placeholder="Fortæl kort om jeres mål og målgruppe" />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" variant="accent" className="w-full">
                      Send og book et kald
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
