import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import type { HomeConcertItem } from "@/lib/content/homeConcerts";
import { getUpcomingConcerts } from "@/lib/content/homeConcerts";
import { concertDateBadge, concertTypeLabel } from "@/lib/content/concertFormat";
import PageHero from "@/components/pk/PageHero";
import PkButton from "@/components/pk/PkButton";
import ArrowLink from "@/components/pk/ArrowLink";
import Kicker from "@/components/pk/Kicker";
import CalendarButton from "@/components/pk/CalendarButton";

function groupByMonth(items: HomeConcertItem[], locale: Locale) {
  const sorted = [...items].sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  const tag = locale === "sk" ? "sk-SK" : "en-GB";
  const groups: { key: string; label: string; items: HomeConcertItem[] }[] = [];
  for (const item of sorted) {
    const d = new Date(`${item.dateIso}T12:00:00`);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (groups.at(-1)?.key !== key) {
      const raw = new Intl.DateTimeFormat(tag, { month: "long", year: "numeric" }).format(d);
      groups.push({ key, label: raw.charAt(0).toUpperCase() + raw.slice(1), items: [] });
    }
    groups.at(-1)!.items.push(item);
  }
  return groups;
}

function EventRow({ item, locale }: { item: HomeConcertItem; locale: Locale }) {
  const { day, month } = concertDateBadge(item, locale);
  const place = [item.placeKey, item.venueKey].filter((k): k is string => !!k).map((k) => t(locale, k)).join(" · ");
  const isPrivate = item.eventType === "private";
  const primaryLabel = t(locale, item.primaryCtaKey ?? "program.moreAboutConcert");

  return (
    <li className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-4 border-b border-hairline py-[clamp(28px,3.2vw,44px)] md:grid-cols-[clamp(150px,14vw,200px)_minmax(0,1fr)]">
      <div className="flex items-baseline gap-3 font-pk md:flex-col md:gap-1.5">
        <span className="text-[clamp(28px,2.6vw,38px)] font-bold leading-none tracking-[-0.02em] text-brass">{day}</span>
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-graphite">{month}</span>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <Kicker tone={item.eventType === "majorInternational" ? "gold" : "muted"}>{concertTypeLabel(item, locale)}</Kicker>
        <h3 className="m-0 font-pk text-[clamp(24px,2.4vw,34px)] font-light leading-[1.2] tracking-[-0.015em]">
          {t(locale, item.titleKey)}
        </h3>
        {place ? <p className="m-0 font-pk text-[16px] text-coal">{place}</p> : null}
        {item.timeKey ? <p className="m-0 font-pk text-[14px] text-graphite">{t(locale, item.timeKey)}</p> : null}
        {item.descriptionKey ? (
          <p className="m-0 mt-1 max-w-[640px] font-pk text-[15px] leading-[1.8] text-graphite">{t(locale, item.descriptionKey)}</p>
        ) : null}
        {item.addressKey ? <p className="m-0 font-pk text-[13px] text-graphite">{t(locale, item.addressKey)}</p> : null}

        {isPrivate ? null : (
          <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-4">
            {item.detailPath ? (
              <PkButton href={localePath(item.detailPath, locale)}>{primaryLabel}</PkButton>
            ) : item.externalUrl ? (
              <PkButton href={item.externalUrl} external>
                {primaryLabel}
              </PkButton>
            ) : null}
            {item.ticketKey ? (
              <span className="font-pk text-[13px] font-semibold text-coal">{t(locale, item.ticketKey)}</span>
            ) : null}
            {item.mapsUrl ? (
              <ArrowLink href={item.mapsUrl} external>
                {t(locale, "concert.viewMap")}
              </ArrowLink>
            ) : null}
            <CalendarButton item={item} locale={locale} />
          </div>
        )}
      </div>
    </li>
  );
}

export default function ProgramPage({ locale }: { locale: Locale }) {
  const groups = groupByMonth(getUpcomingConcerts(), locale);

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={t(locale, "section.homeEventsTitle")}
        title={t(locale, "page.program.title")}
        intro={<p className="m-0">{t(locale, "page.program.intro")}</p>}
      />

      <section className="surface-cream bg-snow">
        <div className="wrap pb-[clamp(64px,8vw,120px)]">
          {groups.map((group) => (
            <div key={group.key} className="mb-[clamp(40px,5vw,72px)] last:mb-0">
              <h2
                data-split
                className="m-0 border-b border-coal pb-4 font-pk text-[clamp(20px,1.8vw,26px)] font-extrabold uppercase tracking-[0.04em] text-coal"
              >
                {group.label}
              </h2>
              <ul className="m-0 list-none p-0">
                {group.items.map((item) => (
                  <EventRow key={item.dateIso + item.titleKey} item={item} locale={locale} />
                ))}
              </ul>
            </div>
          ))}

          <p className="m-0 mt-[clamp(32px,4vw,56px)] font-pk text-[17px] italic text-graphite">
            {t(locale, "page.program.moreSoon")}
          </p>
        </div>
      </section>
    </div>
  );
}
