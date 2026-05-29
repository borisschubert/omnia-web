"use client";

import { useState, useCallback, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import LoadTitleEnter from "@/components/ui/LoadTitleEnter";

const EMAIL = "info@omnia.sk";
const PHONE = "+421 904 387 243";
const ADDRESS_LINE = "Spevácky zbor OMNIA, Gaštanová 3078/4, 010 07 Žilina";
const MAP_QUERY = encodeURIComponent("Gaštanová 3078/4, 010 07 Žilina, Slovakia");
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&hl=sk&z=16&output=embed`;
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

const subjectOptions = [
  { value: "performance", key: "contact.form.subject.performance" },
  { value: "choir", key: "contact.form.subject.choir" },
  { value: "media", key: "contact.form.subject.media" },
  { value: "other", key: "contact.form.subject.other" },
] as const;

const inputClass =
  "w-full rounded-xl border border-white/[0.1] bg-[#0a0a0a]/90 px-4 py-3 text-[0.9375rem] text-foreground placeholder:text-[#aaaaaa] transition-[border-color,box-shadow] duration-200 focus:border-[#FFD700] focus:outline-none focus:shadow-[0_6px_28px_-6px_rgba(255,215,0,0.35)] focus:ring-0";

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ContactDetailRow({
  icon,
  label,
  value,
  href,
  onCopy,
  copied,
  locale,
  copyKey,
  copiedKey,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  onCopy: () => void;
  copied: boolean;
  locale: Locale;
  copyKey: string;
  copiedKey: string;
}) {
  const content = href ? (
    <a href={href} className="text-foreground transition-colors hover:text-[var(--primary-gold)]">
      {value}
    </a>
  ) : (
    <span className="text-foreground">{value}</span>
  );

  return (
    <div className="flex gap-4 rounded-xl border border-[rgba(255,215,0,0.2)] bg-transparent p-4 backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.03] md:p-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-gold)]/12 text-[var(--primary-gold)] [&_svg]:size-5">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-medium uppercase tracking-wide text-foreground-muted">{label}</span>
        <div className="mt-1 text-sm font-medium leading-snug">{content}</div>
        <button
          type="button"
          onClick={onCopy}
          className="mt-2.5 text-xs font-semibold text-[var(--primary-gold)] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {copied ? t(locale, copiedKey) : t(locale, copyKey)}
        </button>
      </div>
    </div>
  );
}

export default function ContactPage({ locale }: { locale: Locale }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback((value: string, id: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formState.name.trim()) e.name = t(locale, "contact.form.nameRequired");
    if (!formState.email.trim()) e.email = t(locale, "contact.form.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) e.email = t(locale, "contact.form.emailInvalid");
    if (!formState.message.trim()) e.message = t(locale, "contact.form.messageRequired");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!validate()) e.preventDefault();
  };

  const detailsPanelClass =
    "rounded-2xl border border-[rgba(255,215,0,0.18)] bg-transparent p-6 backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.03] md:p-8";

  const formPanelClass =
    "rounded-2xl border border-[rgba(255,215,0,0.22)] bg-transparent p-6 shadow-[0_0_48px_-16px_rgba(255,215,0,0.18),inset_0_1px_0_rgba(255,215,0,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.04] md:p-8";

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0c0a06] to-[#1a1608]">
      <section className="border-b border-white/[0.06] pb-10 pt-10 md:pb-14 md:pt-12 lg:pb-16 lg:pt-14">
        <Container>
          <LoadTitleEnter>
            <h1 className="relative text-2xl font-semibold tracking-tight text-white md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent">
              {t(locale, "page.contact.title")}
            </h1>
          </LoadTitleEnter>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-white md:text-base">
            {t(locale, "page.contact.intro")}
          </p>
        </Container>
      </section>

      <section className="py-10 md:py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-start">
            <div className={detailsPanelClass}>
              <h2 className="text-lg font-semibold text-white">{t(locale, "contact.details.title")}</h2>
              <div className="mt-6 flex flex-col gap-3">
                <ContactDetailRow
                  icon={<IconMail />}
                  label={t(locale, "contact.email")}
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                  onCopy={() => copyToClipboard(EMAIL, "email")}
                  copied={copied === "email"}
                  locale={locale}
                  copyKey="contact.copy"
                  copiedKey="contact.copied"
                />
                <ContactDetailRow
                  icon={<IconPhone />}
                  label={t(locale, "contact.phone")}
                  value={PHONE}
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  onCopy={() => copyToClipboard(PHONE, "phone")}
                  copied={copied === "phone"}
                  locale={locale}
                  copyKey="contact.copy"
                  copiedKey="contact.copied"
                />
                <ContactDetailRow
                  icon={<IconMapPin />}
                  label={t(locale, "contact.address")}
                  value={ADDRESS_LINE}
                  onCopy={() => copyToClipboard(ADDRESS_LINE, "address")}
                  copied={copied === "address"}
                  locale={locale}
                  copyKey="contact.copy"
                  copiedKey="contact.copied"
                />
              </div>
            </div>

            <div className={formPanelClass}>
              <h2 className="text-lg font-semibold text-white">{t(locale, "contact.form.title")}</h2>
              <form
                action="https://formsubmit.co/info@omnia.sk"
                method="POST"
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t(locale, "contact.form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      className={inputClass}
                      placeholder={t(locale, "contact.form.namePlaceholder")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-[var(--primary-gold)]">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t(locale, "contact.form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      className={inputClass}
                      placeholder={t(locale, "contact.form.emailPlaceholder")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-[var(--primary-gold)]">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t(locale, "contact.form.subject")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="" className="bg-[#1e1e1e]">
                        {t(locale, "contact.form.subjectPlaceholder")}
                      </option>
                      {subjectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#1e1e1e]">
                          {t(locale, opt.key)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t(locale, "contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className={`${inputClass} resize-y min-h-[140px]`}
                      placeholder={t(locale, "contact.form.messagePlaceholder")}
                    />
                    {errors.message && <p className="mt-1 text-xs text-[var(--primary-gold)]">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="min-w-[11.5rem] w-full rounded-xl bg-[var(--primary-gold)] px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_20px_-6px_rgba(255,215,0,0.3)] transition-[box-shadow,opacity] duration-300 hover:shadow-[0_0_32px_-4px_rgba(255,215,0,0.45)] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1608] sm:w-auto"
                  >
                    {t(locale, "contact.form.submit")}
                  </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <section className="mt-12 border-t border-white/[0.08] pb-16 pt-12 md:mt-16 md:pb-20 md:pt-16 lg:mt-20 lg:pt-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-lg font-semibold text-white">{t(locale, "contact.whereFindUs")}</h2>
            <p className="mt-3 text-sm text-foreground-muted md:text-[0.9375rem]">{ADDRESS_LINE}</p>
          </div>
          <div className="contact-map-frame mt-8">
            <iframe
              title={t(locale, "contact.mapTitle")}
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[var(--primary-gold)]/55 bg-transparent px-6 py-2.5 text-sm font-medium text-[var(--primary-gold)] transition-colors duration-200 hover:border-[var(--primary-gold)] hover:bg-[var(--primary-gold)]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-gold)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1608]"
            >
              {t(locale, "contact.viewInGoogleMaps")}
            </a>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={locale === "sk" ? "/" : "/en"}
              className="text-sm font-medium text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {t(locale, "nav.home")}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
