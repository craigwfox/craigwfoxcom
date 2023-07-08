const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const imports = require("postcss-import")
const postcssPresetEnv = require("postcss-preset-env")


const config = {
  plugins: [
    imports,
    cssnano,
    postcssPresetEnv({
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
        "color-function": true,
        "color-functional-notation": true,
        "color-mix": true,
        "oklab-function": true,
      },
    }),
    autoprefixer,
  ],
}

module.exports = config
