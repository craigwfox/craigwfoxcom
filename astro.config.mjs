import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"

import vue from "@astrojs/vue"
import * as compiler from "vue/compiler-sfc"

// https://astro.build/config
export default defineConfig({
  site: "https://craigwfox.com",
  markdown: { syntaxHighlight: "prism" },
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        page !==
        "https://craigwfox.com/blog/2025-11/storybook-with-web-components/",
    }),
    vue({ compiler }),
  ],
})
