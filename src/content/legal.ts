/**
 * Legal pages: privacy, cookies, terms of use and refunds.
 *
 * IMPORTANT, PLEASE READ BEFORE EDITING.
 *
 * These are good-faith drafts written from what this website and this
 * repository actually do, not legal advice, and nobody with a practising
 * certificate has reviewed them. They were written against a specific
 * technical audit of the site:
 *   - no cookies are set, by this site or by anyone else
 *   - no third-party scripts, fonts, embeds, pixels or tag managers load
 *   - the only browser storage is one strictly necessary sessionStorage
 *     key that stops a form being submitted twice
 *   - analytics events go to an in-memory array and are sent nowhere
 *     unless VITE_ANALYTICS_ENDPOINT is configured
 * If any of those four things changes, the cookie page and the privacy
 * page stop being true and must be updated in the same commit.
 *
 * Nothing here may state a contract term the founders have not agreed.
 * The refund page says what they confirmed: no cash refunds, and a
 * meeting that does not meet the written criteria is replaced.
 */

/**
 * Who the controller is. Flowa is a Danish sole trader, so the
 * controller is a named individual, not a company. These details
 * satisfy GDPR Article 13(1)(a), which requires the controller's
 * identity and contact details.
 *
 * The CVR number below has a valid mod-11 checksum, which is how a
 * Danish CVR is verified, so it is at least not a typo.
 *
 * TODO(founders): `address` is missing its postcode and city. A
 * registered address used for legal notice needs both. Supply them and
 * add a line to the array; a street and a country alone is thin.
 *
 * Every row renders only when it is non-null, so nothing half-finished
 * is ever published.
 */
export const legalEntity = {
  tradingName: "Flowa",
  form: "Sole trader (enkeltmandsvirksomhed) established in Denmark",
  /** The owner's full legal name, exactly as registered. */
  ownerName: "Ahmad Reda Zamzam" as string | null,
  /** Danish CVR number. */
  cvr: "43159992" as string | null,
  /** Registered postal address, one line per row. */
  address: ["Bernhardt Jensens Boulevard 87", "Denmark"] as string[] | null,
  country: "Denmark",
  email: "info@flowa.dk",
  /** Danish supervisory authority. */
  authority: { name: "Datatilsynet", url: "https://www.datatilsynet.dk" },
  /** The UK authority, relevant because Flowa targets buyers in the UK. */
  ukAuthority: { name: "the Information Commissioner's Office", url: "https://ico.org.uk" },
} as const;

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type LegalDoc = {
  slug: string;
  /** Nav and page title. */
  title: string;
  seo: { title: string; description: string };
  /** Shown under the heading. */
  intro: string;
  sections: LegalSection[];
};

/** Last substantive review of these documents. Update when the text changes. */
export const legalUpdated = "21 September 2026";

const p = (text: string): LegalBlock => ({ kind: "p", text });
const list = (items: string[]): LegalBlock => ({ kind: "list", items });

export const privacyPolicy: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  seo: {
    title: "Privacy policy | Flowa",
    description: "How Flowa handles personal data: website visitors, people who contact us, prospects we research for clients, and clients themselves. Your rights and how to exercise them.",
  },
  intro:
    "This policy explains what Flowa does with personal data. It covers four groups of people: visitors to this website, people who send us an enquiry, people we research and contact on behalf of a client, and our clients themselves. The third group matters most and is covered in full below.",
  sections: [
    {
      heading: "Who is responsible for your data",
      blocks: [
        p("Flowa is the data controller. Flowa is a sole trader established in Denmark, which means the controller is Ahmad Reda Zamzam, the individual who owns the business, rather than a company. The registered details are at the bottom of this page."),
        p("You can reach us about anything in this policy, including any request about your own data, at info@flowa.dk."),
      ],
    },
    {
      heading: "Visitors to this website",
      blocks: [
        p("This website sets no cookies. It loads no third-party scripts, fonts, embeds, pixels or tag managers, so no other organisation receives anything about your visit through this site."),
        p("The site stores one item in your browser's session storage: a short key that prevents the same enquiry being submitted twice by accident. It is deleted when you close the tab, it is never sent anywhere, and it contains no information about you beyond a hash of what you just submitted."),
        p("The site is hosted on GitHub Pages. Like any web host, GitHub processes the requests your browser makes, including your IP address, in order to serve the page. We do not receive those logs and we do not analyse them."),
      ],
    },
    {
      heading: "When you send us an enquiry",
      blocks: [
        p("The contact form asks for your name, work email and company, which we need in order to reply. Job title, phone number, company size, industry, website, preferred timing and a description of what you are looking for are optional. Please do not send us anything sensitive through the form."),
        p("We use what you send us to answer your enquiry and, if it goes further, to prepare a proposal. Our lawful basis is Article 6(1)(b) of the GDPR, taking steps at your request before entering a contract, and Article 6(1)(f), our legitimate interest in responding to people who ask to hear from us."),
        p("We do not add enquiries to a marketing list, we do not sell or share them, and we do not use them to train anything."),
      ],
    },
    {
      heading: "People we research and contact for a client",
      blocks: [
        p("This is the part of our work that involves the most personal data, so it gets the most detail. Where we are asked, we identify people at companies that fit a client's stated criteria and contact them about that client's offer. Our lawful basis is Article 6(1)(f) of the GDPR, our legitimate interest and our client's legitimate interest in business-to-business commercial communication, balanced against your interests. You can object at any time and we will stop."),
        p("We do this only in a business context, to people in a professional role, about something relevant to that role. We do not process special category data and we do not target private individuals."),
        p("Because we do not collect this data from you directly, Article 14 of the GDPR requires us to tell you where it came from. The categories of source are:"),
        list([
          "Public professional profiles and posts, including what someone has published about their own role or company",
          "Company websites, public job advertisements and public announcements",
          "Public company registers and filings",
          "Third-party business data providers that supply business contact details",
        ]),
        p("The data itself is limited to business contact and role information: name, job title, employer, business email address, a public profile link, and the reason we believe the company is relevant right now. We verify it before use and discard records that do not check out."),
        p("If we contact you, that message identifies Flowa and the client, and tells you how to stop hearing from us. If you ask us to stop, we keep the minimum information needed to make sure you are never contacted again, which is a suppression record. That is a permanent record and it exists precisely so that your objection is honoured."),
        p("You have an absolute right under Article 21(2) of the GDPR to object to direct marketing. There is no balancing test for that. Write to info@flowa.dk and we will suppress you across every campaign we run."),
      ],
    },
    {
      heading: "Our clients",
      blocks: [
        p("We process the business contact details of the people we work with at client companies in order to run the engagement, and we keep the records we are required to keep for accounting. The lawful bases are Article 6(1)(b), performance of a contract, and Article 6(1)(c), compliance with a legal obligation."),
      ],
    },
    {
      heading: "Who else sees the data",
      blocks: [
        p("We keep the list of suppliers short and we do not sell data to anyone. The processors we use are:"),
        list([
          "GitHub, for hosting this website",
          "Cloudflare, for the service that receives enquiries from the contact form, where one is configured",
          "Resend, for sending us an internal notification when an enquiry arrives",
          "Microsoft, for our own email",
          "Where a client asks for it, that client's own CRM, so the records we produce for them land in their system",
        ]),
        p("Some of these suppliers process data outside the European Economic Area, principally in the United States. Where that happens the transfer relies on the European Commission's adequacy decision for the EU-US Data Privacy Framework or on standard contractual clauses."),
      ],
    },
    {
      heading: "How long we keep things",
      blocks: [
        p("We keep personal data only while it is doing a job, with these defaults:"),
        list([
          "Enquiries that do not become clients: 24 months, so we can pick up a conversation you started",
          "Prospect records: until you object, or 24 months after the last relevant activity, whichever comes first",
          "Suppression records: kept indefinitely, because deleting them would mean contacting you again",
          "Client and accounting records: five years from the end of the financial year, as the Danish Bookkeeping Act requires",
        ]),
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        p("Under the GDPR you can ask us for a copy of your data, ask us to correct it, ask us to delete it, ask us to restrict or stop processing it, object to processing based on legitimate interests, and ask for it in a portable format. Where we rely on consent you can withdraw it at any time."),
        p("Write to info@flowa.dk. We will respond within one month. We do not charge for this and we will not ask you to justify a request to stop hearing from us."),
        p("If you think we have got it wrong, you can complain to Datatilsynet, the Danish supervisory authority, at datatilsynet.dk. If you are in the United Kingdom you may instead complain to the Information Commissioner's Office at ico.org.uk."),
      ],
    },
    {
      heading: "Security, and changes to this policy",
      blocks: [
        p("Data in transit to this site and to our enquiry service is encrypted. Access to enquiry records is limited to the two people who run Flowa."),
        p("If we change how we handle personal data we will update this page and the date at the top of it. If the change is significant and we hold your contact details, we will tell you."),
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "cookies",
  title: "Cookie policy",
  seo: {
    title: "Cookie policy | Flowa",
    description: "Flowa's website sets no cookies and loads no third-party scripts or trackers. This page explains the single item of strictly necessary browser storage the site does use.",
  },
  intro: "The short version: this website sets no cookies at all, and there is nothing here to consent to. The longer version explains what the site does store and why no consent banner is needed.",
  sections: [
    {
      heading: "We set no cookies",
      blocks: [
        p("This website does not set a single cookie, first-party or third-party. It loads no analytics vendor, no tag manager, no advertising pixel, no social media widget, no embedded video and no externally hosted font. Everything the page needs is served from this domain."),
        p("That is a deliberate design choice, not an oversight. It also means no third party learns anything about your visit through this site."),
      ],
    },
    {
      heading: "The one thing we do store",
      blocks: [
        p("When you submit the contact form, the site writes a short key into your browser's session storage so that pressing submit twice does not send us the same enquiry twice. It holds no readable information about you, it is never transmitted anywhere, and your browser deletes it when you close the tab."),
      ],
    },
    {
      heading: "Why there is no consent banner",
      blocks: [
        p("The ePrivacy rules, and the UK's PECR, cover storing or reading information on your device. That includes browser storage, not only cookies. Consent is required unless the storage is strictly necessary for a service you have actively asked for."),
        p("The only storage this site uses exists to complete a form you chose to submit, which is the strictly necessary case. So there is nothing here that requires your consent, and adding a banner asking for it would be theatre."),
        p("If we ever add analytics, advertising or anything that tracks you across sites, we will ask for consent properly before it loads, and this page will change first."),
      ],
    },
    {
      heading: "Your browser is still in charge",
      blocks: [
        p("You can clear site data or block storage for this site in your browser settings at any time. Nothing on this site will break, except that submitting the same form twice will no longer be caught."),
      ],
    },
  ],
};

export const termsOfUse: LegalDoc = {
  slug: "terms",
  title: "Terms of use",
  seo: {
    title: "Terms of use | Flowa",
    description: "The terms that apply to using the Flowa website. Services are delivered under a separate signed proposal, which governs the commercial relationship.",
  },
  intro:
    "These terms cover your use of this website. They are not the contract for our services. If you become a client, the engagement is governed by the proposal you sign, and that document takes precedence over anything on this site.",
  sections: [
    {
      heading: "The website is information, not an offer",
      blocks: [
        p("Everything on this site, including prices and package contents, is published for information. It is an invitation to talk, not a binding offer. A contract exists only when we have both agreed a written proposal."),
        p("We try hard to keep the site accurate and current. We do not promise that it is free of errors, and we may change the content, the packages or the prices at any time."),
      ],
    },
    {
      heading: "What we promise, and what we do not",
      blocks: [
        p("Nothing on this site is a guarantee of a commercial result. Figures describing our own track record are our records of work already delivered. They describe what has happened, not what will happen for you."),
        p("Examples of prospects, meetings, dashboards and interfaces shown on this site are illustrative and are labelled as such. They are not real contacts, real clients or real campaign data."),
        p("Where we compare an engagement with hiring in-house or using another kind of agency, the figures we give for those alternatives are typical market ranges we have stated as ranges. They are not quotes and they are not claims about any particular competitor."),
      ],
    },
    {
      heading: "Using the site",
      blocks: [
        p("You may read this site, print it and share links to it. You may not copy its design, text or code for a competing service, scrape it at a scale that degrades it for others, or use it to break the law."),
        p("The Flowa name, logo and the contents of this site belong to Flowa, except for third-party logos, which belong to the companies they identify and appear with their permission."),
      ],
    },
    {
      heading: "Liability",
      blocks: [
        p("We do not exclude liability for death or personal injury caused by negligence, for fraud, or for anything else the law does not permit us to exclude."),
        p("Beyond that, and to the extent the law allows, we are not liable for business losses arising from your use of this website, including lost profit, lost revenue or lost opportunity. Liability arising from an engagement is dealt with in the signed proposal, not here."),
      ],
    },
    {
      heading: "Law and disputes",
      blocks: [
        p("These terms are governed by Danish law, and the Danish courts have jurisdiction. If you are a consumer rather than a business, this does not remove any protection you have under the law of the country you live in."),
        p("Questions about these terms go to info@flowa.dk."),
      ],
    },
  ],
};

export const refundPolicy: LegalDoc = {
  slug: "refunds",
  title: "Refund policy",
  seo: {
    title: "Refund policy | Flowa",
    description: "How Flowa handles meetings that do not meet the agreed criteria: they are replaced rather than refunded. Cancellation and notice are governed by your signed proposal.",
  },
  intro:
    "Flowa sells business services to businesses, priced and scoped in a proposal you sign. This page sets out our general position on refunds and replacements. Your proposal is the document that governs your engagement, and where the two differ, the proposal wins.",
  sections: [
    {
      heading: "We replace rather than refund",
      blocks: [
        p("Fees are not refundable once work has been delivered. What we do instead is replace anything that does not meet the standard we agreed with you in writing before we started."),
        p("A meeting that does not go ahead, or that turns out not to match the qualification criteria you set, is not counted and is not billed. We replace it. That is the remedy, and it is the same remedy on every package."),
      ],
    },
    {
      heading: "The Pilot",
      blocks: [
        p("The Pilot is paid per booked meeting, so you are only invoiced for meetings that meet your criteria. The one-time onboarding fee covers the setup work at the start of the engagement and is not refundable once that work has begun."),
      ],
    },
    {
      heading: "Fixed packages",
      blocks: [
        p("Core, Plus and Scale are monthly packages with a meeting commitment and one month's notice. Cancelling stops the engagement at the end of the notice period. Fees already invoiced for work delivered are not refunded."),
        p("The exact commitment, the notice period and the guarantee terms are set out in your proposal, because they depend on the market, the ideal customer profile and the scope we agree with you."),
      ],
    },
    {
      heading: "If something has gone wrong",
      blocks: [
        p("Tell us. Write to info@flowa.dk with what happened and we will look at it properly. Two people run Flowa, so your complaint reaches a decision-maker immediately."),
        p("If you are a consumer rather than a business, nothing on this page removes your statutory rights."),
      ],
    },
  ],
};

export const legalDocs: LegalDoc[] = [privacyPolicy, cookiePolicy, termsOfUse, refundPolicy];

export function getLegalDoc(slug: string | undefined): LegalDoc | undefined {
  return legalDocs.find((d) => d.slug === slug);
}

/** Shared chrome for the legal pages. */
export const legalCommon = {
  updatedLabel: "Last updated",
  entityHeading: "Business details",
  /** Shown on every legal page so nobody mistakes these drafts for advice. */
  reviewNote:
    "These pages were written in good faith and describe how Flowa actually works. They are not legal advice and have not been reviewed by a lawyer.",
  related: "Other policies",
} as const;
