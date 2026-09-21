import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { legalCommon, legalDocs, legalEntity, legalUpdated, type LegalBlock, type LegalDoc } from "@/content/legal";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";

/**
 * One template for every legal page: privacy, cookies, terms and
 * refunds. A single readable column, real headings so the document can
 * be scanned and linked, the controller's details, and links across to
 * the other three.
 *
 * The business-details block prints only the rows that exist. While the
 * owner's name, CVR number and address are null in `legal.ts` they are
 * simply absent, so the page never publishes a placeholder or a guess.
 */
function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "p") return <p className="mt-4 text-body text-muted">{block.text}</p>;
  if (block.kind === "list")
    return (
      <ul className="mt-4 flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 text-body text-muted">
            <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-body">
        <thead>
          <tr className="border-b border-border">
            {block.head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-6 text-small font-semibold text-fg">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-border">
              {row.map((cell) => (
                <td key={cell} className="py-2 pr-6 text-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BusinessDetails() {
  const e = legalEntity;
  const rows: { label: string; value: string | string[] }[] = [
    { label: "Trading name", value: e.tradingName },
    ...(e.ownerName ? [{ label: "Owner", value: e.ownerName }] : []),
    { label: "Business form", value: e.form },
    ...(e.cvr ? [{ label: "CVR", value: e.cvr }] : []),
    ...(e.address ? [{ label: "Registered address", value: e.address }] : []),
    { label: "Email", value: e.email },
  ];
  return (
    <div className="mt-12 rounded-card border border-border bg-card p-6 md:mt-16 md:p-8">
      <h2 className="text-h3 text-fg">{legalCommon.entityHeading}</h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[10rem_1fr]">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-small font-semibold text-fg">{r.label}</dt>
            <dd className="text-body text-muted">
              {Array.isArray(r.value)
                ? r.value.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                : r.label === "Email"
                  ? <a href={`mailto:${r.value}`} className="underline decoration-border underline-offset-4 transition-colors hover:decoration-fg">{r.value}</a>
                  : r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  useSeo({
    title: doc.seo.title,
    description: doc.seo.description,
    path: `/${doc.slug}`,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: doc.title, path: `/${doc.slug}` }])],
  });
  const others = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <section id="top" className="pb-4 pt-32 md:pt-40 lg:pt-44">
        <Container>
          <div className="max-w-prose">
            <h1 className="text-h2 text-fg">{doc.title}</h1>
            <p className="mt-2 text-small text-muted">
              {legalCommon.updatedLabel}: {legalUpdated}
            </p>
            <p className="mt-6 text-lead text-muted">{doc.intro}</p>
            <p className="mt-6 rounded-field border border-border bg-card px-4 py-3 text-small text-muted">{legalCommon.reviewNote}</p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-prose">
            {doc.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i === 0 ? 0 : 60} variant="near" className={i === 0 ? "" : "mt-12 md:mt-14"}>
                <h2 className="text-h3 text-fg">{section.heading}</h2>
                {section.blocks.map((block, k) => (
                  <Block key={k} block={block} />
                ))}
              </Reveal>
            ))}

            <BusinessDetails />

            <div className="mt-12 border-t border-border pt-6 md:mt-16">
              <h2 className="text-small font-semibold text-fg">{legalCommon.related}</h2>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <SmartLink href={`/${o.slug}`} className="text-body text-muted underline decoration-border underline-offset-4 transition-colors hover:text-fg hover:decoration-fg">
                      {o.title}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
