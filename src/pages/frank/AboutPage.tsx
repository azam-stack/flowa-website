import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { Check } from "@/components/frank/Icons";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { Sphere } from "@/components/frank/Sphere";
import { Reveal } from "@/components/Reveal";
import { aboutPage as t } from "@/content/frank/pages";
import { asset } from "@/lib/asset";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/**
 * /about: "The people behind Frank". The portraits are the founders' own
 * photos, already published on the live site.
 */
export function AboutPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/about", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} />
      <Section>
        <Container>
          <Reveal stagger as="ul" className="grid gap-6 md:grid-cols-2">
            {t.people.map((p) => {
              const slug = p.slug;
              return (
                <li key={p.name} className="framed grid gap-6 p-5 sm:grid-cols-[180px_1fr] md:p-7">
                  <div className="aspect-[4/5] overflow-hidden rounded-card bg-panel">
                    <picture>
                      <source srcSet={asset(`images/team/${slug}.avif`)} type="image/avif" />
                      <source srcSet={asset(`images/team/${slug}.webp`)} type="image/webp" />
                      <img src={asset(`images/team/${slug}.jpg`)} alt={`${p.name}, ${p.role} of Flowa`} loading="lazy" width={600} height={750} className="relative z-[1] h-full w-full object-cover grayscale" />
                    </picture>
                  </div>
                  <div>
                    <h2 className="text-h3 text-ink">{p.name}</h2>
                    <p className="text-[15px] text-muted">{p.role}</p>
                    <ul className="mt-4 flex flex-col gap-2">
                      {p.owns.map((o) => (
                        <li key={o} className="flex items-center gap-2.5 text-body text-ink-2">
                          <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-brand text-ink">
                            <Check size={12} />
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </Reveal>

          <Reveal delay={80} className="relative mt-12 md:mt-16">
            <Sphere size={72} tint={1} mark className="absolute -right-3 -top-8 hidden md:block" rotate={14} />
            <figure className="framed px-7 py-10 md:px-12 md:py-14">
              <blockquote className="max-w-3xl text-[24px] font-light leading-snug text-ink md:text-[30px]">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-[15px] text-ink-2">
                <span className="font-semibold text-ink">{t.quoteName}</span>, {t.quoteRole}
              </figcaption>
            </figure>
            <p className="mt-6 text-[20px] font-medium text-ink">{t.limited}</p>
          </Reveal>
        </Container>
      </Section>
      <ContactBand idPrefix="about" />
    </>
  );
}
