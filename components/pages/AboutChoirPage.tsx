"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";

const COUNT_DURATION_MS = 1750;
const CARD_BORDER = "border-[rgba(255,215,0,0.15)]";

/** Legibility over photo — rely on shadow, not heavy overlays */
const aboutHeroShadow = "[text-shadow:0_2px_4px_rgba(0,0,0,0.8)]";

const aboutBodyParagraph =
  "text-left text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-base [&_strong]:font-semibold [&_strong]:text-[#FFFFFF]";

function AboutBodyParagraph({
  locale,
  stringKey,
  className,
}: {
  locale: Locale;
  stringKey: string;
  className?: string;
}) {
  const html = t(locale, stringKey);
  if (!html.trim()) return null;
  return <p className={className ?? aboutBodyParagraph} dangerouslySetInnerHTML={{ __html: html }} />;
}

function easeOutCubic(n: number) {
  return 1 - (1 - n) ** 3;
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
      const tt = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(tt);
      setValue(Math.round(eased * target));
      if (tt < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reducedMotion]);
  return value;
}

function StatsSection({ locale }: { locale: Locale }) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.12);
  const cYear = useCountUp(2003, COUNT_DURATION_MS, inView, reducedMotion);
  const cMembers = useCountUp(45, COUNT_DURATION_MS, inView, reducedMotion);
  const cCountries = useCountUp(10, COUNT_DURATION_MS, inView, reducedMotion);
  const cAwards = useCountUp(15, COUNT_DURATION_MS, inView, reducedMotion);
  const values = [cYear, cMembers, cCountries, cAwards];
  const suffixes = ["", "", "+", "+"];
  const labelKeys = [
    "section.about.foundedLabel",
    "section.about.membersLabel",
    "page.aboutChoir.facts.countriesLabel",
    "page.aboutChoir.facts.awardsLabel",
  ] as const;

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {labelKeys.map((labelKey, i) => (
        <div
          key={labelKey}
          className={`premium-card-hover rounded-xl border ${CARD_BORDER} bg-[#050505] px-6 py-8 text-center`}
        >
          <p className="awards-stat-number text-3xl font-medium tabular-nums md:text-4xl">
            {values[i]}
            {suffixes[i]}
          </p>
          <p className="mt-2 text-xs uppercase tracking-wider text-[#FFFFFF]/85">{t(locale, labelKey)}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutChoirPage({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-[#050505]">
      <section className="relative min-h-[min(50vh,520px)] overflow-hidden md:min-h-[55vh] lg:min-h-[60vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 scale-[1.03]">
            <Image
              src="/hero.jpg"
              alt=""
              fill
              className="object-cover object-[center_72%] blur-[4px] sm:object-[center_70%]"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_50%_100%,rgba(0,0,0,0.5)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
        </div>
        <div className="relative z-10 flex min-h-[min(50vh,520px)] flex-col items-center justify-center px-4 py-16 text-center md:min-h-[55vh] md:py-20 lg:min-h-[60vh]">
          <Container>
            <LoadTitleEnter>
              <div className="flex flex-col items-center">
                <h1
                  className={`relative text-2xl font-semibold tracking-tight text-[#FFFFFF] md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent ${aboutHeroShadow}`}
                >
                  {t(locale, "page.aboutChoir.title")}
                </h1>
              </div>
            </LoadTitleEnter>
            <p className={`mx-auto mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-base ${aboutHeroShadow}`}>
              {t(locale, "page.aboutChoir.heroStatement")}
            </p>
          </Container>
        </div>
      </section>

      <section className="bg-[#050505] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border ${CARD_BORDER} bg-[#000000] md:aspect-[3/2]`}
            >
              <Image
                src="/zbor-spolu.jpg"
                alt="Spevácky zbor OMNIA - spoločenstvo hlasov"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-xl text-left">
              <AboutBodyParagraph
                locale={locale}
                stringKey="page.aboutChoir.storyP1"
                className={`${aboutBodyParagraph} mb-6`}
              />
              <AboutBodyParagraph locale={locale} stringKey="page.aboutChoir.storyP2" />
              <AboutBodyParagraph locale={locale} stringKey="page.aboutChoir.storyP3" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] pb-16 pt-0 md:pb-20 md:pt-0 lg:pb-24 lg:pt-0">
        <Container className="space-y-16 md:space-y-20 lg:space-y-24">
          <StatsSection locale={locale} />

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="order-2 max-w-xl text-left lg:order-1">
              <h2 className="relative text-xl font-semibold text-[#FFFFFF] after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent md:text-2xl">
                {t(locale, "page.aboutChoir.repertoireTitle")}
              </h2>
              <AboutBodyParagraph
                locale={locale}
                stringKey="page.aboutChoir.repertoireIntro"
                className={`${aboutBodyParagraph} mb-6 mt-6`}
              />
              <AboutBodyParagraph locale={locale} stringKey="page.aboutChoir.repertoireP1" />
              <AboutBodyParagraph locale={locale} stringKey="page.aboutChoir.repertoireP2" />
            </div>
            <div
              className={`relative order-1 aspect-[4/3] w-full overflow-hidden rounded-xl border ${CARD_BORDER} bg-[#000000] lg:order-2 md:aspect-[3/2]`}
            >
              <Image
                src="/hero.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div
            className={`mx-auto w-full max-w-2xl rounded-xl border ${CARD_BORDER} bg-[#000000] px-6 py-10 text-center md:px-10 md:py-12`}
          >
            <div className="relative mx-auto w-fit shrink-0">
              <div
                className={`relative mx-auto aspect-square w-40 overflow-hidden rounded-full border ${CARD_BORDER} bg-[#050505] md:w-52`}
              >
                <Image
                  src="/omnia-portrait.jpg"
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 160px, 208px"
                />
              </div>
            </div>
            <h2 className="mt-10 max-w-full px-2 text-balance text-lg font-semibold leading-snug text-[#FFFFFF] md:text-xl">
              {t(locale, "section.about.conductor")}
            </h2>
            <p className="mt-2 text-sm text-[#FFFFFF] md:text-[0.9375rem]">{t(locale, "section.about.conductorLabel")}</p>
            <blockquote className="mt-10 w-full max-w-xl text-pretty text-lg italic leading-relaxed text-[#FFFFFF] md:mx-auto md:text-xl md:leading-relaxed">
              &ldquo;{t(locale, "page.aboutChoir.conductorQuote")}&rdquo;
            </blockquote>
            <p className="mx-auto mt-8 w-full max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-base">
              {t(locale, "page.aboutChoir.conductorBio")}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.12)] bg-[#050505] py-16 md:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-lg font-medium leading-relaxed text-[#FFFFFF] md:text-xl">
              {t(locale, "page.aboutChoir.ctaSentence")}
            </p>
            <Link
              href={localePath("/pridaj-sa", locale)}
              className="mt-8 inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[rgba(255,215,0,0.35)] bg-transparent px-8 py-3 text-base font-medium text-[#FFD700] transition-colors duration-200 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              {t(locale, "page.aboutChoir.ctaButton")}
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.08)] bg-[#050505] py-12">
        <Container>
          <div className="text-center">
            <Link
              href={locale === "sk" ? "/" : "/en"}
              className="text-sm font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              {t(locale, "nav.home")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
