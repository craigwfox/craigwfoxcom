import { defineConfig, sharpImageService } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import svelte from "@astrojs/svelte"

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://craigwfox.com",
  markdown: {
    syntaxHighlight: "prism",
  },
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        "https://craigwfox.com/",
        "https://craigwfox.com/about/",
        "https://craigwfox.com/uses/",
        "https://craigwfox.com/blog/",
        "https://craigwfox.com/blog/2023-01/css-auto-grid-columns/",
        "https://craigwfox.com/blog/2022-11/using-aspect-ratio/",
        "https://craigwfox.com/blog/2022-08/where-is-and-has/",
        "https://craigwfox.com/blog/2022-05/fluid-type-and-sizing/",
        "https://craigwfox.com/blog/2022-03/theme-toggle-web-component/",
        "https://craigwfox.com/blog/2022-02/responsive-video-embeds/",
        "https://craigwfox.com/blog/2021-11/methods-for-equal-height-columns/",
        "https://craigwfox.com/blog/2021-11/versions-of-craigwfox-com/",
      ],
    }),
    svelte(),
  ],
})
