/*
  Create or update a package.json
*/
// @ts-check
const fse = require('fs-extra')
const path = require('path')
const jscc = require('jscc')
const readTmpl = require('./template-cache')

const TEXT = require('../defaults').TEXT

/**
 * Merges an existing package.json content with a package.json template.
 *
 * The properties in the template take precedence.
 *
 * @param {string} tmpl The template, already processed by jscc.
 * @param {object} src Existing package.json as an object.
 * @returns {string} Merged package template.
 */
const mergePackage = (tmpl, src) => {
  const dest = JSON.parse(tmpl)

  Object.keys(src).forEach((key) => {
    if (!(key in dest)) {
      dest[key] = src[key]
    }
  })

  return JSON.stringify(dest, null, 2)
}

/**
 * Create or update the package.json of the subrepo in `srcPath`.
 *
 * @param {string} srcPath Path to the package folder.
 * @param {object} options Options for jscc
 */
const updatePackage = (srcPath, options) => {

  return readTmpl('_package.json')
    .then((data) => {
      const pkgPath = path.join(srcPath, 'package.json')

      // Update the original template, its properties have precedence
      let tmpl = jscc(data, pkgPath, options).code

      // If a pckage.json exists, merge its additional properties
      if (fse.existsSync(pkgPath)) {
        tmpl = mergePackage(tmpl, require(pkgPath))
      }

      return fse.writeFile(pkgPath, tmpl, TEXT)
    })
}

module.exports = updatePackage
