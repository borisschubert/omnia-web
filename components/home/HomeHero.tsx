import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getDonateHref, localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Button from "@/components/ds/Button";

export default function HomeHero({ locale }: { locale: Locale }) {
  return (
    <section className="surface-ink bg-ink text-cream">
      <div className="wrap pb-[clamp(36px,4.4vw,64px)] pt-[clamp(48px,7vw,112px)]">
        <div data-reveal className="flex flex-wrap items-end gap-x-[clamp(28px,4vw,64px)] gap-y-7">
          <h1 className="t-display m-0 min-w-0 flex-[1_1_600px]">
            {t(locale, "home.hero.titleBefore")}
            <span className="text-gold">{t(locale, "home.hero.titleGold")}</span>
            {t(locale, "home.hero.titleAfter")}
          </h1>
          <div className="flex flex-[0_1_360px] flex-col gap-6">
            <p className="t-body m-0 text-on-ink">{t(locale, "home.hero.text")}</p>
            <div className="flex flex-wrap gap-2.5">
              <Button href={localePath("/program", locale)} variant="outline-ink" size="lg">
                {t(locale, "home.hero.ctaConcerts")}
              </Button>
              <Button href={getDonateHref(locale)} variant="gold" size="lg">
                {t(locale, "button.donate")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap-wide">
        <div className="relative h-[clamp(300px,50vw,760px)] overflow-hidden rounded-t-[clamp(14px,1.6vw,24px)] bg-ink-2">
          <Image
            data-parallax
            src="/hero.jpg"
            alt={t(locale, "home.hero.imageAlt")}
            fill
            priority
            sizes="100vw"
            className="!-top-[8%] !h-[116%] object-cover object-[center_45%]"
          />
        </div>
      </div>
    </section>
  );
}
