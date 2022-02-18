const gulp = require("gulp")
const watch = require("gulp-watch")
const terser = require("gulp-terser")
const sass = require("gulp-sass")(require("sass"))

// ====---------------====
// Paths
// ====---------------====
const paths = {
  js: ".node_modules/simple-theme-switcher/simple-theme-switcher.js",
  css: "./src/sass/**/*.scss",
}

// ====---------------====
// Styles
// ====---------------====
function buildStyles() {
  return gulp
    .src("./src/sass/styles.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./src/css"))
}

// ====---------------====
// JS
// ====---------------====
function buildJs() {
  return gulp.src(path.js).pipe(terser()).pipe(gulp.dest("./src/js-out"))
}

// ====---------------====
// Watchers 👀
// ====---------------====
function watchers() {
  gulp.watch(paths.css, gulp.series("buildStyles"))
  gulp.watch(paths.js, gulp.series("buildJs"))
}

// ====---------------====
// Export tasks
// ====---------------====
exports.buildStyles = buildStyles
exports.buildJs = buildJs
exports.watchers = watchers

// ====---------------====
// Default
// ====---------------====
exports.default = gulp.series(watchers)
