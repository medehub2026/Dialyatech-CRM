import { PIPELINE_STAGES } from "../data/demoData";
import StatusBadge from "./StatusBadge";

export default function KanbanBoard({ leads, onStatusChange, onOpen }) {
  const handleDrop = (event, status) => {
    const leadId = event.dataTransfer.getData("leadId");
    const lead = leads.find((item) => item.id === leadId);
    if (lead) onStatusChange(lead, status);
  };

  return (
    <div className="grid gap-4 overflow-x-auto pb-2 xl:grid-cols-7">
      {PIPELINE_STAGES.map((stage) => {
        const cards = leads.filter((lead) => lead.status === stage);
        return (
          <section key={stage} className="min-h-[430px] min-w-64 rounded-2xl border border-slate-200 bg-slate-50 p-3" onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, stage)}>
            <header className="mb-3 flex items-center justify-between">
              <h3 className="font-black text-slate-900">{stage}</h3>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-black text-slate-500">{cards.length}</span>
            </header>
            <div className="grid gap-3">
              {cards.map((lead) => (
                <article key={lead.id} draggable onDragStart={(event) => event.dataTransfer.setData("leadId", lead.id)} className="cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm active:cursor-grabbing" onClick={() => onOpen(lead)}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-black text-slate-950">{lead.name}</h4>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{lead.type} · {lead.area}</p>
                    </div>
                    <StatusBadge value={lead.status} />
                  </div>
                  <select className="crm-input mt-3 py-2" value={lead.status} onClick={(event) => event.stopPropagation()} onChange={(event) => onStatusChange(lead, event.target.value)}>
                    {PIPELINE_STAGES.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
