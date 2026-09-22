import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import { LinkButton } from "./ui/Button";

export default function CTA() {
  const { midCta } = site;

  return (
    <section className="bg-bg-soft py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-bg-navy px-8 py-12 text-center sm:px-14 sm:py-16">
            {/* Тонкий золотой контур-акцент */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(176,146,90,0.14),transparent_70%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl text-on-navy sm:text-4xl">
                {midCta.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-on-navy-soft sm:text-lg">
                {midCta.description}
              </p>
              <div className="mt-8 flex justify-center">
                <LinkButton href={`#${site.ctaTargetId}`} variant="gold" size="lg">
                  {midCta.button}
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
