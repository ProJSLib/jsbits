/*
  Centralize path information
*/
const path = require('path')

const scripts = __dirname
const rootDir = path.resolve(scripts, '..')

module.exports = {
  root: rootDir,
  packages: path.join(rootDir, 'packages'),
  templates: path.join(scripts, 'templates'),
  scripts,
}
