import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { useCRMData } from "../hooks/useCRMData";

export default function ToastNotification() {
  const { toasts } = useCRMData();
  return (
    <div className="fixed bottom-4 right-4 z-[80] grid w-[min(360px,calc(100vw-2rem))] gap-2">
      {toasts.map((toast) => {
        const Icon = toast.type === "warning" ? TriangleAlert : toast.type === "info" ? Info : CheckCircle2;
        return (
          <div key={toast.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
            <Icon className={toast.type === "warning" ? "text-amber-600" : "text-green-600"} size={20} />
            <p className="text-sm font-semibold text-slate-700">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
