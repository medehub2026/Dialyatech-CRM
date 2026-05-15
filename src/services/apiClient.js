const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export function apiAvailable() {
  return Boolean(API_BASE_URL);
}

export function getToken() {
  return localStorage.getItem("dialyatech_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("dialyatech_token", token);
  else localStorage.removeItem("dialyatech_token");
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) throw new Error("API base URL is not configured");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.message || "API request failed");
    error.details = payload.details;
    throw error;
  }
  return payload;
}

export const authApi = {
  async login(credentials) {
    const payload = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
    setToken(payload.token);
    return payload.user;
  },
  async me() {
    const payload = await apiRequest("/auth/me");
    return payload.user;
  },
  logout() {
    setToken(null);
  },
};

const endpointByType = {
  Pharmacy: "/pharmacy-leads",
  "Delivery Partner": "/delivery-leads",
  "B2B Customer": "/b2b-leads",
};

export const leadApi = {
  async list(type) {
    const payload = await apiRequest(endpointByType[type]);
    return payload.data.map((item) => fromApiLead(type, item));
  },
  async create(lead) {
    const payload = await apiRequest(endpointByType[lead.type], { method: "POST", body: JSON.stringify(toApiLead(lead)) });
    return fromApiLead(lead.type, payload.data);
  },
  async update(lead) {
    const payload = await apiRequest(`${endpointByType[lead.type]}/${lead.id}`, { method: "PUT", body: JSON.stringify(toApiLead(lead)) });
    return fromApiLead(lead.type, payload.data);
  },
  async remove(lead) {
    await apiRequest(`${endpointByType[lead.type]}/${lead.id}`, { method: "DELETE" });
  },
  async status(lead, status) {
    const payload = await apiRequest(`${endpointByType[lead.type]}/${lead.id}/status`, { method: "PATCH", body: JSON.stringify({ status: toApiStatus(status) }) });
    return fromApiLead(lead.type, payload.data);
  },
  async block(lead, blocked) {
    const payload = await apiRequest(`${endpointByType[lead.type]}/${lead.id}/block`, { method: "PATCH", body: JSON.stringify({ blocked }) });
    return fromApiLead(lead.type, payload.data);
  },
};

export const crmApi = {
  async followups() {
    const payload = await apiRequest("/followups");
    return payload.data;
  },
  async createFollowup(task) {
    const payload = await apiRequest("/followups", { method: "POST", body: JSON.stringify(task) });
    return payload.data;
  },
  async completeFollowup(id) {
    const payload = await apiRequest(`/followups/${id}/complete`, { method: "PATCH" });
    return payload.data;
  },
  async sendWhatsApp(message) {
    const payload = await apiRequest("/whatsapp/send-template", { method: "POST", body: JSON.stringify(message) });
    return payload.data;
  },
  async campaigns() {
    const payload = await apiRequest("/campaigns");
    return payload.data;
  },
  async createCampaign(campaign) {
    const payload = await apiRequest("/campaigns", { method: "POST", body: JSON.stringify(campaign) });
    return payload.data;
  },
  async dashboardReport() {
    const payload = await apiRequest("/reports/dashboard");
    return payload.data;
  },
};

export function toApiStatus(status = "New") {
  return status.toUpperCase().replaceAll(" ", "_").replace("-", "_");
}

export function fromApiStatus(status = "NEW") {
  return status.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function toApiLead(lead) {
  if (lead.type === "Pharmacy") {
    return {
      pharmacyName: lead.pharmacyName || lead.name,
      ownerName: lead.ownerName,
      mobile: lead.mobile,
      whatsappNumber: lead.whatsappNumber || lead.whatsapp,
      email: lead.email,
      city: lead.city,
      area: lead.area,
      address: lead.address,
      pincode: lead.pincode,
      drugLicenseNumber: lead.drugLicenseNumber,
      drugLicenseStatus: lead.drugLicenseStatus,
      gstNumber: lead.gstNumber,
      gstStatus: lead.gstStatus,
      currentBusinessType: lead.currentBusinessType,
      monthlyOrderPotential: lead.monthlyOrderPotential,
      onboardingStage: lead.onboardingStage || lead.status,
      leadSource: lead.leadSource,
      leadPriority: lead.leadPriority || "MEDIUM",
      assignedTo: lead.assignedTo,
      nextFollowUpDate: lead.nextFollowUpDate || lead.nextFollowUp,
      remarks: lead.remarks,
      status: toApiStatus(lead.status),
    };
  }
  if (lead.type === "Delivery Partner") {
    return {
      fullName: lead.fullName || lead.name,
      mobile: lead.mobile,
      whatsappNumber: lead.whatsappNumber || lead.whatsapp,
      city: lead.city,
      area: lead.area,
      address: lead.address,
      vehicleType: lead.vehicleType,
      vehicleNumber: lead.vehicleNumber,
      drivingLicenseNumber: lead.drivingLicenseNumber,
      drivingLicenseStatus: lead.drivingLicenseStatus,
      aadhaarStatus: lead.aadhaarStatus,
      policeVerificationStatus: lead.policeVerificationStatus,
      trainingStatus: lead.trainingStatus,
      preferredWorkingTime: lead.preferredWorkingTime,
      onboardingStage: lead.onboardingStage || lead.status,
      assignedTo: lead.assignedTo,
      nextFollowUpDate: lead.nextFollowUpDate || lead.nextFollowUp,
      remarks: lead.remarks,
      status: toApiStatus(lead.status),
    };
  }
  return {
    businessName: lead.businessName || lead.name,
    contactPerson: lead.contactPerson || lead.ownerName,
    mobile: lead.mobile,
    whatsappNumber: lead.whatsappNumber || lead.whatsapp,
    email: lead.email,
    businessType: lead.businessType || lead.customerCategory,
    city: lead.city,
    area: lead.area,
    address: lead.address,
    requirementType: lead.requirementType,
    expectedMonthlyPurchase: lead.expectedMonthlyPurchase,
    dealValue: lead.dealValue,
    quotationStatus: lead.quotationStatus || lead.quotationSent,
    negotiationStage: lead.negotiationStage || lead.negotiationStatus,
    leadSource: lead.leadSource,
    assignedTo: lead.assignedTo,
    nextFollowUpDate: lead.nextFollowUpDate || lead.nextFollowUp,
    remarks: lead.remarks,
    status: toApiStatus(lead.status),
  };
}

export function fromApiLead(type, item) {
  if (type === "Pharmacy") {
    return {
      ...item,
      type,
      name: item.pharmacyName,
      whatsapp: item.whatsappNumber,
      status: fromApiStatus(item.status),
      nextFollowUp: item.nextFollowUpDate?.slice(0, 10),
    };
  }
  if (type === "Delivery Partner") {
    return {
      ...item,
      type,
      name: item.fullName,
      ownerName: item.fullName,
      whatsapp: item.whatsappNumber,
      status: fromApiStatus(item.status),
      nextFollowUp: item.nextFollowUpDate?.slice(0, 10),
    };
  }
  return {
    ...item,
    type,
    name: item.businessName,
    ownerName: item.contactPerson,
    customerCategory: item.businessType,
    quotationSent: item.quotationStatus,
    negotiationStatus: item.negotiationStage,
    whatsapp: item.whatsappNumber,
    status: fromApiStatus(item.status),
    nextFollowUp: item.nextFollowUpDate?.slice(0, 10),
  };
}
