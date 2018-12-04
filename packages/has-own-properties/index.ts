const ObjectProto = Object.prototype
const _hasOwnProperty = ObjectProto.hasOwnProperty

/**
 * Determines whether an object has _own_ properties, including (optionally)
 * non-enumerable ones.
 *
 * This function is especially useful in plain objects, to check if they are
 * "empty".
 *
 * The test includes getters, setters and `Symbol` types, in the environments
 * that support them.
 *
 * If you want to check also non-enumerables properties, pass `true` in the
 * additional parameter.
 *
 * _**NOTE:** Testing primitive types is allowed, but these always return
 * `false`, even the non-empty strings._
 *
 * @param {any} obj Testing object or value
 * @param {boolean} [includeNonEnum=false] Include non-enumerable properties?
 * @returns {boolean} `true` if the object has own properties.
 * @since 1.0.0
 */
// codebeat:disable[BLOCK_NESTING]
const hasOwnProperties = function _hasOwnProperties (obj: any, includeNonEnum?: boolean) {

  if (obj && typeof obj === 'object') {

    if (includeNonEnum) {
      return Object.getOwnPropertyNames(obj).length > 0
    }

    return Object.keys(obj).length > 0
  }

  return false
}
// codebeat:enable[BLOCK_NESTING]

export = hasOwnProperties
