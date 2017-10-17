var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var connect = require('gulp-connect');
gulp.task('sass', function() {
  gulp.src('css/style.scss')
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets'))
});
gulp.task('copy', function() {
  gulp.src('index.html')
.pipe(gulp.dest('assets'))
});
gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('js', function() {
  gulp.src('js/*.js')
  .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('assets'))
});
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['js']);
  gulp.watch('css/style.scss', ['sass']);
});
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});
gulp.task('html', function() {
  gulp.src('.')
  .pipe(connect.reload())
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);
