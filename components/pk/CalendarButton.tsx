"use client";

import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import type { HomeConcertItem } from "@/lib/content/homeConcerts";
import { concertIcs } from "@/lib/content/concertFormat";

/** Downloads an all-day .ics event for the concert */
export default function CalendarButton({ item, locale }: { item: HomeConcertItem; locale: Locale }) {
  function download() {
    const blob = new Blob([concertIcs(item, locale)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `omnia-${item.dateIso}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="font-pk text-[12px] font-bold uppercase tracking-[0.1em] text-coal transition-colors duration-200 hover:text-brass-ink"
    >
      <span className="u-line">{t(locale, "concert.addToCalendar")}</span>
    </button>
  );
}
