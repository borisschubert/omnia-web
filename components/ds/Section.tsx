import type { ReactNode } from "react";

export type Tone = "ink" | "cream" | "cream-2";

const tones: Record<Tone, string> = {
  ink: "surface-ink bg-ink text-cream",
  cream: "surface-cream bg-cream text-body",
  "cream-2": "surface-cream bg-cream-2 text-body",
};

/** Full-width band with the redesign background rhythm; inner content padded + centered */
export default function Section({
  tone,
  id,
  bare = false,
  className = "",
  children,
}: {
  tone: Tone;
  id?: string;
  /** Skip the default container + vertical padding (for full-bleed layouts) */
  bare?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      {bare ? children : <div className="wrap section-y">{children}</div>}
    </section>
  );
}
