"use client";

import { useState } from "react";
import { pkButtonClass } from "@/components/pk/PkButton";
import RollText from "./RollText";

/** Copies `value` to the clipboard; label switches to `copiedLabel` for 2 s */
export default function CopyButton({
  value,
  label,
  copiedLabel,
  className = "",
}: {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available — leave label unchanged */
    }
  }

  return (
    <button type="button" onClick={copy} className={pkButtonClass("dark", className)} aria-live="polite">
      <RollText>{copied ? copiedLabel : label}</RollText>
    </button>
  );
}
