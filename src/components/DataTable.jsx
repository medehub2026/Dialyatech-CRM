import { ArrowUpDown, Ban, Edit3, Eye, MessageSquare, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";

export default function DataTable({ rows, onView, onEdit, onDelete, onBlock, onWhatsApp, onStatusChange, statuses = [] }) {
  const [sort, setSort] = useState({ key: "createdAt", dir: "desc" });
  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const first = String(a[sort.key] || "");
      const second = String(b[sort.key] || "");
      return sort.dir === "asc" ? first.localeCompare(second) : second.localeCompare(first);
    });
  }, [rows, sort]);

  const changeSort = (key) => setSort((current) => ({ key, dir: current.key === key && current.dir === "asc" ? "desc" : "asc" }));
  const header = (key, label) => (
    <button className="inline-flex items-center gap-1 font-bold" onClick={() => changeSort(key)}>
      {label}<ArrowUpDown size={14} />
    </button>
  );

  return (
    <div className="crm-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full text-left text-sm">
          <thead className="bg-[#f7f5fc] text-xs uppercase tracking-wide text-[#4b4469]">
            <tr>
              <th className="px-4 py-3">{header("name", "Lead")}</th>
              <th className="px-4 py-3">{header("type", "Type")}</th>
              <th className="px-4 py-3">{header("city", "Area / City")}</th>
              <th className="px-4 py-3">{header("status", "Status")}</th>
              <th className="px-4 py-3">{header("assignedTo", "Owner")}</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">{header("nextFollowUp", "Follow-up")}</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ede6ff]">
            {sortedRows.map((lead) => (
              <tr key={lead.id} className={`${lead.blocked ? "bg-rose-50/50" : "bg-white"} transition hover:bg-[#faf9fe]`}>
                <td className="px-4 py-3">
                  <div className="font-bold text-[#130d2e]">{lead.name}</div>
                  <div className="text-xs font-semibold text-[#4b4469]/75">{lead.ownerName || lead.customerCategory || "CRM Lead"}</div>
                </td>
                <td className="px-4 py-3 text-[#4b4469]">{lead.type}</td>
                <td className="px-4 py-3 text-[#4b4469]">{lead.area}, {lead.city}</td>
                <td className="px-4 py-3">
                  {onStatusChange ? (
                    <select className="crm-input py-1.5" value={lead.status} onChange={(event) => onStatusChange(lead, event.target.value)}>
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  ) : <StatusBadge value={lead.status} />}
                </td>
                <td className="px-4 py-3 text-[#4b4469]">{lead.assignedTo}</td>
                <td className="px-4 py-3 text-[#4b4469]">{lead.mobile}</td>
                <td className="px-4 py-3 text-[#4b4469]">{lead.nextFollowUp || "Not set"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-xl p-2 text-[#4b4469] hover:bg-[#ede6ff]" title="View" onClick={() => onView(lead)}><Eye size={16} /></button>
                    <button className="rounded-xl p-2 text-[#6b3fd4] hover:bg-[#ede6ff]" title="Edit" onClick={() => onEdit(lead)}><Edit3 size={16} /></button>
                    <button className="rounded-xl p-2 text-emerald-600 hover:bg-emerald-50" title="Send WhatsApp" onClick={() => onWhatsApp(lead)}><MessageSquare size={16} /></button>
                    <button className="rounded-xl p-2 text-amber-600 hover:bg-amber-50" title="Block" onClick={() => onBlock(lead)}><Ban size={16} /></button>
                    <button className="rounded-xl p-2 text-rose-600 hover:bg-rose-50" title="Delete" onClick={() => onDelete(lead)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length ? <div className="p-8 text-center text-sm font-semibold text-slate-500">No records match the current filters.</div> : null}
    </div>
  );
}
