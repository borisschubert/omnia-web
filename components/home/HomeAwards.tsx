import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { highlightedAwards } from "@/lib/content/awards";
import Section from "@/components/ds/Section";
import SectionHeader from "@/components/ds/SectionHeader";
import TextLink from "@/components/ds/TextLink";

export default function HomeAwards({ locale }: { locale: Locale }) {
  const href = localePath("/ocenenia", locale);
  return (
    <Section tone="ink">
      <SectionHeader
        title={t(locale, "nav.awards")}
        aside={
          <TextLink href={href} tone="ink">
            {t(locale, "page.awards.featured.cta")}
          </TextLink>
        }
      />
      <div data-reveal>
        {highlightedAwards.map((award) => (
          <Link
            key={award.competitionKey}
            href={href}
            className="flex flex-wrap items-baseline gap-x-[clamp(20px,3vw,48px)] gap-y-2 border-t border-line-ink py-[clamp(22px,2.6vw,34px)] text-cream transition-[padding] duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:pl-3"
          >
            <span className="t-h2 flex-[0_0_clamp(90px,10vw,140px)] leading-none text-gold">{award.year}</span>
            <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-1">
              <span className="t-h3">{t(locale, award.competitionKey)}</span>
              <span className="t-small font-medium text-muted-ink">{t(locale, award.locationKey)}</span>
            </span>
            <span className="t-body flex-[0_1_340px] font-semibold leading-normal">
              {award.badgeKeys.map((k) => t(locale, k)).join(" · ")}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
