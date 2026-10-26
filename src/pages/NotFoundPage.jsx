import { Link } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage() {
  const { t } = useI18n();
  usePageMeta("meta.notFoundTitle", "meta.notFoundDescription", { noindex: true });

  return (
    <section className="page">
      <header className="page-hero">
        <h1>{t("notFound.title")}</h1>
        <p className="lede">{t("notFound.text")}</p>
        <Link className="btn btn-line" to="/">
          {t("notFound.back")}
        </Link>
      </header>
    </section>
  );
}
