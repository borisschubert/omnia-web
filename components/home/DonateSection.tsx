import type { Locale } from "@/lib/i18n/config";
import { t } from "@/lib/i18n/strings";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function DonateSection({ locale }: { locale: Locale }) {
  return (
    <Section variant="emphasized" elevated id="donate">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {t(locale, "section.donate")}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-foreground-muted md:text-base">
            {t(locale, "section.donate.text")}
          </p>
          <div className="mt-8">
            <Button href="#" variant="primary" className="min-h-[44px] min-w-[140px]">
              {t(locale, "button.donate")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
