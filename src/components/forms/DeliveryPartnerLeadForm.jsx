import { useEffect, useState } from "react";
import { teamMembers } from "../../data/demoData";
import FormField from "./FormField";
import FormShell from "./FormShell";

const empty = { type: "Delivery Partner", fullName: "", name: "", mobile: "", whatsappNumber: "", whatsapp: "", city: "Guwahati", area: "", address: "", vehicleType: "Bike", vehicleNumber: "", drivingLicenseNumber: "", drivingLicenseStatus: "Pending", aadhaarStatus: "Pending", policeVerificationStatus: "Not Started", trainingStatus: "Not Started", preferredWorkingTime: "Full day", assignedTo: "Rahul Sharma", nextFollowUpDate: "", nextFollowUp: "", remarks: "", status: "New" };

export default function DeliveryPartnerLeadForm({ open, mode, lead, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  useEffect(() => setForm(open ? { ...empty, ...lead, fullName: lead?.fullName || lead?.name || "", whatsappNumber: lead?.whatsappNumber || lead?.whatsapp || "", nextFollowUpDate: lead?.nextFollowUpDate || lead?.nextFollowUp || "" } : empty), [open, lead]);
  if (!open) return null;
  const readonly = mode === "view";
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({ ...form, type: "Delivery Partner", name: form.fullName, ownerName: form.fullName, whatsapp: form.whatsappNumber, nextFollowUp: form.nextFollowUpDate });
  };
  return (
    <FormShell title={mode === "view" ? "Delivery Partner Details" : mode === "edit" ? "Edit Delivery Partner Lead" : "Add Delivery Partner Lead"} subtitle="Rider onboarding, vehicle, KYC, police verification, training, and follow-up workflow." onClose={onClose} onSubmit={submit} readonly={readonly}>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <FormField label="Full name"><input required disabled={readonly} className="crm-input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} /></FormField>
        <FormField label="Mobile"><input required pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></FormField>
        <FormField label="WhatsApp number"><input pattern="[6-9][0-9]{9}" disabled={readonly} className="crm-input" value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} /></FormField>
        <FormField label="City"><input required disabled={readonly} className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></FormField>
        <FormField label="Area"><input required disabled={readonly} className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></FormField>
        <FormField label="Full address"><input disabled={readonly} className="crm-input" value={form.address || ""} onChange={(e) => update("address", e.target.value)} /></FormField>
        <FormField label="Vehicle type"><select disabled={readonly} className="crm-input" value={form.vehicleType} onChange={(e) => update("vehicleType", e.target.value)}><option>Bike</option><option>Scooter</option><option>Cycle</option><option>Car</option></select></FormField>
        <FormField label="Vehicle number"><input disabled={readonly} className="crm-input" value={form.vehicleNumber || ""} onChange={(e) => update("vehicleNumber", e.target.value)} /></FormField>
        <FormField label="Driving license number"><input disabled={readonly} className="crm-input" value={form.drivingLicenseNumber || ""} onChange={(e) => update("drivingLicenseNumber", e.target.value)} /></FormField>
        <FormField label="Driving license status"><select disabled={readonly} className="crm-input" value={form.drivingLicenseStatus} onChange={(e) => update("drivingLicenseStatus", e.target.value)}><option>Pending</option><option>Verified</option><option>Rejected</option></select></FormField>
        <FormField label="Aadhaar status"><select disabled={readonly} className="crm-input" value={form.aadhaarStatus} onChange={(e) => update("aadhaarStatus", e.target.value)}><option>Pending</option><option>Verified</option><option>Rejected</option></select></FormField>
        <FormField label="Police verification"><select disabled={readonly} className="crm-input" value={form.policeVerificationStatus} onChange={(e) => update("policeVerificationStatus", e.target.value)}><option>Not Started</option><option>Pending</option><option>Verified</option><option>Rejected</option></select></FormField>
        <FormField label="Training status"><select disabled={readonly} className="crm-input" value={form.trainingStatus} onChange={(e) => update("trainingStatus", e.target.value)}><option>Not Started</option><option>Scheduled</option><option>Completed</option></select></FormField>
        <FormField label="Preferred working time"><input disabled={readonly} className="crm-input" value={form.preferredWorkingTime || ""} onChange={(e) => update("preferredWorkingTime", e.target.value)} /></FormField>
        <FormField label="Assigned to"><select disabled={readonly} className="crm-input" value={form.assignedTo || ""} onChange={(e) => update("assignedTo", e.target.value)}>{teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}</select></FormField>
        <FormField label="Next follow-up"><input type="date" disabled={readonly} className="crm-input" value={(form.nextFollowUpDate || "").slice(0, 10)} onChange={(e) => update("nextFollowUpDate", e.target.value)} /></FormField>
        <FormField label="Remarks" wide><textarea disabled={readonly} className="crm-input min-h-24" value={form.remarks || ""} onChange={(e) => update("remarks", e.target.value)} /></FormField>
      </div>
    </FormShell>
  );
}
