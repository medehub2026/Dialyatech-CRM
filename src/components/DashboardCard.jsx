export default function DashboardCard({ title, value, note, icon: Icon, tone = "blue" }) {
  const tones = {
    blue: "bg-[#ede6ff] text-[#6b3fd4]",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-[#f7f5fc] text-[#4b4469]",
  };

  return (
    <article className="crm-card p-5 transition hover:-translate-y-0.5 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#4b4469]">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-[#130d2e]">{value}</h3>
          {note ? <p className="mt-1 text-xs font-semibold text-[#4b4469]/80">{note}</p> : null}
        </div>
        {Icon ? (
          <div className={`grid h-11 w-11 place-items-center rounded-2xl ${tones[tone]}`}>
            <Icon size={21} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
