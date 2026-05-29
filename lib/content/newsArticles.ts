/** Aktuality feed + detail routes (static export) */

/** Card thumbnails: muted by default, full color on card hover (parent needs `group`) */
export const newsCardImageClass =
  "object-contain object-center bg-[#050505] opacity-80 contrast-95 brightness-90 grayscale-[20%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100";

export const newsArticleSlugs = [
  "staromestske-slavnosti-zilina",
  "podporte-nas-olympijsky-sen-donio",
  "cyrilometodske-dni-terchova",
] as const;

export type NewsArticleSlug = (typeof newsArticleSlugs)[number];

export type NewsArticleMeta = {
  slug: NewsArticleSlug;
  dateIso: string;
  image: string;
  categoryKey: string;
  titleKey: string;
  excerptKey: string;
  dateKey: string;
  /** Body paragraph i18n keys, in order */
  bodyKeys: string[];
  featured?: boolean;
  /** Pin near top of lists; first in grid below featured hero */
  campaignPriority?: boolean;
  /** i18n key for gold priority tag above title (grid card) */
  priorityBadgeKey?: string;
  /** Gold CTA on detail page (Donio campaign) */
  donioUrl?: string;
  donioCtaKey?: string;
};

export const newsArticles: NewsArticleMeta[] = [
  {
    slug: "staromestske-slavnosti-zilina",
    dateIso: "2026-05-12",
    image: "/images/staromestke-slavnosti-nahlad.png",
    categoryKey: "news.category.concert",
    titleKey: "news.article.staromestske.title",
    excerptKey: "news.article.staromestske.excerpt",
    dateKey: "news.article.staromestske.date",
    bodyKeys: [
      "news.article.staromestske.body.p1",
      "news.article.staromestske.body.p2",
      "news.article.staromestske.body.p3",
    ],
    featured: true,
  },
  {
    slug: "podporte-nas-olympijsky-sen-donio",
    dateIso: "2026-04-18",
    image: "/images/donio-nahlad.png",
    categoryKey: "news.category.media",
    titleKey: "news.article.donio.title",
    excerptKey: "news.article.donio.excerpt",
    dateKey: "news.article.donio.date",
    bodyKeys: [
      "news.article.donio.body.p1",
      "news.article.donio.body.p2",
      "news.article.donio.body.p3",
    ],
    campaignPriority: true,
    priorityBadgeKey: "news.badge.currentChallenge",
    donioUrl:
      "https://donio.sk/omnia?utm_id=97757_v0_s00_e231_tv2_tp1_a1demongi5su6r&fbclid=IwY2xjawSEIVhleHRuA2FlbQIxMQBzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe5h1pD9KEG2HHYVULq6brj5DPze48HsaRsdSh5i_S78h82idNCaS_WgdGSZc_aem_BCX6kV4c1Mg45i7-ziR_6w",
    donioCtaKey: "news.article.donio.cta",
  },
  {
    slug: "cyrilometodske-dni-terchova",
    dateIso: "2026-06-22",
    image: "/images/terchova-nahlad.jpg",
    categoryKey: "news.category.concert",
    titleKey: "news.article.terchova.title",
    excerptKey: "news.article.terchova.excerpt",
    dateKey: "news.article.terchova.date",
    bodyKeys: [
      "news.article.terchova.body.p1",
      "news.article.terchova.body.p2",
      "news.article.terchova.body.p3",
      "news.article.terchova.body.p4",
    ],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticleMeta | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function sortNewsArticles(items: NewsArticleMeta[]): NewsArticleMeta[] {
  return [...items].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.campaignPriority && !b.campaignPriority) return -1;
    if (!a.campaignPriority && b.campaignPriority) return 1;
    return b.dateIso.localeCompare(a.dateIso);
  });
}
