import crypto from "node:crypto";
import { repository } from "../repositories/crudRepository.js";

const messages = repository("whatsappMessages", "msg");

export async function sendTemplateMessage({ leadType, leadId, phone, templateName, messageBody, sentBy }) {
  const interaktMessageId = `mock_${crypto.randomUUID()}`;
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
