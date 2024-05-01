const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const gulpESLintNew = require('gulp-eslint-new');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  name: 'Wallet SDK',
  root: 'dist',
  port: 3001,
  devBaseUrl: 'http://localhost',
  paths: {
    js: './src/**/*.js',
  }
};

gulp.task('lint', function () {
  return gulp.src(config.paths.js)
    .pipe(gulpESLintNew())
    .pipe(gulpESLintNew.format())
    .pipe(gulpESLintNew.failAfterError());
});

gulp.task('build', function () {
  return browserify({ entries: './src/index.js', debug: true })
    .transform(babelify, { presets: ['@babel/preset-env', '@babel/preset-react'], sourceMaps: true })
    .bundle()
    .on('error', function (err) { log.error(err.message); this.emit('end'); })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.root))
    .pipe(connect.reload());
});

gulp.task('connect', function (done) {
  connect.server({
    name: 'wallet-sdk',
    root: config.root,
    port: config.port,
    livereload: true
  });
  require('open')(config.devBaseUrl + ':' + config.port);
  done();
});

gulp.task('default', gulp.series('build'));