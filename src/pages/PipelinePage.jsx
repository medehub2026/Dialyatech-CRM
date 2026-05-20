import KanbanBoard from "../components/KanbanBoard";
import { useCRMData } from "../hooks/useCRMData";
import { filterLeadsByRole } from "../utils/accessControl";

export default function PipelinePage({ actions, globalSearch, role, operationLabel }) {
  const { leads } = useCRMData();
  const rows = filterLeadsByRole(leads, role).filter((lead) => [lead.name, lead.type, lead.city, lead.mobile].join(" ").toLowerCase().includes(globalSearch.toLowerCase()));
  return (
    <div className="grid gap-5">
      <div>
        <p className="dialyatech-chip">{operationLabel}</p>
        <h1 className="mt-3 text-3xl font-black text-slate-950">Sales Pipeline</h1>
        <p className="mt-2 text-slate-500">Drag cards between stages or use the status dropdown. This view is limited to your assigned operation.</p>
      </div>
      <KanbanBoard leads={rows} onStatusChange={actions.changeStatus} onOpen={actions.viewLead} />
    </div>
  );
}
