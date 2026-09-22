import { site } from "@/config/site";
import Container from "./ui/Container";
import { LinkButton } from "./ui/Button";

export default function Footer() {
  return (
    <footer className="bg-bg-navy text-on-navy">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Бренд */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 font-display text-lg text-gold">
                Ц
              </span>
              <span>
                <span className="block font-display text-lg tracking-[0.18em]">
                  {site.brand.name}
                </span>
                <span className="mt-0.5 block text-[0.68rem] uppercase tracking-[0.22em] text-on-navy-soft">
                  {site.brand.tagline}
                </span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-on-navy-soft">
              {site.contacts.companyName}
              <br />
              {site.contacts.city}
            </p>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col gap-3" aria-label="Навигация в подвале">
            {site.footer.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-on-navy-soft transition-colors hover:text-on-navy"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div>
            <LinkButton href={`#${site.ctaTargetId}`} variant="gold" size="md">
              {site.ctaLabel}
            </LinkButton>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-navy pt-6 text-sm text-on-navy-soft sm:flex-row sm:items-center sm:justify-between">
          <p>{site.footer.copyright}</p>
          <p>{site.footer.rights}</p>
        </div>
      </Container>
    </footer>
  );
}
