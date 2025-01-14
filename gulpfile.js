import { deleteAsync } from 'del'
import gulp from 'gulp'
import gulpESLintNew from 'gulp-eslint-new'

const outputDir = 'dist'

/**
 * Cleans the output directory.
 */
gulp.task('clean', () => deleteAsync([outputDir]))

/**
 * run ts-lint
 */
gulp.task('lint', () => {
  return gulp
    .src(['src/**/*.ts', 'test/**/*.ts', '!**/*.d.ts'], { base: '.' })
    .pipe(gulpESLintNew())
    .pipe(gulpESLintNew.format())
})
