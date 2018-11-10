/* @ts-check */
/*
  Custom rollup-plugin to replace "export=" by "export default" or "export"
*/
const MagicString = require('magic-string')

const RE_TS_EXP = /^export = $/m
const RE_OFFSET = 'export = '.length

/**
 * Replaces the code preserving sourcemap
 *
 * @param {string} code Source code
 * @param {string} str Replacement
 */
const replaceWithMap = (code, start, str) => {
  const ms = new MagicString(code)

  ms.overwrite(start, start + RE_OFFSET, str)

  return {
    code: ms.toString(),
    map: ms.generateMap({ hires: true }),
  }
}

/**
 * Replaces the TS export in the code with an ESM export. It returns the
 * replaced code or `undefined` if the TS export was not found.
 *
 * @param {string} code Source code
 * @param {boolean} map Generate sourcemap?
 * @returns {{code: string, map: object} | undefined}
 */
const replaceExport = (code, map) => {

  const match = code.match(RE_TS_EXP)
  if (!match) {
    return undefined
  }

  const start = match.index
  const str = code[start + RE_OFFSET] === '{' ? 'export ' : 'export default '

  if (map) {
    return replaceWithMap(code, start, str)
  }

  return { code: code.replace(RE_TS_EXP, str), map: null }
}

/**
 * Read the ".d.ts" files from "srcPath", replace their "export default" with
 * "export =" and write them to the "destFolder" subdirectory.
 */
const replacer = function _replacer (options) {

  // This is the unique option
  const sourcemap = !options || options.sourcemap !== false

  /** @param {string} fname */
  const filter = (fname) => fname.slice(-3) === '.ts'

  return {
    name: 'replacer',

    /** @param {string} id - filename */
    //load (id) {
    //  return filter(id) ? replacer(id, sourcemap) : undefined
    //},

    transform (code, id) {
      return filter(id) ? replaceExport(code, sourcemap) : undefined
    },
  }
}

module.exports = replacer
