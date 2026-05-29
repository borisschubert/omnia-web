import type { Metadata } from "next";
import Shell from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "Zmiešaný spevácky zbor Omnia",
  description: "Mixed choir Omnia",
};

export default function SkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell locale="sk">{children}</Shell>;
}
