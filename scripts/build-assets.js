#!/usr/bin/env node
// @ts-check
/*

  Makes the assets of the packages:
  - package.json  : Created or merged with values from .jsbits.json.
  - README.md     : Created or updated by jscc + jsdoc-to-markdown.
  - CHANGELOG.md  : empty header, only if the file does not already exists.

  Also created or updated:
  - .gitignore
  - .npmignore
  - LICENSE

*/
const fse = require('fs-extra')
const path = require('path')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')
const makeAssets = require('./make-assets')

const packages = require('./paths').packages

/**
 * Doesn't metter which directory is the current?
 * @type {Array.<Promise<any>>}
 */
const queue = []

/**
 * Loop the "packages" directory and runs a task to syncronize the files
 * on each subfolder containing a .jsbits.json file.
 */
fse.readdirSync('./packages').forEach((entry) => {
  const srcPath = path.join(packages, entry)
  const srcInfo = path.join(srcPath, '.jsbits.json')

  if (fse.pathExists(srcInfo)) {
    const values = require(srcInfo)

    queue.push(makeAssets(srcPath, values))
  }
})

// Tasks running, catch any error from the promises here.
Promise.all(queue)
  .then(() => {
    logOut('Finished making the assets.')
    return 0
  })
  .catch(stopProcess)
