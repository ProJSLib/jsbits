#!/usr/bin/env node
// @ts-check
/*

  Makes the ES6 modules, browser IIFEs, and wraped funcions.

*/
const fse = require('fs-extra')
const path = require('path')
const PQueue = require('p-queue')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')
const resetValues = require('./lib/reset-values')

const makeBrowser = require('./make-browser')
const makeModule  = require('./make-module')
const makeWrapper = require('./make-wrapper')

const pkgsDir = require('./paths').packages

/**
 * Returns a "task" that will call Rollup in the given folder.
 * @param {string} srcPath Path where the source files lives
 * @param {object} pkgJson Json object from package.json
 */
const rollupTask = (srcPath, pkgJson) => () => {
  logOut(`Rolling Up: ${pkgJson.name}...`)

  const json = require(path.join(srcPath, '.jsbits.json'))
  const info = resetValues(srcPath, json)

  return makeModule(srcPath, pkgJson)
    .then(() => !!pkgJson.browser && makeBrowser(srcPath, info, pkgJson))
    .then(() => !!info._WRAPPERS && makeWrapper(srcPath, info))
}

// Cos we are changing the current directory, will cannot run the tasks
// parallel, so we will use p-queue instance.
const queue = new PQueue({ concurrency: 1 })

/**
 * Read the 'packages' folder and run a task for each subfolder containing
 * a package.json
 */
fse.readdirSync('./packages').forEach((entry) => {
  const srcPath = path.join(pkgsDir, entry)
  const srcJson = path.join(srcPath, 'package.json')

  if (fse.pathExistsSync(srcJson)) {
    const pkgJson = require(srcJson)

    queue.add(rollupTask(srcPath, pkgJson))
  }
})

// Catch eny error from the promises here.
queue.onEmpty()
  .then(() => {
    logOut('Finished making ESM and Browser modules.')
    return 0
  })
  .catch(stopProcess)
