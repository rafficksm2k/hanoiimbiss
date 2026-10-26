import { HoursBoard } from "../components/HoursBoard";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function HoursPage() {
  const { t } = useI18n();
  usePageMeta("meta.hoursTitle", "meta.hoursDescription");

  return (
    <section className="page">
      <header className="page-hero">
        <p className="eyebrow">{t("hours.eyebrow")}</p>
        <h1>{t("hours.title")}</h1>
        <p className="lede">{t("hours.intro")}</p>
      </header>
      <HoursBoard />
      <p className="section-note">{t("hours.note")}</p>
    </section>
  );
}
