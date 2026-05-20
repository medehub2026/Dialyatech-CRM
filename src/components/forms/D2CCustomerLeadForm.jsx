import { useEffect, useState } from "react";
import { teamMembers } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

const empty = {
  type: "D2C Customer",
  customerName: "",
  name: "",
  mobile: "",
  whatsappNumber: "",
  whatsapp: "",
  email: "",
  city: "Guwahati",
  area: "",
  address: "",
  customerCategory: "Home Delivery",
  requirementType: "",
  expectedOrderValue: "",
  lastOrderValue: "",
  purchaseIntent: "Medium",
  leadSource: "Website",
  reminderOptIn: "Yes",
  assignedTo: "Rahul Sharma",
  nextFollowUpDate: "",
  nextFollowUp: "",
  remarks: "",
  status: "New",
};

export default function D2CCustomerLeadForm({ open, mode, lead, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  useEffect(() => {
    setForm(open ? {
      ...empty,
      ...lead,
      customerName: lead?.customerName || lead?.ownerName || lead?.name || "",
      whatsappNumber: lead?.whatsappNumber || lead?.whatsapp || "",
      nextFollowUpDate: lead?.nextFollowUpDate || lead?.nextFollowUp || "",
      expectedOrderValue: lead?.expectedOrderValue || lead?.dealValue || "",
    } : empty);
  }, [open, lead]);
  if (!open) return null;

  const readonly = mode === "view";
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      type: "D2C Customer",
      name: form.customerName,
      ownerName: form.customerName,
      whatsapp: form.whatsappNumber,
      nextFollowUp: form.nextFollowUpDate,
      dealValue: form.expectedOrderValue,
    });
  };

  return (
    <FormShell title={mode === "view" ? "B2C Customer Details" : mode === "edit" ? "Edit B2C Lead" : "Add B2C / D2C Sales Lead"} subtitle="Consumer lead, purchase intent, order value, refill reminder, WhatsApp opt-in, and follow-up workflow." onClose={onClose} onSubmit={submit} readonly={readonly}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Customer name"><input required disabled={readonly} className="crm-input" value={form.customerName} onChange={(e) => update("customerName", e.target.value)} /></FormField>
        <FormField label="Mobile"><input required pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></FormField>
        <FormField label="WhatsApp number"><input pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} /></FormField>
        <FormField label="Email"><input type="email" disabled={readonly} className="crm-input" value={form.email || ""} onChange={(e) => update("email", e.target.value)} /></FormField>
        <FormField label="City"><input required disabled={readonly} className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></FormField>
        <FormField label="Area"><input required disabled={readonly} className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></FormField>
        <FormField label="Address" wide><textarea disabled={readonly} className="crm-input min-h-20" value={form.address || ""} onChange={(e) => update("address", e.target.value)} /></FormField>
        <FormField label="Customer category"><select disabled={readonly} className="crm-input" value={form.customerCategory} onChange={(e) => update("customerCategory", e.target.value)}><option>Home Delivery</option><option>Chronic Care</option><option>Subscription</option><option>One-time Buyer</option><option>High Value Customer</option><option>Cart Recovery</option></select></FormField>
        <FormField label="Requirement type"><input disabled={readonly} className="crm-input" value={form.requirementType || ""} onChange={(e) => update("requirementType", e.target.value)} /></FormField>
        <FormField label="Expected order value"><input type="number" min="0" disabled={readonly} className="crm-input" value={form.expectedOrderValue || ""} onChange={(e) => update("expectedOrderValue", e.target.value)} /></FormField>
        <FormField label="Last order value"><input type="number" min="0" disabled={readonly} className="crm-input" value={form.lastOrderValue || ""} onChange={(e) => update("lastOrderValue", e.target.value)} /></FormField>
        <FormField label="Purchase intent"><select disabled={readonly} className="crm-input" value={form.purchaseIntent} onChange={(e) => update("purchaseIntent", e.target.value)}><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select></FormField>
        <FormField label="Lead source"><select disabled={readonly} className="crm-input" value={form.leadSource || ""} onChange={(e) => update("leadSource", e.target.value)}><option>Website</option><option>WhatsApp Campaign</option><option>Phone Call</option><option>Referral</option><option>Repeat Order</option><option>Social Media</option></select></FormField>
        <FormField label="Reminder opt-in"><select disabled={readonly} className="crm-input" value={form.reminderOptIn || "Yes"} onChange={(e) => update("reminderOptIn", e.target.value)}><option>Yes</option><option>No</option></select></FormField>
        <FormField label="Assigned to"><select disabled={readonly} className="crm-input" value={form.assignedTo || ""} onChange={(e) => update("assignedTo", e.target.value)}>{teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}</select></FormField>
        <FormField label="Next sales reminder"><input type="date" disabled={readonly} className="crm-input" value={(form.nextFollowUpDate || "").slice(0, 10)} onChange={(e) => update("nextFollowUpDate", e.target.value)} /></FormField>
        <FormField label="Remarks" wide><textarea disabled={readonly} className="crm-input min-h-24" value={form.remarks || ""} onChange={(e) => update("remarks", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
