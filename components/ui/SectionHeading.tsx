import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

/** Gold underline — use for all major section titles on the homepage for alignment. */
export default function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`relative text-2xl font-semibold tracking-tight text-white md:text-3xl after:mt-2 after:block after:h-px after:w-12 after:content-[''] after:bg-accent ${className}`}
    >
      {children}
    </h2>
  );
}
