import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("northstar_user")) || null; } catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("northstar_token");
    if (!token) return setLoading(false);
    api.get("/auth/me")
      .then(({ data }) => setUser(data.user))
      .catch(() => { localStorage.removeItem("northstar_token"); localStorage.removeItem("northstar_user"); setUser(null); })
      .finally(() => setLoading(false));
  }, []);

  function finishAuth(data) {
    localStorage.setItem("northstar_token", data.token);
    localStorage.setItem("northstar_user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function login(values) { finishAuth((await api.post("/auth/login", values)).data); }
  async function register(values) { finishAuth((await api.post("/auth/register", values)).data); }
  function logout() { localStorage.removeItem("northstar_token"); localStorage.removeItem("northstar_user"); setUser(null); }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }