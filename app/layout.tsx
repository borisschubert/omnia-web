import type { Metadata } from "next";
import { Figtree, Urbanist } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600"],
});

const urbanist = Urbanist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Miešaný spevácky zbor Omnia",
  description: "Mixed choir Omnia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning className={`${figtree.variable} ${urbanist.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
