import crypto from "node:crypto";
import { repository } from "../repositories/crudRepository.js";

const messages = repository("whatsappMessages", "msg");
const INTERAKT_BASE_URL = process.env.INTERAKT_BASE_URL || "https://api.interakt.ai";
const INTERAKT_API_KEY = process.env.INTERAKT_API_KEY || "";

export async function sendTemplateMessage({ leadType, leadId, phone, templateName, messageBody, sentBy }) {
  const interaktMessageId = `mock_${crypto.randomUUID()}`;
  const shouldCallInterakt = Boolean(INTERAKT_API_KEY && process.env.INTERAKT_LIVE_SEND === "true");
  if (shouldCallInterakt) {
    // Production connection point. Keep secrets on the backend only.
    await fetch(`${INTERAKT_BASE_URL}/v1/public/message/`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${INTERAKT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryCode: "+91",
        phoneNumber: phone,
        type: "Template",
        template: { name: templateName, languageCode: "en" },
      }),
    });
  }
  return messages.create({
    leadType,
    leadId,
    phone,
    templateName,
    messageBody,
    status: "Sent",
    interaktMessageId,
    sentBy,
    sentAt: new Date().toISOString(),
  });
}

export async function handleWebhook(payload) {
  return {
    ok: true,
    received: payload,
    processedAt: new Date().toISOString(),
  };
}

export async function updateMessageStatus(id, status) {
  const patch = { status };
  if (status === "Delivered") patch.deliveredAt = new Date().toISOString();
  if (status === "Read") patch.readAt = new Date().toISOString();
  if (status === "Replied") patch.repliedAt = new Date().toISOString();
  return messages.update(id, patch);
}
