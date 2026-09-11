import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

const TIERS = [
  { name: "Bronze", price: "1.500", note: "Til jer der vil i gang" },
  { name: "Sølv", price: "1.400", note: "Til et stabilt flow af møder", popular: false },
  { name: "Guld", price: "1.200", note: "Vores mest valgte pakke", popular: true },
  { name: "Platin", price: "1.000", note: "Til høj og vedvarende volumen" },
];

const INCLUDED = ["Strategi og ICP-definition", "Målrettet research", "Direkte outreach", "Kvalificering efter jeres kriterier", "Møder direkte i kalenderen"];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>Priser</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            Pris pr. kvalificeret møde
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
            Ingen fast pris pr. lead eller aktivitet — I betaler udelukkende for møder, der lever op til de kriterier,
            vi aftaler sammen. Prisen falder med volumen.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                  tier.popular ? "border-fg bg-fg text-bg" : "border-border bg-card text-fg"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-fg">
                    Mest valgt
                  </span>
                )}
                <p className={`text-sm font-semibold ${tier.popular ? "text-bg/70" : "text-muted"}`}>{tier.name}</p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight">
                  {tier.price} <span className="text-base font-medium">kr.</span>
                </p>
                <p className={`mt-1 text-sm ${tier.popular ? "text-bg/60" : "text-muted"}`}>pr. kvalificeret møde</p>
                <p className={`mt-5 text-[14px] leading-relaxed ${tier.popular ? "text-bg/70" : "text-muted"}`}>{tier.note}</p>
                <LinkButton
                  href="#kontakt"
                  variant={tier.popular ? "accent" : "ghost"}
                  className={`mt-7 w-full ${tier.popular ? "" : ""}`}
                >
                  Book et kald
                </LinkButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-sm font-semibold text-fg">Alle pakker inkluderer</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              {INCLUDED.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-muted">
                  <Check size={15} className="text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
