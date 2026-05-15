const tones = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  Interested: "bg-amber-50 text-amber-700 ring-amber-200",
  "KYC Pending": "bg-violet-50 text-violet-700 ring-violet-200",
  Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  Negotiation: "bg-orange-50 text-orange-700 ring-orange-200",
  Converted: "bg-green-50 text-green-700 ring-green-200",
  Lost: "bg-slate-100 text-slate-700 ring-slate-200",
  Sent: "bg-blue-50 text-blue-700 ring-blue-200",
  Delivered: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  Read: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Replied: "bg-green-50 text-green-700 ring-green-200",
  Failed: "bg-rose-50 text-rose-700 ring-rose-200",
  Running: "bg-green-50 text-green-700 ring-green-200",
  Scheduled: "bg-blue-50 text-blue-700 ring-blue-200",
  Draft: "bg-slate-100 text-slate-700 ring-slate-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${tones[value] || "bg-slate-100 text-slate-700 ring-slate-200"}`}>
      {value || "Not set"}
    </span>
  );
}
