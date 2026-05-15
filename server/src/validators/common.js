import { z } from "zod";

export const phone = z.string().regex(/^[6-9]\d{9}$/, "Mobile number must be a valid 10 digit Indian number");
export const optionalPhone = z.string().regex(/^[6-9]\d{9}$/, "WhatsApp number must be valid").optional().or(z.literal(""));
export const optionalEmail = z.string().email("Invalid email").optional().or(z.literal(""));
export const futureDate = z.string().optional().refine((value) => !value || value.slice(0, 10) >= new Date().toISOString().slice(0, 10), "Follow-up date cannot be in the past");

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Validation failed", details: result.error.flatten() });
    }
    req.body = result.data;
    return next();
  };
}
