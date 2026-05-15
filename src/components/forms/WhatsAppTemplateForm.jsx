import { useState } from "react";
import FormField from "./FormField";
import FormShell from "./FormShell";

export default function WhatsAppTemplateForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", code: "", category: "All", status: "Draft", body: "" });
  if (!open) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <FormShell title="WhatsApp Template" subtitle="Template manager for Interakt-approved message templates." onClose={onClose} onSubmit={(event) => { event.preventDefault(); onSave(form); }}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Template name"><input required className="crm-input" value={form.name} onChange={(e) => update("name", e.target.value)} /></FormField>
        <FormField label="Template ID / code"><input required className="crm-input" value={form.code} onChange={(e) => update("code", e.target.value)} /></FormField>
        <FormField label="Category"><select className="crm-input" value={form.category} onChange={(e) => update("category", e.target.value)}><option>All</option><option>Pharmacy</option><option>Delivery Partner</option><option>B2B Customer</option><option>Follow-up</option></select></FormField>
        <FormField label="Status"><select className="crm-input" value={form.status} onChange={(e) => update("status", e.target.value)}><option>Draft</option><option>Approved</option><option>Rejected</option></select></FormField>
        <FormField label="Message body" wide><textarea className="crm-input min-h-32" value={form.body} onChange={(e) => update("body", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
