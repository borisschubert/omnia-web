import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { awards, type Award } from "@/lib/content/awards";
import PageHero from "@/components/pk/PageHero";
import ArrowLink from "@/components/pk/ArrowLink";
import Kicker from "@/components/pk/Kicker";

/** Figures as shown on the current site */
const stats = [
  { value: "20+", labelKey: "page.awards.stats.tradition" },
  { value: "25+", labelKey: "page.awards.stats.internationalAwards" },
  { value: "10+", labelKey: "page.awards.stats.worldCountries" },
] as const;

function groupByYear(items: Award[]) {
  const map = new Map<string, Award[]>();
  for (const a of items) map.set(a.year, [...(map.get(a.year) ?? []), a]);
  return [...map.entries()].sort(([a], [b]) => Number(b) - Number(a));
}

export default function OceneniaPage({ locale }: { locale: Locale }) {
  const featured = awards[0];
  const competition = t(locale, featured.competitionKey);
  const featuredTitle = competition.includes(featured.year) ? competition : `${competition} ${featured.year}`;

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={t(locale, "header.tagline1")}
        title={t(locale, "page.awards.title")}
        intro={<p className="m-0">{t(locale, "page.awards.intro")}</p>}
      >
        <dl className="m-0 mt-[clamp(32px,4vw,56px)] grid grid-cols-3 gap-x-[clamp(20px,3vw,48px)]">
          {stats.map((s) => (
            <div key={s.labelKey} className="flex flex-col-reverse justify-end gap-2">
              <dt className="font-pk text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-graphite">
                {t(locale, s.labelKey)}
              </dt>
              <dd className="m-0 font-pk text-[clamp(40px,4vw,60px)] font-light leading-none tracking-[-0.03em]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Newest award */}
      <section className="surface-cream bg-mist">
        <div className="wrap section-y grid items-center gap-x-[clamp(32px,5vw,88px)] gap-y-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col gap-4">
            <Kicker tone="gold">{t(locale, "page.awards.featured.description")}</Kicker>
            <h2 data-split className="m-0 font-pk text-[clamp(36px,4.4vw,64px)] font-light leading-[1.08] tracking-[-0.03em]">
              {featuredTitle}
            </h2>
            <p className="m-0 font-pk text-[16px] text-graphite">{t(locale, featured.locationKey)}</p>
            <ul className="m-0 mt-2 flex list-none flex-col gap-2 border-t border-hairline p-0 pt-5">
              {featured.badgeKeys.map((k) => (
                <li key={k} className="font-pk text-[clamp(18px,1.5vw,21px)] font-semibold">
                  {t(locale, k)}
                </li>
              ))}
            </ul>
            <ArrowLink href="#awards-list" className="mt-4 self-start">
              {t(locale, "page.awards.featured.cta")}
            </ArrowLink>
          </div>
          <div data-curtain className="relative aspect-[4/5] overflow-hidden bg-coal">
            {/* Zoomed from the top so the sponsor strip at the bottom of the photo stays out of frame */}
            <div className="absolute inset-0 origin-top scale-[1.14]">
              <Image
                src="/images/wcg-2026-medaily.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="photo object-cover object-[22%_top]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full list by year */}
      <section id="awards-list" className="surface-cream scroll-mt-24 bg-snow">
        <div className="wrap section-y">
          {groupByYear(awards).map(([year, items]) => (
            <div
              key={year}
              className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-3 border-t border-hairline py-[clamp(24px,3vw,40px)] md:grid-cols-[clamp(120px,14vw,200px)_minmax(0,1fr)]"
            >
              <h2 className="m-0 font-pk text-[clamp(32px,3.4vw,48px)] font-light leading-none tracking-[-0.02em] text-brass">{year}</h2>
              <ul className="m-0 flex list-none flex-col gap-[clamp(20px,2.4vw,32px)] p-0">
                {items.map((award, i) => (
                  <li key={`${award.competitionKey}-${i}`} className="flex flex-col gap-1.5">
                    <h3 className="m-0 font-pk text-[clamp(21px,1.9vw,27px)] font-normal leading-[1.25] tracking-[-0.01em]">
                      {t(locale, award.competitionKey)}
                    </h3>
                    <span className="font-pk text-[14px] text-graphite">{t(locale, award.locationKey)}</span>
                    <span className="font-pk text-[15px] font-semibold leading-[1.6]">
                      {award.badgeKeys.map((k) => t(locale, k)).join(" · ")}
                    </span>
                    {award.specialPrizeKeys?.map((k) => (
                      <span key={k} className="font-pk text-[14px] italic leading-[1.6] text-graphite">
                        {t(locale, k)}
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="m-0 border-t border-hairline pt-8 font-pk text-[15px] leading-[1.8] text-graphite md:pl-[calc(clamp(120px,14vw,200px)+clamp(24px,4vw,64px))]">
            {t(locale, "page.awards.representation")}
          </p>
        </div>
      </section>
    </div>
  );
}
