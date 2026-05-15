import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { repository } from "../repositories/crudRepository.js";
import { handleWebhook, sendTemplateMessage } from "../services/interaktService.js";
import { validate } from "../validators/common.js";

const router = Router();
const messages = repository("whatsappMessages", "msg");
const templates = [
  "pharmacy_onboarding_pitch",
  "delivery_partner_onboarding_pitch",
  "b2b_sales_introduction",
  "kyc_document_reminder",
  "follow_up_reminder",
  "deal_confirmation",
  "lost_lead_reactivation",
];

router.get("/templates", requireAuth, (req, res) => res.json({ data: templates.map((name) => ({ name, status: "Approved" })) }));
router.get("/messages", requireAuth, async (req, res) => res.json({ data: await messages.list(req.query) }));
router.post("/send-template", requireAuth, validate(z.object({
  leadType: z.string(),
  leadId: z.string(),
  phone: z.string().min(10),
  templateName: z.string(),
  messageBody: z.string().optional(),
})), async (req, res) => res.status(201).json({ data: await sendTemplateMessage({ ...req.body, sentBy: req.user.name }) }));
router.post("/webhook", async (req, res) => res.json(await handleWebhook(req.body)));

export default router;
