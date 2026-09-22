"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import Container from "./ui/Container";
import { LinkButton } from "./ui/Button";

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label={site.brand.name}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 font-display text-lg text-navy transition-colors group-hover:border-gold group-hover:text-gold">
        Ц
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-semibold tracking-[0.18em] text-navy">
          {site.brand.name}
        </span>
        <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.22em] text-ink-muted">
          {site.brand.tagline}
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокируем прокрутку страницы, когда открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        {/* Десктоп-навигация */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-ink-soft transition-colors hover:text-navy after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href={`#${site.ctaTargetId}`} variant="primary" size="md">
            {site.ctaLabel}
          </LinkButton>
        </div>

        {/* Кнопка мобильного меню */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </Container>

      {/* Мобильное меню */}
      <div
        className={`lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-300 ${
            open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Container className="py-6">
            <nav className="flex flex-col divide-y divide-line" aria-label="Мобильная навигация">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="py-3.5 text-base font-medium text-ink transition-colors hover:text-navy"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <LinkButton
              href={`#${site.ctaTargetId}`}
              variant="primary"
              size="lg"
              className="mt-6 w-full"
              onClick={close}
            >
              {site.ctaLabel}
            </LinkButton>
          </Container>
        </div>
      </div>
    </header>
  );
}
