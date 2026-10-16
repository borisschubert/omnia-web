import type { Locale } from "@/lib/i18n/config";
import Header from "./Header";
import Footer from "./Footer";
import MotionRoot from "@/components/ds/MotionRoot";

export default function Shell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background" lang={locale}>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <MotionRoot />
    </div>
  );
}
