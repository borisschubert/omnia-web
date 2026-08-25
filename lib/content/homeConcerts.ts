/** Used for program page badges and filtering */
export type ConcertEventType =
  | "public"
  | "private"
  | "international"
  | "majorInternational";

export type HomeConcertItem = {
  dateKey: string;
  /** ISO date `YYYY-MM-DD` for sorting / month grouping (start date for ranges) */
  dateIso: string;
  /** Optional override for program card date column (e.g. multi-day ranges) */
  dateDisplayKey?: string;
  eventType: ConcertEventType;
  titleKey: string;
  placeKey?: string;
  timeKey?: string;
  ticketKey?: string;
  venueKey?: string;
  addressKey?: string;
  mapsUrl?: string;
  /** Optional external URL for the primary CTA (map link stays separate) */
  externalUrl?: string;
  /** Internal path for primary CTA — uses Next.js Link (locale-aware) */
  detailPath?: string;
  /** i18n key for primary CTA label; defaults to program.moreAboutConcert */
  primaryCtaKey?: string;
  descriptionKey?: string;
};

/** 2026 season — chronological from September onward */
export const homeConcerts: HomeConcertItem[] = [
  {
    dateKey: "concert.s2026.sep.festival.date",
    dateIso: "2026-09-06",
    eventType: "public",
    titleKey: "concert.s2026.sep.festival.title",
    placeKey: "concert.s2026.sep.festival.place",
    mapsUrl: "https://www.google.com/maps/search/Nitrianske+Pravno",
  },
  {
    dateKey: "concert.s2026.nov.project.date",
    dateIso: "2026-11-26",
    dateDisplayKey: "concert.s2026.nov.project.dateDisplay",
    eventType: "international",
    titleKey: "concert.s2026.nov.project.title",
    placeKey: "concert.s2026.nov.project.place",
    mapsUrl: "https://www.google.com/maps/search/Rzesz%C3%B3w+Poland",
  },
  {
    dateKey: "concert.s2026.dec.gaudium.date",
    dateIso: "2026-12-20",
    eventType: "private",
    titleKey: "concert.s2026.dec.gaudium.title",
    placeKey: "concert.s2026.dec.gaudium.place",
  },
];

/**
 * Returns only concerts that are today or in the future, so events
 * automatically disappear from the site once their date has passed —
 * no manual cleanup needed.
 *
 * Note: for multi-day events (e.g. a festival spanning several days),
 * `dateIso` is the *start* date, so the event drops off the list on the
 * day after it starts, not after it ends.
 */
export function getUpcomingConcerts(referenceDate: Date = new Date()): HomeConcertItem[] {
  const y = referenceDate.getFullYear();
  const m = String(referenceDate.getMonth() + 1).padStart(2, "0");
  const d = String(referenceDate.getDate()).padStart(2, "0");
  const todayIso = `${y}-${m}-${d}`;

  return homeConcerts.filter((item) => item.dateIso >= todayIso);
}
