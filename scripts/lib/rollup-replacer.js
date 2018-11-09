/* @ts-check */
/*
  Custom rollup-plugin to replace "export=" by "export default" or "export"
*/
const MagicString = require('magic-string')

//const RE_EXP_ES6 = /^module\.exports = (?=[^;]+;$)/gm
const RE_EXP_ES6 = /^export = (?=\S)/gm
const RE_OFFSET = 'export = '.length

/**
 * Replacement
 * @param {string} code Source code
 * @param {boolean} map Generate sourcemap?
 */
const replacer = (code, map) => {

  const match = RegExp(RE_EXP_ES6, 'gm').exec(code)
  if (!match) {
    return undefined
  }

  const ms    = new MagicString(code)
  const start = match.index
  const end   = start + match[0].length
  const str   = code[start + RE_OFFSET] === '{' ? 'export ' : 'export default '

  ms.overwrite(start, end, str)

  return {
    code: ms.toString(),
    map: map ? ms.generateMap({ hires: true }) : null,
  }
}

/**
 * Read the ".d.ts" files from "srcPath", replace their "export default" with
 * "export =" and write them to the "destFolder" subdirectory.
 */
module.exports = function (options) {

  // This is the unique option
  const sourcemap = !options || options.sourcemap !== false

  /** @param {string} fname */
  const filter = (fname) => /\.(ts|js)$/.test(fname)

  return {
    name: 'replacer',

    transform (code, id) {
      return filter(id) ? replacer(code, sourcemap, id) : undefined
    },
  }
}
