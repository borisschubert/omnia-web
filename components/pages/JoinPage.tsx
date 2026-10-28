import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import PageHero from "@/components/pk/PageHero";
import CircleCta from "@/components/pk/CircleCta";
import PkSectionHeader from "@/components/pk/PkSectionHeader";

const reasons = [
  { titleKey: "page.join.why1Title", bodyKey: "page.join.why1Body" },
  { titleKey: "page.join.why2Title", bodyKey: "page.join.why2Body" },
  { titleKey: "page.join.why3Title", bodyKey: "page.join.why3Body" },
] as const;

const gallery = [
  { src: "/moment-1.jpg", altKey: "page.join.galleryAlt1" },
  { src: "/moment-2.jpg", altKey: "page.join.galleryAlt2" },
  { src: "/moment-3.jpg", altKey: "page.join.galleryAlt3" },
  { src: "/moment-4.jpg", altKey: "page.join.galleryAlt4" },
] as const;

export default function JoinPage({ locale }: { locale: Locale }) {
  const contact = localePath("/kontakt", locale);

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={t(locale, "page.join.title")}
        title={t(locale, "page.join.heroTitle")}
        intro={<p className="m-0">{t(locale, "page.join.heroSubtitle")}</p>}
        aside={
          <div data-curtain className="relative aspect-[4/5] w-full max-w-[520px] justify-self-end overflow-hidden rounded-t-[999px] bg-mist">
            <Image
              data-parallax
              src="/images/spevacky.jpg"
              alt={t(locale, "home.join.imageAlt")}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo object-cover object-[58%_center]"
            />
          </div>
        }
      >
        <CircleCta href={contact} label={t(locale, "page.join.ctaButton")} className="mt-[clamp(28px,3.4vw,48px)] self-start" />
      </PageHero>

      {/* Why Omnia */}
      <section className="surface-cream bg-mist">
        <div className="wrap section-y">
          <PkSectionHeader title={t(locale, "page.join.whyHeading")} />
          <ol className="m-0 grid list-none gap-x-[clamp(24px,3vw,48px)] gap-y-10 p-0 md:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.titleKey} className="flex flex-col gap-3 border-t border-coal pt-6">
                <span className="font-pk text-[13px] font-bold tracking-[0.14em] text-brass-ink">0{i + 1}</span>
                <h3 className="m-0 font-pk text-[clamp(24px,2.2vw,30px)] font-normal leading-[1.2] tracking-[-0.015em]">
                  {t(locale, r.titleKey)}
                </h3>
                <p className="m-0 font-pk text-[15px] leading-[1.85] text-graphite">{t(locale, r.bodyKey)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="surface-cream bg-snow">
        <div className="wrap section-y">
          <PkSectionHeader title={t(locale, "page.join.galleryHeading")} />
          <ul className="m-0 grid list-none grid-cols-2 gap-[clamp(10px,1.4vw,20px)] p-0 md:grid-cols-4">
            {gallery.map((g, i) => (
              <li key={g.src} data-curtain className={`relative overflow-hidden bg-mist ${i % 2 ? "aspect-[4/5] md:mt-[clamp(24px,4vw,64px)]" : "aspect-[4/5]"}`}>
                <Image src={g.src} alt={t(locale, g.altKey)} fill sizes="(max-width: 768px) 50vw, 25vw" className="photo object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who we look for */}
      <section className="surface-cream bg-snow">
        <div className="wrap pb-[clamp(64px,8vw,120px)]">
          <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-6 border-t border-hairline pt-[clamp(40px,5vw,72px)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <h2 data-split className="m-0 font-pk text-[clamp(34px,3.8vw,56px)] font-light leading-[1.1] tracking-[-0.02em]">
              {t(locale, "page.join.whoTitle")}
            </h2>
            <p className="m-0 max-w-[600px] font-pk text-[17px] leading-[1.9] text-graphite">{t(locale, "page.join.whoBody")}</p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="surface-ink stripes bg-coal text-snow">
        <div className="wrap section-y flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <p data-split className="m-0 max-w-[720px] font-pk text-[clamp(32px,3.8vw,56px)] font-light leading-[1.15] tracking-[-0.02em]">
            {t(locale, "page.join.ctaTitle")}
          </p>
          <CircleCta href={contact} label={t(locale, "page.join.ctaButton")} tone="dark" className="shrink-0" />
        </div>
      </section>
    </div>
  );
}
