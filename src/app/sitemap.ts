import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Карта сайта — генерируется автоматически по адресу /sitemap.xml
 * Базовый адрес берётся из src/config/site.ts (seo.url).
 * Когда добавите отдельные страницы услуг — допишите их в массив ниже.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.seo.url;
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
