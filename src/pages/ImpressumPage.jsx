import { Link } from "react-router-dom";
import { business } from "../data/business";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function ImpressumPage() {
  const { t } = useI18n();
  usePageMeta("meta.imprintTitle", "meta.imprintDescription");

  return (
    <article className="page legal">
      <header className="page-hero">
        <h1>{t("imprint.title")}</h1>
        <p className="lede">{t("imprint.intro")}</p>
      </header>
      <p className="address-block">
        {business.owner}
        <br />
        {business.street}
        <br />
        {business.postalCode} {business.city}
      </p>
      <p>
        {business.phones.map((phone) => (
          <span key={phone.tel} className="legal-line">
            <a href={`tel:${phone.tel}`}>{phone.display}</a>
          </span>
        ))}
      </p>
      <p>
        <a href={`mailto:${business.email}`}>{business.email}</a>
      </p>
      <p>{t("imprint.missing")}</p>
      <p>
        <Link to="/datenschutz">{t("footer.privacy")}</Link>
      </p>
    </article>
  );
}
