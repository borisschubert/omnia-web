import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { BANK_ACCOUNT_NUMBER, BANK_BIC, BANK_IBAN, BANK_NAME, ORG_NAME, formatIban } from "@/lib/content/organization";
import PageHero from "@/components/pk/PageHero";
import PkButton from "@/components/pk/PkButton";
import PkSectionHeader from "@/components/pk/PkSectionHeader";
import Kicker from "@/components/pk/Kicker";
import CopyButton from "@/components/ds/CopyButton";

const DONIO_CAMPAIGN_URL =
  "https://donio.sk/omnia?utm_id=97757_v0_s00_e231_tv2_tp1_a1demongi5su6r&fbclid=IwY2xjawSEIVhleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe5h1pD9KEG2HHYVULq6brj5DPze48HsaRsdSh5i_S78h82idNCaS_WgdGSZc_aem_BCX6kV4c1Mg45i7-ziR_6w";

const supportItems = [
  { titleKey: "donate.hero.supportItem1Title", bodyKey: "donate.hero.supportItem1Body" },
  { titleKey: "donate.hero.supportItem2Title", bodyKey: "donate.hero.supportItem2Body" },
  { titleKey: "donate.hero.supportItem3Title", bodyKey: "donate.hero.supportItem3Body" },
] as const;

const options = [
  { titleKey: "donate.option.tax2.title", bodyKey: "donate.option.tax2.body" },
  { titleKey: "donate.option.donations.title", bodyKey: "donate.option.donations.body" },
  { titleKey: "donate.option.sponsorship.title", bodyKey: "donate.option.sponsorship.body" },
] as const;

const copyCls = "!min-h-9 !px-4";

function BankRow({ label, value, copy, locale }: { label: string; value: string; copy?: string; locale: Locale }) {
  return (
    <div className="grid gap-x-6 gap-y-2 border-b border-hairline py-5 sm:grid-cols-[180px_minmax(0,1fr)_auto] sm:items-center">
      <Kicker>{label}</Kicker>
      <span className={`font-pk text-[17px] ${copy ? "font-mono text-[15px] tracking-[0.02em]" : ""}`}>{value}</span>
      {copy ? (
        <CopyButton value={copy} label={t(locale, "contact.copy")} copiedLabel={t(locale, "contact.copied")} className={`${copyCls} justify-self-start`} />
      ) : (
        <span className="hidden sm:block" />
      )}
    </div>
  );
}

export default function DonatePage({ locale }: { locale: Locale }) {
  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={t(locale, "section.donate")}
        title={t(locale, "donate.hero.title")}
        intro={<p className="m-0">{t(locale, "donate.hero.para1")}</p>}
      />

      {/* What it goes to + Donio campaign */}
      <section className="surface-cream bg-snow">
        <div className="wrap grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-12 pb-[clamp(64px,8vw,120px)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <h2 className="m-0 mb-2 font-pk text-[clamp(22px,2vw,28px)] font-semibold tracking-[-0.01em]">
              {t(locale, "donate.hero.supportHeading")}
            </h2>
            <ol className="m-0 list-none p-0">
              {supportItems.map((s, i) => (
                <li key={s.titleKey} className="flex gap-6 border-b border-hairline py-[clamp(20px,2.4vw,30px)]">
                  <span className="pt-1 font-pk text-[13px] font-bold tracking-[0.14em] text-brass-ink">0{i + 1}</span>
                  <span className="flex flex-col gap-1.5">
                    <span className="font-pk text-[clamp(20px,1.8vw,24px)] font-normal">{t(locale, s.titleKey).replace(/:$/, "")}</span>
                    <span className="font-pk text-[15px] leading-[1.8] text-graphite">{t(locale, s.bodyKey)}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="surface-ink flex flex-col bg-coal text-snow">
            <div data-curtain className="relative aspect-[16/10] overflow-hidden">
              <Image src="/zbor-spolu.jpg" alt="" fill sizes="(max-width: 768px) 100vw, 40vw" className="photo object-cover object-[center_30%]" />
            </div>
            <div className="flex flex-col gap-4 p-[clamp(24px,3vw,40px)]">
              <Kicker className="!text-brass-soft">{t(locale, "donate.donio.badge")}</Kicker>
              <h3 className="m-0 font-pk text-[clamp(26px,2.4vw,34px)] font-light leading-[1.2]">{t(locale, "donate.donio.subheadline")}</h3>
              <p className="m-0 font-pk text-[15px] leading-[1.8] text-snow/70">{t(locale, "donate.donio.body")}</p>
              <PkButton href={DONIO_CAMPAIGN_URL} external variant="light" className="mt-3 self-start">
                {t(locale, "donate.widget.cta")}
              </PkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Bank details */}
      <section className="surface-cream bg-mist">
        <div className="wrap section-y grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-8 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <PkSectionHeader title={t(locale, "donate.bank.title")} />
          <div className="border-t border-hairline">
            <BankRow locale={locale} label={t(locale, "donate.bank.bankNameLabel")} value={BANK_NAME} />
            <BankRow locale={locale} label={t(locale, "donate.bank.accountLabel")} value={BANK_ACCOUNT_NUMBER} />
            <BankRow locale={locale} label={t(locale, "donate.bank.iban")} value={formatIban(BANK_IBAN)} copy={BANK_IBAN} />
            <BankRow locale={locale} label={t(locale, "donate.bank.bicLabel")} value={BANK_BIC} copy={BANK_BIC} />
            <BankRow locale={locale} label={t(locale, "donate.bank.companyLabel")} value={ORG_NAME} />
            <BankRow
              locale={locale}
              label={t(locale, "donate.bank.note")}
              value={locale === "sk" ? "Do správy pre prijímateľa: OMNIA" : "Message for recipient: OMNIA"}
            />
          </div>
        </div>
      </section>

      {/* Ways to help */}
      <section className="surface-cream bg-snow">
        <div className="wrap section-y">
          <PkSectionHeader title={t(locale, "donate.options.title")} />
          <ul className="m-0 grid list-none gap-x-[clamp(24px,3vw,48px)] gap-y-10 p-0 md:grid-cols-3">
            {options.map((o) => (
              <li key={o.titleKey} className="flex flex-col gap-3 border-t border-coal pt-6">
                <h3 className="m-0 font-pk text-[clamp(24px,2.2vw,30px)] font-normal leading-[1.2]">{t(locale, o.titleKey)}</h3>
                <p className="m-0 font-pk text-[15px] leading-[1.85] text-graphite">{t(locale, o.bodyKey)}</p>
              </li>
            ))}
          </ul>
          <p className="m-0 mt-[clamp(40px,5vw,72px)] font-pk text-[17px] italic text-graphite">{t(locale, "donate.footer.note")}</p>
        </div>
      </section>
    </div>
  );
}
