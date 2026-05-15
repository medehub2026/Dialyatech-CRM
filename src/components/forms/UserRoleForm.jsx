import { useState } from "react";
import { ROLES } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

export default function UserRoleForm({ open, onClose, onSave }) {
  const [form, setForm] = useState({ role: "Sales Executive", canCreate: true, canEdit: true, canDelete: false, canExport: false });
  if (!open) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <FormShell title="User / Role Permissions" subtitle="Role-based access control placeholder for production auth." onClose={onClose} onSubmit={(event) => { event.preventDefault(); onSave?.(form); onClose(); }}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Role"><select className="crm-input" value={form.role} onChange={(e) => update("role", e.target.value)}>{ROLES.map((role) => <option key={role}>{role}</option>)}</select></FormField>
        {["canCreate", "canEdit", "canDelete", "canExport"].map((key) => (
          <label key={key} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={form[key]} onChange={(e) => update(key, e.target.checked)} />
            {key.replace("can", "Can ")}
          </label>
        ))}
      </div>
    </FormShell>
  );
}
