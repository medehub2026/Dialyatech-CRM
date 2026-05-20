import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoCampaigns, demoLeads, demoMessageLogs, demoSettings, demoTemplates, teamMembers } from "../data/demoData";
import { apiAvailable, crmApi, leadApi } from "../services/apiClient";
import { loadState, resetCRMStorage, saveState } from "../services/storageService";

const CRMContext = createContext(null);

export function CRMProvider({ children }) {
  const [leads, setLeads] = useState(() => loadState("leads", demoLeads));
  const [messages, setMessages] = useState(() => loadState("messages", demoMessageLogs));
  const [campaigns, setCampaigns] = useState(() => loadState("campaigns", demoCampaigns));
  const [templates, setTemplates] = useState(() => loadState("templates", demoTemplates));
  const [settings, setSettings] = useState(() => loadState("settings", demoSettings));
  const [toasts, setToasts] = useState([]);
  const [apiMode, setApiMode] = useState("local");

  useEffect(() => {
    if (!apiAvailable()) return;
    Promise.all([
      leadApi.list("Pharmacy"),
      leadApi.list("Delivery Partner"),
      leadApi.list("B2B Customer"),
      leadApi.list("D2C Customer"),
      crmApi.campaigns().catch(() => demoCampaigns),
    ]).then(([pharmacy, delivery, b2b, d2c, apiCampaigns]) => {
      setLeads([...pharmacy, ...delivery, ...b2b, ...d2c]);
      setCampaigns(apiCampaigns);
      setApiMode("api");
    }).catch(() => {
      setApiMode("local");
    });
  }, []);

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

  const addLead = async (lead) => {
    const nextLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      blocked: false,
      status: "New",
      ...lead,
    };
    try {
      const saved = apiMode === "api" ? await leadApi.create(nextLead) : nextLead;
      setLeads((items) => [saved, ...items]);
      toast("Lead added successfully");
    } catch (error) {
      toast(error.message || "Lead save failed", "warning");
    }
  };

  const updateLead = async (leadId, patch) => {
    const current = leads.find((lead) => lead.id === leadId);
    const next = { ...current, ...patch };
    try {
      const saved = apiMode === "api" && current ? await leadApi.update(next) : next;
      setLeads((items) => items.map((lead) => (lead.id === leadId ? saved : lead)));
      toast("Lead updated");
    } catch (error) {
      toast(error.message || "Lead update failed", "warning");
    }
  };

  const deleteLead = async (leadId) => {
    const current = leads.find((lead) => lead.id === leadId);
    try {
      if (apiMode === "api" && current) await leadApi.remove(current);
      setLeads((items) => items.filter((lead) => lead.id !== leadId));
      toast("Lead deleted", "warning");
    } catch (error) {
      toast(error.message || "Lead delete failed", "warning");
    }
  };

  const blockLead = async (leadId) => {
    const current = leads.find((lead) => lead.id === leadId);
    const blocked = !current?.blocked;
    try {
      const saved = apiMode === "api" && current ? await leadApi.block(current, blocked) : { ...current, blocked };
      setLeads((items) => items.map((lead) => (lead.id === leadId ? saved : lead)));
      toast("Lead block status updated", "warning");
    } catch (error) {
      toast(error.message || "Lead block failed", "warning");
    }
  };

  const addMessage = (message) => {
    setMessages((items) => [message, ...items]);
    toast("WhatsApp message log created");
  };

  const addCampaign = async (campaign) => {
    const nextCampaign = { id: `camp-${Date.now()}`, sent: 0, delivered: 0, replies: 0, conversions: 0, ...campaign };
    try {
      const saved = apiMode === "api" ? await crmApi.createCampaign({
        name: nextCampaign.name,
        audienceType: nextCampaign.audience || nextCampaign.audienceType,
        city: nextCampaign.city,
        area: nextCampaign.area,
        templateName: nextCampaign.templateName || "follow_up_reminder",
        status: nextCampaign.status,
      }) : nextCampaign;
      setCampaigns((items) => [saved, ...items]);
      toast("Campaign created");
    } catch (error) {
      toast(error.message || "Campaign save failed", "warning");
    }
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
      apiMode,
    }),
    [leads, messages, campaigns, templates, settings, toasts, apiMode],
  );

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRMData() {
  const context = useContext(CRMContext);
  if (!context) throw new Error("useCRMData must be used inside CRMProvider");
  return context;
}
