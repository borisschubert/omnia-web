"use client";

import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { localePath } from "@/lib/i18n/config";
import { newsArticles, newsCardImageClass, sortNewsArticles } from "@/lib/content/newsArticles";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";

const HOMEPAGE_NEWS = 2;

const sortedNews = sortNewsArticles(newsArticles);

export default function HomeNewsSection({ locale }: { locale: Locale }) {
  const items = sortedNews.slice(0, HOMEPAGE_NEWS);

  return (
    <section id="news" className="border-t border-[rgba(255,215,0,0.08)] bg-[#050505] py-14 md:py-20">
      <Container>
        <RevealOnScroll>
          <SectionHeading>{t(locale, "section.homeNewsTitle")}</SectionHeading>
          <StaggerContainer className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-8 md:gap-6">
            {items.map((item, i) => (
              <StaggerItem key={item.slug} index={i} className="flex h-full min-h-0">
                <article className="group premium-card-hover flex h-full min-h-[20rem] w-full flex-col overflow-hidden rounded-xl border border-[rgba(255,215,0,0.12)] bg-[#0a0a0a] sm:min-h-[22rem]">
                  <Link
                    href={localePath(`/aktuality/${item.slug}`, locale)}
                    className="relative block aspect-[16/9] w-full shrink-0 overflow-hidden bg-black sm:aspect-[2/1]"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className={newsCardImageClass}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between p-5 md:p-6 lg:p-7">
                    <div className="min-h-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary-gold)]">
                          {t(locale, item.categoryKey)}
                        </span>
                        <span className="text-sm text-[#FFFFFF]/55">{t(locale, item.dateKey)}</span>
                      </div>
                      {item.priorityBadgeKey ? (
                        <span className="mt-3 inline-flex w-fit rounded border border-[var(--primary-gold)]/80 bg-[rgba(255,215,0,0.08)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary-gold)] shadow-[0_0_14px_-4px_rgba(255,215,0,0.35)]">
                          {t(locale, item.priorityBadgeKey)}
                        </span>
                      ) : null}
                      <h3
                        className={`line-clamp-3 text-xl font-semibold leading-snug text-white md:text-2xl ${item.priorityBadgeKey ? "mt-2" : "mt-3"}`}
                      >
                        <Link
                          href={localePath(`/aktuality/${item.slug}`, locale)}
                          className="transition-colors hover:text-[var(--primary-gold)]"
                        >
                          {t(locale, item.titleKey)}
                        </Link>
                      </h3>
                      <p className="mt-3 line-clamp-3 text-base leading-relaxed text-[#FFFFFF]/75">
                        {t(locale, item.excerptKey)}
                      </p>
                    </div>
                    <Link
                      href={localePath(`/aktuality/${item.slug}`, locale)}
                      className="group/read mt-5 inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--primary-gold)] transition-colors hover:text-white"
                    >
                      <span>{t(locale, "button.readMore")}</span>
                      <span className="inline-flex translate-x-0 transition-transform duration-200 group-hover/read:translate-x-1" aria-hidden>
                        <svg viewBox="0 0 16 16" fill="none" className="size-4 text-[var(--primary-gold)]" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8 md:mt-10">
            <Link
              href={localePath("/aktuality", locale)}
              className="gold-hover inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--primary-gold)] px-6 py-2 text-xs font-semibold text-black md:text-sm"
            >
              {t(locale, "section.newsHomepageCTA")}
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
