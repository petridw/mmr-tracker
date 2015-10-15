var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

var customOpts = {
  entries: ['./src/index.js'],
  debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

b.transform(babelify);

gulp.task('js', bundle);
gulp.task('serve', serve);
gulp.task('scss', compileScss);
gulp.task('scss-dev', compileScssSourcemaps);
gulp.task('scss:watch', watchScss);

b.on('update', bundle);
b.on('log', gutil.log); //output build logs to terminal

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
  
function bundle() {
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
    script: './server/index.js',
    ext: 'html js',
    ignore: ['client/']
  });
}

gulp.task('dev', ['js', 'scss-dev', 'scss:watch', 'serve']);
gulp.task('prod', ['scss', 'serve']);
