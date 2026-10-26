import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { business } from "../data/business";
import { useI18n } from "../context/LanguageContext";

export function Hero() {
  const { t } = useI18n();
  const phone = business.phones[0];

  return (
    <section className="hero">
      <img
        className="hero-media"
        src={hero}
        alt={t("hero.imageAlt")}
        width="1600"
        height="1200"
        fetchPriority="high"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">{t("hero.eyebrow")}</p>
        <h1>{t("hero.title")}</h1>
        <p className="hero-sub">{t("hero.sub")}</p>
        <div className="hero-actions">
          <a className="btn btn-call" href={`tel:${phone.tel}`}>
            {t("hero.call")}
          </a>
          <Link className="btn btn-ghost" to="/speisekarte">
            {t("hero.menu")}
          </Link>
        </div>
      </div>
    </section>
  );
}
