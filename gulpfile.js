// include the required packages.
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    mocha       = require('gulp-mocha'),
    cleanCSS    = require('gulp-clean-css'),
    uglify      = require('gulp-uglify'),
    bs          = require('browser-sync').create(),
    nightwatch  = require('nightwatch'),
    rename      = require('gulp-rename');


//////////////////////////////
// Confingure our directories
//////////////////////////////
var paths = {
    styles: './public/less/imports.less',
    scriptsSource: './public/scripts/main.js',
    scriptsDest: './public/scripts/',
    css: './public/styles/',
    test: './test/test.js'
};

gulp.task('serve:test', function (callback) {
    bs.init({
        notify: false,
        port: 3000,
        open: false,
        server: { baseDir: ['public'] },
        snippetOptions: { blacklist: ['/'] },
        ui: false
    }, function() {
        callback();
    });
});

//////////////////////////////
// Styles Tasks
//////////////////////////////
gulp.task('styles', function() {
    gulp.src(paths.styles)
        .pipe(less())
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(paths.css))
})


//////////////////////////////
// Scripts Tasks
//////////////////////////////
gulp.task('scripts', function() {
    gulp.src(paths.scriptsSource)
        .pipe(uglify())
        .pipe(rename('index.js'))
        .pipe(gulp.dest(paths.scriptsDest))
})

//////////////////////////////
// Test Tasks
//////////////////////////////
gulp.task('test', ['serve:test'], function () {
    nightwatch.runner({
        config: './nightwatch.json',
        env: 'default'
    }, function (passed) {
        if (passed) {
            process.exit();
        }
        else {
            process.exit(1);
        }
    });
});


gulp.task('default', function() {
    //gulp.run('scripts', 'styles');

    gulp.watch(paths.scriptsSource, function(event) {
        gulp.run('scripts');
    })

    gulp.watch('./public/less/**', function(event) {
        gulp.run('styles');
    })
})
