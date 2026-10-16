import { localePath } from "./config";
import type { Locale } from "./config";

export const navItems: { path: string; key: string }[] = [
  { path: "/o-zbore", key: "nav.about" },
  { path: "/program", key: "nav.program" },
  { path: "/aktuality", key: "nav.news" },
  { path: "/ocenenia", key: "nav.awards" },
  { path: "/pridaj-sa", key: "nav.join" },
  { path: "/kontakt", key: "nav.contact" },
];

export function getNavLinks(locale: Locale) {
  return navItems.map(({ path, key }) => ({
    href: localePath(path === "/" ? "" : path, locale),
    key,
  }));
}
