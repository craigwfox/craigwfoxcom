var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var rename      = require("gulp-rename");
var uglify      = require('gulp-uglify');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
  * Rebuild Jekyll & do page reload
*/
  gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
      browserSync.reload();
  });


/**
  * Wait for jekyll-build, then launch the Server
*/
  gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
      server: {
        baseDir: '_site'
      }
    });
  });


/**
  * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
  gulp.task('sass', function () {
      return gulp.src('./src/sass/screen.scss')
          .pipe(sass({
              includePaths: ['scss'],
              outputStyle: 'compressed',
              onError: browserSync.notify
          }))
          .pipe(prefix(['last 25 versions'], { cascade: true }))
          .pipe(gulp.dest('./assets/css'))
          .pipe(browserSync.reload({stream:true}))
          .pipe(gulp.dest('./assets/css'))
          .pipe(gulp.dest('./_site/assets/css'));
  });


/**
  * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
*/
  gulp.task('jsMain', function() {
    return gulp.src('./src/js/main/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify({
        onError: browserSync.notify
      }))
      .pipe(browserSync.reload({stream:true}))
      .pipe(gulp.dest('./assets/js'))
      .pipe(gulp.dest('./_site/assets/js'))
  });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/main/*.js', ['jsMain']);
    gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', '_posts/**/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);