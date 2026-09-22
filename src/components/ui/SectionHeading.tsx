import Reveal from "./Reveal";

/** Единый заголовок секции: надзаголовок + H2 + подзаголовок */
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  tone = "dark",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** dark — на светлом фоне, light — на тёмном фоне */
  tone?: "dark" | "light";
}) {
  const isCenter = align === "center";
  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <Reveal>
          <p className="kicker">{kicker}</p>
        </Reveal>
      )}
      <Reveal delay={80}>
        <h2
          className={`font-display mt-4 text-3xl leading-tight sm:text-4xl ${
            tone === "light" ? "text-on-navy" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={140}>
          <p
            className={`mt-4 text-base leading-relaxed ${
              tone === "light" ? "text-on-navy-soft" : "text-ink-soft"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
