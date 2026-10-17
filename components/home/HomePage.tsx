import type { Locale } from "@/lib/i18n/config";
import HomeHero from "./HomeHero";
import HomeAbout from "./HomeAbout";
import HomeNumbers from "./HomeNumbers";
import HomeAwards from "./HomeAwards";
import HomeConcerts from "./HomeConcerts";
import HomeNews from "./HomeNews";
import HomeJoin from "./HomeJoin";
import HomeSupport from "./HomeSupport";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="bg-snow text-coal">
      <HomeHero locale={locale} />
      <HomeAbout locale={locale} />
      <HomeNumbers locale={locale} />
      <HomeAwards locale={locale} />
      <HomeConcerts locale={locale} />
      <HomeNews locale={locale} />
      <HomeJoin locale={locale} />
      <HomeSupport locale={locale} />
    </div>
  );
}
