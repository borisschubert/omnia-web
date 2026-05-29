import { newsArticleSlugs } from "@/lib/content/newsArticles";
import NewsArticlePage from "@/components/pages/NewsArticlePage";

export function generateStaticParams() {
  return newsArticleSlugs.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EnNewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <NewsArticlePage locale="en" slug={slug} />;
}
