import { Link } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function DatenschutzPage() {
  const { t } = useI18n();
  usePageMeta("meta.privacyTitle", "meta.privacyDescription");

  return (
    <article className="page legal">
      <header className="page-hero">
        <h1>{t("privacy.title")}</h1>
      </header>
      <section>
        <h2>{t("privacy.controllerTitle")}</h2>
        <p>{t("privacy.controllerBody")}</p>
        <p>
          <Link to="/impressum">{t("footer.imprint")}</Link>
        </p>
      </section>
      <section>
        <h2>{t("privacy.siteTitle")}</h2>
        <p>{t("privacy.siteBody")}</p>
      </section>
      <section>
        <h2>{t("privacy.hostTitle")}</h2>
        <p>{t("privacy.hostBody")}</p>
      </section>
      <section>
        <h2>{t("privacy.localTitle")}</h2>
        <p>{t("privacy.localBody")}</p>
      </section>
      <section>
        <h2>{t("privacy.mapTitle")}</h2>
        <p>
          {t("privacy.mapBody")}{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            {t("privacy.google")}
          </a>
        </p>
      </section>
      <section>
        <h2>{t("privacy.phoneTitle")}</h2>
        <p>{t("privacy.phoneBody")}</p>
      </section>
      <section>
        <h2>{t("privacy.rightsTitle")}</h2>
        <p>{t("privacy.rightsBody")}</p>
      </section>
    </article>
  );
}
