import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getNavLinks } from "@/lib/i18n/nav";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import SocialLinks from "@/components/ui/SocialLinks";

export default function Footer({ locale }: { locale: Locale }) {
  const links = getNavLinks(locale);

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-8 sm:flex-row sm:gap-4">
          <div className="flex justify-center md:hidden">
            <SocialLinks />
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer">
            {links.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                className="text-[0.9375rem] text-foreground transition-colors hover:text-accent"
              >
                {t(locale, key)}
              </Link>
            ))}
          </nav>
          <p className="text-[0.875rem] text-foreground-muted">
            {t(locale, "footer.rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
