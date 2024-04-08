import { RenderEngine } from "@isomerpages/isomer-components";
import config from "@/data/config.json";
import navbar from "@/data/navbar.json";
import footer from "@/data/footer.json";
import sitemap from "@/public/sitemap.json";
import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  const timeNow = new Date();
  const lastUpdated =
    timeNow.getDate().toString().padStart(2, "0") +
    " " +
    timeNow.toLocaleString("default", { month: "short" }) +
    " " +
    timeNow.getFullYear();

  return (
    <>
      <RenderEngine
        site={{
          ...config.site,
          environment: process.env.NEXT_PUBLIC_ISOMER_NEXT_ENVIRONMENT,
          siteMap: sitemap,
          navBarItems: navbar,
          // @ts-expect-error blah
          footerItems: footer,
          lastUpdated,
        }}
        layout="notfound"
        page={{
          title: "404: Page not found",
          permalink: "/404.html",
        }}
        content={[]}
        LinkComponent={Link}
        HeadComponent={Head}
      />
    </>
  );
}
