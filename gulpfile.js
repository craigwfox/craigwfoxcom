const gulp = require("gulp")
const terser = require("gulp-terser")

function es() {
  return gulp
    .src(
      "node_modules/simple-theme-switcher/simple-theme-switcher.js"
    )
    .pipe(terser())
    .pipe(gulp.dest("./src/js-out"))
}

exports.default = es
