import B2BCustomerLeadForm from "./B2BCustomerLeadForm";
import D2CCustomerLeadForm from "./D2CCustomerLeadForm";
import DeliveryPartnerLeadForm from "./DeliveryPartnerLeadForm";
import PharmacyLeadForm from "./PharmacyLeadForm";

export default function LeadFormRouter({ open, mode, lead, onClose, onSave }) {
  if (!open) return null;
  const type = lead?.type || "Pharmacy";
  const props = { open, mode, lead, onClose, onSave };
  if (type === "Delivery Partner") return <DeliveryPartnerLeadForm {...props} />;
  if (type === "B2B Customer") return <B2BCustomerLeadForm {...props} />;
  if (type === "D2C Customer") return <D2CCustomerLeadForm {...props} />;
  return <PharmacyLeadForm {...props} />;
}
