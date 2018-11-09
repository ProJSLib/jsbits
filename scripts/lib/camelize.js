// @ts-check
/**
 * Convert a string containing dashes to camel case
 *
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
module.exports = (str) => str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
