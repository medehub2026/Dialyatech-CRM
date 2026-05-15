import { Plus, Send } from "lucide-react";
import { useState } from "react";
import WhatsAppTemplateForm from "../components/forms/WhatsAppTemplateForm";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";
import { interaktConfig } from "../services/interaktService";

export default function WhatsAppPage({ actions }) {
  const { leads, messages, templates, setTemplates, settings, setSettings } = useCRMData();
  const [templateOpen, setTemplateOpen] = useState(false);

  const addTemplate = (templateForm) => {
    setTemplates((items) => [{ id: `tpl-${Date.now()}`, ...templateForm }, ...items]);
    setTemplateOpen(false);
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">WhatsApp / Interakt API Center</h1>
        <p className="mt-2 text-slate-500">Send template messages, manage templates, review logs, and configure secure environment-variable based API settings.</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-4">
        {["Pharmacy", "Delivery Partner", "B2B Customer", "Follow-up"].map((label) => (
          <button key={label} className="crm-card p-5 text-left hover:border-blue-300 hover:bg-blue-50" onClick={() => actions.sendWhatsApp(leads.find((lead) => label === "Follow-up" || lead.type === label) || leads[0])}>
            <Send className="text-green-600" size={22} />
            <b className="mt-3 block text-slate-950">Send {label} message</b>
            <span className="text-sm text-slate-500">Create a log with template status</span>
          </button>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="crm-card overflow-hidden">
          <div className="border-b border-slate-200 p-5"><h2 className="font-black text-slate-950">Message logs</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-[820px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Lead</th><th className="px-4 py-3">Template</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Sent by</th><th className="px-4 py-3">Time</th></tr></thead>
              <tbody className="divide-y divide-slate-100">{messages.map((msg) => <tr key={msg.id}><td className="px-4 py-3 font-bold">{msg.leadName}</td><td className="px-4 py-3">{msg.template}</td><td className="px-4 py-3"><StatusBadge value={msg.status} /></td><td className="px-4 py-3">{msg.sentBy}</td><td className="px-4 py-3">{msg.sentAt}</td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="crm-card p-5">
            <h2 className="font-black text-slate-950">API settings</h2>
            <div className="mt-4 grid gap-3">
              <input className="crm-input" value={settings.whatsappBusinessNumber || ""} onChange={(e) => setSettings({ ...settings, whatsappBusinessNumber: e.target.value })} placeholder="WhatsApp business number" />
              <input className="crm-input" value={settings.webhookUrl || ""} onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })} placeholder="Webhook URL" />
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                API key: <b>{interaktConfig.hasApiKey ? "Configured" : "Use VITE_INTERAKT_API_KEY"}</b><br />
                Base URL: <b>{interaktConfig.baseUrl}</b>
              </div>
            </div>
          </div>

          <div className="crm-card p-5">
            <h2 className="font-black text-slate-950">Template management</h2>
            <div className="mt-4 grid gap-3">
              <button className="crm-btn-primary" onClick={() => setTemplateOpen(true)}><Plus size={16} /> Add template</button>
              <div className="grid gap-2">{templates.map((tpl) => <div key={tpl.id} className="rounded-xl bg-slate-50 p-3 text-sm"><b>{tpl.name}</b><p className="text-slate-500">{tpl.code}</p></div>)}</div>
            </div>
          </div>
        </div>
      </section>
      <WhatsAppTemplateForm open={templateOpen} onClose={() => setTemplateOpen(false)} onSave={addTemplate} />
    </div>
  );
}
