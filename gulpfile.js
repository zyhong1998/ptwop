// 导入模块
const {src,dest,parallel,watch} = require ('gulp');
const less = require('gulp-less');//处理less插件
const rename = require('gulp-rename');//重命名
const cleanCss = require('gulp-clean-css')//压缩css
const uglify = require('gulp-uglify')//压缩js
const browserSync = require('browser-sync').create()//启动服务
const reload = browserSync.reload//热加载
// 处理css任务
function css() {
    return src('./less/*.less')//需处理的文件源
        .pipe(less()) //编译
        .pipe(cleanCss())//压缩
        .pipe(
            rename({
                suffix: ".min" //重命名
            })                
        )   
        .pipe(dest('./dist/css'))//输出
}
// 处理js任务
function js() {
    return src('./js/*.js')//需处理的文件源
        .pipe(uglify())//压缩
        .pipe(
            rename({
                suffix: ".min" //重命名
            })                
        )    
        .pipe(dest('./dist/js'))//输出
}
// 启动服务器
function serve(){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3033
    })
}
// 观察者
function auto(){
    watch("./less/*.less", css).on("change",reload)//css
    watch("./js/*.js", js).on("change",reload)//js
    watch("**/*.html").on("change",reload);//html
}
// 暴露
exports.css = css;
exports.js = js;
exports.default=parallel(js,css,serve,auto);//默认任务 gulp