import sitemapJson from "@/sitemap.json";
import { getSitemapXml } from "@isomerpages/isomer-components";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapXml(sitemapJson);
}
