// @ts-check
/*

  Called by ./run-rollup.js
  Inserts a function into an IIFE, removing the export and sourceMap

*/
const fse = require('fs-extra')
const path = require('path')

const removeBanner = require('./lib/remove-banner')
const wrapCode = require('./lib/wrap-code')
const camelize = require('./lib/camelize')
const D = require('./defaults')

const _done = () => true

/**
 * Info about a wrapper in the array _WRAPPERS of jsbits.json
 *
 * Paths are relative to the package.
 *
 * @typedef {object} WrapperInfo
 * @prop {string} input Source filename, mostly the ES5 export (index.js)
 * @prop {string} output Destination filename
 * @prop {string} wrapper File with the wrapper where to insert the source
 * @prop {string} [placeholder="_PLACEHOLDER"] jscc varname to replace w/the source
 * @prop {string} [method="minify"] Compactation method: 'cleanup' or 'minify'
 * @prop {string} [export=""] Replace the "module.export=" with this string
 */
/**
 * Returns a "task" that will call Rollup in the given folder.
 *
 * @param {string} srcPath Path where the source files lives
 * @param {object} jsInfo Object from jsbits with the info of the wrappers
 * @returns {Promise<boolean>} Success
 */
const makeWrapper = (srcPath, jsInfo) => {
  const _NAME = camelize(path.basename(srcPath))

  // promisify result
  const ops = jsInfo._WRAPPERS.map((/**@type {WrapperInfo}*/info) => {

    // All the paths are relative to the current package
    const srcFile = path.resolve(srcPath, info.input)
    const wrapper = path.resolve(srcPath, info.wrapper)
    const outFile = path.resolve(srcPath, info.output)

    return Promise.all([
      fse.readFile(srcFile, D.TEXT),
      fse.readFile(wrapper, D.TEXT),
    ])
      .then((files) => wrapCode(
        removeBanner(files[0]),
        files[1],
        Object.assign({ _NAME }, jsInfo, info)
      ))
      .then((code) => fse.writeFile(outFile, code, D.TEXT))
  })

  return Promise.all(ops).then(_done)
}

module.exports = makeWrapper
