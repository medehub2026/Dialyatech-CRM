import { Activity, Building2, CheckCircle2, Clock3, MessageSquare, Radio, ShoppingBag, Sparkles, Target, TrendingUp, Truck, XCircle } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import StatusBadge from "../components/StatusBadge";
import { PIPELINE_STAGES } from "../data/demoData";
import { useCRMData } from "../hooks/useCRMData";
import { calculateDashboard, isOverdue, isToday } from "../utils/calculations";
import { filterLeadsByRole } from "../utils/accessControl";

export default function DashboardPage({ setPage, role, operationLabel }) {
  const { leads, messages } = useCRMData();
  const visibleLeads = filterLeadsByRole(leads, role);
  const visibleMessages = messages.filter((message) => visibleLeads.some((lead) => lead.id === message.leadId || lead.name === message.leadName));
  const stats = calculateDashboard(visibleLeads, visibleMessages);
  const due = visibleLeads.filter((lead) => isToday(lead.nextFollowUp) || isOverdue(lead.nextFollowUp)).slice(0, 5);
  const recent = [...visibleLeads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const priorityCount = visibleLeads.filter((lead) => ["Interested", "KYC Pending", "Negotiation"].includes(lead.status)).length;
  const readyCount = visibleLeads.filter((lead) => ["Approved", "Converted"].includes(lead.status)).length;
  const pipelineValue = visibleLeads.reduce((sum, lead) => sum + Number(lead.dealValue || lead.monthlyOrderPotential || lead.expectedOrderValue || 0), 0);

  const allOperationCards = [
    ["Total leads", stats.total, `${operationLabel} records`, Activity, "blue"],
    ["Pharmacy leads", stats.pharmacy, "Onboarding pipeline", ShoppingBag, "green"],
    ["Delivery leads", stats.delivery, "Rider onboarding", Truck, "blue"],
    ["B2B customers", stats.b2b, "Sales accounts", Building2, "slate"],
    ["B2C leads", stats.d2c, "Consumer orders", Target, "blue"],
    ["Converted", stats.converted, "Closed won", CheckCircle2, "green"],
    ["Follow-ups due", stats.followupsDue, "Today + overdue", Clock3, "amber"],
    ["WhatsApp replies", stats.whatsappReplies, "Needs response", MessageSquare, "green"],
    ["Lost leads", stats.lost, "Review reasons", XCircle, "rose"],
  ];
  const operationCards = [
    ["Total leads", stats.total, `${operationLabel} records`, Activity, "blue"],
    ["Priority leads", priorityCount, "Needs immediate action", Target, "amber"],
    ["Follow-ups due", stats.followupsDue, "Today + overdue", Clock3, "amber"],
    ["WhatsApp replies", stats.whatsappReplies, "Needs response", MessageSquare, "green"],
    ["Converted", stats.converted, "Closed or approved", CheckCircle2, "green"],
    ["Pipeline value", `₹${Math.round(pipelineValue / 1000)}K`, "Potential value", Building2, "slate"],
    ["Lost leads", stats.lost, "Review reasons", XCircle, "rose"],
  ];
  const cards = operationLabel === "All Operations" ? allOperationCards : operationCards;

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[1.8rem] bg-[#130d2e] p-6 text-white shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(255,79,174,0.35),transparent_20rem),radial-gradient(circle_at_88%_12%,rgba(62,201,214,0.25),transparent_18rem),linear-gradient(135deg,rgba(107,63,212,0.45),transparent_55%)]" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ede6ff]"><Sparkles size={14} /> {operationLabel} dashboard</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight lg:text-5xl">Your operation cockpit for leads, reminders, WhatsApp and conversion.</h1>
            <p className="mt-3 max-w-3xl text-[#ede6ff]">This dashboard is filtered for your assigned operation only, with the indicators needed for daily execution.</p>
          </div>
          <button className="crm-btn-primary shrink-0" onClick={() => setPage("pipeline")}><TrendingUp size={16} /> Open pipeline</button>
        </div>
        <div className="relative mt-6 grid gap-3 md:grid-cols-3">
          {[
            ["Priority leads", priorityCount, "Interested, KYC, negotiation", ShoppingBag],
            ["Ready / converted", readyCount, "Approved and closed records", Truck],
            ["Pipeline value", `₹${Math.round(pipelineValue / 1000)}K`, "Potential revenue or order value", Target],
          ].map(([label, value, note, Icon]) => (
            <button key={label} onClick={() => setPage("pipeline")} className="rounded-[1.35rem] border border-white/10 bg-white/10 p-4 text-left backdrop-blur transition hover:bg-white/15">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-white">{label}</span>
                <Icon size={18} className="text-[#3ec9d6]" />
              </div>
              <div className="mt-3 text-3xl font-black">{value}</div>
              <p className="mt-1 text-xs font-semibold text-[#ede6ff]">{note}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, note, icon, tone]) => <DashboardCard key={title} title={title} value={value} note={note} icon={icon} tone={tone} />)}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="crm-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="dialyatech-chip">Live lead stages</p>
              <h2 className="mt-3 text-lg font-black text-[#130d2e]">Conversion funnel</h2>
            </div>
            <button className="crm-btn-soft" onClick={() => setPage("reports")}><Radio size={16} /> Reports</button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-7">
            {PIPELINE_STAGES.map((stage) => {
              const count = visibleLeads.filter((lead) => lead.status === stage).length;
              return (
                <div key={stage} className="rounded-2xl border border-[#ede6ff] bg-[#faf9fe] p-4">
                  <StatusBadge value={stage} />
                  <p className="mt-3 text-2xl font-black text-[#130d2e]">{count}</p>
                  <p className="text-xs font-semibold text-[#4b4469]">{stage}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="crm-card p-5">
          <p className="dialyatech-chip">Action required</p>
          <h2 className="mt-3 text-lg font-black text-[#130d2e]">Priority follow-up panel</h2>
          <div className="mt-4 grid gap-3">
            {due.map((lead) => (
              <button key={lead.id} className="rounded-2xl border border-[#ede6ff] bg-white p-4 text-left hover:border-[#d8c9ff] hover:bg-[#f7f5fc]" onClick={() => setPage("followups")}>
                <div className="flex items-center justify-between gap-3"><b>{lead.name}</b><StatusBadge value={isOverdue(lead.nextFollowUp) ? "Rejected" : "Interested"} /></div>
                <p className="mt-1 text-sm text-[#4b4469]">{lead.assignedTo} · {lead.nextFollowUp}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-[#130d2e]">Recent activity</h2>
          <div className="mt-4 grid gap-3">
            {recent.map((lead) => <div key={lead.id} className="flex items-center justify-between rounded-2xl border border-[#ede6ff] bg-[#faf9fe] p-4"><span><b>{lead.name}</b><p className="text-sm text-[#4b4469]">{lead.type} added by {lead.assignedTo}</p></span><StatusBadge value={lead.status} /></div>)}
          </div>
        </div>
        <div className="crm-card p-5">
          <h2 className="text-lg font-black text-[#130d2e]">WhatsApp replies</h2>
          <div className="mt-4 grid gap-3">
            {visibleMessages.slice(0, 5).map((msg) => <div key={msg.id} className="flex items-center justify-between rounded-2xl border border-[#ede6ff] bg-[#faf9fe] p-4"><span><b>{msg.leadName}</b><p className="text-sm text-[#4b4469]">{msg.template} · {msg.sentAt}</p></span><StatusBadge value={msg.status} /></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
