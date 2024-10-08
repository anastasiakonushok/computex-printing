const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");
//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const shorthand =require("gulp-shorthand");
const  groupCssMediaQueries = require("gulp-group-css-media-queries");
const  webpCss = require("gulp-webp-css");
//css
const css = () => {
  return src(path.css.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError(),
      })
    )
    .pipe(concat("main.css"))
     .pipe(cssimport())
    // .pipe(webpCss())
    // .pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupCssMediaQueries())
    // .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
    .pipe(dest(path.scss.dest))
    .pipe(rename({suffix:".min"}))
    .pipe(csso())
    // .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
    .pipe(dest(path.scss.dest))
};

module.exports = css;
