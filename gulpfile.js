const gulp = require('gulp')
const clean = require('gulp-clean')
const shell = require('gulp-shell')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config')
const named = require('vinyl-named')

gulp.task('clean', () => gulp.src('./dist/**', { read: false }).pipe(clean()))

gulp.task('build', () => {
  return gulp
    .src('./src/functions/*/index.js')
    .pipe(named((file) => file.path.split('/src/functions/')[1].split('/index.js')[0]))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dist/functions'))
})

gulp.task('package', shell.task([
  'aws cloudformation',
  'package',
  '--template-file cloudformation.yml',
  '--s3-bucket karthik-lambda-repo',
  '--output-template ./dist/cloudformation.yml'
].join(' ')))

gulp.task('deploy', shell.task([
  'aws cloudformation',
  'deploy',
  '--template-file ./dist/cloudformation.yml',
  `--stack-name lambda-${process.env.STAGE}`,
  `--parameter-overrides Stage=${process.env.STAGE}`,
  '--capabilities CAPABILITY_NAMED_IAM',
  '--no-fail-on-empty-changeset',
  `--region ${process.env.AWS_REGION}`
].join(' ')))

gulp.task('clean-build-and-deploy', gulp.series(['clean', 'build', 'package', 'deploy']))