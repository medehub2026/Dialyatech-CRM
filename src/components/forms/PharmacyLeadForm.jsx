import { useEffect, useState } from "react";
import { teamMembers } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

const empty = {
  type: "Pharmacy",
  pharmacyName: "",
  name: "",
  ownerName: "",
  mobile: "",
  whatsappNumber: "",
  whatsapp: "",
  email: "",
  city: "Guwahati",
  area: "",
  address: "",
  pincode: "",
  drugLicenseNumber: "",
  drugLicenseStatus: "Pending",
  gstNumber: "",
  gstStatus: "Pending",
  currentBusinessType: "Retail Pharmacy",
  monthlyOrderPotential: "",
  leadSource: "Field Visit",
  leadPriority: "MEDIUM",
  assignedTo: "Rahul Sharma",
  nextFollowUpDate: "",
  nextFollowUp: "",
  remarks: "",
  status: "New",
};

export default function PharmacyLeadForm({ open, mode, lead, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  useEffect(() => setForm(open ? { ...empty, ...lead, pharmacyName: lead?.pharmacyName || lead?.name || "", whatsappNumber: lead?.whatsappNumber || lead?.whatsapp || "", nextFollowUpDate: lead?.nextFollowUpDate || lead?.nextFollowUp || "" } : empty), [open, lead]);
  if (!open) return null;
  const readonly = mode === "view";
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, type: "Pharmacy", name: form.pharmacyName, whatsapp: form.whatsappNumber, nextFollowUp: form.nextFollowUpDate });
  };
  return (
    <FormShell title={mode === "view" ? "Pharmacy Lead Details" : mode === "edit" ? "Edit Pharmacy Lead" : "Add Pharmacy Lead"} subtitle="Pharmacy onboarding, compliance, potential, assignment, and follow-up workflow." onClose={onClose} onSubmit={submit} readonly={readonly}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Pharmacy name"><input required disabled={readonly} className="crm-input" value={form.pharmacyName} onChange={(e) => update("pharmacyName", e.target.value)} /></FormField>
        <FormField label="Owner name"><input required disabled={readonly} className="crm-input" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} /></FormField>
        <FormField label="Mobile"><input required pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></FormField>
        <FormField label="WhatsApp number"><input pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} /></FormField>
        <FormField label="Email"><input type="email" disabled={readonly} className="crm-input" value={form.email || ""} onChange={(e) => update("email", e.target.value)} /></FormField>
        <FormField label="City"><input required disabled={readonly} className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></FormField>
        <FormField label="Area"><input required disabled={readonly} className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></FormField>
        <FormField label="PIN code"><input disabled={readonly} className="crm-input" value={form.pincode || ""} onChange={(e) => update("pincode", e.target.value)} /></FormField>
        <FormField label="Full address" wide><textarea disabled={readonly} className="crm-input min-h-20" value={form.address || ""} onChange={(e) => update("address", e.target.value)} /></FormField>
        <FormField label="Drug license number"><input disabled={readonly} className="crm-input" value={form.drugLicenseNumber || ""} onChange={(e) => update("drugLicenseNumber", e.target.value)} /></FormField>
        <FormField label="Drug license status"><select disabled={readonly} className="crm-input" value={form.drugLicenseStatus} onChange={(e) => update("drugLicenseStatus", e.target.value)}><option>Pending</option><option>Valid</option><option>Expired</option><option>Rejected</option></select></FormField>
        <FormField label="GST number"><input disabled={readonly} className="crm-input" value={form.gstNumber || ""} onChange={(e) => update("gstNumber", e.target.value)} /></FormField>
        <FormField label="GST status"><select disabled={readonly} className="crm-input" value={form.gstStatus} onChange={(e) => update("gstStatus", e.target.value)}><option>Pending</option><option>Available</option><option>Not Available</option></select></FormField>
        <FormField label="Current business type"><input disabled={readonly} className="crm-input" value={form.currentBusinessType || ""} onChange={(e) => update("currentBusinessType", e.target.value)} /></FormField>
        <FormField label="Monthly order potential"><input type="number" min="0" disabled={readonly} className="crm-input" value={form.monthlyOrderPotential || ""} onChange={(e) => update("monthlyOrderPotential", e.target.value)} /></FormField>
        <FormField label="Lead source"><input disabled={readonly} className="crm-input" value={form.leadSource || ""} onChange={(e) => update("leadSource", e.target.value)} /></FormField>
        <FormField label="Priority"><select disabled={readonly} className="crm-input" value={form.leadPriority} onChange={(e) => update("leadPriority", e.target.value)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>HOT</option></select></FormField>
        <FormField label="Assigned to"><select disabled={readonly} className="crm-input" value={form.assignedTo || ""} onChange={(e) => update("assignedTo", e.target.value)}>{teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}</select></FormField>
        <FormField label="Next follow-up"><input type="date" disabled={readonly} className="crm-input" value={(form.nextFollowUpDate || "").slice(0, 10)} onChange={(e) => update("nextFollowUpDate", e.target.value)} /></FormField>
        <FormField label="Remarks" wide><textarea disabled={readonly} className="crm-input min-h-24" value={form.remarks || ""} onChange={(e) => update("remarks", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
