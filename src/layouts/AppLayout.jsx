import { useEffect, useMemo, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";
import LeadFormRouter from "../components/forms/LeadFormRouter";
import LeadTypeChooser from "../components/LeadTypeChooser";
import Sidebar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import Topbar from "../components/Topbar";
import WhatsAppTemplateModal from "../components/WhatsAppTemplateModal";
import { useCRMData } from "../hooks/useCRMData";
import B2BPage from "../pages/B2BPage";
import CampaignsPage from "../pages/CampaignsPage";
import D2CPage from "../pages/D2CPage";
import DashboardPage from "../pages/DashboardPage";
import DeliveryPage from "../pages/DeliveryPage";
import FollowupsPage from "../pages/FollowupsPage";
import PharmacyPage from "../pages/PharmacyPage";
import PipelinePage from "../pages/PipelinePage";
import ReportsPage from "../pages/ReportsPage";
import SalesAutomationPage from "../pages/SalesAutomationPage";
import SettingsPage from "../pages/SettingsPage";
import TeamPage from "../pages/TeamPage";
import WhatsAppPage from "../pages/WhatsAppPage";
import { canAccessPage, canSwitchRoles, getAllowedLeadTypes, getDefaultPage, getOperationLabel, PAGE_LEAD_TYPES } from "../utils/accessControl";

const titles = {
  dashboard: "Dashboard",
  pharmacy: "Pharmacy Onboarding CRM",
  delivery: "Delivery Partner CRM",
  b2b: "B2B Sales Customer CRM",
  d2c: "B2C CRM / D2C Lead Management",
  pipeline: "Sales Pipeline",
  automation: "Sales Automation",
  followups: "Follow-up Management",
  whatsapp: "WhatsApp / Interakt API Center",
  campaigns: "Campaign Management",
  team: "Marketing Team Performance",
  reports: "Reports",
  settings: "Settings",
};

export default function AppLayout({ auth }) {
  const crm = useCRMData();
  const [page, setPage] = useState(() => getDefaultPage(auth.session.role));
  const [globalSearch, setGlobalSearch] = useState("");
  const [role, setRole] = useState(auth.session.role);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [leadModal, setLeadModal] = useState({ open: false, mode: "create", lead: null });
  const [leadTypeChooserOpen, setLeadTypeChooserOpen] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [whatsAppLead, setWhatsAppLead] = useState(null);

  const allowedLeadTypes = useMemo(() => getAllowedLeadTypes(role), [role]);
  const guardedSetPage = (nextPage) => {
    setPage(canAccessPage(role, nextPage) ? nextPage : getDefaultPage(role));
  };

  useEffect(() => {
    if (!canAccessPage(role, page)) setPage(getDefaultPage(role));
  }, [role, page]);

  const actions = useMemo(() => ({
    viewLead: (lead) => setLeadModal({ open: true, mode: "view", lead }),
    editLead: (lead) => setLeadModal({ open: true, mode: "edit", lead }),
    newLead: (type) => {
      if (type && allowedLeadTypes.includes(type)) setLeadModal({ open: true, mode: "create", lead: { type } });
      else if (allowedLeadTypes.length === 1) setLeadModal({ open: true, mode: "create", lead: { type: allowedLeadTypes[0] } });
      else setLeadTypeChooserOpen(true);
    },
    deleteLead: (lead) => setConfirm({ title: "Delete lead?", message: `This will remove ${lead.name} from the demo CRM.`, confirmText: "Delete", onConfirm: () => { crm.deleteLead(lead.id); setConfirm(null); } }),
    blockLead: (lead) => setConfirm({ title: lead.blocked ? "Unblock lead?" : "Block lead?", message: `${lead.name} will be ${lead.blocked ? "available again" : "marked as blocked"}.`, confirmText: lead.blocked ? "Unblock" : "Block", tone: "primary", onConfirm: () => { crm.blockLead(lead.id); setConfirm(null); } }),
    sendWhatsApp: (lead) => setWhatsAppLead(lead),
    changeStatus: (lead, status) => crm.updateLead(lead.id, { status }),
  }), [crm, allowedLeadTypes]);

  const saveLead = (payload) => {
    if (leadModal.mode === "edit" && payload.id) crm.updateLead(payload.id, payload);
    else crm.addLead(payload);
    setLeadModal({ open: false, mode: "create", lead: null });
  };

  const openLeadForm = (type) => {
    if (!allowedLeadTypes.includes(type)) return;
    setLeadTypeChooserOpen(false);
    setLeadModal({ open: true, mode: "create", lead: { type } });
  };

  const operationLabel = useMemo(() => getOperationLabel(role), [role]);
  const shared = { globalSearch, actions, role, scopedLeadTypes: allowedLeadTypes, operationLabel };
  const pages = {
    dashboard: <DashboardPage {...shared} setPage={guardedSetPage} />,
    pharmacy: <PharmacyPage {...shared} />,
    delivery: <DeliveryPage {...shared} />,
    b2b: <B2BPage {...shared} />,
    d2c: <D2CPage {...shared} />,
    pipeline: <PipelinePage {...shared} />,
    automation: <SalesAutomationPage {...shared} setPage={guardedSetPage} />,
    followups: <FollowupsPage {...shared} />,
    whatsapp: <WhatsAppPage {...shared} />,
    campaigns: <CampaignsPage {...shared} />,
    team: <TeamPage {...shared} />,
    reports: <ReportsPage {...shared} />,
    settings: <SettingsPage {...shared} />,
  };

  return (
    <div className="min-h-screen bg-[#f7f5fc] text-[#130d2e]">
      <Sidebar page={page} setPage={guardedSetPage} collapsed={collapsed} setCollapsed={setCollapsed} role={role} />
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-80 bg-slate-950 text-white" onClick={(event) => event.stopPropagation()}>
            <Sidebar mobile page={page} setPage={(next) => { guardedSetPage(next); setMobileOpen(false); }} collapsed={false} setCollapsed={() => {}} role={role} />
          </div>
        </div>
      ) : null}
      <div className={`${collapsed ? "lg:pl-20" : "lg:pl-72"} transition-all`}>
        <Topbar auth={auth} pageTitle={titles[page]} onNewLead={() => actions.newLead(PAGE_LEAD_TYPES[page])} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} globalSearch={globalSearch} setGlobalSearch={setGlobalSearch} role={role} setRole={setRole} canSwitchRole={canSwitchRoles(auth.session.role)} resetDemo={crm.resetDemo} />
        <main className="p-4 lg:p-6">{pages[page]}</main>
      </div>
      <LeadTypeChooser open={leadTypeChooserOpen} allowedTypes={allowedLeadTypes} onClose={() => setLeadTypeChooserOpen(false)} onSelect={openLeadForm} />
      <LeadFormRouter open={leadModal.open} mode={leadModal.mode} lead={leadModal.lead} onClose={() => setLeadModal({ open: false, mode: "create", lead: null })} onSave={saveLead} />
      <WhatsAppTemplateModal open={Boolean(whatsAppLead)} lead={whatsAppLead} user={auth.session} onClose={() => setWhatsAppLead(null)} />
      <ConfirmDialog open={Boolean(confirm)} {...confirm} onCancel={() => setConfirm(null)} />
      <ToastNotification />
    </div>
  );
}
