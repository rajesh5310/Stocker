var gulp = require("gulp"),
	nodemon = require("gulp-nodemon");


gulp.task("default", function(){
	nodemon({
		script : "index.js",
		ext: "js",
		env: {
			PORT: process.env.PORT
		},
		ignore: ["./node_modules/**"]
	})
	.on("restart", function(){
		console.log("Restarting server!");
	});
});