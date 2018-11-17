// @ts-check
/*
  Simple cache for files in the 'templates' folder.
*/
const fse = require('fs-extra')
const path = require('path')
const jscc = require('jscc')

const TEXT = require('../defaults').TEXT

// Perhaps is better isolate this path?
const tmplPath = require('../paths').templates

/**
 * Returns the absolute path of 'fname', relative to the 'templates' folder,
 * or `fname` without changes if the path is already absolute.
 *
 * NOTE: The replacement of the first dot is for _gitignore/_npmignore.
 * @param {string} fname Absolute or relative path.
 */
const _resolve = (fname) => path.resolve(tmplPath, fname.replace(/^\./, '_'))

/**
 * The cache with absolute filenames in the keys, to allow files with
 * the same name in different paths.
 *
 * @type {{[k: string]: string}}
 */
const tmplCache = {}

/**
 * Returns the content of a file _relative_ to the 'templates' folder,
 * optionally preprocessed by jscc (if `opts` is given).
 *
 * @param {string} fname Filename absolute or relative to 'templates'.
 * @param {object} [opts] jscc options.
 */
module.exports = (fname, opts) => {
  fname = _resolve(fname)

  if (tmplCache[fname]) {
    return Promise.resolve(tmplCache[fname])
  }

  // Sync read, assume the file exists, otherwise will throw
  return fse.readFile(fname, TEXT).then((text) => {
    tmplCache[fname] = text

    // Preprocess w/jscc if required and we are done.
    return opts ? jscc(text, fname, opts).code : text
  })
}

/**
 * Returns the content of a file _relative_ to the 'templates' folder,
 * optionally preprocessed by jscc (if `opts` is given).
 *
 * NOTE: The files are read in synchronous mode.
 *
 * @param {string} fname Filename absolute or relative to 'templates'.
 * @param {object} [opts] jscc options.
 */
module.exports.sync = (fname, opts) => {
  fname = _resolve(fname)

  // Sync read, assume the file exists, otherwise will throw
  const text = tmplCache[fname] ||
    (tmplCache[fname] = fse.readFileSync(fname, TEXT))

  // Preprocess w/jscc if required and we are done.
  return opts ? jscc(text, fname, opts).code : text
}
