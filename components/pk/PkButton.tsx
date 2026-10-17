import Link from "next/link";
import type { ReactNode } from "react";
import RollText from "@/components/ds/RollText";

type Variant = "dark" | "outline" | "light";

const variants: Record<Variant, string> = {
  dark: "bg-coal text-snow hover:bg-brass",
  outline: "border border-coal/25 text-coal hover:border-coal",
  light: "bg-snow text-coal hover:bg-brass-soft",
};

/** Pill button of the new design (uppercase, rolling label on hover) */
export function pkButtonClass(variant: Variant = "dark", extra = "") {
  return `inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-pk text-[13px] font-bold uppercase tracking-[0.07em] transition-colors duration-200 ${variants[variant]} ${extra}`;
}

export default function PkButton({
  href,
  variant = "dark",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = pkButtonClass(variant, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <RollText>{children}</RollText>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <RollText>{children}</RollText>
    </Link>
  );
}
