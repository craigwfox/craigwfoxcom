import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import netlify from "@astrojs/netlify/functions";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://craigwfox.com",
  markdown: {
    syntaxHighlight: "prism"
  },
  integrations: [mdx(), sitemap(), svelte(), image()],
  output: "server",
  adapter: netlify()
});