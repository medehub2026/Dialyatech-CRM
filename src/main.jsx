import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { CRMProvider } from "./hooks/useCRMData";
import { authApi, apiAvailable } from "./services/apiClient";
import "./styles/index.css";

function App() {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("dialyatech_session");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (payload) => {
    let nextSession;
    if (apiAvailable() && payload.password) {
      nextSession = await authApi.login(payload);
      nextSession = { ...nextSession, role: normalizeRole(nextSession.role) };
    } else {
      nextSession = {
        name: payload.name || "Medehub Admin",
        role: payload.role || "Super Admin",
        email: payload.email || "admin@medehub.in",
      };
    }
    localStorage.setItem("dialyatech_session", JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const logout = () => {
    localStorage.removeItem("dialyatech_session");
    authApi.logout();
    setSession(null);
  };

  const auth = useMemo(() => ({ session, login, logout }), [session]);

  if (!session) return <LoginPage onLogin={login} />;

  return (
    <CRMProvider>
      <ProtectedRoute session={session}>
        <AppLayout auth={auth} />
      </ProtectedRoute>
    </CRMProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);

function normalizeRole(role = "Super Admin") {
  const map = {
    SUPER_ADMIN: "Super Admin",
    CRM_ADMIN: "CRM Admin",
    MARKETING_MANAGER: "Marketing Manager",
    SALES_EXECUTIVE: "Sales Executive",
    SUPPORT_EXECUTIVE: "Support Executive",
    PHARMACY_SALES_EXECUTIVE: "Pharmacy Sales Executive",
    DELIVERY_ONBOARDING_EXECUTIVE: "Delivery Onboarding Executive",
    B2B_SALES_EXECUTIVE: "B2B Sales Executive",
    B2C_SALES_EXECUTIVE: "B2C Sales Executive",
  };
  if (map[role]) return map[role];
  return role.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
