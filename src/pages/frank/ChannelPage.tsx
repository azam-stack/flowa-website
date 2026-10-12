import { Container } from "@/components/Container";
import { ContactBand } from "@/components/frank/ContactBand";
import { FrankCard } from "@/components/frank/FrankCard";
import { Mail, Message } from "@/components/frank/Icons";
import { StepMock } from "@/components/frank/Mocks";
import { PageHero } from "@/components/frank/PageHero";
import { Section } from "@/components/frank/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { channelEmail, channelLinkedIn } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /channels/email and /channels/linkedin: Frank on one channel, four framed blocks and a mock-up. */
export function ChannelPage({ channel }: { channel: "email" | "linkedin" }) {
  const t = channel === "email" ? channelEmail : channelLinkedIn;
  const path = `/channels/${channel}`;
  const name = channel === "email" ? "Email" : "LinkedIn";
  useSeo({ title: t.seo.title, description: t.seo.description, path, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name, path }])] });
  const Icon = channel === "email" ? Mail : Message;
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} aside={<FrankCard pose={channel === "email" ? "laptop" : "portrait"} className="w-full" />} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
            <Reveal stagger as="ul" className="flex min-w-0 flex-col gap-4">
              {t.blocks.map((b) => (
                <li key={b.title} className="framed flex gap-4 p-5 md:p-6">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-panel text-ink">
                    <Icon size={18} />
                  </span>
                  <div>
                    <h2 className="text-h3 text-ink">{b.title}</h2>
                    <p className="mt-2 text-body text-ink-2">{b.body}</p>
                  </div>
                </li>
              ))}
            </Reveal>
            <Reveal delay={80} className="min-w-0 lg:sticky lg:top-40 lg:self-start">
              <StepMock kind={channel === "email" ? "reach" : "qualify"} className="min-h-[320px]" />
            </Reveal>
          </div>
        </Container>
      </Section>
      <ContactBand idPrefix={channel} />
    </>
  );
}
