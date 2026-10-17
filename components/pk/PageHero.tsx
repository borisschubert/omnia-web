import type { ReactNode } from "react";

/** Subpage opening: gold kicker, big thin title (A3 reveal), gold rule, intro; optional aside on the right */
export default function PageHero({
  kicker,
  title,
  intro,
  aside,
  children,
}: {
  kicker?: string;
  title: string;
  intro?: ReactNode;
  /** Right column (search, photo …) */
  aside?: ReactNode;
  /** Extra content under the intro (CTA, stats …) */
  children?: ReactNode;
}) {
  return (
    <section className="surface-cream bg-snow text-coal">
      <div
        className={`wrap grid gap-x-[clamp(32px,5vw,88px)] gap-y-10 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,7vw,112px)] ${
          aside ? "items-end md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""
        }`}
      >
        <div className="flex max-w-[760px] flex-col">
          {kicker ? (
            <p className="m-0 mb-[clamp(16px,1.8vw,24px)] font-pk text-[13px] font-bold uppercase tracking-[0.18em] text-brass">
              {kicker}
            </p>
          ) : null}
          <h1
            data-split
            className="m-0 text-balance font-pk text-[clamp(44px,6.2vw,96px)] font-light leading-[1.04] tracking-[-0.03em]"
          >
            {title}
          </h1>
          <div className="mt-[clamp(24px,3vw,40px)] h-px max-w-[520px] bg-brass" />
          {intro ? (
            <div className="mt-[clamp(20px,2.6vw,32px)] max-w-[560px] font-pk text-[clamp(16px,1.25vw,18px)] leading-[1.85] text-graphite">
              {intro}
            </div>
          ) : null}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
