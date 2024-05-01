const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('gulplog');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

const config = {
  name: 'Wallet Connector Extention',
  root: 'dist',
  paths: {
    js: './src/**/*.js',
  }
};

gulp.task('build', function () {
  return browserify({ entries: './src/index.js', debug: true })
    .transform(babelify, { presets: ['@babel/preset-env', '@babel/preset-react'], sourceMaps: true })
    .bundle()
    .on('error', function (err) { log.error(err.message); this.emit('end'); })
    .pipe(source('wallet-connector-extention.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest(config.root))
    .pipe(connect.reload());
});

gulp.task('default', gulp.series('build'));