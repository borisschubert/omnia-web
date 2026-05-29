"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";

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

function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`transform transition-[transform,opacity] duration-[800ms] ease-out will-change-[transform,opacity] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function IconPalette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
      <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="14" cy="15" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const GALLERY_IMAGES = [
  { src: "/moment-1.jpg", key: "page.join.galleryAlt1" as const },
  { src: "/moment-2.jpg", key: "page.join.galleryAlt2" as const },
  { src: "/moment-3.jpg", key: "page.join.galleryAlt3" as const },
  { src: "/moment-4.jpg", key: "page.join.galleryAlt4" as const },
];

/** Match homepage Hero legibility over photography */
const joinHeroTitleShadow =
  "[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]";

export default function JoinPage({ locale }: { locale: Locale }) {
  return (
    <main className="min-h-screen bg-[#050505]">
      <section className="relative min-h-[min(85vh,820px)] w-full overflow-hidden sm:min-h-[80vh] md:min-h-[85vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/hero.jpg"
            alt=""
            fill
            className="object-cover object-[center_72%] sm:object-[center_70%]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_50%_100%,rgba(0,0,0,0.5)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-[#050505]" />
        </div>
        <div className="relative z-10 flex min-h-[min(85vh,820px)] flex-col items-center justify-end px-4 pb-28 pt-20 text-center sm:min-h-[80vh] md:min-h-[85vh] md:pb-36 md:pt-24">
          <Container>
            <RevealSection>
              <div className="mx-auto flex max-w-3xl flex-col items-center">
                <LoadTitleEnter>
                  <h1
                    className={`relative text-2xl font-semibold tracking-tight text-[#FFFFFF] md:text-4xl md:leading-tight lg:text-[2.5rem] after:mx-auto after:mt-3 after:block after:h-px after:w-12 after:content-[''] after:bg-[var(--primary-gold)] ${joinHeroTitleShadow}`}
                  >
                    {t(locale, "page.join.heroTitle")}
                  </h1>
                </LoadTitleEnter>
                <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-lg">
                  {t(locale, "page.join.heroSubtitle")}
                </p>
              </div>
            </RevealSection>
          </Container>
        </div>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.08)] py-16 md:py-20 lg:py-24">
        <Container>
          <RevealSection>
            <h2 className="relative mx-auto w-fit text-center text-xl font-semibold tracking-tight text-white md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
              {t(locale, "page.join.whyHeading")}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
              {[
                {
                  Icon: IconPalette,
                  titleKey: "page.join.why1Title" as const,
                  bodyKey: "page.join.why1Body" as const,
                },
                {
                  Icon: IconGlobe,
                  titleKey: "page.join.why2Title" as const,
                  bodyKey: "page.join.why2Body" as const,
                },
                {
                  Icon: IconUsers,
                  titleKey: "page.join.why3Title" as const,
                  bodyKey: "page.join.why3Body" as const,
                },
              ].map(({ Icon, titleKey, bodyKey }) => (
                <div
                  key={titleKey}
                  className="flex flex-col rounded-2xl border border-[rgba(255,215,0,0.2)] bg-[#0a0a0a] p-6 md:p-8"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl border border-[rgba(255,215,0,0.25)] bg-[rgba(255,215,0,0.06)] text-[var(--primary-gold)]">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{t(locale, titleKey)}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#FFFFFF]/90">{t(locale, bodyKey)}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <RevealSection>
            <h2 className="relative mx-auto w-fit text-center text-xl font-semibold tracking-tight text-white md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
              {t(locale, "page.join.galleryHeading")}
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" role="list">
              {GALLERY_IMAGES.map(({ src, key }, i) => (
                <li key={`${src}-${i}`} className="overflow-hidden rounded-xl border border-[rgba(255,215,0,0.12)] bg-black transition-colors duration-200 hover:border-[var(--primary-gold)]">
                  <div className="relative aspect-square">
                    <Image src={src} alt={t(locale, key)} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                  </div>
                </li>
              ))}
            </ul>
          </RevealSection>
        </Container>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.08)] py-16 md:py-20">
        <Container>
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="relative mx-auto inline-block text-xl font-semibold tracking-tight text-white md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
                {t(locale, "page.join.whoTitle")}
              </h2>
              <p className="mt-8 text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-base">
                {t(locale, "page.join.whoBody")}
              </p>
            </div>
          </RevealSection>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-[rgba(255,215,0,0.12)] py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(26,22,8,0.55)_0%,rgba(5,5,5,0.96)_55%,#050505_100%)]"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,215,0,0.07)_0%,transparent_50%)]" aria-hidden />
        <Container className="relative z-[1]">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xl font-semibold leading-snug text-[#FFFFFF] md:text-2xl md:leading-snug">
                {t(locale, "page.join.ctaTitle")}
              </p>
              <Link
                href={localePath("/kontakt", locale)}
                className="mt-10 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[var(--primary-gold)] px-10 py-3 text-base font-semibold text-black shadow-[0_0_28px_-6px_rgba(255,215,0,0.45)] transition-[box-shadow,opacity] duration-300 hover:opacity-95 hover:shadow-[0_0_40px_-4px_rgba(255,215,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              >
                {t(locale, "page.join.ctaButton")}
              </Link>
            </div>
          </RevealSection>
        </Container>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.08)] bg-[#050505] py-10">
        <Container>
          <div className="text-center">
            <Link
              href={locale === "sk" ? "/" : "/en"}
              className="text-sm font-medium text-[var(--primary-gold)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
            >
              {t(locale, "nav.home")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
