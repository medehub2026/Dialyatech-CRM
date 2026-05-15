const navigation = [
  ["dashboard", "Control Center", "▣"],
  ["pharmacy", "Pharmacy Leads", "□"],
  ["delivery", "Delivery Partners", "◇"],
  ["b2b", "B2B Customers", "▤"],
  ["pipeline", "Sales Pipeline", "▥"],
  ["followups", "Follow-ups", "◷"],
  ["whatsapp", "WhatsApp API", "W"],
  ["campaigns", "Campaigns", "◎"],
  ["team", "Team Performance", "◉"],
  ["reports", "Reports", "▧"],
  ["settings", "CRM Settings", "⚙"],
];

const leads = [
  {
    name: "ABC Pharmacy",
    type: "Pharmacy",
    area: "Six Mile",
    stage: "Interested",
    owner: "Rahul",
    followUp: "Today 4:00 PM",
    whatsapp: "Replied",
  },
  {
    name: "Ramesh Rider",
    type: "Delivery",
    area: "Beltola",
    stage: "KYC Pending",
    owner: "Priya",
    followUp: "Tomorrow",
    whatsapp: "Sent",
  },
  {
    name: "GNRC Purchase",
    type: "B2B",
    area: "Guwahati",
    stage: "Negotiation",
    owner: "Amit",
    followUp: "Today 6:00 PM",
    whatsapp: "Replied",
  },
  {
    name: "Health Plus Clinic",
    type: "B2B",
    area: "Dispur",
    stage: "Converted",
    owner: "Meera",
    followUp: "Friday",
    whatsapp: "Read",
  },
];

const metrics = [
  ["Pharmacy Leads", "1,240", "156 hot", ""],
  ["Delivery Leads", "820", "92 pending KYC", ""],
  ["B2B Customers", "312", "48 active deals", ""],
  ["Converted Today", "38", "+14%", "green"],
  ["Follow-ups Due", "126", "Urgent", "amber"],
  ["Lost Leads", "29", "Need review", "red"],
];

const reports = [
  "Pharmacy Conversion",
  "Rider Onboarding",
  "B2B Deal Report",
  "WhatsApp Campaign Report",
  "Agent Performance",
  "Follow-up Report",
  "Lost Lead Analysis",
  "Area-wise Lead Report",
];

const state = {
  page: "dashboard",
  search: "",
};

const workspace = document.querySelector("#workspace");
const navList = document.querySelector("#navList");
const modal = document.querySelector("#leadModal");
const modalTitle = document.querySelector("#modalTitle");
const form = document.querySelector("#leadForm");

function init() {
  renderNav();
  render();
  bindGlobalEvents();
}

function renderNav() {
  navList.innerHTML = navigation
    .map(
      ([id, label, icon]) => `
        <button class="nav-item ${state.page === id ? "active" : ""}" data-page="${id}">
          <span>${icon}</span>${label}
        </button>
      `,
    )
    .join("");
}

function render() {
  renderNav();
  const pages = {
    dashboard: dashboardPage,
    pharmacy: () => leadPage("Pharmacy Onboarding CRM", "Add Pharmacy Lead", "Pharmacy"),
    delivery: () => leadPage("Delivery Partner Onboarding CRM", "Add Delivery Lead", "Delivery"),
    b2b: b2bPage,
    pipeline: pipelinePage,
    followups: followupsPage,
    whatsapp: whatsappPage,
    campaigns: campaignsPage,
    team: teamPage,
    reports: reportsPage,
    settings: settingsPage,
  };

  workspace.innerHTML = pages[state.page]();
}

function pageHead(title, buttonLabel) {
  return `
    <div class="page-head">
      <div>
        <h2>${title}</h2>
        <p>Track leads, onboarding stages, WhatsApp actions, follow-ups, sales ownership, and team performance from one cloud-ready CRM workspace.</p>
      </div>
      <button class="primary-btn" data-modal="${buttonLabel}">${buttonLabel}</button>
    </div>
  `;
}

function dashboardPage() {
  return `
    <div class="page">
      <div class="page-head">
        <div>
          <h2>CRM Control Center</h2>
          <p>Live operating view for pharmacy onboarding, delivery partner recruitment, B2B sales, WhatsApp replies, and priority follow-ups.</p>
        </div>
        <div class="form-actions">
          <button class="soft-btn" data-modal="Import Leads">Import Leads</button>
          <button class="success-btn" data-modal="Send WhatsApp Broadcast">WhatsApp Broadcast</button>
        </div>
      </div>
      <div class="metric-grid">${metrics.map(metricCard).join("")}</div>
      <div class="split-grid">
        <section class="panel">
          <h3>Onboarding Funnel</h3>
          <div class="funnel-grid">
            ${mini("New Leads", "485", "blue")}
            ${mini("Contacted", "312", "amber")}
            ${mini("Interested", "168", "orange")}
            ${mini("KYC Pending", "94", "violet")}
            ${mini("Converted", "51", "green")}
          </div>
        </section>
        <section class="panel">
          <h3>Today Priority Actions</h3>
          <div class="alert-list">
            ${alert("42 pharmacy follow-ups due before 5 PM", "amber")}
            ${alert("18 WhatsApp replies received", "green")}
            ${alert("9 hot B2B leads not contacted", "red")}
            ${alert("12 delivery partners need document verification", "blue")}
          </div>
        </section>
      </div>
      <div class="half-grid">
        ${leadTable("Hot Leads", leads)}
        ${activityFeed()}
      </div>
    </div>
  `;
}

function leadPage(title, buttonLabel, type) {
  const filtered = leads.filter((lead) => lead.type === type);
  return `
    <div class="page">
      ${pageHead(title, buttonLabel)}
      ${filterBar()}
      ${leadTable(`${type} Lead List`, filtered)}
    </div>
  `;
}

function b2bPage() {
  return `
    <div class="page">
      ${pageHead("B2B Sales Customer Tracking", "Add B2B Customer")}
      <div class="metric-grid">
        ${mini("Hospitals", "86", "blue")}
        ${mini("Clinics", "124", "green")}
        ${mini("Nursing Homes", "42", "orange")}
        ${mini("Corporate Buyers", "60", "violet")}
      </div>
      ${leadTable("B2B Deal List", leads.filter((lead) => lead.type === "B2B"))}
    </div>
  `;
}

function pipelinePage() {
  const stages = [
    ["New", 48],
    ["Contacted", 72],
    ["Interested", 35],
    ["Negotiation", 19],
    ["Converted", 51],
  ];

  return `
    <div class="page">
      ${pageHead("Sales Pipeline Board", "Create Deal")}
      <div class="pipeline-grid">
        ${stages
          .map(
            ([stage, count]) => `
              <section class="pipeline-column">
                <header><h3>${stage}</h3><span class="badge blue">${count}</span></header>
                ${leads
                  .slice(0, 2)
                  .map(
                    (lead) => `
                      <article class="pipeline-card" data-modal="Pipeline Lead">
                        <b>${lead.name}</b>
                        <p>${lead.area} · ${lead.type}</p>
                      </article>
                    `,
                  )
                  .join("")}
              </section>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function followupsPage() {
  return `
    <div class="page">
      ${pageHead("Follow-up Calendar & Task List", "Schedule Follow-up")}
      <div class="metric-grid">
        ${metricCard(["Due Today", "126", "Pending tasks", ""])}
        ${metricCard(["Overdue", "24", "Needs attention", "amber"])}
        ${metricCard(["Completed", "78", "Today", "green"])}
      </div>
      ${taskTable()}
    </div>
  `;
}

function whatsappPage() {
  return `
    <div class="page">
      ${pageHead("Interakt WhatsApp API Center", "Create WhatsApp Template")}
      <div class="metric-grid">
        ${metricCard(["Messages Sent", "12,450", "This month", "green"])}
        ${metricCard(["Delivered", "11,820", "94.9%", ""])}
        ${metricCard(["Read", "7,540", "64%", ""])}
        ${metricCard(["Replies", "1,284", "Hot conversations", "amber"])}
        ${metricCard(["Failed", "214", "Review templates", "red"])}
      </div>
      <div class="half-grid">
        <section class="panel">
          <h3>WhatsApp Quick Actions</h3>
          <div class="quick-actions">
            <button class="success-btn" data-modal="Send Pharmacy Onboarding Message">Pharmacy Pitch</button>
            <button class="success-btn" data-modal="Send Delivery Partner Message">Rider Pitch</button>
            <button class="success-btn" data-modal="Send B2B Sales Message">B2B Offer</button>
            <button class="success-btn" data-modal="Send Follow-up Reminder">Follow-up Reminder</button>
          </div>
        </section>
        <section class="panel api-fields">
          <h3>Interakt API Integration</h3>
          <div class="lead-form">
            <input placeholder="Interakt API Key" />
            <input placeholder="WhatsApp Business Number" />
            <input placeholder="Webhook URL" />
            <button class="primary-btn">Save API Settings</button>
          </div>
        </section>
      </div>
      ${whatsappTable()}
    </div>
  `;
}

function campaignsPage() {
  const campaigns = [
    ["Pharmacy Onboarding Campaign", "Running", "4,200"],
    ["Delivery Partner Recruitment", "Scheduled", "1,850"],
    ["B2B Wholesale Sales", "Draft", "0"],
  ];

  return `
    <div class="page">
      ${pageHead("Marketing Campaigns", "Create Campaign")}
      <div class="campaign-grid">
        ${campaigns
          .map(
            ([title, status, sent]) => `
              <article class="campaign-card">
                <h3>${title}</h3>
                <p>Status: ${status}</p>
                <p>Messages Sent</p>
                <strong>${sent}</strong>
                <button class="primary-btn" data-modal="Campaign Details">Open Campaign</button>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function teamPage() {
  return `
    <div class="page">
      ${pageHead("Marketing Team Performance", "Add Team Member")}
      <section class="panel table-wrap">
        <table>
          <thead><tr><th>Agent</th><th>Assigned Leads</th><th>Calls</th><th>WhatsApp Sent</th><th>Conversions</th><th>Performance</th></tr></thead>
          <tbody>
            <tr><td>Rahul</td><td>124</td><td>68</td><td>210</td><td>18</td><td><span class="badge green">Excellent</span></td></tr>
            <tr><td>Priya</td><td>98</td><td>54</td><td>165</td><td>12</td><td><span class="badge blue">Good</span></td></tr>
          </tbody>
        </table>
      </section>
    </div>
  `;
}

function reportsPage() {
  return `
    <div class="page">
      ${pageHead("CRM Reports", "Export CRM Report")}
      <div class="report-grid">
        ${reports
          .map(
            (report) => `
              <button class="report-card" data-modal="${report}">
                <span>▧</span>
                <b>${report}</b>
                <small>Open report</small>
              </button>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function settingsPage() {
  return `
    <div class="page">
      ${pageHead("CRM Settings", "Save Settings")}
      <section class="panel settings-grid">
        <input placeholder="Default Lead Owner" />
        <input placeholder="Follow-up Reminder Time" />
        <input placeholder="Interakt API Key" />
        <input placeholder="Webhook Secret" />
        <input placeholder="Default WhatsApp Template ID" />
        <input placeholder="Lead Auto Assignment Rule" />
      </section>
    </div>
  `;
}

function metricCard([label, value, note, tone]) {
  return `
    <article class="metric ${tone}">
      <p>${label}</p>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `;
}

function mini(label, value, tone) {
  return `<article class="mini ${tone}"><p>${label}</p><strong>${value}</strong></article>`;
}

function alert(text, tone) {
  return `<div class="alert ${tone}">${text}</div>`;
}

function filterBar() {
  return `
    <section class="panel filter-bar">
      <select><option>All Status</option><option>New</option><option>Contacted</option><option>Interested</option><option>KYC Pending</option><option>Converted</option><option>Lost</option></select>
      <select><option>All Areas</option><option>Guwahati</option><option>Six Mile</option><option>Beltola</option></select>
      <select><option>All Agents</option><option>Rahul</option><option>Priya</option><option>Amit</option></select>
      <input type="date" />
      <button class="soft-btn">Apply Filter</button>
    </section>
  `;
}

function leadTable(title, rows) {
  const filteredRows = rows.filter((lead) => {
    const haystack = Object.values(lead).join(" ").toLowerCase();
    return haystack.includes(state.search.toLowerCase());
  });

  return `
    <section class="panel table-wrap">
      <h3>${title}</h3>
      <table>
        <thead><tr><th>Name</th><th>Type</th><th>Area</th><th>Stage</th><th>Owner</th><th>Next Follow-up</th><th>WhatsApp</th><th>Action</th></tr></thead>
        <tbody>
          ${filteredRows
            .map(
              (lead) => `
                <tr>
                  <td>${lead.name}</td>
                  <td>${lead.type}</td>
                  <td>${lead.area}</td>
                  <td><span class="badge ${badgeTone(lead.stage)}">${lead.stage}</span></td>
                  <td>${lead.owner}</td>
                  <td>${lead.followUp}</td>
                  <td><span class="badge ${badgeTone(lead.whatsapp)}">${lead.whatsapp}</span></td>
                  <td><button class="link-btn" data-modal="Lead Details">Open</button></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function activityFeed() {
  const rows = [
    ["WhatsApp sent to ABC Pharmacy", "2 min ago"],
    ["B2B quotation follow-up completed", "15 min ago"],
    ["Delivery partner KYC document uploaded", "42 min ago"],
    ["Pharmacy lead converted", "1 hr ago"],
  ];

  return `
    <section class="panel">
      <h3>Recent CRM Activity</h3>
      <div class="alert-list">
        ${rows.map(([text, time]) => `<div class="activity-row"><span>${text}</span><small>${time}</small></div>`).join("")}
      </div>
    </section>
  `;
}

function taskTable() {
  return `
    <section class="panel table-wrap">
      <table>
        <thead><tr><th>Task</th><th>Lead</th><th>Owner</th><th>Due</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>Call pharmacy owner</td><td>ABC Pharmacy</td><td>Rahul</td><td>Today 4 PM</td><td><span class="badge orange">Due</span></td><td><button class="link-btn">Complete</button></td></tr>
          <tr><td>Send onboarding docs</td><td>Ramesh Rider</td><td>Priya</td><td>Today 6 PM</td><td><span class="badge red">Overdue</span></td><td><button class="link-btn">Send WhatsApp</button></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function whatsappTable() {
  return `
    <section class="panel table-wrap">
      <h3>WhatsApp Message Log</h3>
      <table>
        <thead><tr><th>Lead</th><th>Template</th><th>Status</th><th>Sent By</th><th>Time</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>ABC Pharmacy</td><td>Pharmacy Pitch</td><td><span class="badge green">Read + Replied</span></td><td>Rahul</td><td>10:35 AM</td><td><button class="link-btn">Open Chat</button></td></tr>
          <tr><td>Rider Lead</td><td>Document Reminder</td><td><span class="badge amber">Delivered</span></td><td>Priya</td><td>11:20 AM</td><td><button class="link-btn">Follow-up</button></td></tr>
        </tbody>
      </table>
    </section>
  `;
}

function badgeTone(value) {
  const normalized = value.toLowerCase();
  if (normalized.includes("converted") || normalized.includes("replied") || normalized.includes("read")) return "green";
  if (normalized.includes("kyc") || normalized.includes("new")) return "blue";
  if (normalized.includes("lost") || normalized.includes("overdue")) return "red";
  if (normalized.includes("interested") || normalized.includes("due")) return "orange";
  return "amber";
}

function openModal(title) {
  modalTitle.textContent = title;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function bindGlobalEvents() {
  document.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-page]");
    const modalButton = event.target.closest("[data-modal]");
    const actionButton = event.target.closest("[data-action]");

    if (pageButton) {
      state.page = pageButton.dataset.page;
      render();
    }

    if (modalButton) openModal(modalButton.dataset.modal);
    if (actionButton?.dataset.action === "new-lead") openModal("Create New Lead");
    if (actionButton?.dataset.action === "whatsapp") {
      state.page = "whatsapp";
      render();
    }
    if (actionButton?.dataset.action === "send-whatsapp") closeModal();
  });

  document.querySelector("#closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.querySelector("#globalSearch").addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    leads.unshift({
      name: data.name,
      type: data.type === "Delivery Partner" ? "Delivery" : data.type.replace(" Customer", ""),
      area: "New Area",
      stage: data.stage,
      owner: "Unassigned",
      followUp: "Not scheduled",
      whatsapp: "Draft",
    });
    form.reset();
    closeModal();
    render();
  });
}

init();
