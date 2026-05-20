export const ADMIN_ROLES = ["Super Admin", "CRM Admin"];

export const ROLE_PAGE_ACCESS = {
  "Super Admin": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports", "settings"],
  "CRM Admin": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports", "settings"],
  "Marketing Manager": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups", "whatsapp", "campaigns", "team", "reports"],
  "Sales Executive": ["dashboard", "pharmacy", "delivery", "b2b", "d2c", "pipeline", "automation", "followups"],
  "Support Executive": ["d2c", "followups", "whatsapp"],
  "Pharmacy Sales Executive": ["pharmacy"],
  "Delivery Onboarding Executive": ["delivery"],
  "B2B Sales Executive": ["b2b"],
  "B2C Sales Executive": ["d2c"],
};

export const PAGE_LEAD_TYPES = {
  pharmacy: "Pharmacy",
  delivery: "Delivery Partner",
  b2b: "B2B Customer",
  d2c: "D2C Customer",
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
  return [...new Set(getAllowedPages(role).map((page) => PAGE_LEAD_TYPES[page]).filter(Boolean))];
}

export function canSwitchRoles(role = "Super Admin") {
  return ADMIN_ROLES.includes(role);
}
