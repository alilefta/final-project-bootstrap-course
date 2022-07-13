"use strict";

module.exports = function (grunt) {
	require("time-grunt")(grunt);
	require("jit-grunt")(grunt, {
		useminPrepare: "grunt-usemin",
	});
	const sass = require("node-sass");
	grunt.initConfig({
		sass: {
			options: {
				implementation: sass,
			},
			dist: {
				files: {
					"styles/styles.css": "styles/styles.scss",
				},
			},
		},
		watch: {
			files: "styles/*.scss",
			tasks: ["sass"],
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: ["styles/*.css", "js/*.js", "*.html"],
				},
				options: {
					watchTask: true,
					server: {
						baseDir: "./",
					},
				},
			},
		},
		copy: {
			html: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: "./",
						src: ["*.html"],
						dest: "dist",
					},
				],
			},
			fonts: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: "node_modules/font-awesome",
						src: ["fonts/*.*"],
						dest: "dist",
					},
				],
			},
		},
		clean: {
			build: {
				src: ["dist/"],
			},
		},
		imagemin: {
			dynamic: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: "./",
						src: ["images/*.{png, jpg, gif}"],
						dest: "dist/images",
					},
				],
			},
		},
		useminPrepare: {
			foo: {
				dest: "dist",
				src: ["aboutus.html", "index.html"],
			},
			options: {
				flow: {
					steps: {
						css: ["cssmin"],
						js: ["uglify"],
					},
					post: {
						css: [
							{
								name: "cssmin",
								createConfig: function (context, block) {
									let generated = context.options.generated;
									generated.options = {
										keepSpecialComments: 0,
										rebase: false,
									};
								},
							},
						],
					},
				},
			},
		},
		concat: {
			options: {
				separator: ";",
			},
			dist: {},
		},
		uglify: {
			dist: {},
		},
		cssmin: {
			dist: {},
		},
		filerev: {
			options: {
				encoding: "utf8",
				algorithm: "md5",
				length: 20,
			},
			release: {
				files: [
					{
						src: ["dist/js/*.js", "dist/styles/*.css"],
					},
				],
			},
		},
		usemin: {
			html: ["dist/aboutus.html", "dist/index.html"],
			options: {
				assetsDirs: ["dist", "dist/styles", "dist/js"],
			},
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
				},
				files: {
					"dist/index.html": "dist/index.html",
					"dist/aboutus.html": "dist/aboutus.html",
				},
			},
		},
		babel: {
			options: {
				sourceMap: true,
				presets: ["@babel/preset-env"],
			},
			dist: {
				files: {
					"dist/js/app.js": "*.js",
				},
			},
		},
	});
	grunt.registerTask("css", ["sass"]);
	grunt.registerTask("default", ["browserSync", "watch"]);
	grunt.registerTask("build", [
		"clean",
		"copy",
		"imagemin",
		"babel",
		"useminPrepare",
		"concat",
		"cssmin",
		// "uglify",
		"filerev",
		"usemin",
		"htmlmin",
	]);
};
