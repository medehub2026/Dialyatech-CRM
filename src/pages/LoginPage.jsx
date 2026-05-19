import { CheckCircle2, DatabaseZap, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { ROLES } from "../data/demoData";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ name: "Medehub Admin", email: "admin@medehub.in", role: "Admin" });
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onLogin({ ...form, password });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };
  return (
    <div className="grid min-h-screen bg-[#130d2e] lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative flex items-center overflow-hidden p-8 text-white lg:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,174,0.34),transparent_22rem),radial-gradient(circle_at_82%_8%,rgba(62,201,214,0.24),transparent_18rem),linear-gradient(135deg,rgba(107,63,212,0.35),transparent_55%)]" />
        <div className="relative max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 font-bold"><ShieldCheck size={20} /> DIALYATECH ERP style workspace</div>
          <h1 className="text-4xl font-black tracking-tight lg:text-6xl">Medehub CRM command desk</h1>
          <p className="mt-5 text-lg leading-8 text-[#ede6ff]">Professional cloud CRM for pharmacy onboarding, delivery partners, B2B customers, WhatsApp campaigns, follow-ups, and team performance.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [Sparkles, "Corporate SaaS UI"],
              [DatabaseZap, "Backend API ready"],
              [CheckCircle2, "Persistent workflow"],
            ].map(([Icon, text]) => (
              <div key={text} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <Icon size={20} className="text-[#3ec9d6]" />
                <p className="mt-3 text-sm font-black">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center bg-[#f7f5fc] p-6">
        <form className="crm-card w-full max-w-md p-6" onSubmit={submit}>
          <div className="mb-5 flex items-center gap-3">
            <div className="dialyatech-brand-mark h-12 w-12 font-black">D</div>
            <div>
              <h2 className="text-2xl font-black text-[#130d2e]">Login</h2>
              <p className="text-sm font-semibold text-[#4b4469]">Authentication-ready CRM access</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <label><span className="crm-label mb-1 block">Name</span><input className="crm-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label><span className="crm-label mb-1 block">Email</span><input className="crm-input" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
            <label><span className="crm-label mb-1 block">Password</span><input className="crm-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
            <label><span className="crm-label mb-1 block">Role</span><select className="crm-input" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>{ROLES.map((role) => <option key={role}>{role}</option>)}</select></label>
            {error ? <div className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</div> : null}
            <button className="crm-btn-primary">Enter CRM</button>
          </div>
        </form>
      </section>
    </div>
  );
}
