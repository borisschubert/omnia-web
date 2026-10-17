import Link from "next/link";
import type { ReactNode } from "react";

/** "→" link used next to section titles and in cards; underline draws in on hover (C3) */
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
  const cls = `inline-block t-small font-semibold leading-tight transition-colors duration-200 ${
    tone === "ink" ? "text-gold hover:text-gold-hover" : "text-body hover:text-gold-deep"
  } ${className}`;
  const content = (
    <>
      <span className="u-line">{children}</span> <span aria-hidden>→</span>
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
