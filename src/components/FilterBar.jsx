import { Search, SlidersHorizontal } from "lucide-react";
import { LEAD_STATUSES, LEAD_TYPES, teamMembers } from "../data/demoData";

export default function FilterBar({ filters, setFilters, showType = true }) {
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <section className="crm-card p-4">
      <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={18} />
          <input className="crm-input pl-10" value={filters.search || ""} onChange={(event) => update("search", event.target.value)} placeholder="Search name, phone, city, lead type..." />
        </label>
        {showType ? (
          <select className="crm-input" value={filters.type || ""} onChange={(event) => update("type", event.target.value)}>
            <option value="">All types</option>
            {LEAD_TYPES.map((type) => <option key={type}>{type}</option>)}
          </select>
        ) : null}
        <select className="crm-input" value={filters.status || ""} onChange={(event) => update("status", event.target.value)}>
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((status) => <option key={status}>{status}</option>)}
        </select>
        <input className="crm-input" value={filters.city || ""} onChange={(event) => update("city", event.target.value)} placeholder="City" />
        <select className="crm-input" value={filters.assignedTo || ""} onChange={(event) => update("assignedTo", event.target.value)}>
          <option value="">All agents</option>
          {teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}
        </select>
        <button className="crm-btn-soft" onClick={() => setFilters({ search: "", type: "", status: "", city: "", assignedTo: "", date: "" })}>
          <SlidersHorizontal size={16} /> Reset
        </button>
      </div>
    </section>
  );
}
