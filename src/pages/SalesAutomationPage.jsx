import { BellRing, CheckCircle2, Clock3, MessageSquare, Send, Zap } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useCRMData } from "../hooks/useCRMData";
import { isOverdue, isToday } from "../utils/calculations";

export default function SalesAutomationPage({ actions, setPage }) {
  const { leads, messages, settings, setSettings, toast } = useCRMData();
  const salesLeads = leads.filter((lead) => ["B2B Customer", "D2C Customer"].includes(lead.type));
  const dueNow = salesLeads.filter((lead) => isToday(lead.nextFollowUp) || isOverdue(lead.nextFollowUp));
  const upcoming = salesLeads.filter((lead) => lead.nextFollowUp && !isToday(lead.nextFollowUp) && !isOverdue(lead.nextFollowUp)).slice(0, 5);
  const replyCount = messages.filter((message) => message.status === "Replied").length;
  const automationEnabled = settings.interaktAutomationEnabled !== false;

  const update = (key, value) => setSettings({ ...settings, [key]: value });

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[1.6rem] bg-[#130d2e] p-6 text-white shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,79,174,0.3),transparent_18rem),radial-gradient(circle_at_90%_8%,rgba(62,201,214,0.22),transparent_16rem)]" />
        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#ede6ff]"><Zap size={14} /> Sales reminder automation</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight lg:text-5xl">Automate B2B and D2C sales follow-ups with Interakt-ready reminders.</h1>
            <p className="mt-3 max-w-3xl text-[#ede6ff]">Track due leads, send WhatsApp templates, schedule reminders, and keep reply logs ready for backend Interakt automation.</p>
          </div>
          <button className="crm-btn-primary shrink-0" onClick={() => setPage("whatsapp")}><MessageSquare size={16} /> Open Interakt center</button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["B2B + D2C leads", salesLeads.length, "Active sales records", Clock3],
          ["Due reminders", dueNow.length, "Today and overdue", BellRing],
          ["WhatsApp replies", replyCount, "Needs sales response", MessageSquare],
          ["Automation", automationEnabled ? "On" : "Off", "Interakt workflow", CheckCircle2],
        ].map(([title, value, note, Icon]) => (
          <article key={title} className="crm-card p-5">
            <Icon className="text-[#6b3fd4]" size={22} />
            <h2 className="mt-3 text-3xl font-black text-[#130d2e]">{value}</h2>
            <p className="mt-1 text-sm font-bold text-[#4b4469]">{title}</p>
            <p className="text-xs font-semibold text-[#4b4469]/70">{note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="crm-card overflow-hidden">
          <div className="border-b border-[#ede6ff] p-5">
            <h2 className="font-black text-[#130d2e]">Automatic sales reminder queue</h2>
            <p className="mt-1 text-sm text-[#4b4469]">Send Interakt template logs now; connect backend cron later for fully automatic dispatch.</p>
          </div>
          <div className="divide-y divide-[#ede6ff]">
            {dueNow.map((lead) => (
              <div key={lead.id} className="grid gap-3 p-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto] lg:items-center">
                <div>
                  <b className="text-[#130d2e]">{lead.name}</b>
                  <p className="text-sm text-[#4b4469]">{lead.type} · {lead.mobile} · {lead.area}, {lead.city}</p>
                </div>
                <StatusBadge value={lead.status} />
                <span className="text-sm font-bold text-[#4b4469]">Reminder: {lead.nextFollowUp || "Not set"}</span>
                <div className="flex gap-2">
                  <button className="crm-btn-soft px-3 py-2" onClick={() => actions.viewLead(lead)}>View</button>
                  <button className="crm-btn-primary px-3 py-2" onClick={() => actions.sendWhatsApp(lead)}><Send size={15} /> Send</button>
                </div>
              </div>
            ))}
            {!dueNow.length ? <div className="p-8 text-center text-sm font-bold text-[#4b4469]">No B2B or D2C sales reminders due right now.</div> : null}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="crm-card p-5">
            <h2 className="font-black text-[#130d2e]">Automation settings</h2>
            <div className="mt-4 grid gap-4">
              <label><span className="crm-label mb-1 block">Automation status</span><select className="crm-input" value={automationEnabled ? "On" : "Off"} onChange={(e) => update("interaktAutomationEnabled", e.target.value === "On")}><option>On</option><option>Off</option></select></label>
              <label><span className="crm-label mb-1 block">Reminder cadence</span><input className="crm-input" value={settings.salesReminderCadence || ""} onChange={(e) => update("salesReminderCadence", e.target.value)} /></label>
              <label><span className="crm-label mb-1 block">Daily reminder time</span><input className="crm-input" type="time" value={settings.reminderTime || "09:30"} onChange={(e) => update("reminderTime", e.target.value)} /></label>
              <button className="crm-btn-primary" onClick={() => toast("Sales automation settings saved")}><CheckCircle2 size={16} /> Save automation</button>
            </div>
          </div>
          <div className="crm-card p-5">
            <h2 className="font-black text-[#130d2e]">Upcoming sales follow-ups</h2>
            <div className="mt-4 grid gap-3">
              {upcoming.map((lead) => (
                <button key={lead.id} className="rounded-2xl border border-[#ede6ff] bg-[#faf9fe] p-3 text-left hover:border-[#d8c9ff]" onClick={() => actions.viewLead(lead)}>
                  <b>{lead.name}</b>
                  <p className="text-sm text-[#4b4469]">{lead.type} · {lead.nextFollowUp}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
