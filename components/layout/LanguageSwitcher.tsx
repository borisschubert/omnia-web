"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { alternateLocalePath } from "@/lib/i18n/config";
import { localeLabels, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? "/";
  const otherLocale: Locale = currentLocale === "sk" ? "en" : "sk";
  const href = alternateLocalePath(pathname, otherLocale);
  const label = localeLabels[otherLocale];

  return (
    <Link
      href={href}
      className="text-[0.9375rem] text-foreground-muted transition-colors hover:text-accent hover:underline hover:underline-offset-2 hover:decoration-accent"
      aria-label={`Switch to ${label}`}
    >
      {currentLocale === "sk" ? "EN" : "SK"}
    </Link>
  );
}
