import { BarChart3, Building2, CalendarClock, Gauge, LayoutDashboard, Megaphone, MessageSquare, PanelLeftClose, PanelLeftOpen, Settings, ShoppingBag, Truck, Users } from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pharmacy", label: "Pharmacy CRM", icon: ShoppingBag },
  { id: "delivery", label: "Delivery CRM", icon: Truck },
  { id: "b2b", label: "B2B Sales", icon: Building2 },
  { id: "pipeline", label: "Sales Pipeline", icon: Gauge },
  { id: "followups", label: "Follow-ups", icon: CalendarClock },
  { id: "whatsapp", label: "WhatsApp API", icon: MessageSquare },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "team", label: "Team", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ page, setPage, collapsed, setCollapsed, mobile = false }) {
  return (
    <aside className={`${mobile ? "flex h-full w-80" : `${collapsed ? "lg:w-20" : "lg:w-72"} fixed inset-y-0 left-0 z-40 hidden lg:flex`} border-r border-slate-800 bg-slate-950 text-white transition-all flex-col`}>
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <button className="flex items-center gap-3 text-left" onClick={() => setPage("dashboard")}>
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-green-600 text-lg font-black">M</div>
          {!collapsed ? <div><h1 className="font-black">Dialyatech CRM</h1><p className="text-xs text-slate-400">Medehub cloud suite</p></div> : null}
        </button>
        <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      <nav className="grid gap-1 overflow-y-auto p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <Icon size={19} />
              {!collapsed ? <span>{item.label}</span> : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
