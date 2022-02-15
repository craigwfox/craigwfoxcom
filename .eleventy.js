const Image = require("@11ty/eleventy-img")
const { DateTime } = require("luxon")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")

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
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL)
  })

  // ====---------------====
  // Pass Throughs
  // ====---------------====
  eleventyConfig.addPassthroughCopy("./src/css/")
  eleventyConfig.addPassthroughCopy({ "./src/fonts/": "/css/fonts" })

  // ====---------------====
  // 👀 Watchers
  // ====---------------====
  eleventyConfig.addWatchTarget("./src/_includes/css/")

  // ====---------------====
  // Other configs
  // ====---------------====
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.setUseGitIgnore(false)

  return {
    dir: {
      // ⚠️ Includes are both to input directory.
      input: "./src",
      includes: "_includes",
      output: "dist",
    },
  }
}
