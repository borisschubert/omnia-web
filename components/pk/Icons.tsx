/** Thin line icons of the white / black / gold design */

export function LongArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 16" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M0 8h52M45 1l7 7-7 7" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M5 19L19 5M8 5h11v11" />
    </svg>
  );
}

/** Vertical bars like a voice waveform — sits before the gold hero word */
export function SoundWave({ className = "" }: { className?: string }) {
  const bars = [
    [0, 34, 66],
    [9, 22, 78],
    [18, 6, 94],
    [27, 16, 84],
    [36, 30, 70],
    [45, 12, 88],
    [54, 26, 74],
    [63, 38, 62],
  ];
  return (
    <svg viewBox="0 0 66 100" className={className} aria-hidden>
      {bars.map(([x, y1, y2], i) => (
        <line
          key={x}
          x1={x + 1.5}
          x2={x + 1.5}
          y1={y1}
          y2={y2}
          stroke={i === 2 || i === 5 ? "var(--color-brass)" : "currentColor"}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
