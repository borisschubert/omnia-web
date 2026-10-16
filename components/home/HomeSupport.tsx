import type { Locale } from "@/lib/i18n/config";
import { getDonateHref } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { BANK_IBAN, formatIban } from "@/lib/content/organization";
import Section from "@/components/ds/Section";
import SectionHeader from "@/components/ds/SectionHeader";
import TextLink from "@/components/ds/TextLink";
import Button from "@/components/ds/Button";
import CopyButton from "@/components/ds/CopyButton";

function LightCard({ title, body, link }: { title: string; body: string; link: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-[20px] bg-paper p-[clamp(22px,2.6vw,36px)]">
      <h3 className="t-h3 m-0">{title}</h3>
      <p className="t-body m-0 text-muted">{body}</p>
      <div className="mt-auto pt-2">{link}</div>
    </div>
  );
}

export default function HomeSupport({ locale }: { locale: Locale }) {
  const donateHref = getDonateHref(locale);
  return (
    <Section tone="cream-2" id="support">
      <SectionHeader
        title={t(locale, "section.donate")}
        aside={<p className="t-body m-0 max-w-[440px] text-muted">{t(locale, "section.donate.text")}</p>}
      />
      <div data-reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(14px,1.6vw,24px)]">
        <div className="surface-ink flex flex-col gap-[18px] rounded-[20px] bg-ink p-[clamp(22px,2.6vw,36px)] text-cream">
          <h3 className="t-h3 m-0">{t(locale, "donate.option.donations.title")}</h3>
          <p className="t-body m-0 text-on-ink">{t(locale, "donate.option.donations.body")}</p>
          <div className="mt-auto flex flex-col gap-3 border-t border-line-ink pt-[18px]">
            <span className="t-label text-muted-ink">IBAN</span>
            <span className="break-words font-mono text-[15px] leading-snug">{formatIban(BANK_IBAN)}</span>
            <div className="flex flex-wrap gap-2">
              <CopyButton
                value={BANK_IBAN}
                label={t(locale, "home.support.copyIban")}
                copiedLabel={t(locale, "home.support.copied")}
              />
              <Button href={donateHref} variant="outline-ink">
                {t(locale, "home.support.giveCta")}
              </Button>
            </div>
          </div>
        </div>
        <LightCard
          title={t(locale, "donate.option.tax2.title")}
          body={t(locale, "donate.option.tax2.body")}
          link={<TextLink href={donateHref}>{t(locale, "home.support.taxLink")}</TextLink>}
        />
        <LightCard
          title={t(locale, "donate.option.sponsorship.title")}
          body={t(locale, "donate.option.sponsorship.body")}
          link={<TextLink href={donateHref}>{t(locale, "home.support.partnerLink")}</TextLink>}
        />
      </div>
    </Section>
  );
}
