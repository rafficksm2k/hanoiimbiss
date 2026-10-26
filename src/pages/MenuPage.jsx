import { MenuBrowser } from "../components/MenuBrowser";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function MenuPage() {
  const { t } = useI18n();
  usePageMeta("meta.menuTitle", "meta.menuDescription");

  return (
    <section className="page">
      <header className="page-hero">
        <p className="eyebrow">{t("menu.eyebrow")}</p>
        <h1>{t("menu.title")}</h1>
        <p className="lede">{t("menu.intro")}</p>
      </header>
      <MenuBrowser />
    </section>
  );
}
