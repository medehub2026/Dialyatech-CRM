import { Plus } from "lucide-react";
import { useState } from "react";
import CampaignForm from "../components/forms/CampaignForm";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";

export default function CampaignsPage() {
  const { campaigns, addCampaign } = useCRMData();
  const [formOpen, setFormOpen] = useState(false);
  const create = (campaign) => {
    addCampaign(campaign);
    setFormOpen(false);
  };
  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Campaign Management</h1><p className="mt-2 text-slate-500">Create targeted pharmacy, delivery partner, or B2B campaigns with delivery, reply, and conversion tracking.</p></div>
      <section className="crm-card flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
        <div><h2 className="font-black text-slate-950">Campaign console</h2><p className="text-sm text-slate-500">Create targeted area-wise campaigns with scheduling and template selection.</p></div>
        <button className="crm-btn-primary" onClick={() => setFormOpen(true)}><Plus size={16} /> Create campaign</button>
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <article key={campaign.id} className="crm-card p-5">
            <div className="flex items-start justify-between gap-3"><div><h2 className="font-black text-slate-950">{campaign.name}</h2><p className="text-sm text-slate-500">{campaign.audience} · {campaign.area}</p></div><StatusBadge value={campaign.status} /></div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Metric label="Sent" value={campaign.sent} />
              <Metric label="Delivered" value={campaign.delivered} />
              <Metric label="Replies" value={campaign.replies} />
              <Metric label="Conversions" value={campaign.conversions} />
            </div>
          </article>
        ))}
      </section>
      <CampaignForm open={formOpen} onClose={() => setFormOpen(false)} onSave={create} />
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><b className="text-xl text-slate-950">{value}</b></div>;
}
