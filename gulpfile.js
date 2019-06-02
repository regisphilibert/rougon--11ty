const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require('dart-sass');

// a task to generate the css with sass
gulp.task('css', function() {
  return gulp.src('./src/sass/main.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

/*
  Watch folders for changess
*/
gulp.task("watch", function() {
    gulp.watch('./src/sass/**/*.scss', gulp.parallel('css'));
//    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
  });
  