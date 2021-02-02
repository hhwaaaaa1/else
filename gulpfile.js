const gulp = require("gulp");
const clean = require("gulp-clean");
const pug = require("gulp-pug");
const sourcemaps = require("gulp-sourcemaps");
const scss = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const browserSync = require("browser-sync").create();

const src = "./src";
const dist = "./dist";
const paths = {
  pug: `${src}/views/**/*.pug`,
  scss: `${src}/styles/**/*.scss`,
};

/**
 * Pug:compile
 */
const pugOptions = {
  pretty: true,
};
gulp.task("pug:compile", function () {
  return gulp
    .src(paths.pug)
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(`${dist}/html`))
    .pipe(browserSync.reload({ stream: true }));
});

/**
 * SCSS:compile
 */
const scssOptions = {
  outputStyle: "expanded",
  indentType: "tab",
  indentWidth: 1,
  precision: 6,
};
gulp.task("scss:compile", function () {
  return gulp
    .src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(scss(scssOptions).on("error", scss.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${dist}/css`));
});

gulp.task("clean", function () {
  return gulp.src(`${dist}/*`).pipe(clean({ force: true }));
});

gulp.task("server", function () {
  browserSync.init({
    server: `${dist}/html`,
    directory: true,
    port: 3001,
    open: true,
    tunnel: true,
  });

  gulp.watch(paths.pug, gulp.series(["clean", "pug:compile"]));
  gulp.watch(paths.scss, gulp.series(["clean", "scss:compile"]));
});

gulp.task("default", gulp.series(["server"]));
