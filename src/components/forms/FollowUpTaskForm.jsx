import { useState } from "react";
import { useCRMData } from "../../hooks/useCRMData";
import FormField from "./FormField";
import FormShell from "./FormShell";

export default function FollowUpTaskForm({ open, lead, onClose }) {
  const { toast } = useCRMData();
  const [form, setForm] = useState({ title: "Follow up with lead", description: "", dueDate: "", priority: "MEDIUM", assignedTo: lead?.assignedTo || "" });
  if (!open || !lead) return null;
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return (
    <FormShell title="Add Follow-up Task" subtitle={`${lead.name} · ${lead.type}`} onClose={onClose} onSubmit={(event) => { event.preventDefault(); toast("Follow-up task created"); onClose(); }}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Task title"><input required className="crm-input" value={form.title} onChange={(e) => update("title", e.target.value)} /></FormField>
        <FormField label="Due date"><input required type="datetime-local" className="crm-input" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} /></FormField>
        <FormField label="Priority"><select className="crm-input" value={form.priority} onChange={(e) => update("priority", e.target.value)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>HOT</option></select></FormField>
        <FormField label="Assigned to"><input className="crm-input" value={form.assignedTo} onChange={(e) => update("assignedTo", e.target.value)} /></FormField>
        <FormField label="Description" wide><textarea className="crm-input min-h-24" value={form.description} onChange={(e) => update("description", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
