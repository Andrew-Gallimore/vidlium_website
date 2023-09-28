// Global vars
const { src, dest, series, parallel, watch } = require('gulp');
const connect = require('gulp-connect');

// Custom defined variables
// NOTE: If changing destination, you also need to change the desitination folder in webpack.config.js
var desitnationFold = 'dist';



// Using webpack on unpacked js files
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

function packDEV() {
    return src('./src/unpacked')
        .pipe(webpackStream({mode: 'development', ...webpackConfig}), webpack)
        .pipe(dest('./' + desitnationFold + '/js'))
        .pipe(connect.reload());
}
function packPROD() {
    return src('./src/unpacked')
        .pipe(webpackStream({mode: 'production', ...webpackConfig}), webpack)
        .pipe(dest('./' + desitnationFold + '/js'))
}



// General Javascript
const jsMinify = require('gulp-terser');

function scripts() {
    return src('src/js/*.js')
        .pipe(jsMinify())
        .pipe(dest(desitnationFold + '/js/'))
        .pipe(connect.reload());
}



// General CSS
const autoPrefixer = require('gulp-autoprefixer');
const extractCriticalCss = require('gulp-extract-critical-css');
const cssMinify = require('gulp-clean-css');

function styles() {
    return src('src/css/*.css')
        .pipe(autoPrefixer('last 2 versions'))
        .pipe(cssMinify())
        .pipe(dest(desitnationFold + '/css/'))
}

// Above/Below the fold CSS
// this puts above the fold css inline inside the html file
function criticalCSS() {
    return src(desitnationFold + '/css/home-function.css')
        .pipe(extractCriticalCss({
            inlinePath: desitnationFold + '/index.html',
            inlineCritical: true,
            modifySource: true
        }))
        .pipe(dest(desitnationFold + '/css/'))
        .pipe(connect.reload());
}

// Concatinating/merging css files into one
const concat = require('gulp-concat-css');

function mergeCSS() {
    return src(desitnationFold + '/css/landing-imgs.css')
        .pipe(concat("btn-styles.css"))
        .pipe(dest(desitnationFold + '/css/'))
        .pipe(connect.reload());
}




// Optimize and move images to dest
const imagemin = require('gulp-imagemin');

function images() {
    return src('src/img/*.{jpg,png}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 2 }),
        ]))
        .pipe(dest(desitnationFold + '/img'))
}



// Moving over mp4 files
function videos() {
    return src('src/img/*.mp4')
        .pipe(dest(desitnationFold + '/img'))
        .pipe(connect.reload());
}



// HTML Files
function pages() {
    return src('src/*.html')
        .pipe(dest(desitnationFold + '/'))
        .pipe(connect.reload());
}




// Generates SSL used in the serverConnect function
const devcert = require('devcert')
var ssl;

async function genCert() {
    ssl = await devcert.certificateFor('test.vidlium.com');
}

// Sets up server which the watch tasks call to reload (For the live-reload functionality)
function serverConnect() {
    connect.server({
        name: 'Dev App Reloadable',
        root: '',
        host: '127.0.0.1',
        https: ssl,
        port: 443,
        livereload: true
    });
}




// Watch task
function watchTask() {    
    watch('src/css/*.css', series(styles, parallel(criticalCSS, mergeCSS)));
    watch('src/js/**/*.js', scripts);
    watch('src/*.html', series(pages, styles, parallel(criticalCSS, mergeCSS)));
}




// Full build
exports.default = series(parallel(packPROD, scripts, styles, images, videos, pages),
                        parallel(criticalCSS, mergeCSS));

// Build + a watchTask
exports.dev = series(parallel(packDEV, scripts, styles, images, videos, pages),
                    genCert,
                    parallel(criticalCSS, mergeCSS), 
                    parallel(watchTask, serverConnect));

// Genrates the certs needed
exports.genCert = genCert;