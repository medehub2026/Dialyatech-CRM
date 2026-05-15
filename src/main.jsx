import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { CRMProvider } from "./hooks/useCRMData";
import "./styles/index.css";

function App() {
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem("dialyatech_session");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (payload) => {
    const nextSession = {
      name: payload.name || "Medehub Admin",
      role: payload.role || "Admin",
      email: payload.email || "admin@medehub.in",
    };
    localStorage.setItem("dialyatech_session", JSON.stringify(nextSession));
    setSession(nextSession);
  };

  const logout = () => {
    localStorage.removeItem("dialyatech_session");
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
