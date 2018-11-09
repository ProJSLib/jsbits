/**
 * Get the external dependencies for the current module.
 *
 * @param {object} pkg Parsed package.json
 */
module.exports = (pkg) => Object.keys(pkg.dependencies || []).concat('fs', 'path')
