import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { getUpcomingConcerts } from "@/lib/content/homeConcerts";
import Section from "@/components/ds/Section";
import SectionHeader from "@/components/ds/SectionHeader";
import TextLink from "@/components/ds/TextLink";
import ConcertCard from "@/components/concerts/ConcertCard";

const PREVIEW = 2;

export default function HomeConcerts({ locale }: { locale: Locale }) {
  const items = [...getUpcomingConcerts()].sort((a, b) => a.dateIso.localeCompare(b.dateIso)).slice(0, PREVIEW);

  return (
    <Section tone="cream" id="concerts">
      <SectionHeader
        title={t(locale, "section.homeEventsTitle")}
        aside={<TextLink href={localePath("/program", locale)}>{t(locale, "section.programFullCta")}</TextLink>}
      />
      {items.length ? (
        <div data-reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-[clamp(14px,1.6vw,24px)]">
          {items.map((item) => (
            <ConcertCard key={item.dateIso + item.titleKey} item={item} locale={locale} />
          ))}
        </div>
      ) : (
        <p data-reveal className="t-body text-muted">
          {t(locale, "page.program.moreSoon")}
        </p>
      )}
    </Section>
  );
}
