import { Linkedin } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { TeamPortrait } from "@/components/TeamPortrait";
import { team, peopleSection, signedStatement, signedStatementAttribution, type TeamMember } from "@/content/site.en";

/**
 * Section 7. Portrait beside name, role and what each founder owns —
 * compact, same padding as every other section. Copy is untouched; the
 * bio line is omitted until there is one, never shown as "coming soon".
 */
function FounderRow({ member }: { member: TeamMember }) {
  const fullName = member.surname ? `${member.firstName} ${member.surname}` : member.firstName;
  return (
    <div className="grid grid-cols-[132px_1fr] items-start gap-5 sm:grid-cols-[168px_1fr] sm:gap-7">
      <TeamPortrait name={fullName} role={member.role} srcBase={member.photoBase} className="max-w-none" />
      <div className="min-w-0">
        <h3 className="text-h3 text-fg">{fullName}</h3>
        <p className="mt-1 text-small font-medium text-muted">{member.role}</p>
        {member.bio && <p className="mt-3 text-body text-muted">{member.bio}</p>}
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">{peopleSection.ownsHeading}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {member.owns.map((line) => (
            <li key={line} className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] font-medium text-fg">
              {line}
            </li>
          ))}
        </ul>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${fullName} on LinkedIn`}
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg transition-colors duration-fast hover:border-fg"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

export function Team() {
  const attributed = team[signedStatementAttribution];
  const attributedName = attributed.surname ? `${attributed.firstName} ${attributed.surname}` : attributed.firstName;

  return (
    <Section id="team">
      <Container>
        <SectionHeader eyebrow={peopleSection.eyebrow} title={peopleSection.h2} lead={peopleSection.intro} />

        <Reveal delay={80} className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
          <FounderRow member={team.ahmed} />
          <FounderRow member={team.anton} />
        </Reveal>

        <Reveal delay={120} className="mt-14 border-t border-border pt-12">
          <blockquote className="max-w-3xl text-[22px] font-medium leading-snug tracking-tight text-fg sm:text-[26px]">“{signedStatement.quote}”</blockquote>
          <p className="mt-5 text-small font-semibold text-muted">
            {attributedName}, {attributed.role}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
