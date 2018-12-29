// @ts-check

/** License ID */
const LICENSE = require('../defaults').LICENSE

/**
 * Creates the "banner" for the current module.
 *
 * @param {object} pkg package.json
 * @param {string} format ESM, UMD, etc.
 * @param {string} [target="ES5"] ES version
 * @private
 */
module.exports = (pkg, format, target) => `/*
  ${pkg.name}
  @author ${pkg.author}
  @version ${pkg.version} ${format.toUpperCase()}+${target ? target.toUpperCase() : 'ES5'}
  @license ${LICENSE}
*/
/* eslint-disable */
`
