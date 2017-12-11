var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
const clean = require("gulp-clean");

gulp.task('clean', function () {
  return gulp.src("app/*", {read: false})
    .pipe(clean());
});

gulp.task('html', function(){
  return gulp.src('dev/html/*.html')
    .pipe(gulp.dest('app'))
});

gulp.task('sass', function () {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
});

gulp.task('js', function () {
  return gulp.src('dev/js/*.js')
    .pipe(gulp.dest('app/js'));
});

gulp.task('fonts', function () {
    return gulp.src('dev/fonts/*.*')
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('typescript', function () {
  return gulp.src(['dev/ts/ResultLog.ts', 'dev/ts/*.ts'])
    .pipe(ts({
      noImplicitAny: true,
      removeComments: true,
      target: "ES6",
      module: 'system',
      out: "main.js"
    }))
    .pipe(gulp.dest('app/js'));
});

gulp.task('default', [ 'html', 'sass', 'typescript' ]);