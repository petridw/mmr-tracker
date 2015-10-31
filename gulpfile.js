var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var assign = require('lodash/object/assign');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

var customOpts = {
  entries: ['./src/app.js'],
  debug: true
};

var b;

gulp.task('js:watch', watchJs);
gulp.task('js:build', buildJs);
gulp.task('js:build-dev', bundleJsDev);
gulp.task('serve', serve);
gulp.task('scss:build', compileScss);
gulp.task('scss-dev', compileScssSourcemaps);
gulp.task('scss:watch', watchScss);

function compileScss() {
  gulp.src('./scss/application.scss')
    .pipe(sass({ outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./client/css'));
}

function compileScssSourcemaps() {
  gulp.src('./scss/application.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./client/css'));
}

function watchScss() {
  gulp.watch('./scss/*.scss', ['scss-dev']);
}

function watchJs() {
  var opts = assign({}, watchify.args, customOpts);
  b = watchify(browserify(opts));
  b.transform(babelify.configure({
    presets: ["react", "es2015"]
  }));
  b.on('update', bundleJsDev);
  b.on('log', gutil.log); //output build logs to terminal
}

function buildJs(done) {
  b = browserify(customOpts);
  b.transform(babelify.configure({
    presets: ["react", "es2015"]
  }));
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('./client/build'));
}
  
// no minification or sourcemaps for dev
function bundleJsDev() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('./client/build'));
}

function bundleJs() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./client/build'));
}

function serve() {
  nodemon({
    script: './index.js',
    ext: 'html js',
    ignore: ['client/']
  });
}

gulp.task('dev', ['js:watch', 'js:build-dev', 'scss-dev', 'scss:watch', 'serve']);
gulp.task('build', ['js:build', 'scss:build']);
gulp.task('build-dev', ['js:build-dev', 'scss:build']);
gulp.task('prod', ['scss:build', 'serve']);
