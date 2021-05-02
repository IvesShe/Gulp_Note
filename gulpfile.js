var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var less = require('gulp-less')
var cleancss = require('gulp-clean-css')
var htmlmin = require('gulp-htmlmin')

// 注冊任務
// gulp.task('任務名',function(){
//     // 任務代碼
// })

// gulp.task('default',['任務'])   // 異步執行

// 注冊合併壓縮js的任務
gulp.task('js',function(){
    //gulp.src('src/js/**/*.js') 這樣寫可以連子目錄一起遍歷

    // 找到目標原文件，將數據讀取到gulp的內存中
    return gulp.src('src/js/*.js')
    .pipe(concat('build.js'))       // 臨時合併文件
    .pipe(gulp.dest('dist/js/'))    // 輸出文件到本地
    .pipe(uglify())                 // 壓縮文件
    .pipe(rename({suffix: '.min'})) // 重命名
    .pipe(gulp.dest('dist/js/')) 
})

// 注冊轉換less的任務
gulp.task('less',function(){
    return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'))
})

// 注冊合併壓縮css的文件
gulp.task('css',function(){     // 沒有依賴的寫法
//gulp.task('css',['less'],function(){  // 有依賴的寫法 gulp 3.9.1
//gulp.task('css',gulp.series('less'),function(){    // 有依賴的寫法 gulp 4.2
    return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleancss({compatibility:'ie8'}))
    .pipe(gulp.dest('dist/css/'))
})

// 注冊壓縮html的任務
gulp.task('html',function(){
    return gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest('dist/'))
})

// gulp.series：按照顺序执行
// gulp.parallel：可以并行计算

// 注冊默認任務
//gulp.task('default',['js','less','css'])  // 3.9.1版的寫法
gulp.task('default', gulp.series('js', 'less','css','html'));
//gulp.task('default', gulp.parallel('js', 'less','css'));
//gulp.task('default', gulp.parallel('js', 'css')); // 若css有寫less依賴時，要省略less
