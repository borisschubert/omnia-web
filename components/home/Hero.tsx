"use client";

import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";

type HeroProps = {
  locale: Locale;
  imageSrc?: string;
};

const defaultImage = "/hero.jpg";

/** Legibility over photo — no panel, shadow only */
const heroShadow = "[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]";

export default function Hero({ locale, imageSrc = defaultImage }: HeroProps) {
  return (
    <section className="relative w-full min-h-[min(85vh,820px)] overflow-hidden sm:min-h-[80vh] md:min-h-[85vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover object-[center_72%] sm:object-[center_70%]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/20" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_50%_100%,rgba(0,0,0,0.5)_0%,transparent_50%)]" aria-hidden />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-28 pt-20 md:pb-36 md:pt-24">
        <div className="w-full">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <LoadTitleEnter>
                <h1 className={`text-4xl font-light tracking-wide text-[#FFFFFF] sm:text-5xl md:text-6xl ${heroShadow}`}>
                  {t(locale, "hero.title")}
                </h1>
              </LoadTitleEnter>
            </div>
          </Container>
        </div>
      </div>

      <div className="pointer-events-auto absolute bottom-0 left-1/2 z-20 -translate-x-1/2 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
        <a
          href="#about"
          className="gold-hover flex h-11 w-14 items-center justify-center rounded-full bg-[var(--primary-gold)] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50"
          aria-label={locale === "sk" ? "Prejsť na sekciu O nás" : "Go to About section"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
