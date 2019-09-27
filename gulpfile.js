const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    srcPath = './src',
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss');

function gulpSass() {
  return gulp.src(`${srcPath}/sass/style.scss`)
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest(`${srcPath}/css`))
    .pipe(browserSync.stream());
};

function server() {
  browserSync.init({
    server: {
      baseDir: srcPath
    }
  });

  gulp.watch(`${srcPath}/*.html`, browserReload);
  gulp.watch(`${srcPath}/sass/**/*.{sass,scss}`,gulpSass)
}

function browserReload(done) {
  browserSync.reload();
  done();
}

exports.default = gulp.series(gulpSass, server);