import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { LEAD_STATUSES, LEAD_TYPES, teamMembers } from "../data/demoData";

const emptyLead = {
  type: "Pharmacy",
  name: "",
  ownerName: "",
  mobile: "",
  whatsapp: "",
  area: "",
  city: "Guwahati",
  status: "New",
  assignedTo: "Rahul Sharma",
  remarks: "",
  nextFollowUp: "",
  drugLicenseStatus: "Pending",
  gstStatus: "Pending",
  vehicleType: "Bike",
  drivingLicenseStatus: "Pending",
  policeVerificationStatus: "Not Started",
  trainingStatus: "Not Started",
  customerCategory: "Hospital",
  dealValue: "",
  requirementType: "",
  quotationSent: "No",
  negotiationStatus: "Not Started",
  lostReason: "",
};

export default function LeadModal({ open, mode = "create", lead, onClose, onSave }) {
  const [form, setForm] = useState(emptyLead);

  useEffect(() => {
    setForm(open ? { ...emptyLead, ...lead } : emptyLead);
  }, [open, lead]);

  if (!open) return null;
  const readonly = mode === "view";
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const save = (event) => {
    event.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <form onSubmit={save} className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-black text-slate-950">{mode === "create" ? "Create Lead" : mode === "view" ? "Lead Details" : "Edit Lead"}</h2>
            <p className="text-sm text-slate-500">Structured for future backend CRM connection.</p>
          </div>
          <button type="button" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={onClose}><X size={20} /></button>
        </header>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          <Field label="Lead type"><select disabled={readonly} className="crm-input" value={form.type} onChange={(e) => update("type", e.target.value)}>{LEAD_TYPES.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label="Status"><select disabled={readonly} className="crm-input" value={form.status} onChange={(e) => update("status", e.target.value)}>{LEAD_STATUSES.map((item) => <option key={item}>{item}</option>)}</select></Field>
          <Field label={form.type === "Pharmacy" ? "Pharmacy name" : form.type === "Delivery Partner" ? "Rider / partner name" : "Customer name"}><input disabled={readonly} required className="crm-input" value={form.name} onChange={(e) => update("name", e.target.value)} /></Field>
          <Field label="Owner / contact person"><input disabled={readonly} className="crm-input" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} /></Field>
          <Field label="Mobile"><input disabled={readonly} required className="crm-input" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} /></Field>
          <Field label="WhatsApp number"><input disabled={readonly} className="crm-input" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} /></Field>
          <Field label="Area"><input disabled={readonly} className="crm-input" value={form.area} onChange={(e) => update("area", e.target.value)} /></Field>
          <Field label="City"><input disabled={readonly} className="crm-input" value={form.city} onChange={(e) => update("city", e.target.value)} /></Field>
          <Field label="Assigned executive"><select disabled={readonly} className="crm-input" value={form.assignedTo} onChange={(e) => update("assignedTo", e.target.value)}>{teamMembers.map((member) => <option key={member.id}>{member.name}</option>)}</select></Field>
          <Field label="Next follow-up date"><input disabled={readonly} className="crm-input" type="date" value={form.nextFollowUp || ""} onChange={(e) => update("nextFollowUp", e.target.value)} /></Field>

          {form.type === "Pharmacy" ? (
            <>
              <Field label="Drug license status"><select disabled={readonly} className="crm-input" value={form.drugLicenseStatus} onChange={(e) => update("drugLicenseStatus", e.target.value)}><option>Pending</option><option>Valid</option><option>Expired</option><option>Not Available</option></select></Field>
              <Field label="GST status"><select disabled={readonly} className="crm-input" value={form.gstStatus} onChange={(e) => update("gstStatus", e.target.value)}><option>Pending</option><option>Available</option><option>Not Available</option></select></Field>
            </>
          ) : null}

          {form.type === "Delivery Partner" ? (
            <>
              <Field label="Vehicle type"><select disabled={readonly} className="crm-input" value={form.vehicleType} onChange={(e) => update("vehicleType", e.target.value)}><option>Bike</option><option>Scooter</option><option>Cycle</option><option>Car</option></select></Field>
              <Field label="Driving license status"><select disabled={readonly} className="crm-input" value={form.drivingLicenseStatus} onChange={(e) => update("drivingLicenseStatus", e.target.value)}><option>Pending</option><option>Verified</option><option>Rejected</option></select></Field>
              <Field label="Police verification"><select disabled={readonly} className="crm-input" value={form.policeVerificationStatus} onChange={(e) => update("policeVerificationStatus", e.target.value)}><option>Not Started</option><option>Pending</option><option>Verified</option><option>Rejected</option></select></Field>
              <Field label="Training status"><select disabled={readonly} className="crm-input" value={form.trainingStatus} onChange={(e) => update("trainingStatus", e.target.value)}><option>Not Started</option><option>Scheduled</option><option>Completed</option></select></Field>
            </>
          ) : null}

          {form.type === "B2B Customer" ? (
            <>
              <Field label="Customer category"><select disabled={readonly} className="crm-input" value={form.customerCategory} onChange={(e) => update("customerCategory", e.target.value)}><option>Hospital</option><option>Clinic</option><option>Nursing Home</option><option>Diagnostic Centre</option><option>Pharmacy</option><option>Wholesaler</option></select></Field>
              <Field label="Deal value"><input disabled={readonly} className="crm-input" type="number" value={form.dealValue || ""} onChange={(e) => update("dealValue", e.target.value)} /></Field>
              <Field label="Requirement type"><input disabled={readonly} className="crm-input" value={form.requirementType || ""} onChange={(e) => update("requirementType", e.target.value)} /></Field>
              <Field label="Quotation sent"><select disabled={readonly} className="crm-input" value={form.quotationSent} onChange={(e) => update("quotationSent", e.target.value)}><option>No</option><option>Yes</option></select></Field>
              <Field label="Negotiation status"><input disabled={readonly} className="crm-input" value={form.negotiationStatus || ""} onChange={(e) => update("negotiationStatus", e.target.value)} /></Field>
              <Field label="Converted / lost reason"><input disabled={readonly} className="crm-input" value={form.lostReason || ""} onChange={(e) => update("lostReason", e.target.value)} /></Field>
            </>
          ) : null}

          <Field label="Remarks" wide><textarea disabled={readonly} className="crm-input min-h-28" value={form.remarks} onChange={(e) => update("remarks", e.target.value)} /></Field>
        </div>
        <footer className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:justify-end">
          <button type="button" className="crm-btn-soft" onClick={onClose}>Close</button>
          {!readonly ? <button type="submit" className="crm-btn-primary">Save Lead</button> : null}
        </footer>
      </form>
    </div>
  );
}

function Field({ label, children, wide }) {
  return <label className={wide ? "md:col-span-2" : ""}><span className="crm-label mb-1 block">{label}</span>{children}</label>;
}
