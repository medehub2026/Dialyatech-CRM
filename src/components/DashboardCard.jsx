export default function DashboardCard({ title, value, note, icon: Icon, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <article className="crm-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-slate-950">{value}</h3>
          {note ? <p className="mt-1 text-xs font-semibold text-slate-500">{note}</p> : null}
        </div>
        {Icon ? (
          <div className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>
            <Icon size={21} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
