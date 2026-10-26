import { Link } from "react-router-dom";
import { business } from "../data/business";
import { useI18n } from "../context/LanguageContext";

export function Footer() {
  const { t, dict } = useI18n();
  const phone = business.phones[0];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <p className="footer-name">Hanoi Asia Imbiss</p>
          <p>{t("footer.blurb")}</p>
        </div>
        <div>
          <h2>{t("footer.hours")}</h2>
          <ul className="footer-list">
            {dict.hours.slots.map((slot) => (
              <li key={slot.id}>
                <span>{slot.label}</span>
                <span>{slot.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t("footer.contact")}</h2>
          <p>
            {business.street}
            <br />
            {business.postalCode} {business.city}
          </p>
          <p>
            <a href={`tel:${phone.tel}`}>{phone.display}</a>
          </p>
          <p>
            <Link to="/impressum">{t("footer.imprint")}</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/datenschutz">{t("footer.privacy")}</Link>
          </p>
        </div>
      </div>
      <p className="footer-copy">{t("footer.rights")}</p>
    </footer>
  );
}
