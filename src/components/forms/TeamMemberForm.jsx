import { useState } from "react";
import { ROLES } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

export default function TeamMemberForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Sales Executive", targetLeads: 100 });
  if (!open) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <FormShell title="Team Member" subtitle="Create team profile, target, and role-based CRM access placeholder." onClose={onClose} onSubmit={(event) => { event.preventDefault(); onSave?.(form); onClose(); }}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Name"><input required className="crm-input" value={form.name} onChange={(e) => update("name", e.target.value)} /></FormField>
        <FormField label="Email"><input required type="email" className="crm-input" value={form.email} onChange={(e) => update("email", e.target.value)} /></FormField>
        <FormField label="Phone"><input pattern="[6-9][0-9]{9}" className="crm-input" value={form.phone} onChange={(e) => update("phone", e.target.value)} /></FormField>
        <FormField label="Role"><select className="crm-input" value={form.role} onChange={(e) => update("role", e.target.value)}>{ROLES.map((role) => <option key={role}>{role}</option>)}</select></FormField>
        <FormField label="Target leads"><input type="number" min="0" className="crm-input" value={form.targetLeads} onChange={(e) => update("targetLeads", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
