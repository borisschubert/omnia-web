import Image from "next/image";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getNewsArticleBySlug } from "@/lib/content/newsArticles";
import { t } from "@/lib/i18n/strings";
import ArrowLink from "@/components/pk/ArrowLink";
import Kicker from "@/components/pk/Kicker";
import PkButton from "@/components/pk/PkButton";

const bodyClass =
  "m-0 font-pk text-[clamp(16px,1.2vw,18px)] leading-[1.9] text-coal/85 [&_a]:font-semibold [&_a]:text-brass-ink [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-4";

function Paragraph({ locale, textKey }: { locale: Locale; textKey: string }) {
  const content = t(locale, textKey);
  if (content.includes("<a ")) return <p className={bodyClass} dangerouslySetInnerHTML={{ __html: content }} />;
  return <p className={bodyClass}>{content}</p>;
}

export default function NewsArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const article = getNewsArticleBySlug(slug);
  if (!article) notFound();
  const archive = localePath("/aktuality", locale);

  return (
    <article className="surface-cream bg-snow text-coal">
      <div className="wrap pb-[clamp(64px,8vw,120px)] pt-[clamp(40px,5vw,80px)]">
        <div className="mx-auto max-w-[760px]">
          <ArrowLink href={archive} back>
            {t(locale, "page.news.backToArchive")}
          </ArrowLink>

          <div className="mt-[clamp(32px,4vw,56px)] flex flex-col gap-4">
            <Kicker>
              <span className="text-brass-ink">{t(locale, article.categoryKey)}</span> · {t(locale, article.dateKey)}
            </Kicker>
            <h1
              data-split
              className="m-0 text-balance font-pk text-[clamp(36px,4.6vw,66px)] font-light leading-[1.1] tracking-[-0.025em]"
            >
              {t(locale, article.titleKey)}
            </h1>
          </div>
        </div>

        <div data-curtain className="relative mx-auto mt-[clamp(32px,4vw,56px)] aspect-[3/2] max-w-[1080px] overflow-hidden bg-mist">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="(max-width: 1100px) 100vw, 1080px"
            className="photo object-contain"
          />
        </div>

        <div className="mx-auto mt-[clamp(32px,4vw,56px)] flex max-w-[760px] flex-col gap-6">
          {article.bodyKeys.map((key) => (
            <Paragraph key={key} locale={locale} textKey={key} />
          ))}

          {article.donioUrl && article.donioCtaKey ? (
            <PkButton href={article.donioUrl} external className="mt-4 self-start">
              {t(locale, article.donioCtaKey)}
            </PkButton>
          ) : null}
        </div>

        {article.gallery?.length ? (
          <div className="mx-auto mt-[clamp(40px,5vw,72px)] flex max-w-[1080px] flex-col gap-[clamp(14px,1.6vw,24px)]">
            {article.gallery.map((src) => (
              <div key={src} data-curtain className="overflow-hidden bg-mist">
                <Image src={src} alt="" width={2000} height={1313} className="photo h-auto w-full" sizes="(max-width: 1100px) 100vw, 1080px" />
              </div>
            ))}
          </div>
        ) : null}

        <div className="mx-auto mt-[clamp(48px,6vw,88px)] max-w-[760px] border-t border-hairline pt-8">
          <ArrowLink href={archive} back>
            {t(locale, "page.news.backToArchive")}
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
