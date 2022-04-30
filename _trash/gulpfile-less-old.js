//https://jfelix.info/blog/dynamic-themes-in-ant-design-how-to-change-between-light-and-dark-theme
//npx gulp less

const gulp = require('gulp');
const gulpLess = require('gulp-less');
const postcss = require('gulp-postcss');
const debug = require('gulp-debug');
const csso = require('gulp-csso');
const autoprefixer = require('autoprefixer');
const NpmImportPlugin = require('less-plugin-npm-import');

gulp.task('antd-themes', function () {
    const plugins = [autoprefixer()];

    return gulp
        .src('src/styles/antd-themes/*-theme.less')
        .pipe(debug({ title: 'Less files:' }))
        .pipe(
            gulpLess({
                javascriptEnabled: true,
                plugins: [new NpmImportPlugin({ prefix: '~' })]
            })
        )
        .pipe(postcss(plugins))
        .pipe(
            csso({
                debug: true
            })
        )
        .pipe(gulp.dest('./public/styles/antd-themes'));
});
