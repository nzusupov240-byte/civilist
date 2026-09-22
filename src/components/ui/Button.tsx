import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold disabled:opacity-60 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variants: Record<Variant, string> = {
  // Тёмно-синяя основная кнопка
  primary:
    "bg-navy text-white shadow-[0_10px_30px_-12px_rgba(22,35,59,0.6)] hover:bg-navy-hover hover:-translate-y-0.5",
  // Золотой акцент на тёмном фоне
  gold:
    "bg-gold text-[#1a1508] hover:bg-gold-soft hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(176,146,90,0.7)]",
  // Контурная кнопка
  outline:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  // Прозрачная кнопка на тёмном фоне
  ghost:
    "border border-white/25 text-on-navy hover:bg-white hover:text-navy",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Кнопка-ссылка (для якорной навигации к секциям) */
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/** Обычная кнопка (для форм и действий) */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
