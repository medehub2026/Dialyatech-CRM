import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { repository } from "../repositories/crudRepository.js";
import { validate } from "../validators/common.js";

const router = Router();
const repo = repository("campaigns", "camp");
const schema = z.object({
  name: z.string().min(2),
  audienceType: z.string(),
  city: z.string().optional(),
  area: z.string().optional(),
  leadStatus: z.string().optional(),
  templateName: z.string(),
  scheduledAt: z.string().optional(),
  campaignGoal: z.string().optional(),
  remarks: z.string().optional(),
  status: z.string().default("Draft"),
});

router.use(requireAuth);
router.get("/", async (req, res) => res.json({ data: await repo.list(req.query) }));
router.post("/", validate(schema), async (req, res) => res.status(201).json({ data: await repo.create({ ...req.body, createdBy: req.user.name }) }));
router.put("/:id", validate(schema.partial()), async (req, res) => res.json({ data: await repo.update(req.params.id, req.body) }));
router.patch("/:id/start", async (req, res) => res.json({ data: await repo.update(req.params.id, { status: "Running" }) }));
router.patch("/:id/stop", async (req, res) => res.json({ data: await repo.update(req.params.id, { status: "Completed" }) }));

export default router;
