import type { Metadata } from "next";
import { Manrope, Spectral } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";

// Основной текст — современный гротеск с поддержкой кириллицы
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Заголовки — благородная антиква с поддержкой кириллицы
const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    "юридическая компания",
    "юрист Бишкек",
    "юридические услуги",
    "юридическая консультация",
    "Цивилист",
    "гражданское право",
    "договорное право",
    "юридическое сопровождение бизнеса",
  ],
  authors: [{ name: site.brand.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: site.seo.url,
    siteName: `${site.brand.name} — ${site.brand.tagline}`,
    title: site.seo.title,
    description: site.seo.description,
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: site.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${spectral.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">{children}</body>
    </html>
  );
}
