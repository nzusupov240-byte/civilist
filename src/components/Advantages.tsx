import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

export default function Advantages() {
  const { advantages } = site;

  return (
    <section
      id={advantages.id}
      className="scroll-mt-24 bg-bg-navy py-20 text-on-navy sm:py-28"
    >
      <Container>
        <SectionHeading
          kicker={advantages.kicker}
          title={advantages.title}
          tone="light"
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-navy bg-line-navy sm:grid-cols-2">
          {advantages.items.map((item, i) => (
            <Reveal key={item.number} delay={(i % 2) * 90}>
              <div className="group h-full bg-bg-navy p-8 transition-colors duration-300 hover:bg-[#132441] sm:p-10">
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl leading-none text-gold/90 sm:text-6xl">
                    {item.number}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-xl text-on-navy sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-navy-soft sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
