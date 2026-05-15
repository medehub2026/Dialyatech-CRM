import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";
import { calculateTeamPerformance } from "../utils/calculations";

export default function TeamPage() {
  const { leads, messages, teamMembers } = useCRMData();
  const rows = calculateTeamPerformance(leads, messages, teamMembers);

  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Marketing Team Performance</h1><p className="mt-2 text-slate-500">Measure leads assigned, calls, WhatsApp messages, completed follow-ups, conversions, and performance score.</p></div>
      <div className="crm-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Team member</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Leads assigned</th><th className="px-4 py-3">Calls done</th><th className="px-4 py-3">WhatsApp sent</th><th className="px-4 py-3">Follow-ups completed</th><th className="px-4 py-3">Conversions</th><th className="px-4 py-3">Score</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3 font-black">{row.name}<p className="text-xs font-semibold text-slate-500">{row.city}</p></td>
                  <td className="px-4 py-3">{row.role}</td>
                  <td className="px-4 py-3">{row.assigned}</td>
                  <td className="px-4 py-3">{row.calls}</td>
                  <td className="px-4 py-3">{row.whatsappSent}</td>
                  <td className="px-4 py-3">{row.followupsCompleted}</td>
                  <td className="px-4 py-3">{row.conversions}</td>
                  <td className="px-4 py-3"><StatusBadge value={row.score > 70 ? "Approved" : row.score > 40 ? "Interested" : "Rejected"} /> <span className="ml-2 font-black">{row.score}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
