import type { MetadataRoute } from "next";

import { articles, categories, siteConfig } from "@/lib/news-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/articles", "/categories", "/about", "/haiku"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    }),
  );

  const articleRoutes = articles.map((article) => ({
    url: `${siteConfig.url}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${siteConfig.url}/categories/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
