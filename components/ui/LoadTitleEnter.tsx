import type { ReactNode } from "react";

/** Kept for old pages: the title inside animates via [data-split] (MotionRoot) */
export default function LoadTitleEnter({ children, className = "" }: { children: ReactNode; className?: string; offsetY?: number }) {
  return <div className={className}>{children}</div>;
}
