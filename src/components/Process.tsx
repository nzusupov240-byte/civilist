import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Process() {
  const { process } = site;

  return (
    <section id={process.id} className="scroll-mt-24 bg-bg py-20 sm:py-28">
      <Container>
        <SectionHeading kicker={process.kicker} title={process.title} />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 90}>
              <div className="relative h-full">
                {/* Соединительная линия между этапами (десктоп) */}
                {i < process.steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-14 top-6 hidden h-px w-[calc(100%-2.5rem)] bg-line lg:block"
                  />
                )}
                <div className="flex flex-col">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-white font-display text-lg text-navy">
                    {step.number}
                  </span>
                  <h3 className="font-display mt-5 text-lg text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
