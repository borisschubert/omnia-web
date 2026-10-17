import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { getUpcomingConcerts } from "@/lib/content/homeConcerts";
import { concertDateBadge, concertMeta, concertTypeLabel } from "@/lib/content/concertFormat";
import { ArrowUpRight } from "@/components/pk/Icons";
import ArrowLink from "@/components/pk/ArrowLink";
import PkSectionHeader from "@/components/pk/PkSectionHeader";

const PREVIEW = 3;

/** "Programs" list: date in gold, thin title, meta, arrow — on white */
export default function HomeConcerts({ locale }: { locale: Locale }) {
  const items = [...getUpcomingConcerts()].sort((a, b) => a.dateIso.localeCompare(b.dateIso)).slice(0, PREVIEW);
  const programHref = localePath("/program", locale);

  return (
    <section id="concerts" className="surface-cream bg-snow text-coal">
      <div className="wrap section-y">
        <PkSectionHeader
          title={t(locale, "section.homeEventsTitle")}
          aside={<ArrowLink href={programHref}>{t(locale, "section.programFullCta")}</ArrowLink>}
        />

        {items.length ? (
          <ul className="m-0 list-none border-t border-hairline p-0">
            {items.map((item) => {
              const { day, month } = concertDateBadge(item, locale);
              const meta = concertMeta(item, locale);
              return (
                <li key={item.dateIso + item.titleKey} className="border-b border-hairline">
                  <Link
                    href={programHref}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 py-[clamp(22px,2.6vw,34px)] md:grid-cols-[clamp(150px,14vw,200px)_minmax(0,1fr)_auto]"
                  >
                    <span className="col-span-2 flex items-baseline gap-3 font-pk md:col-span-1 md:flex-col md:gap-1">
                      <span className="text-[clamp(26px,2.4vw,34px)] font-bold leading-none tracking-[-0.02em] text-brass">
                        {day}
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-graphite">{month}</span>
                    </span>
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="font-pk text-[11px] font-bold uppercase tracking-[0.14em] text-graphite">
                        {concertTypeLabel(item, locale)}
                      </span>
                      <span className="font-pk text-[clamp(22px,2.2vw,32px)] font-light leading-[1.2] tracking-[-0.015em] transition-colors duration-200 group-hover:text-brass">
                        {t(locale, item.titleKey)}
                      </span>
                      {meta ? <span className="font-pk text-[14px] text-graphite">{meta}</span> : null}
                    </span>
                    <ArrowUpRight className="size-7 text-graphite/60 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coal" />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="font-pk text-[17px] text-graphite">
            {t(locale, "page.program.moreSoon")}
          </p>
        )}
      </div>
    </section>
  );
}
