type IconType = "competitions" | "travel" | "concerts" | "sheetMusic";

const icons: Record<IconType, React.ReactNode> = {
  competitions: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 shrink-0">
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
    </svg>
  ),
  travel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  concerts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <path d="M9 18V5l12-2v13M9 9l12-2M9 14l12-2" />
    </svg>
  ),
  sheetMusic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-6">
      <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20M8 7h8M8 11h6M8 15h4" />
    </svg>
  ),
};

export default function ImpactIcon({ type, className }: { type: IconType; className?: string }) {
  return (
    <span className={className ?? "inline-flex text-[var(--primary-gold)]"} aria-hidden>
      {icons[type]}
    </span>
  );
}
