import type { ReactNode } from "react";

/** Small uppercase label above titles (category, date, year …) */
export default function Kicker({ tone = "muted", className = "", children }: { tone?: "muted" | "gold"; className?: string; children: ReactNode }) {
  return (
    <span
      className={`font-pk text-[11px] font-bold uppercase tracking-[0.14em] ${tone === "gold" ? "text-brass-ink" : "text-graphite"} ${className}`}
    >
      {children}
    </span>
  );
}
