import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { credentialsMatch } from "../services/auth";
import { KEYS } from "../services/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => localStorage.getItem(KEYS.admin) === "ok");

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === KEYS.admin) setAuthed(event.newValue === "ok");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      authed,
      login(username, password) {
        const ok = credentialsMatch(username, password);
        if (ok) {
          localStorage.setItem(KEYS.admin, "ok");
          setAuthed(true);
        }
        return ok;
      },
      logout() {
        localStorage.removeItem(KEYS.admin);
        setAuthed(false);
      },
    }),
    [authed],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
