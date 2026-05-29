"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { localePath } from "@/lib/i18n/config";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";

const COUNT_MS = 1750;

function easeOutCubic(n: number) {
  return 1 - (1 - n) ** 3;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
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
      ([e]) => {
        if (e?.isIntersecting) {
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
      setValue(Math.round(easeOutCubic(tt) * target));
      if (tt < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs, reducedMotion]);
  return value;
}

function StatsPair({ locale }: { locale: Locale }) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.12);
  const y = useCountUp(2003, COUNT_MS, inView, reducedMotion);
  const m = useCountUp(45, COUNT_MS, inView, reducedMotion);

  return (
    <div ref={ref}>
      <StaggerContainer className="mt-10 grid max-w-md grid-cols-2 gap-6 md:gap-10">
      <StaggerItem index={0} className="text-left">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#FFFFFF]/65">
          {t(locale, "section.about.foundedLabel")}
        </p>
        <p className="awards-stat-number mt-2 text-3xl font-medium tabular-nums md:text-4xl">{y}</p>
      </StaggerItem>
      <StaggerItem index={1} className="text-left">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#FFFFFF]/65">
          {t(locale, "section.about.membersLabel")}
        </p>
        <p className="awards-stat-number mt-2 text-3xl font-medium tabular-nums md:text-4xl">{m}</p>
      </StaggerItem>
      </StaggerContainer>
    </div>
  );
}

export default function AboutSection({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="bg-[#050505] py-16 pb-14 md:py-20 md:pb-16">
      <Container>
        <RevealOnScroll>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0 lg:order-1">
              <SectionHeading>{t(locale, "section.about")}</SectionHeading>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-[#FFFFFF]/90 md:text-base">
                {t(locale, "section.about.teaser")}
              </p>
              <StatsPair locale={locale} />
              <Link
                href={localePath("/o-zbore", locale)}
                className="gold-hover mt-8 inline-flex items-center justify-center rounded-full bg-[var(--primary-gold)] px-6 py-3 text-sm font-semibold text-black"
              >
                {t(locale, "about.more")}
              </Link>
            </div>
            <div className="relative h-[min(50vh,450px)] max-h-[450px] w-full overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.15)] bg-black lg:order-2">
              <Image
                src="/omnia-portrait.jpg"
                alt=""
                fill
                className="object-cover object-[center_35%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
