import { Activity, Building2, CheckCircle2, Clock3, MessageSquare, ShoppingBag, TrendingUp, Truck, XCircle } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import StatusBadge from "../components/StatusBadge";
import { PIPELINE_STAGES } from "../data/demoData";
import { useCRMData } from "../hooks/useCRMData";
import { calculateDashboard, isOverdue, isToday } from "../utils/calculations";

export default function DashboardPage({ setPage }) {
  const { leads, messages } = useCRMData();
  const stats = calculateDashboard(leads, messages);
  const due = leads.filter((lead) => isToday(lead.nextFollowUp) || isOverdue(lead.nextFollowUp)).slice(0, 5);
  const recent = [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  const cards = [
    ["Total leads", stats.total, "All CRM records", Activity, "blue"],
    ["Pharmacy leads", stats.pharmacy, "Onboarding pipeline", ShoppingBag, "green"],
    ["Delivery leads", stats.delivery, "Rider onboarding", Truck, "blue"],
    ["B2B customers", stats.b2b, "Sales accounts", Building2, "slate"],
    ["Converted", stats.converted, "Closed won", CheckCircle2, "green"],
    ["Follow-ups due", stats.followupsDue, "Today + overdue", Clock3, "amber"],
    ["WhatsApp replies", stats.whatsappReplies, "Needs response", MessageSquare, "green"],
    ["Lost leads", stats.lost, "Review reasons", XCircle, "rose"],
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-blue-900 p-6 text-white shadow-soft">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-blue-200">Corporate CRM command center</p>
            <h1 className="mt-2 text-3xl font-black lg:text-5xl">Medehub marketing and operations, live in one workspace.</h1>
            <p className="mt-3 max-w-3xl text-slate-200">Monitor onboarding, sales, campaigns, follow-ups, WhatsApp engagement, and team output with persistent demo data.</p>
          </div>
          <button className="crm-btn-success" onClick={() => setPage("pipeline")}><TrendingUp size={16} /> Open pipeline</button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, note, icon, tone]) => <DashboardCard key={title} title={title} value={value} note={note} icon={icon} tone={tone} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-slate-950">Conversion funnel</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-7">
            {PIPELINE_STAGES.map((stage) => {
              const count = leads.filter((lead) => lead.status === stage).length;
              return (
                <div key={stage} className="rounded-2xl bg-slate-50 p-4">
                  <StatusBadge value={stage} />
                  <p className="mt-3 text-2xl font-black text-slate-950">{count}</p>
                  <p className="text-xs font-semibold text-slate-500">{stage}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-slate-950">Priority follow-up panel</h2>
          <div className="mt-4 grid gap-3">
            {due.map((lead) => (
              <button key={lead.id} className="rounded-2xl border border-slate-200 p-4 text-left hover:border-blue-300 hover:bg-blue-50" onClick={() => setPage("followups")}>
                <div className="flex items-center justify-between gap-3"><b>{lead.name}</b><StatusBadge value={isOverdue(lead.nextFollowUp) ? "Rejected" : "Interested"} /></div>
                <p className="mt-1 text-sm text-slate-500">{lead.assignedTo} · {lead.nextFollowUp}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-slate-950">Recent activity</h2>
          <div className="mt-4 grid gap-3">
            {recent.map((lead) => <div key={lead.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><span><b>{lead.name}</b><p className="text-sm text-slate-500">{lead.type} added by {lead.assignedTo}</p></span><StatusBadge value={lead.status} /></div>)}
          </div>
        </div>
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-slate-950">WhatsApp replies</h2>
          <div className="mt-4 grid gap-3">
            {messages.slice(0, 5).map((msg) => <div key={msg.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><span><b>{msg.leadName}</b><p className="text-sm text-slate-500">{msg.template} · {msg.sentAt}</p></span><StatusBadge value={msg.status} /></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
