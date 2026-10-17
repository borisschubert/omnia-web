import type { Metadata } from "next";
import { Figtree, Raleway } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["400", "500", "600"],
});

/* Display font: thin + heavy contrast (font-pk) */
const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
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
    <html lang="sk" suppressHydrationWarning className={`${figtree.variable} ${raleway.variable}`}>
      <head>
        {/* Motion start states only apply once JS is known to run (ANIMATIONS.md rule 7) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
