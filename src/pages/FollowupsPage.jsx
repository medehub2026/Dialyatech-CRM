import { CalendarPlus, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";
import { isOverdue, isToday } from "../utils/calculations";

export default function FollowupsPage({ actions }) {
  const { leads, markFollowup, updateLead } = useCRMData();
  const [newDate, setNewDate] = useState("");
  const groups = {
    "Today follow-ups": leads.filter((lead) => isToday(lead.nextFollowUp)),
    "Overdue follow-ups": leads.filter((lead) => isOverdue(lead.nextFollowUp)),
    "Upcoming follow-ups": leads.filter((lead) => lead.nextFollowUp && !isToday(lead.nextFollowUp) && !isOverdue(lead.nextFollowUp)),
    "Completed follow-ups": leads.filter((lead) => ["Contacted", "Converted"].includes(lead.status)),
  };

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Follow-up Management</h1>
        <p className="mt-2 text-slate-500">Add reminders, mark complete, reschedule, and keep marketing callbacks disciplined.</p>
      </div>
      <section className="grid gap-5 xl:grid-cols-4">
        {Object.entries(groups).map(([title, rows]) => (
          <div key={title} className="crm-card p-4">
            <div className="mb-4 flex items-center justify-between"><h2 className="font-black text-slate-950">{title}</h2><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-black text-slate-500">{rows.length}</span></div>
            <div className="grid gap-3">
              {rows.slice(0, 8).map((lead) => (
                <article key={lead.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-2"><button className="text-left font-black text-slate-950" onClick={() => actions.viewLead(lead)}>{lead.name}</button><StatusBadge value={lead.status} /></div>
                  <p className="mt-1 text-sm text-slate-500">{lead.assignedTo} · {lead.nextFollowUp || "No date"}</p>
                  <div className="mt-3 grid gap-2">
                    <input className="crm-input" type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
                    <div className="flex gap-2">
                      <button className="crm-btn-soft flex-1" onClick={() => newDate && markFollowup(lead.id, newDate)}><CalendarPlus size={15} /> Reschedule</button>
                      <button className="crm-btn-success flex-1" onClick={() => updateLead(lead.id, { status: "Contacted" })}><CheckCircle2 size={15} /> Complete</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
