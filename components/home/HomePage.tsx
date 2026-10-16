import type { Locale } from "@/lib/i18n/config";
import HomeHero from "./HomeHero";
import HomeAwards from "./HomeAwards";
import HomeConcerts from "./HomeConcerts";
import HomeNews from "./HomeNews";
import HomeAbout from "./HomeAbout";
import HomeSupport from "./HomeSupport";
import HomeJoin from "./HomeJoin";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="bg-cream text-body">
      <HomeHero locale={locale} />
      <HomeAwards locale={locale} />
      <HomeConcerts locale={locale} />
      <HomeNews locale={locale} />
      <HomeAbout locale={locale} />
      <HomeSupport locale={locale} />
      <HomeJoin locale={locale} />
    </div>
  );
}
