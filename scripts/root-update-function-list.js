#!/usr/bin/env node
// @ts-check
/*

  Update the list of functions in the root README.md

*/
const fse = require('fs-extra')
const path = require('path')
const camelize = require('./lib/camelize')
const stopProcess = require('./lib/stop-process')

const packages = require('./paths').packages
const rootDir = require('./paths').root
const D = require('./defaults')

const TEXT = D.TEXT

const L_BLOCK = '<!--BEGIN_FUNCTION_LIST-->'
const R_BLOCK = '<!--END_FUNCTION_LIST-->'

/**
 * Loop over the "packages" directory and collect data of each subfolder
 * containing a .jsbits.json file.
 *
 * @returns {{[k: string]: object}}
 */
const collectData = () => {
  const data = {}

  fse.readdirSync(packages).forEach((entry) => {
    const json = path.join(packages, entry, '.jsbits.json')

    if (fse.pathExistsSync(json)) {
      data[entry] = require(json)
    }
  })

  return data
}

/**
 * Loop over the "packages" directory and collect data of each subfolder
 * containing a .jsbits.json file.
 *
 * @return {string} markdown
 */
const markdownList = () => {

  const data = collectData()
  /*
    want this:

    ### `addMonths`

    Adds or sustract X months to any JavaScript Date, local or UTC.

    Group: date - Author: aMarCruz
 */

  return Object.keys(data).map((folder) => {
    const values = data[folder]
    const target = values._TARGET === 'node' ? '_NodeJS only_<br>\n'
      : values._TARGET === 'browser' ? '_Browsers only_<br>\n' : ''
    const groups = values._GROUPS && values._GROUPS.length ? values._GROUPS.join(', ') : '(none)'

    return `
### [${camelize(folder)}](packages/${folder})

${target}${values._DESCRIPTION}

v${values._VERSION} &ndash; Group: ${groups} &ndash; Author: ${values._AUTHOR || D.AUTHOR_NAME}
`
  }).join('')
}

/**
 * Read the README.md file, replace the block, and save it.
 */
const main = () => {
  const readme = path.resolve(rootDir, 'README.md')

  const source = fse.readFileSync(readme, TEXT)
  const lblock = source.substr(0, source.indexOf(L_BLOCK) + L_BLOCK.length)
  const rblock = source.substr(source.indexOf(R_BLOCK))

  if (lblock.length === 0 || rblock.length === 1) {
    stopProcess('Error reading the block to replace, check the markers please.')
  }

  // TODO: Do this better
  fse.writeFileSync(
    readme,
    `${lblock}${markdownList()}${rblock}`,
    TEXT
  )
}

main()
