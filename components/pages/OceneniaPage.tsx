"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";
import Link from "next/link";

import { awards, type Award } from "@/lib/content/awards";

const stats = [
  { target: 20, labelKey: "page.awards.stats.tradition" },
  { target: 25, labelKey: "page.awards.stats.internationalAwards" },
  { target: 10, labelKey: "page.awards.stats.worldCountries" },
] as const;

/** ~1.75s — within 1.5–2s range */
const COUNT_DURATION_MS = 1750;
const FADE_DURATION_MS = 800;
const REVEAL_DURATION_MS = 650;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useInViewOnce<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(target: number, durationMs: number, active: boolean, reducedMotion: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(t);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reducedMotion]);
  return value;
}

function AwardsIntroBlock({ locale }: { locale: Locale }) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.12);

  const c0 = useCountUp(stats[0].target, COUNT_DURATION_MS, inView, reducedMotion);
  const c1 = useCountUp(stats[1].target, COUNT_DURATION_MS, inView, reducedMotion);
  const c2 = useCountUp(stats[2].target, COUNT_DURATION_MS, inView, reducedMotion);
  const counts = [c0, c1, c2];

  const fadeMs = reducedMotion ? 0 : FADE_DURATION_MS;

  return (
    <div
      ref={ref}
      className={`mx-auto max-w-2xl will-change-[opacity,transform] ${
        inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{
        transition: `opacity ${fadeMs}ms ease-out, transform ${fadeMs}ms ease-out`,
      }}
    >
      <LoadTitleEnter>
        <h1 className="relative text-2xl font-semibold tracking-tight text-white md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
          {t(locale, "page.awards.title")}
        </h1>
      </LoadTitleEnter>
      <p className="mt-6 text-[0.9375rem] leading-relaxed text-white md:text-base">
        {t(locale, "page.awards.intro")}
      </p>

      <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8">
        {stats.map((stat, i) => (
          <div key={stat.labelKey} className="flex flex-col items-center text-center">
            <p className="awards-stat-number text-2xl font-light tabular-nums leading-none md:text-[1.75rem]">
              <span className="inline-block tabular-nums">{counts[i]}</span>
              <span className="inline text-accent">+</span>
            </p>
            <p
              className={`mt-2 max-w-[9.5rem] text-[0.625rem] font-medium leading-tight tracking-[0.12em] text-white/72 md:mt-2.5 md:max-w-none md:text-[0.6875rem] md:tracking-[0.14em] ${locale === "en" ? "uppercase" : ""}`}
            >
              {t(locale, stat.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M8 21h8M12 17v4M7 4h10l1 7H6l1-7zM9 11l1.5 4h3L15 11M6 11h12M12 7V2" />
    </svg>
  );
}

function useRevealOnScrollOnceUl(reducedMotion: boolean) {
  const ref = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);
  return { ref, revealed };
}

function AwardListItem({
  award,
  locale,
  reducedMotion,
  revealed,
  staggerIndex,
}: {
  award: Award;
  locale: Locale;
  reducedMotion: boolean;
  revealed: boolean;
  staggerIndex: number;
}) {
  const dur = reducedMotion ? 0 : REVEAL_DURATION_MS;
  const delay = reducedMotion ? 0 : staggerIndex * 100;

  return (
    <li
      className={`premium-card-hover flex gap-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 ${revealed ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"}`}
      style={{
        transition: `opacity ${dur}ms ease-out, transform ${dur}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <TrophyIcon className="mt-0.5 size-[1.125rem] shrink-0 text-accent sm:size-5" />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold leading-snug text-foreground sm:text-base">{t(locale, award.competitionKey)}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted sm:text-[0.8125rem]">{t(locale, award.locationKey)}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {award.badgeKeys.map((key) => (
            <span
              key={key}
              className="inline-flex rounded border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium leading-tight text-accent sm:text-[11px]"
            >
              {t(locale, key)}
            </span>
          ))}
        </div>

        {award.specialPrizeKeys && award.specialPrizeKeys.length > 0 && (
          <div className="mt-3 space-y-2">
            {award.specialPrizeKeys.map((key) => (
              <p key={key} className="text-[11px] italic leading-relaxed text-[#cccccc] sm:text-xs">
                {t(locale, key)}
              </p>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function AwardYearBlock({
  year,
  items,
  locale,
  reducedMotion,
}: {
  year: string;
  items: Award[];
  locale: Locale;
  reducedMotion: boolean;
}) {
  const { ref, revealed } = useRevealOnScrollOnceUl(reducedMotion);

  return (
    <div className="mb-14 last:mb-0 md:mb-16">
      <h2 className="mb-4 border-b border-accent/30 pb-3 text-left text-xl font-semibold tracking-[0.2em] text-accent md:mb-5 md:text-2xl md:tracking-[0.24em]">
        {year}
      </h2>
      <ul ref={ref} className="flex flex-col gap-3 md:gap-3.5" role="list">
        {items.map((award, index) => (
          <AwardListItem
            key={`${award.competitionKey}-${index}`}
            award={award}
            locale={locale}
            reducedMotion={reducedMotion}
            revealed={revealed}
            staggerIndex={index}
          />
        ))}
      </ul>
    </div>
  );
}

function groupAwardsByYear(items: Award[]): { year: string; items: Award[] }[] {
  const map = new Map<string, Award[]>();
  for (const award of items) {
    const y = award.year;
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(award);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => parseInt(b, 10) - parseInt(a, 10))
    .map(([year, grouped]) => ({ year, items: grouped }));
}

export default function OceneniaPage({ locale }: { locale: Locale }) {
  const byYear = groupAwardsByYear(awards);
  const reducedMotion = usePrefersReducedMotion();
  /** Featured box = newest award (first item in `awards`) */
  const featured = awards[0];
  const featuredCompetition = t(locale, featured.competitionKey);
  const featuredTitle = featuredCompetition.includes(featured.year)
    ? featuredCompetition
    : `${featuredCompetition} ${featured.year}`;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <section className="awards-intro-hero relative overflow-hidden border-b border-accent/15 py-24 md:py-40 lg:py-44">
        <Container className="relative z-[1]">
          <AwardsIntroBlock locale={locale} />

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-white/10 bg-black/25 px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[2px] md:mt-14 md:px-6 md:py-5">
            <p className="text-[0.8125rem] leading-snug text-white/85 md:text-sm">
              <span className="font-semibold text-white">{featuredTitle}</span>
              <span className="text-white/75"> · {t(locale, featured.locationKey)}</span>
              <span className="text-accent"> — {featured.badgeKeys.map((key) => t(locale, key)).join(" · ")}</span>
            </p>
            <p className="mt-1.5 text-xs text-white/70 md:text-[0.8125rem]">{t(locale, "page.awards.featured.description")}</p>
            <div className="mt-4 flex w-full justify-center">
              <Link
                href="#awards-list"
                className="gold-hover inline-flex items-center justify-center rounded-full border-2 border-accent bg-transparent px-5 py-2.5 text-xs font-medium text-accent transition-colors duration-300 hover:bg-accent hover:text-black md:text-sm"
              >
                {t(locale, "page.awards.featured.cta")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="awards-list" className="py-10 md:py-14">
        <Container>
          <div className="mx-auto max-w-2xl">
            {byYear.map(({ year, items }) => (
              <AwardYearBlock key={year} year={year} items={items} locale={locale} reducedMotion={reducedMotion} />
            ))}

            <p className="mt-10 border-t border-[var(--divider)] pt-8 text-[0.8125rem] leading-relaxed text-foreground-muted sm:text-sm">
              {t(locale, "page.awards.representation")}
            </p>

            <div className="mt-8 text-center">
              <Link
                href={locale === "sk" ? "/" : "/en"}
                className="text-sm font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t(locale, "nav.home")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
