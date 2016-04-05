var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  del = require('del'),
  exec = require('child_process').exec;

var sassSrc = "styles/**/*.scss",
  sassDest = "styles",
  sassCssSrc = "styles/scss/app.scss",
  sassJsSrc = "styles/main.ts",
  appSrc = "app/**/*.ts",
  publicDir = "public";

var fontDirs = [
  'jspm_packages*/github/twbs/bootstrap*/fonts/*',
  'jspm_packages*/npm/font-awesome*/fonts/*'
];

var buildFiles = ['public/app.css*', 'public/app.js*', 'public/jspm_packages'];

gulp.task('clean', function () {
  return del(buildFiles);
});

gulp.task('copy:fonts', function () {
  return gulp.src(fontDirs)
    .pipe(gulp.dest(publicDir));
});

gulp.task('compile:css', function () {
  return gulp.src(sassCssSrc)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(sassDest));
});

gulp.task('build:js', ['compile:css'], function () {
  return exec('npm run build-app');
});

gulp.task('build', ['clean', 'copy:fonts', 'build:js']);

gulp.task('watch', ['build'], function () {
  gulp.watch([sassSrc, appSrc, sassJsSrc], ['build:js']).on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['build', 'watch']);
