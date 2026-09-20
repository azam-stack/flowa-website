/**
 * Demo data for the product-style visualisations. Generic, fictional
 * people and companies, never a real client or contact; every component
 * that renders these labels them as illustrative.
 */
export const demo = {
  label: "Illustrative",
  demoData: "Demo data",
  prospects: [
    { name: "Emma Jensen", role: "CEO", company: "Example Agency", industry: "Marketing", location: "Copenhagen", icp: 94, decisionMaker: true },
    { name: "Lars Nielsen", role: "Head of Sales", company: "Nordic Logistics Co.", industry: "Logistics", location: "Aarhus", icp: 91, decisionMaker: true },
    { name: "Sofie Madsen", role: "COO", company: "Example SaaS", industry: "Software", location: "Odense", icp: 88, decisionMaker: true },
  ],
  meeting: { time: "09:30", title: "Discovery meeting", company: "Nordic Logistics Co.", person: "Head of Sales", tags: ["Qualified", "Confirmed"], day: "Tue 14 Oct" },
  email: {
    subject: "Your outbound in Q4",
    preview: "Lars, most logistics teams we speak to have one SDR covering three markets. If that sounds familiar, worth a 20-minute call?",
    followUp: "Follow-up 2 of 3 · Thu 09:10",
  },
  /**
   * The LinkedIn sequence shown on the LinkedIn outreach page. Phone
   * outreach is no longer a Flowa service, so there is no call state
   * here: the sequence is connection, message, reply, meeting.
   */
  linkedin: {
    status: ["Research", "Connection sent", "Accepted", "Message sent", "Reply", "Qualified", "Meeting booked"],
    nextAction: ["Verify contact", "Wait", "Write message", "Wait", "Answer", "Propose a time", "Handover"],
    thread: [
      { from: "flowa", text: "Connection request · no note" },
      { from: "prospect", text: "Accepted · Tue 11:20" },
      { from: "flowa", text: "Saw you are opening a UK office. Worth twenty minutes on how you are covering it?" },
      { from: "prospect", text: "We have one SDR covering three markets. What would a trial month look like?" },
    ],
  },
} as const;
