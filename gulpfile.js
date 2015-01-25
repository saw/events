'use strict';
var browserify = require('browserify');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var watchify = require('watchify');
var reactify = require('reactify');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var livereload = require('gulp-livereload');

var dependencies = [
    'react'
];

function browserifyTask (options) {
   var appBundler = browserify({
      entries: [options.src], // The entry file
      transform: [reactify], // Convert JSX style
      debug: options.development, // Sourcemapping
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });


   function rebundle() {
      var start = Date.now();
      console.log('Building APP bundle');
      appBundler.bundle()
         .on('error', gutil.log)
         .pipe(source('main.js'))
         .pipe(gulpif(!options.development, streamify(uglify())))
         .pipe(gulp.dest(options.dest))
         .pipe(gulpif(options.development, livereload())) // It notifies livereload about a change if you use it
         .pipe(notify(function () {
           console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
         }));
   };

    rebundle();

}

// Starts our development workflow
gulp.task('default', function () {

  browserifyTask({
    development: true,
    src: './client-app/index.js',
    dest: './public/javascripts'
  });

  // cssTask({
  //   development: true,
  //   src: './styles/**/*.css',
  //   dest: './build'
  // });

});

