"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { localePath } from "@/lib/i18n/config";
import Container from "@/components/ui/Container";

export type NewsItem = {
  titleKey: string;
  dateKey: string;
  excerptKey: string;
  categoryKey: string;
  image?: string;
  dateIso?: string;
};

const placeholderItems: (NewsItem & { dateIso: string })[] = [
  {
    titleKey: "news.placeholder1.title",
    dateKey: "news.placeholder1.date",
    excerptKey: "news.placeholder1.excerpt",
    categoryKey: "news.category.concert",
    image: "/hero.jpg",
    dateIso: "2025-02-01",
  },
  {
    titleKey: "news.placeholder2.title",
    dateKey: "news.placeholder2.date",
    excerptKey: "news.placeholder2.excerpt",
    categoryKey: "news.category.competition",
    image: "/hero.jpg",
    dateIso: "2025-01-15",
  },
  {
    titleKey: "news.placeholder4.title",
    dateKey: "news.placeholder4.date",
    excerptKey: "news.placeholder4.excerpt",
    categoryKey: "news.category.concert",
    image: "/hero.jpg",
    dateIso: "2025-01-05",
  },
  {
    titleKey: "news.placeholder3.title",
    dateKey: "news.placeholder3.date",
    excerptKey: "news.placeholder3.excerpt",
    categoryKey: "news.category.media",
    image: "/hero.jpg",
    dateIso: "2024-12-20",
  },
];

const sortedItems = [...placeholderItems].sort(
  (a, b) => (b.dateIso || "").localeCompare(a.dateIso || "")
) as NewsItem[];

const HOMEPAGE_LIMIT = 3;

function CompactNewsCard({ item, locale }: { item: NewsItem; locale: Locale }) {
  return (
    <Link
      href={localePath("/aktuality", locale)}
      className="group block overflow-hidden rounded-2xl border border-[var(--divider)] bg-[var(--background-elevated)] transition-all duration-200 hover:translate-y-[-2px] hover:border-accent/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="border-t border-[var(--divider)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-accent/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
            {t(locale, item.categoryKey)}
          </span>
          <span className="text-xs text-foreground-muted">{t(locale, item.dateKey)}</span>
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
          {t(locale, item.titleKey)}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-foreground-muted">
          {t(locale, item.excerptKey)}
        </p>
      </div>
    </Link>
  );
}

export default function NewsSection({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) show();
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallback = setTimeout(show, 800);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const items = sortedItems.slice(0, HOMEPAGE_LIMIT);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="border-t border-[var(--divider)] bg-[var(--background)] py-12 md:py-16"
    >
      <Container>
        <div
          className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"}`}
        >
          {/* Section header */}
          <div className="mb-8">
            <h2 className="relative text-xl font-medium tracking-tight text-foreground md:text-2xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
              {t(locale, "section.latestNews")}
            </h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-foreground-muted md:text-base">
              {t(locale, "section.latestNews.intro")}
            </p>
          </div>

          {/* Compact 3-card grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((item, i) => (
              <CompactNewsCard key={i} item={item} locale={locale} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href={localePath("/aktuality", locale)}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              {t(locale, "section.newsHomepageCTA")}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
