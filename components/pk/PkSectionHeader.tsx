import type { ReactNode } from "react";

/** Large thin section title (A3 line reveal) with an optional link aligned to its baseline */
export default function PkSectionHeader({ title, aside }: { title: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-[clamp(28px,3.6vw,56px)] flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <h2 data-split className="m-0 font-pk text-[clamp(40px,4.6vw,68px)] font-normal leading-[1.05] tracking-[-0.03em]">
        {title}
      </h2>
      {aside}
    </div>
  );
}
