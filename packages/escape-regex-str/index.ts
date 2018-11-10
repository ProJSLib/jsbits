/**
 * The characters that need to be escaped.
 * @private
 */
const RE_ESCAPED = /(?=[[\](){}^$.?*+|\\])/g

/**
 * Escapes special characters in a given string in preparation to be used as
 * argument of the JS `RegExp` constructor, useful when you want to match the
 * given string as a literal substring.
 *
 * @param {string} str A string.
 * @returns {string} The escaped string.
 * @since 1.0.0
 */
const escapeRegexStr = function _escapeRegexStr (str: string | null) {
  return str ? str.replace(RE_ESCAPED, '\\') : ''
}

// Export here so that TS places the JSDdoc in the correct position.
export = escapeRegexStr
