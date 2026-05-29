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

/** 2026 season — chronological from May onward */
export const homeConcerts: HomeConcertItem[] = [
  {
    dateKey: "concert.s2026.may.staromestske.date",
    dateIso: "2026-05-30",
    eventType: "public",
    titleKey: "concert.s2026.may.staromestske.title",
    placeKey: "concert.s2026.may.staromestske.place",
    venueKey: "concert.s2026.may.staromestske.venue",
    timeKey: "concert.s2026.may.staromestske.time",
    mapsUrl: "https://www.google.com/maps/search/Mari%C3%A1nske+n%C3%A1mestie+%C5%BDilina",
    externalUrl: "https://www.kulturazilina.sk/staromestske-slavnosti/",
  },
  {
    dateKey: "concert.s2026.jun.workshops.date",
    dateIso: "2026-06-06",
    dateDisplayKey: "concert.s2026.jun.workshops.dateDisplay",
    eventType: "private",
    titleKey: "concert.s2026.jun.workshops.title",
  },
  {
    dateKey: "concert.s2026.jun.promocie.date",
    dateIso: "2026-06-26",
    eventType: "private",
    titleKey: "concert.s2026.jun.promocie.title",
  },
  {
    dateKey: "concert.s2026.jul.terchova.date",
    dateIso: "2026-07-05",
    eventType: "public",
    titleKey: "concert.s2026.jul.terchova.title",
    placeKey: "concert.s2026.jul.terchova.place",
    externalUrl: "https://www.terchova.sk/podujatia/cyrilometodske-dni",
    primaryCtaKey: "program.moreAboutEvent",
    mapsUrl: "https://www.google.com/maps/search/Terchov%C3%A1+Slovakia",
  },
  {
    dateKey: "concert.s2026.aug.wcg.date",
    dateIso: "2026-08-12",
    dateDisplayKey: "concert.s2026.aug.wcg.dateDisplay",
    eventType: "majorInternational",
    titleKey: "concert.s2026.aug.wcg.title",
    placeKey: "concert.s2026.aug.wcg.place",
    mapsUrl: "https://www.google.com/maps/search/Sweden",
    externalUrl: "https://www.interkultur.com/events/world-choir-games/helsingborg-2026",
  },
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
