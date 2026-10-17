import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import ArrowLink from "@/components/pk/ArrowLink";

/** "Welcome back" block: photo left, gold kicker + thin uppercase title and text right */
export default function HomeAbout({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="surface-cream bg-snow text-coal">
      <div className="wrap section-y">
        <div className="grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-curtain className="relative aspect-[4/5] overflow-hidden bg-mist">
            <Image
              src="/zbor-spolu.jpg"
              alt={t(locale, "home.hero.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo object-cover object-[50%_40%]"
            />
          </div>

          <div className="flex max-w-[600px] flex-col">
            <span className="font-pk text-[clamp(22px,2.2vw,32px)] font-extrabold uppercase leading-none tracking-[0.01em] text-brass">
              {t(locale, "section.about")}
            </span>
            <h2
              data-split
              className="m-0 mt-3 font-pk text-[clamp(34px,4vw,58px)] font-light uppercase leading-[1.12] tracking-[0.005em]"
            >
              {t(locale, "header.tagline1")} {t(locale, "header.tagline2")}
            </h2>
            <p className="m-0 mt-[clamp(24px,3vw,40px)] font-pk text-[16px] leading-[1.9] text-graphite">
              {t(locale, "section.about.teaser")}
            </p>
            <p className="m-0 mt-6 font-pk text-[15px] leading-[1.6] text-graphite">
              {t(locale, "section.about.conductorLabel")}
              <br />
              <span className="text-[17px] font-bold text-coal">{t(locale, "section.about.conductor")}</span>
            </p>
            <ArrowLink href={localePath("/o-zbore", locale)} className="mt-8 self-start">
              {t(locale, "about.more")}
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
