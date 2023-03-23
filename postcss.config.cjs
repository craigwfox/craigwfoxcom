const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const imports = require("postcss-import")
const postcssPresetEnv = require("postcss-preset-env")

const config = {
  plugins: [
    imports,
    autoprefixer,
    cssnano,
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "media-query-ranges": true,
      },
    }),
  ],
}

module.exports = config
