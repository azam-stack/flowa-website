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
  call: { status: ["Research", "Ready to call", "Dialling", "Connected", "Conversation", "Qualified", "Meeting booked"], nextAction: ["Verify contact", "Dial", "Ringing", "Opening", "Qualify", "Propose time", "Handover"] },
} as const;
