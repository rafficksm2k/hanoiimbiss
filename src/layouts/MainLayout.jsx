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
    const root = document.getElementById("root");
    if (!root) return undefined;
    const observer = new ResizeObserver(() => apply());
    const watch = () => {
      observer.disconnect();
      const announce = document.querySelector(".announce");
      const header = document.querySelector(".site-header");
      if (announce) observer.observe(announce);
      if (header) observer.observe(header);
    };
    function apply() {
      const announce = document.querySelector(".announce");
      const header = document.querySelector(".site-header");
      const height =
        (announce?.getBoundingClientRect().height ?? 0) +
        (header?.getBoundingClientRect().height ?? 0);
      document.documentElement.style.setProperty("--header-offset", `${height}px`);
    }
    watch();
    apply();
    const mutations = new MutationObserver(() => {
      watch();
      apply();
    });
    mutations.observe(root, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#content">
        {t("nav.skip")}
      </a>
      <AnnouncementBar />
      <header className="site-header">
        <Navbar />
      </header>
      <main id="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
