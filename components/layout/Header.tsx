"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { getDonateHref } from "@/lib/i18n/config";
import { getNavLinks } from "@/lib/i18n/nav";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const links = getNavLinks(locale);
  const homeHref = locale === "sk" ? "/" : "/en";

  return (
    <header className="sticky top-0 z-[100] border-b border-border bg-background">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={homeHref}
            className="flex shrink-0 cursor-pointer items-center no-underline outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={locale === "sk" ? "Domov" : "Home"}
          >
            <Image
              src="/logo.png"
              alt=""
              width={120}
              height={40}
              className="h-9 w-auto object-contain object-left md:h-10"
              priority
            />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-4 sm:gap-6 md:gap-8" aria-label="Main">
            {links.map(({ href, key }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={`text-[0.9375rem] transition-colors hover:text-accent ${isActive ? "text-accent" : "text-foreground"}`}
                >
                  {t(locale, key)}
                </Link>
              );
            })}
            <Link
              href={getDonateHref(locale)}
              className={`ml-4 rounded-full px-4 py-2 font-medium text-black shadow-md transition hover:opacity-90 hover:shadow-lg ${
                pathname === getDonateHref(locale) ? "bg-accent/80" : "bg-accent"
              }`}
            >
              {t(locale, "button.donate")}
            </Link>
            <div className="ml-4 hidden items-center md:flex">
              <SocialLinks />
            </div>
            <span className="ml-2 border-l border-border pl-6" aria-hidden>
              <LanguageSwitcher currentLocale={locale} />
            </span>
          </nav>
        </div>
      </Container>
    </header>
  );
}
