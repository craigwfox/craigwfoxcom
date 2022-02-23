const Image = require("@11ty/eleventy-img")
const { DateTime } = require("luxon")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")

async function imageShortcode(src, alt, sizes, cls) {
  let metadata = await Image(src, {
    widths: [25, 300, 600],
    svgShortCircuit: true,
    formats: ["avif", "webp", "jpeg", "svg"],
    outputDir: "./dist/img/",
  })

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  })
}

module.exports = function (eleventyConfig) {
  // ====---------------====
  // Plugins
  // ====---------------====
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

  // ====---------------====
  // Layout Aliases
  // ====---------------====
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk")
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk")

  // ====---------------====
  // Shortcodes
  // ====---------------====
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

  // ====---------------====
  // Filters
  // ====---------------====

  // Date formatting
  eleventyConfig.addFilter("postDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
      DateTime.DATE_FULL
    )
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", dateObj => {
    return dateObj.toISOString()
  })

  // ====---------------====
  // Pass Throughs
  // ====---------------====
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/css/fonts" })

  // Images
  eleventyConfig.addPassthroughCopy({ "./src/images/rss": "/img/rss/" })
  eleventyConfig.addPassthroughCopy({ "./src/images/twitter": "/img/twitter/" })
  eleventyConfig.addPassthroughCopy("./src/apple-touch-icon.png")
  eleventyConfig.addPassthroughCopy("./src/favicon.svg")
  eleventyConfig.addPassthroughCopy("./src/logo.svg")
  eleventyConfig.addPassthroughCopy("./src/logo.png")
  eleventyConfig.addPassthroughCopy("./src/logo-192x192.png")
  eleventyConfig.addPassthroughCopy("./src/logo-512x512.png")

  // Config
  eleventyConfig.addPassthroughCopy("./src/manifest.json")

  // ====---------------====
  // Other configs
  // ====---------------====
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)
  eleventyConfig.setUseGitIgnore(false)

  // ====---------------====
  // Markdown settings
  // ====---------------====
  let markdownIt = require("markdown-it")
  let markdownItAnchor = require("markdown-it-anchor")
  let options = {
    html: true,
    breaks: true,
    linkify: true,
  }
  let markdownLib = markdownIt(options).use(markdownItAnchor, {
    level: [2, 3],
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: `
        <span aria-hidden="true">#</span>
      `,
      placement: "before",
    }),
  })

  eleventyConfig.setLibrary("md", markdownLib)

  // ====---------------====
  // Do the eleventy thing
  // ====---------------====
  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      // ⚠️ Includes are both to input directory.
      input: "./src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  }
}
