import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { newsArticles, sortNewsArticles, type NewsArticleMeta } from "@/lib/content/newsArticles";
import Section from "@/components/ds/Section";
import SectionHeader from "@/components/ds/SectionHeader";
import TextLink from "@/components/ds/TextLink";

function Meta({ item, locale }: { item: NewsArticleMeta; locale: Locale }) {
  return (
    <span className="t-label text-muted">
      <span className="text-gold-deep">{t(locale, item.categoryKey)}</span> · {t(locale, item.dateKey)}
    </span>
  );
}

export default function HomeNews({ locale }: { locale: Locale }) {
  const [main, ...rest] = sortNewsArticles(newsArticles);
  const side = rest.slice(0, 2);
  if (!main) return null;

  return (
    <Section tone="cream-2" id="news">
      <SectionHeader
        title={t(locale, "section.homeNewsTitle")}
        aside={<TextLink href={localePath("/aktuality", locale)}>{t(locale, "section.allNews")}</TextLink>}
      />
      <div data-reveal className="flex flex-wrap gap-[clamp(24px,3vw,40px)]">
        <Link
          href={localePath(`/aktuality/${main.slug}`, locale)}
          className="group flex min-w-0 flex-[2_1_520px] flex-col gap-4 text-body"
        >
          <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] bg-sand">
            <Image
              src={main.image}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 60vw"
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03]"
            />
          </div>
          <Meta item={main} locale={locale} />
          <h3 className="t-h2 m-0 text-balance">{t(locale, main.titleKey)}</h3>
        </Link>
        {side.length ? (
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[clamp(24px,3vw,36px)]">
            {side.map((item) => (
              <Link
                key={item.slug}
                href={localePath(`/aktuality/${item.slug}`, locale)}
                className="group flex flex-col gap-3 text-body"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-sand">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 860px) 100vw, 30vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <Meta item={item} locale={locale} />
                <h3 className="t-h3 m-0">{t(locale, item.titleKey)}</h3>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
