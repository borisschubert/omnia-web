"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { localePath } from "@/lib/i18n/config";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import { homeConcerts, getUpcomingConcerts } from "@/lib/content/homeConcerts";

const PREVIEW = 3;

function formatPreviewLocation(locale: Locale, item: (typeof homeConcerts)[number]): string | null {
  const place = item.placeKey ? t(locale, item.placeKey) : "";
  const venue = item.venueKey ? t(locale, item.venueKey) : "";
  if (place && venue) return `${place} · ${venue}`;
  if (place) return place;
  if (venue) return venue;
  return null;
}

export default function HomeEventsSection({ locale }: { locale: Locale }) {
  const items = [...getUpcomingConcerts()]
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso))
    .slice(0, PREVIEW);

  return (
    <section id="concerts" className="border-t border-[rgba(255,215,0,0.08)] bg-[#050505] py-14 md:py-20">
      <Container>
        <RevealOnScroll>
          <SectionHeading>{t(locale, "section.homeEventsTitle")}</SectionHeading>

          <div className="relative mt-10 md:mt-12">
            {/* Elegant side timeline: thin dashed gold line on the far left */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 w-0 border-l border-dashed border-[var(--primary-gold)]/55"
              aria-hidden
            />

            <StaggerContainer className="relative">
              <ul className="space-y-12 md:space-y-14 lg:space-y-16" role="list">
              {items.map((item, i) => (
                <StaggerItem key={i} as="li" index={i} className="pl-5 sm:pl-7 md:pl-8">
                  <article className="premium-card-hover w-full rounded-xl border border-[rgba(255,215,0,0.14)] bg-transparent px-4 py-5 backdrop-blur-[1px] sm:px-6 sm:py-6 md:px-8 md:py-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8 md:gap-10 lg:gap-12">
                      <time className="shrink-0 text-lg font-bold leading-tight text-[var(--primary-gold)] sm:min-w-[9.5rem] sm:text-xl md:text-2xl">
                        {t(locale, item.dateKey)}
                      </time>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">{t(locale, item.titleKey)}</h3>
                        {formatPreviewLocation(locale, item) ? (
                          <p className="mt-2 text-sm leading-relaxed text-[#FFFFFF]/72 md:text-base">
                            {formatPreviewLocation(locale, item)}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
              </ul>
            </StaggerContainer>
          </div>

          <div className="mt-12 md:mt-14">
            <Link
              href={localePath("/program", locale)}
              className="gold-hover inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[var(--primary-gold)]/55 bg-transparent px-6 py-2 text-xs font-medium text-[var(--primary-gold)] transition-colors duration-200 hover:border-[var(--primary-gold)] hover:bg-[rgba(255,215,0,0.08)] hover:text-[#FFD700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] md:text-sm"
            >
              {t(locale, "section.programFullCta")}
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
