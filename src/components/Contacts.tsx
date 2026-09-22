import { site } from "@/config/site";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { LinkButton } from "./ui/Button";

// Иконки каналов связи
const PhoneIcon = (
  <path d="M4 5c0-.6.4-1 1-1h2.3c.5 0 .9.3 1 .8l.7 2.8c.1.4 0 .8-.3 1.1L7.3 10a12 12 0 006.7 6.7l1.3-1.4c.3-.3.7-.4 1.1-.3l2.8.7c.5.1.8.5.8 1V19c0 .6-.4 1-1 1A15 15 0 014 5z" />
);
const ChatIcon = <path d="M4 5h16v10H8l-4 4V5z" />;
const MailIcon = (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </>
);
const PinIcon = (
  <>
    <path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);

type Item = {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
};

function buildItems(): Item[] {
  const c = site.contacts;
  const items: Item[] = [];

  if (c.phone) {
    items.push({
      label: "Телефон",
      value: c.phone,
      href: `tel:${c.phone.replace(/[^\d+]/g, "")}`,
      icon: PhoneIcon,
    });
  }
  if (c.whatsapp) {
    const isUrl = /^https?:\/\//.test(c.whatsapp);
    const digits = c.whatsapp.replace(/\D/g, "");
    items.push({
      label: "WhatsApp",
      value: c.whatsapp,
      href: isUrl ? c.whatsapp : `https://wa.me/${digits}`,
      icon: ChatIcon,
    });
  }
  if (c.email) {
    items.push({
      label: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
      icon: MailIcon,
    });
  }
  if (c.address) {
    items.push({ label: "Адрес", value: c.address, icon: PinIcon });
  }
  return items;
}

export default function Contacts() {
  const c = site.contacts;
  const items = buildItems();

  return (
    <section id={c.id} className="scroll-mt-24 bg-bg-soft py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading kicker={c.kicker} title={c.title} />
            <Reveal delay={140}>
              <p className="font-display mt-6 text-xl text-ink">{c.companyName}</p>
              <p className="mt-1 text-ink-soft">{c.city}</p>
            </Reveal>
            <Reveal delay={220}>
              <LinkButton
                href={`#${site.ctaTargetId}`}
                variant="primary"
                size="lg"
                className="mt-8"
              >
                {site.ctaLabel}
              </LinkButton>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {items.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item) => {
                  const inner = (
                    <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-40px_rgba(15,27,48,0.6)]">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {item.icon}
                        </svg>
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-ink-muted">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words font-medium text-ink">
                          {item.value}
                        </span>
                      </span>
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={item.label}>{inner}</div>
                  );
                })}
              </div>
            ) : (
              // Контакты ещё не заполнены в src/config/site.ts
              <div className="rounded-2xl border border-dashed border-line bg-white p-8 text-center">
                <p className="text-ink-soft">
                  Оставьте заявку через форму выше — мы свяжемся с вами удобным
                  способом.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
