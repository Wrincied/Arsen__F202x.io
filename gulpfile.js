

let project_folder = "dist";
let source_folder = "#src";

let path={
    // Выгрузка готовых файлов
    build:{
        html:"project_folder" + "/",
        css:"project_folder" + "/css/",
        js:"project_folder" + "/js/",
        img:"project_folder" + "/img/",
        fonts:"project_folder" + "/fonts/",
    },
    // Загрузка файлов для их обработки gulp'ом
    src:{
        html:"source_folder" + "/*.html",
        css:"source_folder" + "/scss/.style.scss",
        js:"source_folder" + "/js/script.js",
        img:"source_folder" + "/img/**/*.{png,jpg,gif,webp,svg,ico}",
        fonts:"source_folder" + "/fonts/*.tff",
    },
    // Чтение файлов 
    watch:{
        html:"source_folder" + "/**/*.html",
        css:"source_folder" + "/scss/**/*.scss",
        js:"source_folder" + "/js//**/*.js",
        img:"source_folder" + "/img/**/*.{png,jpg,gif,webp.svg,ico}",
    },

}
// Подключение плагинов и тд
    let{src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create();

// Функция обновления страницы
function browserSync(params){
    browsersync.init({
        server:{
            baseDir:"./" + project_folder + "/"
        },
        port:3000,
        notify:false
    })
}
// Функция для работы с html файлами
function html(){
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}



let build = gulp.series(html);
let watch = gulp.parallel(build,browserSync);


// "Дружба файлов"
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;