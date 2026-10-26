import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FoodCarousel } from "../components/FoodCarousel";
import { Hero } from "../components/Hero";
import { HoursBoard } from "../components/HoursBoard";
import { business } from "../data/business";
import { useI18n } from "../context/LanguageContext";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
  const { t, dict } = useI18n();
  usePageMeta("meta.homeTitle", "meta.homeDescription");
  const phone = business.phones[0];

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "restaurant-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Hanoi Asia Imbiss",
      servesCuisine: ["Vietnamese", "Thai", "Chinese"],
      address: {
        "@type": "PostalAddress",
        streetAddress: business.street,
        postalCode: business.postalCode,
        addressLocality: business.city,
        addressCountry: "DE",
      },
      telephone: business.phones[0].tel,
      email: business.email,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "11:00",
          closes: "14:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "17:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "17:00",
          closes: "21:00",
        },
      ],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <Hero />
      <section className="facts">
        {dict.facts.map((fact) => (
          <article key={fact.title}>
            <h2>{fact.title}</h2>
            <p>{fact.text}</p>
          </article>
        ))}
      </section>
      <FoodCarousel />
      <section className="section">
        <div className="section-head">
          <p className="eyebrow">{t("hours.eyebrow")}</p>
          <h2>{t("hours.title")}</h2>
          <p className="lede">{t("hours.intro")}</p>
        </div>
        <HoursBoard />
        <p className="section-note">{t("hours.note")}</p>
        <p className="section-actions">
          <Link className="btn btn-line" to="/oeffnungszeiten">
            {t("home.hoursCta")}
          </Link>
        </p>
      </section>
      <section className="visit">
        <div>
          <p className="eyebrow">{t("contact.eyebrow")}</p>
          <h2>{t("home.visitTitle")}</h2>
          <p className="lede">{t("home.visitText")}</p>
          <p className="visit-address">
            {business.street}
            <br />
            {business.postalCode} {business.city}
          </p>
          <a className="btn btn-call" href={`tel:${phone.tel}`}>
            {t("hero.call")}
          </a>
        </div>
      </section>
    </>
  );
}
