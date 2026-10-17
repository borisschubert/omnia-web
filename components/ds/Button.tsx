import Link from "next/link";
import type { ReactNode } from "react";
import RollText from "./RollText";

type Variant = "gold" | "dark" | "outline" | "outline-ink";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 font-semibold t-small leading-none transition-colors duration-200";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-hover",
  dark: "bg-ink text-cream hover:bg-ink-hover",
  outline: "border border-body/25 text-body hover:border-body hover:bg-body hover:text-cream",
  "outline-ink": "border border-cream/40 text-cream hover:bg-cream hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4",
  lg: "min-h-13 px-6",
};

export function buttonClass(variant: Variant = "gold", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export default function Button({
  href,
  variant = "gold",
  size = "md",
  external = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const cls = buttonClass(variant, size, className);
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
