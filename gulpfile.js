//npx gulp antd-themes

const gulp = require('gulp');
const debug = require('gulp-debug');

gulp.task('antd-themes', () => {
    return gulp
        .src(['node_modules/antd/dist/antd.min.css', 'node_modules/antd/dist/antd.dark.min.css'])
        .pipe(debug({ title: 'antd-themes files:' }))
        .pipe(gulp.dest('./public/styles/antd/'));
});
