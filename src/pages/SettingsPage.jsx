import { Save } from "lucide-react";
import { useCRMData } from "../hooks/useCRMData";

export default function SettingsPage() {
  const { settings, setSettings, toast } = useCRMData();
  const update = (key, value) => setSettings({ ...settings, [key]: value });
  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Settings</h1><p className="mt-2 text-slate-500">Configure assignment rules, reminder times, WhatsApp integration, roles, and pipeline stages.</p></div>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="crm-card p-5">
          <h2 className="font-black text-slate-950">CRM rules</h2>
          <div className="mt-4 grid gap-4">
            <label><span className="crm-label mb-1 block">Lead auto assignment rule</span><input className="crm-input" value={settings.autoAssignmentRule || ""} onChange={(e) => update("autoAssignmentRule", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Follow-up reminder time</span><input className="crm-input" type="time" value={settings.reminderTime || ""} onChange={(e) => update("reminderTime", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">User roles</span><input className="crm-input" value={(settings.roles || []).join(", ")} onChange={(e) => update("roles", e.target.value.split(",").map((item) => item.trim()))} /></label>
          </div>
        </div>
        <div className="crm-card p-5">
          <h2 className="font-black text-slate-950">WhatsApp API configuration</h2>
          <div className="mt-4 grid gap-4">
            <label><span className="crm-label mb-1 block">WhatsApp business number</span><input className="crm-input" value={settings.whatsappBusinessNumber || ""} onChange={(e) => update("whatsappBusinessNumber", e.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Webhook URL</span><input className="crm-input" value={settings.webhookUrl || ""} onChange={(e) => update("webhookUrl", e.target.value)} /></label>
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">Never store real API keys in the browser. Use <b>VITE_INTERAKT_API_KEY</b> only for local/demo builds and move secrets to a backend before production.</div>
          </div>
        </div>
        <div className="crm-card p-5 xl:col-span-2">
          <h2 className="font-black text-slate-950">Pipeline stage configuration</h2>
          <input className="crm-input mt-4" value={(settings.pipelineStages || []).join(", ")} onChange={(e) => update("pipelineStages", e.target.value.split(",").map((item) => item.trim()))} />
        </div>
      </section>
      <button className="crm-btn-primary w-fit" onClick={() => toast("Settings saved")}><Save size={16} /> Save settings</button>
    </div>
  );
}
