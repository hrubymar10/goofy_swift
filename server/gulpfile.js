var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    insert = require('gulp-insert'),
    tap = require('gulp-tap'),
    rename = require("gulp-rename");;

gulp.task('default', function() {
    gulp.src('./src/fb-default.css').pipe(minifyCSS()).pipe(tap(function (file,t) {
        var css = file.contents.toString('utf8');
        gulp.src('./src/fb.js').pipe(uglify()).pipe(insert.prepend("var css='"+css+"';")).pipe(rename(function(path){path.basename += "-default";})).pipe(gulp.dest('./dist/'));
    }));
    gulp.src('./src/fb-dark.css').pipe(minifyCSS()).pipe(tap(function (file,t) {
        var css = file.contents.toString('utf8');
        gulp.src('./src/fb.js').pipe(uglify()).pipe(insert.prepend("var css='"+css+"';")).pipe(rename(function(path){path.basename += "-dark";})).pipe(gulp.dest('./dist/'));
    }));
});

gulp.task('watch', function() {
    gulp.watch('./src/*', ['default']);
});
