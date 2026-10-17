import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import CircleCta from "@/components/pk/CircleCta";

/** "All about JUDE" band: dark striped strip, photo in an arch breaking out above */
export default function HomeJoin({ locale }: { locale: Locale }) {
  return (
    <section id="join" className="surface-ink bg-snow pt-[clamp(40px,6vw,96px)]">
      <div className="stripes relative bg-coal text-snow">
        <div className="wrap grid items-end gap-x-[clamp(32px,5vw,88px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div data-curtain className="relative -mt-[clamp(40px,6vw,96px)] aspect-[4/5] max-h-[620px] w-full max-w-[480px] overflow-hidden rounded-t-[999px] bg-coal-2">
            <Image
              data-parallax
              src="/images/spevacky.jpg"
              alt={t(locale, "home.join.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo object-cover object-[58%_center]"
            />
          </div>
          <div className="flex flex-col gap-6 self-center py-[clamp(48px,6vw,96px)]">
            <h2 data-split className="m-0 font-pk text-[clamp(38px,4.2vw,62px)] font-light leading-[1.1] tracking-[-0.025em]">
              {t(locale, "section.singWithUs")}
            </h2>
            <p className="m-0 max-w-[44ch] font-pk text-[16px] leading-[1.85] text-snow/70">
              {t(locale, "section.singWithUs.text")}
            </p>
            <CircleCta href={localePath("/pridaj-sa", locale)} label={t(locale, "button.join")} tone="dark" className="self-start" />
          </div>
        </div>
      </div>
    </section>
  );
}
