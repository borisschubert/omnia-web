/**
 * i18n config: supported locales, default, and link helper.
 * Used by routing and loaders. No middleware; static export only.
 */

export const locales = ["sk", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sk";

export const localeLabels: Record<Locale, string> = {
  sk: "Slovenčina",
  en: "English",
};

/**
 * Build internal link for a locale.
 * SK = path without prefix (e.g. "/o-nas"), EN = "/en" + path (e.g. "/en/o-nas").
 */
export function localePath(path: string, locale: Locale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "sk") return normalized === "/" ? "/" : normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

/**
 * Parse current path to get path segment without locale prefix (for language switcher).
 * e.g. "/en/o-nas" -> "/o-nas", "/o-nas" -> "/o-nas"
 */
export function pathWithoutLocalePrefix(pathname: string): string {
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice(3) || "/";
    return rest;
  }
  return pathname;
}

/**
 * Get alternate locale link for current path (for language switcher).
 */
export function alternateLocalePath(pathname: string, targetLocale: Locale): string {
  let segment = pathWithoutLocalePrefix(pathname);
  // Donate page has a different slug per locale
  if (segment === "/podporte-nas" || segment === "/donate") {
    return getDonateHref(targetLocale);
  }
  if (segment.endsWith("/") && segment.length > 1) segment = segment.slice(0, -1);
  return localePath(segment === "/" ? "" : segment, targetLocale);
}

/**
 * Donate page path: SK = /podporte-nas, EN = /en/donate.
 */
export function getDonateHref(locale: Locale): string {
  return locale === "sk" ? "/podporte-nas" : "/en/donate";
}
