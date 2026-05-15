import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth.js";
import { repository } from "../repositories/crudRepository.js";
import { logActivity } from "../services/activityService.js";
import { validate } from "../validators/common.js";

const statusSchema = z.object({ status: z.string().min(2) });
const assignSchema = z.object({ assignedTo: z.string().min(2) });
const blockSchema = z.object({ blocked: z.boolean().optional() });

export function leadRoutes({ collection, idPrefix, leadType, schema }) {
  const router = Router();
  const repo = repository(collection, idPrefix);
  router.use(requireAuth);

  router.get("/", async (req, res) => res.json({ data: await repo.list(req.query) }));
  router.post("/", validate(schema), async (req, res, next) => {
    try {
      const item = await repo.create(req.body);
      await logActivity({ leadType, leadId: item.id, actionType: "CREATE", description: `${leadType} created`, performedBy: req.user.name });
      res.status(201).json({ data: item });
    } catch (error) {
      next(error);
    }
  });
  router.get("/:id", async (req, res) => {
    const item = await repo.get(req.params.id);
    if (!item) return res.status(404).json({ message: "Record not found" });
    res.json({ data: item });
  });
  router.put("/:id", validate(schema.partial()), async (req, res) => {
    const item = await repo.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Record not found" });
    await logActivity({ leadType, leadId: item.id, actionType: "UPDATE", description: `${leadType} updated`, performedBy: req.user.name });
    res.json({ data: item });
  });
  router.delete("/:id", async (req, res) => {
    const item = await repo.remove(req.params.id);
    if (!item) return res.status(404).json({ message: "Record not found" });
    await logActivity({ leadType, leadId: req.params.id, actionType: "DELETE", description: `${leadType} deleted`, performedBy: req.user.name });
    res.json({ data: item });
  });
  router.patch("/:id/status", validate(statusSchema), async (req, res) => {
    const item = await repo.update(req.params.id, { status: req.body.status, onboardingStage: req.body.status });
    if (!item) return res.status(404).json({ message: "Record not found" });
    await logActivity({ leadType, leadId: item.id, actionType: "STATUS", description: `Status changed to ${req.body.status}`, performedBy: req.user.name });
    res.json({ data: item });
  });
  router.patch("/:id/assign", validate(assignSchema), async (req, res) => {
    const item = await repo.update(req.params.id, { assignedTo: req.body.assignedTo });
    if (!item) return res.status(404).json({ message: "Record not found" });
    res.json({ data: item });
  });
  router.patch("/:id/block", validate(blockSchema), async (req, res) => {
    const current = await repo.get(req.params.id);
    if (!current) return res.status(404).json({ message: "Record not found" });
    const item = await repo.update(req.params.id, { blocked: req.body.blocked ?? !current.blocked });
    res.json({ data: item });
  });

  return router;
}
