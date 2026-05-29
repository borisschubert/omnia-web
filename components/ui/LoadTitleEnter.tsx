"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

/** Fade + slide up on mount (hero + page headers). Uses transform/opacity only. */
export default function LoadTitleEnter({
  children,
  className = "",
  offsetY = 10,
}: {
  children: ReactNode;
  className?: string;
  offsetY?: number;
}) {
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    let raf = 0;
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => setReady(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const show = ready || reduced;
  const style: CSSProperties = {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : `translateY(${offsetY}px)`,
    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
    willChange: "transform, opacity",
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
