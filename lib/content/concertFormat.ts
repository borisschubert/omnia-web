import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import type { ConcertEventType, HomeConcertItem } from "./homeConcerts";

const intlLocale: Record<Locale, string> = { sk: "sk-SK", en: "en-GB" };

function parseIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Date badge parts, e.g. { day: "26.–29.", month: "NOV 2026" } */
export function concertDateBadge(item: HomeConcertItem, locale: Locale) {
  const start = parseIso(item.dateIso);
  const end = item.endDateIso ? parseIso(item.endDateIso) : start;
  const dot = locale === "sk" ? "." : "";
  const sameDay = end.getTime() === start.getTime();
  const day = sameDay
    ? `${start.getUTCDate()}${dot}`
    : `${start.getUTCDate()}${dot}–${end.getUTCDate()}${dot}`;
  const month = new Intl.DateTimeFormat(intlLocale[locale], { month: "short", timeZone: "UTC" })
    .format(start)
    .replace(".", "")
    .toUpperCase();
  return { day, month: `${month} ${start.getUTCFullYear()}` };
}

const typeKey: Record<ConcertEventType, string> = {
  public: "program.badge.public",
  private: "program.badge.private",
  international: "program.badge.international",
  majorInternational: "program.badge.majorInternational",
};

export function concertTypeLabel(item: HomeConcertItem, locale: Locale) {
  return t(locale, typeKey[item.eventType]);
}

/** "Place · Venue · Time" — only the parts that exist */
export function concertMeta(item: HomeConcertItem, locale: Locale) {
  return [item.placeKey, item.venueKey, item.timeKey]
    .filter((k): k is string => !!k)
    .map((k) => t(locale, k))
    .join(" · ");
}

function icsDate(iso: string) {
  return iso.replace(/-/g, "");
}

function icsEscape(text: string) {
  return text.replace(/\\/g, "\\\\").replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

/** All-day iCalendar event for the "+ Calendar" button */
export function concertIcs(item: HomeConcertItem, locale: Locale) {
  const endExclusive = parseIso(item.endDateIso ?? item.dateIso);
  endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);
  const end = endExclusive.toISOString().slice(0, 10);
  const place = [item.placeKey, item.venueKey].filter((k): k is string => !!k).map((k) => t(locale, k)).join(", ");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OMNIA//omniachoir.sk//SK",
    "BEGIN:VEVENT",
    `UID:${item.dateIso}-${item.titleKey}@omniachoir.sk`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${icsDate(item.dateIso)}`,
    `DTEND;VALUE=DATE:${icsDate(end)}`,
    `SUMMARY:${icsEscape(`OMNIA – ${t(locale, item.titleKey)}`)}`,
    place ? `LOCATION:${icsEscape(place)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}
