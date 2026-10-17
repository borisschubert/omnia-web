import Link from "next/link";
import type { ReactNode } from "react";
import { LongArrow } from "./Icons";

/** Small gold uppercase link: underline draws in (C3), arrow nudges right */
export default function ArrowLink({
  href,
  tone = "light",
  className = "",
  children,
}: {
  href: string;
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 font-pk text-[12px] font-bold uppercase tracking-[0.1em] ${
        tone === "dark" ? "text-brass-soft" : "text-brass"
      } ${className}`}
    >
      <span className="u-line">{children}</span>
      <LongArrow className="w-8 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
    </Link>
  );
}
