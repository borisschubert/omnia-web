import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { awards } from "@/lib/content/awards";
import { ORG_FOUNDED } from "@/lib/content/organization";

/** "School by the numbers": thin title left, big light figures right */
export default function HomeNumbers({ locale }: { locale: Locale }) {
  const stats = [
    { value: t(locale, "section.about.founded"), label: t(locale, "section.about.foundedLabel") },
    { value: String(new Date().getFullYear() - ORG_FOUNDED), label: t(locale, "home.numbers.years") },
    { value: t(locale, "section.about.members"), label: t(locale, "section.about.membersLabel") },
    { value: String(awards.length), label: t(locale, "home.numbers.awards") },
  ];

  return (
    <section className="surface-cream bg-snow text-coal">
      <div className="wrap pb-[clamp(64px,8vw,120px)]">
        <div className="grid gap-x-[clamp(32px,5vw,88px)] gap-y-10 border-t border-hairline pt-[clamp(48px,6vw,88px)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <h2 data-split className="m-0 max-w-[12ch] font-pk text-[clamp(34px,3.8vw,56px)] font-light leading-[1.12] tracking-[-0.02em]">
            {t(locale, "home.numbers.title")}
          </h2>
          <dl className="m-0 grid grid-cols-2 gap-x-[clamp(24px,3.4vw,56px)] gap-y-10 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end gap-2">
                <dt className="max-w-[16ch] font-pk text-[14px] leading-[1.4] text-graphite">{s.label}</dt>
                <dd className="m-0 font-pk text-[clamp(42px,3.8vw,58px)] font-light leading-none tracking-[-0.03em]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
