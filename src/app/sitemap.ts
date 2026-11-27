import type { MetadataRoute } from "next";
import { products, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/how-it-works", "/about", "/faqs", "/contact"].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 }));
  return [...pages, ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 }))];
}
