import { useState } from "react";
import FormField from "./FormField";
import FormShell from "./FormShell";

export default function CampaignForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", audience: "Pharmacy", audienceType: "Pharmacy", city: "Guwahati", area: "", leadStatus: "Interested", templateName: "pharmacy_onboarding_pitch", scheduledAt: "", campaignGoal: "", remarks: "", status: "Draft" });
  if (!open) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value, ...(key === "audience" ? { audienceType: value } : {}) }));
  return (
    <FormShell title="Create WhatsApp Campaign" subtitle="Audience, location, lead status, template, schedule, goal, and tracking setup." onClose={onClose} onSubmit={(event) => { event.preventDefault(); onSave(form); }}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Campaign name"><input required className="crm-input" value={form.name} onChange={(e) => update("name", e.target.value)} /></FormField>
        <FormField label="Audience type"><select className="crm-input" value={form.audience} onChange={(e) => update("audience", e.target.value)}><option>Pharmacy</option><option>Delivery Partner</option><option>B2B Customer</option></select></FormField>
        <FormField label="City"><input className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></FormField>
        <FormField label="Area"><input className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></FormField>
        <FormField label="Lead status"><input className="crm-input" value={form.leadStatus} onChange={(e) => update("leadStatus", e.target.value)} /></FormField>
        <FormField label="WhatsApp template"><input required className="crm-input" value={form.templateName} onChange={(e) => update("templateName", e.target.value)} /></FormField>
        <FormField label="Schedule date/time"><input type="datetime-local" className="crm-input" value={form.scheduledAt} onChange={(e) => update("scheduledAt", e.target.value)} /></FormField>
        <FormField label="Campaign goal"><input className="crm-input" value={form.campaignGoal} onChange={(e) => update("campaignGoal", e.target.value)} /></FormField>
        <FormField label="Remarks" wide><textarea className="crm-input min-h-24" value={form.remarks} onChange={(e) => update("remarks", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
