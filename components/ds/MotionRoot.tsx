"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll reveal ([data-reveal]) and parallax ([data-parallax]) for the current page.
 * Re-runs on every navigation. Respects prefers-reduced-motion.
 */
export default function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanups: (() => void)[] = [];

    if ("IntersectionObserver" in window) {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      const below = els.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      below.forEach((el) => el.classList.add("reveal-pending"));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("reveal-in");
            el.classList.remove("reveal-pending");
            io.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      below.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    const px = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (px.length) {
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const vh = window.innerHeight;
          px.forEach((el) => {
            const parent = el.parentElement;
            if (!parent) return;
            const r = parent.getBoundingClientRect();
            const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
            el.style.transform = `translate3d(0, ${(c * -6).toFixed(2)}%, 0)`;
          });
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
