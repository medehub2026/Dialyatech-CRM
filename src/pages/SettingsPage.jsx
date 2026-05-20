import { Save } from "lucide-react";
import { useState } from "react";
import UserRoleForm from "../components/forms/UserRoleForm";
import { useCRMData } from "../hooks/useCRMData";

export default function SettingsPage() {
  const { settings, setSettings, toast } = useCRMData();
  const [roleOpen, setRoleOpen] = useState(false);
  const update = (key, value) => setSettings({ ...settings, [key]: value });
  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Settings</h1><p className="mt-2 text-slate-500">Configure assignment rules, reminder times, WhatsApp integration, roles, and pipeline stages.</p></div>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="crm-card p-5">
          <h2 className="font-black text-[#130d2e]">CRM rules</h2>
          <div className="mt-4 grid gap-4">
            <label><span className="crm-label mb-1 block">Lead auto assignment rule</span><input className="crm-input" value={settings.autoAssignmentRule || ""} onChange={(e) => update("autoAssignmentRule", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Follow-up reminder time</span><input className="crm-input" type="time" value={settings.reminderTime || ""} onChange={(e) => update("reminderTime", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">B2B / D2C sales reminder cadence</span><input className="crm-input" value={settings.salesReminderCadence || ""} onChange={(e) => update("salesReminderCadence", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Interakt sales automation</span><select className="crm-input" value={settings.interaktAutomationEnabled !== false ? "Enabled" : "Disabled"} onChange={(e) => update("interaktAutomationEnabled", e.target.value === "Enabled")}><option>Enabled</option><option>Disabled</option></select></label>
            <label><span className="crm-label mb-1 block">User roles</span><input className="crm-input" value={(settings.roles || []).join(", ")} onChange={(e) => update("roles", e.target.value.split(",").map((item) => item.trim()))} /></label>
            <button className="crm-btn-soft w-fit" type="button" onClick={() => setRoleOpen(true)}>Configure role permissions</button>
          </div>
        </div>
        <div className="crm-card p-5">
          <h2 className="font-black text-[#130d2e]">WhatsApp API configuration</h2>
          <div className="mt-4 grid gap-4">
            <label><span className="crm-label mb-1 block">WhatsApp business number</span><input className="crm-input" value={settings.whatsappBusinessNumber || ""} onChange={(e) => update("whatsappBusinessNumber", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Webhook URL</span><input className="crm-input" value={settings.webhookUrl || ""} onChange={(e) => update("webhookUrl", e.target.value)} /></label>
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Never store real API keys in the browser. Put production secrets in backend environment variables: <b>INTERAKT_API_KEY</b>, <b>INTERAKT_BASE_URL</b>, and <b>INTERAKT_WEBHOOK_SECRET</b>.</div>
          </div>
        </div>
        <div className="crm-card p-5 xl:col-span-2">
          <h2 className="font-black text-slate-950">Pipeline stage configuration</h2>
          <input className="crm-input mt-4" value={(settings.pipelineStages || []).join(", ")} onChange={(e) => update("pipelineStages", e.target.value.split(",").map((item) => item.trim()))} />
        </div>
      </section>
      <button className="crm-btn-primary w-fit" onClick={() => toast("Settings saved")}><Save size={16} /> Save settings</button>
      <UserRoleForm open={roleOpen} onClose={() => setRoleOpen(false)} />
    </div>
  );
}
