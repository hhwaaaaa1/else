const gulp = require("gulp");
const clean = require("gulp-clean");
const sourcemaps = require("gulp-sourcemaps");
const scss = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

const src = "./src";
const dist = "./dist";
const paths = {
  scss: src + "/styles/**/*.scss",
};

gulp.task("clean", function () {
  return gulp.src("./dist/*").pipe(clean({ force: true }));
});

/**
 * SCSS:compile
 */
var scssOptions = {
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

gulp.task("default", gulp.series(["clean", "scss:compile"]));
