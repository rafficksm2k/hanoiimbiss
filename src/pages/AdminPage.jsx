import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAnnouncement } from "../context/AnnouncementContext";
import { useAuth } from "../context/AuthContext";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { announcementDraft, announcementText } from "../services/storage";

export function AdminPage() {
  const { t, lang } = useI18n();
  const { authed, login, logout } = useAuth();
  const { announcement, saveAnnouncement, clearAnnouncement } = useAnnouncement();
  usePageMeta("meta.adminTitle", "meta.adminDescription", { noindex: true });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState(() => announcementDraft(announcement));
  const [status, setStatus] = useState("");

  useEffect(() => {
    setDraft(announcementDraft(announcement));
  }, [announcement]);

  function onLogin(event) {
    event.preventDefault();
    const ok = login(username.trim(), password);
    setError(!ok);
    if (ok) setPassword("");
  }

  function onSave(event) {
    event.preventDefault();
    saveAnnouncement(draft);
    setStatus("saved");
  }

  function onDelete() {
    clearAnnouncement();
    setStatus("deleted");
  }

  const current = announcementText(announcement, lang);

  return (
    <section className="page admin-page">
      <div className="admin-card">
        {authed ? (
          <>
            <h1>{t("admin.title")}</h1>
            <p className="lede">{t("admin.hint")}</p>
            <h2>{t("admin.current")}</h2>
            <p className="admin-current">{current || t("admin.empty")}</p>
            <form onSubmit={onSave}>
              <div className="field">
                <label htmlFor="announce-de">{t("admin.deLabel")}</label>
                <textarea
                  id="announce-de"
                  rows="4"
                  value={draft.de}
                  onChange={(event) => setDraft((prev) => ({ ...prev, de: event.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="announce-en">{t("admin.enLabel")}</label>
                <textarea
                  id="announce-en"
                  rows="4"
                  value={draft.en}
                  onChange={(event) => setDraft((prev) => ({ ...prev, en: event.target.value }))}
                />
              </div>
              <div className="admin-actions">
                <button className="btn btn-call" type="submit">
                  {t("admin.save")}
                </button>
                <button className="btn btn-line" type="button" onClick={onDelete}>
                  {t("admin.delete")}
                </button>
                <button className="btn btn-line" type="button" onClick={logout}>
                  {t("admin.logout")}
                </button>
              </div>
            </form>
            {status === "saved" ? (
              <p className="form-status" role="status">
                {t("admin.saved")}
              </p>
            ) : null}
            {status === "deleted" ? (
              <p className="form-status" role="status">
                {t("admin.deleted")}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <h1>{t("admin.loginTitle")}</h1>
            <form onSubmit={onLogin}>
              <div className="field">
                <label htmlFor="admin-user">{t("admin.username")}</label>
                <input
                  id="admin-user"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  aria-invalid={error}
                />
              </div>
              <div className="field">
                <label htmlFor="admin-pass">{t("admin.password")}</label>
                <input
                  id="admin-pass"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={error}
                />
              </div>
              {error ? (
                <p className="form-error" role="alert">
                  {t("admin.error")}
                </p>
              ) : null}
              <button className="btn btn-call" type="submit">
                {t("admin.submit")}
              </button>
            </form>
          </>
        )}
        <p className="admin-back">
          <Link to="/">{t("admin.back")}</Link>
        </p>
      </div>
    </section>
  );
}
