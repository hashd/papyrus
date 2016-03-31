var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  del = require('del'),
  exec = require('child_process').exec;

var sassSrc = "styles/**/*.scss",
  sassDest = "styles",
  sassJsSrc = "styles/main.ts",
  appSrc = "app/**/*.ts";

var buildFiles = ['public/app.css*', 'public/app.js*'];

gulp.task('clean', function () {
  return del(buildFiles);
});

gulp.task('compile:css', function () {
  return gulp.src(sassSrc)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(sassDest));
});

gulp.task('build:js', ['compile:css'], function () {
  return exec('npm run build-app');
});

gulp.task('build', [/*'clean', */'build:js']);

gulp.task('watch', ['build'], function () {
  gulp.watch([sassSrc, appSrc, sassJsSrc], ['build']).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['build', 'watch']);
