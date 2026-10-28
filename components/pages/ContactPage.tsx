"use client";

import { useCallback, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import { ORG_ADDRESS_LINE, ORG_EMAIL, ORG_PHONE } from "@/lib/content/organization";
import PageHero from "@/components/pk/PageHero";
import ArrowLink from "@/components/pk/ArrowLink";
import Kicker from "@/components/pk/Kicker";
import PkSectionHeader from "@/components/pk/PkSectionHeader";
import { pkButtonClass } from "@/components/pk/PkButton";
import RollText from "@/components/ds/RollText";

const MAP_QUERY = encodeURIComponent("Gaštanová 3078/4, 010 07 Žilina, Slovakia");
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&hl=sk&z=16&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const subjectOptions = [
  { value: "performance", key: "contact.form.subject.performance" },
  { value: "choir", key: "contact.form.subject.choir" },
  { value: "media", key: "contact.form.subject.media" },
  { value: "other", key: "contact.form.subject.other" },
] as const;

const labelCls = "mb-2 block font-pk text-[11px] font-bold uppercase tracking-[0.14em] text-graphite";
const inputCls =
  "w-full border-0 border-b border-coal/25 bg-transparent px-0 py-3 font-pk text-[17px] text-coal outline-none transition-colors duration-200 placeholder:text-graphite/70 focus:border-coal";
const errorCls = "mt-1.5 font-pk text-[13px] font-semibold text-brass-ink";

function DetailRow({
  label,
  value,
  href,
  copied,
  onCopy,
  locale,
}: {
  label: string;
  value: string;
  href?: string;
  copied: boolean;
  onCopy: () => void;
  locale: Locale;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-hairline py-[clamp(20px,2.4vw,28px)]">
      <Kicker>{label}</Kicker>
      {href ? (
        <a href={href} className="self-start font-pk text-[clamp(20px,1.9vw,26px)] font-light transition-colors duration-200 hover:text-brass">
          <span className="u-line">{value}</span>
        </a>
      ) : (
        <span className="font-pk text-[clamp(18px,1.6vw,22px)] font-light leading-[1.4]">{value}</span>
      )}
      <button
        type="button"
        onClick={onCopy}
        className="self-start font-pk text-[12px] font-bold uppercase tracking-[0.1em] text-brass-ink"
        aria-live="polite"
      >
        <span className="u-line">{copied ? t(locale, "contact.copied") : t(locale, "contact.copy")}</span>
      </button>
    </div>
  );
}

export default function ContactPage({ locale }: { locale: Locale }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback((value: string, id: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t(locale, "contact.form.nameRequired");
    if (!form.email.trim()) e.email = t(locale, "contact.form.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t(locale, "contact.form.emailInvalid");
    if (!form.message.trim()) e.message = t(locale, "contact.form.messageRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  return (
    <div className="bg-snow text-coal">
      <PageHero
        kicker={`${t(locale, "header.tagline1")} · ${t(locale, "header.tagline2")}`}
        title={t(locale, "page.contact.title")}
        intro={<p className="m-0">{t(locale, "page.contact.intro")}</p>}
      />

      <section className="surface-cream bg-snow">
        <div className="wrap grid items-start gap-x-[clamp(32px,5vw,88px)] gap-y-14 pb-[clamp(64px,8vw,120px)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h2 className="m-0 mb-2 font-pk text-[clamp(22px,2vw,28px)] font-semibold">{t(locale, "contact.details.title")}</h2>
            <div className="border-t border-hairline">
              <DetailRow
                label={t(locale, "contact.email")}
                value={ORG_EMAIL}
                href={`mailto:${ORG_EMAIL}`}
                copied={copied === "email"}
                onCopy={() => copy(ORG_EMAIL, "email")}
                locale={locale}
              />
              <DetailRow
                label={t(locale, "contact.phone")}
                value={ORG_PHONE}
                href={`tel:${ORG_PHONE.replace(/\s/g, "")}`}
                copied={copied === "phone"}
                onCopy={() => copy(ORG_PHONE, "phone")}
                locale={locale}
              />
              <DetailRow
                label={t(locale, "contact.address")}
                value={ORG_ADDRESS_LINE}
                copied={copied === "address"}
                onCopy={() => copy(ORG_ADDRESS_LINE, "address")}
                locale={locale}
              />
            </div>
          </div>

          <div className="bg-mist p-[clamp(24px,3.4vw,48px)]">
            <h2 className="m-0 font-pk text-[clamp(28px,2.8vw,40px)] font-light tracking-[-0.02em]">{t(locale, "contact.form.title")}</h2>
            <form
              action="https://formsubmit.co/info@omnia.sk"
              method="POST"
              onSubmit={(e) => {
                if (!validate()) e.preventDefault();
              }}
              className="mt-6 flex flex-col gap-6"
            >
              <div>
                <label htmlFor="name" className={labelCls}>
                  {t(locale, "contact.form.name")}
                </label>
                <input id="name" name="name" type="text" value={form.name} onChange={set("name")} className={inputCls} placeholder={t(locale, "contact.form.namePlaceholder")} />
                {errors.name ? <p className={errorCls}>{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  {t(locale, "contact.form.email")}
                </label>
                <input id="email" name="email" type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder={t(locale, "contact.form.emailPlaceholder")} />
                {errors.email ? <p className={errorCls}>{errors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="subject" className={labelCls}>
                  {t(locale, "contact.form.subject")}
                </label>
                <select id="subject" name="subject" value={form.subject} onChange={set("subject")} className={`${inputCls} cursor-pointer`}>
                  <option value="">{t(locale, "contact.form.subjectPlaceholder")}</option>
                  {subjectOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t(locale, o.key)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className={labelCls}>
                  {t(locale, "contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} min-h-[140px] resize-y`}
                  placeholder={t(locale, "contact.form.messagePlaceholder")}
                />
                {errors.message ? <p className={errorCls}>{errors.message}</p> : null}
              </div>
              <button type="submit" className={pkButtonClass("dark", "mt-2 self-start")}>
                <RollText>{t(locale, "contact.form.submit")}</RollText>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="surface-cream bg-snow">
        <div className="wrap pb-[clamp(64px,8vw,120px)]">
          <div className="border-t border-hairline pt-[clamp(40px,5vw,72px)]">
            <PkSectionHeader
              title={t(locale, "contact.whereFindUs")}
              aside={
                <ArrowLink href={MAP_LINK_URL} external>
                  {t(locale, "contact.viewInGoogleMaps")}
                </ArrowLink>
              }
            />
            <p className="m-0 -mt-[clamp(12px,2vw,28px)] mb-8 font-pk text-[16px] text-graphite">{ORG_ADDRESS_LINE}</p>
            <div className="contact-map-frame">
              <iframe title={t(locale, "contact.mapTitle")} src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
