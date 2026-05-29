export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border border-border bg-background p-5 ${className}`}
    >
      {children}
    </div>
  );
}
