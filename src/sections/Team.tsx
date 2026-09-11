import { Linkedin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { TeamPortrait } from "@/components/TeamPortrait";
import { team, peopleSection, signedStatement, signedStatementAttribution, type TeamMember } from "@/content/site.en";

function TeamCard({ member }: { member: TeamMember }) {
  const fullName = member.surname ? `${member.firstName} ${member.surname}` : member.firstName;
  return (
    <div className="flex flex-col items-start text-left">
      <TeamPortrait name={fullName} role={member.role} srcBase={member.photoBase} />
      <h3 className="mt-6 text-xl font-extrabold tracking-tight text-fg">{fullName}</h3>
      <p className="mt-1 text-sm font-medium text-accent-hover">{member.role}</p>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{member.bio ?? peopleSection.bioPending}</p>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{peopleSection.ownsHeading}</p>
      <div className="mt-2 w-full max-w-sm border-t border-border">
        {member.owns.map((line) => (
          <p key={line} className="border-b border-border py-2.5 text-[15px] text-fg">
            {line}
          </p>
        ))}
      </div>

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${fullName} on LinkedIn`}
          className="mt-5 inline-flex items-center justify-center rounded-full border border-border p-2.5 text-fg transition-colors hover:border-fg"
        >
          <Linkedin size={18} />
        </a>
      )}
    </div>
  );
}

export function Team() {
  const attributed = team[signedStatementAttribution];
  const attributedName = attributed.surname ? `${attributed.firstName} ${attributed.surname}` : attributed.firstName;

  return (
    <section id="team" className="border-t border-border py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>{peopleSection.eyebrow}</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{peopleSection.h2}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{peopleSection.intro}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <Reveal>
            <TeamCard member={team.ahmed} />
          </Reveal>
          <Reveal delay={80}>
            <TeamCard member={team.anton} />
          </Reveal>
        </div>
      </Container>

      <Reveal className="mt-20 bg-fg/[0.03] py-16 md:py-20">
        <Container>
          <blockquote className="mx-auto max-w-2xl text-center text-2xl font-medium leading-snug tracking-tight text-fg sm:text-[28px]">
            “{signedStatement.quote}”
          </blockquote>
          <p className="mt-6 text-center text-sm font-semibold text-muted">
            {attributedName}, {attributed.role}
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
