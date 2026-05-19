import { Plus } from "lucide-react";
import { useState } from "react";
import DataTable from "../components/DataTable";
import FilterBar from "../components/FilterBar";
import { LEAD_STATUSES } from "../data/demoData";
import { useCRMData } from "../hooks/useCRMData";
import { filterLeads } from "../utils/filtering";

export default function LeadModulePage({ title, description, type, actions, globalSearch }) {
  const { leads } = useCRMData();
  const [filters, setFilters] = useState({ search: "", type: "", status: "", city: "", assignedTo: "", date: "" });
  const rows = filterLeads(leads.filter((lead) => lead.type === type), filters, globalSearch);

  return (
    <div className="grid gap-5">
      <section className="dialyatech-panel flex flex-col justify-between gap-4 p-5 lg:flex-row lg:items-center">
        <div>
          <span className="dialyatech-chip">{type} workflow</span>
          <h1 className="mt-3 text-3xl font-black text-[#130d2e]">{title}</h1>
          <p className="mt-2 max-w-3xl text-[#4b4469]">{description}</p>
        </div>
        <button className="crm-btn-primary" onClick={() => actions.newLead(type)}><Plus size={16} /> Add {type}</button>
      </section>
      <FilterBar filters={filters} setFilters={setFilters} showType={false} />
      <DataTable rows={rows} statuses={LEAD_STATUSES} onView={actions.viewLead} onEdit={actions.editLead} onDelete={actions.deleteLead} onBlock={actions.blockLead} onWhatsApp={actions.sendWhatsApp} onStatusChange={actions.changeStatus} />
    </div>
  );
}
