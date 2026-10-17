import type { ReactNode } from "react";

/** Kept for old pages: content is static now — motion comes from [data-split] headings and [data-curtain] images */
export default function RevealOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
