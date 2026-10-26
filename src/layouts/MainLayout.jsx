import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useI18n } from "../context/LanguageContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function MainLayout() {
  const { t } = useI18n();

  useLayoutEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return undefined;
    const apply = () => {
      document.documentElement.style.setProperty(
        "--header-offset",
        `${header.getBoundingClientRect().height}px`,
      );
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        {t("nav.skip")}
      </a>
      <header className="site-header">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
