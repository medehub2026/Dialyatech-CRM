import { Building2, ShoppingBag, Truck, UserRound, X } from "lucide-react";

const leadOptions = [
  {
    type: "B2B Customer",
    title: "B2B Sales Lead",
    note: "Hospital, clinic, diagnostic centre, wholesaler, corporate buyer",
    icon: Building2,
  },
  {
    type: "D2C Customer",
    title: "B2C / D2C Customer Lead",
    note: "Direct customer, home delivery, refill reminder, cart recovery",
    icon: UserRound,
  },
  {
    type: "Pharmacy",
    title: "Pharmacy Onboarding Lead",
    note: "Pharmacy partner onboarding, license, GST, KYC workflow",
    icon: ShoppingBag,
  },
  {
    type: "Delivery Partner",
    title: "Delivery Partner Lead",
    note: "Rider onboarding, vehicle, KYC, training and verification",
    icon: Truck,
  },
];

export default function LeadTypeChooser({ open, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#130d2e]/70 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-3xl rounded-[1.6rem] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[#ede6ff] pb-4">
          <div>
            <p className="dialyatech-chip">Select CRM form</p>
            <h2 className="mt-3 text-2xl font-black text-[#130d2e]">Create New Lead</h2>
            <p className="mt-1 text-sm text-[#4b4469]">Each CRM has a separate professional form and workflow.</p>
          </div>
          <button className="rounded-2xl p-2 text-[#4b4469] hover:bg-[#ede6ff]" onClick={onClose} title="Close"><X size={20} /></button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {leadOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button key={option.type} className="rounded-[1.25rem] border border-[#e5ddf7] bg-[#faf9fe] p-4 text-left transition hover:border-[#d8c9ff] hover:bg-[#f7f5fc]" onClick={() => onSelect(option.type)}>
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#ede6ff] text-[#6b3fd4]"><Icon size={20} /></div>
                  <div>
                    <b className="text-[#130d2e]">{option.title}</b>
                    <p className="mt-1 text-sm leading-5 text-[#4b4469]">{option.note}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
