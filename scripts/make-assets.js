// @ts-check
/*

  Makes the assets of a one only package:
  - package.json  : Created or merged with values from .jsbits.json.
  - README.md     : Created or updated by jscc + jsdoc-to-markdown.
  - CHANGELOG.md  : empty header, only if the file does not already exists.

  Also created or updated:
  - .npmignore
  - LICENSE

*/
const resetValues = require('./lib/reset-values')
const updateFiles = require('./lib/update-files')
const updateReadme = require('./lib/update-readme')
const updatePackage = require('./lib/update-package')

const _done = () => true

/**
 * Returns a "task" that will create or update the assets for a package.
 *
 * @param {string} srcPath Path where the source files lives
 * @param {object} values For jscc (i.e. jsbits object)
 */
const makeAssets = (srcPath, values) => {
  //
  // NOTE: `resetValues` set the `_NAME` and `_PACKAGE` values for jscc to
  //  the current folder name (`jsname`), so even if this name is changed,
  //  the package will have the correct name after executing run-assets.js
  //
  // Also note that `resetValues` is called here once for each folder, so
  // it will not overwrite values of other packages.
  //
  const options = {
    sourceMap: false,
    values: resetValues(srcPath, values, true),
  }

  return updatePackage(srcPath, options)
    .then(() => updateReadme(srcPath, options))
    .then(() => updateFiles(srcPath, options))
    .then(_done)
}

module.exports = makeAssets
