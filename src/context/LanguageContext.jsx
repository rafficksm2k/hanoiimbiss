import { createContext, useContext, useEffect, useMemo, useState } from "react";
import de from "../i18n/de.json";
import en from "../i18n/en.json";
import { KEYS } from "../services/storage";

const DICTS = { de, en };
const LanguageContext = createContext(null);

function lookup(dict, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem(KEYS.lang);
    return saved === "en" ? "en" : "de";
  });

  useEffect(() => {
    localStorage.setItem(KEYS.lang, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === KEYS.lang && (event.newValue === "de" || event.newValue === "en")) {
        setLang(event.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(() => {
    const dict = DICTS[lang] || de;
    const t = (path) => {
      const result = lookup(dict, path);
      return typeof result === "string" ? result : path;
    };
    return { lang, setLang, t, dict };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
