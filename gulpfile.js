const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create(); 
const reload = browserSync.reload;
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const paths = {
    scripts: {
      src: ['./node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/js/dist/dom/*.js',
            'node_modules/bootstrap/js/dist/base-component.js',
            'node_modules/bootstrap/js/dist/alert.js',
            'node_modules/push.js/bin/push.js',
            './src/js/*.js'],
      dest: './js'
    },
    scssf: {
        src: './src/scss/**/*.scss',
        dest: './css'
    }
  };
// Copy javascripts file into script.min.js
function scripts(){
    return gulp.src(paths.scripts.src)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
} 
// Compile scss into css
function style(done){
    gulp.src(paths.scssf.src)
        .pipe(sass())
//        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.scssf.dest))
    done();
}
// function serve
function serve(done) {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });
    done();
}
//reload server
function reload1(done) {
    browserSync.reload();
    done();
}
// Watch for change to automatically update browser
function watch(){
    //update css files
    gulp.watch(paths.scssf.src, gulp.series(style,reload1));
    //update html files
    gulp.watch('./*.html').on('change',browserSync.reload);
    //pdate js files
    gulp.watch(paths.scripts.src,gulp.series(scripts, reload1));
}

exports.dev =  gulp.series(scripts, style, serve, watch);

exports.scripts = scripts;
exports.style = style;
exports.watch = watch;
