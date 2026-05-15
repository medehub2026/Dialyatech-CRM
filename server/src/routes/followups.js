import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { repository } from "../repositories/crudRepository.js";
import { validate } from "../validators/common.js";

const router = Router();
const repo = repository("followups", "fu");
const schema = z.object({
  leadType: z.string(),
  leadId: z.string(),
  title: z.string().min(2),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  dueDate: z.string(),
  priority: z.string().default("MEDIUM"),
  status: z.string().default("Open"),
});

router.use(requireAuth);
router.get("/", async (req, res) => res.json({ data: await repo.list(req.query) }));
router.post("/", validate(schema), async (req, res) => res.status(201).json({ data: await repo.create(req.body) }));
router.put("/:id", validate(schema.partial()), async (req, res) => res.json({ data: await repo.update(req.params.id, req.body) }));
router.patch("/:id/complete", async (req, res) => res.json({ data: await repo.update(req.params.id, { status: "Completed", completedAt: new Date().toISOString() }) }));
router.delete("/:id", async (req, res) => res.json({ data: await repo.remove(req.params.id) }));

export default router;
