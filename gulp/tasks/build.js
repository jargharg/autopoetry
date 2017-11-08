var gulp = require("gulp"),
	del = require("del"),
	usemin = require("gulp-usemin"),
	rev = require("gulp-rev"),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify"),
	browserSync = require("browser-sync").create()

gulp.task("apply-prod-environment", function() {
	return process.env.NODE_ENV = "production"
})

gulp.task("deleteDocsFolder", ["apply-prod-environment"], function() {
	return del("./docs")
})

gulp.task("copyGeneralFiles", ["deleteDocsFolder"], function() {
	var pathsToCopy = [
		"./app/**/*",
		"!./app/index.html",
		"!./app/assets/scripts",
		"!./app/assets/scripts/**",
		"!./app/assets/styles",
		"!./app/assets/styles/**",
		"!./app/temp",
		"!./app/temp/**"
	]
	return gulp.src(pathsToCopy).pipe(gulp.dest("./docs"))
})

gulp.task("useminTrigger", ["deleteDocsFolder"], function() {
	gulp.start("usemin")
})

gulp.task("usemin", ["styles", "scripts"], function() {
	return gulp
		.src("./app/index.html")
		.pipe(
			usemin({
				css: [
					function() {
						return rev()
					},
					function() {
						return cssnano()
					}
				],
				js: [
					function() {
						return rev()
					},
					function() {
						return uglify()
					}
				]
			})
		)
		.pipe(gulp.dest("./docs"))
})

gulp.task("build", ["apply-prod-environment", "deleteDocsFolder", "useminTrigger", "copyGeneralFiles"])
