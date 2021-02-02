const gulp = require("gulp");
const clean = require("gulp-clean");
const pug = require("gulp-pug");
const sourcemaps = require("gulp-sourcemaps");
const scss = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

const src = "./src";
const dist = "./dist";
const paths = {
  pug: src + "/views/**/*.pug",
  scss: src + "/styles/**/*.scss",
};

gulp.task("clean", function () {
  return gulp.src("./dist/*").pipe(clean({ force: true }));
});

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
    .pipe(gulp.dest(dist + "/html"));
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
    .pipe(gulp.dest(dist + "/css"));
});

gulp.task("default", gulp.series(["clean", "pug:compile", "scss:compile"]));
