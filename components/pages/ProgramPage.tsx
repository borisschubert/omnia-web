import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/ui/Stagger";
import type { ConcertEventType, HomeConcertItem } from "@/lib/content/homeConcerts";
import { homeConcerts } from "@/lib/content/homeConcerts";

const heroTitleShadow = "[text-shadow:0_2px_12px_rgba(0,0,0,0.85),0_1px_2px_rgba(0,0,0,0.6)]";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-8-4.434-8-11a8 8 0 0 1 16 0c0 6.566-8 11-8 11z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EventBadge({ locale, type }: { locale: Locale; type: ConcertEventType }) {
  const labelKey =
    type === "public"
      ? "program.badge.public"
      : type === "private"
        ? "program.badge.private"
        : type === "international"
          ? "program.badge.international"
          : "program.badge.majorInternational";

  const styles =
    type === "public"
      ? "border-purple-400/55 text-purple-300"
      : type === "private"
        ? "gap-1 border-[rgba(255,255,255,0.12)] text-[#FFFFFF]/45"
        : type === "international"
          ? "border-sky-400/50 text-sky-200"
          : "border-sky-400/45 bg-[rgba(255,215,0,0.06)] text-[var(--primary-gold)] shadow-[0_0_14px_-4px_rgba(56,189,248,0.35)]";

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${styles}`}
    >
      {type === "private" ? <LockIcon className="opacity-80" /> : null}
      {t(locale, labelKey)}
    </span>
  );
}

/** Prominent left column: e.g. "15. MAREC" / "15 March" */
function formatCardDateShort(dateIso: string, locale: Locale): string {
  const d = new Date(`${dateIso}T12:00:00`);
  const day = d.getDate();
  if (locale === "sk") {
    const month = new Intl.DateTimeFormat("sk-SK", { month: "long" }).format(d);
    return `${day}. ${month.toUpperCase()}`;
  }
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(d);
  return `${day} ${month}`;
}

function groupConcertsByMonth(items: HomeConcertItem[], locale: Locale) {
  const sorted = [...items].sort((a, b) => a.dateIso.localeCompare(b.dateIso));
  const localeTag = locale === "sk" ? "sk-SK" : "en-GB";
  const groups: { key: string; monthLabel: string; items: HomeConcertItem[] }[] = [];
  let currentKey = "";

  for (const item of sorted) {
    const d = new Date(`${item.dateIso}T12:00:00`);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const monthLabelRaw = new Intl.DateTimeFormat(localeTag, { month: "long", year: "numeric" }).format(d);
    const monthLabel = monthLabelRaw.charAt(0).toUpperCase() + monthLabelRaw.slice(1);

    if (key !== currentKey) {
      currentKey = key;
      groups.push({ key, monthLabel, items: [item] });
    } else {
      groups[groups.length - 1]!.items.push(item);
    }
  }

  return groups;
}

const goldPrimaryBtn =
  "gold-hover inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary-gold)] px-6 text-sm font-semibold text-black shadow-[0_0_20px_-8px_rgba(255,215,0,0.45)]";

const ghostTicketBtn =
  "inline-flex h-9 items-center justify-center rounded-full border border-[rgba(255,215,0,0.35)] bg-transparent px-4 text-xs font-medium text-[#FFFFFF]/88";

function hasPrimaryCta(item: HomeConcertItem): boolean {
  return !!(item.detailPath || item.externalUrl || item.mapsUrl);
}

function primaryCtaLabelKey(item: HomeConcertItem): string {
  return item.primaryCtaKey ?? "program.moreAboutConcert";
}

function formatEventLocation(locale: Locale, item: HomeConcertItem): string | null {
  const place = item.placeKey ? t(locale, item.placeKey) : "";
  const venue = item.venueKey ? t(locale, item.venueKey) : "";
  if (place && venue) return `${place} · ${venue}`;
  if (place) return place;
  if (venue) return venue;
  return null;
}

function cardBorderClass(type: ConcertEventType): string {
  if (type === "majorInternational") {
    return "border-sky-400/35 shadow-[0_0_28px_-10px_rgba(56,189,248,0.28)]";
  }
  return "border-[rgba(255,215,0,0.15)]";
}

export default function ProgramPage({ locale }: { locale: Locale }) {
  const groups = groupConcertsByMonth(homeConcerts, locale);

  return (
    <main className="min-h-screen bg-[#050505]">
      <section className="program-intro-hero relative overflow-hidden border-b border-[rgba(255,215,0,0.12)] py-14 md:py-20">
        <Container className="relative z-[1]">
          <div className="mx-auto max-w-[1000px]">
            <LoadTitleEnter>
              <h1
                className={`relative text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl ${heroTitleShadow} after:mt-3 after:block after:h-0.5 after:w-14 after:bg-[var(--primary-gold)] after:content-[''] after:shadow-[0_0_12px_rgba(255,215,0,0.22)]`}
              >
                {t(locale, "page.program.title")}
              </h1>
            </LoadTitleEnter>
            <p className="mt-6 max-w-2xl text-[0.9375rem] font-light leading-relaxed text-[#FFFFFF]/82 md:text-base">
              {t(locale, "page.program.intro")}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] py-12 md:py-16">
        <Container>
          <RevealOnScroll className="relative mx-auto max-w-[1000px] pl-5 sm:pl-7 md:pl-9">
            <div
              className="pointer-events-none absolute bottom-0 left-0 top-0 bg-[rgba(255,215,0,0.2)]"
              style={{ width: "0.5px" }}
              aria-hidden
            />

            <div className="space-y-14 md:space-y-16">
              {groups.map((group) => (
                <div key={group.key}>
                  <h2 className="relative z-[1] mb-8 text-center text-xl font-semibold tracking-tight text-[var(--primary-gold)] md:mb-10 md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-14 after:bg-[var(--primary-gold)]/65 after:content-['']">
                    {group.monthLabel}
                  </h2>

                  <StaggerContainer className="relative">
                    <ul className="space-y-8 md:space-y-10" role="list">
                    {group.items.map((item, i) => {
                      const locationLine = formatEventLocation(locale, item);
                      const showActions = item.eventType !== "private" && (hasPrimaryCta(item) || item.mapsUrl);
                      const primaryLabelKey = primaryCtaLabelKey(item);

                      return (
                      <StaggerItem key={`${group.key}-${i}`} as="li" index={i}>
                        <article
                          className={`premium-card-hover flex flex-col overflow-hidden rounded-xl bg-[#050505] md:flex-row md:items-stretch ${cardBorderClass(item.eventType)}`}
                        >
                          <div className="flex shrink-0 flex-row items-center justify-start border-b border-[rgba(255,215,0,0.12)] px-4 py-4 md:w-[min(7.5rem,26%)] md:flex-col md:items-center md:justify-center md:border-b-0 md:border-r md:px-3 md:py-5">
                            <time className="text-left text-lg font-bold leading-tight text-[var(--primary-gold)] md:text-center md:text-xl">
                              {item.dateDisplayKey
                                ? t(locale, item.dateDisplayKey)
                                : formatCardDateShort(item.dateIso, locale)}
                            </time>
                          </div>

                          <div className="min-w-0 flex-1 px-4 py-5 sm:px-5 md:py-6 md:pl-6 md:pr-6 lg:pl-8">
                            <div className="flex flex-wrap items-start gap-x-3 gap-y-2">
                              <h3 className="min-w-0 flex-1 text-lg font-semibold leading-snug text-white md:text-xl">
                                {t(locale, item.titleKey)}
                              </h3>
                              <EventBadge locale={locale} type={item.eventType} />
                            </div>

                            {locationLine ? (
                              <p className="mt-2 text-[0.9375rem] font-light leading-relaxed text-[#FFFFFF]/85 md:text-base">
                                {locationLine}
                              </p>
                            ) : null}
                            {item.timeKey ? (
                              <p className="mt-1 text-sm font-light text-[#FFFFFF]/55">{t(locale, item.timeKey)}</p>
                            ) : null}

                            {item.descriptionKey ? (
                              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-[#FFFFFF]/68">
                                {t(locale, item.descriptionKey)}
                              </p>
                            ) : null}

                            {item.addressKey ? (
                              <p className="mt-2 text-xs font-light text-[#FFFFFF]/42">{t(locale, item.addressKey)}</p>
                            ) : null}

                            {showActions ? (
                              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                {item.detailPath ? (
                                  <Link
                                    href={localePath(item.detailPath, locale)}
                                    className={`${goldPrimaryBtn} w-full sm:w-auto`}
                                  >
                                    {t(locale, primaryLabelKey)}
                                  </Link>
                                ) : item.externalUrl || item.mapsUrl ? (
                                  <a
                                    href={item.externalUrl ?? item.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${goldPrimaryBtn} w-full sm:w-auto`}
                                  >
                                    {t(locale, primaryLabelKey)}
                                  </a>
                                ) : null}
                                {item.ticketKey ? (
                                  <span className={`${ghostTicketBtn} w-full sm:w-auto`}>{t(locale, item.ticketKey)}</span>
                                ) : null}
                                {item.mapsUrl ? (
                                  <a
                                    href={item.mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-[rgba(255,215,0,0.22)] bg-transparent px-3 text-xs font-medium text-[var(--primary-gold)] transition-colors hover:border-[rgba(255,215,0,0.4)] sm:w-auto"
                                  >
                                    <MapPinIcon className="shrink-0 opacity-90" />
                                    <span>{t(locale, "concert.viewMap")}</span>
                                  </a>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </article>
                      </StaggerItem>
                      );
                    })}
                    </ul>
                  </StaggerContainer>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-16 max-w-xl text-center text-sm font-light italic leading-relaxed tracking-wide text-[#FFFFFF]/50 md:mt-20 md:text-base">
              {t(locale, "page.program.moreSoon")}
            </p>

            <div className="mt-10 text-center">
              <Link
                href={localePath("/", locale)}
                className="text-sm font-medium text-[var(--primary-gold)] transition-opacity hover:opacity-90"
              >
                {t(locale, "nav.home")}
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </main>
  );
}
