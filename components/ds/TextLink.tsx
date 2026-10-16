import Link from "next/link";
import type { ReactNode } from "react";

/** Underlined "→" link used next to section titles and in cards */
export default function TextLink({
  href,
  tone = "cream",
  external = false,
  className = "",
  children,
}: {
  href: string;
  tone?: "cream" | "ink";
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = `inline-block border-b-[1.5px] pb-[3px] t-small font-semibold leading-tight transition-colors ${
    tone === "ink"
      ? "border-gold text-gold hover:text-gold-hover hover:border-gold-hover"
      : "border-body text-body hover:border-gold-deep hover:text-gold-deep"
  } ${className}`;
  const content = (
    <>
      {children} <span aria-hidden>→</span>
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
