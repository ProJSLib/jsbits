/* eslint-disable no-console */
/**
 * Print a message to stderr and stop the current process with an exit code.
 *
 * @param {string} msg Text to print with console.error()
 * @param {number} [code=1] process exit code.
 */
module.exports = (msg, code) => {
  console.error(msg)
  process.exit(typeof code == 'number' ? code : 1)
}
