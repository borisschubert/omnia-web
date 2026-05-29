import type { Locale } from "./config";
import skStrings from "./strings/sk.json";
import enStrings from "./strings/en.json";

const strings: Record<Locale, Record<string, string>> = {
  sk: skStrings as Record<string, string>,
  en: enStrings as Record<string, string>,
};

export function getStrings(locale: Locale): Record<string, string> {
  return strings[locale] ?? strings.sk;
}

export function t(locale: Locale, key: string): string {
  return getStrings(locale)[key] ?? key;
}
