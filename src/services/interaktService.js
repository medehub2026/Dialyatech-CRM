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

  // Future backend connection point:
  // POST `${baseUrl}/v1/public/message/`
  // Authorization: Basic ${apiKey}
  return Promise.resolve(log);
}

export function handleInteraktWebhook(payload) {
  return {
    messageId: payload?.messageId,
    leadId: payload?.leadId,
    status: payload?.status || "Delivered",
    receivedAt: new Date().toISOString(),
  };
}
