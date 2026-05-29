import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  href,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-[0.9375rem] font-medium transition-colors";
  const primary =
    "bg-accent text-foreground hover:opacity-90";
  const secondary =
    "border border-border text-foreground hover:border-accent hover:text-accent";

  const styles = `${base} ${variant === "primary" ? primary : secondary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }
  return <button type="button" className={styles}>{children}</button>;
}
