import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout", "/payment/"],
      },
    ],
    sitemap: "https://streetwave-site.vercel.app/sitemap.xml",
  };
}
