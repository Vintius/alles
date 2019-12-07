// "use strict";
//
// var gulp = require("gulp");
// var slim = require("gulp-slim");
//
// gulp.task('slim', function(){
//     gulp.src("./src/slim/*.slim")
//         .pipe(slim({
//             pretty: true
//         }))
//         .pipe(gulp.dest("./dist/html/"));
// });

"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import slim from "gulp-slim";
import include from "gulp-file-include";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("slim", () => {
    return gulp.src(paths.views.src)
        .pipe(slim({
            pretty: true
        }))
        .pipe(include({
            prefix: "@@",
            basepath: "@file"
        }))
        .pipe(gulpif(production, replace(".css", ".min.css")))
        .pipe(gulpif(production, replace(".js", ".min.js")))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});