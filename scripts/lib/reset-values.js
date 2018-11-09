// @ts-check
const path = require('path')
const fs = require('fs')
const jscc = require('jscc')
const D = require('../defaults')
const camelize = require('./camelize')

/**
 * Load and process with jscc the external example for the current package.
 *
 * This optional file must be stored as '.jsbits/example.js'.
 *
 * The `require` function is passed to jscc in the `_REQUIRE` varname,
 * to allow loading of external modules, if required.
 *
 * @param {string} srcPath Path to the current package
 * @param {object} values jscc values
 */
const setExamples = (srcPath, values) => {
  const fpath = path.join(srcPath, '.jsbits', 'example.js')
  const fsexe = path.join(srcPath, 'index.js')

  if (fs.existsSync(fpath) && fs.existsSync(fsexe)) {
    const code = fs.readFileSync(fpath, D.TEXT)
    const opts = {
      sourceMap: false,
      values: Object.assign({ _REQUIRE: require }, values),
    }

    values._EXAMPLE = jscc(code, fsexe, opts).code
  }
}

/**
 * Set the HBS partials to load for the current package.
 *
 * This is an object in the `_PARTIAL` jscc varname, with the
 * partial names as keys and the fullpath to the .hbs file as values.
 *
 * The keys will be used by jscc to insert the partials in the template,
 * the values are not in use, they are loaded with .jsbits/*.hbs by jsdoc2md.
 *
 * NOTE: The `_PARTIAL` varname is always set, even if empty.
 *
 * @param {string} srcPath Path to the current package
 * @param {object} values jscc values
 */
const setPartials = (srcPath, values) => {
  const fpath = path.join(srcPath, '.jsbits')
  const parts = {}

  if (fs.existsSync(fpath)) {
    fs.readdirSync(fpath).forEach((entry) => {
      if (path.extname(entry) === '.hbs') {
        parts[entry.slice(0, -4)] = path.join(fpath, entry)
      }
    })
  }

  values._PARTIAL = parts // always set
}

/**
 * Set the non-computed jscc values for the current package.
 *
 * @param {object} values jscc values
 */
const setDefauls = (values) => {

  if (!values._AUTHOR) {
    values._AUTHOR = D.AUTHOR_NAME
  }

  values._NODE = D.NODE_VERSION
  values._HOMEPAGE = D.HOMEPAGE
  values._JSPREFIX = D.JSPREFIX
  values._LICENSE = D.LICENSE
}

/**
 * Reset the jscc values and complete the computed ones.
 *
 * @param {string} srcPath Path to the current package
 * @param {object} values jscc values
 * @param {boolean} [doExample] Run and include the example.
 */
const resetValues = (srcPath, values, doExample) => {
  const jsname = srcPath.split(/[\\/]/).pop()

  setDefauls(values)

  values._NAME = camelize(jsname)
  values._PATH = srcPath
  values._PACKAGE = `${values._JSPREFIX}/${jsname}`

  setPartials(srcPath, values)

  if (doExample) {
    setExamples(srcPath, values)  // keep this as last
  }

  return values
}

module.exports = resetValues
