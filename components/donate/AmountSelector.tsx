"use client";

import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";

const PRESET_AMOUNTS = [10, 25, 50, 100] as const;

type Props = {
  selectedAmount: number | null;
  customAmount: string;
  onSelectAmount: (amount: number) => void;
  onCustomChange: (value: string) => void;
  locale: Locale;
  currency?: string;
  customPlaceholderKey?: string;
  compact?: boolean;
};

export default function AmountSelector({
  selectedAmount,
  customAmount,
  onSelectAmount,
  onCustomChange,
  locale,
  currency = "€",
  customPlaceholderKey = "donate.customAmountPlaceholder",
  compact = false,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PRESET_AMOUNTS.map((amount) => {
          const isSelected = selectedAmount === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onSelectAmount(amount)}
              className={`rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                isSelected
                  ? "border-accent bg-accent text-black"
                  : "border-accent/50 bg-transparent text-accent hover:border-accent"
              }`}
            >
              {amount} {currency}
            </button>
          );
        })}
      </div>
      <div>
        {!compact && (
          <label htmlFor="donate-custom" className="mb-1 block text-sm text-foreground-muted">
            {t(locale, "donate.customAmount")}
          </label>
        )}
        <input
          id="donate-custom"
          type="text"
          inputMode="numeric"
          placeholder={t(locale, customPlaceholderKey)}
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value.replace(/[^\d,.]/g, ""))}
          className="w-full max-w-[140px] rounded-md border border-[var(--divider)] bg-transparent px-4 py-3 text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none"
        />
      </div>
    </div>
  );
}
