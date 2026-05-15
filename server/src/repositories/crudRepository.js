import { db, createId } from "../data/mockDb.js";
import { getPrisma } from "../lib/prisma.js";

const modelMap = {
  pharmacyLeads: "pharmacyLead",
  deliveryLeads: "deliveryPartnerLead",
  b2bLeads: "b2BCustomerLead",
  followups: "followUpTask",
  activities: "activityLog",
  whatsappMessages: "whatsAppMessage",
  campaigns: "campaign",
  users: "user",
  teamMembers: "teamMember",
};

export function repository(collection, idPrefix) {
  const prismaModel = modelMap[collection];

  function prisma() {
    const client = getPrisma();
    return client && prismaModel ? client[prismaModel] : null;
  }

  return {
    async list(query = {}) {
      const model = prisma();
      if (model) return model.findMany({ orderBy: { createdAt: "desc" } });
      return db[collection].filter((item) => {
        if (query.status && item.status !== query.status) return false;
        if (query.city && item.city !== query.city) return false;
        if (query.assignedTo && item.assignedTo !== query.assignedTo) return false;
        return true;
      });
    },
    async get(id) {
      const model = prisma();
      if (model) return model.findUnique({ where: { id } });
      return db[collection].find((item) => item.id === id) || null;
    },
    async create(data) {
      const model = prisma();
      if (model) return model.create({ data: normalizeDates(data) });
      const duplicate = data.mobile && db[collection].some((item) => item.mobile === data.mobile);
      if (duplicate) {
        const error = new Error("Duplicate phone number is not allowed");
        error.status = 409;
        throw error;
      }
      const item = { id: createId(idPrefix), ...data, blocked: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      db[collection].unshift(item);
      return item;
    },
    async update(id, data) {
      const model = prisma();
      if (model) return model.update({ where: { id }, data: normalizeDates(data) });
      const index = db[collection].findIndex((item) => item.id === id);
      if (index === -1) return null;
      db[collection][index] = { ...db[collection][index], ...data, updatedAt: new Date().toISOString() };
      return db[collection][index];
    },
    async remove(id) {
      const model = prisma();
      if (model) return model.delete({ where: { id } });
      const index = db[collection].findIndex((item) => item.id === id);
      if (index === -1) return null;
      return db[collection].splice(index, 1)[0];
    },
  };
}

function normalizeDates(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if ((key.endsWith("Date") || key.endsWith("At")) && value && typeof value === "string") return [key, new Date(value)];
    return [key, value];
  }));
}
