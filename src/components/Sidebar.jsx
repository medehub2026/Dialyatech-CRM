import { BarChart3, Building2, CalendarClock, Gauge, LayoutDashboard, Megaphone, MessageSquare, PanelLeftClose, PanelLeftOpen, Settings, ShoppingBag, Sparkles, Truck, UserRound, Users, Zap } from "lucide-react";
import { canAccessPage, getDefaultPage } from "../utils/accessControl";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pharmacy", label: "Pharmacy CRM", icon: ShoppingBag },
  { id: "delivery", label: "Delivery CRM", icon: Truck },
  { id: "b2b", label: "B2B CRM", icon: Building2 },
  { id: "d2c", label: "B2C CRM", icon: UserRound },
  { id: "pipeline", label: "Sales Pipeline", icon: Gauge },
  { id: "automation", label: "Sales Automation", icon: Zap },
  { id: "followups", label: "Follow-ups", icon: CalendarClock },
  { id: "whatsapp", label: "WhatsApp API", icon: MessageSquare },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "team", label: "Team", icon: Users },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ page, setPage, collapsed, setCollapsed, mobile = false, role = "Super Admin" }) {
  const visibleItems = items.filter((item) => canAccessPage(role, item.id));
  const homePage = getDefaultPage(role);
  return (
    <aside className={`${mobile ? "flex h-full w-80" : `${collapsed ? "lg:w-20" : "lg:w-72"} fixed inset-y-0 left-0 z-40 hidden lg:flex`} border-r border-white/10 bg-[#130d2e] text-white transition-all flex-col shadow-2xl`}>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_10%,rgba(255,79,174,0.22),transparent_18rem),radial-gradient(circle_at_85%_0%,rgba(62,201,214,0.18),transparent_16rem)]" />
      <div className="relative flex items-center justify-between border-b border-white/10 p-5">
        <button className="flex items-center gap-3 text-left" onClick={() => setPage(homePage)}>
          <div className="dialyatech-brand-mark h-12 w-12 text-lg font-black">D</div>
          {!collapsed ? <div><h1 className="font-black tracking-tight">DIALYATECH CRM</h1><p className="text-xs font-semibold text-[#d8c9ff]">Medehub cloud command</p></div> : null}
        </button>
        <button className="rounded-xl p-2 text-slate-400 hover:bg-white/10" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      <nav className="relative grid gap-1 overflow-y-auto p-3">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;
          return (
            <button key={item.id} onClick={() => setPage(item.id)} className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-bold transition ${active ? "bg-white text-[#130d2e] shadow-glow" : "text-[#ede6ff] hover:bg-white/10 hover:text-white"}`}>
              <Icon size={19} />
              {!collapsed ? <span>{item.label}</span> : null}
            </button>
          );
        })}
      </nav>
      {!collapsed ? (
        <div className="relative m-3 mt-auto rounded-[1.4rem] border border-white/10 bg-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-black"><Sparkles size={16} className="text-[#3ec9d6]" /> Live SaaS workspace</div>
          <p className="mt-2 text-xs leading-5 text-[#ede6ff]">Role-based access enabled for each sales and onboarding section.</p>
        </div>
      ) : null}
    </aside>
  );
}
