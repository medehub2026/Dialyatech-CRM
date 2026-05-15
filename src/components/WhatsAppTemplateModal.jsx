import { Send, X } from "lucide-react";
import { useState } from "react";
import { useCRMData } from "../hooks/useCRMData";
import { sendTemplateMessage } from "../services/interaktService";

export default function WhatsAppTemplateModal({ open, lead, user, onClose }) {
  const { templates, addMessage } = useCRMData();
  const [templateCode, setTemplateCode] = useState(templates[0]?.code || "");
  if (!open || !lead) return null;

  const send = async () => {
    const template = templates.find((item) => item.code === templateCode) || templates[0];
    const log = await sendTemplateMessage({ lead, template, sentBy: user?.name || "CRM User" });
    addMessage(log);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">Send WhatsApp Template</h2>
            <p className="mt-1 text-sm text-slate-500">{lead.name} · {lead.whatsapp}</p>
          </div>
          <button className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="mt-5 grid gap-4">
          <label><span className="crm-label mb-1 block">Template</span><select className="crm-input" value={templateCode} onChange={(event) => setTemplateCode(event.target.value)}>{templates.map((template) => <option key={template.id} value={template.code}>{template.name}</option>)}</select></label>
          <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
            This creates a message log now. The Interakt API call is isolated in <b>services/interaktService.js</b> for backend connection with environment variables.
          </div>
          <button className="crm-btn-success" onClick={send}><Send size={16} /> Send template</button>
        </div>
      </div>
    </div>
  );
}
