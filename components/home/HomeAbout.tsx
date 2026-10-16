import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Section from "@/components/ds/Section";
import Button from "@/components/ds/Button";

export default function HomeAbout({ locale }: { locale: Locale }) {
  return (
    <Section tone="cream" id="about">
      <div data-reveal className="flex flex-wrap items-center gap-x-[clamp(32px,6vw,96px)] gap-y-8">
        <div className="relative aspect-[4/5] max-w-[480px] flex-[1_1_300px] overflow-hidden rounded-[20px] bg-sand">
          <Image
            src="/omnia-portrait.jpg"
            alt={t(locale, "home.about.imageAlt")}
            fill
            sizes="(max-width: 860px) 100vw, 480px"
            className="object-cover object-[center_25%]"
          />
        </div>
        <div className="flex min-w-0 max-w-[560px] flex-[1_1_340px] flex-col gap-[18px]">
          <h2 className="t-h2 m-0">{t(locale, "section.about")}</h2>
          <p className="t-body m-0 text-body-2">{t(locale, "section.about.teaser")}</p>
          <p className="t-small m-0 font-medium text-muted">
            {t(locale, "section.about.conductorLabel")}
            <br />
            <span className="t-h3 text-body">{t(locale, "section.about.conductor")}</span>
          </p>
          <Button href={localePath("/o-zbore", locale)} variant="dark" size="lg" className="self-start">
            {t(locale, "about.more")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
