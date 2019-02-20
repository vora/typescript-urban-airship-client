const del = require('del')
const gulp = require('gulp')
const gulpTslint = require('gulp-tslint')
const tslint = require('tslint')

const outputDir = 'dist'

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
