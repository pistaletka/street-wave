import type { MetadataRoute } from "next";
import casesIndex from "../content/cases/index.json";
import products from "../content/products/index.json";

const BASE_URL = "https://street-wave.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* Static pages */
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/place-order`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/live-customization`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/art`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contacts`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  /* Dynamic: project & event case pages */
  const casePages: MetadataRoute.Sitemap = casesIndex.cases.map((c) => {
    const prefix = c.category === "event" ? "live-customization" : "projects";
    return {
      url: `${BASE_URL}/${prefix}/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  /* Dynamic: product pages */
  const productPages: MetadataRoute.Sitemap = (products as { slug: string }[]).map((p) => ({
    url: `${BASE_URL}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...casePages, ...productPages];
}
