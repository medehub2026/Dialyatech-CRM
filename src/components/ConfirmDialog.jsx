import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, title, message, confirmText = "Confirm", tone = "danger", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex gap-4">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700"><AlertTriangle size={22} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-950">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="crm-btn-soft" onClick={onCancel}>Cancel</button>
          <button className={tone === "danger" ? "crm-btn-danger" : "crm-btn-primary"} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
