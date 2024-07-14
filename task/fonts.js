const { src, dest } = require('gulp');
const path = require('../config/path.js');

const fonts = () => {
    return src(path.fonts.src)
        .pipe(dest(path.fonts.dest));
};

module.exports = fonts;
