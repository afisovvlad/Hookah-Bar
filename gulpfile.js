'use strict';

const less = require('gulp-less');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const {series} = require("gulp");
const uglify = require('gulp-uglify');
const refresh = require('gulp-refresh');
function buildFiles(done) {
    gulp.src('./node_modules/animate.css/animate.min.css')
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./node_modules/jquery-ui/dist/themes/base/jquery-ui.min.css')
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/jquery-ui/dist/jquery-ui.min.js')
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./node_modules/jquery.maskedinput/src/jquery.maskedinput.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./node_modules/jquery-ui/dist/themes/base/theme.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/slick-carousel/slick/slick.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/slick-carousel/slick/slick-theme.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./node_modules/slick-carousel/slick/slick.min.js')
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./node_modules/wowjs/dist/wow.min.js')
        .pipe(gulp.dest('./docs/scripts'));
    done();
}

function buildDefaultStyles(done) {
    gulp.src('./styles/css.less')
        .pipe(concat('all.less'))
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/styles'));
    done();
}

function buildDefaultScripts(done) {
    gulp.src('./scripts/script.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./docs/scripts'));
    done();
}

function buildDefaultTemplate(done) {
    gulp.src('index.html')
        .pipe(gulp.dest('./docs'));
    done();
}

function watches() {
    refresh.listen();

    gulp.watch('./styles/*.less', function (done) {
        buildDefaultStyles(done);
        refresh();
        done();
    });

    gulp.watch('./scripts/script.js', function (done) {
        buildDefaultScripts(done);
        refresh();
        done();
    });

    gulp.watch('index.html', function (done) {
        buildDefaultTemplate(done)
        refresh();
        done();
    });
}

exports.default = series(buildDefaultStyles, buildDefaultScripts, buildDefaultTemplate, buildFiles, watches);