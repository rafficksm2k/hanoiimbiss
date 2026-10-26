import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AdminPage } from "../pages/AdminPage";
import { ContactPage } from "../pages/ContactPage";
import { DatenschutzPage } from "../pages/DatenschutzPage";
import { HomePage } from "../pages/HomePage";
import { HoursPage } from "../pages/HoursPage";
import { ImpressumPage } from "../pages/ImpressumPage";
import { MenuPage } from "../pages/MenuPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="speisekarte" element={<MenuPage />} />
        <Route path="oeffnungszeiten" element={<HoursPage />} />
        <Route path="kontakt" element={<ContactPage />} />
        <Route path="impressum" element={<ImpressumPage />} />
        <Route path="datenschutz" element={<DatenschutzPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
