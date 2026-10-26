import { useI18n } from "../context/LanguageContext";
import { SlotIcon } from "./Icons";

export function HoursBoard() {
  const { dict } = useI18n();

  return (
    <div className="hours-grid">
      {dict.hours.slots.map((slot) => (
        <article key={slot.id} className={slot.closed ? "hour-card is-closed" : "hour-card"}>
          <span className="hour-icon">
            <SlotIcon id={slot.id} />
          </span>
          <h3>{slot.label}</h3>
          <p className={slot.closed ? "hour-closed" : undefined}>{slot.value}</p>
        </article>
      ))}
    </div>
  );
}
