import { useMemo, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import LeadFormRouter from "../components/forms/LeadFormRouter";
import Sidebar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import Topbar from "../components/Topbar";
import WhatsAppTemplateModal from "../components/WhatsAppTemplateModal";
import { useCRMData } from "../hooks/useCRMData";
import B2BPage from "../pages/B2BPage";
import CampaignsPage from "../pages/CampaignsPage";
import DashboardPage from "../pages/DashboardPage";
import DeliveryPage from "../pages/DeliveryPage";
import FollowupsPage from "../pages/FollowupsPage";
import PharmacyPage from "../pages/PharmacyPage";
import PipelinePage from "../pages/PipelinePage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";
import TeamPage from "../pages/TeamPage";
import WhatsAppPage from "../pages/WhatsAppPage";

const titles = {
  dashboard: "Dashboard",
  pharmacy: "Pharmacy Onboarding CRM",
  delivery: "Delivery Partner CRM",
  b2b: "B2B Sales Customer CRM",
  pipeline: "Sales Pipeline",
  followups: "Follow-up Management",
  whatsapp: "WhatsApp / Interakt API Center",
  campaigns: "Campaign Management",
  team: "Marketing Team Performance",
  reports: "Reports",
  settings: "Settings",
};

export default function AppLayout({ auth }) {
  const crm = useCRMData();
  const [page, setPage] = useState("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");
  const [role, setRole] = useState(auth.session.role);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadModal, setLeadModal] = useState({ open: false, mode: "create", lead: null });
  const [confirm, setConfirm] = useState(null);
  const [whatsAppLead, setWhatsAppLead] = useState(null);

  const actions = useMemo(() => ({
    viewLead: (lead) => setLeadModal({ open: true, mode: "view", lead }),
    editLead: (lead) => setLeadModal({ open: true, mode: "edit", lead }),
    newLead: (type) => setLeadModal({ open: true, mode: "create", lead: type ? { type } : null }),
    deleteLead: (lead) => setConfirm({ title: "Delete lead?", message: `This will remove ${lead.name} from the demo CRM.`, confirmText: "Delete", onConfirm: () => { crm.deleteLead(lead.id); setConfirm(null); } }),
    blockLead: (lead) => setConfirm({ title: lead.blocked ? "Unblock lead?" : "Block lead?", message: `${lead.name} will be ${lead.blocked ? "available again" : "marked as blocked"}.`, confirmText: lead.blocked ? "Unblock" : "Block", tone: "primary", onConfirm: () => { crm.blockLead(lead.id); setConfirm(null); } }),
    sendWhatsApp: (lead) => setWhatsAppLead(lead),
    changeStatus: (lead, status) => crm.updateLead(lead.id, { status }),
  }), [crm]);

  const saveLead = (payload) => {
    if (leadModal.mode === "edit" && payload.id) crm.updateLead(payload.id, payload);
    else crm.addLead(payload);
    setLeadModal({ open: false, mode: "create", lead: null });
  };

  const shared = { globalSearch, actions, role };
  const pages = {
    dashboard: <DashboardPage {...shared} setPage={setPage} />,
    pharmacy: <PharmacyPage {...shared} />,
    delivery: <DeliveryPage {...shared} />,
    b2b: <B2BPage {...shared} />,
    pipeline: <PipelinePage {...shared} />,
    followups: <FollowupsPage {...shared} />,
    whatsapp: <WhatsAppPage {...shared} />,
    campaigns: <CampaignsPage {...shared} />,
    team: <TeamPage {...shared} />,
    reports: <ReportsPage {...shared} />,
    settings: <SettingsPage {...shared} />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} role={role} />
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-80 bg-slate-950 text-white" onClick={(event) => event.stopPropagation()}>
            <Sidebar mobile page={page} setPage={(next) => { setPage(next); setMobileOpen(false); }} collapsed={false} setCollapsed={() => {}} role={role} />
          </div>
        </div>
      ) : null}
      <div className={`${collapsed ? "lg:pl-20" : "lg:pl-72"} transition-all`}>
        <Topbar auth={auth} pageTitle={titles[page]} onNewLead={() => actions.newLead()} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} role={role} setRole={setRole} resetDemo={crm.resetDemo} />
        <main className="p-4 lg:p-6">{pages[page]}</main>
      </div>
      <LeadFormRouter open={leadModal.open} mode={leadModal.mode} lead={leadModal.lead} onClose={() => setLeadModal({ open: false, mode: "create", lead: null })} onSave={saveLead} />
      <WhatsAppTemplateModal open={Boolean(whatsAppLead)} lead={whatsAppLead} user={auth.session} onClose={() => setWhatsAppLead(null)} />
      <ConfirmDialog open={Boolean(confirm)} {...confirm} onCancel={() => setConfirm(null)} />
      <ToastNotification />
    </div>
  );
}
