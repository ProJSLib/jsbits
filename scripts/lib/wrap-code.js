// @ts-check
/*

  Inserts a function body into an wrapper (mostly an IIFE).

*/
const cleanup = require('rollup-plugin-cleanup')
const jscc = require('jscc')
const uglify = require('uglify-es')

// at this time, CJS must
const escapeRegexStr = require('../../packages/escape-regex-str')
const replaceExport = require('./replace-export')
const D = require('../defaults')

/**
 * Default options for UglifyJS
 *
 * HACK: "any" because "ecma" is not in the uglify-es typings
 * @type {any}
 */
const UGLIFY_OPTS = {
  ecma: 6,
  output: {
    comments: /@license\b/,
  },
}

/** Default options for the cleanup plugin */
const CLEANUP_OPTS = {
  sourcemap: false,
}

/**
 * Info about a wrapper in the array _WRAPPERS of jsbits.json
 *
 * Paths are relative to the package.
 *
 * @typedef {object} PartialInfo
 * @prop {string} [placeholder="_PLACEHOLDER"] jscc varname to replace w/the source
 * @prop {string} [method="minify"] Compactation method: 'cleanup' or 'minify'
 * @prop {string} [export=""] Replace the "module.export=" with this string
 * @prop {string} [output=""] Output filename
 * @prop {string} [version=""] Replace the "module.export=" with this string
 * @prop {{[k:string]: string}} [replace] Regex-like strings to replace with other
 */

/**
 * Do compact the code with the required method:
 *
 * - cleanup: Use the rollup-plugin-cleanup transformer
 * - minify: Use UglifyJS with high default compression
 *
 * @param {string} code Processed code
 * @param {string} [method] 'cleanup' or 'minify'
 * @returns {Promise<string>} Compacted code.
 */
const compact = (code, method) => {

  if (method === 'cleanup') {
    // Remove comments and empty lines with cleanup
    // cleanup returns `null` if the code did not change
    const promise = cleanup(CLEANUP_OPTS).transform(code, 'a.js')

    return promise
      ? promise.then((result) => (result ? result.code : code))
      : Promise.resolve(code)
  }

  // Minify
  // Note UglifyJS can returns an Error in '.error'
  const result = uglify.minify(code, UGLIFY_OPTS)

  return result.error
    ? Promise.reject(result.error)
    : Promise.resolve(result.code)
}


/**
 * Makes any defined replacements on the source code.
 *
 * @param {string} code Source code
 * @param {PartialInfo} info Wrapper info
 */
const anyReplace = (code, info) => {
  const reps = info.replace

  if (reps) {
    Object.keys(reps).forEach((src) => {
      const sr = escapeRegexStr(src)
      code = code.replace(RegExp(sr, 'g'), reps[src])
    })
  }

  return code
}


/**
 * Creates an object with the values to use with jscc.
 *
 * @param {string} source Source code
 * @param {object} info For jscc values
 */
const makeValues = (source, info) => {
  const placeholder = info.placeholder || D.PLACEHOLDER

  const dest = Object.keys(info).reduce((obj, key) => {
    if (/^_[A-Z0-9]/.test(key)) {
      obj[key] = info[key]
    }
    return obj
  }, {})

  return Object.assign(dest, {
    [placeholder]: source,
    _LICENSE: D.LICENSE,
  })
}


/** Matches the non-empty lines to indent */
const INDENT = /^(\s*)(?=\S)/gm

/**
 * Inserts a function into an wrapper, remove/replaces the export with a
 * given string and removes the "sourceMappingsURL" line, and then compact
 * the result with a method given by info.method ('minify' by default).
 *
 * @param {string} source Source code
 * @param {string} wrapper Where to insert the code.
 * @param {PartialInfo} info Info about the wrapper
 */
const wrapCode = (source, wrapper, info) => {

  // First, replace the export, since this can throw.
  source = anyReplace(
    replaceExport(source, info.export || ''),
    info
  )

  // If using minify, there's no need to indent
  if (info.method === 'cleanup') {
    source = source.replace(INDENT, '  $1')
  }

  // Pass the source to jscc for the replacement
  source = jscc(wrapper, info.output, {
    sourceMap: false,
    values: makeValues(source, info),
  }).code

  // Apply the compact methos and we are done.
  return compact(source, info.method)
}

module.exports = wrapCode
