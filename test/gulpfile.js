var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
var cache = require('gulp-cached');
var compilerOptions = {
  moduleIds: true,
  comments: true,
  compact: false
};

/**
 * Compila y levanta browserSync
 */
gulp.task('serve', function (done) {
  return browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['html'],
      routes: {
        '/':'html',
        '/node_modules':'node_modules'
      },
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
