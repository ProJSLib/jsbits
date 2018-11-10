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
 * Replaces the path of a file with a new one.
 *
 * @param {string} fname Filename
 * @param {string} fpath New path
 */
const forcePath = (fname, fpath) => path.resolve(fpath, path.basename(fname))

/**
 * Info about a wrapper in the array _WRAPPERS of jsbits.json
 *
 * Paths are relative to the package.
 *
 * @typedef {object} WrapperInfo
 * @prop {string} input Source filename, mostly the ES5 export (index.js)
 * @prop {string} output Destination filename
 * @prop {string} wrapper File with the wrapper where to insert the source
 * @prop {string} typings File to also copy to the dest path
 * @prop {string} [placeholder="_PLACEHOLDER"] jscc varname to replace w/the source
 * @prop {string} [method="minify"] Compactation method: 'cleanup' or 'minify'
 * @prop {string} [export=""] Replace the "module.export=" with this string
 */

/**
 * Copies the resulting file and its associated "d.ts", if it exists.
 *
 * @param {string} outPath Path where to write the code
 * @param {string} code Processed code.
 * @param {WrapperInfo} info Info of this wrapper
 */
const writeFiles = (outPath, code, info) => {
  const outFile = path.resolve(outPath, info.output)
  const promise = fse.writeFile(outFile, code, D.TEXT)

  if (info.typings) {
    const dtsFile = path.resolve(outPath, info.typings)

    return promise.then(() => {
      // @ts-ignore Error in typings of fs-extra
      return fse.copyFile(dtsFile, forcePath(dtsFile, outPath))
    })
  }

  return promise
}

/**
 * Returns a "task" that will call Rollup in the given folder.
 *
 * @param {string} srcPath Path where the source files lives
 * @param {object} jsInfo Object from jsbits.json with the info of the wrappers
 * @returns {Promise<boolean>} Success
 */
const makeWrapper = (srcPath, jsInfo) => {
  const _NAME = camelize(path.basename(srcPath))

  // promisify result
  const ops = jsInfo._WRAPPERS.map((/**@type {WrapperInfo}*/info) => {

    // All the paths are relative to the current package
    const srcFile = path.resolve(srcPath, info.input)
    const wrapper = path.resolve(srcPath, info.wrapper)

    // Include name in shalow copy of info
    info = Object.assign({ _NAME }, jsInfo, info)

    return Promise.all([
      fse.readFile(srcFile, D.TEXT),
      fse.readFile(wrapper, D.TEXT),
    ])
      .then((text) => wrapCode(removeBanner(text[0]), text[1], info))
      .then((code) => writeFiles(srcPath, code, info))
  })

  return Promise.all(ops).then(_done)
}

module.exports = makeWrapper
