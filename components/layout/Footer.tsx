import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getDonateHref, localePath } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  ORG_ADDRESS_LINE,
  ORG_EMAIL,
  ORG_FOUNDED,
  ORG_PHONE,
  YOUTUBE_URL,
} from "@/lib/content/organization";
import { pkButtonClass } from "@/components/pk/PkButton";
import RollText from "@/components/ds/RollText";

const linkCls = "u-line self-start text-snow transition-colors duration-200 hover:text-brass-soft";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brass-soft">{children}</span>;
}

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="surface-ink mt-auto bg-coal font-pk text-snow">
      <div className="wrap pb-8 pt-[clamp(64px,7vw,104px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-x-[clamp(24px,3vw,48px)] gap-y-10">
          <div className="flex flex-col items-start gap-[18px]">
            <Link href={localePath("/", locale)} aria-label={t(locale, "nav.home")}>
              <Image src="/logo.png" alt="OMNIA" width={1227} height={617} className="block h-12 w-auto" />
            </Link>
            <span className="text-[15px] leading-[1.6] text-snow/60">
              {t(locale, "header.tagline1")}
              <br />
              {t(locale, "footer.since").replace("{year}", String(ORG_FOUNDED))}
            </span>
            <Link href={getDonateHref(locale)} className={pkButtonClass("light")}>
              <RollText>{t(locale, "button.donate")}</RollText>
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <ColumnTitle>{t(locale, "footer.contact")}</ColumnTitle>
            <a href={`mailto:${ORG_EMAIL}`} className={linkCls}>
              {ORG_EMAIL}
            </a>
            <a href={`tel:${ORG_PHONE.replace(/\s/g, "")}`} className={linkCls}>
              {ORG_PHONE}
            </a>
            <span className="text-snow/60">{ORG_ADDRESS_LINE}</span>
          </div>

          <div className="flex flex-col gap-2.5 text-[15px]">
            <ColumnTitle>{t(locale, "footer.follow")}</ColumnTitle>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Instagram
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Facebook
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
              YouTube
            </a>
          </div>
        </div>

        <div className="mt-[clamp(48px,6vw,80px)] flex flex-wrap justify-between gap-3 border-t border-snow/10 pt-6 text-[13px] text-snow/50">
          <span>
            © {new Date().getFullYear()} {t(locale, "footer.orgName")}
          </span>
          <span>{t(locale, "footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
