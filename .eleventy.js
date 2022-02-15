const Image = require("@11ty/eleventy-img")
const { clientScript } = require("browser-sync/dist/connect-utils")

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
  return Image.generateHTML(metadata, imageAttributes)
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)
  eleventyConfig.addWatchTarget("./src/_includes/css/")
  eleventyConfig.addPassthroughCopy("./src/css/")
  eleventyConfig.setUseGitIgnore(false)

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input: "./src",
      includes: "_includes",
      output: "dist",
    },
  }
}
