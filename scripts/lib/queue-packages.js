// @ts-check
const fse = require('fs-extra')
const path = require('path')
const PQueue = require('p-queue')

const pkgsDir = require('../paths').packages

/**
 * Loops the packages directory searching the ones with a package.json
 * and add then to a task queue for sequential execution.
 *
 * @param {(p:string, j:string) => () => PromiseLike<*>} rollupTask -
 * @param {string} infoFile Json to load, either package or .jsbits
 */
const queuePackages = (rollupTask, infoFile) => {

  // Cos we are changing the current directory, will cannot run the tasks
  // parallel, so we will use p-queue instance.
  const queue = new PQueue({ concurrency: 1 })

  /**
   * Read the 'packages' folder and run a task for each subfolder containing
   * a package.json
   */
  fse.readdirSync('./packages').forEach((entry) => {
    const srcPath = path.join(pkgsDir, entry)
    const srcJson = path.join(srcPath, infoFile)

    if (fse.pathExistsSync(srcJson)) {
      const jsonInfo = require(srcJson)

      queue.add(rollupTask(srcPath, jsonInfo))
    }
  })

  return queue
}

module.exports = queuePackages
