import { IsomerPageSchema, RenderEngine } from "@isomerpages/isomer-components";
import config from "@/data/config.json";
import navbar from "@/data/navbar.json";
import footer from "@/data/footer.json";
import sitemap from "@/public/sitemap.json";
import Head from "next/head";
import Link from "next/link";

import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";

function extractPermalinks(sitemap: any) {
  let result: any = [];

  function traverse(node: any, path = []) {
    if (node.permalink) {
      // Adding the current node's permalink to the path array
      const newPath = path.concat(node.permalink.replace(/^\//, "").split("/"));
      // Only add to the result if there are actual path segments
      if (newPath.length > 0) {
        result.push({
          params: {
            permalink: newPath,
          },
        });
      }
    }
    // If the current node has children ('paths'), recurse on each child
    if (node.paths && node.paths.length > 0) {
      node.paths.forEach((child: any) => traverse(child, path));
    }
  }

  // Start traversing from the root
  traverse(sitemap);
  return result;
}

export const getStaticPaths = (async () => {
  return {
    paths: extractPermalinks(sitemap),
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const permalink = context.params?.permalink;

  if (permalink && permalink.length > 0 && typeof permalink !== "string") {
    const joinedPermalink = permalink.join("/");

    const schema = (await import(`@/schema/${joinedPermalink}.json`).then(
      (module) => module.default
    )) as IsomerPageSchema;

    return { props: { schema } };
  }

  const schema = (await import(`@/schema/index.json`).then(
    (module) => module.default
  )) as IsomerPageSchema;
  return { props: { schema } };
}) satisfies GetStaticProps<{
  schema: IsomerPageSchema;
}>;

export default function Page({
  schema,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const renderSchema = schema;
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
          siteMap: [],
          navBarItems: navbar,
          // @ts-expect-error blah
          footerItems: footer,
          lastUpdated,
        }}
        layout={renderSchema.layout}
        page={{
          ...renderSchema.page,
          tableOfContents: {
            items: [],
          },
        }}
        content={renderSchema.content}
        LinkComponent={Link}
        HeadComponent={Head}
      />
    </>
  );
}
