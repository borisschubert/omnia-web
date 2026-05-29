"use client";

import { useEffect, useState } from "react";
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 top-0 block h-0.5 w-6 rounded-full bg-accent transition-transform duration-200 ${
          open ? "top-2 rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-2 block h-0.5 w-6 rounded-full bg-accent transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-4 block h-0.5 w-6 rounded-full bg-accent transition-transform duration-200 ${
          open ? "top-2 -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const links = getNavLinks(locale);
  const homeHref = locale === "sk" ? "/" : "/en";
  const donateHref = getDonateHref(locale);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const linkClass = (isActive: boolean) =>
    `text-[0.9375rem] transition-colors hover:text-accent ${isActive ? "text-accent" : "text-foreground"}`;

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

          <nav
            className="hidden flex-wrap items-center justify-end gap-4 sm:gap-6 md:flex md:gap-8"
            aria-label="Main"
          >
            {links.map(({ href, key }) => {
              const isActive = pathname === href;
              return (
                <Link key={key} href={href} className={linkClass(isActive)}>
                  {t(locale, key)}
                </Link>
              );
            })}
            <Link
              href={donateHref}
              className={`ml-4 rounded-full px-4 py-2 font-medium text-black shadow-md transition hover:opacity-90 hover:shadow-lg ${
                pathname === donateHref ? "bg-accent/80" : "bg-accent"
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

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-accent transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-main-nav"
            aria-label={isOpen ? (locale === "sk" ? "Zavrieť menu" : "Close menu") : locale === "sk" ? "Otvoriť menu" : "Open menu"}
          >
            <HamburgerIcon open={isOpen} />
          </button>
        </div>

        {isOpen ? (
          <nav
            id="mobile-main-nav"
            className="border-t border-border pb-5 pt-4 md:hidden"
            aria-label={locale === "sk" ? "Hlavná navigácia" : "Main navigation"}
          >
            <ul className="flex flex-col gap-1">
              {links.map(({ href, key }) => {
                const isActive = pathname === href;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className={`block py-2.5 ${linkClass(isActive)}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {t(locale, key)}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2">
                <Link
                  href={donateHref}
                  className={`inline-flex rounded-full px-4 py-2 font-medium text-black shadow-md transition hover:opacity-90 hover:shadow-lg ${
                    pathname === donateHref ? "bg-accent/80" : "bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(locale, "button.donate")}
                </Link>
              </li>
            </ul>
            <div className="mt-4 border-t border-border pt-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
