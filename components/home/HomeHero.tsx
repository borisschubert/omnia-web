import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import CircleCta from "@/components/pk/CircleCta";
import { SoundWave } from "@/components/pk/Icons";

/** One headline line inside its reveal mask (A3, data-split="manual") */
function Line({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className="split-mask block overflow-clip">
      <span data-line className={`block ${className}`}>
        {children}
      </span>
    </span>
  );
}

/** Split hero: thin / gold / heavy headline on white, B&W portrait in a dark arch on the right */
export default function HomeHero({ locale }: { locale: Locale }) {
  return (
    <section className="surface-cream overflow-hidden bg-snow text-coal">
      <div className="wrap grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-x-[clamp(32px,4vw,72px)]">
        <div className="flex flex-col justify-center pb-[clamp(48px,6vw,96px)] pt-[clamp(40px,6vw,104px)]">
          <p className="m-0 mb-[clamp(18px,2vw,28px)] font-pk text-[13px] font-bold uppercase tracking-[0.18em] text-brass-ink">
            {t(locale, "home.hero.eyebrow")}
          </p>
          <h1 data-split="manual" className="m-0 font-pk text-[clamp(50px,7vw,112px)] leading-[1.02] tracking-[-0.03em]">
            <Line className="font-light">{t(locale, "home.hero.l1")}</Line>
            <Line className="flex items-center gap-[0.18em] font-bold text-brass">
              <SoundWave className="h-[0.62em] w-auto shrink-0 text-coal" />
              {t(locale, "home.hero.l2")}
            </Line>
            <Line className="font-extrabold">{t(locale, "home.hero.l3")}</Line>
          </h1>
          <div className="mt-[clamp(28px,3.4vw,48px)] h-px max-w-[520px] bg-brass" />
          <p className="m-0 mt-[clamp(24px,3vw,36px)] max-w-[460px] font-pk text-[clamp(16px,1.25vw,18px)] leading-[1.85] text-graphite">
            {t(locale, "home.hero.lead")}
          </p>
          <div className="mt-[clamp(28px,3.4vw,48px)]">
            <CircleCta href={localePath("/program", locale)} label={t(locale, "home.hero.ctaConcerts")} />
          </div>
        </div>

        <div
          data-curtain
          className="stripes relative aspect-[4/5] w-full overflow-hidden rounded-b-[999px] bg-coal lg:aspect-auto lg:h-full lg:min-h-[720px]"
        >
          <Image
            src="/omnia-portrait.jpg"
            alt={t(locale, "home.about.imageAlt")}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="bw object-cover object-[center_20%] mix-blend-luminosity opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal/40 via-transparent to-coal/20" />
        </div>
      </div>
    </section>
  );
}
