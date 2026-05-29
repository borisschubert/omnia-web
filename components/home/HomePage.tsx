import type { Locale } from "@/lib/i18n/config";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import HomeEventsSection from "./HomeEventsSection";
import HomeNewsSection from "./HomeNewsSection";
import GetInvolvedSection from "./GetInvolvedSection";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <AboutSection locale={locale} />
      <HomeEventsSection locale={locale} />
      <HomeNewsSection locale={locale} />
      <GetInvolvedSection locale={locale} />
    </>
  );
}
