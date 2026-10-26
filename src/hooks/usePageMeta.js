import { useEffect } from "react";
import { useI18n } from "../context/LanguageContext";

export function usePageMeta(titleKey, descriptionKey, { noindex = false } = {}) {
  const { t, lang } = useI18n();
  const title = t(titleKey);
  const description = t(descriptionKey);

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", noindex ? "noindex, nofollow" : "index, follow");
  }, [title, description, lang, noindex]);
}
