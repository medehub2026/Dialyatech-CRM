import { BellRing, KeyRound, Plus, Send, Webhook } from "lucide-react";
import { useState } from "react";
import WhatsAppTemplateForm from "../components/forms/WhatsAppTemplateForm";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";
import { interaktConfig } from "../services/interaktService";
import { filterLeadsByRole } from "../utils/accessControl";

export default function WhatsAppPage({ actions, role, operationLabel, scopedLeadTypes = [] }) {
  const { leads, messages, templates, setTemplates, settings, setSettings } = useCRMData();
  const [templateOpen, setTemplateOpen] = useState(false);
  const visibleLeads = filterLeadsByRole(leads, role);
  const visibleMessages = messages.filter((message) => visibleLeads.some((lead) => lead.id === message.leadId || lead.name === message.leadName));
  const quickActions = [
    ["B2B Customer", "Send B2B sales quote reminder"],
    ["D2C Customer", "Send B2C refill or cart recovery"],
    ["Follow-up", "Send due sales reminder"],
    ["Pharmacy", "Send onboarding pitch"],
    ["Delivery Partner", "Send rider onboarding pitch"],
  ].filter(([label]) => label === "Follow-up" || !scopedLeadTypes.length || scopedLeadTypes.includes(label));

  const addTemplate = (templateForm) => {
    setTemplates((items) => [{ id: `tpl-${Date.now()}`, ...templateForm }, ...items]);
    setTemplateOpen(false);
  };

  return (
    <div className="grid gap-6">
      <div className="dialyatech-panel p-5">
        <span className="dialyatech-chip">{operationLabel} Interakt automation</span>
        <h1 className="mt-3 text-3xl font-black text-[#130d2e]">WhatsApp / Interakt Sales Center</h1>
        <p className="mt-2 max-w-4xl text-[#4b4469]">Send B2B and D2C template messages, manage sales reminder templates, review delivery logs, and prepare webhook automation without exposing real API keys in the frontend.</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-5">
        {quickActions.map(([label, note]) => (
          <button key={label} className="crm-card p-5 text-left hover:border-[#d8c9ff] hover:bg-[#f7f5fc]" onClick={() => actions.sendWhatsApp(visibleLeads.find((lead) => label === "Follow-up" || lead.type === label) || visibleLeads[0])} disabled={!visibleLeads.length}>
            <Send className="text-[#6b3fd4]" size={22} />
            <b className="mt-3 block text-[#130d2e]">{label}</b>
            <span className="text-sm text-[#4b4469]">{note}</span>
          </button>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="crm-card overflow-hidden">
          <div className="border-b border-[#ede6ff] p-5"><h2 className="font-black text-[#130d2e]">Message logs</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full text-left text-sm">
              <thead className="bg-[#f7f5fc] text-xs uppercase text-[#4b4469]"><tr><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Template</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Sent by</th><th className="px-4 py-3">Time</th></tr></thead>
              <tbody className="divide-y divide-[#ede6ff]">{visibleMessages.map((msg) => <tr key={msg.id}><td className="px-4 py-3 font-bold">{msg.leadName}</td><td className="px-4 py-3">{msg.template}</td><td className="px-4 py-3"><StatusBadge value={msg.status} /></td><td className="px-4 py-3">{msg.sentBy}</td><td className="px-4 py-3">{msg.sentAt}</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="crm-card p-5">
            <h2 className="font-black text-[#130d2e]">API settings</h2>
            <div className="mt-4 grid gap-3">
              <input className="crm-input" value={settings.whatsappBusinessNumber || ""} onChange={(e) => setSettings({ ...settings, whatsappBusinessNumber: e.target.value })} placeholder="WhatsApp business number" />
              <input className="crm-input" value={settings.webhookUrl || ""} onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })} placeholder="Webhook URL" />
              <div className="grid gap-3 rounded-2xl border border-[#ede6ff] bg-[#faf9fe] p-4 text-sm text-[#4b4469]">
                <div className="flex items-center gap-2"><KeyRound size={16} className="text-[#6b3fd4]" /> API key: <b>{interaktConfig.hasApiKey ? "Configured for local demo" : "Configure on backend env"}</b></div>
                <div className="flex items-center gap-2"><Webhook size={16} className="text-[#6b3fd4]" /> Base URL: <b>{interaktConfig.baseUrl}</b></div>
                <div className="flex items-center gap-2"><BellRing size={16} className="text-[#6b3fd4]" /> Sales reminder: <b>{settings.salesReminderCadence}</b></div>
              </div>
            </div>
          </div>

          <div className="crm-card p-5">
            <h2 className="font-black text-[#130d2e]">Template management</h2>
            <div className="mt-4 grid gap-3">
              <button className="crm-btn-primary" onClick={() => setTemplateOpen(true)}><Plus size={16} /> Add template</button>
              <div className="grid gap-2">{templates.map((tpl) => <div key={tpl.id} className="rounded-xl bg-[#faf9fe] p-3 text-sm"><b>{tpl.name}</b><p className="text-[#4b4469]">{tpl.code} · {tpl.category}</p></div>)}</div>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppTemplateForm open={templateOpen} onClose={() => setTemplateOpen(false)} onSave={addTemplate} />
    </div>
  );
}
