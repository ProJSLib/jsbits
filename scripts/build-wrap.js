// @ts-check
/*
  Cleanup the output of the CJS variant and makes the wraped funcions.
*/
const makeWrapper = require('./make-wrapper')
const logOut = require('./lib/log-out')
const stopProcess = require('./lib/stop-process')
const queuePackages = require('./lib/queue-packages')

/**
 * Returns a "task" that will call Rollup in the given folder.
 * @param {string} srcPath Path where the source files lives
 * @param {object} jsbits Json object from package.json
 */
const wrapperTask = (srcPath, jsbits) => () => {
  return jsbits._WRAPPERS
    ? makeWrapper(srcPath, jsbits)
    : Promise.resolve(true)
}

// Cos we are changing the current directory, will cannot run the tasks
// parallel, so we will use p-queue instance.
queuePackages(wrapperTask, '.jsbits.json').onIdle()
  .then(() => {
    logOut('Finished making CJS modules.')
    return 0
  })
  .catch(stopProcess)
