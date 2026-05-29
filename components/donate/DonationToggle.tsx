"use client";

import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";

export type DonationFrequency = "once" | "monthly";

type Props = {
  value: DonationFrequency;
  onChange: (value: DonationFrequency) => void;
  locale: Locale;
  shortLabels?: boolean;
};

export default function DonationToggle({ value, onChange, locale, shortLabels }: Props) {
  return (
    <div
      role="tablist"
      aria-label={t(locale, "donate.frequency.label")}
      className="inline-flex rounded-lg border border-[var(--divider)] bg-transparent p-1"
    >
      <button
        role="tab"
        type="button"
        aria-selected={value === "once"}
        onClick={() => onChange("once")}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          value === "once"
            ? "bg-[var(--background-elevated)] text-foreground"
            : "text-foreground-muted hover:text-foreground"
        }`}
      >
        {t(locale, shortLabels ? "donate.frequency.onceShort" : "donate.frequency.once")}
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={value === "monthly"}
        onClick={() => onChange("monthly")}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          value === "monthly"
            ? "bg-[var(--background-elevated)] text-foreground"
            : "text-foreground-muted hover:text-foreground"
        }`}
      >
        {t(locale, shortLabels ? "donate.frequency.monthlyShort" : "donate.frequency.monthly")}
      </button>
    </div>
  );
}
