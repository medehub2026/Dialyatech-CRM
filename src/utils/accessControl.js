export const ADMIN_ROLES = ["Super Admin", "CRM Admin"];

export const ROLE_PAGE_ACCESS = {
  "Super Admin": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports", "settings"],
  "CRM Admin": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports", "settings"],
  "Marketing Manager": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports"],
  "Sales Executive": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups"],
  "Support Executive": ["d2c", "followups", "whatsapp"],
  "Pharmacy Sales Executive": ["dashboard", "pharmacy", "pipeline", "automation", "followups", "whatsapp", "campaigns", "reports"],
  "Delivery Onboarding Executive": ["dashboard", "delivery", "pipeline", "automation", "followups", "whatsapp", "campaigns", "reports"],
  "B2B Sales Executive": ["dashboard", "b2b", "pipeline", "automation", "followups", "whatsapp", "campaigns", "reports"],
  "B2C Sales Executive": ["dashboard", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "reports"],
};

export const PAGE_LEAD_TYPES = {
  pharmacy: "Pharmacy",
  delivery: "Delivery Partner",
  b2b: "B2B Customer",
  d2c: "D2C Customer",
};

export const ROLE_LEAD_TYPE_ACCESS = {
  "Pharmacy Sales Executive": ["Pharmacy"],
  "Delivery Onboarding Executive": ["Delivery Partner"],
  "B2B Sales Executive": ["B2B Customer"],
  "B2C Sales Executive": ["D2C Customer"],
  "Support Executive": ["D2C Customer"],
};

export function getAllowedPages(role = "Super Admin") {
  return ROLE_PAGE_ACCESS[role] || ROLE_PAGE_ACCESS["Super Admin"];
}

export function canAccessPage(role, page) {
  return getAllowedPages(role).includes(page);
}

export function getDefaultPage(role = "Super Admin") {
  return getAllowedPages(role)[0] || "dashboard";
}

export function getAllowedLeadTypes(role = "Super Admin") {
  if (ROLE_LEAD_TYPE_ACCESS[role]) return ROLE_LEAD_TYPE_ACCESS[role];
  return [...new Set(getAllowedPages(role).map((page) => PAGE_LEAD_TYPES[page]).filter(Boolean))];
}

export function filterLeadsByRole(leads, role = "Super Admin") {
  const allowedTypes = getAllowedLeadTypes(role);
  if (!allowedTypes.length) return leads;
  return leads.filter((lead) => allowedTypes.includes(lead.type));
}

export function getOperationLabel(role = "Super Admin") {
  const allowedTypes = getAllowedLeadTypes(role);
  if (allowedTypes.length === 1) return allowedTypes[0].replace("D2C", "B2C / D2C");
  return "All Operations";
}

export function canSwitchRoles(role = "Super Admin") {
  return ADMIN_ROLES.includes(role);
}
