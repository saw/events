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
var aliasify = require('aliasify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//replace the server transport with the client transport
aliasify = aliasify.configure({
  aliases: {
    "./transport/server.js": "./api/transport/client.js"
  },
  configDir: __dirname,
  verbose: true
});

var dependencies = [
    'react'
];

function browserifyTask (options) {
   var appBundler = browserify({
      entries: [options.src], // The entry file
      transform: [reactify, aliasify], // Convert JSX style
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

    if (options.development) {
      appBundler = watchify(appBundler);
      appBundler.on('update', rebundle);
    }

}

function cssTask(options) {
  gulp.src(options.src)
    .pipe(gulpif(options.development, sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(options.development, sourcemaps.write()))
    .pipe(gulp.dest(options.dest))
    .pipe(gulpif(options.development, notify(function() {
      console.log('you bet your sass this is dev mode');
    })))
    .pipe(notify(function() {
      console.log('sass done');
    }));
}

gulp.task('cssDev', function() {
  cssTask({
    development: true,
    src: './assets/css/styles.scss',
    dest: './public/css'
  });
});

gulp.task('cssProd', function() {
  cssTask({
    development: false,
    src: './assets/css/styles.scss',
    dest: './public/css/min'
  });
})

// Starts our development workflow
gulp.task('default',['cssDev'], function () {

  browserifyTask({
    development: true,
    src: './client-app/index.js',
    dest: './public/javascripts'
  });

  gulp.watch('./assets/**/*.scss', ['cssDev']);

});

gulp.task('prod', ['cssProd'], function() {
  browserifyTask({
    development: false,
    src: './client-app/index.js',
    dest: './public/javascripts/min'
  });
});

