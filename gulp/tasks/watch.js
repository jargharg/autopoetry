var gulp = require("gulp"),
	watch = require("gulp-watch"),
	browserSync = require("browser-sync").create()

gulp.task("apply-dev-environment", function() {
	return process.env.NODE_ENV = "development"
})

gulp.task("watch", ["scriptsRefresh", "cssInject"], function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: "./app"
		}
	})

	watch("./app/index.html", function() {
		browserSync.reload()
	})

	watch("./app/assets/styles/**/*.css", function() {
		gulp.start("cssInject")
	})

	watch("./app/assets/scripts/**/*.js", function() {
		gulp.start("scriptsRefresh")
	})
})

gulp.task("cssInject", ["styles"], function() {
	return gulp
		.src("./app/temp/assets/styles/styles.css")
		.pipe(browserSync.stream())
})

gulp.task("scriptsRefresh", ["apply-dev-environment", "scripts"], function() {
	browserSync.reload()
})
