import { Html, Head, Main, NextScript } from "next/document";
import config from "@/data/config.json";

export default function Document() {
  return (
    <Html lang="en" data-theme={config.site.theme || "isomer-next"}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
