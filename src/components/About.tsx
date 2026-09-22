import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

// Иконки-штрихи для преимуществ (тонкие, без лишнего декора)
const icons = [
  // Индивидуальный подход
  <path key="i1" d="M12 13a4 4 0 100-8 4 4 0 000 8zM5 20a7 7 0 0114 0" />,
  // Комплексное сопровождение
  <path key="i2" d="M4 7h16M4 12h16M4 17h10" />,
  // Конфиденциальность
  <path
    key="i3"
    d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
  />,
];

export default function About() {
  const { about } = site;

  return (
    <section id={about.id} className="scroll-mt-24 bg-bg py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Визуальный блок */}
          <Reveal className="order-last lg:order-first">
            <div className="relative overflow-hidden rounded-2xl bg-bg-soft p-8 ring-1 ring-line sm:p-10">
              <div className="grid gap-5">
                {about.highlights.map((text, i) => (
                  <div
                    key={text}
                    className="flex items-center gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_10px_30px_-24px_rgba(15,27,48,0.6)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                        aria-hidden
                      >
                        {icons[i]}
                      </svg>
                    </span>
                    <span className="font-medium text-ink">{text}</span>
                  </div>
                ))}
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl"
              />
            </div>
          </Reveal>

          {/* Текст */}
          <div className="flex flex-col justify-center">
            <SectionHeading kicker={about.kicker} title={about.title} />
            <div className="mt-6 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={120 + i * 80}>
                  <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
