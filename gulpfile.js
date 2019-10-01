"use strict";

const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    srcPath = './src',
    buildPath = './build',
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    svgstore = require('gulp-svgstore'),
    posthtml = require('gulp-posthtml'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    include = require('posthtml-include');

function gulpSass() {
  return gulp.src(`${srcPath}/sass/style.scss`)
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(gulp.dest(`${buildPath}/css`))
    .pipe(browserSync.stream());
};

function sprite() {
  return gulp.src(`${srcPath}/img/*.svg`)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest(`${srcPath}/img`))
}

function server() {
  browserSync.init({
    server: {
      baseDir: buildPath
    }
  });

  // gulp.watch(`${srcPath}/*.html`, browserReload);
  gulp.watch(`${buildPath}/*.html`, browserReload);
  gulp.watch(`${srcPath}/sass/**/*.{sass,scss}`,gulpSass)
}

function browserReload(done) {
  browserSync.reload();
  done();
}

// Таски для билда
// очистить папку build
function clean() {
  return del("build")
}

function minifyCSS() {
  return gulp.src(`src/css/style.css`)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'))
}

function html() {
  return gulp.src(`${srcPath}/*.html`)
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
}



// копировать шрифты и спрайт
function copy() {
  return gulp.src([
    `${srcPath}/fonts/**/*`,
    `${srcPath}/img/sprite.svg`,
    `${srcPath}/script/*.js`
  ], {
    base: "src"
  })
    .pipe(gulp.dest("build"))
}

exports.sprite = sprite;
exports.default = gulp.series(clean,copy, gulpSass, copy, html,  server);
exports.build = gulp.series(clean, copy, html, gulpSass, minifyCSS);