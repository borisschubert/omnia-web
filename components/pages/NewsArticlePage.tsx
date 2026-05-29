import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/config";
import { getNewsArticleBySlug } from "@/lib/content/newsArticles";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";

const goldPrimaryBtn =
  "gold-hover inline-flex min-h-[3rem] w-full max-w-3xl items-center justify-center rounded-full bg-[var(--primary-gold)] px-10 py-3 text-center text-base font-semibold text-black shadow-[0_0_28px_-6px_rgba(255,215,0,0.45)] transition-[box-shadow,opacity] duration-300 hover:opacity-95 hover:shadow-[0_0_40px_-4px_rgba(255,215,0,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]";

const insetImageFrame =
  "relative mx-auto h-[min(400px,50vh)] w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--primary-gold)]/30 bg-black shadow-[0_16px_40px_-20px_rgba(0,0,0,0.75)]";

const bodyParagraphClass =
  "text-left text-[0.9375rem] leading-relaxed text-[#FFFFFF]/88 md:text-base [&_a]:font-medium [&_a]:text-[var(--primary-gold)] [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-white hover:[&_a]:underline";

function ArticleBodyParagraph({ locale, textKey }: { locale: Locale; textKey: string }) {
  const content = t(locale, textKey);
  if (content.includes("<a ")) {
    return <p className={bodyParagraphClass} dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <p className={bodyParagraphClass}>{content}</p>;
}

export default function NewsArticlePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const article = getNewsArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen bg-[#050505]">
      <article className="border-b border-[rgba(255,215,0,0.08)] py-10 md:py-14 lg:py-16">
        <Container className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href={localePath("/aktuality", locale)}
            className="text-sm font-medium text-[var(--primary-gold)] transition-opacity hover:opacity-90"
          >
            ← {t(locale, "page.news.backToArchive")}
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primary-gold)]">
            {t(locale, article.categoryKey)}
          </p>
          <time className="mt-2 block text-sm text-[#FFFFFF]/55">{t(locale, article.dateKey)}</time>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-[1.2]">
            {t(locale, article.titleKey)}
          </h1>

          <div className={`mt-8 md:mt-10 ${insetImageFrame}`}>
            <Image
              src={article.image}
              alt=""
              fill
              className="object-contain object-center bg-[#050505]"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          </div>

          <div className="mx-auto mt-8 max-w-3xl space-y-6 md:mt-10">
            {article.bodyKeys.map((key) => (
              <ArticleBodyParagraph key={key} locale={locale} textKey={key} />
            ))}
          </div>

          {article.donioUrl && article.donioCtaKey ? (
            <div className="mt-8 w-full">
              <a
                href={article.donioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={goldPrimaryBtn}
              >
                {t(locale, article.donioCtaKey)}
              </a>
            </div>
          ) : null}
        </Container>
      </article>
    </main>
  );
}
