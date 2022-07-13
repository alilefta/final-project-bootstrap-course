"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass")(require("sass"));
let browserSync = require("browser-sync");
let del = require("del");
let imagemin = require("gulp-imagemin");
let uglify = require("gulp-uglify");
let usemin = require("gulp-usemin");
let rev = require("gulp-rev");
let cleanCss = require("gulp-clean-css");
let flatmap = require("gulp-flatmap");
let htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
gulp.task("sass", function () {
	return gulp
		.src("./css/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./css"));
});

gulp.task("sass:watch", function () {
	gulp.watch("./css/*.scss", ["sass"]);
});

gulp.task("browser-sync", function () {
	var files = [
		"./*.html",
		"./styles/*.css",
		"./images/*.{png,jpg,gif}",
		"./js/*.js",
	];

	browserSync.init(files, {
		server: {
			baseDir: "./",
		},
	});
});

gulp.task("default", ["browser-sync"], function () {
	gulp.start("sass:watch");
});
// Clean
gulp.task("clean", function () {
	return del(["dist"]);
});

gulp.task("copyfonts", function () {
	gulp
		.src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*")
		.pipe(gulp.dest("./dist/fonts"));
});

// Images
gulp.task("imagemin", function () {
	return gulp
		.src("images/*.{png,jpg,gif}")
		.pipe(
			imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
		)
		.pipe(gulp.dest("dist/images"));
});

gulp.task("usemin", function () {
	return gulp
		.src("./*.html")
		.pipe(
			flatmap(function (stream, file) {
				return stream.pipe(
					usemin({
						css: [rev()],
						html: [
							function () {
								return htmlmin({ collapseWhitespace: true });
							},
						],
						js: [rev()],

						inlinecss: [cleanCss(), "concat"],
					})
				);
			})
		)
		.pipe(gulp.dest("dist/"));
});

gulp.task("minify", () => {
	return gulp
		.src("js/*.js")
		.pipe(
			babel({
				presets: ["es2015"],
			})
		)
		.pipe(uglify());
	// [...]
});
// the reason we put clean alone here is that it may be executed in parallel with other tasks resulting in removing the new code generated.
gulp.task("build", ["clean"], function () {
	gulp.start("copyfonts", "imagemin", "minify", "usemin");
});
