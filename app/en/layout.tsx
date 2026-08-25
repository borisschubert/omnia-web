import type { Metadata } from "next";
import Shell from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "Miešaný spevácky zbor Omnia",
  description: "Mixed choir Omnia",
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell locale="en">{children}</Shell>;
}
