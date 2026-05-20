const baseUrl = import.meta.env.VITE_INTERAKT_BASE_URL || "https://api.interakt.ai";
const apiKey = import.meta.env.VITE_INTERAKT_API_KEY || "";

export const interaktConfig = {
  baseUrl,
  hasApiKey: Boolean(apiKey),
};

export async function sendTemplateMessage({ lead, template, sentBy }) {
  const log = {
    id: `msg-${Date.now()}`,
    leadId: lead.id,
    leadName: lead.name,
    template: template.code,
    status: "Sent",
    sentBy,
    sentAt: new Date().toLocaleString("en-IN", { hour12: false }),
  };

  // Demo mode creates a log locally. Production should call your backend:
  // POST /api/whatsapp/send-template
  // Backend then uses INTERAKT_API_KEY, INTERAKT_BASE_URL, INTERAKT_WEBHOOK_SECRET.
  // Do not expose real Interakt keys in the browser.
  return Promise.resolve(log);
}

export function buildSalesReminderPayload(lead, templateCode = "follow_up_reminder") {
  return {
    leadId: lead.id,
    leadType: lead.type,
    phone: lead.whatsapp || lead.mobile,
    templateName: lead.type === "D2C Customer" ? "d2c_refill_reminder" : templateCode,
    variables: {
      name: lead.ownerName || lead.name,
      business: lead.name,
      followUpDate: lead.nextFollowUp,
      requirement: lead.requirementType || "medicine order",
    },
  };
}

export function handleInteraktWebhook(payload) {
  return {
    messageId: payload?.messageId,
    leadId: payload?.leadId,
    status: payload?.status || "Delivered",
    receivedAt: new Date().toISOString(),
  };
}
