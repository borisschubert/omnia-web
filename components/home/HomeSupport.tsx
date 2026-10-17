import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDonateHref } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { BANK_IBAN, formatIban } from "@/lib/content/organization";
import CircleCta from "@/components/pk/CircleCta";
import CopyButton from "@/components/ds/CopyButton";
import { ArrowUpRight } from "@/components/pk/Icons";

/** Support: thin title + text left, three ways to help as hairline rows right */
export default function HomeSupport({ locale }: { locale: Locale }) {
  const donateHref = getDonateHref(locale);
  const options = [
    { title: t(locale, "donate.option.tax2.title"), body: t(locale, "donate.option.tax2.body") },
    { title: t(locale, "donate.option.sponsorship.title"), body: t(locale, "donate.option.sponsorship.body") },
  ];

  return (
    <section id="support" className="surface-cream bg-snow text-coal">
      <div className="wrap section-y">
        <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-6">
            <h2 data-split className="m-0 font-pk text-[clamp(40px,4.6vw,68px)] font-light leading-[1.05] tracking-[-0.03em]">
              {t(locale, "section.donate")}
            </h2>
            <p className="m-0 max-w-[42ch] font-pk text-[16px] leading-[1.85] text-graphite">
              {t(locale, "section.donate.text")}
            </p>
            <CircleCta href={donateHref} label={t(locale, "home.support.giveCta")} className="self-start" />
          </div>

          <ul className="m-0 list-none border-t border-hairline p-0">
            <li className="flex flex-col gap-3 border-b border-hairline py-[clamp(22px,2.6vw,32px)]">
              <span className="font-pk text-[clamp(22px,2vw,28px)] font-semibold tracking-[-0.015em] text-brass">
                {t(locale, "donate.option.donations.title")}
              </span>
              <span className="font-pk text-[14px] leading-[1.7] text-graphite">
                {t(locale, "donate.option.donations.body")}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-mono text-[15px] tracking-[0.02em]">{formatIban(BANK_IBAN)}</span>
                <CopyButton
                  value={BANK_IBAN}
                  label={t(locale, "home.support.copyIban")}
                  copiedLabel={t(locale, "home.support.copied")}
                  className="!bg-coal !text-snow hover:!bg-brass"
                />
              </span>
            </li>
            {options.map((o) => (
              <li key={o.title} className="border-b border-hairline">
                <Link href={donateHref} className="group flex items-start gap-6 py-[clamp(22px,2.6vw,32px)]">
                  <span className="flex min-w-0 flex-1 flex-col gap-2">
                    <span className="font-pk text-[clamp(22px,2vw,28px)] font-light tracking-[-0.015em] transition-colors duration-200 group-hover:text-brass">
                      {o.title}
                    </span>
                    <span className="font-pk text-[14px] leading-[1.7] text-graphite">{o.body}</span>
                  </span>
                  <ArrowUpRight className="mt-1 size-7 shrink-0 text-graphite/60 transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coal" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
