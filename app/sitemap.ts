import { getSitemapXml } from "@isomerpages/isomer-components";
import type { MetadataRoute } from "next";
import sitemapJson from "@/sitemap.json";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapXml(sitemapJson);
}
