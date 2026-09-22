import { site } from "@/config/site";
import Container from "./ui/Container";
import { LinkButton } from "./ui/Button";
import ArchArt from "./ui/ArchArt";
import Reveal from "./ui/Reveal";

export default function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative overflow-hidden bg-bg pt-14 sm:pt-20">
      {/* Мягкий фоновый акцент */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_100%_0%,rgba(22,35,59,0.05),transparent_60%)]"
      />
      <Container>
        <div className="grid items-center gap-10 pb-16 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Текстовая колонка */}
          <div>
            <Reveal>
              <p className="kicker">{hero.eyebrow}</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display mt-5 text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg font-medium text-ink">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                {hero.description}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                <LinkButton href={`#${site.ctaTargetId}`} variant="primary" size="lg">
                  {hero.primaryCta}
                </LinkButton>
                <LinkButton href={`#${site.services.id}`} variant="outline" size="lg">
                  {hero.secondaryCta}
                </LinkButton>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="mt-10 flex items-center gap-3 text-sm text-ink-muted">
                <span className="rule-gold" aria-hidden />
                <span>{hero.trust}</span>
              </div>
            </Reveal>
          </div>

          {/* Визуальная колонка */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto aspect-[5/6] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(15,27,48,0.55)] ring-1 ring-navy/10 lg:max-w-none">
              <ArchArt className="h-full w-full" />
            </div>
            {/* Плашка доверия поверх изображения */}
            <div className="absolute -bottom-5 left-1/2 w-[86%] max-w-xs -translate-x-1/2 rounded-xl border border-line bg-white/95 p-4 shadow-xl backdrop-blur sm:left-6 sm:translate-x-0">
              <p className="font-display text-2xl text-navy">Цивилист</p>
              <p className="mt-1 text-sm text-ink-soft">
                Юридическое сопровождение бизнеса и частных лиц
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
