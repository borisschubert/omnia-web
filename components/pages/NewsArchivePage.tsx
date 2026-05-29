"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { localePath } from "@/lib/i18n/config";
import {
  newsArticles,
  newsCardImageClass,
  sortNewsArticles,
  type NewsArticleMeta,
} from "@/lib/content/newsArticles";
import Container from "@/components/ui/Container";

const sortedItems = sortNewsArticles(newsArticles);

const GRID_INITIAL = 6;
const GRID_PAGE_SIZE = 6;

function NewsCategoryBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 rounded border border-[var(--primary-gold)]/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--primary-gold)] sm:text-[11px] sm:tracking-[0.22em]">
      {children}
    </span>
  );
}

function ReadMoreLink({
  href,
  locale,
  className = "",
}: {
  href: string;
  locale: Locale;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/read inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--primary-gold)] transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${className}`}
    >
      <span>{t(locale, "button.readMore")}</span>
      <span className="inline-flex translate-x-0 transition-transform duration-200 group-hover/read:translate-x-1" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[var(--primary-gold)]" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}

function SearchField({ locale, value, onChange }: { locale: Locale; value: string; onChange: (v: string) => void }) {
  const label = t(locale, "page.news.searchPlaceholder");
  return (
    <div className="relative w-full max-w-[min(100%,20rem)] border-b border-[var(--primary-gold)]/45 pb-2 transition-colors duration-200 focus-within:border-[var(--primary-gold)]">
      <div className="flex items-center gap-2">
        <span className="shrink-0 text-[var(--primary-gold)]" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          aria-label={label}
          className="w-full min-w-0 border-0 bg-transparent py-1 text-sm text-foreground placeholder:text-[#aaaaaa] outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}

function articleHref(item: NewsArticleMeta, locale: Locale) {
  return localePath(`/aktuality/${item.slug}`, locale);
}

function PriorityBadge({ locale, badgeKey }: { locale: Locale; badgeKey: string }) {
  return (
    <span className="mb-2 inline-flex w-fit rounded border border-[var(--primary-gold)]/80 bg-[rgba(255,215,0,0.08)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary-gold)] shadow-[0_0_14px_-4px_rgba(255,215,0,0.35)]">
      {t(locale, badgeKey)}
    </span>
  );
}

function NewsGridCard({ item, locale }: { item: NewsArticleMeta; locale: Locale }) {
  const href = articleHref(item, locale);

  return (
    <article className="group premium-card-hover flex h-full min-h-[22rem] flex-col overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] sm:min-h-[24rem]">
      <Link href={href} className="relative block aspect-[16/9] shrink-0 overflow-hidden">
        <Image
          src={item.image}
          alt=""
          fill
          className={newsCardImageClass}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col justify-between border-t border-[#1a1a1a] p-4 transition-colors duration-200 hover:border-[#FFD700]/35">
        <div className="min-h-0">
          <div className="flex flex-wrap items-center gap-2">
            <NewsCategoryBadge>{t(locale, item.categoryKey)}</NewsCategoryBadge>
            <span className="text-xs text-foreground-muted">{t(locale, item.dateKey)}</span>
          </div>
          {item.priorityBadgeKey ? (
            <PriorityBadge locale={locale} badgeKey={item.priorityBadgeKey} />
          ) : null}
          <h2 className={`line-clamp-2 text-sm font-semibold leading-snug text-foreground ${item.priorityBadgeKey ? "mt-0" : "mt-2"}`}>
            <Link href={href} className="transition-colors hover:text-[var(--primary-gold)]">
              {t(locale, item.titleKey)}
            </Link>
          </h2>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-foreground-muted">
            {t(locale, item.excerptKey)}
          </p>
        </div>
        <ReadMoreLink href={href} locale={locale} className="mt-4 shrink-0" />
      </div>
    </article>
  );
}

export default function NewsArchivePage({ locale }: { locale: Locale }) {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(GRID_INITIAL);

  const filtered = useMemo(() => {
    if (!search.trim()) return sortedItems;
    const q = search.trim().toLowerCase();
    return sortedItems.filter(
      (item) =>
        t(locale, item.titleKey).toLowerCase().includes(q) ||
        t(locale, item.excerptKey).toLowerCase().includes(q)
    );
  }, [search, locale]);

  const [featured, ...rest] = filtered;
  const displayed = rest.slice(0, visibleCount);
  const hasMore = rest.length > visibleCount;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0c0a06] to-[#1a1608]">
      <section className="border-b border-white/[0.06] pb-10 pt-10 md:pb-12 md:pt-12 lg:pt-14">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="relative text-2xl font-semibold tracking-tight text-white md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
                {t(locale, "page.news.title")}
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/85 md:text-base">
                {t(locale, "page.news.subtitle")}
              </p>
            </div>
            <SearchField locale={locale} value={search} onChange={setSearch} />
          </div>
        </Container>
      </section>

      {featured && (
        <section className="relative overflow-hidden border-b border-white/[0.06] py-10 md:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_42%,rgba(255,215,0,0.14)_0%,rgba(255,215,0,0.04)_38%,transparent_62%)]"
            aria-hidden
          />
          <Container className="relative z-[1]">
            <article className="group grid overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.18)] bg-[#0a0a0a]/90 shadow-[0_0_60px_-24px_rgba(255,215,0,0.2)] backdrop-blur-sm lg:min-h-[min(360px,52vh)] lg:grid-cols-2 lg:gap-0">
              <Link href={articleHref(featured, locale)} className="relative block aspect-[16/10] min-h-[200px] lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className={newsCardImageClass}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </Link>
              <div className="flex flex-col justify-between border-t border-[rgba(255,215,0,0.12)] p-6 lg:border-l lg:border-t-0 lg:p-10">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <NewsCategoryBadge>{t(locale, featured.categoryKey)}</NewsCategoryBadge>
                    <span className="text-sm text-foreground-muted">{t(locale, featured.dateKey)}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold leading-snug text-white md:text-2xl lg:text-[1.65rem]">
                    <Link href={articleHref(featured, locale)} className="transition-colors hover:text-[var(--primary-gold)]">
                      {t(locale, featured.titleKey)}
                    </Link>
                  </h2>
                  <p className="mt-4 line-clamp-4 text-[0.9375rem] leading-relaxed text-foreground-muted md:line-clamp-3">
                    {t(locale, featured.excerptKey)}
                  </p>
                </div>
                <div className="mt-8 shrink-0">
                  <ReadMoreLink href={articleHref(featured, locale)} locale={locale} />
                </div>
              </div>
            </article>
          </Container>
        </section>
      )}

      <section className="py-10 md:py-14">
        <Container>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" role="list">
            {displayed.map((item) => (
              <li key={item.slug} className="flex h-full min-h-0">
                <NewsGridCard item={item} locale={locale} />
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + GRID_PAGE_SIZE)}
                className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[var(--primary-gold)]/60 bg-transparent px-8 py-2.5 text-sm font-medium text-[var(--primary-gold)] transition-colors duration-200 hover:border-[var(--primary-gold)] hover:bg-[var(--primary-gold)] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1608]"
              >
                {t(locale, "page.news.loadMore")}
              </button>
            </div>
          )}

          {filtered.length === 0 && (
            <p className="py-12 text-center text-foreground-muted">
              {locale === "sk" ? "Žiadne výsledky." : "No results."}
            </p>
          )}

          <div className="mt-12 text-center">
            <Link
              href={locale === "sk" ? "/" : "/en"}
              className="text-sm font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1608]"
            >
              {t(locale, "nav.home")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
