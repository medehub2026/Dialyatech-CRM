import { ShieldCheck } from "lucide-react";
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
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex items-center p-8 text-white lg:p-14">
        <div className="max-w-2xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 font-bold"><ShieldCheck size={20} /> Secure-ready CRM workspace</div>
          <h1 className="text-4xl font-black tracking-tight lg:text-6xl">Dialyatech CRM for Medehub operations</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">A professional cloud CRM for pharmacy onboarding, delivery partners, B2B customers, WhatsApp campaigns, follow-ups, and team performance.</p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-slate-50 p-6">
        <form className="crm-card w-full max-w-md p-6" onSubmit={submit}>
          <h2 className="text-2xl font-black text-slate-950">Login placeholder</h2>
          <p className="mt-2 text-sm text-slate-500">Authentication-ready UI. Connect your backend auth later.</p>
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
