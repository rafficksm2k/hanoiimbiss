import { business } from "../data/business";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function ContactPage() {
  const { t, lang } = useI18n();
  usePageMeta("meta.contactTitle", "meta.contactDescription");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&hl=${lang}&z=17&output=embed`;

  return (
    <section className="page">
      <header className="page-hero">
        <p className="eyebrow">{t("contact.eyebrow")}</p>
        <h1>{t("contact.title")}</h1>
        <p className="lede">{t("contact.intro")}</p>
      </header>
      <div className="contact-grid">
        <div className="contact-card">
          <h2>{t("contact.phoneLabel")}</h2>
          <div className="phone-stack">
            {business.phones.map((phone) => (
              <a key={phone.tel} className="phone-link" href={`tel:${phone.tel}`}>
                <span>{phone.display}</span>
                <span className="phone-cta">{t("contact.call")}</span>
              </a>
            ))}
          </div>
          <p>{t("contact.takeaway")}</p>
          <p>{t("contact.party")}</p>
          <h2>{t("contact.addressLabel")}</h2>
          <p className="address-block">
            {business.name}
            <br />
            {business.street}
            <br />
            {business.postalCode} {business.city}
          </p>
          <h2>{t("contact.emailLabel")}</h2>
          <p>
            <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </div>
        <div className="map-frame">
          <iframe title={t("contact.mapTitle")} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
