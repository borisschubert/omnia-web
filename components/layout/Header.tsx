"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { alternateLocalePath, getDonateHref, localePath } from "@/lib/i18n/config";
import { getNavLinks } from "@/lib/i18n/nav";
import { t } from "@/lib/i18n/strings";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/content/organization";
import { buttonClass } from "@/components/ds/Button";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LanguagePill({ locale, pathname, large = false }: { locale: Locale; pathname: string; large?: boolean }) {
  const option = (target: Locale, label: string) => {
    const on = target === locale;
    const cls = large
      ? `rounded-full border border-cream/25 px-[18px] py-3 ${on ? "bg-cream text-ink" : "text-muted-ink hover:text-cream"}`
      : `rounded-full px-2.5 py-[7px] ${on ? "bg-cream text-ink" : "text-muted-ink hover:text-cream"}`;
    return (
      <Link
        href={on ? pathname : alternateLocalePath(pathname, target)}
        className={`transition-colors ${cls}`}
        aria-current={on ? "true" : undefined}
        hrefLang={target}
      >
        {label}
      </Link>
    );
  };

  if (large) {
    return (
      <div className="flex gap-2 t-small font-semibold leading-none">
        {option("sk", t(locale, "lang.sk"))}
        {option("en", t(locale, "lang.en"))}
      </div>
    );
  }
  return (
    <div className="flex rounded-full border border-cream/20 p-[3px] t-label leading-none">
      {option("sk", "SK")}
      {option("en", "EN")}
    </div>
  );
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const links = getNavLinks(locale);
  const donateHref = getDonateHref(locale);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="surface-ink sticky top-0 z-[100] bg-ink text-cream">
      <div className="wrap flex h-[clamp(68px,6vw,84px)] items-center gap-6">
        <Link
          href={localePath("/", locale)}
          className="mr-auto flex items-center gap-4"
          aria-label={t(locale, "nav.home")}
        >
          <Image
            src="/logo.png"
            alt="OMNIA"
            width={1227}
            height={617}
            className="block h-[clamp(30px,2.8vw,38px)] w-auto"
            priority
          />
          <span className="hidden border-l border-cream/20 pl-4 t-label text-muted-ink min-[1360px]:block">
            {t(locale, "header.tagline1")}
            <br />
            {t(locale, "header.tagline2")}
          </span>
        </Link>

        <nav className="hidden gap-0.5 t-small font-medium leading-none nav:flex" aria-label={t(locale, "nav.mainLabel")}>
          {links.map(({ href, key }) => {
            const on = isActivePath(pathname, href);
            return (
              <Link
                key={key}
                href={href}
                aria-current={on ? "page" : undefined}
                className={`rounded-full px-3 py-2.5 transition-colors ${
                  on ? "bg-gold/10 text-gold" : "text-cream hover:bg-cream/[0.08]"
                }`}
              >
                {t(locale, key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden nav:block">
          <LanguagePill locale={locale} pathname={pathname} />
        </div>

        <Link href={donateHref} className={buttonClass("gold", "md")}>
          {t(locale, "button.donate")}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={t(locale, open ? "menu.close" : "menu.open")}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-[22px] leading-none text-cream nav:hidden"
        >
          <span aria-hidden>{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col overflow-y-auto border-t border-line-ink bg-ink px-5 pb-8 pt-2 nav:hidden"
        >
          <nav aria-label={t(locale, "nav.mainLabel")} className="flex flex-col">
            {links.map(({ href, key }) => {
              const on = isActivePath(pathname, href);
              return (
                <Link
                  key={key}
                  href={href}
                  aria-current={on ? "page" : undefined}
                  className={`border-b border-cream/10 py-4 font-display text-[28px] font-bold leading-tight tracking-[-0.02em] ${
                    on ? "text-gold" : "text-cream"
                  }`}
                >
                  {t(locale, key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6">
            <LanguagePill locale={locale} pathname={pathname} large />
          </div>
          <div className="mt-7 flex gap-5 t-small font-medium">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-cream">
              Instagram
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-muted-ink hover:text-cream">
              Facebook
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
