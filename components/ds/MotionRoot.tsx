"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { motion } from "@/lib/motion";

/*
 * Site-wide motion, preset "Elegantný / prémiový" (ANIMATIONS.md, section E):
 *   A1 Lenis smooth scroll · A3 [data-split] line mask reveal · A6 [data-curtain] image reveal
 *   A7 [data-parallax] subtle parallax. C2/C3 hovers are pure CSS, D3 lives in template.tsx.
 * Nothing runs with prefers-reduced-motion; reveals fire once.
 */

let lenis: Lenis | null = null;

function motionAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setup() {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  if (!CustomEase.get("omnia-out")) CustomEase.create("omnia-out", motion.easeOut);
  if (!CustomEase.get("omnia-in-out")) CustomEase.create("omnia-in-out", motion.easeInOut);
}

/** Lines slide up from behind their masks */
function revealLines(lines: Element[], trigger: Element) {
  return gsap.from(lines, {
    yPercent: 110,
    duration: motion.line,
    ease: "omnia-out",
    stagger: motion.lineStagger,
    scrollTrigger: { trigger, start: motion.start, once: true },
  });
}

export default function MotionRoot() {
  const pathname = usePathname();

  // A1: one Lenis instance for the session (touch devices keep native scrolling)
  useEffect(() => {
    if (!motionAllowed()) return;
    setup();
    const instance = new Lenis({ lerp: motion.lerp, smoothWheel: true, anchors: true, autoRaf: false });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // A3 / A6 / A7 for the current page — layout effect so start states are set before the first paint
  useLayoutEffect(() => {
    if (!motionAllowed()) return;
    setup();
    document.documentElement.classList.add("motion-ready");
    lenis?.resize();

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-curtain]").forEach((frame) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: motion.start, once: true } });
        tl.fromTo(
          frame,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: motion.curtain, ease: "omnia-in-out" },
          0
        );
        const img = frame.querySelector("img");
        if (img) tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: motion.curtainImage, ease: "omnia-out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -motion.parallax },
          {
            yPercent: motion.parallax,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });

    // Split after webfonts so line breaks are final; SplitText re-splits on resize (autoSplit)
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          if (el.dataset.split === "manual") {
            // Lines already wrapped in .split-mask in the markup (e.g. the hero headline)
            gsap.set(el, { opacity: 1 });
            revealLines(Array.from(el.querySelectorAll("[data-line]")), el);
            return;
          }
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { opacity: 1 });
              return revealLines(self.lines, el);
            },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
