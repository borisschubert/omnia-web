"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";

type ConcertItem = {
  dateKey: string;
  titleKey: string;
  placeKey: string;
  timeKey: string;
  ticketKey: string;
  venueKey: string;
  addressKey: string;
  mapsUrl: string;
  descriptionKey?: string;
};

const placeholderConcerts: ConcertItem[] = [
  {
    dateKey: "concert.placeholder1.date",
    titleKey: "concert.placeholder1.title",
    placeKey: "concert.placeholder1.place",
    timeKey: "concert.placeholder1.time",
    ticketKey: "concert.placeholder1.ticket",
    venueKey: "concert.placeholder1.venue",
    addressKey: "concert.placeholder1.address",
    mapsUrl: "https://www.google.com/maps/place/M%C3%BDtna+1,+811+06+Bratislava",
    descriptionKey: "concert.placeholder1.description",
  },
  {
    dateKey: "concert.placeholder2.date",
    titleKey: "concert.placeholder2.title",
    placeKey: "concert.placeholder2.place",
    timeKey: "concert.placeholder2.time",
    ticketKey: "concert.placeholder2.ticket",
    venueKey: "concert.placeholder2.venue",
    addressKey: "concert.placeholder2.address",
    mapsUrl: "https://www.google.com/maps/place/Hlavn%C3%A1+58,+040+01+Ko%C5%A1ice",
    descriptionKey: "concert.placeholder2.description",
  },
  {
    dateKey: "concert.placeholder3.date",
    titleKey: "concert.placeholder3.title",
    placeKey: "concert.placeholder3.place",
    timeKey: "concert.placeholder3.time",
    ticketKey: "concert.placeholder3.ticket",
    venueKey: "concert.placeholder3.venue",
    addressKey: "concert.placeholder3.address",
    mapsUrl: "https://www.google.com/maps/place/Musikvereinsplatz+1,+1010+Wien",
    descriptionKey: "concert.placeholder3.description",
  },
];

export default function ConcertsSection({ locale }: { locale: Locale }) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !listRef.current) return;
    listRef.current.classList.add("concerts-visible");
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="concerts"
      className="border-t border-[var(--divider)] bg-[var(--background)] py-16 md:py-20"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Container>
        <div
          className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"}`}
        >
          <h2 className="relative text-2xl font-medium tracking-tight text-foreground md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
            {t(locale, "section.programTitle")}
          </h2>

          <ul
            ref={listRef}
            className="mt-10 divide-y divide-[var(--divider)]"
          >
            {placeholderConcerts.map((item, i) => (
              <li
                key={i}
                className="concert-row translate-y-[14px] py-8 opacity-0 transition-all duration-700 ease-out md:py-10"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-start md:gap-12">
                  <div>
                    <time className="mb-2 block text-sm font-medium text-accent">
                      {t(locale, item.dateKey)}
                    </time>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-medium text-foreground md:text-xl">
                        {t(locale, item.titleKey)}
                      </h3>
                      {i === 0 && (
                        <span className="ml-3 text-[11px] uppercase tracking-wide text-accent">
                          {t(locale, "concert.nearest")}
                        </span>
                      )}
                    </div>
                    {item.descriptionKey && (
                      <p className="mt-3 max-w-xl text-sm text-foreground-muted">
                        {t(locale, item.descriptionKey)}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 flex w-full flex-col items-start gap-2 md:mt-0 md:w-[280px] md:items-end md:text-right">
                    <p className="flex flex-wrap items-center gap-2 text-base font-medium text-foreground">
                      <span>{t(locale, item.placeKey)}</span>
                      <span aria-hidden className="text-foreground-muted">
                        ·
                      </span>
                      <span>{t(locale, item.timeKey)}</span>
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {t(locale, item.venueKey)}
                    </p>
                    <p className="leading-snug text-sm text-foreground-muted">
                      {t(locale, item.addressKey)}
                    </p>
                    <Link
                      href={item.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline"
                    >
                      {t(locale, "concert.viewMap")}
                    </Link>
                    <span className="mt-3 inline-flex items-center self-start rounded-md bg-accent/15 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/30 md:self-end">
                      {t(locale, item.ticketKey)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
