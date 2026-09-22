import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Services() {
  const { services } = site;

  return (
    <section id={services.id} className="scroll-mt-24 bg-bg-soft py-20 sm:py-28">
      <Container>
        <SectionHeading
          kicker={services.kicker}
          title={services.title}
          subtitle={services.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 90}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_30px_60px_-40px_rgba(15,27,48,0.55)]">
                {/* Верхняя золотая линия при наведении */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full"
                />
                <span className="font-display text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
