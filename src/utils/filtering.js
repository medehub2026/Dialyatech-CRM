export function filterLeads(leads, filters = {}, globalSearch = "") {
  const search = `${filters.search || ""} ${globalSearch || ""}`.trim().toLowerCase();
  return leads.filter((lead) => {
    const haystack = [lead.name, lead.ownerName, lead.mobile, lead.whatsapp, lead.city, lead.area, lead.type, lead.assignedTo].join(" ").toLowerCase();
    if (search && !haystack.includes(search)) return false;
    if (filters.type && lead.type !== filters.type) return false;
    if (filters.status && lead.status !== filters.status) return false;
    if (filters.city && !lead.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.assignedTo && lead.assignedTo !== filters.assignedTo) return false;
    if (filters.date && lead.nextFollowUp !== filters.date) return false;
    return true;
  });
}
