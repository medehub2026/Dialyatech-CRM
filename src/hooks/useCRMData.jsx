import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoCampaigns, demoLeads, demoMessageLogs, demoSettings, demoTemplates, teamMembers } from "../data/demoData";
import { loadState, resetCRMStorage, saveState } from "../services/storageService";

const CRMContext = createContext(null);

export function CRMProvider({ children }) {
  const [leads, setLeads] = useState(() => loadState("leads", demoLeads));
  const [messages, setMessages] = useState(() => loadState("messages", demoMessageLogs));
  const [campaigns, setCampaigns] = useState(() => loadState("campaigns", demoCampaigns));
  const [templates, setTemplates] = useState(() => loadState("templates", demoTemplates));
  const [settings, setSettings] = useState(() => loadState("settings", demoSettings));
  const [toasts, setToasts] = useState([]);

  useEffect(() => saveState("leads", leads), [leads]);
  useEffect(() => saveState("messages", messages), [messages]);
  useEffect(() => saveState("campaigns", campaigns), [campaigns]);
  useEffect(() => saveState("templates", templates), [templates]);
  useEffect(() => saveState("settings", settings), [settings]);

  const toast = (message, type = "success") => {
    const id = Date.now();
    setToasts((items) => [...items, { id, message, type }]);
    window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200);
  };

  const addLead = (lead) => {
    const nextLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      blocked: false,
      status: "New",
      ...lead,
    };
    setLeads((items) => [nextLead, ...items]);
    toast("Lead added successfully");
  };

  const updateLead = (leadId, patch) => {
    setLeads((items) => items.map((lead) => (lead.id === leadId ? { ...lead, ...patch } : lead)));
    toast("Lead updated");
  };

  const deleteLead = (leadId) => {
    setLeads((items) => items.filter((lead) => lead.id !== leadId));
    toast("Lead deleted", "warning");
  };

  const blockLead = (leadId) => {
    setLeads((items) => items.map((lead) => (lead.id === leadId ? { ...lead, blocked: !lead.blocked } : lead)));
    toast("Lead block status updated", "warning");
  };

  const addMessage = (message) => {
    setMessages((items) => [message, ...items]);
    toast("WhatsApp message log created");
  };

  const addCampaign = (campaign) => {
    setCampaigns((items) => [{ id: `camp-${Date.now()}`, sent: 0, delivered: 0, replies: 0, conversions: 0, ...campaign }, ...items]);
    toast("Campaign created");
  };

  const markFollowup = (leadId, date) => updateLead(leadId, { nextFollowUp: date });
  const resetDemo = () => {
    resetCRMStorage();
    setLeads(demoLeads);
    setMessages(demoMessageLogs);
    setCampaigns(demoCampaigns);
    setTemplates(demoTemplates);
    setSettings(demoSettings);
    toast("Demo data reset");
  };

  const value = useMemo(
    () => ({
      leads,
      messages,
      campaigns,
      templates,
      settings,
      teamMembers,
      toasts,
      addLead,
      updateLead,
      deleteLead,
      blockLead,
      addMessage,
      addCampaign,
      setTemplates,
      setSettings,
      markFollowup,
      resetDemo,
      toast,
    }),
    [leads, messages, campaigns, templates, settings, toasts],
  );

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRMData() {
  const context = useContext(CRMContext);
  if (!context) throw new Error("useCRMData must be used inside CRMProvider");
  return context;
}
