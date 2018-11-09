#!/usr/bin/env node
// @ts-check
/*
  Makes the ES6 modules, browser IIFEs, and wraped funcions.
*/
const path = require('path')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')
const resetValues = require('./lib/reset-values')
const queuePackages = require('./lib/queue-packages')

const makeBrowser = require('./make-browser')
const makeModule  = require('./make-module')
const makeWrapper = require('./make-wrapper')

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

// Cos we are changing the current directory, will cannot run the tasks
// parallel, so we will use p-queue instance.
queuePackages(rollupTask).onIdle()
  .then(() => {
    logOut('Finished making ESM and Browser modules.')
    return 0
  })
  .catch(stopProcess)
