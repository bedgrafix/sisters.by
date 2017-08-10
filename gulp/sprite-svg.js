var gulp = require('gulp');

var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

	gulp.task('svgSprite', function () {
		return gulp.src('source/images/sprite-svg/*.svg')
		// minify svg
			.pipe(svgmin({
				js2svg: {
					pretty: true
				}
			}))
			// remove all fill and style declarations in out shapes
			.pipe(cheerio({
				run: function ($) {
					// $('[fill]').removeAttr('fill');
					// $('[stroke]').removeAttr('stroke');
					// $('[defs]').removeAttr('defs');
					// $('[style]').removeAttr('style');
				},
				parserOptions: {xmlMode: true}
			}))
			// cheerio plugin create unnecessary string '&gt;', so replace it.
			.pipe(replace('&gt;', '>'))
			// build svg sprite
			.pipe(svgSprite({
				mode: {
					symbol: {
						sprite: "../sprite.svg",
						render: {
							styl: {
								dest: '../../stylus/sprite-svg/sprite-svg.styl',
								template: "source/stylus/sprite-svg/_sprite-template.styl"
							}
						},
						example: true
					}
				}
			}))
			.pipe(gulp.dest('source/images/'));
	});
