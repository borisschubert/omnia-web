"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";

const DONIO_CAMPAIGN_URL =
  "https://donio.sk/omnia?utm_id=97757_v0_s00_e231_tv2_tp1_a1demongi5su6r&fbclid=IwY2xjawSEIVhleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe5h1pD9KEG2HHYVULq6brj5DPze48HsaRsdSh5i_S78h82idNCaS_WgdGSZc_aem_BCX6kV4c1Mg45i7-ziR_6w";

const BANK_NAME = "Fio banka, a.s.";
const ACCOUNT_NUMBER = "2101244230/8330";
const BIC = "FIOZSKBA";
const IBAN = "SK3483300000002101244230";
const COMPANY_NAME = "Spevácky zbor OMNIA";

const BANK_NOTE_SK = "Do správy pre prijímateľa: OMNIA";
const BANK_NOTE_EN = "Message for recipient: OMNIA";

const HERO_COLUMN_PAD = "p-7 md:p-9";

const supportListItems = [
  { titleKey: "donate.hero.supportItem1Title" as const, bodyKey: "donate.hero.supportItem1Body" as const },
  { titleKey: "donate.hero.supportItem2Title" as const, bodyKey: "donate.hero.supportItem2Body" as const },
  { titleKey: "donate.hero.supportItem3Title" as const, bodyKey: "donate.hero.supportItem3Body" as const },
] as const;

const supportOptions = [
  { titleKey: "donate.option.tax2.title" as const, bodyKey: "donate.option.tax2.body" as const },
  { titleKey: "donate.option.donations.title" as const, bodyKey: "donate.option.donations.body" as const },
  { titleKey: "donate.option.sponsorship.title" as const, bodyKey: "donate.option.sponsorship.body" as const },
];

const CARD_BORDER =
  "rounded-2xl border border-[rgba(255,215,0,0.2)] bg-transparent backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.03] transition-colors duration-200 hover:border-[#FFD700]";

function CopyButton({
  id,
  value,
  locale,
  copiedId,
  onCopy,
}: {
  id: string;
  value: string;
  locale: Locale;
  copiedId: string | null;
  onCopy: (id: string, v: string) => void;
}) {
  const copied = copiedId === id;
  return (
    <button
      type="button"
      onClick={() => onCopy(id, value)}
      className="shrink-0 rounded-md border border-[rgba(255,215,0,0.35)] bg-transparent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--primary-gold)] transition-colors hover:border-[#FFD700] hover:bg-[rgba(255,215,0,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/40"
    >
      {copied ? t(locale, "contact.copied") : t(locale, "contact.copy")}
    </button>
  );
}

function DonateSupportCopy({ locale }: { locale: Locale }) {
  return (
    <div className="text-[0.9375rem] leading-relaxed text-[#FFFFFF] md:text-base">
      <p className="mb-6">{t(locale, "donate.hero.para1")}</p>
      <div>
        <p className="mb-4 font-semibold text-[#FFFFFF]">{t(locale, "donate.hero.supportHeading")}</p>
        <ul className="list-none space-y-3 pt-2">
          {supportListItems.map(({ titleKey, bodyKey }) => (
            <li key={titleKey} className="flex gap-3 text-[#FFFFFF]/90">
              <span
                className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-[var(--primary-gold)] shadow-[0_0_8px_1px_rgba(255,215,0,0.45)]"
                aria-hidden
              />
              <span>
                <span className="font-semibold text-[var(--primary-gold)]">{t(locale, titleKey)}</span>{" "}
                {t(locale, bodyKey)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ValueRow({
  label,
  value,
  locale,
  copyId,
  copyValue,
  copiedId,
  onCopy,
  mono,
}: {
  label: string;
  value: string;
  locale: Locale;
  copyId?: string;
  copyValue?: string;
  copiedId: string | null;
  onCopy: (id: string, v: string) => void;
  mono?: boolean;
}) {
  return (
    <div>
      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#FFFFFF]/65">{label}</span>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className={`min-w-0 flex-1 text-sm text-[#FFFFFF] md:text-[0.9375rem] ${mono ? "font-mono tracking-tight" : ""}`}>
          {value}
        </p>
        {copyId && copyValue ? (
          <CopyButton id={copyId} value={copyValue} locale={locale} copiedId={copiedId} onCopy={onCopy} />
        ) : null}
      </div>
    </div>
  );
}

export default function DonatePage({ locale }: { locale: Locale }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback((id: string, value: string) => {
    void navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }, []);

  const donationCard = (
    <div className="overflow-hidden rounded-2xl border border-[rgba(255,215,0,0.22)] bg-[#0c0b07] shadow-[0_0_40px_-14px_rgba(255,215,0,0.28)]">
      <div className="px-6 pt-6 md:px-8 md:pt-8">
        <span className="inline-flex rounded-full border border-[rgba(255,215,0,0.22)] bg-[rgba(255,215,0,0.1)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--primary-gold)]">
          {t(locale, "donate.donio.badge")}
        </span>
      </div>
      <div className="relative mt-4 aspect-[16/10] w-full">
        <Image
          src="/zbor-spolu.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="px-6 pb-12 pt-6 md:px-8 md:pt-7">
        <h2 className="text-xl font-semibold leading-snug tracking-tight text-[#FFFFFF] md:text-[1.35rem]">
          {t(locale, "donate.donio.subheadline")}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#FFFFFF]/88">{t(locale, "donate.donio.body")}</p>
        <a
          href={DONIO_CAMPAIGN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-hover mt-8 mb-4 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-xl bg-[var(--primary-gold)] px-8 py-4 text-center text-base font-bold text-black shadow-[0_0_28px_-6px_rgba(255,215,0,0.45)] transition-[opacity,box-shadow] duration-200 hover:shadow-[0_0_36px_-4px_rgba(255,215,0,0.55)]"
        >
          {t(locale, "donate.widget.cta")}
        </a>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505]">
      <section className="relative overflow-hidden border-b border-[rgba(255,215,0,0.08)] py-14 md:py-20 lg:py-24">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/hero.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-[0.14]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[#050505]/88" />
        </div>
        <div className="relative z-10">
          <Container>
            <LoadTitleEnter>
              <h1 className="relative mx-auto w-fit text-center text-2xl font-semibold tracking-tight text-[var(--primary-gold)] md:text-3xl lg:text-[2rem] after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-[var(--primary-gold)]">
                {t(locale, "donate.hero.title")}
              </h1>
            </LoadTitleEnter>

            <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-14">
              <div className={`min-w-0 ${HERO_COLUMN_PAD}`}>
                <DonateSupportCopy locale={locale} />
              </div>
              <div className={`flex min-w-0 flex-col ${HERO_COLUMN_PAD}`}>
                <div className="h-full">{donationCard}</div>
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-2xl">
              <h2 className="relative mx-auto w-fit text-center text-xl font-semibold tracking-tight text-white md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
                {t(locale, "donate.bank.title")}
              </h2>
              <div className={`mt-8 space-y-6 p-6 md:p-8 ${CARD_BORDER}`}>
                <ValueRow label={t(locale, "donate.bank.bankNameLabel")} value={BANK_NAME} locale={locale} copiedId={copiedId} onCopy={handleCopy} />
                <ValueRow label={t(locale, "donate.bank.accountLabel")} value={ACCOUNT_NUMBER} locale={locale} copiedId={copiedId} onCopy={handleCopy} />
                <ValueRow
                  label={t(locale, "donate.bank.bicLabel")}
                  value={BIC}
                  locale={locale}
                  copyId="bic"
                  copyValue={BIC}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                  mono
                />
                <ValueRow
                  label={t(locale, "donate.bank.iban")}
                  value={IBAN}
                  locale={locale}
                  copyId="iban"
                  copyValue={IBAN}
                  copiedId={copiedId}
                  onCopy={handleCopy}
                  mono
                />
                <ValueRow label={t(locale, "donate.bank.companyLabel")} value={COMPANY_NAME} locale={locale} copiedId={copiedId} onCopy={handleCopy} />
                <div className="border-t border-[rgba(255,215,0,0.12)] pt-6">
                  <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#FFFFFF]/65">
                    {t(locale, "donate.bank.note")}
                  </span>
                  <p className="mt-2 text-sm text-[#FFFFFF]/95">{locale === "sk" ? BANK_NOTE_SK : BANK_NOTE_EN}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className="border-b border-[rgba(255,215,0,0.08)] py-14 md:py-20">
        <Container>
          <h2 className="relative mx-auto w-fit text-center text-xl font-semibold tracking-tight text-white md:text-2xl after:mx-auto after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
            {t(locale, "donate.options.title")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {supportOptions.map((opt) => (
              <div key={opt.titleKey} className={`${CARD_BORDER} p-6 md:p-8`}>
                <h3 className="text-lg font-semibold text-[#FFFFFF]">{t(locale, opt.titleKey)}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-[#FFFFFF]/90">{t(locale, opt.bodyKey)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[rgba(255,215,0,0.08)] py-12 md:py-16">
        <Container>
          <p className="text-center text-[0.9375rem] leading-relaxed text-[#FFFFFF]/80">{t(locale, "donate.footer.note")}</p>
          <div className="mt-8 text-center">
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
