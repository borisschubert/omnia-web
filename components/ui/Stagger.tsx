import type { ElementType, ReactNode } from "react";

/** Kept for old pages: static wrappers — motion comes from [data-split] headings and [data-curtain] images */
export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({
  as: Tag = "div",
  children,
  className = "",
}: {
  as?: ElementType;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={className}>{children}</Tag>;
}
