import { Router } from "express";
import { db } from "../data/mockDb.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/dashboard", (req, res) => {
  const allLeads = [...db.pharmacyLeads, ...db.deliveryLeads, ...db.b2bLeads];
  const converted = allLeads.filter((lead) => lead.status === "CONVERTED").length;
  res.json({
    data: {
      totalLeads: allLeads.length,
      pharmacyLeads: db.pharmacyLeads.length,
      deliveryPartnerLeads: db.deliveryLeads.length,
      b2bCustomerLeads: db.b2bLeads.length,
      convertedLeads: converted,
      followupsDueToday: db.followups.filter((task) => task.dueDate?.slice(0, 10) === new Date().toISOString().slice(0, 10)).length,
      overdueFollowups: db.followups.filter((task) => task.dueDate?.slice(0, 10) < new Date().toISOString().slice(0, 10)).length,
      whatsappReplies: db.whatsappMessages.filter((msg) => msg.status === "Replied").length,
      conversionRate: allLeads.length ? Math.round((converted / allLeads.length) * 100) : 0,
      recentActivities: db.activities.slice(0, 10),
      hotLeads: allLeads.filter((lead) => lead.leadPriority === "HOT").slice(0, 10),
      lostLeads: allLeads.filter((lead) => lead.status === "LOST").slice(0, 10),
    },
  });
});

router.get("/conversion", (req, res) => res.json({ data: groupByStatus([...db.pharmacyLeads, ...db.deliveryLeads, ...db.b2bLeads]) }));
router.get("/team-performance", (req, res) => res.json({ data: db.teamMembers }));
router.get("/whatsapp", (req, res) => res.json({ data: db.whatsappMessages }));
router.get("/area-wise-leads", (req, res) => res.json({ data: groupBy([...db.pharmacyLeads, ...db.deliveryLeads, ...db.b2bLeads], "area") }));

function groupByStatus(rows) {
  return groupBy(rows, "status");
}

function groupBy(rows, key) {
  return Object.entries(rows.reduce((acc, row) => {
    const group = row[key] || "Unknown";
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {})).map(([name, count]) => ({ name, count }));
}

export default router;
