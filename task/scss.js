const { src, dest } = require("gulp");

const path = require("../config/path.js");
const app = require("../config/app.js");
// Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
// const autoprefixer = require('gulp-autoprefixer');
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const webpCss = require("gulp-webp-css");

// scss
const scss = () => {
  return src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError(error => ({
          title: "SCSS Compilation Error",
          message: error.relativePath 
            ? `Error in file: ${error.relativePath} at line ${error.line}, column ${error.column}`
            : `Error: ${error.message}`, // Обработка случая, когда нет информации о файле
        })),
      })
    )
    .pipe(sassGlob()) // Обрабатываем globs в SCSS
    .pipe(sass()) // Компилируем SCSS
    .on('data', (file) => {
      console.log('Processing file:', file.path);
    })
    // .pipe(webpCss()) // Опционально: включение webp в CSS
    // .pipe(autoprefixer()) // Опционально: префиксы для кросс-браузерности
    .pipe(shorthand()) // Оптимизация CSS-шорткодов
    .pipe(groupCssMediaQueries()) // Группировка медиа-запросов
    .pipe(dest(path.scss.dest)) // Сохранение без минификации
    .pipe(rename({ suffix: ".min" })) // Переименовываем файл в минифицированный
    .pipe(csso()) // Минификация CSS
    .pipe(dest(path.scss.dest)); // Финальное сохранение минифицированного файла
};

module.exports = scss;
