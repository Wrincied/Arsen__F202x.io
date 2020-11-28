

let project_folder = "dist";
let source_folder = "#src";

let path={
    build:{
        html:project_folder + "/",
        css:project_folder + "/css/",
        js:project_folder + "/js/",
        img:project_folder + "/img/",
        fonts:project_folder + "/fonts/",
},
    src:{   
        html:[source_folder + "/*.html","!" + source_folder + "/_*.html"],
        css:source_folder + "/scss/style.scss",
        js:source_folder + "/js/script.js",
        img:source_folder + "/img/**/*.{jpg,png,svg,ico,webp,gif}",
        fonts:source_folder + "/fonts/*.tt f",
    },
    watch:{   
        html:source_folder + "/**/*.html",
        css:source_folder + "/scss/**/*.scss",
        js:source_folder + "/js/**/*.js",
        img:source_folder + "/img/**/*.{jpg,png,svg,ico,webp,gif}",
    }, 
    clean:"./" + project_folder + "/"
}
let{src,dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer= require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    rename = require("gulp-rename");




    function browserSync(params) {
        browsersync.init({
            server:{
                baseDir:"./" + project_folder + "/"
            },
            port:8848,
            notify:false
        })
    }




    function html() {
        return src(path.src.html)
            .pipe(fileinclude())
            .pipe(dest(path.build.html))
            .pipe(browsersync.stream())
    }

    function js() {
        return src(path.src.js)
            .pipe(fileinclude())
            .pipe(dest(path.build.js))
            .pipe(browsersync.stream())
    }


    function css() {
        
        return src(path.src.css)
        .pipe(
            scss({outputStyle:"compressed"})
        )
        .pipe(
            autoprefixer({
                overrideBrowserlist: ["last 5 version"],
                cascade: true
            })
        )
        .pipe(
            group_media()
        )

        .pipe(
            rename({
                extname:".min.css"
            })
        )

        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
    }


    function watchFiles(params) {
        gulp.watch([path.watch.html], html);
        gulp.watch([path.watch.css], css);
        gulp.watch([path.watch.js], js);
    }

    function clean(params) {
        return del(path.clean);
    }


    let build = gulp.series(clean,gulp.parallel(js,css,html));
    let watch =gulp.parallel(build,watchFiles,browserSync); 

    exports.js = js;
    exports.css = css;
    exports.html = html;
    exports.build = build;
    exports.watch = watch;
    exports.default = watch;
    
