module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest',
  },
  testMatch: ['**/test/**/*.test.(ts|js)'],
  testPathIgnorePatterns: ['/dist/'],
  testEnvironment: './test/config/mongoEnvironment.js',
  setupTestFrameworkScriptFile: './test/config/setupTestFrameworkScript.js',
}
