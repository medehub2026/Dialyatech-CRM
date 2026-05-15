import { X } from "lucide-react";

export default function FormShell({ title, subtitle, children, onClose, onSubmit, readonly }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <form onSubmit={onSubmit} className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">{title}</h2>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
          <button type="button" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={onClose}><X size={20} /></button>
        </header>
        {children}
        <footer className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:justify-end">
          <button type="button" className="crm-btn-soft" onClick={onClose}>Close</button>
          {!readonly ? <button type="submit" className="crm-btn-primary">Save</button> : null}
        </footer>
      </form>
    </div>
  );
}
