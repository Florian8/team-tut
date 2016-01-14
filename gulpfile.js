// Include gulp
const gulp = require('gulp'); 

// Include Our Plugins
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const nunjucksRender = require('gulp-nunjucks-render');
/* Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});*/

// Compile Our Sass
gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css/'));
});

//Run a webserver
gulp.task('connect', function() {
	connect.server({
		port:8880,
		livereload: true
	});	
});

gulp.task('html', ['nunjucks'], function() {
	gulp.src('./*.html')
	.pipe(connect.reload());
});

gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['./templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('./pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('./'))
});


// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('./**/*.nunjucks', ['html']);
	gulp.watch('./**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', [ 'connect','nunjucks', 'sass', 'watch']);