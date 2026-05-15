import { LogOut, Menu, Plus, RefreshCcw, Search, ShieldCheck } from "lucide-react";
import { ROLES } from "../data/demoData";

export default function Topbar({ auth, onNewLead, pageTitle, mobileOpen, setMobileOpen, globalSearch, setGlobalSearch, role, setRole, resetDemo }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={22} /></button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Medehub Operations</p>
          <h2 className="truncate text-xl font-black text-slate-950">{pageTitle}</h2>
        </div>
        <label className="relative order-last w-full md:order-none md:w-80">
          <Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={18} />
          <input className="crm-input pl-10" value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Global search..." />
        </label>
        <select className="crm-input w-auto min-w-44" value={role} onChange={(event) => setRole(event.target.value)} title="Role-based UI placeholder">
          {ROLES.map((item) => <option key={item}>{item}</option>)}
        </select>
        <button className="crm-btn-primary" onClick={onNewLead}><Plus size={16} /> New Lead</button>
        <button className="crm-btn-soft hidden sm:inline-flex" onClick={resetDemo}><RefreshCcw size={16} /> Reset demo</button>
        <div className="hidden items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-bold text-green-700 xl:flex">
          <ShieldCheck size={17} /> Secure-ready
        </div>
        <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={auth.logout} title="Logout"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
