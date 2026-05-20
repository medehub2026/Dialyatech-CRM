import { Bell, LogOut, Menu, Plus, RefreshCcw, Search, ShieldCheck } from "lucide-react";
import { ROLES } from "../data/demoData";

export default function Topbar({ auth, onNewLead, pageTitle, mobileOpen, setMobileOpen, globalSearch, setGlobalSearch, role, setRole, canSwitchRole = false, resetDemo }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e5ddf7] bg-white/85 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <button className="rounded-2xl p-2 text-[#4b4469] hover:bg-[#ede6ff] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={22} /></button>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-wide text-[#6b3fd4]">Medehub Operations Cloud</p>
          <h2 className="truncate text-xl font-black text-[#130d2e]">{pageTitle}</h2>
        </div>
        <label className="relative order-last w-full md:order-none md:w-80">
          <Search className="pointer-events-none absolute left-3 top-3 text-[#6b3fd4]" size={18} />
          <input className="crm-input pl-10" value={globalSearch} onChange={(event) => setGlobalSearch(event.target.value)} placeholder="Search lead, phone, city, stage..." />
        </label>
        {canSwitchRole ? (
          <select className="crm-input w-auto min-w-44" value={role} onChange={(event) => setRole(event.target.value)} title="Role-based UI placeholder">
            {ROLES.map((item) => <option key={item}>{item}</option>)}
          </select>
        ) : (
          <div className="hidden rounded-2xl border border-[#e5ddf7] bg-[#f7f5fc] px-3 py-2 text-sm font-black text-[#4b4469] md:block">{role}</div>
        )}
        <button className="crm-btn-primary" onClick={onNewLead}><Plus size={16} /> New Lead</button>
        {canSwitchRole ? <button className="crm-btn-soft hidden sm:inline-flex" onClick={resetDemo}><RefreshCcw size={16} /> Reset demo</button> : null}
        <button className="hidden rounded-2xl border border-[#e5ddf7] bg-[#f7f5fc] p-2 text-[#4b4469] hover:border-[#d8c9ff] xl:inline-flex" title="Notifications"><Bell size={18} /></button>
        <div className="hidden items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 xl:flex">
          <ShieldCheck size={17} /> API ready
        </div>
        <button className="rounded-2xl p-2 text-[#4b4469] hover:bg-[#ede6ff]" onClick={auth.logout} title="Logout"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
