// Dependencies
// -------------------------
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var del    = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var browserify = require('browserify');


var bases = {
    src: './src/',
    build: './build/'
};

var paths = {
    html: ['index.html'],
    images: ['data/images/**/*'],
    script: ['js/main.js'],
    styles: ['css/**/*.css'],
    extras: ['favicon.ico']
};


// Tasks
// -------------------------

gulp.task('jshint', function() {
    gulp.src(bases.src + 'js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Delete the build directory
gulp.task('clean', function() {
    return del([bases.build]);
});


// Build tasks
gulp.task('browserify', function() {
    var b = browserify(bases.src + paths.script, {
        debug: true
    });
    return b.bundle()
        .pipe(source('app.browserified.js'))
        .pipe(gulp.dest(bases.build + 'js/'));
});

gulp.task('uglify', ['browserify'], function() {
    return gulp.src(bases.build + 'js/app.browserified.js')
        // .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(bases.build + 'js/'));
});


// Copy all other files to build/ directly
gulp.task('copy', ['uglify'], function() {
    // Copy html
    gulp.src(paths.html, { cwd: bases.src })
        .pipe(gulp.dest(bases.build));

    // Copy styles
    gulp.src(paths.styles, { cwd: bases.src })
        .pipe(gulp.dest(bases.build + 'css/'));

    // Copy data
    gulp.src(paths.images, { cwd: bases.src })
        .pipe(gulp.dest(bases.build + 'data/images'));

    // Copy extras
    gulp.src(paths.extras, { cwd: bases.src })
        .pipe(gulp.dest(bases.build));
});


// Commands
// -------------------------

// A development task to run anytime a file changes
gulp.task('watch', function() {
    gulp.watch(bases.src + '**/*', ['copy']);
});

gulp.task('build', ['clean', 'copy']);

// Define the default task as a sequence of the above tasks
gulp.task('default', ['build']);
