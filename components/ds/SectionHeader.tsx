import type { ReactNode } from "react";

/** Section title (H2) with optional link or note aligned to the right */
export default function SectionHeader({
  title,
  aside,
}: {
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div
      className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4"
    >
      <h2 data-split className="t-h2 m-0">{title}</h2>
      {aside}
    </div>
  );
}
