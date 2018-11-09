#!/usr/bin/env node
// @ts-check
/*

  Makes the ES6 modules, browser IIFEs, and wraped funcions.

*/
const fse = require('fs-extra')
const path = require('path')
const PQueue = require('p-queue')
const rollup = require('rollup').rollup
const cleanup = require('rollup-plugin-cleanup')
const nodeResolve = require('rollup-plugin-node-resolve')
/** @type {any} */
const typescript = require('rollup-plugin-typescript2')

const getBanner = require('./lib/get-banner')
const getExternals = require('./lib/get-externals')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')

const pkgsDir = require('./paths').packages
const rootDir = require('./paths').root
const CLEANUP_CONF = require('./defaults').CLEANUP_CONF

// Full path of TS root configuration
const tsconfig = path.join(rootDir, 'tsconfig.json')

/**
 * Makes an ES module version, based in the given configuration.
 *
 * @param {string} outFile Path where the source files lives
 * @param {object} pkgJson Json object from package.json
 * @param {object} rptsConf Basic TS plugin configuration
 * @private
 */
const makeBundle = (outFile, pkgJson, rptsConf) => {
  return rollup({
    input: rptsConf.tsconfigOverride.files[0],
    external: getExternals(pkgJson),
    plugins: [
      nodeResolve(),
      typescript(rptsConf),
      cleanup(CLEANUP_CONF),
    ],
  }).then((bundle) => bundle.write({
    banner: getBanner(pkgJson, 'CJS'),
    file: outFile,
    sourcemap: true,
    format: 'cjs',
  }))
}

/**
 * Returns a "task" that will call Rollup in the folder `rootDir`.
 *
 * @param {string} srcPath Path where the source files lives
 * @param {object} pkgJson Json object from package.json
 */
const rollupTask = (srcPath, pkgJson) => () => {
  logOut(`Compiling: ${pkgJson.name}...`)

  const outFile = path.join(srcPath, pkgJson.main)
  const rptsConf = {
    tsconfig,
    tsconfigOverride: {
      compilerOptions: { rootDir: srcPath, outDir: srcPath },
      files: [path.join(srcPath, 'index.ts')],
      include: [null],
    },
    typescript: require('typescript'),
  }

  return makeBundle(outFile, pkgJson, rptsConf)
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
queue.onIdle()
  .then(() => {
    logOut('Finished making CJS modules.')
    return 0
  })
  .catch(stopProcess)
