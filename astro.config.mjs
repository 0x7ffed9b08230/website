import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import mdx from "@astrojs/mdx";
import { SITE_URL } from "./src/data/config.ts";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  compressHTML: true,
  integrations: [tailwind(), sitemap(), robotsTxt()],
  site: SITE_URL,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "nord",
      wrap: false,
    },
  },
  build: {
    inlineStylesheets: `never`,
  },
});
