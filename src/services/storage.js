import de from "../i18n/de.json";
import en from "../i18n/en.json";

export const KEYS = {
  lang: "hanoi.lang",
  admin: "hanoi.admin",
  announcement: "hanoi.announcement",
};

export const defaultAnnouncement = {
  de: de.announcement.default,
  en: en.announcement.default,
};

export function readAnnouncement() {
  const raw = localStorage.getItem(KEYS.announcement);
  if (raw == null) return { status: "default", de: "", en: "" };
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.cleared === true) return { status: "cleared", de: "", en: "" };
    if (typeof parsed === "string") return { status: "custom", de: parsed, en: "" };
    return {
      status: "custom",
      de: typeof parsed.de === "string" ? parsed.de : "",
      en: typeof parsed.en === "string" ? parsed.en : "",
    };
  } catch {
    return { status: "custom", de: raw, en: "" };
  }
}

export function writeAnnouncement(value) {
  const next = {
    cleared: false,
    de: (value?.de || "").trim(),
    en: (value?.en || "").trim(),
  };
  localStorage.setItem(KEYS.announcement, JSON.stringify(next));
}

export function clearAnnouncementStorage() {
  localStorage.setItem(KEYS.announcement, JSON.stringify({ cleared: true, de: "", en: "" }));
}

export function announcementText(stored, lang, defaults = defaultAnnouncement) {
  if (!stored || stored.status === "default") return (defaults[lang] || "").trim();
  if (stored.status === "cleared") return "";
  const primary = (stored[lang] || "").trim();
  if (primary) return primary;
  const other = lang === "de" ? stored.en : stored.de;
  return (other || "").trim();
}

export function announcementDraft(stored, defaults = defaultAnnouncement) {
  return {
    de: announcementText(stored, "de", defaults),
    en: announcementText(stored, "en", defaults),
  };
}
