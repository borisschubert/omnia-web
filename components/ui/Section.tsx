export default function Section({
  children,
  className = "",
  elevated = false,
  id,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  id?: string;
  variant?: "default" | "emphasized" | "compact";
}) {
  const padding =
    variant === "emphasized"
      ? "py-16 md:py-20"
      : variant === "compact"
        ? "py-10 md:py-12"
        : "py-12 md:py-16";

  return (
    <section
      id={id}
      className={`${padding} ${elevated ? "bg-[var(--background-elevated)]" : ""} ${className}`}
      style={elevated ? { backgroundColor: "var(--background-elevated)" } : undefined}
    >
      {children}
    </section>
  );
}
