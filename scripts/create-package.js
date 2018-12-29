#!/usr/bin/env node
// @ts-check
/*

  Helper to create a new function.

*/
const path = require('path')
const fse = require('fs-extra')
const prompt = require('prompt')
const semver = require('semver')

const camelize = require('./lib/camelize')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')
const resetValues = require('./lib/reset-values')
const createPackage = require('./lib/update-package')

const jslibPath = require('./paths').root
const packagesPath = require('./paths').packages

const getPkgVer = () => require(path.join(jslibPath, 'package.json')).version

/**
 * Creates the package folder.
 *
 * @param {string} folder Folder name
 */
const createFolder = (folder) => {
  const fpath = path.resolve(packagesPath, folder)

  if (fse.pathExistsSync(fpath)) {
    stopProcess(`${path.relative(fpath, '.')} already exists.`)
  }

  fse.ensureDirSync(path.join(fpath, '.jsbits'))
  fse.ensureDirSync(path.join(fpath, 'test'))

  return fpath
}

/**
 * @typedef {object} PackInfo
 * @prop {string} folder
 * @prop {string} description
 * @prop {string} version
 * @prop {string} author
 * @prop {string} nodeOnly
 */
/**
 * @param {string} fpath -
 * @param {PackInfo} result -
 */
const jslibJson = (fpath, result) => {

  const semverInfo = semver.coerce(result.version)
  if (!semverInfo) {
    stopProcess(`"${result.version}" is not a valid version. See https://docs.npmjs.com/misc/semver`)
  }

  const json = {
    _VERSION: semverInfo.version,
    _DESCRIPTION: result.description.trim(),
    _AUTOR: result.author.trim(),
    _GROUPS: ['misc'],
    _TARGET: /^y/i.test(result.nodeOnly) ? 'node' : undefined,
  }

  fse.writeJsonSync(path.join(fpath, '.jsbits.json'), json, { spaces: 2 })
  return json
}

/**
 * @param {string} fpath -
 */
const example = (fpath) => {
  const str =
`//#set _F = _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _RESULT = _F()
$_NAME() // ⇒ $_RESULT
`
  fse.writeFileSync(path.join(fpath, '.jsbits', 'example.js'), str)
}

/**
 * @param {string} fpath -
 * @param {string} funcName -
 */
const test = (fpath, funcName) => {
  const str = `
import expect = require('expect.js')
import ${funcName} = require('..')

describe('${funcName}', function () {

  it('must pass this test', function () {
    expect().fail('Please write the test for ${funcName}')
  })

})
`
  fse.writeFileSync(path.join(fpath, 'test', 'index.spec.ts'), str)
}

/**
 * Create the main file, index.ts
 * @param {string} fpath -
 * @param {string} funcName -
 */
const main = (fpath, funcName) => {
  const str = `
/**
 * At this time, this function does nothing.
 *
 * @since ${getPkgVer()}
 */
const ${funcName} = function _${funcName} () {
}

export = ${funcName}
`
  fse.writeFileSync(path.join(fpath, 'index.ts'), str)
}

/**
 * Creates the first version of the package.json, neccesary for building.
 * @param {string} fpath Path where to create the json
 * @param {object} jsInfo jsbits object
 */
const pkgjson = (fpath, jsInfo) => {
  const opts = {
    sourceMap: false,
    values: resetValues(fpath, jsInfo),
  }

  createPackage(fpath, opts)
}

/**
 * @param {PackInfo} result -
 */
const processEntry = (result) => {
  const folder = result.folder.trim().toLowerCase()
  const funcName = camelize(folder)

  // create the folder structure for this function
  const fpath = createFolder(folder)

  // create the .jsbits.json and get the object
  const info = jslibJson(fpath, result)

  // create the initial files
  example(fpath)
  test(fpath, funcName)
  main(fpath, funcName)
  pkgjson(fpath, info)

  logOut(`

  Package created in ${path.relative('.', fpath)}
  Now please...

  1) Complete your function which is in index.ts
  2) Complete or delete the example in '.jsbits/exaple.js'
  3) Complete the test in 'test/index.spec.js'
  4) Run 'yarn build' to finish the setup
  5) Review the generated files in ${path.relative('.', fpath)}
  6) Test with 'yarn test' and send us your PR

  Thanks for your contribution!
`)
}

const prompts = [
  {
    name: 'folder',
    description: 'Package name',
    type: 'string',
    pattern: /^[a-z0-9-~][a-z0-9-._~]*$/,
    message: 'Invalid package name.',
    minLength: 1,
    maxLength: 50, // package.json schema is 214
    required: true,
  }, {
    name: 'description',
    description: 'Description',
    type: 'string',
    minLength: 1,
    maxLength: 120,
    message: 'Please enter a description for your function.',
    required: true,
  }, {
    name: 'version',
    description: 'Version',
    type: 'string',
    default: '1.0.0',
    maxLength: 16,
    required: true,
    message: 'Please enter a valid version.',
    conform: (value) => semver.coerce(value) !== null,
  }, {
    name: 'author',
    description: 'Author (ex: your github username)',
    type: 'string',
    message: 'Please enter the author name.',
    required: true,
  }, {
    name: 'nodeOnly',
    description: 'Is it a node only function? (y/N)',
    type: 'string',
    pattern: /^(?:[yn]|yes|no)$/i,
    default: 'n',
    message: 'Please enter yes ("y") or no ("n")',
  },
]

// Start the prompt
prompt.message = ':'
prompt.start()
prompt.get(prompts, (err, results) => {
  if (err) {
    stopProcess('\nCanceled.')
  } else {
    processEntry(results)
  }
})
