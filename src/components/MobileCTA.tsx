"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

/**
 * Фиксированная нижняя кнопка «Получить консультацию» для телефонов.
 * Появляется после прокрутки и прячется, когда пользователь уже
 * находится на форме заявки (чтобы не перекрывать её).
 */
export default function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById(site.ctaTargetId);

    const onScroll = () => {
      const scrolledEnough = window.scrollY > 500;

      // Скрываем кнопку, когда форма заявки видна на экране
      let formVisible = false;
      if (form) {
        const rect = form.getBoundingClientRect();
        formVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setShow(scrolledEnough && !formVisible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href={`#${site.ctaTargetId}`}
        className="flex w-full items-center justify-center rounded-full bg-navy px-6 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-12px_rgba(15,27,48,0.7)] transition-colors hover:bg-navy-hover"
      >
        {site.ctaLabel}
      </a>
    </div>
  );
}
