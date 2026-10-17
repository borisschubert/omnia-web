"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { highlightedAwards } from "@/lib/content/awards";
import { ArrowUpRight } from "@/components/pk/Icons";
import ArrowLink from "@/components/pk/ArrowLink";
import PkSectionHeader from "@/components/pk/PkSectionHeader";

/** "Departments" list: the hovered row turns gold; details always visible so nothing shifts */
export default function HomeAwards({ locale }: { locale: Locale }) {
  const href = localePath("/ocenenia", locale);
  const [active, setActive] = useState(0);

  return (
    <section className="surface-cream bg-mist text-coal">
      <div className="wrap section-y">
        <PkSectionHeader
          title={t(locale, "nav.awards")}
          aside={<ArrowLink href={href}>{t(locale, "page.awards.featured.cta")}</ArrowLink>}
        />

        <div className="grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="m-0 mb-[clamp(20px,2.4vw,32px)] max-w-[520px] font-pk text-[clamp(18px,1.5vw,21px)] leading-[1.6]">
              {t(locale, "home.hero.titleBefore")}
              <span className="font-bold text-brass">{t(locale, "home.hero.titleGold")}</span>
              {t(locale, "home.hero.titleAfter")}.{" "}
              <span className="text-graphite">{t(locale, "home.hero.text")}</span>
            </p>
            <ul className="m-0 list-none border-t border-hairline p-0">
              {highlightedAwards.map((award, i) => {
                const on = i === active;
                return (
                  <li key={award.competitionKey + award.year} className="border-b border-hairline">
                    <Link
                      href={href}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="group flex items-start gap-6 py-[clamp(20px,2.4vw,32px)]"
                    >
                      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <span className="font-pk text-[12px] font-bold uppercase tracking-[0.14em] text-graphite">
                          {award.year} · {t(locale, award.locationKey)}
                        </span>
                        <span
                          className={`font-pk text-[clamp(26px,2.6vw,38px)] leading-[1.15] tracking-[-0.02em] transition-colors duration-200 ${
                            on ? "text-brass" : "text-graphite/70"
                          }`}
                        >
                          {t(locale, award.competitionKey)}
                        </span>
                        <span className="font-pk text-[14px] font-semibold leading-[1.6] text-coal">
                          {award.badgeKeys.map((k) => t(locale, k)).join(" · ")}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={`mt-6 size-7 shrink-0 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          on ? "text-coal" : "text-graphite/60"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-curtain className="relative aspect-[4/5] overflow-hidden bg-coal">
            {/* Zoomed from the top so the sponsor strip at the bottom of the photo stays out of frame */}
            <div className="absolute inset-0 origin-top-right scale-[1.14]">
              <Image
                src="/images/wcg-2026-medaily.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 36vw"
                className="photo object-cover object-right-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
