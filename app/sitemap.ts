import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { boroughs } from "@/lib/boroughs";
import { technologies } from "@/lib/technology";
import { comboPages } from "@/lib/comboPages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/service-areas`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/technology`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/non-healing-wounds`, lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: `${site.url}/is-my-wound-infected`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${site.url}/for-referrers`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const boroughPages: MetadataRoute.Sitemap = boroughs.map((b) => ({
    url: `${site.url}/service-areas/${b.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const techPages: MetadataRoute.Sitemap = technologies.map((t) => ({
    url: `${site.url}/technology/${t.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comboEntries: MetadataRoute.Sitemap = comboPages.map((c) => ({
    url: `${site.url}/services/${c.serviceSlug}/${c.boroughSlug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...boroughPages,
    ...techPages,
    ...comboEntries,
  ];
}
