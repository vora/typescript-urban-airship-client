const gulp = require('gulp')
const gulpTslint = require('gulp-tslint')
const ts = require('gulp-typescript')
const tslint = require('tslint')
const tsProject = ts.createProject('tsconfig.json', {
  declaration: true,
})

const outputDir = 'dist'

/**
 * Builds only the cdoe.
 */
gulp.task('build-code', () => {
  return gulp
    .src(['src/**/*.ts'])
    .pipe(tsProject())
    .js.pipe(gulp.dest(outputDir))
})

/**
 * Cleans the output directory.
 */
gulp.task('clean', () => del([outputDir]))

/**
 * run ts-lint
 */
gulp.task('tslint', () => {
  const l = tslint.Linter.createProgram('./tsconfig.json')

  return gulp
    .src(['src/**/*.ts', 'test/**/*.ts', '!**/*.d.ts'], { base: '.' })
    .pipe(gulpTslint({ formatter: 'verbose', program: l }))
    .pipe(gulpTslint.report({ allowWarnings: true }))
})
