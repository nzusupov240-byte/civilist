import type { ReactNode } from "react";

/**
 * Центрированный контейнер с боковыми отступами (в т.ч. 16px на телефонах).
 * Ограничивает ширину контента для аккуратной типографики.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
