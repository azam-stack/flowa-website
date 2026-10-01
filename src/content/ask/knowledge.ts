/**
 * The ONLY facts the "Ask a question" assistant may use. Shared by the
 * site (nothing renders it) and the Cloudflare Worker (backend/src/ask.ts),
 * which puts it in Claude's system prompt. Plain strings only, no imports,
 * so the worker can bundle it. Change a fact here and the assistant's
 * answers change with it. Anything not covered here is handed to Ahmed
 * and Anton instead of being answered.
 */
export const ASK_KNOWLEDGE = `
ABOUT FLOWA
- Flowa books qualified B2B sales meetings for other companies, mainly with UK decision-makers.
- Flowa is run by its two co-founders, Ahmed Zamzam and Anton Busk. They set up every campaign, approve every message and keep the conversations going. There are no account managers or hand-offs.
- Flowa takes on a limited number of clients at a time.

FRANK
- Frank is Flowa's AI outbound agent. He finds companies showing a real reason to buy, researches the decision-maker and drafts the first message.
- Frank does not send messages on his own. Ahmed or Anton reads and approves every message before it goes out, and sends it at a safe, human pace.
- The research and the drafts are automated. The sending and the conversations are not.

WHERE LEADS COME FROM
- Public buying signals: LinkedIn posts and comments, job ads, leadership changes and company news. Then verified contact data.
- Every lead is checked against the client's ideal customer profile: real decision-maker, right industry, right size, right market, and a dated signal. Leads that don't pass are dropped.
- No bought lists blasted at scale.

CHANNELS
- LinkedIn and email.

QUALIFIED MEETINGS AND PAYMENT
- What counts as a qualified meeting is agreed in writing with the client before work starts: role or decision-making authority, genuine interest and a match with the ideal customer profile.
- The client pays for meetings that are held with someone who meets the agreed criteria. Activity is never billed.
- If someone doesn't turn up to a meeting, the client tells Flowa within 24 hours and Flowa rebooks the meeting.
- Flowa does not publish prices. Price depends on market and volume. Visitors get a quote by answering three questions on the pricing page (flowa.dk/pricing), and Flowa replies within one working day.

HOW AN ENGAGEMENT RUNS
- Week 1: kick-off call with Ahmed and Anton; agree the ideal customer, the roles worth meeting and the written definition of a qualified meeting.
- Week 2: Frank starts finding signals; first messages are drafted and approved before they go out.
- Week 3 onwards: replies come in; Anton keeps the conversations going and qualifies interest.
- Ongoing: qualified meetings land in the client's calendar with a short brief (who, why now, what to open with).

DATA, PRIVACY AND COMPLIANCE
- Every list, contact and campaign asset built for a client belongs to the client. Flowa never sells data.
- Outreach is built around UK GDPR and PECR: business contacts only, in their professional role, with a clear way to opt out.
- Opt-outs are permanent across every campaign.
- The privacy policy is at flowa.dk/privacy.

SALES TEAMS AND CRM
- Flowa does not replace a sales team. Flowa fills the calendar; the client's team runs the conversation and the close.
- Booked meetings and replies can be shared with the CRM the client already uses; this is set up during onboarding.

TRACK RECORD (Flowa's own records)
- 6+ years of B2B outbound, 2,000+ meetings booked, £3.4M+ revenue generated for clients, and a record £90K+ annual sale from one meeting.
- Published cases: for DataPeeps (which sells data and leads to companies such as insurers), Flowa booked a first meeting with one of Denmark's largest insurance companies. For Generaxion, a meeting Flowa booked led to an annual sale of £90K+.

GETTING STARTED AND CONTACT
- Book a 20-minute intro call with Ahmed and Anton: https://cal.com/flowa/intro
- Or email info@flowa.dk. Ahmed or Anton reply within one working day.
`.trim();

/** Shown when the assistant may not answer: a person takes it from here. */
export const ASK_HANDOFF =
  "That's a question for Ahmed or Anton rather than me. Book a 20-minute call (cal.com/flowa/intro) or email info@flowa.dk, and they'll reply within one working day.";
