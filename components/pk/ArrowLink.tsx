import Link from "next/link";
import type { ReactNode } from "react";
import { LongArrow } from "./Icons";

/** Small gold uppercase link: underline draws in (C3), arrow nudges right */
export default function ArrowLink({
  href,
  tone = "light",
  back = false,
  external = false,
  className = "",
  children,
}: {
  href: string;
  tone?: "light" | "dark";
  /** Arrow points left and sits before the label */
  back?: boolean;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `group inline-flex items-center gap-3 font-pk text-[12px] font-bold uppercase tracking-[0.1em] ${
    tone === "dark" ? "text-brass-soft" : "text-brass"
  } ${className}`;
  const arrow = back ? (
    <LongArrow className="w-8 rotate-180 transition-transform duration-200 ease-[var(--ease-out)] group-hover:-translate-x-1" />
  ) : (
    <LongArrow className="w-8 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" />
  );
  const content = (
    <>
      {back ? arrow : null}
      <span className="u-line">{children}</span>
      {back ? null : arrow}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
