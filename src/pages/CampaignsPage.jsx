import { Plus } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";

export default function CampaignsPage() {
  const { campaigns, addCampaign } = useCRMData();
  const [form, setForm] = useState({ name: "", audience: "Pharmacy", area: "Guwahati", status: "Draft" });
  const create = () => {
    if (!form.name) return;
    addCampaign(form);
    setForm({ name: "", audience: "Pharmacy", area: "Guwahati", status: "Draft" });
  };
  return (
    <div className="grid gap-6">
      <div><h1 className="text-3xl font-black text-slate-950">Campaign Management</h1><p className="mt-2 text-slate-500">Create targeted pharmacy, delivery partner, or B2B campaigns with delivery, reply, and conversion tracking.</p></div>
      <section className="crm-card p-5">
        <div className="grid gap-3 md:grid-cols-5">
          <input className="crm-input md:col-span-2" placeholder="Campaign name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="crm-input" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })}><option>Pharmacy</option><option>Delivery Partner</option><option>B2B Customer</option></select>
          <input className="crm-input" placeholder="Area" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
          <button className="crm-btn-primary" onClick={create}><Plus size={16} /> Create</button>
        </div>
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
    </div>
  );
}

function Metric({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><b className="text-xl text-slate-950">{value}</b></div>;
}
