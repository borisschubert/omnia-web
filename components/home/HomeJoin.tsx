import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Section from "@/components/ds/Section";
import Button from "@/components/ds/Button";

export default function HomeJoin({ locale }: { locale: Locale }) {
  return (
    <Section tone="cream" bare id="join">
      <div data-reveal className="mx-auto flex max-w-[1440px] flex-wrap items-stretch">
        <div className="relative min-h-[clamp(300px,40vw,620px)] min-w-0 flex-[3_1_520px] overflow-hidden bg-sand">
          <Image
            data-parallax
            src="/images/spevacky.jpg"
            alt={t(locale, "home.join.imageAlt")}
            fill
            sizes="(max-width: 860px) 100vw, 60vw"
            className="!-top-[8%] !h-[116%] object-cover object-[center_35%]"
          />
        </div>
        <div className="flex min-w-0 flex-[2_1_320px] flex-col justify-center gap-[18px] px-[clamp(20px,4vw,64px)] py-[clamp(40px,6vw,96px)]">
          <h2 className="t-h2 m-0">{t(locale, "section.singWithUs")}</h2>
          <p className="t-body m-0 max-w-[38ch] text-body-2">{t(locale, "section.singWithUs.text")}</p>
          <Button href={localePath("/pridaj-sa", locale)} variant="dark" size="lg" className="self-start">
            {t(locale, "button.join")}
          </Button>
        </div>
      </div>
    </Section>
  );
}
