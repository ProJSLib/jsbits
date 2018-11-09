// @ts-check
const fse = require('fs-extra')
const path = require('path')

const readTmpl = require('./template-cache').sync
const rootPath = require('../paths').root
const TEXT = require('../defaults').TEXT

/**
 * Reads a file, returns null if the file does not exists.
 *
 * @param {string} fpath Path to the file to read
 */
const fileRead = (fpath) => (fse.existsSync(fpath) ? fse.readFileSync(fpath, TEXT) : null)

/**
 * Read the template and the dest file, and rewrite destFile if needed.
 *
 * @param {string} destPath Dest folder
 * @param {string} fileName Dest filename
 * @param {object} [options] For fs.readFile
 */
const ensureIsUpdated = (destPath, fileName, options) => {
  const dest = path.join(destPath, fileName)

  const srcBuffer  = readTmpl(fileName, options)
  const destBuffer = fileRead(dest)

  return srcBuffer === destBuffer
    ? Promise.resolve()
    : fse.writeFile(dest, srcBuffer, TEXT)
}

/**
 * Updates the given file, readed from the jsbits root folder.
 *
 * @param {string} destPath Dest folder
 * @param {string} fileName Dest filename
 */
const licenseFromRoot = (destPath, fileName) => {
  const src  = path.join(rootPath, fileName)
  const dest = path.join(destPath, fileName)

  const srcBuffer  = readTmpl(src)
  const destBuffer = fileRead(dest)

  return srcBuffer === destBuffer
    ? Promise.resolve()
    : fse.writeFile(dest, srcBuffer, TEXT)
}

/**
 * Check the files in the target folder `pkgPath`
 *
 * @param {string} pkgPath Target folder
 * @param {object} options Jscc options
 */
const updateFiles = (pkgPath, options) => {
  return Promise.all([
    ensureIsUpdated(pkgPath, '.npmignore'),
    ensureIsUpdated(pkgPath, '.gitignore'),
    ensureIsUpdated(pkgPath, 'CHANGELOG.md', options),
    licenseFromRoot(pkgPath, 'LICENSE'),
  ])
}

module.exports = updateFiles
