var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpLoadPlugins = require('gulp-load-plugins'); 

var appSrc = 'app/',
    sassSrc = 'app/public/sass/',
    htmlSrc = 'app/public/views/',
    jsSrc = 'app/public/js/'

const $ = gulpLoadPlugins();

gulp.task('html', function() {
  gulp.src(htmlSrc + '*.ejs');
});

gulp.task('js', function() {
  gulp.src(jsSrc + '*.js');
});

gulp.task('app', function() {
  gulp.src(appSrc + '*.js');
});

gulp.task('sass', function() {
    gulp.src(sassSrc + '*.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sourcemaps.write())
        .pipe($.autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(gulp.dest(appSrc + 'public/css/'))
});

gulp.task('watch', function() {
  gulp.watch(sassSrc + '*.scss', ['sass']);
  gulp.watch(htmlSrc + '*.ejs', ['html']);
  gulp.watch(appSrc + 'app.js', ['app']);
  gulp.watch(jsSrc + '*.js', ['js']);
});

gulp.task('default', [ 'watch', 'html', 'sass', 'js', 'app' ]);
