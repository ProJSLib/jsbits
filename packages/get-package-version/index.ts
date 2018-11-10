import * as path from 'path'
import * as fs from 'fs'

/**
 * Returns the version on package.json file, if it exists.
 *
 * @param {string} pkgPath Path to check out.
 * @returns {string|undefined} Version
 * @private
 */
const extractVersion = (pkgPath: string) => {

  const pkgname = path.join(pkgPath, 'package.json')
  let version: string | undefined

  // Try to get the version if package.json exists.
  if (fs.existsSync(pkgname)) {
    try {
      version = require(pkgname).version
    } catch { /**/ }
  }

  return version
}

/**
 * Returns the version of the first package.json file found in the given
 * directory or in one of its parents.
 *
 * - If you don't provide a path, the search starts in the current one.
 * - The provided path can be relative to the current working directory.
 * - Packages with a missing or empty `version` property are ignored.
 *
 * @param {string} [pkgPath=.] Initial directory to search, defaults to `process.cwd()`.
 * @returns {string} The package version, or an empty string if it could not be found.
 * @since 1.0.0
 */
const getPackageVersion = function _getPackageVersion (pkgPath?: string) {

  // Start with the current working directory, with normalized slashes
  pkgPath = (pkgPath ? path.resolve(pkgPath) :  process.cwd()).replace(/\\/g, '/')

  while (~pkgPath.indexOf('/')) {

    // Try to get the version, the package may not contain one.
    const version = extractVersion(pkgPath)
    if (version) {
      return version
    }

    // package.json not found or does not contains version, move up
    pkgPath = pkgPath.replace(/\/[^/]*$/, '')
  }

  return ''
}

// Export here so that TS places the JSDdoc in the correct position.
export = getPackageVersion
