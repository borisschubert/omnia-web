import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const placeholderAchievements = [
  "achievement.placeholder1",
  "achievement.placeholder2",
  "achievement.placeholder3",
  "achievement.placeholder4",
];

export default function AchievementsSection({ locale }: { locale: Locale }) {
  return (
    <Section variant="compact" elevated id="achievements">
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t(locale, "section.achievements")}
        </h2>
        <div className="mt-6 flex flex-wrap gap-4 sm:mt-8 sm:gap-6">
          {placeholderAchievements.map((key, i) => (
            <div
              key={i}
              className="rounded-sm border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
            >
              {t(locale, key)}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
