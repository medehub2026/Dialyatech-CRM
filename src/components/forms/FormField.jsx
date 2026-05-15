export default function FormField({ label, children, wide }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className="crm-label mb-1 block">{label}</span>
      {children}
    </label>
  );
}
