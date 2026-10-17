/** Motion config shared by all JS animations — mirrors the CSS variables in app/globals.css */
export const motion = {
  /** cubic-bezier(0.22, 1, 0.36, 1) — every movement */
  easeOut: "0.22,1,0.36,1",
  /** cubic-bezier(0.65, 0, 0.35, 1) — curtain reveal */
  easeInOut: "0.65,0,0.35,1",
  /** Reveal durations (s) — premium preset runs 0.8–1.0 s */
  line: 0.9,
  curtain: 1.0,
  curtainImage: 1.4,
  /** Gap between split lines (s) */
  lineStagger: 0.1,
  /** Element counts as entered when its top passes 85 % of the viewport */
  start: "top 85%",
  /** Parallax travel in % of the image height (image is 25 % taller than its frame) */
  parallax: 10,
  /** Lenis smooth scroll — 0.1 felt heavy (too much glide), 0.2 follows the wheel closely */
  lerp: 0.2,
} as const;
