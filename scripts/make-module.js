// @ts-check
/*

  Called from ./run-rollup.js
  Makes an ES6 module with Rollup.

*/
const path = require('path')
const rollup = require('rollup').rollup
const nodeResolve = require('rollup-plugin-node-resolve')
const cleanup = require('rollup-plugin-cleanup')
const replacer = require('./lib/rollup-replacer')
/** @type {any} */
const typescript = require('rollup-plugin-typescript2')
const getBanner = require('./lib/get-banner')
const getExternals = require('./lib/get-externals')

const CLEANUP_CONF = require('./defaults').CLEANUP_CONF
const REPLACE_CONF = {
  sourcemap: true,
}

const tsconfig = path.join(__dirname, 'tsconfig.json')

/**
 * Makes an ES module version, based in the given configuration.
 *
 * @param {string} outFile Path where the source files lives
 * @param {object} pkgJson Json object from package.json
 * @param {object} rptsConf Basic TS plugin configuration
 * @private
 */
const makeBundle = (outFile, pkgJson, rptsConf) => {
  const conf = rptsConf.tsconfigOverride

  return rollup({
    input: conf.files[0],
    external: getExternals(pkgJson),
    plugins: [
      nodeResolve(),
      replacer(REPLACE_CONF),
      typescript(rptsConf),
      cleanup(CLEANUP_CONF),
    ],
  }).then((bundle) => bundle.write({
    banner: getBanner(pkgJson, 'ESM', conf.compilerOptions.target),
    file: outFile,
    sourcemap: true,
    format: 'esm',
  }))
}

/**
 * Returns a "task" that will call Rollup in the folder `rootDir`,
 * which was already set as the current working directory by the caller.
 *
 * @param {string} rootDir Path where the source files lives
 * @param {object} pkgJson Json object from package.json
 */
const makeModule = (rootDir, pkgJson) => {

  const es5fname = path.join(rootDir, pkgJson.module)
  const rptsConf = {
    tsconfig,
    tsconfigOverride: {
      compilerOptions: { rootDir, outDir: rootDir, target: 'es5' },
      files: [path.join(rootDir, 'index.ts')],
    },
    typescript: require('typescript'),
  }

  return makeBundle(es5fname, pkgJson, rptsConf).then(() => {
    const es6fname = path.join(rootDir, pkgJson.es2015)

    // This is the only change in the TS conf
    rptsConf.tsconfigOverride.compilerOptions.target = 'es6'

    return makeBundle(es6fname, pkgJson, rptsConf)
  })
}

module.exports = makeModule
