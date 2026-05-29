import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function JoinSection({ locale }: { locale: Locale }) {
  return (
    <Section variant="emphasized" id="join">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t(locale, "section.join")}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground-muted md:text-base">
            {t(locale, "section.join.text")}
          </p>
          <div className="mt-8">
            <Button href="#" variant="secondary" className="min-h-[44px] min-w-[160px]">
              {t(locale, "button.join")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
