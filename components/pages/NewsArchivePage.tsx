"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { newsArticles, sortNewsArticles, type NewsArticleMeta } from "@/lib/content/newsArticles";
import PageHero from "@/components/pk/PageHero";
import Kicker from "@/components/pk/Kicker";
import { LongArrow } from "@/components/pk/Icons";
import { pkButtonClass } from "@/components/pk/PkButton";
import RollText from "@/components/ds/RollText";

const sortedItems = sortNewsArticles(newsArticles);
const PAGE_SIZE = 6;

function href(item: NewsArticleMeta, locale: Locale) {
  return localePath(`/aktuality/${item.slug}`, locale);
}

function Meta({ item, locale }: { item: NewsArticleMeta; locale: Locale }) {
  return (
    <Kicker>
      <span className="text-brass-ink">{t(locale, item.categoryKey)}</span> · {t(locale, item.dateKey)}
    </Kicker>
  );
}

function ReadMore({ locale }: { locale: Locale }) {
  return (
    <span className="inline-flex items-center gap-3 font-pk text-[12px] font-bold uppercase tracking-[0.1em] text-brass-ink">
      <span className="u-line">{t(locale, "button.readMore")}</span>
      <LongArrow className="w-7 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
    </span>
  );
}

function SearchField({ locale, value, onChange }: { locale: Locale; value: string; onChange: (v: string) => void }) {
  const label = t(locale, "page.news.searchPlaceholder");
  return (
    <label className="flex w-full max-w-[360px] items-center gap-3 self-end border-b border-coal/30 pb-2.5 transition-colors duration-200 focus-within:border-coal md:justify-self-end">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-5 shrink-0 text-graphite" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        aria-label={label}
        className="w-full min-w-0 bg-transparent font-pk text-[16px] text-coal outline-none placeholder:text-graphite"
      />
    </label>
  );
}

function Card({ item, locale }: { item: NewsArticleMeta; locale: Locale }) {
  return (
    <Link href={href(item, locale)} className="group flex h-full flex-col gap-4 text-coal">
      <div data-curtain className="relative aspect-[3/2] overflow-hidden bg-mist">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="photo object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <Meta item={item} locale={locale} />
      {item.priorityBadgeKey ? <Kicker tone="gold">{t(locale, item.priorityBadgeKey)}</Kicker> : null}
      <h2 className="m-0 font-pk text-[clamp(21px,1.8vw,26px)] font-normal leading-[1.25] tracking-[-0.01em] transition-colors duration-200 group-hover:text-brass">
        {t(locale, item.titleKey)}
      </h2>
      <p className="m-0 line-clamp-3 font-pk text-[14px] leading-[1.75] text-graphite">{t(locale, item.excerptKey)}</p>
      <div className="mt-auto pt-1">
        <ReadMore locale={locale} />
      </div>
    </Link>
  );
}

export default function NewsArchivePage({ locale }: { locale: Locale }) {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedItems;
    return sortedItems.filter(
      (item) => t(locale, item.titleKey).toLowerCase().includes(q) || t(locale, item.excerptKey).toLowerCase().includes(q)
    );
  }, [search, locale]);

  const [featured, ...rest] = filtered;
  const shown = rest.slice(0, visible);

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={t(locale, "section.homeNewsTitle")}
        title={t(locale, "page.news.title")}
        intro={<p className="m-0">{t(locale, "page.news.intro")}</p>}
        aside={<SearchField locale={locale} value={search} onChange={setSearch} />}
      />

      <section className="surface-cream bg-snow">
        <div className="wrap pb-[clamp(64px,8vw,120px)]">
          {featured ? (
            <Link
              href={href(featured, locale)}
              className="group grid items-center gap-x-[clamp(32px,5vw,88px)] gap-y-8 border-t border-hairline pt-[clamp(32px,4vw,56px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            >
              <div data-curtain className="relative aspect-[3/2] overflow-hidden bg-mist">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="photo object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Meta item={featured} locale={locale} />
                <h2 className="m-0 font-pk text-[clamp(30px,3.2vw,48px)] font-light leading-[1.15] tracking-[-0.02em] transition-colors duration-200 group-hover:text-brass">
                  {t(locale, featured.titleKey)}
                </h2>
                <p className="m-0 line-clamp-4 font-pk text-[16px] leading-[1.85] text-graphite">{t(locale, featured.excerptKey)}</p>
                <div className="pt-2">
                  <ReadMore locale={locale} />
                </div>
              </div>
            </Link>
          ) : null}

          {shown.length ? (
            <ul className="m-0 mt-[clamp(56px,7vw,104px)] grid list-none gap-x-[clamp(20px,2.4vw,36px)] gap-y-[clamp(48px,5vw,72px)] p-0 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((item) => (
                <li key={item.slug}>
                  <Card item={item} locale={locale} />
                </li>
              ))}
            </ul>
          ) : null}

          {rest.length > visible ? (
            <div className="mt-[clamp(48px,5vw,72px)] flex justify-center">
              <button type="button" onClick={() => setVisible((c) => c + PAGE_SIZE)} className={pkButtonClass("outline")}>
                <RollText>{t(locale, "page.news.loadMore")}</RollText>
              </button>
            </div>
          ) : null}

          {filtered.length === 0 ? (
            <p className="m-0 border-t border-hairline py-12 font-pk text-[17px] text-graphite">
              {locale === "sk" ? "Žiadne výsledky." : "No results."}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
