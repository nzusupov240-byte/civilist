import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * robots.txt — генерируется автоматически по адресу /robots.txt
 * Разрешает индексацию всего сайта и указывает поисковикам путь к карте сайта.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.seo.url}/sitemap.xml`,
    host: site.seo.url,
  };
}
