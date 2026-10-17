import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { newsArticles, sortNewsArticles } from "@/lib/content/newsArticles";
import { LongArrow } from "@/components/pk/Icons";
import ArrowLink from "@/components/pk/ArrowLink";
import PkSectionHeader from "@/components/pk/PkSectionHeader";

/** "Latest News": three tall dark cards, photo brightening on hover */
export default function HomeNews({ locale }: { locale: Locale }) {
  const items = sortNewsArticles(newsArticles).slice(0, 3);
  if (!items.length) return null;

  return (
    <section id="news" className="surface-cream bg-snow text-coal">
      <div className="wrap pb-[clamp(64px,8vw,120px)]">
        <PkSectionHeader
          title={t(locale, "section.homeNewsTitle")}
          aside={<ArrowLink href={localePath("/aktuality", locale)}>{t(locale, "section.allNews")}</ArrowLink>}
        />

        <div className="grid gap-[clamp(14px,1.6vw,24px)] md:grid-cols-3">
          {items.map((item, i) => (
            <Link
              key={item.slug}
              href={localePath(`/aktuality/${item.slug}`, locale)}
              className="surface-ink group relative flex aspect-[4/5] flex-col overflow-hidden bg-coal p-[clamp(20px,2vw,30px)] text-snow md:aspect-[3/4.3]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`photo object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.04] ${
                  i === 0 ? "opacity-25 group-hover:opacity-45" : "opacity-70 group-hover:opacity-90"
                }`}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-coal via-coal/50 to-coal/10" />
              <span className={`relative flex flex-1 flex-col gap-3 ${i === 0 ? "justify-start" : "justify-end"}`}>
                <span className="font-pk text-[11px] font-semibold uppercase tracking-[0.12em] text-snow/70">
                  {t(locale, item.dateKey)}
                </span>
                <span className="font-pk text-[clamp(20px,1.8vw,26px)] font-normal leading-[1.25] tracking-[-0.01em]">
                  {t(locale, item.titleKey)}
                </span>
                {i === 0 ? (
                  <span className="line-clamp-4 font-pk text-[14px] leading-[1.7] text-snow/65">
                    {t(locale, item.excerptKey)}
                  </span>
                ) : null}
              </span>
              <span
                className={`relative mt-6 inline-flex items-center gap-3 font-pk text-[12px] font-bold uppercase tracking-[0.12em] text-brass-soft ${
                  i === 0 ? "mt-auto" : ""
                }`}
              >
                <span className="u-line">{t(locale, "button.readMore")}</span>
                <LongArrow className="w-7 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
