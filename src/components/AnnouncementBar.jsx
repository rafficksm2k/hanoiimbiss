import { useAnnouncement } from "../context/AnnouncementContext";
import { useI18n } from "../context/LanguageContext";
import { announcementText } from "../services/storage";

export function AnnouncementBar() {
  const { announcement } = useAnnouncement();
  const { lang } = useI18n();
  const text = announcementText(announcement, lang);
  if (!text) return null;

  return (
    <div className="announce" role="status">
      <span className="announce-mark" aria-hidden="true">
        i
      </span>
      <p>{text}</p>
    </div>
  );
}
