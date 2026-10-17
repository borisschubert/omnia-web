import Link from "next/link";
import { LongArrow } from "./Icons";

/**
 * "EXPLORE our program →" link: soft gold circle behind the first word; on hover the circle
 * opens into a pill (clip-path) with equal padding before the text and after the arrow.
 */
export default function CircleCta({
  href,
  label,
  tone = "light",
  className = "",
}: {
  href: string;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [first, ...rest] = label.split(" ");
  const text = tone === "dark" ? "text-snow" : "text-coal";
  const fill = tone === "dark" ? "bg-brass/55" : "bg-brass-soft";
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-[72px] items-center gap-4 px-6 font-pk text-[15px] uppercase tracking-[0.06em] ${text} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full ${fill} [clip-path:inset(0_calc(100%-72px)_0_0_round_36px)] transition-[clip-path] duration-[var(--dur-roll)] ease-[var(--ease-out)] group-hover:[clip-path:inset(0_0_0_0_round_36px)] group-focus-visible:[clip-path:inset(0_0_0_0_round_36px)]`}
      />
      <span className="relative">
        <span className="font-extrabold">{first}</span> <span className="font-normal">{rest.join(" ")}</span>
      </span>
      <LongArrow className="relative w-[42px]" />
    </Link>
  );
}
