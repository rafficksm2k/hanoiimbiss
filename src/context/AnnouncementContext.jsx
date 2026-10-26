import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { KEYS, clearAnnouncementStorage, readAnnouncement, writeAnnouncement } from "../services/storage";

const AnnouncementContext = createContext(null);

export function AnnouncementProvider({ children }) {
  const [announcement, setAnnouncement] = useState(() => readAnnouncement());

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === KEYS.announcement) setAnnouncement(readAnnouncement());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({
      announcement,
      saveAnnouncement(next) {
        writeAnnouncement(next);
        setAnnouncement(readAnnouncement());
      },
      clearAnnouncement() {
        clearAnnouncementStorage();
        setAnnouncement(readAnnouncement());
      },
    }),
    [announcement],
  );

  return <AnnouncementContext.Provider value={value}>{children}</AnnouncementContext.Provider>;
}

export function useAnnouncement() {
  const ctx = useContext(AnnouncementContext);
  if (!ctx) throw new Error("useAnnouncement must be used inside AnnouncementProvider");
  return ctx;
}
