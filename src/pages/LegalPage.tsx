import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SmartLink } from "@/components/SmartLink";
import { Section } from "@/components/frank/SectionHeading";
import { legalCommon, legalDocs, legalEntity, legalUpdated, type LegalBlock, type LegalDoc } from "@/content/legal";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";

/**
 * One template for every legal page: privacy, cookies, terms and
 * refunds. The wording comes unchanged from src/content/legal.ts; only
 * the skin is Frank's (brief §5). A single readable column, real
 * headings, the controller's details, and links across to the others.
 */
function Block({ block }: { block: LegalBlock }) {
  if (block.kind === "p") return <p className="mt-4 text-body text-ink-2">{block.text}</p>;
  if (block.kind === "list")
    return (
      <ul className="mt-4 flex flex-col gap-2.5">
        {block.items.map((item) => (
          <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-2 text-body text-ink-2">
            <span className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-body">
        <thead>
          <tr className="border-b border-line">
            {block.head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-6 text-small font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-line">
              {row.map((cell) => (
                <td key={cell} className="py-2 pr-6 text-ink-2">
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
    <div className="framed mt-12 p-6 md:mt-16 md:p-8">
      <h2 className="text-h3 text-ink">{legalCommon.entityHeading}</h2>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[10rem_1fr]">
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <dt className="text-small font-semibold text-ink">{r.label}</dt>
            <dd className="text-body text-ink-2">
              {Array.isArray(r.value) ? (
                r.value.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))
              ) : r.label === "Email" ? (
                <a href={`mailto:${r.value}`} className="text-brand-deep underline underline-offset-4">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
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
      <section className="pt-5 md:pt-8">
        <Container>
          <div className="framed px-6 py-10 md:px-12 md:py-14">
            <div className="max-w-prose">
              <h1 className="text-h2 text-ink">{doc.title}</h1>
              <p className="mt-2 text-small text-muted">
                {legalCommon.updatedLabel}: {legalUpdated}
              </p>
              <p className="mt-6 text-sub text-ink-2">{doc.intro}</p>
              <p className="mt-6 rounded-control border border-line bg-soft px-4 py-3 text-small text-muted">{legalCommon.reviewNote}</p>
            </div>
          </div>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="max-w-prose">
            {doc.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i === 0 ? 0 : 40} className={i === 0 ? "" : "mt-12 md:mt-14"}>
                <h2 className="text-h3 text-ink">{section.heading}</h2>
                {section.blocks.map((block, k) => (
                  <Block key={k} block={block} />
                ))}
              </Reveal>
            ))}
            <BusinessDetails />
            <div className="mt-12 border-t border-line pt-6 md:mt-16">
              <h2 className="text-small font-semibold text-ink">{legalCommon.related}</h2>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <SmartLink href={`/${o.slug}`} className="text-body text-brand-deep underline underline-offset-4">
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
