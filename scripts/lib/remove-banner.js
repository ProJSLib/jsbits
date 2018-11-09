// @ts-check

/** Regex to strip the existing banner */
const R_BANNER = /(\*\/\s+)['"]use strict['"];\s/

/**
 * index.js (the CJS variant) is used to generate other variants, but already
 * has a banner. This function remove it.
 *
 * @param {string} code index.js source code
 */
module.exports = (code) => {
  const match = R_BANNER.exec(code)

  return match ? code.slice(match.index + match[1].length) : code
}
