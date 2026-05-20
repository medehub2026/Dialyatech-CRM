import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import campaignsRoutes from "./routes/campaigns.js";
import { leadRoutes } from "./routes/crudRoutes.js";
import followupsRoutes from "./routes/followups.js";
import reportsRoutes from "./routes/reports.js";
import whatsappRoutes from "./routes/whatsapp.js";
import { pharmacySchema, deliverySchema, b2bSchema, d2cSchema } from "./validators/leadSchemas.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

export const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true, database: process.env.DATABASE_URL ? "prisma" : "mock-fallback" }));
app.use("/api/auth", authRoutes);
app.use("/api/pharmacy-leads", leadRoutes({ collection: "pharmacyLeads", idPrefix: "ph", leadType: "PharmacyLead", schema: pharmacySchema }));
app.use("/api/delivery-leads", leadRoutes({ collection: "deliveryLeads", idPrefix: "dl", leadType: "DeliveryPartnerLead", schema: deliverySchema }));
app.use("/api/b2b-leads", leadRoutes({ collection: "b2bLeads", idPrefix: "b2b", leadType: "B2BCustomerLead", schema: b2bSchema }));
app.use("/api/d2c-leads", leadRoutes({ collection: "d2cLeads", idPrefix: "d2c", leadType: "D2CCustomerLead", schema: d2cSchema }));
app.use("/api/followups", followupsRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/reports", reportsRoutes);
app.use(errorHandler);
