// @ts-check
/*
  Create or updates the README of a package.
*/
const fse = require('fs-extra')
const path = require('path')
const jsdoc2md = require('jsdoc-to-markdown')

const readTmpl = require('./template-cache')
const templates = require('../paths').templates
const scripts = require('../paths').scripts
const TEXT = require('../defaults').TEXT

/**
 * Create a list of partials found in the jscc values
 * @param {string} srcPath Jscc options
 */
const getPartials = (srcPath) => [
  path.join(path.resolve(srcPath, '.jsbits'), '*.hbs'),
  path.join(templates, 'examples.hbs'),
  path.join(templates, 'param-table-name.hbs'),
]

/**
 * Create the README of the subrepo.
 *
 * Maybe an alternative: https://github.com/tj/dox
 *
 * @param {string} srcPath Path to the package folder.
 * @param {object} options For jscc
 */
const updateReadme = (srcPath, options) => {

  return readTmpl('README.hbs')
    .then((source) => {
      // This could also be useful to the hbs
      const outFile = path.join(srcPath, 'README.md')
      options.values._FILE = outFile

      // Now generate the markdown file to fill the rest
      const mkdown = jsdoc2md.renderSync({
        'example-lang': 'ts',
        'files': path.join(srcPath, 'index.js'),
        'helper': path.join(scripts, 'lib', 'dmd-helper.js'),
        'partial': getPartials(srcPath),
        'name-format': '`',
        'no-cache': true,
        'template': source,
        'values': options.values,
      })

      return fse.writeFile(outFile, mkdown, TEXT)
    })
}

module.exports = updateReadme
