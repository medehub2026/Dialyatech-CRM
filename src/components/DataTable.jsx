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
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
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
          <tbody className="divide-y divide-slate-100">
            {sortedRows.map((lead) => (
              <tr key={lead.id} className={lead.blocked ? "bg-rose-50/50" : "bg-white"}>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-950">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.ownerName || lead.customerCategory || "CRM Lead"}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">{lead.type}</td>
                <td className="px-4 py-3 text-slate-700">{lead.area}, {lead.city}</td>
                <td className="px-4 py-3">
                  {onStatusChange ? (
                    <select className="crm-input py-1.5" value={lead.status} onChange={(event) => onStatusChange(lead, event.target.value)}>
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  ) : <StatusBadge value={lead.status} />}
                </td>
                <td className="px-4 py-3 text-slate-700">{lead.assignedTo}</td>
                <td className="px-4 py-3 text-slate-700">{lead.mobile}</td>
                <td className="px-4 py-3 text-slate-700">{lead.nextFollowUp || "Not set"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title="View" onClick={() => onView(lead)}><Eye size={16} /></button>
                    <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50" title="Edit" onClick={() => onEdit(lead)}><Edit3 size={16} /></button>
                    <button className="rounded-lg p-2 text-green-600 hover:bg-green-50" title="Send WhatsApp" onClick={() => onWhatsApp(lead)}><MessageSquare size={16} /></button>
                    <button className="rounded-lg p-2 text-amber-600 hover:bg-amber-50" title="Block" onClick={() => onBlock(lead)}><Ban size={16} /></button>
                    <button className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" title="Delete" onClick={() => onDelete(lead)}><Trash2 size={16} /></button>
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
