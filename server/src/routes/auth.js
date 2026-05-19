import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";
import { db } from "../data/mockDb.js";
import { getPrisma } from "../lib/prisma.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { validate } from "../validators/common.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/login", validate(loginSchema), async (req, res) => {
  const prisma = getPrisma();
  const user = prisma
    ? await prisma.user.findUnique({ where: { email: req.body.email } })
    : db.users.find((item) => item.email === req.body.email);
  if (!user || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if (user.status !== "ACTIVE") return res.status(403).json({ message: "User is blocked or inactive" });
  const safeUser = sanitizeUser(user);
  res.json({ token: signToken(user), user: safeUser });
});

router.get("/me", requireAuth, async (req, res) => {
  const prisma = getPrisma();
  const user = prisma
    ? await prisma.user.findUnique({ where: { id: req.user.sub } })
    : db.users.find((item) => item.id === req.user.sub);
  res.json({ user: sanitizeUser(user) });
});

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash: _passwordHash, ...safe } = user;
  return safe;
}

export default router;
