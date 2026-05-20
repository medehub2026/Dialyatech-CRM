export function isToday(dateText) {
  return dateText === new Date().toISOString().slice(0, 10);
}

export function isOverdue(dateText) {
  if (!dateText) return false;
  return dateText < new Date().toISOString().slice(0, 10);
}

export function calculateDashboard(leads, messages) {
  const byType = (type) => leads.filter((lead) => lead.type === type).length;
  return {
    total: leads.length,
    pharmacy: byType("Pharmacy"),
    delivery: byType("Delivery Partner"),
    b2b: byType("B2B Customer"),
    d2c: byType("D2C Customer"),
    converted: leads.filter((lead) => lead.status === "Converted").length,
    followupsDue: leads.filter((lead) => isToday(lead.nextFollowUp) || isOverdue(lead.nextFollowUp)).length,
    whatsappReplies: messages.filter((message) => message.status === "Replied").length,
    lost: leads.filter((lead) => lead.status === "Lost").length,
  };
}

export function calculateTeamPerformance(leads, messages, team) {
  return team.map((member) => {
    const assigned = leads.filter((lead) => lead.assignedTo === member.name);
    const conversions = assigned.filter((lead) => lead.status === "Converted").length;
    const whatsappSent = messages.filter((message) => message.sentBy === member.name).length;
    const followupsCompleted = assigned.filter((lead) => lead.status === "Contacted" || lead.status === "Converted").length;
    const score = Math.min(100, Math.round(conversions * 18 + followupsCompleted * 7 + whatsappSent * 5 + assigned.length * 3));
    return { ...member, assigned: assigned.length, calls: assigned.length * 3 + 12, whatsappSent, followupsCompleted, conversions, score };
  });
}

export function reportSummary(leads, messages, campaigns, teamRows) {
  return [
    { name: "Pharmacy conversion report", value: leads.filter((lead) => lead.type === "Pharmacy" && lead.status === "Converted").length, note: "Converted pharmacy partners" },
    { name: "Delivery partner onboarding report", value: leads.filter((lead) => lead.type === "Delivery Partner" && ["Approved", "Converted"].includes(lead.status)).length, note: "Approved riders" },
    { name: "B2B deal report", value: formatCurrency(leads.filter((lead) => lead.type === "B2B Customer").reduce((sum, lead) => sum + Number(lead.dealValue || 0), 0)), note: "Demo pipeline value" },
    { name: "D2C sales report", value: formatCurrency(leads.filter((lead) => lead.type === "D2C Customer").reduce((sum, lead) => sum + Number(lead.dealValue || 0), 0)), note: "Consumer order opportunity" },
    { name: "WhatsApp campaign report", value: messages.length, note: "Message logs stored" },
    { name: "Agent performance report", value: `${Math.round(teamRows.reduce((sum, row) => sum + row.score, 0) / teamRows.length)}%`, note: "Average score" },
    { name: "Lost lead analysis", value: leads.filter((lead) => lead.status === "Lost").length, note: "Lost or rejected leads" },
    { name: "Area-wise lead report", value: new Set(leads.map((lead) => lead.area)).size, note: "Active areas" },
    { name: "Follow-up report", value: leads.filter((lead) => isToday(lead.nextFollowUp) || isOverdue(lead.nextFollowUp)).length, note: "Due and overdue" },
  ];
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}
