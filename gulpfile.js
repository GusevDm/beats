const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');
 
task('clean', () => {
 return src('dist/**/*', { read: false })
   .pipe(rm())
})

task('copy:img', () => {
  return src('src/img/**/*.png')
    .pipe(dest('dist/img'))
    // .pipe(reload({ stream: true }));
 })

 task('copy:svg', () => {
  return src('src/img/**/*.svg')
    .pipe(dest('dist/img'))
    // .pipe(reload({ stream: true }));
 })
 
 task('copy:video', () => {
  return src('src/video/*.mp4')
    .pipe(dest('dist/video'))
    // .pipe(reload({ stream: true }));
 })

task('copy:html', () => {
 return src('src/*.html')
   .pipe(dest('dist'))
   .pipe(reload({ stream: true }));
})
 
const styles = [
 'node_modules/normalize.css/normalize.css',
 'src/sass/main.scss'
];
 
task('styles', () => {
 return src(styles)
//    .pipe(sourcemaps.init())
   .pipe(concat('main.min.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
//    .pipe(px2rem())
   .pipe(autoprefixer({
     browsers: ['last 2 versions'],
     cascade: false
   }))
  //  .pipe(gcmq())
   .pipe(cleanCSS())
   .pipe(sourcemaps.write())
   .pipe(dest('dist/css'))
   .pipe(reload({ stream: true }));
});
 
const libs = [
 'node_modules/jquery/dist/jquery.js',
 'src/js/scripts/*.js',
 'src/js/*.js'
];
 
task('scripts', () => {
 return src(libs)
   .pipe(sourcemaps.init())
   .pipe(concat('script.js', {newLine: ';'}))
   .pipe(babel({
     presets: ['@babel/env']
   }))
   .pipe(uglify())
   .pipe(sourcemaps.write())
   .pipe(dest('dist/js'))
   .pipe(reload({ stream: true }));
});
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: true
 });
});
 
watch('./src/sass/**/*.scss', series('styles'));
watch('./src/*.html', series('copy:html'));
watch('./src/js/*.js', series('scripts'));
 
task('default', series('clean', 'copy:html', 'copy:img', 'copy:svg', 'copy:video', 'styles', 'scripts', 'server'));