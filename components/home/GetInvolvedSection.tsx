"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDonateHref } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const goldBtn =
  "gold-hover mx-auto inline-flex h-12 w-auto min-w-[14rem] items-center justify-center rounded-full bg-[var(--primary-gold)] px-8 text-sm font-semibold text-black shadow-[0_0_24px_-8px_rgba(255,215,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

export default function GetInvolvedSection({ locale }: { locale: Locale }) {
  return (
    <section
      id="get-involved"
      className="relative isolate overflow-hidden border-t border-[rgba(255,215,0,0.08)] bg-[#050505] py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_45%,rgba(255,215,0,0.05),transparent_58%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <RevealOnScroll>
          <h2 className="relative mx-auto max-w-4xl text-center text-3xl font-semibold tracking-tight text-white md:text-4xl after:mx-auto after:mt-3 after:block after:h-px after:w-12 after:content-[''] after:bg-accent md:after:mt-4">
            {t(locale, "section.getInvolved.mainTitle")}
          </h2>

          <div className="mt-12 md:mt-16">
            <div className="overflow-hidden rounded-2xl border border-[#FFD700]/[0.15] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/[0.025]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col items-center border-b border-[rgba(255,215,0,0.15)] px-8 py-12 text-center md:border-b-0 md:border-r md:border-[rgba(255,215,0,0.15)] md:px-10 md:py-14 lg:px-14 lg:py-16">
                  <h3 className="text-xl font-semibold text-white md:text-[1.35rem]">{t(locale, "section.donate")}</h3>
                  <p className="mt-4 max-w-md flex-1 text-[0.9375rem] font-light leading-relaxed text-[#FFFFFF]/78 md:text-base">
                    {t(locale, "section.donate.text")}
                  </p>
                  <div className="mt-10 flex w-full justify-center pt-2 md:mt-12">
                    <Link href={getDonateHref(locale)} className={goldBtn}>
                      {t(locale, "button.donate")}
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col items-center px-8 py-12 text-center md:px-10 md:py-14 lg:px-14 lg:py-16">
                  <h3 className="text-xl font-semibold text-white md:text-[1.35rem]">{t(locale, "section.singWithUs")}</h3>
                  <p className="mt-4 max-w-md flex-1 text-[0.9375rem] font-light leading-relaxed text-[#FFFFFF]/78 md:text-base">
                    {t(locale, "section.singWithUs.text")}
                  </p>
                  <div className="mt-10 flex w-full justify-center pt-2 md:mt-12">
                    <Link href={localePath("/pridaj-sa", locale)} className={goldBtn}>
                      {t(locale, "button.join")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
