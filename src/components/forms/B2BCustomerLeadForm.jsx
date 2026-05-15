import { useEffect, useState } from "react";
import { teamMembers } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

const empty = { type: "B2B Customer", businessName: "", name: "", contactPerson: "", ownerName: "", mobile: "", whatsappNumber: "", whatsapp: "", email: "", businessType: "Hospital", city: "Guwahati", area: "", address: "", requirementType: "", expectedMonthlyPurchase: "", dealValue: "", quotationStatus: "Not Sent", negotiationStage: "New", leadSource: "Outbound", assignedTo: "Rahul Sharma", nextFollowUpDate: "", nextFollowUp: "", remarks: "", status: "New" };

export default function B2BCustomerLeadForm({ open, mode, lead, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  useEffect(() => setForm(open ? { ...empty, ...lead, businessName: lead?.businessName || lead?.name || "", contactPerson: lead?.contactPerson || lead?.ownerName || "", businessType: lead?.businessType || lead?.customerCategory || "Hospital", whatsappNumber: lead?.whatsappNumber || lead?.whatsapp || "", nextFollowUpDate: lead?.nextFollowUpDate || lead?.nextFollowUp || "" } : empty), [open, lead]);
  if (!open) return null;
  const readonly = mode === "view";
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, type: "B2B Customer", name: form.businessName, ownerName: form.contactPerson, customerCategory: form.businessType, whatsapp: form.whatsappNumber, nextFollowUp: form.nextFollowUpDate, quotationSent: form.quotationStatus, negotiationStatus: form.negotiationStage });
  };
  return (
    <FormShell title={mode === "view" ? "B2B Customer Details" : mode === "edit" ? "Edit B2B Sales Lead" : "Add B2B Sales Lead"} subtitle="Deal value, requirement, quotation, negotiation, sales owner, and follow-up workflow." onClose={onClose} onSubmit={submit} readonly={readonly}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Business name"><input required disabled={readonly} className="crm-input" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} /></FormField>
        <FormField label="Contact person"><input required disabled={readonly} className="crm-input" value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} /></FormField>
        <FormField label="Mobile"><input required pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></FormField>
        <FormField label="WhatsApp number"><input pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} /></FormField>
        <FormField label="Email"><input type="email" disabled={readonly} className="crm-input" value={form.email || ""} onChange={(e) => update("email", e.target.value)} /></FormField>
        <FormField label="Business type"><select disabled={readonly} className="crm-input" value={form.businessType} onChange={(e) => update("businessType", e.target.value)}><option>Hospital</option><option>Clinic</option><option>Nursing Home</option><option>Diagnostic Centre</option><option>Pharmacy</option><option>Wholesaler</option><option>Corporate</option></select></FormField>
        <FormField label="City"><input required disabled={readonly} className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></FormField>
        <FormField label="Area"><input required disabled={readonly} className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></FormField>
        <FormField label="Address" wide><textarea disabled={readonly} className="crm-input min-h-20" value={form.address || ""} onChange={(e) => update("address", e.target.value)} /></FormField>
        <FormField label="Requirement type"><input disabled={readonly} className="crm-input" value={form.requirementType || ""} onChange={(e) => update("requirementType", e.target.value)} /></FormField>
        <FormField label="Expected monthly purchase"><input type="number" min="0" disabled={readonly} className="crm-input" value={form.expectedMonthlyPurchase || ""} onChange={(e) => update("expectedMonthlyPurchase", e.target.value)} /></FormField>
        <FormField label="Deal value"><input type="number" min="0" disabled={readonly} className="crm-input" value={form.dealValue || ""} onChange={(e) => update("dealValue", e.target.value)} /></FormField>
        <FormField label="Quotation status"><select disabled={readonly} className="crm-input" value={form.quotationStatus} onChange={(e) => update("quotationStatus", e.target.value)}><option>Not Sent</option><option>Sent</option><option>Revised</option><option>Accepted</option></select></FormField>
        <FormField label="Negotiation stage"><select disabled={readonly} className="crm-input" value={form.negotiationStage} onChange={(e) => update("negotiationStage", e.target.value)}><option>New</option><option>Price discussion</option><option>Legal review</option><option>Closed won</option><option>Closed lost</option></select></FormField>
        <FormField label="Lead source"><input disabled={readonly} className="crm-input" value={form.leadSource || ""} onChange={(e) => update("leadSource", e.target.value)} /></FormField>
        <FormField label="Assigned to"><select disabled={readonly} className="crm-input" value={form.assignedTo || ""} onChange={(e) => update("assignedTo", e.target.value)}>{teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}</select></FormField>
        <FormField label="Next follow-up"><input type="date" disabled={readonly} className="crm-input" value={(form.nextFollowUpDate || "").slice(0, 10)} onChange={(e) => update("nextFollowUpDate", e.target.value)} /></FormField>
        <FormField label="Remarks" wide><textarea disabled={readonly} className="crm-input min-h-24" value={form.remarks || ""} onChange={(e) => update("remarks", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
