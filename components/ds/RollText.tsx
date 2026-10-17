import type { ReactNode } from "react";

/** C2 text roll: on hover of the parent link/button the label rolls up and its copy rolls in (CSS in globals.css) */
export default function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}
