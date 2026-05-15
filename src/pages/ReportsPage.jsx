import { BarChart3 } from "lucide-react";
import { useCRMData } from "../hooks/useCRMData";
import { calculateTeamPerformance, reportSummary } from "../utils/calculations";

export default function ReportsPage() {
  const { leads, messages, campaigns, teamMembers } = useCRMData();
  const teamRows = calculateTeamPerformance(leads, messages, teamMembers);
  const reports = reportSummary(leads, messages, campaigns, teamRows);
  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Reports</h1><p className="mt-2 text-slate-500">Calculated summaries from current demo CRM data, ready to connect to backend reporting APIs later.</p></div>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <article key={report.name} className="crm-card p-5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700"><BarChart3 size={21} /></div>
            <h2 className="mt-4 font-black capitalize text-slate-950">{report.name}</h2>
            <p className="mt-3 text-3xl font-black text-slate-950">{report.value}</p>
            <p className="mt-1 text-sm text-slate-500">{report.note}</p>
          </article>
        ))}
      </section>
      <section className="crm-card p-5">
        <h2 className="font-black text-slate-950">Lost lead analysis</h2>
        <div className="mt-4 grid gap-3">{leads.filter((lead) => lead.status === "Lost" || lead.status === "Rejected").map((lead) => <div key={lead.id} className="rounded-xl bg-slate-50 p-4"><b>{lead.name}</b><p className="text-sm text-slate-500">{lead.lostReason || lead.remarks || "Reason pending"}</p></div>)}</div>
      </section>
    </div>
  );
}
