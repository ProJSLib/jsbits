// @ts-check
/*
  Transform the export of the TS CJS build and removes the sourceMap directive.
  Support both a single export and multiple named exports.
*/

/**
 * For removing the "sourceMappingURL" line and trailing EOLs
 */
const R_SOURCEMAP = /\n\/\/# sourceMappingURL=[\s\S]+/

// This is the sequence to replace
const S_EXPORT = '\nmodule.exports = '

/** @param {string} str prepare this string */
const _prepare = (str) => (
  str === 'return' || str.slice(-1) === '=' ? str : `${str} =`)

/**
 * Replaces the CommonJS sequence "module.export = " with `repstr` and
 * removes the 'sourceMappingURL' line. If `repstr` is empty all is removed.
 *
 * @param {string} source Code ouput by "tsc" with modules:"commonjs"
 * @param {string} repstr String to replace the "export = "
 */
const replaceExport = (source, repstr) => {

  // Use inexOf, since only exists one 'import=' per file.
  const start = source.indexOf(S_EXPORT)

  // Check for error in the searching, maybe was altered?
  if (start < 0) {
    throw new Error('[replaceExport]: Cannot find module.exports in the input')
  }

  // No more checks, if something goes wrong here, the test will fail.
  // ...we have 100% coverage, don't we?
  const offset = S_EXPORT.length
  const expstr = source.slice(start + offset).replace(R_SOURCEMAP, '\n')

  // Do the replacement or truncate and we are done.
  source = source.slice(0, start + 1)
  return repstr ? `${source}${_prepare(repstr.trim())} ${expstr}` : source
}

module.exports = replaceExport
