var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
// var minifyJS = require('gulp-uglify');
var minifyJS = require('gulp-babel-minify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var fs = require('fs');
var fileinclude = require('gulp-file-include');

//Read package.json file
let pkg = JSON.parse(fs.readFileSync('./package.json'));

//Create a docs folder
gulp.task('docs', function () {
    return gulp.src('index.html')
    .pipe(gulp.dest('docs/'));
});

// Clean the docs folder
gulp.task('clean', function () {
    return gulp.src(['docs'], { read: false })
      .pipe(clean());
});

//Insert all html files into index.html and copy to docs folder
gulp.task('index_include', function() {
    return gulp.src(['index.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('docs/'));
});

//Insert all html files into about.html and copy to docs folder
gulp.task('doc_include', function() {
    return gulp.src(['src/doc/about.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('docs'));
});

//Copy asset folder to docs folder
gulp.task('asset_copy', function() {
    return gulp.src(['src/assets/**'])
    .pipe(gulp.dest('docs/assets'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('styles_sass', function() {
    return gulp.src(['src/scss/**/*.scss'])
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest("docs/css"))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into /docs/js folder
gulp.task('store_js', function() {
    return gulp.src(['src/js/**/*.js'])
    .pipe(concat('store.js'))
    .pipe(gulp.dest("docs/js"))
    .pipe(minifyJS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest("docs/js"))
    .pipe(browserSync.stream());
});

// Zip the files into /docs/downloads folder
gulp.task('zip', function() {
    return gulp.src(['docs/**/*'])
    .pipe(zip(`ShoppingCart.docs.v${pkg.version}.zip`))
    .pipe(gulp.dest('docs/downloads'))
});

// Static Server + watching scss/js/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "docs",
        port: 5000
    });

    gulp.watch(['src/scss/*.scss'], gulp.parallel['styles_sass']);
    gulp.watch(['src/js/**/*.js'], gulp.parallel['store_js']);
    gulp.watch("docs/*.html").on('change', browserSync.reload);
});

//Build
gulp.task('build', gulp.parallel('asset_copy', 'index_include', 'doc_include', 'styles_sass', 'store_js'))

//Default  
gulp.task('prod', gulp.series('docs', 'clean', 'build', 'zip'));

//Default  
gulp.task('default', gulp.series('docs', 'clean', 'build', 'zip', 'serve'));