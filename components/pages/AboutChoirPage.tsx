import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import PageHero from "@/components/pk/PageHero";
import CircleCta from "@/components/pk/CircleCta";
import PkSectionHeader from "@/components/pk/PkSectionHeader";

const bodyClass = "m-0 font-pk text-[16px] leading-[1.9] text-graphite [&_strong]:font-semibold [&_strong]:text-coal";

/** Paragraph from i18n that may contain <strong>; empty strings render nothing */
function Html({ locale, k }: { locale: Locale; k: string }) {
  const html = t(locale, k);
  if (!html.trim()) return null;
  return <p className={bodyClass} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function AboutChoirPage({ locale }: { locale: Locale }) {
  const facts = [
    { value: t(locale, "section.about.founded"), label: t(locale, "section.about.foundedLabel") },
    { value: t(locale, "section.about.members"), label: t(locale, "section.about.membersLabel") },
    { value: t(locale, "page.aboutChoir.facts.countriesValue"), label: t(locale, "page.aboutChoir.facts.countriesLabel") },
    { value: t(locale, "page.aboutChoir.facts.awardsValue"), label: t(locale, "page.aboutChoir.facts.awardsLabel") },
  ];

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={`${t(locale, "header.tagline1")} · ${t(locale, "header.tagline2")}`}
        title={t(locale, "page.aboutChoir.title")}
        intro={<p className="m-0">{t(locale, "page.aboutChoir.heroStatement")}</p>}
      />

      {/* Wide group photo */}
      <div className="wrap">
        <div data-curtain className="relative aspect-[4/3] overflow-hidden bg-mist md:aspect-[21/9]">
          <Image
            data-parallax
            src="/hero.jpg"
            alt={t(locale, "home.hero.imageAlt")}
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="photo object-cover object-[center_60%]"
          />
        </div>
      </div>

      {/* Story */}
      <section className="surface-cream bg-snow">
        <div className="wrap section-y grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div data-curtain className="relative aspect-[4/5] overflow-hidden bg-mist">
            <Image
              src="/zbor-spolu.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo object-cover object-[50%_40%]"
            />
          </div>
          <div className="flex max-w-[600px] flex-col">
            <span className="font-pk text-[clamp(22px,2.2vw,32px)] font-extrabold uppercase leading-none text-brass">
              {t(locale, "page.aboutChoir.historyTitle")}
            </span>
            <h2 data-split className="m-0 mt-3 font-pk text-[clamp(34px,4vw,58px)] font-light uppercase leading-[1.12]">
              {t(locale, "section.about.foundedLabel")} {t(locale, "section.about.founded")}
            </h2>
            <div className="mt-[clamp(24px,3vw,40px)] flex flex-col gap-6">
              <Html locale={locale} k="page.aboutChoir.storyP1" />
              <Html locale={locale} k="page.aboutChoir.storyP2" />
              <Html locale={locale} k="page.aboutChoir.storyP3" />
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="surface-cream bg-snow">
        <div className="wrap pb-[clamp(64px,8vw,120px)]">
          <dl className="m-0 grid grid-cols-2 gap-x-[clamp(24px,3.4vw,56px)] gap-y-10 border-t border-hairline pt-[clamp(40px,5vw,72px)] md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="font-pk text-[14px] leading-[1.4] text-graphite">{f.label}</dt>
                <dd className="m-0 font-pk text-[clamp(42px,4.4vw,64px)] font-light leading-none tracking-[-0.03em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Repertoire */}
      <section className="surface-cream bg-mist">
        <div className="wrap section-y grid items-center gap-x-[clamp(32px,5vw,88px)] gap-y-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex max-w-[640px] flex-col">
            <PkSectionHeader title={t(locale, "page.aboutChoir.repertoireTitle")} />
            <div className="flex flex-col gap-6">
              <Html locale={locale} k="page.aboutChoir.repertoireIntro" />
              <Html locale={locale} k="page.aboutChoir.repertoireP1" />
              <Html locale={locale} k="page.aboutChoir.repertoireP2" />
            </div>
          </div>
          <div data-curtain className="relative aspect-[4/5] overflow-hidden bg-coal">
            <Image
              src="/images/spevacky.jpg"
              alt={t(locale, "home.join.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="photo object-cover object-[58%_center]"
            />
          </div>
        </div>
      </section>

      {/* Conductor */}
      <section className="surface-ink stripes bg-coal text-snow">
        <div className="wrap section-y grid items-center gap-x-[clamp(32px,5vw,88px)] gap-y-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div data-curtain className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-t-[999px] bg-coal-2">
            <Image
              src="/omnia-portrait.jpg"
              alt={t(locale, "home.about.imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="bw object-cover object-[center_20%]"
            />
          </div>
          <div className="flex max-w-[640px] flex-col gap-6">
            <span className="font-pk text-[13px] font-bold uppercase tracking-[0.18em] text-brass-soft">
              {t(locale, "section.about.conductorLabel")}
            </span>
            <blockquote data-split className="m-0 font-pk text-[clamp(32px,3.8vw,56px)] font-light leading-[1.15] tracking-[-0.02em]">
              {locale === "sk" ? "„" : "“"}
              {t(locale, "page.aboutChoir.conductorQuote")}
              {locale === "sk" ? "“" : "”"}
            </blockquote>
            <p className="m-0 font-pk text-[18px] font-bold">{t(locale, "section.about.conductor")}</p>
            <p className="m-0 font-pk text-[16px] leading-[1.9] text-snow/70">{t(locale, "page.aboutChoir.conductorBio")}</p>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="surface-cream bg-snow">
        <div className="wrap section-y flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <p data-split className="m-0 max-w-[760px] font-pk text-[clamp(28px,3.2vw,46px)] font-light leading-[1.2] tracking-[-0.02em]">
            {t(locale, "page.aboutChoir.ctaSentence")}
          </p>
          <CircleCta href={localePath("/pridaj-sa", locale)} label={t(locale, "page.aboutChoir.ctaButton")} className="shrink-0" />
        </div>
      </section>
    </div>
  );
}
