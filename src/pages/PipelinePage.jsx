import KanbanBoard from "../components/KanbanBoard";
import { useCRMData } from "../hooks/useCRMData";

export default function PipelinePage({ actions, globalSearch }) {
  const { leads } = useCRMData();
  const rows = leads.filter((lead) => [lead.name, lead.type, lead.city, lead.mobile].join(" ").toLowerCase().includes(globalSearch.toLowerCase()));
  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Sales Pipeline</h1>
        <p className="mt-2 text-slate-500">Drag cards between stages or use the status dropdown on each card.</p>
      </div>
      <KanbanBoard leads={rows} onStatusChange={actions.changeStatus} onOpen={actions.viewLead} />
    </div>
  );
}
