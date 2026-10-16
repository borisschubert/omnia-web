"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import type { HomeConcertItem } from "@/lib/content/homeConcerts";
import { concertDateBadge, concertIcs, concertMeta, concertTypeLabel } from "@/lib/content/concertFormat";
import { buttonClass } from "@/components/ds/Button";

function downloadIcs(item: HomeConcertItem, locale: Locale) {
  const blob = new Blob([concertIcs(item, locale)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `omnia-${item.dateIso}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Concert card with black date badge (homepage + program list) */
export default function ConcertCard({ item, locale }: { item: HomeConcertItem; locale: Locale }) {
  const { day, month } = concertDateBadge(item, locale);
  const meta = concertMeta(item, locale);
  const primaryLabel = t(locale, item.primaryCtaKey ?? "program.moreAboutConcert");

  return (
    <article className="grid grid-cols-[clamp(100px,9vw,128px)_minmax(0,1fr)] overflow-hidden rounded-[20px] bg-paper transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1 hover:shadow-[0_20px_44px_-28px_rgba(14,13,11,.5)]">
      <div className="flex flex-col items-center justify-center gap-2 bg-ink px-2 py-6 text-center text-cream">
        <span className="t-h3 whitespace-nowrap text-gold">{day}</span>
        <span className="t-label uppercase tracking-[0.08em]">{month}</span>
      </div>
      <div className="flex flex-col gap-2 p-[clamp(18px,2vw,28px)]">
        <span className="t-label text-gold-deep">{concertTypeLabel(item, locale)}</span>
        <h3 className="t-h3 m-0">{t(locale, item.titleKey)}</h3>
        {meta ? <span className="t-small font-medium text-muted">{meta}</span> : null}
        <div className="mt-2.5 flex flex-wrap gap-2">
          {item.detailPath ? (
            <Link href={localePath(item.detailPath, locale)} className={buttonClass("dark", "md")}>
              {primaryLabel}
            </Link>
          ) : item.externalUrl ? (
            <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("dark", "md")}>
              {primaryLabel}
            </a>
          ) : null}
          {item.mapsUrl ? (
            <a href={item.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "md")}>
              {t(locale, "concert.viewMap")}
            </a>
          ) : null}
          <button type="button" onClick={() => downloadIcs(item, locale)} className={buttonClass("outline", "md")}>
            {t(locale, "concert.addToCalendar")}
          </button>
        </div>
      </div>
    </article>
  );
}
