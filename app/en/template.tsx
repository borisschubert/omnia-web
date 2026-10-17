import { ViewTransition } from "react";

/** Re-mounts on every navigation → D3 page transition (styles in globals.css) */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
