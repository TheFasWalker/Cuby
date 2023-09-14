const {series,src} = require('gulp')

let projectFolder ='frontend'
// projectFolder = require('path').basename(__dirname),
    gulp = require('gulp'),
    scss = require('gulp-sass')(require('sass')),
    fileinclude = require("gulp-file-include"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    fs = require('fs'),
    newer = require('gulp-newer'),
    minify= require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    debug = require('gulp-debug')


const path ={
    style:{
        src:'src/scss/style.scss',
        watchSrc:'src/scss/**/*.scss',
        project: projectFolder +'/public/css/'
    },
    html: {
        src: ['src/**/*.html', "!" + 'src/**/_*.html'],
        project: projectFolder + '/',
        watchSrc:['src/**/*.html','src/**/*.html'],
    },
    js: {
        src: 'src/scripts/**/*.js',
        project: projectFolder + '/public/scripts/',
        watchSrc:'src/scripts/*.js'
    }
}
// сборка css из scss
gulp.task('compile-scss', function () {
    return gulp.src(path.style.src)
        .pipe( sourcemaps.init())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 4 versions"],
            cascade: true
        }))
        .pipe(group_media())
        .pipe( sourcemaps.write())
        .pipe(gulp.dest(path.style.project))
});

gulp.task('compile-scss-minify', function () {
    return gulp.src(path.style.src)
        .pipe( sourcemaps.init())
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 4 versions"],
            cascade: true
        }))
        .pipe(group_media())
        .pipe( sourcemaps.write())
        .pipe(cleanCSS())
        .pipe(gulp.dest(path.style.project))
});
// компилятор html-include
gulp.task('compile-html', function () {
    return gulp.src(path.html.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(debug())
        .pipe(gulp.dest(path.html.project))
});
// Обработка JS
gulp.task('compile-js', function () {
    return gulp.src(path.js.src, {
        sourcemaps:true
    })
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(path.js.project))
})
gulp.task('compile-js-minify', function () {
    return gulp.src(path.js.src, {
        sourcemaps:true
    })
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest(path.js.project))
})
// слежка для html-include
function watchCanges() {
    console.log('==========')
    console.log('Запущен dev режим')
    console.log(`Общий файл стилей для слежки ${path.style.src}
    Доп файлы стилей для слежки ${path.style.watchSrc}
    Итоговый компилируцемый файл ${path.style.project}

    Исходный файл js ${path.js.src}
    Доп файлы js для слежки ${path.js.watchSrc}
    Итоговый файл js ${path.js.project}

    html файлы начинающиеся с "_" не будут компилироваться как уникальные. Они расчитаны для подключения к иным html файлам
    Основные входящие файлы .html ${path.html.src}
    компилируемые файлы .html ${path.html.watchSrc}
    итоговые компилируемые файлы ${path.html.project}
    `)
    console.log('==========')
    gulp.watch(path.style.watchSrc, gulp.series('compile-scss'));
    gulp.watch(path.html.watchSrc, gulp.series('compile-html'));
    gulp.watch(path.js.watchSrc, gulp.series('compile-js'));
}

gulp.task('default',gulp.series(watchCanges));

gulp.task('prod',gulp.series('compile-scss-minify','compile-html','compile-js-minify'))
