import { BrowserRouter } from "react-router-dom";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AnnouncementProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </AnnouncementProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
