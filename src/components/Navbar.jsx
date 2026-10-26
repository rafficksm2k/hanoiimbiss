import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";

const LINKS = [
  { to: "/", key: "nav.home", end: true },
  { to: "/speisekarte", key: "nav.menu" },
  { to: "/oeffnungszeiten", key: "nav.hours" },
  { to: "/kontakt", key: "nav.contact" },
];

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="nav" aria-label={t("nav.primary")}>
      <div className="nav-inner">
        <NavLink className="logo" to="/" end aria-label={t("nav.homeLink")}>
          <span className="logo-mark" aria-hidden="true">
            HA
          </span>
          <span className="logo-text">
            <span className="logo-name">Hanoi Asia</span>
            <span className="logo-sub">Imbiss</span>
          </span>
        </NavLink>

        <div className={`nav-links${open ? " is-open" : ""}`} id="site-nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            >
              {t(link.key)}
            </NavLink>
          ))}
        </div>

        <div className="nav-tools">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("nav.closeMenu") : t("nav.openMenu")}</span>
            <span className="nav-toggle-bars" aria-hidden="true" />
          </button>
          <div className="lang-switch" role="group" aria-label={t("nav.language")}>
            <button
              type="button"
              className="lang-btn"
              aria-pressed={lang === "de"}
              onClick={() => setLang("de")}
            >
              DE
            </button>
            <span className="lang-sep" aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className="lang-btn"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
